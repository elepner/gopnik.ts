/**
 * Golden e2e sessions with the normalized state: a long session played on the port, recorded
 * as readable JSON lines. The first line is the start (the Random seed and, for a session that
 * starts in the middle of a game, its normalized state), then for every key read: the key, the
 * Random calls so far and everything printed since the previous key as coloured segments. The
 * last line is the final normalized state. Self-contained: the keys are in the steps. No
 * screen/CRT dependency, no save files for the state.
 * Recorded from the old goldens (original's layout, `069ac2b`, verified against the original):
 * same steps and final state. Re-record only on purpose:
 *   bun test/gold.ts record
 */
import { cpSync, mkdtempSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Effect } from 'effect';

import { keyCode } from '../oracle/dos';
import { biosKey, type IKeyboard, makeCrt } from '../src/crt/crt';
import { mainLoop } from '../src/game/main';
import { Engine, type PrintCall } from '../src/game/prelude';
import { EndOfInput } from '../src/game/terminal';
import { gameLayer, program } from '../src/runtime';
import { denormalize, normalize, type NormalizedState } from '../src/state/normalized';
import { snapshot } from '../src/state/store';
import { Seed } from '../src/tp/brands';
import { Rng } from '../src/tp/rng';

export const GOLD_DIR = join(import.meta.dirname, 'gold');
const ORIGINAL = join(import.meta.dirname, '..', 'original');

/** where a session starts: a new game, or the main loop of a game in progress */
export interface Start {
  readonly seed: number;
  readonly state?: NormalizedState;
}

/** one key read: what was printed before it and which key answered it */
export interface Step {
  readonly step: number;
  /** Random calls so far */
  readonly rand: number;
  /** Print/PrintLn calls since the previous key read: `[colour, text]` segments; `\n` = PrintLn */
  readonly out: readonly (readonly [number, string])[];
  /** the key pressed (absent on the last read) */
  readonly key?: string;
}

export interface Gold {
  readonly start: Start;
  readonly steps: Step[];
  readonly final: NormalizedState;
}

/** plays the keys from a start on the current port and records the session */
export async function record(start: Start, keys: readonly string[]): Promise<Gold> {
  const queue = [...keys];
  const steps: Step[] = [];
  let read = (): Omit<Step, 'step' | 'key'> => ({ rand: 0, out: [] });
  const keyboard: IKeyboard = {
    read: Effect.suspend(() => {
      const k = queue.shift();
      steps.push({ step: steps.length, ...read(), ...(k === undefined ? {} : { key: k }) });
      return k === undefined ? Effect.fail(new EndOfInput()) : Effect.succeed(biosKey(keyCode(k)));
    }),
    peek: Effect.sync(() => queue.length > 0),
    delay: () => Effect.void,
  };
  let final = (): NormalizedState | undefined => undefined;
  await Effect.runPromiseExit(
    Effect.gen(function* () {
      const game = yield* Engine;
      const log = yield* (yield* Rng).log;
      let printed = 0;
      read = () => {
        const out = game.transcript.slice(printed).flatMap(segments);
        printed = game.transcript.length;
        return { rand: log.length, out };
      };
      final = () => normalize(snapshot(game.state));
      yield* start.state ? mainLoop : program;
    }).pipe(
      Effect.provide(
        gameLayer({
          seed: Seed(start.seed),
          state: start.state && denormalize(start.state),
          dir: saveDir(),
          keyboard,
          crt: makeCrt(),
        })
      )
    )
  );
  return { start, steps, final: final()! };
}

/** a fresh directory with the original's save files: the start menu lists them */
function saveDir() {
  const dir = mkdtempSync(join(tmpdir(), 'gopnik-gold-'));
  for (const f of readdirSync(ORIGINAL))
    if (f.toUpperCase().endsWith('.SAV')) cpSync(join(ORIGINAL, f), join(dir, f));
  return dir;
}

/** a Print call as segments; PrintLn ends with a `\n` segment */
function segments(p: PrintCall): [number, string][] {
  const out = p.segments.map((s): [number, string] => [s.color, s.text]);
  if (p.newline) out.push([15, '\n']);
  return out;
}

export function keysOf(gold: Gold): string[] {
  return gold.steps.flatMap((s) => (s.key === undefined ? [] : [s.key]));
}

export function readGold(name: string): Gold {
  const lines = readFileSync(join(GOLD_DIR, `${name}.jsonl`), 'utf8')
    .trim()
    .split('\n')
    .map((l) => JSON.parse(l));
  return { start: lines[0].start, steps: lines.slice(1, -1), final: lines.at(-1).final };
}

export function writeGold(name: string, g: Gold) {
  const lines = [{ start: g.start }, ...g.steps, { final: g.final }].map((l) => JSON.stringify(l));
  return Bun.write(join(GOLD_DIR, `${name}.jsonl`), lines.join('\n') + '\n');
}

/** the sessions kept as goldens: long enough to cover the whole game */
export const GOLD_SESSIONS = ['new-game-otmorozok-win', 'new-game-vor-win', 'save5-rector-win'];

if (import.meta.main && process.argv[2] === 'record') {
  for (const name of GOLD_SESSIONS) {
    const gold = await record(readGold(name).start, keysOf(readGold(name)));
    await writeGold(name, gold);
    console.log(`${name}: ${gold.steps.length} steps`);
  }
}
