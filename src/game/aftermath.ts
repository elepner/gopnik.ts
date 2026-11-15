/**
 * What follows a fight, decided by whoever started it, right after it: a victory brings
 * experience, spoils, the den, maybe a ring and loot; a death ends the game. The rules only
 * decide what happens and say it as events; `apply` puts an event into the state (a found
 * thing into its slot: the hero's attributes follow from the slots), `aftermath-view.ts` shows
 * it.
 */
import { Effect } from 'effect';

import { attr } from '../state/attributes';
import { ENEMY_DROPS } from '../state/enemy-drop';
import { has, nextRing } from '../state/items';
import { ENEMIES } from '../state/kinds';
import { type Game } from '../state/state';
import { div, i16 } from '../tp/num';
import { type AftermathEvent, tell } from './aftermath-view';
import type { FightOutcome } from './fight';
import { DEN_LEVEL, levelInDistrict, levelUp, take } from './hero';
import { rnd, started } from './prelude';
import { lucky, random, type Rule, run } from './rule';
import { gameOver, victoryAnimation } from './screens';

/** the usual aftermath: a victory is claimed, a death ends the game */
export function settle(outcome: FightOutcome) {
  if (outcome === 'won') return claimVictory;
  if (outcome === 'died') return diedInFight;
  return Effect.void;
}

export const diedInFight = Effect.andThen(report({ type: 'heroDied' }), gameOver(false));

export const killedByRector = Effect.andThen(report({ type: 'killedByRector' }), gameOver(false));

/** an ordinary enemy is down */
export const claimVictory = Effect.gen(function* () {
  const st = yield* started;
  yield* report({ type: 'enemyDied' });
  yield* report(enemyExp(st));
  if (levelReached(st)) yield* levelUp(false);
  else yield* report({ type: 'tooWeak' });
  yield* spoils;
});

/** the fake rector is down: a level for him, no experience for his stats */
export const beatFakeRector = Effect.gen(function* () {
  const st = yield* started;
  yield* report({ type: 'levelEarned' });
  yield* levelUp(true);
  yield* report({ type: 'fakeRectorKilled' });
  if (levelReached(st)) yield* levelUp(false);
  yield* spoils;
});

/** the real rector is down: the end of the game */
export const beatRector = Effect.gen(function* () {
  yield* report({ type: 'levelEarned' });
  yield* levelUp(true);
  yield* report({ type: 'rectorKilled' });
  return yield* victoryAnimation;
});

/** the lad of the den is helped: respect and experience on top of the victory */
export const denHelpReward = Effect.gen(function* () {
  yield* report(denHelp(yield* started));
  yield* levelUp(false);
});

/** what every victory brings; then the called lads go home */
const spoils = Effect.gen(function* () {
  const st = yield* started;
  yield* report(spoilsOf(st));
  if (opensDen(st)) yield* report({ type: 'denOpened' });
  if ((yield* rnd(30)) === 0) {
    const ring = nextRing(st.player.body);
    if (ring) yield* report({ type: 'ringDropped', ring });
  }
  yield* run(loot(st), report);
  st.combat.backup = 0;
});

/** an event happens: into the state, then onto the screen */
function report(event: AftermathEvent) {
  return Effect.gen(function* () {
    apply(yield* started, event);
    yield* tell(event);
  });
}

function apply(st: Game, event: AftermathEvent) {
  const p = st.player;
  switch (event.type) {
    case 'levelEarned':
      p.progression.exp = p.progression.expNext;
      return;
    case 'exp':
      p.progression.exp = i16(p.progression.exp + event.exp);
      return;
    case 'spoils':
      p.resources.beer = i16(p.resources.beer + event.beer);
      p.resources.money = i16(p.resources.money + event.money);
      p.resources.junk = i16(p.resources.junk + event.junk);
      p.health.current = Math.min(i16(p.health.current + event.health), attr(p, 'healthMax'));
      p.respect = i16(p.respect + event.respect);
      return;
    case 'denOpened':
      st.world.places.den = true;
      return;
    case 'ringDropped':
      return take(st, event.ring);
    case 'found':
      return take(st, event.item);
    case 'joints':
      p.resources.joints = i16(p.resources.joints + event.joints);
      return;
    case 'denHelped':
      p.respect = i16(p.respect + event.respect);
      p.progression.exp = i16(p.progression.exp + event.exp);
      return;
  }
}

// ------------------------------------------------------------------ rules

function levelReached(st: Game): boolean {
  return st.player.progression.exp >= st.player.progression.expNext;
}

/** experience for an enemy: the sum of its stats */
function enemyExp(st: Game): AftermathEvent {
  const { strength, agility, vitality, luck } = st.enemy.stats;
  return { type: 'exp', exp: strength + agility + vitality + luck };
}

/** the enemy's beer, money and junk, 5 health and respect by its tier and level */
function spoilsOf(st: Game): AftermathEvent {
  return {
    type: 'spoils',
    ...st.enemy.loot,
    health: 5,
    respect: ENEMIES[st.enemy.type].tier + 1 + div(st.enemy.level, 3),
  };
}

/** the third level of a district opens the den */
function opensDen(st: Game): boolean {
  return !st.world.places.den && levelInDistrict(st) >= DEN_LEVEL;
}

function denHelp(st: Game): AftermathEvent {
  return { type: 'denHelped', respect: st.world.district * 20, exp: st.world.district * 10 };
}

/**
 * What a lucky hero finds on the enemy: a нарк's joints, then one of the things its kind drops
 * (`enemy-drop.ts`), picked by Random — nothing when the hero has that one already.
 */
function* loot(st: Game): Rule<AftermathEvent> {
  const drop = ENEMY_DROPS[st.enemy.type];
  if ((yield* lucky(st, st.world.district * 25)) && drop.joints)
    yield { type: 'joints', joints: yield* random(3) };
  if (!(yield* lucky(st, st.world.district * 40)) || drop.items.length === 0) return;
  const item = drop.items[yield* random(drop.items.length)]!;
  if (!has(st.player.body, item)) yield { type: 'found', item };
}
