/** Run one piece of game logic with prepared state, a seed and scripted keys. */
import { Effect, Exit } from 'effect';

import { Game } from '../src/game/prelude';
import type { Memory, State } from '../src/state/layout';
import { type RandCall, Rng } from '../src/tp/rng';
import { testGame } from './layers';

export interface Played<A> {
  readonly exit: Exit.Exit<A, unknown>;
  readonly st: State;
  readonly mem: Memory;
  /** text of every Print/PrintLn call, colour codes stripped */
  readonly lines: string[];
  readonly rand: readonly RandCall[];
}

export interface PlayOptions {
  readonly seed?: number;
  readonly keys?: readonly string[];
  readonly setup?: (st: State, mem: Memory) => void;
}

/** runs `eff` to completion (or until the key script runs out) and reports what happened */
export function play<A, E, R>(eff: Effect.Effect<A, E, R>, opts: PlayOptions = {}) {
  return Effect.gen(function* () {
    const game = yield* Game;
    opts.setup?.(game.st, game.mem);
    const rng = yield* Rng;
    const exit = yield* Effect.exit(eff);
    const lines = game.transcript.map((p) => p.segments.map((s) => s.text).join(''));
    return { exit, st: game.st, mem: game.mem, lines, rand: yield* rng.log } as Played<A>;
  }).pipe(Effect.provide(testGame({ seed: opts.seed, keys: opts.keys }).layer)) as Effect.Effect<
    Played<A>
  >;
}

/** a level-0 Отморозок standing in district 1 with known places */
export function hero(st: State) {
  st.district = 1 as State['district'];
  st.charType = 4 as State['charType'];
  st.str = 5;
  st.agi = 2;
  st.vit = 4;
  st.luck = 1;
  st.hpMax = 35;
  st.hp = 35;
  st.dmgMin = 2;
  st.dmgMax = 5;
  st.expNext = 10;
  st.knowsMarket = 1;
  st.knowsHospital = 1;
}
