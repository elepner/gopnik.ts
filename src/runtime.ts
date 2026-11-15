/** Wiring of the port's services. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { Effect, Layer } from 'effect';

import { type ICrt, type IKeyboard, makeCrt } from './crt/crt';
import { crtTerminal } from './crt/terminal';
import type { IEvents } from './game/events';
import { mainLoop } from './game/main';
import { Disk, Engine, transaction } from './game/prelude';
import { newGame } from './game/start';
import { type ITerminal, Terminal } from './game/terminal';
import { viewLayer } from './game/view-layer';
import { createState, type GameState } from './state/state';
import { createStore } from './state/store';
import { SaveName, type Seed } from './tp/brands';
import { rngLayer } from './tp/rng';

/** the whole program: G.EXE's main block */
export const program = Effect.andThen(transaction(newGame), mainLoop);

export type GameOptions = GameSetup & (PlainIo | CrtIo);

export interface GameSetup {
  readonly seed: Seed;
  /** the state to start from (a fresh, not started game by default) */
  readonly state?: GameState;
  readonly dir: string;
  /** who listens to the game's events: the screen by default */
  readonly events?: Layer.Layer<IEvents, never, never>;
}

/** any terminal, e.g. a plain console */
interface PlainIo {
  readonly terminal: ITerminal;
}

/** the emulated CRT (a fresh one by default) with these keys */
interface CrtIo {
  readonly keyboard: IKeyboard;
  readonly crt?: ICrt;
}

export function gameLayer(opts: GameOptions) {
  const state = createStore(opts.state ?? createState());
  const services = Layer.mergeAll(
    Layer.succeed(
      Terminal,
      'terminal' in opts ? opts.terminal : crtTerminal(opts.crt ?? makeCrt(), opts.keyboard)
    ),
    Layer.succeed(Engine, { state, printBuf: new Uint8Array(256), transcript: [] }),
    Layer.succeed(Disk, dirDisk(opts.dir)),
    rngLayer(opts.seed)
  );
  const events = opts.events ?? viewLayer;
  return events.pipe(Layer.provideMerge(services));
}

/** saves live as plain files in one directory, matched case-insensitively like DOS */
export function dirDisk(dir: string) {
  const resolve = (name: string) =>
    readdirSync(dir).find((f) => f.toLowerCase() === name.toLowerCase()) ?? name;
  return {
    list: (pattern: RegExp) =>
      Effect.sync(() =>
        readdirSync(dir)
          .filter((f) => pattern.test(f))
          .filter((f) => SaveName.is(f))
          .sort()
      ),
    read: (name: SaveName) =>
      Effect.sync(() => {
        try {
          return new Uint8Array(readFileSync(join(dir, resolve(name))));
        } catch {
          return undefined;
        }
      }),
    write: (name: SaveName, data: Uint8Array) =>
      Effect.sync(() => writeFileSync(join(dir, resolve(name)), data)),
  };
}
