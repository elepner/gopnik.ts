/**
 * The autosave: kept at the main prompt, a reload goes on from it, a death forgets it; and the
 * phone's screen has no «Новая игра» while a game goes on.
 */
import { expect, type Page, test } from '@playwright/test';

import { set } from '../../src/state/attributes';
import { createState, startGame } from '../../src/state/state';
import { District } from '../../src/tp/brands';

const KEY = 'gopnik:autosave';

const phone = (page: Page) => (page.viewportSize()?.width ?? 0) <= 900;
const screen = (page: Page) => page.locator('.xterm-rows');

/** a running game at the main prompt: a level-0 Вор named Коля with `health` left */
function kolya(health: number): string {
  const st = startGame(createState(), 'vor');
  st.version = 'test';
  st.player.name = ' Коля';
  st.world.district = District(1);
  st.world.places.market = true;
  st.world.places.hospital = true;
  st.player.progression.expNext = 10;
  for (const [a, n] of [
    ['strength', 3],
    ['agility', 3],
    ['vitality', 2],
    ['luck', 4],
    ['damageMin', 1],
    ['damageMax', 3],
    ['healthMax', 23],
  ] as const)
    set(st.player, a, n);
  set(st.player, 'health', health);
  return JSON.stringify(st);
}

async function autosaved(page: Page, json: string) {
  await page.addInitScript(([key, value]) => localStorage.setItem(key!, value!), [KEY, json]);
}

const kept = (page: Page) => page.evaluate((key) => localStorage.getItem(key), KEY);

/** the last line of the screen with something on it */
async function lastLine(page: Page) {
  // xterm pads the lines with (non-breaking) spaces
  const lines = (await screen(page).innerText()).split('\n').map((l) => l.trimEnd());
  return lines.filter((l) => l).at(-1) ?? '';
}

test('a running game is kept at the main prompt and goes on after a reload', async ({ page }) => {
  test.skip(phone(page), 'typed on a desktop');
  await autosaved(page, kolya(23));
  await page.goto('/');
  await expect(screen(page)).toContainText('игра продолжается с последнего хода');
  await expect(page.locator('.panel')).toContainText('Коля');
  await expect(page.locator('.panel')).toContainText('Вор 0 ур.');

  // a command, then the main prompt again: the game is kept as it is now
  await page.keyboard.type('s');
  await page.keyboard.press('Enter');
  await expect.poll(() => kept(page)).toContain('Коля');
});

test('a death forgets the running game', async ({ page }) => {
  test.skip(phone(page), 'typed on a desktop');
  test.setTimeout(60_000);
  // one health left: the first kick that lands ends the game (the seed fixes the walks)
  await autosaved(page, kolya(1));
  await page.goto('/?seed=7');
  await expect(page.locator('.panel')).toContainText('Коля');
  for (let i = 0; i < 300; i++) {
    const text = await screen(page).innerText();
    if (text.includes('Ты сдох.')) break;
    const line = await lastLine(page);
    if (line.endsWith('Битва\\')) await page.keyboard.type('k');
    else if (line.endsWith('\\')) await page.keyboard.type('w');
    else if (line.endsWith('?')) await page.keyboard.type('y');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(40);
  }
  await expect(screen(page)).toContainText('Ты сдох.');
  expect(await kept(page)).toContain('Коля');
  // the fight's last line, a key, then the game is over
  for (let i = 0; i < 5 && (await kept(page)) !== null; i++) {
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
  }
  expect(await kept(page)).toBeNull();
});

test('a phone has no «Новая игра» while the game goes on', async ({ page }) => {
  test.skip(!phone(page), 'the phone layout');
  await page.goto('/');
  await expect(screen(page)).toContainText('Нажми какую-нибудь кнопку');
  await expect(page.locator('.actions button')).toHaveCount(1);
  await expect(page.locator('.again')).toHaveCount(0);
});
