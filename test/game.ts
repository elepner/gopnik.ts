/** Run one piece of game logic with prepared state, a seed and scripted keys. */
import { Effect, Exit } from 'effect';

import type { GameEvent } from '../src/game/events';
import { Engine, state, transaction } from '../src/game/prelude';
import { set } from '../src/state/attributes';
import { type GameState, playing, type Game, startGame } from '../src/state/state';
import { District } from '../src/tp/brands';
import { type RandCall, Rng } from '../src/tp/rng';
import { testGame } from './layers';

export interface Played<A> {
  readonly exit: Exit.Exit<A, unknown>;
  readonly st: Game;
  /** text of every Print/PrintLn call, colour codes stripped */
  readonly lines: string[];
  readonly rand: readonly RandCall[];
}

export interface PlayOptions {
  readonly seed?: number;
  readonly keys?: readonly string[];
  /** prepares the state; most game procedures expect a started game (see `hero`) */
  readonly setup?: (st: GameState) => void;
  /** keep the game's events here instead of showing them */
  readonly events?: GameEvent[];
}

/** runs `eff` to completion (or until the key script runs out) and reports what happened */
export function play<A, E, R>(eff: Effect.Effect<A, E, R>, opts: PlayOptions = {}) {
  return Effect.gen(function* () {
    const game = yield* Engine;
    const rng = yield* Rng;
    const exit = yield* Effect.exit(
      transaction(
        Effect.gen(function* () {
          opts.setup?.(yield* state);
          return yield* eff;
        })
      )
    );
    const lines = game.transcript.map((p) => p.segments.map((s) => s.text).join(''));
    return { exit, st: playing(game.state.committed), lines, rand: yield* rng.log } as Played<A>;
  }).pipe(
    Effect.provide(testGame({ seed: opts.seed, keys: opts.keys, events: opts.events }).layer)
  ) as Effect.Effect<Played<A>>;
}

/** starts the game with a level-0 Отморозок standing in district 1 with known places */
export function hero(state: GameState): Game {
  const st = startGame(state, 'otmorozok');
  st.world.district = District(1);
  set(st.player, 'strength', 5);
  set(st.player, 'agility', 2);
  set(st.player, 'vitality', 4);
  set(st.player, 'luck', 1);
  set(st.player, 'healthMax', 35);
  st.player.health.current = 35;
  set(st.player, 'damageMin', 2);
  set(st.player, 'damageMax', 5);
  st.player.progression.expNext = 10;
  st.world.places.market = true;
  st.world.places.hospital = true;
  return st;
}
