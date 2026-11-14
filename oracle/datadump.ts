/** Dump the initialized data segment of G.EXE (typed constants). bun oracle/datadump.ts */
import { img, pstr, hex } from './disasm.ts';
const DS = 0x10ae * 16;
const size = img.length - DS;
console.log(`DS init size = 0x${size.toString(16)}`);
let a = 0;
while (a < size) {
  const s = pstr(DS + a);
  if (s && s.length >= 2 && /[А-яЁё\w]/.test(s)) {
    console.log(`${hex(a, 4)}: str[${img[DS + a]}] ${JSON.stringify(s)}`);
    a += 1 + img[DS + a];
    continue;
  }
  const row = [...img.subarray(DS + a, DS + a + 16)];
  if (row.some((b) => b)) console.log(`${hex(a, 4)}: ${row.map((b) => hex(b, 2)).join(' ')}`);
  a += 16 - (a % 16);
}
