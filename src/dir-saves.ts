/**
 * Saves as files of the original's format in one directory (the terminal runners and the
 * tests): SAVE_R?.SAV records and PLACES.SAV, so the original's own saves load too.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { Effect } from 'effect';

import type { ISaves } from './game/prelude';
import { decodePlaces, decodeSave, encodePlaces, encodeSave } from './state/legacy';
import { loadSave, savedGame } from './state/saved';
import { createState, playing } from './state/state';
import { SaveName } from './tp/brands';

export function dirSaves(dir: string): ISaves {
  const files = dirFiles(dir);
  return {
    slots: Effect.sync(() => files.list(/^save_r.\.sav$/i).map((name) => name.toUpperCase()[6]!)),
    load: (slot) =>
      Effect.sync(() => {
        const record = files.read(SaveName(`save_r${slot}.sav`));
        if (!record) return undefined;
        const st = createState();
        decodeSave(st, record);
        return savedGame(playing(st));
      }),
    save: (slot, game) =>
      Effect.sync(() => {
        const st = createState();
        loadSave(st, game);
        files.write(SaveName(`save_r${slot}.sav`), encodeSave(st));
      }),
    loadPlaces: Effect.sync(() => {
      const record = files.read(SaveName('places.sav'));
      if (!record) return undefined;
      const st = createState();
      decodePlaces(st, record);
      return { ...st.world.places };
    }),
    savePlaces: (places) =>
      Effect.sync(() => {
        const st = createState();
        Object.assign(st.world.places, places);
        files.write(SaveName('places.sav'), encodePlaces(st));
      }),
  };
}

/** the files of one directory, matched case-insensitively like DOS */
function dirFiles(dir: string) {
  const resolve = (name: string) =>
    readdirSync(dir).find((f) => f.toLowerCase() === name.toLowerCase()) ?? name;
  return {
    /** Dos.FindFirst/FindNext, in directory order */
    list: (pattern: RegExp) =>
      readdirSync(dir)
        .filter((f) => pattern.test(f))
        .filter((f) => SaveName.is(f))
        .sort(),
    read: (name: SaveName) => {
      try {
        return new Uint8Array(readFileSync(join(dir, resolve(name))));
      } catch {
        return undefined;
      }
    },
    write: (name: SaveName, data: Uint8Array) => writeFileSync(join(dir, resolve(name)), data),
  };
}
