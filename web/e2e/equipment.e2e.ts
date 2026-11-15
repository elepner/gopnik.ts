import { expect, test } from '@playwright/test';

import { set } from '../../src/state/attributes';
import { put } from '../../src/state/items';
import { createState, startGame } from '../../src/state/state';
import { District } from '../../src/tp/brands';

for (const type of ['patsan', 'otmorozok', 'gopnik', 'vor'] as const) {
  test(`equipment uses the ${type} portrait`, async ({ page }) => {
    const st = startGame(createState(), type);
    st.world.district = District(1);
    await page.addInitScript(
      (json) => localStorage.setItem('gopnik:autosave', json),
      JSON.stringify(st)
    );
    await page.goto('/');
    await page.getByRole('button', { name: /Шмотки/ }).click();
    const portrait = page.getByRole('dialog', { name: 'Шмотки' }).locator('img.gopnik');
    await expect(portrait).toHaveAttribute('src', new RegExp(`${type}-stencil`));
    await expect
      .poll(() => portrait.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  });
}

test('equipment slots show the best item, spares and special items', async ({ page }) => {
  const st = startGame(createState(), 'gopnik');
  st.player.name = ' Петя';
  st.world.district = District(1);
  set(st.player, 'health', 30);
  st.player.progression.expNext = 100;
  for (const item of [
    'adidas',
    'abibas',
    'coolLeather',
    'leather',
    'coolBoots',
    'boots',
    'cleaver',
    'knife',
    'glasses',
    'cross',
    'phone',
    'spasiRing',
    'pomogiRing',
    'megaRing',
  ] as const)
    put(st.player.body, item);
  st.player.body.pockets.pistol = { bullets: 7, silencer: true };
  st.player.body.mouth.guard = true;
  st.player.body.skin.tattoo = true;
  await page.addInitScript(
    (json) => localStorage.setItem('gopnik:autosave', json),
    JSON.stringify(st)
  );
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /Шмотки/ });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Шмотки' });
  await expect(
    dialog.getByRole('button', { name: 'Костюм: Костюм Adidas' }).locator('.item-picture')
  ).toHaveCSS('background-image', /adidas-red/);
  await expect(dialog.getByRole('button', { name: 'Оружие: Тесак' })).toBeVisible();
  await expect(
    dialog.getByRole('button', { name: 'Оружие: Тесак' }).locator('.item-picture')
  ).toHaveCSS('background-image', /weapons/);
  await expect(
    dialog.getByRole('button', { name: 'Крест: Крестик' }).locator('.item-picture')
  ).toHaveCSS('background-image', /accessories/);
  await expect(
    dialog.getByRole('button', { name: 'Пистолет: Пистолет с глушителем, патронов: 7' })
  ).toBeVisible();
  await expect(dialog.locator('.equipment-spares')).toContainText('Костюм Abibas');
  await expect(dialog.locator('.equipment-spares')).toContainText('Нож');
  await dialog.getByRole('button', { name: 'Оружие: Тесак' }).click();
  await expect(dialog.locator('.equipment-detail')).toContainText('Тесак');
  await expect(dialog.locator('.equipment-detail')).toContainText('урон +9');
  await dialog.getByRole('button', { name: 'Закрыть' }).click();
  await expect(dialog).toHaveCount(0);
});
