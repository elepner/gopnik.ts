/**
 * Play in a plain console: `bun run console [--seed N] [--dir path]`. Text scrolls, every input
 * is a line: commands and names as typed, a key is the first character of a line (Enter alone
 * for "press any key"). Works with piped input too: `bun run console < keys.txt`.
 */
import { createInterface } from 'node:readline';

import chalk, { type ChalkInstance } from 'chalk';
import { Effect } from 'effect';

import { dirSaves } from './dir-saves';
import { EndOfInput, type ITerminal } from './game/terminal';
import { gameLayer, program } from './runtime';
import { Cp866Byte, Seed } from './tp/brands';
import { encodeCp866 } from './tp/cp866';

export async function playInConsole(seed: Seed, dir: string) {
  await Effect.runPromiseExit(
    program.pipe(
      Effect.provide(gameLayer({ seed, saves: dirSaves(dir), terminal: consoleTerminal() }))
    )
  );
  process.stdout.write('\n');
  process.exit(0);
}

/** CRT colours 0..15 as the console's 16 colours */
const COLORS: readonly ChalkInstance[] = [
  chalk.black,
  chalk.blue,
  chalk.green,
  chalk.cyan,
  chalk.red,
  chalk.magenta,
  chalk.yellow,
  chalk.white,
  chalk.gray,
  chalk.blueBright,
  chalk.greenBright,
  chalk.cyanBright,
  chalk.redBright,
  chalk.magentaBright,
  chalk.yellowBright,
  chalk.whiteBright,
];

function consoleTerminal(): ITerminal {
  const lines = lineReader();
  let color = COLORS[7]!;
  return {
    write: (s) => Effect.sync(() => process.stdout.write(color(s.replaceAll('\r', '')))),
    textColor: (c) =>
      Effect.sync(() => {
        color = COLORS[c & 15]!;
      }),
    // the text scrolls on: a blank line instead of a clear screen
    clrScr: Effect.sync(() => process.stdout.write('\n')),
    readKey: Effect.map(lines.read, (line) => Cp866Byte(line ? encodeCp866(line[0]!)[0]! : 13)),
    readLine: lines.read,
    keyPressed: Effect.sync(() => lines.waiting()),
    delay: (ms) => Effect.promise(() => new Promise((r) => setTimeout(r, Math.min(ms, 1000)))),
  };
}

/** stdin as lines; a closed stdin ends the input */
function lineReader() {
  const queue: string[] = [];
  let closed = false;
  let waiter: (() => void) | undefined;
  const wake = () => {
    const w = waiter;
    waiter = undefined;
    w?.();
  };
  const rl = createInterface({ input: process.stdin, terminal: false });
  rl.on('line', (line) => {
    queue.push(line);
    wake();
  });
  rl.on('close', () => {
    closed = true;
    wake();
  });
  const read: Effect.Effect<string, EndOfInput> = Effect.suspend(() => {
    if (queue.length > 0) return Effect.sync(() => echo(queue.shift()!));
    if (closed) return Effect.fail(new EndOfInput());
    return Effect.andThen(
      Effect.callback<void>((resume) => {
        waiter = () => resume(Effect.void);
      }),
      read
    );
  });
  return { read, waiting: () => queue.length > 0 };
}

/** the console echoes what is typed; piped input it doesn't, so show it as it is read */
function echo(line: string) {
  if (!process.stdin.isTTY) process.stdout.write(line + '\n');
  return line;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const opt = (name: string, def: string) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1]! : def;
  };
  await playInConsole(Seed(Number(opt('--seed', String(Date.now() >>> 0)))), opt('--dir', 'saves'));
}
