/** 0000:D6E3 — `girl`: the girlfriend. */
import { Effect } from 'effect';

import { attr } from '../../state/attributes';
import { i16 } from '../../tp/num';
import { println, rnd, started } from '../prelude';
import { PLACES } from '../texts';

/** 0000:D6E3 — `girl` */
export const girlfriend = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.girlfriend) return yield* println(PLACES.uTebyaPokaNet());
  if (st.player.resources.money < 12) return yield* println(PLACES.nuNepoydeshZheKak());
  yield* println(PLACES.tyPrishelKSvoey());
  if ((yield* rnd(2)) === 0 && !st.world.places.club) {
    yield* println(PLACES.onaVytaschilaTebyaV());
    st.world.places.club = true;
  }
  yield* println(PLACES.tyKupilEyChe());
  yield* println(PLACES.tyRasslabilsyaOtdohnulI());
  st.player.health.current = attr(st.player, 'healthMax');
  st.player.resources.money = i16(st.player.resources.money - 12);
  st.world.heat.market = 0;
});
