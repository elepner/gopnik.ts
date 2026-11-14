/** bun test/compare.ts [--seed N] [--saves dir] key1 key2 ... — report the first divergence */
import { compare, expandKeys, screenText } from './harness';

const args = process.argv.slice(2);
const take = (flag: string) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};
const seed = Number(take('--seed') ?? 0);
const saves = take('--saves');
const keys = expandKeys(args);
const { original, port, divergence } = await compare(seed, keys, saves);
console.log(
  `steps: original ${original.snaps.length}, port ${port.snaps.length}; random: ${original.rand.length} vs ${port.rand.length}; prints: ${original.prints.length} vs ${port.prints.length}`
);
if (!divergence) console.log('IDENTICAL');
else {
  console.log(
    `DIVERGED at step ${divergence.step} (after key ${JSON.stringify(divergence.key)}): ${divergence.what}`
  );
  if (divergence.what === 'screen') {
    const a = divergence.original.split('\n');
    const b = divergence.port.split('\n');
    for (let i = 0; i < 25; i++)
      if (a[i] !== b[i]) console.log(`row ${i}\n  O: ${a[i]}\n  P: ${b[i]}`);
  } else console.log(`  original: ${divergence.original}\n  port:     ${divergence.port}`);
  void screenText;
}
