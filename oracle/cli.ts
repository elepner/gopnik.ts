/**
 * Run the original G.EXE headless.
 *   bun oracle/cli.ts [--seed N] [-v] key1 key2 ...
 * -v prints the screen after every key, otherwise only the final screen.
 */
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

import { Dos } from './dos.ts';

const ROOT = join(import.meta.dir, '..');

export const freshWorkdir = (name: string) => {
  const dir = join(ROOT, 'oracle/.work', name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(join(ROOT, 'original')))
    if (f.toUpperCase().endsWith('.SAV')) cpSync(join(ROOT, 'original', f), join(dir, f));
  return dir;
};

export const boot = (seed = 0, work = 'cli') =>
  new Dos({ exe: join(ROOT, 'original/g.exe'), workdir: freshWorkdir(work), seed }).run();

if (import.meta.main) {
  const args = process.argv.slice(2);
  const take = (flag: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args.splice(i, flag === '-v' || flag === '-r' ? 1 : 2) : undefined;
  };
  const seed = Number(take('--seed')?.[1] ?? 0);
  const verbose = take('-v') !== undefined;
  const showRand = take('-r') !== undefined;
  const dos = boot(seed);
  const show = (label: string) =>
    console.log(`\n=== ${label} ===\n${dos.screen().replace(/\n+$/, '')}`);
  if (verbose) show('boot');
  for (const k of args) {
    const before = dos.randLog.length;
    dos.send(k);
    if (verbose) show(`${k}  (rand +${dos.randLog.length - before})`);
    if (dos.exited) break;
  }
  if (!verbose) show('final');
  if (showRand)
    for (const r of dos.randLog)
      console.log(`Random(${r.n})=${r.result} @${r.caller.toString(16)}`);
  console.error(`steps=${dos.steps} rand=${dos.randLog.length} exited=${dos.exited}`);
}
