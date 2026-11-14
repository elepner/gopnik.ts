import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Recursive-descent disassembler for G.EXE with Turbo Pascal-aware annotations.
 *   bun oracle/disasm.ts > analysis/g.asm
 * Produces one block per procedure; inline Pascal string constants are decoded,
 * calls into the runtime are named, globals are shown as gXXXX.
 */
import { Capstone, Const, loadCapstone } from 'capstone-wasm';

import { decodeCp866 } from '../src/tp/cp866';

await loadCapstone();

const ROOT = join(import.meta.dir, '..');
const file = readFileSync(join(ROOT, 'original/g.exe'));
const u16 = (b: Uint8Array, o: number) => b[o] | (b[o + 1] << 8);
const hdr = u16(file, 8) * 16;
export const img = new Uint8Array(file.subarray(hdr));
const entry = { cs: u16(file, 0x16), ip: u16(file, 0x14) };

/** relocation sites (image offsets of segment words) */
const relocs = new Set<number>();
for (let i = 0; i < u16(file, 6); i++) {
  const o = u16(file, 0x18) + i * 4;
  relocs.add(u16(file, o + 2) * 16 + u16(file, o));
}

export const SEGMENTS: Record<number, string> = {
  0x0000: 'MAIN',
  0x0ee5: 'U1',
  0x0eed: 'U2',
  0x0f16: 'CRT',
  0x0f78: 'SYS',
  0x10ae: 'DATA',
};

/** names of runtime routines, filled in as they get identified (seg:off) */
export const NAMES: Record<string, string> = {
  '0f78:0000': 'SysInit',
  '0f78:0116': 'Halt',
  '0f78:028a': 'IOResult',
  '0f78:0291': 'IOCheck',
  '0f78:02cd': 'StackCheck',
  '0f78:0364': 'ResetText',
  '0f78:0369': 'RewriteText',
  '0f78:059d': 'ReadLnEnd',
  '0f78:05dd': 'WriteLnEnd',
  '0f78:05fe': 'WriteEnd',
  '0f78:067b': 'WriteChar',
  '0f78:06c6': 'ReadStr',
  '0f78:0701': 'WriteStr',
  '0f78:072e': 'Assign',
  '0f78:0769': 'Reset',
  '0f78:0772': 'Rewrite',
  '0f78:07ea': 'Close',
  '0f78:081e': 'ReadRec',
  '0f78:0825': 'WriteRec',
  '0f78:08ec': 'GetDir',
  '0f78:09d2': 'LongMul',
  '0f78:0a0f': 'LongDiv',
  '0f78:0ae7': 'StrLoad',
  '0f78:0b01': 'StrStore',
  '0f78:0b66': 'StrConcat',
  '0f78:0bd8': 'StrCmp',
  '0f78:0c03': 'CharToStr',
  '0f78:10ff': 'RAdd',
  '0f78:1105': 'RSub',
  '0f78:1111': 'RMul',
  '0f78:1117': 'RDiv',
  '0f78:1121': 'RCmp',
  '0f78:1125': 'RFloat',
  '0f78:1131': 'RRound',
  '0f78:114b': 'Random',
  '0f78:11e0': 'Randomize',
  '0f78:12d0': 'StrLong',
  '0f78:131b': 'ValLong',
  '0f16:000d': 'CrtInit',
  '0f16:01cc': 'ClrScr',
  '0f16:0263': 'TextColor',
  '0f16:02a8': 'Delay',
  '0f16:0308': 'KeyPressed',
  '0f16:031a': 'ReadKey',
  '0ee5:0000': 'FindFirst',
  '0ee5:003e': 'FindNext',
  '0eed:0000': 'Print',
  '0eed:01c2': 'PrintLn',
  '0eed:0216': 'LowerCase',
};

const cs = new Capstone(Const.CS_ARCH_X86, Const.CS_MODE_16);

export type Insn = { addr: number; size: number; mnemonic: string; op: string; bytes: Uint8Array };
export const insns = new Map<number, Insn>();
export const procs = new Map<number, Set<string>>(); // linear addr -> callers
export const labels = new Set<number>();

const decodeAt = (a: number): Insn | undefined => {
  let i;
  try {
    [i] = cs.disasm(img.subarray(a, a + 16), { address: a, count: 1 });
  } catch {
    return undefined;
  }
  return i && { addr: a, size: i.size, mnemonic: i.mnemonic, op: i.opStr, bytes: i.bytes };
};

export const segOf = (a: number) =>
  Math.max(
    ...Object.keys(SEGMENTS)
      .map(Number)
      .filter((s) => s * 16 <= a)
  );

const explore = (start: number) => {
  const todo = [start];
  while (todo.length) {
    let a = todo.pop()!;
    while (!insns.has(a) && a < img.length) {
      const i = decodeAt(a);
      if (!i) break;
      insns.set(a, i);
      const seg = segOf(a);
      const m = i.mnemonic;
      const imm = /^0x[0-9a-f]+$/.test(i.op) ? parseInt(i.op, 16) : undefined;
      if (m === 'lcall' && i.bytes[0] === 0x9a) {
        const off = u16(i.bytes, 1),
          sg = u16(i.bytes, 3);
        const t = sg * 16 + off;
        if (!procs.has(t)) procs.set(t, new Set());
        procs.get(t)!.add(hex(a));
        todo.push(t);
      } else if (m === 'call' && imm !== undefined) {
        const t = seg * 16 + ((imm - seg * 16) & 0xffff);
        if (!procs.has(t)) procs.set(t, new Set());
        procs.get(t)!.add(hex(a));
        todo.push(t);
      } else if (m.startsWith('j') || m.startsWith('loop')) {
        if (imm !== undefined && m !== 'ljmp') {
          const t = seg * 16 + ((imm - seg * 16) & 0xffff);
          labels.add(t);
          todo.push(t);
        }
        if (m === 'ljmp' && i.bytes[0] === 0xea) todo.push(u16(i.bytes, 3) * 16 + u16(i.bytes, 1));
        if (m === 'jmp' || m === 'ljmp') break;
      }
      if (m === 'ret' || m === 'retf' || m === 'iret' || m === 'hlt') break;
      a += i.size;
    }
  }
};

export const hex = (n: number, w = 5) => n.toString(16).padStart(w, '0');
export const segoff = (a: number) => {
  const s = segOf(a);
  return `${hex(s, 4)}:${hex(a - s * 16, 4)}`;
};

/** Pascal string at linear address, if plausible */
export const pstr = (a: number): string | undefined => {
  const n = img[a];
  if (n === undefined || a + n >= img.length) return undefined;
  const bytes = img.subarray(a + 1, a + 1 + n);
  if ([...bytes].some((b) => b < 0x20 && b !== 0x0d && b !== 0x0a)) return n === 0 ? '' : undefined;
  return decodeCp866(bytes);
};

procs.set(entry.cs * 16 + entry.ip, new Set(['ENTRY']));
explore(entry.cs * 16 + entry.ip);
export const ENTRY = entry.cs * 16 + entry.ip;

if (import.meta.main) {
  const sorted = [...insns.keys()].sort((a, b) => a - b);
  const out: string[] = [];
  let lastEnd = -1;
  for (const a of sorted) {
    const i = insns.get(a)!;
    if (lastEnd >= 0 && a > lastEnd) {
      // gap = inline data (usually Pascal string constants)
      const gap = img.subarray(lastEnd, a);
      out.push(`; ---- data ${segoff(lastEnd)} (${gap.length} bytes)`);
      let p = lastEnd;
      while (p < a) {
        const s = pstr(p);
        if (s !== undefined && p + 1 + img[p] <= a) {
          out.push(`;   ${segoff(p)} str ${JSON.stringify(s)}`);
          p += 1 + img[p];
        } else {
          out.push(`;   ${segoff(p)} db ${hex(img[p], 2)}`);
          p++;
        }
      }
    }
    if (procs.has(a)) {
      const nm = NAMES[segoff(a)];
      out.push(
        '',
        `;================ proc ${segoff(a)}${nm ? ' ' + nm : ''}  callers: ${[...procs.get(a)!].slice(0, 8).join(' ')}${procs.get(a)!.size > 8 ? ' …' + procs.get(a)!.size : ''}`
      );
    }
    if (labels.has(a)) out.push(`L${hex(a)}:`);
    let op = i.op;
    let note = '';
    const s = segOf(a);
    if (i.mnemonic === 'lcall' && i.bytes[0] === 0x9a) {
      const t = u16(i.bytes, 3) * 16 + u16(i.bytes, 1);
      const nm = NAMES[segoff(t)];
      op = `${SEGMENTS[u16(i.bytes, 3)] ?? '?'}:${segoff(t)}${nm ? ' ' + nm : ''}`;
    } else if (i.mnemonic === 'call' && /^0x/.test(op)) {
      const nm = NAMES[segoff(s * 16 + ((parseInt(op, 16) - s * 16) & 0xffff))];
      if (nm) note = nm;
    }
    // mov di, imm ; push cs ; push di  => string constant in this code segment
    if (i.bytes[0] === 0xbf && img[a + 3] === 0x0e && img[a + 4] === 0x57) {
      const str = pstr(s * 16 + u16(i.bytes, 1));
      if (str !== undefined) note = `"${str}"`;
    }
    op = op.replace(/\[0x([0-9a-f]+)\]/g, (_, h) => `[g${h.padStart(4, '0')}]`);
    out.push(`  ${segoff(a)}  ${i.mnemonic.padEnd(6)} ${op}${note ? '    ; ' + note : ''}`);
    lastEnd = a + i.size;
  }
  console.log(out.join('\n'));
  console.error(`procs=${procs.size} insns=${insns.size}`);
}
