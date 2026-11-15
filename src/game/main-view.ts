/** What the player sees of the main prompt and the district change (`main.ts`). */
import { Effect } from 'effect';

import type { View } from './view';

export type MainEvent = never;

export const mainView: View<MainEvent> = { events: {}, show: () => Effect.void };
