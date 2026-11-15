/**
 * Differential harness: the same seed and key script go to the emulated original and to
 * the port; at every key read both sides are snapshotted (screen cells, state, Random log).
 */
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

import { Cause, Effect, Exit } from 'effect';

import { Dos, IMG, keyCode, LOAD_SEG, VIDEO } from '../oracle/dos';
import { biosKey, type IKeyboard, makeCrt } from '../src/crt/crt';
import { Engine } from '../src/game/prelude';
import { EndOfInput } from '../src/game/terminal';
import { gameLayer, program } from '../src/runtime';
import { snapshot, snapshotState } from '../src/state/legacy';
import { snapshot as current, type Store } from '../src/state/store';
import { Seed } from '../src/tp/brands';
import { CP866 as CP } from '../src/tp/cp866';
import { Rng, type RandCall } from '../src/tp/rng';

export interface Snapshot {
  readonly cells: Uint8Array;
  readonly state: Record<string, number | string>;
  readonly rand: number;
}

export interface Run {
  readonly snaps: readonly Snapshot[];
  readonly rand: readonly RandCall[];
  /** structured output: every Print/PrintLn with its text and integer arguments */
  readonly prints: readonly PrintRecord[];
}

export interface PrintRecord {
  readonly text: string;
  readonly args: readonly number[];
  readonly newline: boolean;
}

export interface Divergence {
  readonly step: number;
  readonly key: string | undefined;
  readonly what: string;
  readonly original: string;
  readonly port: string;
}

/** "abc/" expands to the keys a, b, c, enter; other tokens are single keys */
export function expandKeys(tokens: readonly string[]): string[] {
  return tokens.flatMap((t) =>
    t.endsWith('/') && t.length > 1 ? [...t.slice(0, -1), 'enter'] : t === '/' ? ['enter'] : [t]
  );
}

/** runs both sides and returns the first difference, if any */
export async function compare(seed: number, keys: readonly string[], saves?: string) {
  const original = runOriginal(seed, keys, workdirFor('original', saves));
  const port = await runPort(seed, keys, workdirFor('port', saves));
  return { original, port, divergence: firstDivergence(original, port, keys) };
}

export function runOriginal(seed: number, keys: readonly string[], dir: string): Run {
  const dos = new Dos({ exe: join(ROOT, 'original/g.exe'), workdir: dir, seed });
  const ds = (LOAD_SEG + IMG.dataSeg) * 16;
  const snap = (): Snapshot => ({
    cells: dos.cpu.mem.slice(VIDEO, VIDEO + 4000),
    state: snapshot(dos.cpu.mem, ds),
    rand: dos.randLog.length,
  });
  let i = 0;
  dos.onPoll = () => (i < keys.length ? keyCode(keys[i++]) : undefined);
  dos.run();
  const snaps = [snap()];
  while (i < keys.length && !dos.exited) {
    dos.send(keys[i++]);
    if (!dos.exited) snaps.push(snap());
  }
  return {
    snaps,
    rand: dos.randLog.map((r) => ({ n: r.n, result: r.result })),
    prints: dos.printLog,
  };
}

export async function runPort(seed: number, keys: readonly string[], dir: string): Promise<Run> {
  const crt = makeCrt();
  const queue = [...keys];
  const snaps: Snapshot[] = [];
  let store: Store | undefined;
  let log: readonly RandCall[] = [];
  let prints: readonly PrintRecord[] = [];
  // a key seen by KeyPressed was already "in the buffer": reading it is not a new wait
  let polled = false;
  const keyboard: IKeyboard = {
    read: Effect.suspend(() => {
      if (!polled)
        snaps.push({
          cells: crt.screen.cells.slice(),
          state: snapshotState(current(store!)),
          rand: log.length,
        });
      polled = false;
      const k = queue.shift();
      if (k === undefined) return Effect.fail(new EndOfInput());
      return Effect.succeed(biosKey(keyCode(k)));
    }),
    peek: Effect.sync(() => (polled = queue.length > 0)),
    delay: () => Effect.void,
  };
  const exit = await Effect.runPromiseExit(
    Effect.gen(function* () {
      const game = yield* Engine;
      store = game.state;
      prints = game.transcript;
      log = yield* (yield* Rng).log;
      yield* program;
    }).pipe(Effect.provide(gameLayer({ seed: Seed(seed), dir, keyboard, crt })))
  );
  if (Exit.isFailure(exit) && !/EndOfInput|Halt/.test(Cause.pretty(exit.cause)))
    throw new Error(`port crashed: ${Cause.pretty(exit.cause)}`);
  return { snaps, rand: log, prints };
}

export function firstDivergence(a: Run, b: Run, keys: readonly string[]): Divergence | undefined {
  const n = Math.max(a.snaps.length, b.snaps.length);
  for (let i = 0; i < n; i++) {
    const x = a.snaps[i];
    const y = b.snaps[i];
    const key = keys[i - 1];
    if (!x || !y) return { step: i, key, what: 'length', original: String(!!x), port: String(!!y) };
    if (!sameCells(x.cells, y.cells))
      return {
        step: i,
        key,
        what: 'screen',
        original: screenText(x.cells),
        port: screenText(y.cells),
      };
    if (x.rand !== y.rand)
      return { step: i, key, what: 'random count', original: String(x.rand), port: String(y.rand) };
    for (const f of Object.keys(x.state))
      if (x.state[f] !== y.state[f])
        return {
          step: i,
          key,
          what: `state.${f}`,
          original: String(x.state[f]),
          port: String(y.state[f]),
        };
  }
  for (let i = 0; i < Math.min(a.prints.length, b.prints.length); i++) {
    const x = a.prints[i];
    const y = b.prints[i];
    const used = Math.min(5, [...x.text].filter((c) => c === '#').length);
    if (
      x.text !== y.text ||
      x.newline !== y.newline ||
      x.args.slice(0, used).join() !== y.args.slice(0, used).join()
    )
      return {
        step: -1,
        key: undefined,
        what: `print #${i}`,
        original: JSON.stringify(x),
        port: JSON.stringify(y),
      };
  }
  if (a.prints.length !== b.prints.length)
    return {
      step: -1,
      key: undefined,
      what: 'print count',
      original: String(a.prints.length),
      port: String(b.prints.length),
    };
  for (let i = 0; i < Math.min(a.rand.length, b.rand.length); i++)
    if (a.rand[i].n !== b.rand[i].n || a.rand[i].result !== b.rand[i].result)
      return {
        step: -1,
        key: undefined,
        what: `random #${i}`,
        original: JSON.stringify(a.rand[i]),
        port: JSON.stringify(b.rand[i]),
      };
  return undefined;
}

function sameCells(a: Uint8Array, b: Uint8Array) {
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export function screenText(cells: Uint8Array): string {
  const lines: string[] = [];
  for (let r = 0; r < 25; r++) {
    let s = '';
    for (let c = 0; c < 80; c++) s += CP[cells[(r * 80 + c) * 2]];
    lines.push(s.trimEnd());
  }
  return lines.join('\n');
}

const ROOT = join(import.meta.dirname, '..');

export function workdirFor(side: string, saves?: string) {
  const dir = join(
    ROOT,
    'oracle/.work',
    `${side}-${process.pid}-${Math.random().toString(36).slice(2)}`
  );
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  if (saves) for (const f of readdirSync(saves)) cpSync(join(saves, f), join(dir, f));
  return dir;
}

/** a deterministic random play-through: intro, character creation, then weighted commands */
export function scenario(seed: number, length: number, fromSave = false): string[] {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = <T>(xs: readonly T[]) => xs[Math.floor(next() * xs.length)];
  const out = fromSave
    ? ['space', pick(['0', '2', '3', '4', '5', '1'])]
    : ['space', ...'1234567', `${pick(['0', '1', '2', '3', '4'])}/`, pick(['vasya/', '/'])];
  if (fromSave && out[1] === '1') out.push(...'1234567', '2/', 'petya/');
  const pool: [string, number][] = [
    ['w/', 30],
    ['k/', 25],
    ['y/', 6],
    ['n/', 2],
    ['s/', 2],
    ['sv/', 2],
    ['i/', 1],
    ['h/', 4],
    ['mh/', 2],
    ['kos/', 1],
    ['v/', 2],
    ['f/', 1],
    ['run/', 2],
    ['mar/', 2],
    ['bmar/', 2],
    ['rep/', 2],
    ['girl/', 1],
    ['pr/', 2],
    ['kl/', 2],
    ['trn/', 2],
    ['1/', 2],
    ['2/', 2],
    ['3/', 1],
    ['4/', 1],
    ['5/', 1],
    ['6/', 1],
    ['7/', 1],
    ['8/', 1],
    ['9/', 1],
    ['t/', 1],
    ['p/', 2],
    ['r/', 1],
    ['a/', 1],
    ['d/', 1],
    ['hp/', 1],
    ['x/', 1],
    ['wes/', 1],
    ['space', 3],
    ['help/', 1],
    ['version/', 1],
    ['name/', 1],
  ];
  const total = pool.reduce((a, [, w]) => a + w, 0);
  while (out.length < length) {
    let r = next() * total;
    for (const [tok, w] of pool)
      if ((r -= w) < 0) {
        out.push(tok);
        break;
      }
  }
  return out;
}
