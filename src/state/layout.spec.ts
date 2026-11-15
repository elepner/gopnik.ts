import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from '@effect/vitest';

import { createState, SAVE_SIZE } from './layout';

const original = (name: string) =>
  new Uint8Array(readFileSync(join(import.meta.dirname, '../../original', name)));

describe('data segment layout', () => {
  it('reads the original SAVE_R5.SAV and writes it back byte for byte', () => {
    const { st, mem } = createState();
    const file = original('SAVE_R5.SAV');
    expect(file.length).toBe(SAVE_SIZE);
    mem.loadRecord(file);
    expect(st.version).toBe('^4Gopnik: ^7version 1.02 june,sept 2003');
    expect([st.charType, st.level]).toEqual([5, 40]);
    expect(mem.typeName(st.charType)).toBe('Гопник');
    expect(mem.saveRecord()).toEqual(file);
  });

  it('PLACES.SAV holds the seven known-place flags', () => {
    const { st, mem } = createState();
    mem.loadPlaces(original('PLACES.SAV'));
    expect([
      st.knowsMarket,
      st.knowsDealers,
      st.denAccess,
      st.hasGirl,
      st.knowsHospital,
      st.knowsClub,
      st.knowsGym,
    ]).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });

  it('Integer and Byte fields wrap like Turbo Pascal', () => {
    const { st } = createState();
    st.money = 32767;
    st.money += 1;
    expect(st.money).toBe(-32768);
    st.armor = 255;
    st.armor++;
    expect(st.armor).toBe(0);
  });

  it('names come from the original data image, also past the end of the rank table', () => {
    const { mem } = createState();
    expect(mem.rankName(0)).toBe('Опущеный');
    expect(mem.rankName(42)).toBe('Пацан, который всех опрокинул');
  });
});
