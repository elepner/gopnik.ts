/** What the player sees of the gym (`gym.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type GymEvent = never;

export const gymView: View<GymEvent> = { events: {}, show: () => Effect.void };
