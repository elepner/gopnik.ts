/**
 * A rule of the game as a plain generator over the state: it updates the state, yields the
 * events it causes and asks for random numbers with `yield* random(n)`. `run` plays it: it
 * answers each request with the game's Random and shows each event as soon as it is yielded,
 * so the view sees the state exactly where the original printed.
 */
import { Effect } from 'effect';

import { attr } from '../state/attributes';
import type { Game } from '../state/state';
import { type FightEvent, tell } from './fight-view';
import { rnd } from './prelude';

/** a request for `Random(n)` */
class Roll {
  constructor(readonly n: number) {}
}

export type Rule<R = void> = Generator<FightEvent | Roll, R, number>;

/** `Random(n)` inside a rule */
export function* random(n: number): Generator<Roll, number, number> {
  return yield new Roll(n);
}

/** `luck >= Random(n)`: Random is always called first, like the original's Longint compare */
export function* lucky(st: Game, n: number): Generator<Roll, boolean, number> {
  const r = yield* random(n);
  return attr(st.player, 'luck') >= r;
}

export function run<R>(rule: Rule<R>) {
  return Effect.gen(function* () {
    let step = rule.next(0);
    while (!step.done) {
      const value = step.value;
      if (value instanceof Roll) step = rule.next(yield* rnd(value.n));
      else {
        yield* tell(value);
        step = rule.next(0);
      }
    }
    return step.value;
  });
}
