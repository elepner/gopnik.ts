/** Test wiring: the whole game service set with scripted keys and a throw-away save dir. */
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Effect } from 'effect';

import { keyCode } from '../oracle/dos';
import { biosKey, EndOfInput, type IKeyboard, makeCrt } from '../src/crt/crt';
import { gameLayer } from '../src/runtime';
import { Seed } from '../src/tp/brands';

export interface TestGameOptions {
  /** key names as in the oracle CLI: chars, `enter`, `space`, `esc`, `bs`, ... */
  readonly keys?: readonly string[];
  readonly seed?: number;
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
  return { crt, layer: gameLayer({ seed: Seed(opts.seed ?? 0), dir, keyboard, crt }) };
}
