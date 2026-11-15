/**
 * What follows a fight, decided by whoever started it, right after it: a victory brings
 * experience, spoils, the den, maybe a ring and loot; a death ends the game. The rules return
 * events like the fight's, the view shows them.
 */
import { Effect } from 'effect';

import { attr, boost } from '../state/attributes';
import { ENEMIES } from '../state/kinds';
import { type Game, type Weapons } from '../state/state';
import { div, i16 } from '../tp/num';
import type { FightOutcome } from './fight';
import { type FightEvent, tell } from './fight-view';
import { DEN_LEVEL, levelInDistrict, levelUp, nextRing } from './hero';
import { rnd, started } from './prelude';
import { lucky, random, type Rule, run } from './rule';
import { gameOver, victoryAnimation } from './screens';

/** the usual aftermath: a victory is claimed, a death ends the game */
export function settle(outcome: FightOutcome) {
  if (outcome === 'won') return claimVictory;
  if (outcome === 'died') return diedInFight;
  return Effect.void;
}

export const diedInFight = Effect.andThen(tell({ type: 'heroDied' }), gameOver(false));

export const killedByRector = Effect.andThen(tell({ type: 'killedByRector' }), gameOver(false));

/** an ordinary enemy is down */
export const claimVictory = Effect.gen(function* () {
  const st = yield* started;
  yield* tell({ type: 'enemyDied' });
  yield* tell(gainEnemyExp(st));
  if (levelReached(st)) yield* levelUp(false);
  else yield* tell({ type: 'tooWeak' });
  yield* spoils;
});

/** the fake rector is down: a level for him, no experience for his stats */
export const beatFakeRector = Effect.gen(function* () {
  const st = yield* started;
  st.player.progression.exp = st.player.progression.expNext;
  yield* levelUp(true);
  yield* tell({ type: 'fakeRectorKilled' });
  if (levelReached(st)) yield* levelUp(false);
  yield* spoils;
});

/** the real rector is down: the end of the game */
export const beatRector = Effect.gen(function* () {
  const st = yield* started;
  st.player.progression.exp = st.player.progression.expNext;
  yield* levelUp(true);
  yield* tell({ type: 'rectorKilled' });
  return yield* victoryAnimation;
});

/** the lad of the den is helped: respect and experience on top of the victory */
export const denHelpReward = Effect.gen(function* () {
  yield* tell(rewardDenHelp(yield* started));
  yield* levelUp(false);
});

/** what every victory brings; then the called lads go home */
const spoils = Effect.gen(function* () {
  const st = yield* started;
  yield* tell(takeSpoils(st));
  if (openDen(st)) yield* tell({ type: 'denOpened' });
  if ((yield* rnd(30)) === 0) {
    const ring = nextRing(st);
    if (ring) yield* tell({ type: 'ringDropped', ring });
  }
  yield* run(loot(st));
  st.combat.backup = 0;
});

// ------------------------------------------------------------------ rules

function levelReached(st: Game): boolean {
  return st.player.progression.exp >= st.player.progression.expNext;
}

/** experience for an enemy: the sum of its stats */
function gainEnemyExp(st: Game): FightEvent {
  const { strength, agility, vitality, luck } = st.enemy.stats;
  const exp = strength + agility + vitality + luck;
  st.player.progression.exp = i16(st.player.progression.exp + exp);
  return { type: 'exp', exp };
}

/** the enemy's beer, money and junk, 5 health and respect by its tier and level */
function takeSpoils(st: Game): FightEvent {
  st.player.resources.beer = i16(st.player.resources.beer + st.enemy.loot.beer);
  st.player.resources.money = i16(st.player.resources.money + st.enemy.loot.money);
  st.player.resources.junk = i16(st.player.resources.junk + st.enemy.loot.junk);
  st.player.health.current = i16(st.player.health.current + 5);
  if (st.player.health.current > attr(st.player, 'healthMax'))
    st.player.health.current = attr(st.player, 'healthMax');
  st.player.respect = i16(
    st.player.respect + (ENEMIES[st.enemy.type].tier + 1 + div(st.enemy.level, 3))
  );
  return { type: 'victoryBeer' };
}

/** true when the den opens now */
function openDen(st: Game): boolean {
  if (st.world.places.den || levelInDistrict(st) < DEN_LEVEL) return false;
  st.world.places.den = true;
  return true;
}

function rewardDenHelp(st: Game): FightEvent {
  const respect = st.world.district * 20;
  const exp = st.world.district * 10;
  st.player.respect = i16(st.player.respect + respect);
  st.player.progression.exp = i16(st.player.progression.exp + exp);
  return { type: 'denHelped', respect, exp };
}

/** what a lucky hero finds on the enemy, by its kind */
function* loot(st: Game): Rule {
  if ((yield* lucky(st, st.world.district * 25)) && st.enemy.type === 'nark') {
    st.player.resources.joints = i16(st.player.resources.joints + (yield* random(3)));
    yield { type: 'narkJoints' };
  }
  if (!(yield* lucky(st, st.world.district * 40))) return;
  const weapon = (n: number) => {
    boost(st.player, 'weapons', 'damageMin', n);
    boost(st.player, 'weapons', 'damageMax', n);
  };
  const w = st.player.body.hands.weapons;
  const group = ENEMIES[st.enemy.type].group;
  if (st.enemy.type === 'nefor') {
    const r = yield* random(3);
    if (r === 0 && !st.player.body.neck.cross) {
      boost(st.player, 'cross', 'luck', 2);
      st.player.body.neck.cross = true;
      yield { type: 'found', item: 'cross' };
    } else if (r === 1 && !st.player.body.hands.rings.spasi) {
      boost(st.player, 'rings', 'luck', 1);
      st.player.body.hands.rings.spasi = true;
      yield { type: 'found', item: 'spasiRing' };
    } else if (r === 2 && !st.player.body.pockets.phone) {
      st.player.body.pockets.phone = true;
      yield { type: 'found', item: 'phone' };
    }
  } else if (group === 'lad') {
    const r = yield* random(2);
    if (r === 0 && !w.knuckles) {
      w.knuckles = true;
      yield { type: 'found', item: 'knuckles' };
      if (noneOf(w, 'knife', 'club', 'cleaver')) weapon(2);
      else yield { type: 'betterWeaponInHand' };
    } else if (r === 1 && !w.club) {
      w.club = true;
      yield { type: 'found', item: 'club' };
      if (noneOf(w, 'knife', 'cleaver')) weapon(w.knuckles ? 2 : 4);
      else yield { type: 'betterWeaponInHand' };
    }
  } else if (group === 'thug') {
    const r = yield* random(2);
    if (r === 0 && !st.player.body.eyes.glasses) {
      st.player.body.eyes.glasses = true;
      yield { type: 'found', item: 'glasses' };
    } else if (r === 1 && !st.player.body.pockets.phone) {
      st.player.body.pockets.phone = true;
      yield { type: 'found', item: 'phone' };
    }
  } else if (group === 'maniac') {
    const r = yield* random(2);
    if (r === 0 && !w.knife) {
      w.knife = true;
      yield { type: 'found', item: 'knife' };
      // sic: the original's boolean arithmetic, stacking bonuses
      if (!w.club === w.knuckles) weapon(4);
      if (w.club) weapon(2);
      if (noneOf(w, 'knuckles', 'club', 'cleaver')) weapon(6);
      if (w.cleaver) yield { type: 'cleaverInHand' };
    } else if (r === 1 && !w.cleaver) {
      w.cleaver = true;
      yield { type: 'found', item: 'cleaver' };
      if ((!w.club && !w.knife) === w.knuckles) weapon(7);
      if (w.club && !w.knife) weapon(5);
      if (w.knife) weapon(3);
      if (noneOf(w, 'knuckles', 'club', 'knife')) weapon(9);
    }
  }
}

/** none of these weapons in hand (a new weapon only adds the difference to the best one) */
function noneOf(weapons: Weapons, ...names: (keyof Weapons)[]): boolean {
  return names.every((name) => !weapons[name]);
}
