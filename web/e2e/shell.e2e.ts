/**
 * The web shell in a browser: a new game and loading a save, on a phone (buttons, no keyboard,
 * you | enemy above the screen) and on a desktop (typing into the terminal).
 */
import { expect, type Page, test } from '@playwright/test';

import { set } from '../../src/state/attributes';
import { put } from '../../src/state/items';
import { savedGame } from '../../src/state/saved';
import { createState, startGame } from '../../src/state/state';

const phone = (page: Page) => (page.viewportSize()?.width ?? 0) <= 900;

/** a level-12 Гопник named Петя, as the browser keeps a save */
function petya(): string {
  const st = startGame(createState(), 'gopnik');
  st.version = 'test';
  st.player.name = ' Петя';
  st.player.progression.level = 12;
  st.player.progression.expNext = 130;
  set(st.player, 'strength', 9);
  set(st.player, 'agility', 7);
  set(st.player, 'vitality', 8);
  set(st.player, 'luck', 4);
  set(st.player, 'healthMax', 60);
  set(st.player, 'health', 60);
  set(st.player, 'damageMin', 4);
  set(st.player, 'damageMax', 9);
  st.player.resources.money = 77;
  put(st.player.body, 'knife');
  return JSON.stringify(savedGame(st));
}

/** saves in the slots (`2`..`5`, `0`), where the browser keeps them */
async function withSaves(page: Page, slots: readonly string[]) {
  const saves = Object.fromEntries(slots.map((slot) => [`gopnik:save:${slot}`, petya()]));
  await page.addInitScript((entries) => {
    for (const [key, value] of Object.entries(entries)) localStorage.setItem(key, value);
  }, saves);
}

/** what the screen shows, as text */
const screen = (page: Page) => page.locator('.xterm-rows');

/** "press any key": the button on a phone, Enter on a desktop */
async function next(page: Page) {
  if (phone(page)) await page.locator('.actions button', { hasText: 'дальше' }).click();
  else await page.keyboard.press('Enter');
}

/** the story's pages until the character types are asked */
async function storyToTypes(page: Page) {
  for (let i = 0; i < 15; i++) {
    if (phone(page)) {
      // the buttons say what the game waits for
      const types = page.locator('.actions button', { hasText: 'Отморозок' });
      const more = page.locator('.actions button', { hasText: 'дальше' });
      await expect(types.or(more)).toBeVisible();
      if (await types.isVisible()) return;
      await more.click();
    } else {
      // the screen is drawn a moment after the game writes it
      await page.waitForTimeout(200);
      if ((await screen(page).innerText()).includes('Чё за батва?')) return;
      await page.keyboard.press('Enter');
    }
  }
}

test('a new game: the story, a type, a name, the main prompt', async ({ page }) => {
  await page.goto('/');
  await expect(screen(page)).toContainText('Нажми какую-нибудь кнопку');
  await storyToTypes(page);
  await expect(screen(page)).toContainText('1-Отморозок');

  if (phone(page)) {
    await page.locator('.actions button', { hasText: 'Отморозок' }).click();
    const dialog = page.locator('dialog.name');
    await expect(dialog).toBeVisible();
    await dialog.locator('input').fill('Вася');
    await dialog.locator('button').click();
    await expect(dialog).toBeHidden();
  } else {
    await page.keyboard.type('1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Вася');
    await page.keyboard.press('Enter');
  }

  await expect(screen(page)).toContainText('Ты стоишь у дверей университета.');
  const panel = page.locator('.panel');
  await expect(panel).toContainText('Вася');
  await expect(panel).toContainText('Отморозок 0 ур.');
  await expect(panel).toContainText('Район: Универ');

  if (phone(page)) {
    // the main prompt's commands, only the places known in district 1
    const actions = page.locator('.actions');
    await expect(actions).toContainText('гулять');
    await expect(actions).toContainText('рынок');
    await expect(actions).not.toContainText('барыги');
    await expect(page.locator('.xterm-helper-textarea')).toHaveAttribute('inputmode', 'none');
    // you | enemy, then the screen, then the buttons
    const [p, s, a] = await Promise.all(
      ['.panel', '.screen', '.actions'].map((sel) => page.locator(sel).boundingBox())
    );
    expect(p!.y + p!.height).toBeLessThanOrEqual(s!.y);
    expect(s!.y + s!.height).toBeLessThanOrEqual(a!.y);
    expect(s!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  } else {
    await expect(page.locator('.actions')).toHaveCount(0);
  }
});

test('the saves found at the start are offered in a dialog and load', async ({ page }) => {
  await withSaves(page, ['3', '4']);
  await page.goto('/');
  await expect(screen(page)).toContainText('Нажми какую-нибудь кнопку');
  await next(page);

  const dialog = page.locator('dialog.choice');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Найдены сохранения');
  await expect(dialog.locator('button')).toHaveText([
    /Район 3.*ОбьГЭС/s,
    /Район 4.*Ельцовка/s,
    'Новая игра',
  ]);
  await dialog.locator('button', { hasText: 'Район 3' }).click();
  await expect(dialog).toBeHidden();

  // the hero of the save stands in district 3
  await expect(screen(page)).toContainText('На маршрутке ты доехал до ОбьГЭСа...');
  const panel = page.locator('.panel');
  await expect(panel).toContainText('Петя');
  await expect(panel).toContainText('Гопник 12 ур.');
  await expect(panel).toContainText('Район: ОбьГЭС');
  const equipment = panel.getByRole('button', { name: 'Шмотки (1)' });
  const items = page.getByRole('dialog', { name: 'Шмотки' });
  await expect(items).toHaveCount(0);
  if (!phone(page)) {
    await equipment.hover();
    await expect(items).toContainText('Нож');
    await page.mouse.move(0, 0);
    await expect(items).toHaveCount(0);
  }
  await equipment.click();
  await expect(items).toContainText('Нож');
  await page.keyboard.press('Escape');
  await expect(items).toHaveCount(0);
  if (phone(page)) await expect(page.locator('.actions')).toContainText('гулять');
});

test('a new game instead of a save', async ({ page }) => {
  await withSaves(page, ['2']);
  await page.goto('/');
  await expect(screen(page)).toContainText('Нажми какую-нибудь кнопку');
  await next(page);
  const dialog = page.locator('dialog.choice');
  await dialog.locator('button', { hasText: 'Новая игра' }).click();
  await expect(dialog).toBeHidden();
  await expect(screen(page)).toContainText('Год 2xxx от Р.Х.');
});
