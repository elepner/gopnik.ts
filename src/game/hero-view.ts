/** What the player sees of the hero: stats, level-ups, experience (`hero.ts`). */
import { Effect } from 'effect';

import type { View } from './view';

export type HeroEvent = never;

export const heroView: View<HeroEvent> = { events: {}, show: () => Effect.void };
