/** Saves in the browser's localStorage, one key per file. */
import { Effect } from 'effect';

import type { IDisk } from '../src/game/prelude';
import { SaveName } from '../src/tp/brands';

const PREFIX = 'gopnik:';

export function browserDisk(): IDisk {
  return {
    list: (pattern) =>
      Effect.sync(() =>
        Object.keys(localStorage)
          .filter((key) => key.startsWith(PREFIX))
          .map((key) => key.slice(PREFIX.length))
          .filter((name) => pattern.test(name))
          .filter((name) => SaveName.is(name))
          .sort()
      ),
    read: (name) =>
      Effect.sync(() => {
        const data = localStorage.getItem(PREFIX + name.toLowerCase());
        return data === null ? undefined : Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
      }),
    write: (name, data) =>
      Effect.sync(() =>
        localStorage.setItem(PREFIX + name.toLowerCase(), btoa(String.fromCharCode(...data)))
      ),
  };
}
