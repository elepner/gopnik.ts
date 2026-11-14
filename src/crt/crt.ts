/**
 * The CRT unit as Effect services: screen output plus keyboard input with
 * Turbo Pascal 7 semantics (ReadKey extended-key protocol, CrtRead line editor).
 */
import { Context, Data, Effect } from 'effect';

import { decodeCp866 } from '../tp/cp866.ts';
import { Screen } from './screen.ts';

/**
 * CRT's text-file input routine (CrtRead) followed by Read(s)+ReadLn:
 * line editing with BS/^S (erase char), Esc/^A (erase line), ^D/^F (recall
 * from the previous line), Enter. Returns the typed line.
 */
export const readLine = Effect.gen(function* () {
  const crt = yield* Crt;
  const buf = crt.lineBuf;
  const max = buf.length - 2;
  let prev = crt.prevLineEnd;
  let n = 0;
  const echo = (b: number) => crt.screen.putByte(b);
  for (;;) {
    const ch = yield* readKey;
    switch (ch) {
      case 0x08:
      case 0x13:
      case 0x1b:
      case 0x01: {
        // ^H/^S erase one char, Esc/^A erase everything
        let count = ch === 0x08 || ch === 0x13 ? 1 : 0x10000;
        while (count-- > 0 && n > 0) {
          echo(8);
          echo(0x20);
          echo(8);
          n--;
        }
        continue;
      }
      case 0x04:
      case 0x06: {
        // ^D recalls one char, ^F the rest of the previous line
        let count = ch === 0x04 ? 1 : 0x10000;
        while (count-- > 0 && n !== prev && buf[n] >= 0x20) echo(buf[n++]);
        continue;
      }
      case 0x1a:
        continue; // ^Z: CheckEOF is off
      case 0x0d:
        echo(13);
        echo(10);
        buf[n] = 13;
        buf[n + 1] = 10;
        crt.prevLineEnd = n + 2;
        return decodeCp866(buf.subarray(0, n));
    }
    if (ch < 0x20 || n === max) continue;
    buf[n++] = ch;
    echo(ch);
    if (n > prev) prev = n;
  }
});

/** CRT.ReadKey: returns a cp866 byte; extended keys come as #0 followed by the scan code */
export const readKey = Effect.gen(function* () {
  const crt = yield* Crt;
  if (crt.pendingScan) {
    const scan = crt.pendingScan;
    crt.pendingScan = 0;
    return scan;
  }
  const key = yield* (yield* Keyboard).read;
  if (key.ascii === 0) crt.pendingScan = key.scan;
  return key.ascii;
});

export const keyPressed = Effect.gen(function* () {
  const crt = yield* Crt;
  if (crt.pendingScan) return true;
  return yield* (yield* Keyboard).peek;
});

export function write(s: string) {
  return Effect.gen(function* () {
    (yield* Crt).screen.write(s);
  });
}

export const writeLn = write('\r\n');

export function textColor(color: number) {
  return Effect.gen(function* () {
    (yield* Crt).screen.textColor(color);
  });
}

export const clrScr = Effect.gen(function* () {
  (yield* Crt).screen.clrScr();
});

export function delay(ms: number) {
  return Effect.gen(function* () {
    yield* (yield* Keyboard).delay(ms);
  });
}

export interface ICrt {
  readonly screen: Screen;
  /** CRT's pending scan code after ReadKey returned #0 */
  pendingScan: number;
  /** Input TextRec buffer (128 bytes); the previous line stays there for ^D/^F recall */
  readonly lineBuf: Uint8Array;
  prevLineEnd: number;
}

export const Crt = Context.Service<ICrt>('Crt');

export function makeCrt(): ICrt {
  return { screen: new Screen(), pendingScan: 0, lineBuf: new Uint8Array(128), prevLineEnd: 0 };
}

/** a BIOS keystroke: cp866 byte and scan code; ascii 0 = extended key */
export interface Key {
  readonly ascii: number;
  readonly scan: number;
}

export interface IKeyboard {
  /** INT 16h AH=0 — blocks until a key is available */
  readonly read: Effect.Effect<Key, EndOfInput>;
  /** INT 16h AH=1 */
  readonly peek: Effect.Effect<boolean>;
  readonly delay: (ms: number) => Effect.Effect<void>;
}

export const Keyboard = Context.Service<IKeyboard>('Keyboard');

/** scripted input ran out (tests / replays) */
export class EndOfInput extends Data.TaggedError('EndOfInput')<{}> {}

/** System.Halt */
export class Halt extends Data.TaggedError('Halt')<{ readonly code: number }> {}
