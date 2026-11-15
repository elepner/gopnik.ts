import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../../test/game';
import type { GameState } from '../../state/state';
import type { GameEvent } from '../events';
import { vet } from './vet';

const keys = (...lines: string[]) => lines.flatMap((l) => [...Array.from(l), 'enter']);
const types = (events: GameEvent[]) => events.map((e) => e.type);
const prompt = { type: 'prompt', context: 'vet' };

/** the hero at the vet with some money and 20 of 35 health */
function hurt(s: GameState, money = 10) {
  const st = hero(s);
  st.player.resources.money = money;
  st.player.health.current = 20;
  return st;
}

describe('vet (0000:D39C)', () => {
  it.effect('an unknown hospital is not found', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(vet, {
        events,
        setup: (s) => (hurt(s).world.places.hospital = false),
      });
      expect(Exit.isSuccess(exit)).toBe(true);
      expect(types(events)).toEqual(['vetNotFound']);
    })
  );

  it.effect('a healthy hero is sent away at once', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(vet, { events, setup: hero });
      expect(Exit.isSuccess(exit)).toBe(true);
      expect(types(events)).toEqual(['enteredVet', 'vetSentAway']);
    })
  );

  it.effect('h patches up 5 health for 3 roubles', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(vet, { events, keys: keys('h'), setup: (s) => hurt(s) });
      expect([st.player.health.current, st.player.resources.money]).toEqual([25, 7]);
      expect(rand.map((r) => r.n)).toEqual([3]);
      expect(events).toContainEqual({ type: 'vetPatchedUp', roll: rand[0].result });
      expect(events.at(-1)).toEqual(prompt);
    })
  );

  it.effect('patching up stops at the maximum health, then the hero is sent away', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, exit } = yield* play(vet, {
        events,
        keys: keys('h'),
        setup: (s) => (hurt(s).player.health.current = 33),
      });
      expect(Exit.isSuccess(exit)).toBe(true);
      expect([st.player.health.current, st.player.resources.money]).toEqual([35, 7]);
      expect(types(events)).toEqual(['enteredVet', 'prompt', 'vetPatchedUp', 'vetSentAway']);
    })
  );

  it.effect('patching up without 3 roubles is refused', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(vet, {
        events,
        keys: keys('h'),
        setup: (s) => hurt(s, 2),
      });
      expect([st.player.health.current, st.player.resources.money]).toEqual([20, 2]);
      expect(rand).toHaveLength(0);
      expect(types(events)).toEqual(['enteredVet', 'prompt', 'vetRefused', 'prompt']);
    })
  );

  it.effect('r sets the broken bones for 7 roubles, a healed hero is sent away', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, exit } = yield* play(vet, {
        events,
        keys: keys('r'),
        setup: (s) => {
          const st = hurt(s);
          st.player.health.current = 35;
          st.player.injuries.jaw = true;
          st.player.injuries.leg = true;
        },
      });
      expect(Exit.isSuccess(exit)).toBe(true);
      expect([st.player.injuries.jaw, st.player.injuries.leg, st.player.resources.money]).toEqual([
        false,
        false,
        3,
      ]);
      expect(types(events)).toEqual(['enteredVet', 'prompt', 'vetBonesFixed', 'vetSentAway']);
    })
  );

  it.effect('setting bones without 7 roubles is refused', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(vet, {
        events,
        keys: keys('r'),
        setup: (s) => (hurt(s, 6).player.injuries.leg = true),
      });
      expect([st.player.injuries.leg, st.player.resources.money]).toEqual([true, 6]);
      expect(types(events)).toEqual(['enteredVet', 'prompt', 'vetRefused', 'prompt']);
    })
  );

  it.effect('r without broken bones does nothing', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(vet, { events, keys: keys('r'), setup: (s) => hurt(s) });
      expect([st.player.health.current, st.player.resources.money]).toEqual([20, 10]);
      expect(types(events)).toEqual(['enteredVet', 'prompt', 'prompt']);
    })
  );

  it.effect('h with a broken leg but full health does nothing', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(vet, {
        events,
        keys: keys('h'),
        setup: (s) => {
          const st = hurt(s);
          st.player.health.current = 35;
          st.player.injuries.leg = true;
        },
      });
      expect([st.player.resources.money, st.player.injuries.leg]).toEqual([10, true]);
      expect(rand).toHaveLength(0);
      expect(types(events)).toEqual(['enteredVet', 'prompt', 'prompt']);
    })
  );

  for (const leave of ['w', 'e'])
    it.effect(`${leave} leaves the vet`, () =>
      Effect.gen(function* () {
        const events: GameEvent[] = [];
        const { exit } = yield* play(vet, { events, keys: keys(leave), setup: (s) => hurt(s) });
        expect(Exit.isSuccess(exit)).toBe(true);
        expect(types(events)).toEqual(['enteredVet', 'prompt']);
      })
    );
});
