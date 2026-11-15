import { describe, expect, it } from '@effect/vitest';

import { div, i16, mod, round, val } from './num';

describe('Turbo Pascal numbers', () => {
  it('Round rounds halves away from zero (checked against the original RRound)', () => {
    const cases: [number, number][] = [
      [-2.5, -3],
      [-1.5, -2],
      [-0.5, -1],
      [-0.25, 0],
      [0.5, 1],
      [1.5, 2],
      [2.5, 3],
      [2.25, 2],
    ];
    for (const [x, r] of cases) expect(round(x)).toBe(r);
  });

  it('div and mod truncate toward zero like IDIV', () => {
    expect(div(-7, 2)).toBe(-3);
    expect(mod(-7, 2)).toBe(-1);
    expect(div(7, -2)).toBe(-3);
    expect(mod(7, 2)).toBe(1);
  });

  it('Integer wraps at 32767', () => {
    expect(i16(32767 + 1)).toBe(-32768);
    expect(i16(32126 * 2)).toBe(-1284);
  });

  it('Val parses like TP7 and reports the error position', () => {
    expect(val('12')).toEqual([12, 0]);
    expect(val('  7')).toEqual([7, 0]);
    expect(val('-3')).toEqual([-3, 0]);
    expect(val('$1F')).toEqual([31, 0]);
    expect(val('')).toEqual([0, 1]);
    expect(val('5x')).toEqual([0, 2]);
  });
});
