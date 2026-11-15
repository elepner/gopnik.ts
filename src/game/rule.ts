/**
 * A rule of the game as a plain generator over the state: it yields the events it causes and
 * asks for random numbers with `yield* random(n)`. `run` plays it: it answers each request with
 * the game's Random and hands each event, the moment it is yielded, to `show` (which may apply
 * it to the state before telling it), so the rule goes on with the state the event made.
 */
import { Effect } from 'effect';

import { attr } from '../state/attributes';
import type { Game } from '../state/state';
import { rnd } from './prelude';

/** a request for `Random(n)` */
class Roll {
  constructor(readonly n: number) {}
}

export type Rule<E, R = void> = Generator<E | Roll, R, number>;

/** `Random(n)` inside a rule */
export function* random(n: number): Generator<Roll, number, number> {
  return yield new Roll(n);
}

/** `luck >= Random(n)`: Random is always called first, like the original's Longint compare */
export function* lucky(st: Game, n: number): Generator<Roll, boolean, number> {
  const r = yield* random(n);
  return attr(st.player, 'luck') >= r;
}

/** plays a rule: Random for its rolls, `show` for each event the moment it is yielded */
export function run<E, R, X, Y>(
  rule: Rule<E, R>,
  show: (event: E) => Effect.Effect<unknown, X, Y>
) {
  return Effect.gen(function* () {
    let step = rule.next(0);
    while (!step.done) {
      const value = step.value;
      if (value instanceof Roll) step = rule.next(yield* rnd(value.n));
      else {
        yield* show(value);
        step = rule.next(0);
      }
    }
    return step.value;
  });
}
