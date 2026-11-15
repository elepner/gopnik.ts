/**
 * What the game needs of a screen and a keyboard. The game only talks to `Terminal`: the CRT
 * emulation provides it for the faithful 80×25 screen (`src/crt/terminal.ts`), a plain console
 * for text in, text out (`src/console.ts`).
 */
import { Context, Data, Effect } from 'effect';

import { type Cp866Byte, CrtColor } from '../tp/brands';

export interface ITerminal {
  /** writes the text in the current colour (`\r\n` ends a line) */
  readonly write: (s: string) => Effect.Effect<void>;
  readonly textColor: (color: CrtColor) => Effect.Effect<void>;
  readonly clrScr: Effect.Effect<void>;
  /** CRT.ReadKey: a cp866 byte; extended keys come as #0 followed by the scan code */
  readonly readKey: Effect.Effect<Cp866Byte, EndOfInput>;
  /** a typed line */
  readonly readLine: Effect.Effect<string, EndOfInput>;
  readonly keyPressed: Effect.Effect<boolean>;
  readonly delay: (ms: number) => Effect.Effect<void>;
}

export const Terminal = Context.Service<ITerminal>('Terminal');

export function write(s: string) {
  return Terminal.use((t) => t.write(s));
}

export const writeLn = write('\r\n');

export function textColor(color: CrtColor) {
  return Terminal.use((t) => t.textColor(color));
}

export const clrScr = Terminal.use((t) => t.clrScr);

export const readKey = Terminal.use((t) => t.readKey);

export const readLine = Terminal.use((t) => t.readLine);

export const keyPressed = Terminal.use((t) => t.keyPressed);

export function delay(ms: number) {
  return Terminal.use((t) => t.delay(ms));
}

export const WHITE = CrtColor(15);
export const BLACK = CrtColor(0);

/** the input ran out (scripted keys, a closed stdin) */
export class EndOfInput extends Data.TaggedError('EndOfInput')<{}> {}

/** System.Halt */
export class Halt extends Data.TaggedError('Halt')<{ readonly code: number }> {}
