/** What the player sees of the dealers (`dealers.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type DealersEvent = never;

export const dealersView: View<DealersEvent> = { events: {}, show: () => Effect.void };
