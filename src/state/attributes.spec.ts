import { describe, expect, it } from '@effect/vitest';

import { i16 } from '../tp/num';
import { attr, fromTotals, inc, set } from './attributes';
import { outclassed, put } from './items';
import { createState } from './state';

const hero = () => createState().player;

describe('attributes: base + what the things in the slots give', () => {
  it('a thing in its slot adds to what the game uses, not to the base', () => {
    const p = hero();
    set(p, 'armor', 3);
    put(p.body, 'adidas');
    expect([attr(p, 'armor'), p.base.armor]).toEqual([5, 3]);
  });

  it('wraps like the original adding step by step (16-bit Integer)', () => {
    const p = hero();
    set(p, 'luck', 32760);
    put(p.body, 'cross');
    inc(p, 'luck', 10);
    expect(attr(p, 'luck')).toBe(i16(32760 + 2 + 10));
  });

  it('a joint counts while the hero is stoned', () => {
    const p = hero();
    set(p, 'strength', 7);
    p.stoned = 3;
    expect(attr(p, 'strength')).toBe(9);
    p.stoned = 0;
    expect(attr(p, 'strength')).toBe(7);
  });

  it('within a slot only the best thing counts, whatever the order', () => {
    const p = hero();
    set(p, 'damageMin', 2);
    put(p.body, 'knife');
    put(p.body, 'cleaver'); // the original: +16 for knife, then cleaver
    expect(attr(p, 'damageMin')).toBe(2 + 9);
    p.body.hands.weapons.knife = false; // selling the spare knife changes nothing
    put(p.body, 'club');
    expect(attr(p, 'damageMin')).toBe(2 + 9);
    put(p.body, 'abibas');
    put(p.body, 'leather');
    expect(attr(p, 'armor')).toBe(1 + 2); // a suit and a jacket are different slots
    const w = p.body.hands.weapons;
    expect([outclassed(w, 'knuckles'), outclassed(w, 'cleaver')]).toEqual([true, false]);
  });

  it('a save holds totals: the things and the joint come out of the base', () => {
    const p = hero();
    put(p.body, 'club');
    p.stoned = 2;
    p.base.damageMin = 20; // as loaded
    fromTotals(p);
    expect([attr(p, 'damageMin'), p.base.damageMin]).toEqual([20, 20 - 4 - 1]);
  });
});
