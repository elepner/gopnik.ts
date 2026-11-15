/** What the player sees of the vet (`vet.ts`). */
import { Effect } from 'effect';

import { attr } from '../../state/attributes';
import { println, started } from '../prelude';
import { PLACES } from '../texts';
import type { View } from '../view';
import { affordable } from './shop';
import { healthy } from './vet';

export type VetEvent =
  /** the hospital isn't known yet */
  | { readonly type: 'vetNotFound' }
  /** the price list unless the hero is healthy */
  | { readonly type: 'enteredVet' }
  /** nothing (more) to treat */
  | { readonly type: 'vetSentAway' }
  | { readonly type: 'vetBonesFixed' }
  /** `roll`: the doctor's line (Random 3) */
  | { readonly type: 'vetPatchedUp'; readonly roll: number }
  /** not enough money */
  | { readonly type: 'vetRefused' };

export const vetView: View<VetEvent> = {
  events: {
    vetNotFound: true,
    enteredVet: true,
    vetSentAway: true,
    vetBonesFixed: true,
    vetPatchedUp: true,
    vetRefused: true,
  },
  show: (event) => showVet(event),
};

function showVet(event: VetEvent) {
  return Effect.gen(function* () {
    const p = (yield* started).player;
    switch (event.type) {
      case 'vetNotFound':
        return yield* println(PLACES.snachalaNaydiGdeNahodtsya());
      case 'enteredVet':
        yield* println(PLACES.tyPrishelNaRemot());
        if (healthy(p)) return;
        yield* println(PLACES.dokNeVolnuysyaVse());
        yield* println(PLACES.hZa3Rublya(affordable(p.resources.money >= 3)));
        return yield* println(PLACES.rZa7Rubley(affordable(p.resources.money >= 7)));
      case 'vetSentAway':
        return yield* println(PLACES.dokValiOtsyudaTy());
      case 'vetBonesFixed':
        yield* println(PLACES.ogoDaTebyaNe());
        return yield* println(PLACES.tvoiPerelomyZalecheny());
      case 'vetPatchedUp':
        if (event.roll === 1) yield* println(PLACES.schasGaykiPodtyanemI());
        else if (event.roll === 2) yield* println(PLACES.takCheTutU());
        else {
          yield* println(PLACES.eyDokAZachem());
          yield* println(PLACES.dokMolchiZhivotnoe());
        }
        return yield* println(PLACES.zdorovya(p.health.current, attr(p, 'healthMax')));
      case 'vetRefused':
        return yield* println(PLACES.blinHalyavschikMeditsinaNe());
    }
  });
}
