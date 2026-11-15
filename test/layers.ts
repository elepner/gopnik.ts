/** Test wiring: the whole game service set with scripted keys and a throw-away save dir. */
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Effect, Layer } from 'effect';

import { keyCode } from '../oracle/dos';
import { biosKey, type IKeyboard, makeCrt } from '../src/crt/crt';
import { dirDisk } from '../src/dir-disk';
import { Events, type GameEvent } from '../src/game/events';
import { EndOfInput } from '../src/game/terminal';
import { gameLayer } from '../src/runtime';
import { Seed } from '../src/tp/brands';

export interface TestGameOptions {
  /** key names as in the oracle CLI: chars, `enter`, `space`, `esc`, `bs`, ... */
  readonly keys?: readonly string[];
  readonly seed?: number;
  /** keep the game's events here instead of showing them */
  readonly events?: GameEvent[];
}

/** all game services; Keyboard.read fails with EndOfInput when the script runs out */
export function testGame(opts: TestGameOptions = {}) {
  const crt = makeCrt();
  const queue = [...(opts.keys ?? [])];
  const keyboard: IKeyboard = {
    read: Effect.suspend(() => {
      const k = queue.shift();
      return k === undefined ? Effect.fail(new EndOfInput()) : Effect.succeed(biosKey(keyCode(k)));
    }),
    peek: Effect.sync(() => queue.length > 0),
    delay: () => Effect.void,
  };
  const dir = mkdtempSync(join(tmpdir(), 'gopnik-test-'));
  const kept = opts.events;
  const events = kept
    ? Layer.succeed(Events, { emit: (event) => Effect.sync(() => void kept.push(event)) })
    : undefined;
  return {
    crt,
    layer: gameLayer({ seed: Seed(opts.seed ?? 0), disk: dirDisk(dir), keyboard, crt, events }),
  };
}
