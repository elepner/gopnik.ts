/** Enemies: generation, the rector bosses, `sv` (inspect the enemy). */
import { Effect } from 'effect';

import { ENEMIES, enemyAt } from '../state/kinds';
import { typeName, rankName } from '../state/names';
import { div, i16, round, u8 } from '../tp/num';
import { accuracy, healthColor } from './hero';
import { println, rnd, started } from './prelude';
import { ENEMY } from './texts';

/** who spawned the enemy: walking, being caught (market/club/den help), the den job (cop) */
export type SpawnKind = 0 | 1 | 2;

/** 0000:0D14 */
export function spawnEnemy(kind: SpawnKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    // triangular distribution: low types are common
    let type = (yield* rnd(51)) + 1;
    for (let l = 1; l <= 10; l++) {
      if (type - l < 0) {
        type = 10 - l;
        break;
      }
      type -= l;
    }
    type += yield* rnd(st.world.district);
    if (st.world.trail) type += yield* rnd(4);
    if (type > 9) type = 9;
    if (kind === 1 && type > 7) type = 7;
    if (kind === 2) type = 8;
    st.enemy.type = enemyAt(type);

    const bonus = (yield* rnd(st.world.district)) * 4;
    const r5 = yield* rnd(5);
    const below = (yield* rnd(2)) + 1;
    const above = (yield* rnd(2)) + 1;
    st.enemy.level = i16(round((st.player.progression.level * above) / below + r5 - 2) + bonus);
    if (st.enemy.level < 0) st.enemy.level = 0;
    if (st.world.trail) st.enemy.level = i16(round(st.enemy.level * 1.5));

    st.enemy.stats.strength = i16(
      (st.enemy.stats.agility = st.enemy.stats.vitality = st.enemy.stats.luck = 0)
    );
    const { strength: w0, agility: w1, vitality: w2, luck: w3 } = ENEMIES[st.enemy.type].weights;
    const total = (w0 + w1 + w2 + w3) & 0xff;
    const points = (total + st.enemy.level * 2) & 0xff;
    for (let l = 1; l <= points; l++) {
      const r = (yield* rnd(total)) + 1;
      if (r <= w0) st.enemy.stats.strength = i16(st.enemy.stats.strength + 1);
      else if (r <= w1 + w0) st.enemy.stats.agility = i16(st.enemy.stats.agility + 1);
      else if (r <= w2 + w1 + w0) st.enemy.stats.vitality = i16(st.enemy.stats.vitality + 1);
      else if (r <= w3 + w2 + w1 + w0) st.enemy.stats.luck = i16(st.enemy.stats.luck + 1);
    }
    yield* deriveEnemy;

    const loot = () =>
      round(i16(ENEMIES[st.enemy.type].tier * st.enemy.level) / 5) + div(st.enemy.level, 2);
    const junkBase = yield* rnd(6);
    st.enemy.loot.junk = i16((yield* rnd(loot())) * 2 - loot() + junkBase);
    if (st.enemy.loot.junk < 0) st.enemy.loot.junk = 0;
    const moneyBase = yield* rnd(6);
    st.enemy.loot.money = i16((yield* rnd(loot())) - div(loot(), 2) + moneyBase);
    if (st.enemy.loot.money < 0) st.enemy.loot.money = 0;
    st.enemy.loot.beer = i16((yield* rnd(2)) + div(st.enemy.level, 10) + 1);
    const armor = div((st.world.district - 1) * (st.world.district - 1) * 4, 2);
    st.enemy.armor = u8((yield* rnd(armor)) + armor);
  });
}

/** 0000:11C2 — the fake rector (0) and the real one (1) */
export function setupRector(which: 0 | 1) {
  return Effect.gen(function* () {
    const st = yield* started;
    st.enemy.type = 'rector';
    const [level, str, agi, vit, luck, armor] = RECTORS[which];
    st.enemy.level = i16(level);
    st.enemy.stats.strength = i16(str);
    st.enemy.stats.agility = i16(agi);
    st.enemy.stats.vitality = i16(vit);
    st.enemy.stats.luck = i16(luck);
    st.enemy.armor = u8(armor);
    yield* deriveEnemy;
    st.enemy.loot.money = 0;
    st.enemy.loot.beer = 0;
    st.enemy.loot.junk = 0;
  });
}

const RECTORS = [
  [125, 41, 50, 123, 36, 60],
  [160, 50, 60, 188, 32, 80],
] as const;

const deriveEnemy = Effect.gen(function* () {
  const st = yield* started;
  st.enemy.damage.min = i16(div(st.enemy.stats.strength, 2));
  st.enemy.damage.max = st.enemy.stats.strength;
  st.enemy.health.max = i16(st.enemy.stats.vitality * 5 + st.enemy.stats.strength + 10);
  st.enemy.health.current = st.enemy.health.max;
  st.enemy.injuries.jaw = false;
  st.enemy.injuries.leg = false;
});

/** 0000:1348 — `sv`: inspect the enemy */
export const showEnemy = Effect.gen(function* () {
  const st = yield* started;
  let title = st.enemy.level > 40 ? ENEMY.neVEtoyZhizni : rankName(st.enemy.level);
  title = ' - ' + title;
  // cops, maniacs and the rector have no rank title
  if (ENEMIES[st.enemy.type].tier >= ENEMIES.ment.tier) title = '';
  yield* println(ENEMY.etoUrovnya, typeName(st.enemy.type), st.enemy.level, title);
  yield* println(
    ENEMY.slLvZhvUd,
    st.enemy.stats.strength,
    st.enemy.stats.agility,
    st.enemy.stats.vitality,
    st.enemy.stats.luck
  );
  yield* println(ENEMY.uron, st.enemy.damage.min, st.enemy.damage.max);
  let injuries = '';
  if (st.enemy.injuries.jaw) injuries += ENEMY.slomanaChelyust;
  if (st.enemy.injuries.leg) injuries += ENEMY.slomanaNoga;
  yield* println(
    ENEMY.zdorove,
    healthColor(st.enemy.health.current, st.enemy.health.max),
    st.enemy.health.current,
    st.enemy.health.max,
    injuries
  );
  yield* accuracy(st.enemy.stats.agility);
  if (st.enemy.armor > 0) yield* println(ENEMY.bronya, st.enemy.armor);
});
