/** What the player sees of drinking beer (`beer.ts`). */
import { Effect } from 'effect';

import { attr } from '../state/attributes';
import { div } from '../tp/num';
import { type BeerEvent } from './beer';
import { beerTenths } from './hero';
import { print, println, started } from './prelude';
import { HERO } from './texts';
import type { View } from './view';

/** drinking as the player sees it */
export const beerView: View<BeerEvent> = {
  events: {
    cantDrink: true,
    notThirsty: true,
    drank: true,
    noBeer: true,
    drankUntilHealthy: true,
    beerRanOut: true,
  },
  show: (event) => showBeer(event),
};

function showBeer(event: BeerEvent) {
  return Effect.gen(function* () {
    const p = (yield* started).player;
    const left = () =>
      [
        p.health.current,
        attr(p, 'healthMax'),
        div(p.resources.beer, 2),
        beerTenths(p.resources.beer),
      ] as const;
    switch (event.type) {
      case 'cantDrink':
        return yield* println(HERO.tyNeMozheshPit());
      case 'notThirsty':
        return yield* println(HERO.blinTolkoTupitNe());
      case 'drank':
        if (!event.full)
          return yield* println(HERO.pivoPribavlyaetZZdorovya(event.healed, ...left()));
        yield* print(HERO.pivoPribavlyaetZ(event.healed));
        return yield* println(HERO.zdorovyaOstalosLPiva(...left()));
      case 'noBeer':
        return yield* println(HERO.pivaNetu());
      case 'drankUntilHealthy':
        return yield* println(HERO.pivoPribavlyaetZZdorovya(event.healed, ...left()));
      case 'beerRanOut':
        return yield* println(HERO.konchilosPivo());
    }
  });
}
