import { Effect } from 'effect';
import { expect } from 'vitest';

type Matcher<A> = (assertion: ReturnType<typeof expect<A>>) => void;

/**
 * Asserts on a value produced by an Effect, from inside a `.pipe()` chain:
 * `yield* svc.get().pipe(check((x) => x.toBe(10)))`. Runs every matcher in order and passes
 * the value through, so it can still be bound.
 */
export function check<A>(...matchers: ReadonlyArray<Matcher<A>>) {
  return Effect.map((value: A) => {
    for (const matcher of matchers) matcher(expect(value));
    return value;
  });
}
