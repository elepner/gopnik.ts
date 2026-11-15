/**
 * What happens in the game, as events: the rules `emit` them and don't know who listens. The
 * game's views listen (`view-layer.ts`, wired in `runtime.ts`); a test can listen instead and
 * keep them. Events are shown the moment they are emitted, so a view may read the state.
 */
import { Context, Effect } from 'effect';

import type { EndOfInput } from '../crt/crt';
import type { AftermathEvent } from './aftermath-view';
import type { Context as CommandContext } from './commands';
import type { FightEvent } from './fight-view';

/** the prompt of a context before the player types a command */
export interface PromptEvent {
  readonly type: 'prompt';
  readonly context: CommandContext;
}

export type GameEvent = FightEvent | AftermathEvent | PromptEvent;

export interface IEvents {
  /** a view may wait for a key, so showing may find the input over */
  readonly emit: (event: GameEvent) => Effect.Effect<void, EndOfInput>;
}

export const Events = Context.Service<IEvents>('Events');

export function emit(event: GameEvent) {
  return Effect.flatMap(Events, (events) => events.emit(event));
}
