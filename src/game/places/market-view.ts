/** What the player sees of the market (`market.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type MarketEvent = never;

export const marketView: View<MarketEvent> = { events: {}, show: () => Effect.void };
