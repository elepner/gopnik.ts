/** What the player sees of an enemy: a look at him (`enemy.ts`). */
import { Effect } from 'effect';

import { ENEMIES } from '../state/kinds';
import { rankName, typeName } from '../state/names';
import { battle, type Enemy } from '../state/state';
import { healthColor } from './hero';
import { accuracy } from './hero-view';
import { println, started } from './prelude';
import { text, type Text } from './text';
import { ENEMY } from './texts';

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
