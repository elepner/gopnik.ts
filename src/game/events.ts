/**
 * What happens in the game, as events: the rules `emit` them and don't know who listens. The
 * game's views listen (`view-layer.ts`, wired in `runtime.ts`); a test can listen instead and
 * keep them. Events are shown the moment they are emitted, so a view may read the state.
 * An event that changes the state is reported: the part's `apply` puts it into the state
 * first, then it is emitted.
 */
import { Context, Effect } from 'effect';

import type { AftermathEvent } from './aftermath-view';
import type { BeerEvent } from './beer';
import type { Context as CommandContext } from './commands';
import type { EncountersEvent } from './encounters-view';
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
import { started } from './prelude';
import type { StartEvent } from './start-view';
import type { EndOfInput } from './terminal';
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

/** a part's rules report their events: `apply` puts each one into the game, then it is emitted */
export const reporter = reporterOn(started);

/** reports into the state `from` reads: the start creates the hero before the game has started */
export function reporterOn<S, Err, R>(from: Effect.Effect<S, Err, R>) {
  return <E extends GameEvent>(apply: (st: S, event: E) => void) =>
    (event: E) =>
      Effect.gen(function* () {
        apply(yield* from, event);
        yield* emit(event);
      });
}
