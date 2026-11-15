/** What the player sees of an enemy: a look at him (`enemy.ts`). */
import { Effect } from 'effect';

import type { View } from './view';

export type EnemyEvent = never;

export const enemyView: View<EnemyEvent> = { events: {}, show: () => Effect.void };
