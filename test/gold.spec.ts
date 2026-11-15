/**
 * End-to-end: whole recorded sessions must play exactly like the golden recordings (what is
 * printed, in which colour, after which key, how many Random calls, the final normalized state).
 */
import { describe, expect, it } from '@effect/vitest';

import { GOLD_SESSIONS, keysOf, readGold, record, type Step } from './gold';

describe('golden sessions (e2e, normalized state)', () => {
  for (const name of GOLD_SESSIONS) {
    it(`plays ${name} exactly like the golden recording`, { timeout: 120_000 }, async () => {
      const gold = readGold(name);
      const actual = await record(gold.start, keysOf(gold));
      const first = gold.steps.findIndex((s, i) => !sameStep(s, actual.steps[i]));
      if (first >= 0)
        // show the step with its key context, as readable text
        expect(describeStep(actual.steps[first]), `first difference at step ${first}`).toEqual(
          describeStep(gold.steps[first])
        );
      expect(actual.steps).toHaveLength(gold.steps.length);
      expect(actual.final).toEqual(gold.final);
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
