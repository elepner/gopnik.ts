import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { check } from '../../test/check';
import { Seed } from './brands';
import { nextSeed, random, Rng, rngLayer } from './rng';

describe('System.Random (TP7 LCG)', () => {
  it('advances RandSeed as seed * 134775813 + 1 mod 2^32', () => {
    for (const s of [0, 1, 0xffff_ffff, 123456789]) {
      const expected = Number((BigInt(s) * 134775813n + 1n) % 2n ** 32n);
      expect(nextSeed(Seed(s))).toBe(expected);
    }
  });

  it('returns (seed * n) shr 32 for a word argument', () => {
    let seed = Seed(42);
    for (const n of [1, 2, 6, 100, 0xffff, 0x1_0005]) {
      const [r, next] = random(seed, n);
      expect(r).toBe(Number((BigInt(next) * BigInt(n & 0xffff)) >> 32n));
      seed = next;
    }
  });

  it('Random(0) is 0 but still advances the seed', () => {
    const [r, next] = random(Seed(7), 0);
    expect(r).toBe(0);
    expect(next).toBe(nextSeed(Seed(7)));
  });

  it.effect('the service logs every call', () =>
    Effect.gen(function* () {
      const rng = yield* Rng;
      yield* rng.next(10);
      yield* rng.next(65536 + 3);
      yield* rng.log.pipe(
        check(
          (log) => log.toHaveLength(2),
          (log) => log.toMatchObject([{ n: 10 }, { n: 3 }])
        )
      );
    }).pipe(Effect.provide(rngLayer(Seed(1))))
  );
});
