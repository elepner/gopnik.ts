/**
 * What happens in the game, as events: the rules `emit` them and don't know who listens. The
 * game's views listen (`view-layer.ts`, wired in `runtime.ts`); a test can listen instead and
 * keep them. Events are shown the moment they are emitted, so a view may read the state.
 */
import { Context, Effect } from 'effect';

import type { EndOfInput } from '../crt/crt';
import type { AftermathEvent } from './aftermath-view';
import type { BeerEvent } from './beer';
import type { Context as CommandContext } from './commands';
import type { EncountersEvent } from './encounters-view';
import type { EnemyEvent } from './enemy-view';
import type { FightEvent } from './fight-view';
import type { HeroEvent } from './hero-view';
import type { MainEvent } from './main-view';
import type { ClubEvent } from './places/club-view';
import type { DealersEvent } from './places/dealers-view';
import type { DenEvent } from './places/den-view';
import type { GirlfriendEvent } from './places/girlfriend-view';
import type { GymEvent } from './places/gym-view';
import type { MarketEvent } from './places/market-view';
import type { VetEvent } from './places/vet-view';
import type { StartEvent } from './start-view';
import type { WalkEvent } from './walk-view';

/** the prompt of a context before the player types a command */
export interface PromptEvent {
  readonly type: 'prompt';
  readonly context: CommandContext;
}

export type GameEvent =
  | PromptEvent
  | MainEvent
  | StartEvent
  | WalkEvent
  | EncountersEvent
  | HeroEvent
  | EnemyEvent
  | FightEvent
  | BeerEvent
  | AftermathEvent
  | MarketEvent
  | DealersEvent
  | VetEvent
  | GirlfriendEvent
  | DenEvent
  | ClubEvent
  | GymEvent;

export interface IEvents {
  /** a view may wait for a key, so showing may find the input over */
  readonly emit: (event: GameEvent) => Effect.Effect<void, EndOfInput>;
}

export const Events = Context.Service<IEvents>('Events');

export function emit(event: GameEvent) {
  return Effect.flatMap(Events, (events) => events.emit(event));
}
