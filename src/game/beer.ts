/** 0000:29C4 — beer: `h` drinks one, `mh` drinks until healthy (or the beer runs out). */
import { Effect } from 'effect';

import { attr, dec, inc } from '../state/attributes';
import type { Game } from '../state/state';
import { emit, reporter } from './events';
import { started } from './prelude';

export type BeerMode = 'one' | 'untilHealthy';

export type BeerEvent =
  | { readonly type: 'cantDrink' }
  | { readonly type: 'notThirsty' }
  /** one beer (`h`); `full`: it healed what was missing, less than 5 */
  | { readonly type: 'drank'; readonly healed: number; readonly full: boolean }
  | { readonly type: 'noBeer' }
  /** `mh`: all the beers together */
  | { readonly type: 'drankUntilHealthy'; readonly beers: number; readonly healed: number }
  | { readonly type: 'beerRanOut' };

const report = reporter(apply);

export function drink(mode: BeerMode) {
  return Effect.gen(function* () {
    const p = (yield* started).player;
    if (p.injuries.jaw) {
      yield* emit({ type: 'cantDrink' });
      if (mode === 'untilHealthy' && p.resources.beer <= 0) yield* emit({ type: 'noBeer' });
      return;
    }
    const max = attr(p, 'healthMax');
    if (p.health.current >= max) return yield* emit({ type: 'notThirsty' });
    if (mode === 'one') {
      if (p.resources.beer <= 0) return yield* emit({ type: 'noBeer' });
      const healed = gulp(p.health.current, max);
      return yield* report({ type: 'drank', healed, full: healed < 5 });
    }
    let beers = 0;
    let healed = 0;
    while (beers < p.resources.beer && p.health.current + healed < max) {
      healed += gulp(p.health.current + healed, max);
      beers++;
    }
    if (healed !== 0) yield* report({ type: 'drankUntilHealthy', beers, healed });
    if (p.resources.beer <= 0) yield* emit({ type: healed !== 0 ? 'beerRanOut' : 'noBeer' });
  });
}

/** a beer gives 5 health, never more than is missing */
function gulp(health: number, max: number): number {
  return Math.min(5, max - health);
}

/** what drinking does to the hero */
function apply(st: Game, event: BeerEvent) {
  const p = st.player;
  switch (event.type) {
    case 'drank':
      dec(p, 'beer', 1);
      return inc(p, 'health', event.healed);
    case 'drankUntilHealthy':
      dec(p, 'beer', event.beers);
      return inc(p, 'health', event.healed);
  }
}
