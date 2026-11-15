/**
 * Shared building blocks of the port: game services and the custom print unit
 * of the original (segment 0EED: Print/PrintLn/LowerCase).
 */
import { Context, Effect } from 'effect';

import { attr } from '../state/attributes';
import type { SavedGame } from '../state/saved';
import { type GameState, type KnownPlaces, playing } from '../state/state';
import { begin, commit, draft, type Store } from '../state/store';
import { CrtColor } from '../tp/brands';
import { CP866, encodeCp866 } from '../tp/cp866';
import { i16, str } from '../tp/num';
import { Rng } from '../tp/rng';
import { Halt, textColor, WHITE, write, writeLn } from './terminal';
import type { Text } from './text';

/**
 * 0EED:0000 Print: the original's custom output routine. `^0`..`^7` in the format switch
 * the colour to 8..15, every `#` prints the next integer argument (texts come from texts.ts).
 */
export function print(t: Text) {
  return printf(t.format, t.args, false);
}

/** 0EED:01C2 PrintLn */
export function println(t: Text) {
  return printf(t.format, t.args, true);
}

/** one Print/PrintLn call: the final Pascal string, its integer arguments and coloured runs */
export interface PrintCall {
  readonly text: string;
  readonly args: readonly number[];
  readonly newline: boolean;
  readonly segments: readonly Segment[];
}

export interface Segment {
  /** CRT colour 8..15 */
  readonly color: CrtColor;
  readonly text: string;
}

/** the original Print algorithm, byte for byte: a Pascal string with codes and its integers */
function printf(text: string, ints: readonly number[], newline: boolean) {
  return Effect.gen(function* () {
    const game = yield* Engine;
    // the original copies the text into a 256-byte stack buffer and may read past its end
    const buf = game.printBuf;
    const bytes = encodeCp866(text);
    const len = bytes.length;
    buf[0] = len;
    buf.set(bytes, 1);
    const nums = [0, 1, 2, 3, 4].map((n) => str(i16(ints[n] ?? 0)));
    const segments: Segment[] = [];
    let color = WHITE;
    const emit = (t: string) => {
      const last = segments[segments.length - 1];
      if (last && last.color === color)
        segments[segments.length - 1] = { color, text: last.text + t };
      else segments.push({ color, text: t });
    };
    yield* textColor(WHITE);
    let i = 0;
    let arg = 0;
    do {
      i++;
      while (buf[i] === 0x5e && len > i && buf[i + 1] >= 0x30 && buf[i + 1] <= 0x37) {
        yield* textColor(WHITE);
        color = CrtColor(buf[i + 1] - 0x30 + 8);
        yield* textColor(color);
        i += 2;
      }
      if (buf[i] === 0x23) {
        const v = nums[arg++] ?? '';
        emit(v);
        yield* write(v);
      } else if (len >= i) {
        emit(CP866[buf[i]]);
        yield* write(CP866[buf[i]]);
      }
    } while (len > i);
    yield* textColor(WHITE);
    if (newline) yield* writeLn;
    game.transcript.push({ text, args: [...ints], newline, segments });
  });
}

/** 0EED:0216 LowerCase — ASCII A..Z only */
export function lowerCase(s: string): string {
  return s.replace(/[A-Z]/g, (c) => c.toLowerCase());
}

export function rnd(n: number) {
  return Rng.use((rng) => rng.next(n));
}

export const halt = Effect.fail(new Halt({ code: 0 }));

/** the state inside the current transaction (any phase) — a draft: assign to it directly */
export const state = Effect.gen(function* () {
  return draft((yield* Engine).state) as GameState;
});

/** the running game's state inside the current transaction */
export const started = Effect.gen(function* () {
  return playing(yield* state);
});

/**
 * Runs `eff` as one transaction: all changes go to one immer draft and become one new frozen
 * snapshot at the end (also when the game halts). Nested transactions join the open one.
 */
export function transaction<A, E, R>(eff: Effect.Effect<A, E, R>) {
  return Effect.gen(function* () {
    const store = (yield* Engine).state;
    if (!begin(store)) return yield* eff;
    return yield* eff.pipe(Effect.ensuring(Effect.sync(() => commit(store))));
  });
}

/**
 * `luck >= Random(n)`: the original compares Longints, but always calls Random first —
 * also when luck has overflowed into negative numbers.
 */
export function luckAtLeast(n: number) {
  return Effect.gen(function* () {
    const st = yield* state;
    const r = yield* rnd(n);
    return attr(st.player, 'luck') >= r;
  });
}

export interface IEngine {
  /** committed snapshots and the open transaction's draft */
  readonly state: Store;
  /** stack buffer of Print, keeps bytes of earlier (longer) strings like the original */
  readonly printBuf: Uint8Array;
  /** every Print/PrintLn so far — the structured view of the game's output */
  readonly transcript: PrintCall[];
}

export const Engine = Context.Service<IEngine>('Engine');

/**
 * Where the saves live: files of the original's format (`src/dir-saves.ts`), JSON in a browser.
 * A slot is the digit of SAVE_R?.SAV: `0` is Рушель Блаво's, `2`..`5` the district's.
 */
export interface ISaves {
  /** the slots that hold a save, in directory order */
  readonly slots: Effect.Effect<readonly string[]>;
  readonly load: (slot: string) => Effect.Effect<SavedGame | undefined>;
  readonly save: (slot: string, game: SavedGame) => Effect.Effect<void>;
  /** the known places, saved with Рушель Блаво's slot (PLACES.SAV) */
  readonly loadPlaces: Effect.Effect<KnownPlaces | undefined>;
  readonly savePlaces: (places: KnownPlaces) => Effect.Effect<void>;
}

export const Saves = Context.Service<ISaves>('Saves');
