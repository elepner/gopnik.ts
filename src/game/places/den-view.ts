/** What the player sees of the den (`den.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type DenEvent = never;

export const denView: View<DenEvent> = { events: {}, show: () => Effect.void };
