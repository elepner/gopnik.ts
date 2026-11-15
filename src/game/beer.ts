/** 0000:29C4 — beer: `h` drinks one, `mh` drinks until healthy (or the beer runs out). */
import { Effect } from 'effect';

import { attr } from '../state/attributes';
import { i16 } from '../tp/num';
import { emit } from './events';
import { started } from './prelude';

export type BeerMode = 'one' | 'untilHealthy';

export type BeerEvent =
  | { readonly type: 'cantDrink' }
  | { readonly type: 'notThirsty' }
  /** one beer, shown for `h` only; `full`: it healed what was missing, less than 5 */
  | { readonly type: 'drank'; readonly healed: number; readonly full: boolean }
  | { readonly type: 'noBeer' }
  /** `mh`: all the beers together */
  | { readonly type: 'drankUntilHealthy'; readonly healed: number }
  | { readonly type: 'beerRanOut' };

export function drink(mode: BeerMode) {
  return Effect.gen(function* () {
    const p = (yield* started).player;
    const start = p.health.current;
    const one = mode === 'one';
    for (;;) {
      if (p.injuries.jaw) {
        yield* emit({ type: 'cantDrink' });
        break;
      }
      if (p.health.current >= attr(p, 'healthMax')) {
        yield* emit({ type: 'notThirsty' });
        return;
      }
      if (p.resources.beer > 0) {
        p.resources.beer = i16(p.resources.beer - 1);
        const missing = attr(p, 'healthMax') - p.health.current;
        const full = missing < 5;
        p.health.current = full ? attr(p, 'healthMax') : i16(p.health.current + 5);
        if (one) yield* emit({ type: 'drank', healed: full ? missing : 5, full });
      } else if (one) yield* emit({ type: 'noBeer' });
      if (one || p.health.current >= attr(p, 'healthMax') || p.resources.beer <= 0) break;
    }
    if (one) return;
    const healed = p.health.current - start;
    if (healed !== 0) yield* emit({ type: 'drankUntilHealthy', healed });
    if (healed !== 0 && p.resources.beer <= 0) yield* emit({ type: 'beerRanOut' });
    if (healed === 0 && p.resources.beer <= 0) yield* emit({ type: 'noBeer' });
  });
}
