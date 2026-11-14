/**
 * Replay a key log on the original (emulated, same seed) and on the port.
 *   bun test/replay.ts logs/bot-s4-2.keys [--screens] [--every N]
 * Log format: one key per line (`enter`, `space`, single characters), `#` lines are comments;
 * the first comment line carries `seed N save S`.
 */
import { join } from 'node:path';

import { compare, runOriginal, screenText, workdirFor } from './harness';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'))!;
const showScreens = args.includes('--screens');
const every = Number(args[args.indexOf('--every') + 1] || 1);

const lines = (await Bun.file(file).text()).split('\n');
const header = lines[0].match(/seed (\d+) save (\S+)/);
const seed = Number(header?.[1] ?? 0);
const keys = lines.filter((l) => l && !l.startsWith('#'));
const saves = join(import.meta.dirname, '..', 'original');

if (showScreens) {
  const run = runOriginal(seed, keys, workdirFor('replay', saves));
  run.snaps.forEach((s, i) => {
    if (i % every === 0 || i === run.snaps.length - 1)
      console.log(
        `=== original, step ${i} (after ${JSON.stringify(keys[i - 1])})\n${screenText(s.cells)}`
      );
  });
}
const { original, port, divergence } = await compare(seed, keys, saves);
console.log(
  `${file}: seed ${seed}, ${keys.length} keys; original ${original.snaps.length} reads, ` +
    `${original.rand.length} randoms, ${original.prints.length} prints; ` +
    (divergence ? `port DIVERGED: ${divergence.what} at step ${divergence.step}` : 'port identical')
);
if (divergence) console.log(`original:\n${divergence.original}\nport:\n${divergence.port}`);
void port;
