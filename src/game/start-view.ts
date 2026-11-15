/** What the player sees of the start: title, saves menu, story, character creation (`start.ts`, `screens.ts`). */
import { Effect } from 'effect';

import type { View } from './view';

export type StartEvent = never;

export const startView: View<StartEvent> = { events: {}, show: () => Effect.void };
