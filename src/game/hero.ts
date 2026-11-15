/** The player character: level-ups, experience, items. */
import { Effect } from 'effect';

import { attr, dec, inc, set } from '../state/attributes';
import { type Item, put, RING_HEALTH } from '../state/items';
import { CHARACTER_CLASSES } from '../state/kinds';
import type { Game, Player, Progression, StatKey } from '../state/state';
import { i16, mod } from '../tp/num';
import { emit, reporter } from './events';
import type { HeroEvent } from './hero-view';
import { rnd, started } from './prelude';
import type { Color } from './text';

// what the player sees of the hero lives in the view; re-exported for the callers

const report = reporter(apply);

/** health colour: red up to 25%, yellow up to 50%, green above (Real division) */
export function healthColor(hp: number, max: number): Color {
  const ratio = hp / max;
  if (ratio > 0.5) return 'green';
  if (ratio > 0.25) return 'yellow';
  return 'red';
}

/** litres after the dot for beer counted in half-litres */
export function beerTenths(beer: number): number {
  return mod(mod(beer, 2) * 5, 10);
}

/** 0000:2526 — spend experience on level-ups; `rector` lifts the level-40 cap and the summary */
export function levelUp(rector: boolean) {
  return Effect.gen(function* () {
    const st = yield* started;
    const levels = levelsPaid(st.player.progression);
    if (levels === 0) return;
    yield* report({ type: 'heroExpSpent', levels });
    const {
      strength: w0,
      agility: w1,
      vitality: w2,
      luck: w3,
    } = CHARACTER_CLASSES[st.player.type].weights;
    const total = w0 + w1 + w2 + w3;
    for (let k = 1; k <= levels; k++) {
      if (!rector && st.player.progression.level === 40) break;
      const gains: StatKey[] = [];
      for (let j = 1; j <= 2; j++) {
        const r = (yield* rnd(total)) + 1;
        if (w0 >= r) gains.push('strength');
        else if (w1 + w0 >= r) gains.push('agility');
        else if (w2 + w1 + w0 >= r) gains.push('vitality');
        else if (w3 + w2 + w1 + w0 >= r) gains.push('luck');
      }
      yield* report({ type: 'heroLevelGained', gains });
    }
    if (!rector) yield* emit({ type: 'heroExpLeft' });
  });
}

/** how many level-ups the experience pays for: each costs `expNext`, which grows by 10 */
function levelsPaid({ exp, expNext }: Progression): number {
  let left = exp;
  let next = expNext;
  let levels = 0;
  while (left >= next) {
    left -= next;
    next += 10;
    levels++;
  }
  return levels;
}

/** +1 strength with its derived stats (temple blessing) */
export const strengthUp = report({ type: 'heroStrengthGained' });

/** "Ты получаешь # качков опыта" + level-up */
export function gainExp(n: number) {
  return Effect.andThen(report({ type: 'heroExpGained', exp: n }), levelUp(false));
}

/** the third level of a district opens the den */
export const DEN_LEVEL = 3;

/** the hero's level counted from the start of the current district (10 levels each) */
export function levelInDistrict(st: Game): number {
  return st.player.progression.level - (st.world.district - 1) * 10;
}

/** running away costs the stats of the last level-up */
export function lostStats(st: Game): readonly StatKey[] {
  return st.player.progression.history[st.player.progression.level] ?? [];
}

// ------------------------------------------------------------------ the state

/** what happens to the hero goes into the state */
function apply(st: Game, event: HeroEvent) {
  const p = st.player;
  switch (event.type) {
    case 'heroExpSpent':
      for (let k = 1; k <= event.levels; k++) {
        dec(p, 'exp', p.progression.expNext);
        p.progression.expNext = i16(p.progression.expNext + 10);
      }
      return;
    case 'heroLevelGained':
      p.progression.level = i16(p.progression.level + 1);
      for (const stat of event.gains) raiseStat(p, stat);
      return;
    case 'heroStrengthGained':
      return blessStrength(p);
    case 'heroExpGained':
      return inc(p, 'exp', event.exp);
  }
}

/** a stat of a level-up with what follows from it; the original keeps a string[2] per level for levels 1..40 */
function raiseStat(p: Player, stat: StatKey) {
  const level = p.progression.level;
  if (level <= 40) {
    const history = p.progression.history[level] ?? [];
    p.progression.history[level] = [...history, stat].slice(0, 2);
  }
  inc(p, stat, 1);
  if (stat === 'strength') {
    inc(p, 'damageMax', 1);
    if (mod(attr(p, 'strength'), 2) === 0) inc(p, 'damageMin', 1);
    inc(p, 'healthMax', 1);
    inc(p, 'health', 1);
  }
  if (stat === 'vitality') {
    inc(p, 'healthMax', 5);
    inc(p, 'health', 5);
  }
}

/** the temple's +1 strength: the minimum damage grows by 1 − strength mod 2 */
export function blessStrength(p: Player) {
  inc(p, 'strength', 1);
  inc(p, 'healthMax', 1);
  inc(p, 'health', 1);
  inc(p, 'damageMax', 1);
  inc(p, 'damageMin', 1 - mod(attr(p, 'strength'), 2));
}

/**
 * A found thing goes into its slot; a ring of the chain also heals what it adds to the maximum.
 * For an `apply`.
 */
export function take(st: Game, item: Item) {
  put(st.player.body, item);
  inc(st.player, 'health', RING_HEALTH[item] ?? 0);
}

/** running away: the stats of the last level-up and the level itself are taken back. For an `apply`. */
export function levelDown(st: Game) {
  const progression = st.player.progression;
  const lost = lostStats(st);
  progression.history[progression.level] = [];
  for (const stat of lost) loseStat(st.player, stat);
  progression.level = i16(progression.level - 1);
  progression.expNext = i16(progression.expNext - 10);
  if (progression.exp >= progression.expNext) set(st.player, 'exp', progression.expNext - 1);
}

function loseStat(p: Player, stat: StatKey) {
  dec(p, stat, 1);
  if (stat === 'strength') {
    dec(p, 'damageMax', 1);
    if (mod(attr(p, 'strength'), 2) === 1) dec(p, 'damageMin', 1);
    dec(p, 'healthMax', 1);
  }
  if (stat === 'vitality') dec(p, 'healthMax', 5);
  if ((stat === 'strength' || stat === 'vitality') && p.health.current > attr(p, 'healthMax'))
    set(p, 'health', attr(p, 'healthMax'));
}
