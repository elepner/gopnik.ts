/**
 * End-to-end: whole recorded sessions must play exactly like the golden recordings
 * (what is printed, in which colour, after which key, how many Random calls, final state).
 */
import { describe, expect, it } from '@effect/vitest';

import { GOLDEN_SESSIONS, readGolden, readKeyLog, recordSession, type Step } from './golden';

describe('golden sessions (e2e)', () => {
  for (const name of GOLDEN_SESSIONS) {
    it(`plays ${name} exactly like the golden recording`, { timeout: 120_000 }, async () => {
      const golden = readGolden(name);
      const { seed, keys } = readKeyLog(`${name}.keys`);
      const actual = await recordSession(seed, keys);
      const first = golden.steps.findIndex((s, i) => !sameStep(s, actual.steps[i]));
      if (first >= 0)
        // show the step with its key context, as readable text
        expect(describeStep(actual.steps[first]), `first difference at step ${first}`).toEqual(
          describeStep(golden.steps[first])
        );
      expect(actual.steps).toHaveLength(golden.steps.length);
      expect(actual.final).toEqual(golden.final);
    });
  }
});

function sameStep(a: Step, b: Step | undefined) {
  return !!b && JSON.stringify(a) === JSON.stringify(b);
}

function describeStep(s: Step | undefined) {
  if (!s) return 'missing';
  const text = s.out.map(([color, t]) => (t === '\n' ? '\n' : `{${color}}${t}`)).join('');
  return { step: s.step, key: s.key, rand: s.rand, text };
}
