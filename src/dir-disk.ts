/** Saves as plain files in one directory (the terminal runners and the tests). */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { Effect } from 'effect';

import type { IDisk } from './game/prelude';
import { SaveName } from './tp/brands';

/** saves live as plain files in one directory, matched case-insensitively like DOS */
export function dirDisk(dir: string): IDisk {
  const resolve = (name: string) =>
    readdirSync(dir).find((f) => f.toLowerCase() === name.toLowerCase()) ?? name;
  return {
    list: (pattern: RegExp) =>
      Effect.sync(() =>
        readdirSync(dir)
          .filter((f) => pattern.test(f))
          .filter((f) => SaveName.is(f))
          .sort()
      ),
    read: (name: SaveName) =>
      Effect.sync(() => {
        try {
          return new Uint8Array(readFileSync(join(dir, resolve(name))));
        } catch {
          return undefined;
        }
      }),
    write: (name: SaveName, data: Uint8Array) =>
      Effect.sync(() => writeFileSync(join(dir, resolve(name)), data)),
  };
}
