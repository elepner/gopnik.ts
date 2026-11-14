/** Wiring of the port's services. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { Effect, Layer } from 'effect';

import { Crt, type ICrt, type IKeyboard, Keyboard, makeCrt } from './crt/crt';
import { mainLoop } from './game/main';
import { Disk, Game } from './game/prelude';
import { newGame } from './game/start';
import { createState } from './state/layout';
import { rngLayer } from './tp/rng';

/** the whole program: G.EXE's main block */
export const program = Effect.andThen(newGame, mainLoop);

export interface GameOptions {
  readonly seed: number;
  readonly dir: string;
  readonly keyboard: IKeyboard;
  readonly crt?: ICrt;
}

export function gameLayer(opts: GameOptions) {
  const { mem, st } = createState();
  return Layer.mergeAll(
    Layer.succeed(Crt, opts.crt ?? makeCrt()),
    Layer.succeed(Keyboard, opts.keyboard),
    Layer.succeed(Game, { st, mem, printBuf: new Uint8Array(256), transcript: [] }),
    Layer.succeed(Disk, dirDisk(opts.dir)),
    rngLayer(opts.seed)
  );
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
          .sort()
      ),
    read: (name: string) =>
      Effect.sync(() => {
        try {
          return new Uint8Array(readFileSync(join(dir, resolve(name))));
        } catch {
          return undefined;
        }
      }),
    write: (name: string, data: Uint8Array) =>
      Effect.sync(() => writeFileSync(join(dir, resolve(name)), data)),
  };
}
