/** What the player sees of the club (`club.ts`). */
import { Effect } from 'effect';

import type { View } from '../view';

export type ClubEvent = never;

export const clubView: View<ClubEvent> = { events: {}, show: () => Effect.void };
