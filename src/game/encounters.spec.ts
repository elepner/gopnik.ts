import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import { attr } from '../state/attributes';
import { has, put } from '../state/items';
import type { GameState } from '../state/state';
import { District, SaveName } from '../tp/brands';
import { saveMage, temple } from './encounters';
import type { GameEvent } from './events';
import { Disk } from './prelude';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l.split(''), 'enter']);

/** runs one encounter with the hero prepared by `setup`; the events are kept */
function meet<A, E, R>(
  eff: Effect.Effect<A, E, R>,
  setup: (s: GameState) => void,
  opts: { seed?: number; keys?: string[] } = {}
) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(eff, { ...opts, setup, events });
    return { ...played, events, types: events.map((e) => e.type) };
  });
}

/** the mage, then what lies on the disk */
const mageThenDisk = Effect.gen(function* () {
  yield* saveMage;
  const disk = yield* Disk;
  return {
    save: yield* disk.read(SaveName('save_r0.sav')),
    places: yield* disk.read(SaveName('places.sav')),
  };
});

describe('saveMage (0000:7538)', () => {
  it.effect('declined: nothing is saved', () =>
    Effect.gen(function* () {
      const { st, types, exit } = yield* meet(
        mageThenDisk,
        (s) => (hero(s).player.resources.money = 100),
        {
          keys: keys('n'),
        }
      );
      expect(types).toEqual(['mageMet', 'mageDeclined']);
      expect(st.player.resources.money).toBe(100);
      expect(exit).toMatchObject({ value: { save: undefined, places: undefined } });
    })
  );

  it.effect('too poor: district*50 is the price', () =>
    Effect.gen(function* () {
      const { st, types, exit } = yield* meet(
        mageThenDisk,
        (s) => {
          const st = hero(s);
          st.world.district = District(2);
          st.player.resources.money = 99;
        },
        { keys: keys('y') }
      );
      expect(types).toEqual(['mageMet', 'mageUnpaid']);
      expect(st.player.resources.money).toBe(99);
      expect(exit).toMatchObject({ value: { save: undefined, places: undefined } });
    })
  );

  it.effect('paid: the game and the places are saved', () =>
    Effect.gen(function* () {
      const { st, types, exit } = yield* meet(
        mageThenDisk,
        (s) => {
          const st = hero(s);
          st.world.district = District(2);
          st.player.resources.money = 130;
        },
        { keys: keys('y') }
      );
      expect(types).toEqual(['mageMet', 'magePaid', 'mageSaved']);
      expect(st.player.resources.money).toBe(30);
      expect(exit).toMatchObject({
        value: { save: expect.any(Uint8Array), places: expect.any(Uint8Array) },
      });
    })
  );
});

describe('temple (0000:7C67)', () => {
  /** the blessing the temple gave */
  const blessing = (events: GameEvent[]) =>
    events.find((e) => e.type === 'templeBlessed') as Extract<GameEvent, { type: 'templeBlessed' }>;

  it.effect('a level: the experience for it, then the level-up (seed 0)', () =>
    Effect.gen(function* () {
      const { st, events, types } = yield* meet(temple, hero, { seed: 0 });
      expect(blessing(events).blessing).toBe('level');
      expect(st.player.progression.level).toBe(1);
      expect(types).toEqual([
        'templeEntered',
        'templeBlessed',
        'heroExpSpent',
        'heroLevelGained',
        'heroExpLeft',
        'templeLeft',
      ]);
    })
  );

  it.effect('strength (seed 11)', () =>
    Effect.gen(function* () {
      const { st, events, types } = yield* meet(temple, hero, { seed: 11 });
      expect(blessing(events).blessing).toBe('strength');
      expect(attr(st.player, 'strength')).toBe(6);
      expect(types).toEqual(['templeEntered', 'templeBlessed', 'heroStrengthGained', 'templeLeft']);
    })
  );

  it.effect('agility (seed 9)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* meet(temple, hero, { seed: 9 });
      expect(blessing(events).blessing).toBe('agility');
      expect(attr(st.player, 'agility')).toBe(3);
    })
  );

  it.effect('vitality: also 5 more health and maximum (seed 8)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* meet(temple, hero, { seed: 8 });
      expect(blessing(events).blessing).toBe('vitality');
      expect([
        attr(st.player, 'vitality'),
        attr(st.player, 'healthMax'),
        st.player.health.current,
      ]).toEqual([5, 40, 40]);
    })
  );

  it.effect('luck (seed 7)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* meet(temple, hero, { seed: 7 });
      expect(blessing(events).blessing).toBe('luck');
      expect(attr(st.player, 'luck')).toBe(2);
    })
  );

  it.effect('armor (seed 20)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* meet(temple, hero, { seed: 20 });
      expect(blessing(events).blessing).toBe('armor');
      expect(attr(st.player, 'armor')).toBe(1);
    })
  );

  it.effect('respect: district*50+50 (seed 26)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* meet(temple, (s) => (hero(s).world.district = District(2)), {
        seed: 26,
      });
      expect(blessing(events).blessing).toBe('respect');
      expect(events).toContainEqual({ type: 'templeRespect', respect: 150 });
      expect(st.player.respect).toBe(150);
    })
  );

  // seed 13: a ring
  it.effect('a ring: the next one of the chain', () =>
    Effect.gen(function* () {
      const { st, events } = yield* meet(temple, (s) => put(hero(s).player.body, 'pomogiRing'), {
        seed: 13,
      });
      expect(blessing(events).blessing).toBe('ring');
      expect(events).toContainEqual({ type: 'templeRingGiven', ring: 'megaRing' });
      expect(has(st.player.body, 'megaRing')).toBe(true);
    })
  );

  it.effect('a ring when the hero has them all: nothing', () =>
    Effect.gen(function* () {
      const { types } = yield* meet(
        temple,
        (s) => {
          const body = hero(s).player.body;
          for (const ring of ['pomogiRing', 'megaRing', 'pomiluyRing'] as const) put(body, ring);
        },
        { seed: 13 }
      );
      expect(types).toEqual(['templeEntered', 'templeBlessed', 'templeLeft']);
    })
  );

  it.effect('the visits count up to 2', () =>
    Effect.gen(function* () {
      const first = yield* meet(temple, hero, { seed: 9 });
      expect(first.st.world.templeVisits).toBe(1);
      const fed = yield* meet(temple, (s) => (hero(s).world.templeVisits = 2), { seed: 9 });
      expect(fed.st.world.templeVisits).toBe(2);
    })
  );
});
