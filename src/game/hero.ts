/** The player character: level-ups, experience, items. */
import { Effect } from 'effect';

import { attr, dec, inc } from '../state/attributes';
import { type Item, put, RING_HEALTH } from '../state/items';
import { CHARACTER_CLASSES } from '../state/kinds';
import type { Game, StatKey } from '../state/state';
import { i16, mod } from '../tp/num';
import { emit } from './events';
import { rnd, started } from './prelude';
import type { Color } from './text';

// what the player sees of the hero lives in the view; re-exported for the callers
export { accuracy, ringLines, showStats } from './hero-view';

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
    if (st.player.progression.exp < st.player.progression.expNext) return;
    let count = 0;
    do {
      st.player.progression.exp = i16(st.player.progression.exp - st.player.progression.expNext);
      st.player.progression.expNext = i16(st.player.progression.expNext + 10);
      count++;
    } while (st.player.progression.exp >= st.player.progression.expNext);
    for (let k = 1; k <= count; k++) {
      if (!rector && st.player.progression.level === 40) break;
      st.player.progression.level = i16(st.player.progression.level + 1);
      const gains: StatKey[] = [];
      const {
        strength: w0,
        agility: w1,
        vitality: w2,
        luck: w3,
      } = CHARACTER_CLASSES[st.player.type].weights;
      const total = w0 + w1 + w2 + w3;
      // the original keeps a string[2] per level for levels 1..40
      const raise = (stat: StatKey) => {
        gains.push(stat);
        const level = st.player.progression.level;
        if (level > 40) return;
        const history = st.player.progression.history[level] ?? [];
        st.player.progression.history[level] = [...history, stat].slice(0, 2);
      };
      for (let j = 1; j <= 2; j++) {
        const r = (yield* rnd(total)) + 1;
        if (w0 >= r) {
          inc(st.player, 'strength', 1);
          raise('strength');
          inc(st.player, 'damageMax', 1);
          if (mod(attr(st.player, 'strength'), 2) === 0) inc(st.player, 'damageMin', 1);
          inc(st.player, 'healthMax', 1);
          st.player.health.current = i16(st.player.health.current + 1);
        } else if (w1 + w0 >= r) {
          inc(st.player, 'agility', 1);
          raise('agility');
        } else if (w2 + w1 + w0 >= r) {
          inc(st.player, 'vitality', 1);
          raise('vitality');
          inc(st.player, 'healthMax', 5);
          st.player.health.current = i16(st.player.health.current + 5);
        } else if (w3 + w2 + w1 + w0 >= r) {
          inc(st.player, 'luck', 1);
          raise('luck');
        }
      }
      yield* emit({ type: 'heroLevelGained', gains });
    }
    if (!rector) yield* emit({ type: 'heroExpLeft' });
  });
}

/** +1 strength with its derived stats (temple blessing) */
export const strengthUp = Effect.gen(function* () {
  const st = yield* started;
  inc(st.player, 'strength', 1);
  inc(st.player, 'healthMax', 1);
  st.player.health.current = i16(st.player.health.current + 1);
  inc(st.player, 'damageMax', 1);
  inc(st.player, 'damageMin', 1 - mod(attr(st.player, 'strength'), 2));
});

/** a found thing goes into its slot; a ring of the chain also heals what it adds to the maximum */
export function take(st: Game, item: Item) {
  put(st.player.body, item);
  st.player.health.current = i16(st.player.health.current + (RING_HEALTH[item] ?? 0));
}

/** the third level of a district opens the den */
export const DEN_LEVEL = 3;

/** the hero's level counted from the start of the current district (10 levels each) */
export function levelInDistrict(st: Game): number {
  return st.player.progression.level - (st.world.district - 1) * 10;
}

/** running away: the stats of the last level-up and the level itself are taken back */
export function levelDown(st: Game): readonly StatKey[] {
  const progression = st.player.progression;
  const lost = progression.history[progression.level] ?? [];
  progression.history[progression.level] = [];
  for (const stat of lost) loseStat(st, stat);
  progression.level = i16(progression.level - 1);
  progression.expNext = i16(progression.expNext - 10);
  if (progression.exp >= progression.expNext) progression.exp = i16(progression.expNext - 1);
  return lost;
}

function loseStat(st: Game, stat: StatKey) {
  if (stat === 'strength') {
    dec(st.player, 'strength', 1);
    dec(st.player, 'damageMax', 1);
    if (mod(attr(st.player, 'strength'), 2) === 1) dec(st.player, 'damageMin', 1);
    dec(st.player, 'healthMax', 1);
    if (st.player.health.current > attr(st.player, 'healthMax'))
      st.player.health.current = attr(st.player, 'healthMax');
  } else if (stat === 'agility') {
    dec(st.player, 'agility', 1);
  } else if (stat === 'vitality') {
    dec(st.player, 'vitality', 1);
    dec(st.player, 'healthMax', 5);
    if (st.player.health.current > attr(st.player, 'healthMax'))
      st.player.health.current = attr(st.player, 'healthMax');
  } else if (stat === 'luck') {
    dec(st.player, 'luck', 1);
  }
}

/** "Ты получаешь # качков опыта" + level-up */
export function gainExp(n: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* emit({ type: 'heroExpGained', exp: n });
    st.player.progression.exp = i16(st.player.progression.exp + n);
    yield* levelUp(false);
  });
}
