/** Play the port in a terminal: `bun run play [--seed N] [--dir path]` */
import chalk from 'chalk';
import { Effect } from 'effect';

import { biosKey, type IKeyboard, type Key, makeCrt } from './crt/crt';
import { COLS, ROWS } from './crt/screen';
import { dirDisk } from './dir-disk';
import type { EndOfInput } from './game/terminal';
import { gameLayer, program } from './runtime';
import { Seed } from './tp/brands';
import { CP866, encodeCp866 } from './tp/cp866';

export async function play(seed: Seed, dir: string) {
  const crt = makeCrt();
  const keyboard = terminalKeyboard();
  const render = Effect.sync(() =>
    process.stdout.write(renderScreen(crt.screen.cells, crt.screen.row, crt.screen.col))
  );
  const kb: IKeyboard = { ...keyboard, read: Effect.andThen(render, keyboard.read) };
  await Effect.runPromiseExit(
    program.pipe(Effect.provide(gameLayer({ seed, disk: dirDisk(dir), keyboard: kb, crt })))
  );
  process.stdin.setRawMode?.(false);
  process.stdout.write('\x1b[0m\x1b[2J\x1b[H');
  process.exit(0);
}

/** 16-colour VGA palette */
const PALETTE = [
  '#000000',
  '#0000aa',
  '#00aa00',
  '#00aaaa',
  '#aa0000',
  '#aa00aa',
  '#aa5500',
  '#aaaaaa',
  '#555555',
  '#5555ff',
  '#55ff55',
  '#55ffff',
  '#ff5555',
  '#ff55ff',
  '#ffff55',
  '#ffffff',
];

function renderScreen(cells: Uint8Array, row: number, col: number): string {
  let out = '\x1b[?25l\x1b[H';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = (r * COLS + c) * 2;
      const attr = cells[i + 1];
      const ch = CP866[cells[i]];
      out += chalk.bgHex(PALETTE[(attr >> 4) & 7]).hex(PALETTE[attr & 15])(ch);
    }
    out += '\x1b[0m\x1b[K\n';
  }
  return out + `\x1b[${row + 1};${col + 1}H\x1b[?25h`;
}

const SCANS: Record<string, Key> = {
  '\x1b[A': biosKey(0x4800),
  '\x1b[B': biosKey(0x5000),
  '\x1b[C': biosKey(0x4d00),
  '\x1b[D': biosKey(0x4b00),
};

function terminalKeyboard(): IKeyboard {
  const queue: Key[] = [];
  let waiter: ((k: Key) => void) | undefined;
  process.stdin.setRawMode?.(true);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (data: string) => {
    if (data === '\x03') {
      process.stdout.write('\x1b[0m\n');
      process.exit(0);
    }
    const keys: Key[] = SCANS[data]
      ? [SCANS[data]]
      : [...data].map((ch) => {
          if (ch === '\x7f') return biosKey(0x0e08);
          if (ch === '\r' || ch === '\n') return biosKey(0x1c0d);
          return biosKey(encodeCp866(ch)[0]);
        });
    for (const k of keys) {
      if (waiter) {
        const w = waiter;
        waiter = undefined;
        w(k);
      } else queue.push(k);
    }
  });
  return {
    read: Effect.callback<Key, EndOfInput>((resume) => {
      const k = queue.shift();
      if (k) return resume(Effect.succeed(k));
      waiter = (key) => resume(Effect.succeed(key));
    }),
    peek: Effect.sync(() => queue.length > 0),
    delay: (ms) => Effect.promise(() => new Promise((r) => setTimeout(r, Math.min(ms, 300)))),
  };
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const opt = (name: string, def: string) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : def;
  };
  process.stdout.write('\x1b[2J');
  await play(Seed(Number(opt('--seed', String(Date.now() >>> 0)))), opt('--dir', 'saves'));
}
