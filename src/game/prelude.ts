/**
 * Shared building blocks of the port: game services and the custom print unit
 * of the original (segment 0EED: Print/PrintLn/LowerCase).
 */
import { Context, Effect } from 'effect';

import { Crt, Halt, textColor, write, writeLn } from '../crt/crt.ts';
import type { Memory, State } from '../state/layout.ts';
import { encodeCp866 } from '../tp/cp866.ts';
import { i16, str } from '../tp/num.ts';
import { Rng } from '../tp/rng.ts';

/**
 * 0EED:0000 Print(s, a1..a5): `^0`..`^7` switch the colour to 8..15, every `#` prints the
 * next integer argument. Colour is reset to white before and after.
 */
export function print(s: string, ...args: number[]) {
  return Effect.gen(function* () {
    const game = yield* Game;
    const crt = yield* Crt;
    // the original copies s into a 256-byte stack buffer and may read past its end
    const buf = game.printBuf;
    const bytes = encodeCp866(s);
    const len = bytes.length;
    buf[0] = len;
    buf.set(bytes, 1);
    const nums = [0, 1, 2, 3, 4].map((k) => str(i16(args[k] ?? 0)));
    yield* textColor(15);
    let i = 0;
    let arg = 0;
    do {
      i++;
      while (buf[i] === 0x5e && len > i && buf[i + 1] >= 0x30 && buf[i + 1] <= 0x37) {
        crt.screen.textColor(15);
        crt.screen.textColor(buf[i + 1] - 0x30 + 8);
        i += 2;
      }
      if (buf[i] === 0x23) yield* write(nums[arg++] ?? '');
      else if (len >= i) crt.screen.putByte(buf[i]);
    } while (len > i);
    yield* textColor(15);
  });
}

/** 0EED:01C2 PrintLn */
export function println(s: string, ...args: number[]) {
  return Effect.andThen(print(s, ...args), writeLn);
}

/** 0EED:0216 LowerCase — ASCII A..Z only */
export function lowerCase(s: string): string {
  return s.replace(/[A-Z]/g, (c) => c.toLowerCase());
}

export function rnd(n: number) {
  return Rng.use((rng) => rng.next(n));
}

export const halt = Effect.fail(new Halt({ code: 0 }));

export interface IGame {
  readonly st: State;
  readonly mem: Memory;
  /** stack buffer of Print, keeps bytes of earlier (longer) strings like the original */
  readonly printBuf: Uint8Array;
}

export const Game = Context.Service<IGame>('Game');

export interface IDisk {
  /** Dos.FindFirst/FindNext over the game directory, in directory order */
  readonly list: (pattern: RegExp) => Effect.Effect<readonly string[]>;
  readonly read: (name: string) => Effect.Effect<Uint8Array | undefined>;
  readonly write: (name: string, data: Uint8Array) => Effect.Effect<void>;
}

export const Disk = Context.Service<IDisk>('Disk');
