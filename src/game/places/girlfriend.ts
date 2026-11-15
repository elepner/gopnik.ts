/** 0000:D6E3 — `girl`: the girlfriend. */
import { Effect } from 'effect';

import { attr, dec, set } from '../../state/attributes';
import type { Game } from '../../state/state';
import { emit, reporter } from '../events';
import { rnd, started } from '../prelude';
import type { GirlfriendEvent } from './girlfriend-view';

const report = reporter(apply);

/** 0000:D6E3 — `girl` */
export const girlfriend = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.girlfriend) return yield* emit({ type: 'girlfriendNone' });
  if (st.player.resources.money < 12) return yield* emit({ type: 'girlfriendTooPoor' });
  yield* emit({ type: 'girlfriendVisited' });
  if ((yield* rnd(2)) === 0 && !st.world.places.club)
    yield* report({ type: 'girlfriendShowedClub' });
  yield* report({ type: 'girlfriendRested' });
});

/** what the girlfriend does goes into the state */
function apply(st: Game, event: GirlfriendEvent) {
  const p = st.player;
  switch (event.type) {
    case 'girlfriendShowedClub':
      st.world.places.club = true;
      return;
    case 'girlfriendRested':
      set(p, 'health', attr(p, 'healthMax'));
      dec(p, 'money', 12);
      st.world.heat.market = 0;
      return;
  }
}
