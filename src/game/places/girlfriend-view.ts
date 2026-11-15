/** What the player sees of the girlfriend (`girlfriend.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type GirlfriendEvent = never;

export const girlfriendView: View<GirlfriendEvent> = { events: {}, show: () => Effect.void };
