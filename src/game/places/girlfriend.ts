/** 0000:D6E3 — `girl`: the girlfriend. */
import { Effect } from 'effect';

import { attr } from '../../state/attributes';
import { i16 } from '../../tp/num';
import { emit } from '../events';
import { rnd, started } from '../prelude';

/** 0000:D6E3 — `girl` */
export const girlfriend = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.girlfriend) return yield* emit({ type: 'girlfriendNone' });
  if (st.player.resources.money < 12) return yield* emit({ type: 'girlfriendTooPoor' });
  yield* emit({ type: 'girlfriendVisited' });
  if ((yield* rnd(2)) === 0 && !st.world.places.club) {
    yield* emit({ type: 'girlfriendShowedClub' });
    st.world.places.club = true;
  }
  yield* emit({ type: 'girlfriendRested' });
  st.player.health.current = attr(st.player, 'healthMax');
  st.player.resources.money = i16(st.player.resources.money - 12);
  st.world.heat.market = 0;
});
