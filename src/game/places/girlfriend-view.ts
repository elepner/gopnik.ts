/** What the player sees of the girlfriend (`girlfriend.ts`). */
import { Effect } from 'effect';

import { println } from '../prelude';
import { PLACES } from '../texts';
import type { View } from '../view';

export type GirlfriendEvent =
  /** no girlfriend yet */
  | { readonly type: 'girlfriendNone' }
  /** not enough money to go out */
  | { readonly type: 'girlfriendTooPoor' }
  | { readonly type: 'girlfriendVisited' }
  /** she took the hero to the club: now he knows where it is */
  | { readonly type: 'girlfriendShowedClub' }
  /** the treat and the rest (full health, the market forgets) */
  | { readonly type: 'girlfriendRested' };

export const girlfriendView: View<GirlfriendEvent> = {
  events: {
    girlfriendNone: true,
    girlfriendTooPoor: true,
    girlfriendVisited: true,
    girlfriendShowedClub: true,
    girlfriendRested: true,
  },
  show: (event) => showGirlfriend(event),
};

function showGirlfriend(event: GirlfriendEvent) {
  return Effect.gen(function* () {
    switch (event.type) {
      case 'girlfriendNone':
        return yield* println(PLACES.uTebyaPokaNet());
      case 'girlfriendTooPoor':
        return yield* println(PLACES.nuNepoydeshZheKak());
      case 'girlfriendVisited':
        return yield* println(PLACES.tyPrishelKSvoey());
      case 'girlfriendShowedClub':
        return yield* println(PLACES.onaVytaschilaTebyaV());
      case 'girlfriendRested':
        yield* println(PLACES.tyKupilEyChe());
        return yield* println(PLACES.tyRasslabilsyaOtdohnulI());
    }
  });
}
