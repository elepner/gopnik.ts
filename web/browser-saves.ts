/** The game's saves in the browser: JSON in localStorage, one key per slot, one for the places. */
import { Effect } from 'effect';

import type { ISaves } from '../src/game/prelude';
import type { SavedGame } from '../src/state/saved';
import type { KnownPlaces } from '../src/state/state';

const SLOT = 'gopnik:save:';
const PLACES = 'gopnik:places';

export function browserSaves(): ISaves {
  return {
    slots: Effect.sync(() =>
      Object.keys(localStorage)
        .filter((key) => key.startsWith(SLOT))
        .map((key) => key.slice(SLOT.length))
        .sort()
    ),
    load: (slot) => Effect.sync(() => read<SavedGame>(SLOT + slot)),
    save: (slot, game) =>
      Effect.sync(() => localStorage.setItem(SLOT + slot, JSON.stringify(game))),
    loadPlaces: Effect.sync(() => read<KnownPlaces>(PLACES)),
    savePlaces: (places) => Effect.sync(() => localStorage.setItem(PLACES, JSON.stringify(places))),
  };
}

function read<T>(key: string): T | undefined {
  const json = localStorage.getItem(key);
  return json === null ? undefined : (JSON.parse(json) as T);
}
