/** What the player sees of the vet (`vet.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type VetEvent = never;

export const vetView: View<VetEvent> = { events: {}, show: () => Effect.void };
