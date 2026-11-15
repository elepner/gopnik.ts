import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import type { Game, GameState } from '../state/state';
import { type BeerMode, drink } from './beer';
import type { GameEvent } from './events';

/** a hero with some health and beer; `more` prepares the rest */
function drinker(health: number, beer: number, more: (st: Game) => void = () => {}) {
  return (s: GameState) => {
    const st = hero(s);
    st.player.health.current = health;
    st.player.resources.beer = beer;
    more(st);
  };
}

const jaw = (st: Game) => (st.player.injuries.jaw = true);

/** drinks and keeps the events */
function sip(mode: BeerMode, setup: (s: GameState) => void) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(drink(mode), { setup, events });
    const { health, resources } = played.st.player;
    return { events, health: health.current, beer: resources.beer };
  });
}

describe('drink (0000:29C4)', () => {
  describe('one beer (h)', () => {
    it.effect('gives 5 health', () =>
      Effect.gen(function* () {
        const r = yield* sip('one', drinker(20, 3));
        expect(r).toEqual({
          events: [{ type: 'drank', healed: 5, full: false }],
          health: 25,
          beer: 2,
        });
      })
    );

    it.effect('gives only what is missing, and says so', () =>
      Effect.gen(function* () {
        const r = yield* sip('one', drinker(32, 3));
        expect(r).toEqual({
          events: [{ type: 'drank', healed: 3, full: true }],
          health: 35,
          beer: 2,
        });
      })
    );

    it.effect('no beer, no drink', () =>
      Effect.gen(function* () {
        const r = yield* sip('one', drinker(20, 0));
        expect(r).toEqual({ events: [{ type: 'noBeer' }], health: 20, beer: 0 });
      })
    );

    it.effect('a healthy hero is not thirsty', () =>
      Effect.gen(function* () {
        const r = yield* sip('one', drinker(35, 3));
        expect(r).toEqual({ events: [{ type: 'notThirsty' }], health: 35, beer: 3 });
      })
    );

    it.effect('a broken jaw can not drink', () =>
      Effect.gen(function* () {
        const r = yield* sip('one', drinker(20, 0, jaw));
        expect(r).toEqual({ events: [{ type: 'cantDrink' }], health: 20, beer: 0 });
      })
    );
  });

  describe('until healthy (mh)', () => {
    it.effect('drinks until healthy and reports once', () =>
      Effect.gen(function* () {
        const r = yield* sip('untilHealthy', drinker(22, 5));
        expect(r).toEqual({
          events: [{ type: 'drankUntilHealthy', beers: 3, healed: 13 }],
          health: 35,
          beer: 2,
        });
      })
    );

    it.effect('the last beer says it ran out', () =>
      Effect.gen(function* () {
        const r = yield* sip('untilHealthy', drinker(10, 2));
        expect(r).toEqual({
          events: [{ type: 'drankUntilHealthy', beers: 2, healed: 10 }, { type: 'beerRanOut' }],
          health: 20,
          beer: 0,
        });
      })
    );

    it.effect('no beer, no drink', () =>
      Effect.gen(function* () {
        const r = yield* sip('untilHealthy', drinker(10, 0));
        expect(r).toEqual({ events: [{ type: 'noBeer' }], health: 10, beer: 0 });
      })
    );

    it.effect('a healthy hero is not thirsty', () =>
      Effect.gen(function* () {
        const r = yield* sip('untilHealthy', drinker(35, 0));
        expect(r).toEqual({ events: [{ type: 'notThirsty' }], health: 35, beer: 0 });
      })
    );

    it.effect('a broken jaw can not drink', () =>
      Effect.gen(function* () {
        const r = yield* sip('untilHealthy', drinker(10, 5, jaw));
        expect(r).toEqual({ events: [{ type: 'cantDrink' }], health: 10, beer: 5 });
      })
    );

    it.effect('a broken jaw and no beer: both are said', () =>
      Effect.gen(function* () {
        const r = yield* sip('untilHealthy', drinker(10, 0, jaw));
        expect(r).toEqual({
          events: [{ type: 'cantDrink' }, { type: 'noBeer' }],
          health: 10,
          beer: 0,
        });
      })
    );
  });
});
