/**
 * Shared building blocks of the port: game services and the custom print unit
 * of the original (segment 0EED: Print/PrintLn/LowerCase).
 */
import { Context, Effect } from 'effect';

import { Crt, Halt, textColor, WHITE, write, writeLn } from '../crt/crt';
import { type GameState, playing } from '../state/state';
import { CrtColor, type SaveName } from '../tp/brands';
import { CP866, encodeCp866 } from '../tp/cp866';
import { i16, str } from '../tp/num';
import { Rng } from '../tp/rng';

/**
 * 0EED:0000 Print. The format is a text literal: `^0`..`^7` switch the colour to 8..15,
 * `#` takes the next number, `$` the next string (spliced in before printing, like the
 * original's string concatenation). Argument types follow from the literal.
 */
export function print<const S extends string>(format: S, ...args: PrintArgs<NoInfer<S>>) {
  return printf(format, args, false);
}

/** 0EED:01C2 PrintLn */
export function println<const S extends string>(format: S, ...args: PrintArgs<NoInfer<S>>) {
  return printf(format, args, true);
}

/** `$` and `#` placeholders of a format literal, in order */
export type PrintArgs<S extends string> = string extends S
  ? readonly (number | string)[]
  : Placeholders<S>;

type Placeholders<S extends string, A extends unknown[] = []> = S extends `${infer C}${infer R}`
  ? Placeholders<R, C extends '#' ? [...A, number] : C extends '$' ? [...A, string] : A>
  : A;

/** splices `$` arguments into a text without printing it */
export function fmt<const S extends string>(format: S, ...args: StringArgs<NoInfer<S>>): string {
  let k = 0;
  return format.replace(/\$/g, () => String(args[k++]));
}

type StringArgs<S extends string, A extends unknown[] = []> = string extends S
  ? readonly string[]
  : S extends `${infer C}${infer R}`
    ? StringArgs<R, C extends '$' ? [...A, string] : A>
    : A;

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

/** untyped core of print/println: the original Print algorithm, byte for byte */
export function printf(format: string, args: readonly (number | string)[], newline: boolean) {
  return Effect.gen(function* () {
    const game = yield* Game;
    const crt = yield* Crt;
    let text = '';
    const ints: number[] = [];
    let k = 0;
    for (const ch of format) {
      if (ch === '$') text += String(args[k++]);
      else {
        if (ch === '#') ints.push(Number(args[k++] ?? 0));
        text += ch;
      }
    }
    // numbers for `#` that come from spliced strings (shop item descriptions)
    for (; k < args.length; k++) ints.push(Number(args[k]));
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
        crt.screen.textColor(WHITE);
        color = CrtColor(buf[i + 1] - 0x30 + 8);
        crt.screen.textColor(color);
        i += 2;
      }
      if (buf[i] === 0x23) {
        const v = nums[arg++] ?? '';
        emit(v);
        yield* write(v);
      } else if (len >= i) {
        emit(CP866[buf[i]]);
        crt.screen.putByte(buf[i]);
      }
    } while (len > i);
    yield* textColor(WHITE);
    if (newline) yield* writeLn;
    game.transcript.push({ text, args: ints, newline, segments });
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

/** the state of the running game (after the character was created or loaded) */
export const started = Effect.gen(function* () {
  return playing((yield* Game).st);
});

/**
 * `luck >= Random(n)`: the original compares Longints, but always calls Random first —
 * also when luck has overflowed into negative numbers.
 */
export function luckAtLeast(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    const r = yield* rnd(n);
    return st.player.stats.luck >= r;
  });
}

export interface IGame {
  readonly st: GameState;
  /** stack buffer of Print, keeps bytes of earlier (longer) strings like the original */
  readonly printBuf: Uint8Array;
  /** every Print/PrintLn so far — the structured view of the game's output */
  readonly transcript: PrintCall[];
}

export const Game = Context.Service<IGame>('Game');

export interface IDisk {
  /** Dos.FindFirst/FindNext over the game directory, in directory order */
  readonly list: (pattern: RegExp) => Effect.Effect<readonly SaveName[]>;
  readonly read: (name: SaveName) => Effect.Effect<Uint8Array | undefined>;
  readonly write: (name: SaveName, data: Uint8Array) => Effect.Effect<void>;
}

export const Disk = Context.Service<IDisk>('Disk');
