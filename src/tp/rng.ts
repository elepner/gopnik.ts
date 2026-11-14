/**
 * Turbo Pascal 7 System.Random, bit-exact.
 * RandSeed := RandSeed * 134775813 + 1;  Random(n) := (RandSeed * n) shr 32
 */
import { Context, Effect, Layer, Ref } from 'effect';

import { Seed } from './brands';

export interface IRng {
  /** System.Random(n) */
  readonly next: (n: number) => Effect.Effect<number>;
  readonly seed: Effect.Effect<Seed>;
  /** every call so far, for comparison with the original */
  readonly log: Effect.Effect<readonly RandCall[]>;
}

export const Rng = Context.Service<IRng>('Rng');

export function rngLayer(initialSeed: Seed) {
  return Layer.effect(
    Rng,
    Effect.gen(function* () {
      const seed = yield* Ref.make(initialSeed);
      const log: RandCall[] = [];
      return {
        next: (n: number) =>
          Ref.modify(seed, (s) => {
            const [r, s2] = random(s, n);
            log.push({ n: n & 0xffff, result: r });
            return [r, s2] as const;
          }),
        seed: Ref.get(seed),
        log: Effect.sync(() => log),
      };
    })
  );
}

export interface RandCall {
  readonly n: number;
  readonly result: number;
}

/** Random(n) for a word argument: returns [result, newSeed] */
export function random(seed: Seed, n: number): readonly [number, Seed] {
  const s = nextSeed(seed);
  // s < 2^32, n < 2^16: the product is < 2^48 and exact in a double
  return [Math.floor((s * (n & 0xffff)) / 0x1_0000_0000), s];
}

export function nextSeed(seed: Seed): Seed {
  return Seed((Math.imul(seed, 134775813) + 1) >>> 0);
}
