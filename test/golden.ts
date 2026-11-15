/**
 * Golden e2e sessions: a long key log played on the port, recorded as readable JSON lines —
 * for every key read: the key, the Random count so far and everything printed since the
 * previous key as coloured segments. The last line holds the final state (fields of the
 * original's layout, stable across refactorings). No screen/CRT dependency.
 * Goldens were recorded on the pre-refactor port (verified against the original), so later
 * refactorings must reproduce them exactly.
 *   bun test/golden.ts record     re-record from the current code — only on purpose!
 */
import { cpSync, mkdtempSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { Effect } from 'effect';

import { keyCode } from '../oracle/dos';
import { biosKey, EndOfInput, type IKeyboard, makeCrt } from '../src/crt/crt';
import { Engine, type PrintCall } from '../src/game/prelude';
import { gameLayer, program } from '../src/runtime';
import { snapshotState } from '../src/state/legacy';
import { snapshot } from '../src/state/store';
import { Seed } from '../src/tp/brands';
import { Rng } from '../src/tp/rng';

export const GOLDEN_DIR = join(import.meta.dirname, 'golden');
export const FIXTURES = join(import.meta.dirname, 'fixtures');
export const ORIGINAL = join(import.meta.dirname, '..', 'original');

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

export interface Session {
  readonly steps: Step[];
  readonly final: Record<string, number | string>;
}

/** plays a key log on the current port and records it */
export async function recordSession(seed: number, keys: readonly string[]): Promise<Session> {
  const crt = makeCrt();
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
  const dir = mkdtempSync(join(tmpdir(), 'gopnik-golden-'));
  for (const f of readdirSync(ORIGINAL))
    if (f.toUpperCase().endsWith('.SAV')) cpSync(join(ORIGINAL, f), join(dir, f));
  let final = () => ({}) as Record<string, number | string>;
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
      final = () => snapshotState(snapshot(game.state));
      yield* program;
    }).pipe(Effect.provide(gameLayer({ seed: Seed(seed), dir, keyboard, crt })))
  );
  return { steps, final: final() };
}

/** a Print call as segments; PrintLn ends with a `\n` segment */
function segments(p: PrintCall): [number, string][] {
  const out = p.segments.map((s): [number, string] => [s.color, s.text]);
  if (p.newline) out.push([15, '\n']);
  return out;
}

/** key log written by the bots: `# seed N ...` header, one key per line, # comments */
export function readKeyLog(file: string) {
  const lines = readFileSync(join(FIXTURES, file), 'utf8').split('\n');
  const seed = Number(lines[0].match(/seed (\d+)/)?.[1] ?? 0);
  return { seed, keys: lines.filter((l) => l && !l.startsWith('#')) };
}

export function readGolden(name: string): Session {
  const lines = readFileSync(join(GOLDEN_DIR, `${name}.jsonl`), 'utf8')
    .trim()
    .split('\n');
  const final = JSON.parse(lines.pop()!).final;
  return { steps: lines.map((l) => JSON.parse(l)), final };
}

export function writeGolden(name: string, s: Session) {
  const lines = [...s.steps.map((x) => JSON.stringify(x)), JSON.stringify({ final: s.final })];
  return Bun.write(join(GOLDEN_DIR, `${name}.jsonl`), lines.join('\n') + '\n');
}

/** the sessions kept as goldens: long enough to cover the whole game */
export const GOLDEN_SESSIONS = ['new-game-otmorozok-win', 'new-game-vor-win', 'save5-rector-win'];

if (import.meta.main && process.argv[2] === 'record') {
  for (const name of GOLDEN_SESSIONS) {
    const { seed, keys } = readKeyLog(`${name}.keys`);
    const session = await recordSession(seed, keys);
    await writeGolden(name, session);
    console.log(`${name}: ${session.steps.length} steps`);
  }
}
