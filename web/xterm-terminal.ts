/**
 * The game's `Terminal` on xterm.js: 80×25 like the DOS screen, single keys for ReadKey, a line
 * editor for typed lines. Colours are the CRT's 16, set as xterm's palette (`VGA_THEME`).
 */
import type { ITheme, Terminal as Xterm } from '@xterm/xterm';
import { Effect } from 'effect';

import type { ITerminal } from '../src/game/terminal';
import { Cp866Byte } from '../src/tp/brands';
import { encodeCp866 } from '../src/tp/cp866';

/** `changed`: the screen changed or waits for a key */
export function xtermTerminal(term: Xterm, changed: () => void = () => {}): ITerminal {
  const keys = keyQueue(term);
  let sgr = sgrOf(7);
  /** the scan code ReadKey returns after #0 */
  let pendingScan: number | undefined;
  const write = (s: string) => {
    term.write(sgr + s);
    changed();
  };
  return {
    write: (s) => Effect.sync(() => write(s)),
    textColor: (color) =>
      Effect.sync(() => {
        sgr = sgrOf(color & 15);
      }),
    clrScr: Effect.sync(() => term.write('\x1b[2J\x1b[H')),
    readKey: Effect.suspend(() => {
      changed();
      if (pendingScan !== undefined) {
        const scan = pendingScan;
        pendingScan = undefined;
        return Effect.succeed(Cp866Byte(scan));
      }
      return Effect.map(keys.read, (key) => {
        const scan = SCANS[key];
        if (scan === undefined) return Cp866Byte(keyByte(key));
        pendingScan = scan;
        return Cp866Byte(0);
      });
    }),
    readLine: Effect.gen(function* () {
      changed();
      let line = '';
      for (;;) {
        const key = yield* keys.read;
        if (key === '\r') {
          write('\r\n');
          return line;
        }
        if (key === '\x7f' || key === '\b') {
          if (line.length > 0) {
            line = line.slice(0, -1);
            write('\b \b');
          }
        } else if (key.length === 1 && key >= ' ' && line.length < MAX_LINE) {
          line += key;
          write(key);
        }
      }
    }),
    keyPressed: Effect.sync(() => pendingScan !== undefined || keys.waiting()),
    delay: (ms) => Effect.promise(() => new Promise((r) => setTimeout(r, Math.min(ms, 300)))),
  };
}

/** CRT's input buffer holds 126 characters */
const MAX_LINE = 126;

/** arrows as BIOS scan codes */
const SCANS: Record<string, number> = {
  '\x1b[A': 0x48,
  '\x1b[B': 0x50,
  '\x1b[C': 0x4d,
  '\x1b[D': 0x4b,
};

function keyByte(key: string): number {
  if (key === '\r') return 13;
  if (key === '\x7f') return 8;
  return encodeCp866(key[0]!)[0]!;
}

/** keys typed into xterm, one escape sequence or character each */
function keyQueue(term: Xterm) {
  const queue: string[] = [];
  let waiter: (() => void) | undefined;
  term.onData((data) => {
    // an escape sequence (arrows, Delete, F-keys) is one key; typed or pasted text is a key a character
    queue.push(...(data.startsWith('\x1b') && data.length > 1 ? [data] : Array.from(data)));
    const w = waiter;
    waiter = undefined;
    w?.();
  });
  const read: Effect.Effect<string> = Effect.suspend(() =>
    queue.length > 0
      ? Effect.succeed(queue.shift()!)
      : Effect.andThen(
          Effect.callback<void>((resume) => {
            waiter = () => resume(Effect.void);
          }),
          read
        )
  );
  return { read, waiting: () => queue.length > 0 };
}

/** CRT colour → ANSI: the order differs (CRT 1 is blue, ANSI 1 red), bright ones are 90+ */
const ANSI = [0, 4, 2, 6, 1, 5, 3, 7];

function sgrOf(color: number): string {
  const base = ANSI[color & 7]!;
  return `\x1b[${color & 8 ? 90 + base : 30 + base}m`;
}

/** the 16-colour VGA palette, in ANSI order */
export const VGA_THEME: ITheme = {
  background: '#000000',
  foreground: '#aaaaaa',
  cursor: '#aaaaaa',
  black: '#000000',
  red: '#aa0000',
  green: '#00aa00',
  yellow: '#aa5500',
  blue: '#0000aa',
  magenta: '#aa00aa',
  cyan: '#00aaaa',
  white: '#aaaaaa',
  brightBlack: '#555555',
  brightRed: '#ff5555',
  brightGreen: '#55ff55',
  brightYellow: '#ffff55',
  brightBlue: '#5555ff',
  brightMagenta: '#ff55ff',
  brightCyan: '#55ffff',
  brightWhite: '#ffffff',
};
