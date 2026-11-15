/**
 * The port against the original G.EXE (emulated): recorded play-throughs and random ones must
 * produce the same screens, state, Random calls and Print calls at every key read.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from '@effect/vitest';

import { compare, expandKeys, scenario } from './harness';

const ORIGINAL = join(import.meta.dirname, '..', 'original');
const FIXTURES = join(import.meta.dirname, 'fixtures');

/** key log written by the bots: `# seed N save S: ...` header, one key per line, # comments */
function readLog(file: string) {
  const lines = readFileSync(join(FIXTURES, file), 'utf8').split('\n');
  const seed = Number(lines[0].match(/seed (\d+)/)?.[1] ?? 0);
  return { seed, keys: lines.filter((l) => l && !l.startsWith('#')) };
}

describe('regression against the original', () => {
  for (const file of readdirSync(FIXTURES).filter((f) => f.endsWith('.keys'))) {
    it(`replays ${file}`, { timeout: 120_000 }, async () => {
      const { seed, keys } = readLog(file);
      const { divergence, original } = await compare(seed, keys, ORIGINAL);
      expect(divergence).toBeUndefined();
      expect(original.snaps.length).toBeGreaterThan(1);
    });
  }

  it('random play-throughs from a new game', { timeout: 120_000 }, async () => {
    for (let seed = 1; seed <= 20; seed++) {
      const { divergence } = await compare(seed, expandKeys(scenario(seed, 400)));
      expect(divergence, `seed ${seed}`).toBeUndefined();
    }
  });

  it('random play-throughs from the original saves', { timeout: 120_000 }, async () => {
    for (let seed = 1; seed <= 20; seed++) {
      const { divergence } = await compare(seed, expandKeys(scenario(seed, 400, true)), ORIGINAL);
      expect(divergence, `seed ${seed}`).toBeUndefined();
    }
  });
});
