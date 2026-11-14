/**
 * Random play-throughs compared against the original.
 *   bun test/fuzz.ts [--from 1] [--count 20] [--len 400] [--saves dir]
 */
import { compare, expandKeys, scenario } from './harness';

const args = process.argv.slice(2);
const opt = (name: string, def: number) => {
  const i = args.indexOf(name);
  return i >= 0 ? Number(args[i + 1]) : def;
};
const savesIdx = args.indexOf('--saves');
const saves = savesIdx >= 0 ? args[savesIdx + 1] : undefined;
const from = opt('--from', 1);
const count = opt('--count', 20);
const len = opt('--len', 400);

let failures = 0;
for (let seed = from; seed < from + count; seed++) {
  const tokens = scenario(seed, len, !!saves);
  const keys = expandKeys(tokens);
  const { original, divergence } = await compare(seed, keys, saves);
  if (!divergence) {
    console.log(
      `seed ${seed}: ok (${original.snaps.length} reads, ${original.rand.length} randoms)`
    );
    continue;
  }
  failures++;
  console.log(
    `seed ${seed}: DIVERGED at step ${divergence.step} key ${JSON.stringify(divergence.key)}: ${divergence.what}`
  );
  const recent = keys.slice(Math.max(0, divergence.step - 40), divergence.step).join(' ');
  console.log(`  recent keys: ${recent}`);
  if (divergence.what === 'screen') {
    const a = divergence.original.split('\n');
    const b = divergence.port.split('\n');
    for (let i = 0; i < 25; i++)
      if (a[i] !== b[i]) console.log(`  row ${i}\n    O: ${a[i]}\n    P: ${b[i]}`);
  } else console.log(`  original: ${divergence.original}\n  port:     ${divergence.port}`);
}
console.log(failures ? `${failures} of ${count} diverged` : `all ${count} identical`);
process.exit(failures ? 1 : 0);
