/** What the player sees of walking around (`walk.ts`). */
import { Effect } from 'effect';

import type { View } from './view';

export type WalkEvent = never;

export const walkView: View<WalkEvent> = { events: {}, show: () => Effect.void };
