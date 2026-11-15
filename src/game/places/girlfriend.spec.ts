import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../../test/game';
import type { GameState } from '../../state/state';
import type { GameEvent } from '../events';
import { girlfriend } from './girlfriend';

const types = (events: GameEvent[]) => events.map((e) => e.type);

/** a hurt hero with a girlfriend, 20 roubles and the police after him at the market */
function dating(s: GameState) {
  const st = hero(s);
  st.world.places.girlfriend = true;
  st.player.resources.money = 20;
  st.player.health.current = 10;
  st.world.heat.market = 4;
  return st;
}

describe('girlfriend (0000:D6E3)', () => {
  it.effect('no girlfriend, no visit', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(girlfriend, {
        events,
        setup: (s) => (dating(s).world.places.girlfriend = false),
      });
      expect(types(events)).toEqual(['girlfriendNone']);
      expect([st.player.resources.money, st.player.health.current]).toEqual([20, 10]);
      expect(rand).toHaveLength(0);
    })
  );

  it.effect('under 12 roubles the hero is too poor to come', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(girlfriend, {
        events,
        setup: (s) => (dating(s).player.resources.money = 11),
      });
      expect(types(events)).toEqual(['girlfriendTooPoor']);
      expect(st.player.resources.money).toBe(11);
      expect(rand).toHaveLength(0);
    })
  );

  it.effect('a visit heals fully for 12 roubles and calms the market police', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(girlfriend, {
        seed: 16, // Random(2) = 1: no word of the club
        events,
        setup: dating,
      });
      expect(rand).toEqual([{ n: 2, result: 1 }]);
      expect(types(events)).toEqual(['girlfriendVisited', 'girlfriendRested']);
      expect([
        st.player.health.current,
        st.player.resources.money,
        st.world.heat.market,
        st.world.places.club,
      ]).toEqual([35, 8, 0, false]);
    })
  );

  it.effect('she may show the hero the club', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(girlfriend, {
        seed: 0, // Random(2) = 0
        events,
        setup: dating,
      });
      expect(types(events)).toEqual([
        'girlfriendVisited',
        'girlfriendShowedClub',
        'girlfriendRested',
      ]);
      expect([st.world.places.club, st.player.health.current]).toEqual([true, 35]);
    })
  );

  it.effect('a known club is not shown again', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { rand } = yield* play(girlfriend, {
        seed: 0, // Random(2) = 0
        events,
        setup: (s) => (dating(s).world.places.club = true),
      });
      expect(rand).toEqual([{ n: 2, result: 0 }]);
      expect(types(events)).toEqual(['girlfriendVisited', 'girlfriendRested']);
    })
  );
});
