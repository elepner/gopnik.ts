import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from '@effect/vitest';

import { decodePlaces, decodeSave, encodePlaces, encodeSave, SAVE_SIZE } from './legacy';
import { rankName, typeName } from './names';
import { createState, playing } from './state';

const original = (name: string) =>
  new Uint8Array(readFileSync(join(import.meta.dirname, '../../original', name)));

describe('legacy codec (the original data segment)', () => {
  it('decodes the original SAVE_R5.SAV into a started game', () => {
    const st = createState();
    decodeSave(st, original('SAVE_R5.SAV'));
    const game = playing(st);
    expect(game.version).toBe('^4Gopnik: ^7version 1.02 june,sept 2003');
    expect([game.player.type, game.player.progression.level]).toEqual(['gopnik', 40]);
    expect(game.player.progression.history[1]).toHaveLength(2);
  });

  it('a decoded save encodes to the same fields', () => {
    const file = original('SAVE_R5.SAV');
    expect(file.length).toBe(SAVE_SIZE);
    const st = createState();
    decodeSave(st, file);
    const again = createState();
    decodeSave(again, encodeSave(st));
    expect(again).toEqual(st);
  });

  it('PLACES.SAV holds the seven known-place flags', () => {
    const st = createState();
    decodePlaces(st, original('PLACES.SAV'));
    expect(Object.values(st.world.places)).toEqual([true, true, true, true, true, true, true]);
    expect(encodePlaces(st)).toEqual(original('PLACES.SAV'));
  });

  it('a pistol owns its silencer and bullets', () => {
    const st = createState();
    decodeSave(st, original('SAVE_R5.SAV'));
    const pistol = playing(st).player.body.pockets.pistol;
    const record = encodeSave(st);
    // pistol, silencer and bullets live at DS:394D..3950 = record offsets 0x2B1..0x2B4
    expect(record[0x2b1]).toBe(pistol ? 1 : 0);
    expect(record[0x2b2]).toBe(pistol?.silencer ? 1 : 0);
  });

  it('names come from the original data image, also past the end of the rank table', () => {
    expect(rankName(0)).toBe('Опущеный');
    expect(rankName(42)).toBe('Пацан, который всех опрокинул');
    expect(typeName('gopnik')).toBe('Гопник');
  });
});
