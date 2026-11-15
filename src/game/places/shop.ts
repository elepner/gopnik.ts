/** Shop lines: prices coloured by what the hero can afford. */
import { Effect } from 'effect';

import { println, started } from '../prelude';
import type { Color, Text } from '../text';
import { PLACES } from '../texts';

/** price colour: grey when the player can afford it, red otherwise */
export function affordable(ok: boolean): Color {
  return ok ? 'gray' : 'red';
}

/** a shop line: number, price coloured by affordability, description */
export function offer(n: number, price: number, description: Text) {
  return offerShowing(n, price, price, description);
}

/** a shop line whose colour comes from one price while another one is printed */
export function offerShowing(n: number, price: number, shown: number, description: Text) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* println(
      PLACES.offerLine(
        String(n),
        affordable(price <= st.player.resources.money),
        shown,
        description
      )
    );
  });
}
