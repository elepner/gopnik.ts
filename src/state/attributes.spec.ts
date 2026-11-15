import { describe, expect, it } from '@effect/vitest';

import { i16 } from '../tp/num';
import { attr, boost, boostAll, fromTotals, inc, JOINT, set, unboost } from './attributes';
import { createState } from './state';

const hero = () => createState().player;

describe('attributes: base + boosts', () => {
  it('items add to what the game uses, not to the base', () => {
    const p = hero();
    set(p, 'armor', 3);
    boost(p, 'clothes', 'armor', 2);
    expect([attr(p, 'armor'), p.base.armor]).toEqual([5, 3]);
  });

  it('wraps like the original adding step by step (16-bit Integer)', () => {
    const p = hero();
    set(p, 'luck', 32760);
    boost(p, 'cross', 'luck', 2);
    inc(p, 'luck', 10);
    expect(attr(p, 'luck')).toBe(i16(32760 + 2 + 10));
  });

  it('a joint wears off without a trace', () => {
    const p = hero();
    set(p, 'strength', 7);
    set(p, 'damageMin', 3);
    set(p, 'damageMax', 5);
    boostAll(p, 'joint', JOINT);
    inc(p, 'strength', 1); // a level-up while stoned stays
    expect([attr(p, 'strength'), attr(p, 'damageMin'), attr(p, 'damageMax')]).toEqual([10, 4, 7]);
    unboost(p, 'joint');
    expect([attr(p, 'strength'), attr(p, 'damageMin'), attr(p, 'damageMax')]).toEqual([8, 3, 5]);
  });

  it('totals of a stoned hero (a save) keep the joint apart, so it can wear off', () => {
    const p = { ...hero(), stoned: 4 };
    set(p, 'strength', 9);
    fromTotals(p);
    expect([attr(p, 'strength'), p.base.strength]).toEqual([9, 7]);
    unboost(p, 'joint');
    expect(attr(p, 'strength')).toBe(7);
  });
});
