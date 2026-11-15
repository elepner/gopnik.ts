/** Enemies: generation, the rector bosses, `sv` (inspect the enemy). */
import { Effect } from 'effect';

import { ENEMIES, enemyAt } from '../state/kinds';
import { typeName, rankName } from '../state/names';
import { battle, type Enemy, newEnemy } from '../state/state';
import { div, i16, round, u8 } from '../tp/num';
import { accuracy, healthColor } from './hero';
import { println, rnd, started } from './prelude';
import { text, type Text } from './text';
import { ENEMY } from './texts';

/** who spawned the enemy: walking, being caught (market/club/den help), the den job (cop) */
export type SpawnKind = 0 | 1 | 2;

/**
 * An enemy shows up (`spawnEnemy`, `setupRector`) for the meeting: the talk, the fight and what
 * follows it; then he is gone, the battle with him too (also when the game ends in it).
 */
export function encounter<A, E, R, E2, R2>(
  spawn: Effect.Effect<void, E2, R2>,
  meeting: Effect.Effect<A, E, R>
) {
  const gone = Effect.map(started, (st) => {
    st.battle = null;
  });
  return Effect.andThen(spawn, Effect.ensuring(meeting, Effect.orDie(gone)));
}

/** 0000:0D14 */
export function spawnEnemy(kind: SpawnKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    const enemy = newEnemy();
    st.battle = { enemy, backup: 0 };
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
    enemy.type = enemyAt(type);

    const bonus = (yield* rnd(st.world.district)) * 4;
    const r5 = yield* rnd(5);
    const below = (yield* rnd(2)) + 1;
    const above = (yield* rnd(2)) + 1;
    enemy.level = i16(round((st.player.progression.level * above) / below + r5 - 2) + bonus);
    if (enemy.level < 0) enemy.level = 0;
    if (st.world.trail) enemy.level = i16(round(enemy.level * 1.5));

    enemy.stats.strength = i16((enemy.stats.agility = enemy.stats.vitality = enemy.stats.luck = 0));
    const { strength: w0, agility: w1, vitality: w2, luck: w3 } = ENEMIES[enemy.type].weights;
    const total = (w0 + w1 + w2 + w3) & 0xff;
    const points = (total + enemy.level * 2) & 0xff;
    for (let l = 1; l <= points; l++) {
      const r = (yield* rnd(total)) + 1;
      if (r <= w0) enemy.stats.strength = i16(enemy.stats.strength + 1);
      else if (r <= w1 + w0) enemy.stats.agility = i16(enemy.stats.agility + 1);
      else if (r <= w2 + w1 + w0) enemy.stats.vitality = i16(enemy.stats.vitality + 1);
      else if (r <= w3 + w2 + w1 + w0) enemy.stats.luck = i16(enemy.stats.luck + 1);
    }
    yield* deriveEnemy;

    const loot = () => round(i16(ENEMIES[enemy.type].tier * enemy.level) / 5) + div(enemy.level, 2);
    const junkBase = yield* rnd(6);
    enemy.loot.junk = i16((yield* rnd(loot())) * 2 - loot() + junkBase);
    if (enemy.loot.junk < 0) enemy.loot.junk = 0;
    const moneyBase = yield* rnd(6);
    enemy.loot.money = i16((yield* rnd(loot())) - div(loot(), 2) + moneyBase);
    if (enemy.loot.money < 0) enemy.loot.money = 0;
    enemy.loot.beer = i16((yield* rnd(2)) + div(enemy.level, 10) + 1);
    const armor = div((st.world.district - 1) * (st.world.district - 1) * 4, 2);
    enemy.armor = u8((yield* rnd(armor)) + armor);
  });
}

/** 0000:11C2 — the fake rector (0) and the real one (1) */
export function setupRector(which: 0 | 1) {
  return Effect.gen(function* () {
    const st = yield* started;
    const enemy = newEnemy();
    st.battle = { enemy, backup: 0 };
    enemy.type = 'rector';
    const [level, str, agi, vit, luck, armor] = RECTORS[which];
    enemy.level = i16(level);
    enemy.stats.strength = i16(str);
    enemy.stats.agility = i16(agi);
    enemy.stats.vitality = i16(vit);
    enemy.stats.luck = i16(luck);
    enemy.armor = u8(armor);
    yield* deriveEnemy;
    enemy.loot.money = 0;
    enemy.loot.beer = 0;
    enemy.loot.junk = 0;
  });
}

const RECTORS = [
  [125, 41, 50, 123, 36, 60],
  [160, 50, 60, 188, 32, 80],
] as const;

const deriveEnemy = Effect.gen(function* () {
  const { enemy } = battle(yield* started);
  enemy.damage.min = i16(div(enemy.stats.strength, 2));
  enemy.damage.max = enemy.stats.strength;
  enemy.health.max = i16(enemy.stats.vitality * 5 + enemy.stats.strength + 10);
  enemy.health.current = enemy.health.max;
  enemy.injuries.jaw = false;
  enemy.injuries.leg = false;
});

/** 0000:1348 — `sv`: inspect the enemy */
export const showEnemy = Effect.gen(function* () {
  const { enemy } = battle(yield* started);
  let title = enemy.level > 40 ? ENEMY.neVEtoyZhizni().format : rankName(enemy.level);
  title = ' - ' + title;
  // cops, maniacs and the rector have no rank title
  if (ENEMIES[enemy.type].tier >= ENEMIES.ment.tier) title = '';
  yield* println(ENEMY.etoUrovnya(typeName(enemy.type), enemy.level, title));
  yield* println(
    ENEMY.slLvZhvUd(
      enemy.stats.strength,
      enemy.stats.agility,
      enemy.stats.vitality,
      enemy.stats.luck
    )
  );
  yield* println(ENEMY.uron(enemy.damage.min, enemy.damage.max));
  yield* println(
    ENEMY.zdorove(
      healthColor(enemy.health.current, enemy.health.max),
      enemy.health.current,
      enemy.health.max,
      text(...enemyInjuries(enemy))
    )
  );
  yield* accuracy(enemy.stats.agility);
  if (enemy.armor > 0) yield* println(ENEMY.bronya(enemy.armor));
});

function* enemyInjuries(enemy: Enemy): Generator<Text> {
  if (enemy.injuries.jaw) yield ENEMY.slomanaChelyust();
  if (enemy.injuries.leg) yield ENEMY.slomanaNoga();
}
