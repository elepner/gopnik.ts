/** What the player sees of the encounters: the temple, Рушель Блаво (`encounters.ts`). */
import { Effect } from 'effect';

import type { View } from './view';

export type EncountersEvent = never;

export const encountersView: View<EncountersEvent> = { events: {}, show: () => Effect.void };
