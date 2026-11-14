/**
 * Minimal headless DOS + BIOS around the 8086 core, tailored for G.EXE (Turbo Pascal 7 + CRT).
 * Screen is read from B800 text memory, keys come from a scripted queue,
 * every System.Random call is logged, Randomize gets a configurable seed.
 */
import {
  closeSync,
  existsSync,
  openSync,
  readdirSync,
  readFileSync,
  readSync,
  unlinkSync,
  writeSync,
  ftruncateSync,
  fstatSync,
  statSync,
} from 'node:fs';
import { join } from 'node:path';

import { decodeCp866, encodeCp866 } from '../src/tp/cp866.ts';
import { AX, BX, CS, CX, Cpu, type CpuHost, DI, DS, DX, ES, SI, SP, SS } from './cpu.ts';

export const LOAD_SEG = 0x0200;
const PSP_SEG = LOAD_SEG - 0x10;
const STUB_SEG = 0xf000;
export const VIDEO = 0xb8000;
export const COLS = 80,
  ROWS = 25;

/** offsets inside the G.EXE load image (seg*16+off, before relocation) */
export const IMG = {
  random: 0x108cb,
  randomRet: 0x108e5,
  dataSeg: 0x10ae,
  randSeed: 0x367e, // DS offset
} as const;

const KEYS: Record<string, number> = {
  enter: 0x1c0d,
  esc: 0x011b,
  space: 0x3920,
  bs: 0x0e08,
  tab: 0x0f09,
  up: 0x4800,
  down: 0x5000,
  left: 0x4b00,
  right: 0x4d00,
  home: 0x4700,
  end: 0x4f00,
  pgup: 0x4900,
  pgdn: 0x5100,
  f1: 0x3b00,
  f2: 0x3c00,
  f3: 0x3d00,
  f10: 0x4400,
};
const SCAN: Record<string, number> = {};
for (const [base, row] of [
  [0x02, '1234567890-='],
  [0x10, 'qwertyuiop[]'],
  [0x1e, "asdfghjkl;'"],
  [0x2c, 'zxcvbnm,./'],
] as const)
  [...row].forEach((c, i) => {
    SCAN[c] = base + i;
  });

export const keyCode = (k: string): number => {
  const named = KEYS[k.toLowerCase()];
  if (named !== undefined) return named;
  if ([...k].length === 1) return ((SCAN[k.toLowerCase()] ?? 0) << 8) | encodeCp866(k)[0];
  throw new Error(`unknown key ${k}`);
};

export interface RandCall {
  n: number;
  caller: number; // image-relative address right after the far call
  seedBefore: number;
  result: number;
}

export interface DosOptions {
  exe: string;
  workdir: string;
  seed?: number;
  /** BIOS tick advances every N reads of 0040:006C (controls CRT Delay calibration) */
  ticksPerPoll?: number;
}

export class Dos implements CpuHost {
  readonly cpu = new Cpu(this);
  seed: number;
  keys: number[] = [];
  /** scripted runs: KeyPressed with an empty queue takes the next scripted key, if any */
  onPoll?: () => number | undefined;
  readonly randLog: RandCall[] = [];
  stdout = '';
  exited = false;
  exitCode = 0;
  waiting = false;
  steps = 0;
  private emptyPolls = 0;
  private tickReads = 0;
  private readonly ticksPerPoll: number;
  private readonly files = new Map<number, { fd: number; pos: number }>();
  private dta = 0;
  /** cursor of page 0 lives in the BIOS data area (0040:0050), CRT reads it from there */
  private get cursor() {
    return { row: this.cpu.mem[0x451], col: this.cpu.mem[0x450] };
  }
  private set cursor(c: { row: number; col: number }) {
    this.cpu.mem[0x451] = c.row;
    this.cpu.mem[0x450] = c.col;
  }
  private retrace = 0;

  constructor(private readonly opts: DosOptions) {
    this.seed = opts.seed ?? 0;
    this.ticksPerPoll = opts.ticksPerPoll ?? 64;
    this.load();
    const base = LOAD_SEG * 16;
    this.cpu.watchLo = 0x46c;
    this.cpu.watchHi = 0x46f;
    this.cpu.addBreakpoint(base + IMG.random, (c) => {
      const sp = c.lin(c.s[SS], c.r[SP]);
      const retIp = c.rd16(sp),
        retCs = c.rd16(sp + 2),
        n = c.rd16(sp + 4);
      this.randLog.push({
        n,
        caller: (retCs - LOAD_SEG) * 16 + retIp,
        seedBefore: this.randSeed,
        result: -1,
      });
    });
    this.cpu.addBreakpoint(base + IMG.randomRet, (c) => {
      this.randLog[this.randLog.length - 1].result = c.r[DX];
    });
  }

  get randSeed() {
    const a = (LOAD_SEG + IMG.dataSeg) * 16 + IMG.randSeed;
    const m = this.cpu.mem;
    return (m[a] | (m[a + 1] << 8) | (m[a + 2] << 16) | (m[a + 3] << 24)) >>> 0;
  }

  /** linear address of a variable in the program's data segment */
  dataAddr(off: number) {
    return (LOAD_SEG + IMG.dataSeg) * 16 + off;
  }

  // ------------------------------------------------------------------ loading
  private load() {
    const d = readFileSync(this.opts.exe);
    const u16 = (o: number) => d[o] | (d[o + 1] << 8);
    const [cblp, cp, crlc, cparhdr] = [u16(2), u16(4), u16(6), u16(8)];
    const [ss, sp, ip, cs, lfarlc] = [u16(0x0e), u16(0x10), u16(0x14), u16(0x16), u16(0x18)];
    const size = (cp - 1) * 512 + cblp - cparhdr * 16;
    const img = new Uint8Array(d.subarray(cparhdr * 16, cparhdr * 16 + size));
    for (let i = 0; i < crlc; i++) {
      const a = u16(lfarlc + i * 4 + 2) * 16 + u16(lfarlc + i * 4);
      const v = (img[a] | (img[a + 1] << 8)) + LOAD_SEG;
      img[a] = v;
      img[a + 1] = v >> 8;
    }
    const { mem, s, r } = this.cpu;
    mem.set(img, LOAD_SEG * 16);
    // PSP
    const psp = PSP_SEG * 16;
    mem[psp] = 0xcd;
    mem[psp + 1] = 0x20;
    mem[psp + 2] = 0x00;
    mem[psp + 3] = 0xa0;
    mem[psp + 0x80] = 0;
    mem[psp + 0x81] = 0x0d;
    // IVT -> F000:n stubs; stubs are IRETs but host services them before dispatch
    for (let i = 0; i < 256; i++) {
      mem[i * 4] = i;
      mem[i * 4 + 1] = 0;
      mem[i * 4 + 2] = 0x00;
      mem[i * 4 + 3] = 0xf0;
      mem[STUB_SEG * 16 + i] = 0xcf;
    }
    // BIOS data area
    const w16 = (a: number, v: number) => {
      mem[a] = v;
      mem[a + 1] = v >> 8;
    };
    w16(0x410, 0x0021);
    w16(0x413, 640);
    mem[0x449] = 3;
    w16(0x44a, COLS);
    w16(0x44c, 4096);
    w16(0x463, 0x3d4);
    mem[0x484] = ROWS - 1;
    w16(0x485, 16);
    for (let i = 0; i < COLS * ROWS; i++) {
      mem[VIDEO + i * 2] = 0x20;
      mem[VIDEO + i * 2 + 1] = 0x07;
    }
    s[DS] = PSP_SEG;
    s[ES] = PSP_SEG;
    s[SS] = LOAD_SEG + ss;
    r[SP] = sp;
    s[CS] = LOAD_SEG + cs;
    this.cpu.ip = ip;
  }

  // ------------------------------------------------------------------ CpuHost
  memRead(_addr: number) {
    if (++this.tickReads % this.ticksPerPoll === 0) {
      const m = this.cpu.mem;
      const t = ((m[0x46c] | (m[0x46d] << 8) | (m[0x46e] << 16) | (m[0x46f] << 24)) + 1) >>> 0;
      m[0x46c] = t;
      m[0x46d] = t >> 8;
      m[0x46e] = t >> 16;
      m[0x46f] = t >>> 24;
    }
  }

  portIn(_c: Cpu, port: number) {
    if (port === 0x3da) return (this.retrace ^= 0x09);
    return 0;
  }

  portOut() {}

  interrupt(c: Cpu, n: number): boolean {
    const ivOff = c.mem[n * 4] | (c.mem[n * 4 + 1] << 8);
    const ivSeg = c.mem[n * 4 + 2] | (c.mem[n * 4 + 3] << 8);
    if (ivSeg !== STUB_SEG || ivOff !== n) return false; // program-installed handler
    switch (n) {
      case 0x10:
        this.int10();
        break;
      case 0x11:
        c.r[AX] = 0x0021;
        break;
      case 0x12:
        c.r[AX] = 640;
        break;
      case 0x16:
        this.int16();
        break;
      case 0x1a:
        this.int1a();
        break;
      case 0x20:
        this.exited = true;
        c.stop = true;
        break;
      case 0x21:
        this.int21();
        break;
      case 0x1b:
      case 0x23:
      case 0x24:
      case 0x08:
      case 0x09:
      case 0x1c:
      case 0x05:
        break;
      default:
        if (n >= 0x34 && n <= 0x3e)
          throw new Error(`FPU emulator int ${n.toString(16)} not installed`);
        throw new Error(`unhandled int ${n.toString(16)} ax=${c.r[AX].toString(16)}`);
    }
    return true;
  }

  // ------------------------------------------------------------------ BIOS
  private int10() {
    const c = this.cpu,
      r = c.r,
      ah = r[AX] >> 8;
    switch (ah) {
      case 0x0f:
        r[AX] = (COLS << 8) | 3;
        r[BX] &= 0x00ff;
        break;
      case 0x02:
        this.cursor = { row: r[DX] >> 8, col: r[DX] & 0xff };
        break;
      case 0x03:
        r[DX] = (this.cursor.row << 8) | this.cursor.col;
        r[CX] = 0x0607;
        break;
      case 0x06:
      case 0x07:
        this.scroll(ah === 0x06);
        break;
      case 0x08: {
        const a = VIDEO + (this.cursor.row * COLS + this.cursor.col) * 2;
        r[AX] = (c.mem[a + 1] << 8) | c.mem[a];
        break;
      }
      case 0x09:
      case 0x0a: {
        const a = VIDEO + (this.cursor.row * COLS + this.cursor.col) * 2;
        for (let i = 0; i < r[CX]; i++) {
          c.mem[a + i * 2] = r[AX] & 0xff;
          if (ah === 0x09) c.mem[a + i * 2 + 1] = r[BX] & 0xff;
        }
        break;
      }
      case 0x0e:
        this.tty(r[AX] & 0xff);
        break;
      case 0x1a:
        r[AX] = 0x001a;
        r[BX] = 0x0008;
        break;
      case 0x12:
        r[BX] = 0x0003;
        r[CX] = 0x0009;
        break;
      case 0x00:
      case 0x01:
      case 0x05:
      case 0x10:
      case 0x11:
        break;
      default:
        throw new Error(`int10 ah=${ah.toString(16)}`);
    }
  }

  private scroll(up: boolean) {
    const { r, mem } = this.cpu;
    let n = r[AX] & 0xff;
    const attr = r[BX] >> 8;
    const r0 = r[CX] >> 8,
      c0 = r[CX] & 0xff;
    const r1 = Math.min(r[DX] >> 8, ROWS - 1),
      c1 = Math.min(r[DX] & 0xff, COLS - 1);
    const h = r1 - r0 + 1,
      w = (c1 - c0 + 1) * 2;
    if (n === 0 || n > h) n = h;
    const rows = Array.from({ length: h }, (_, i) =>
      mem.slice(VIDEO + ((r0 + i) * COLS + c0) * 2, VIDEO + ((r0 + i) * COLS + c0) * 2 + w)
    );
    const blank = new Uint8Array(w).map((_, i) => (i & 1 ? attr : 0x20));
    const out = up
      ? [...rows.slice(n), ...Array(n).fill(blank)]
      : [...Array(n).fill(blank), ...rows.slice(0, h - n)];
    out.forEach((row, i) => mem.set(row, VIDEO + ((r0 + i) * COLS + c0) * 2));
  }

  private tty(ch: number) {
    const mem = this.cpu.mem;
    let { row, col } = this.cursor;
    if (ch === 13) col = 0;
    else if (ch === 10) row++;
    else if (ch === 8) col = Math.max(0, col - 1);
    else if (ch !== 7) {
      mem[VIDEO + (row * COLS + col) * 2] = ch;
      if (++col >= COLS) {
        col = 0;
        row++;
      }
    }
    if (row >= ROWS) {
      mem.copyWithin(VIDEO, VIDEO + COLS * 2, VIDEO + COLS * ROWS * 2);
      for (let i = 0; i < COLS; i++) {
        mem[VIDEO + ((ROWS - 1) * COLS + i) * 2] = 0x20;
        mem[VIDEO + ((ROWS - 1) * COLS + i) * 2 + 1] = 7;
      }
      row = ROWS - 1;
    }
    this.cursor = { row, col };
  }

  private int16() {
    const c = this.cpu,
      ah = c.r[AX] >> 8;
    switch (ah) {
      case 0x00:
      case 0x10:
        if (this.keys.length === 0) {
          this.block();
          return;
        }
        c.r[AX] = this.keys.shift()!;
        this.emptyPolls = 0;
        break;
      case 0x01:
      case 0x11:
        if (!this.keys.length && this.onPoll) {
          const k = this.onPoll();
          if (k !== undefined) this.keys.push(k);
        }
        if (this.keys.length) {
          c.r[AX] = this.keys[0];
          c.zf = false;
          this.emptyPolls = 0;
        } else {
          c.zf = true;
          if (++this.emptyPolls > 5000) {
            this.emptyPolls = 0;
            this.waiting = true;
            c.stop = true;
          }
        }
        break;
      case 0x02:
      case 0x12:
        c.r[AX] &= 0xff00;
        break;
      default:
        throw new Error(`int16 ah=${ah.toString(16)}`);
    }
  }

  /** blocking read with an empty queue: re-execute the INT later */
  private block() {
    this.cpu.rewind();
    this.waiting = true;
    this.cpu.stop = true;
  }

  private int1a() {
    const { r, mem } = this.cpu;
    if (r[AX] >> 8 === 0) {
      r[CX] = mem[0x46e] | (mem[0x46f] << 8);
      r[DX] = mem[0x46c] | (mem[0x46d] << 8);
      r[AX] &= 0xff00;
    }
  }

  // ------------------------------------------------------------------ DOS
  private asciiz(seg: number, off: number) {
    const bytes: number[] = [];
    for (let b; (b = this.cpu.rdB(seg, off + bytes.length)) !== 0;) bytes.push(b);
    return decodeCp866(Uint8Array.from(bytes));
  }

  private hostPath(name: string) {
    const base = name.replace(/\\/g, '/').split('/').pop()!.split(':').pop()!.toUpperCase();
    const hit = readdirSync(this.opts.workdir).find((f) => f.toUpperCase() === base);
    return join(this.opts.workdir, hit ?? base);
  }

  private int21() {
    const c = this.cpu,
      r = c.r,
      s = c.s;
    const ah = r[AX] >> 8,
      al = r[AX] & 0xff;
    let ok = true;
    const fail = (code: number) => {
      ok = false;
      r[AX] = code;
    };
    switch (ah) {
      case 0x30:
        r[AX] = 0x0005;
        r[BX] = 0;
        break;
      case 0x25:
        c.wrW(0, al * 4, r[DX]);
        c.wrW(0, al * 4 + 2, s[DS]);
        break;
      case 0x35:
        r[BX] = c.rdW(0, al * 4);
        s[ES] = c.rdW(0, al * 4 + 2);
        break;
      case 0x4a:
        break;
      case 0x48:
        fail(8);
        r[BX] = 0;
        break;
      case 0x2c:
        r[CX] = this.seed & 0xffff;
        r[DX] = this.seed >>> 16;
        break; // drives Randomize
      case 0x2a:
        r[CX] = 2003;
        r[DX] = 0x0901;
        r[AX] = (r[AX] & 0xff00) | 1;
        break;
      case 0x19:
        r[AX] = (r[AX] & 0xff00) | 2;
        break;
      case 0x0e:
        r[AX] = (r[AX] & 0xff00) | 26;
        break;
      case 0x47:
        c.mem.set([0x47, 0x4f, 0x50, 0], c.lin(s[DS], r[SI]));
        break;
      case 0x3b:
        break;
      case 0x1a:
        this.dta = c.lin(s[DS], r[DX]);
        break;
      case 0x2f:
        s[ES] = this.dta >> 4;
        r[BX] = this.dta & 0xf;
        break;
      case 0x44:
        if (al === 0) r[DX] = r[BX] < 5 ? 0x80d3 : 0x0002;
        else {
          r[DX] = 0;
          r[AX] = 0;
        }
        break;
      case 0x3c:
      case 0x3d: {
        const path = this.hostPath(this.asciiz(s[DS], r[DX]));
        if (ah === 0x3d && !existsSync(path)) {
          fail(2);
          break;
        }
        const fd = openSync(path, ah === 0x3c ? 'w+' : (al & 3) === 0 ? 'r' : 'r+');
        let h = 5;
        while (this.files.has(h)) h++;
        this.files.set(h, { fd, pos: 0 });
        r[AX] = h;
        break;
      }
      case 0x3e: {
        const f = this.files.get(r[BX]);
        if (f) {
          closeSync(f.fd);
          this.files.delete(r[BX]);
        }
        break;
      }
      case 0x3f: {
        const f = this.files.get(r[BX]);
        if (!f) {
          if (r[BX] === 0) r[AX] = 0;
          else fail(6);
          break;
        }
        const buf = Buffer.alloc(r[CX]);
        const n = readSync(f.fd, buf, 0, r[CX], f.pos);
        f.pos += n;
        c.mem.set(buf.subarray(0, n), c.lin(s[DS], r[DX]));
        r[AX] = n;
        break;
      }
      case 0x40: {
        const a = c.lin(s[DS], r[DX]);
        const data = c.mem.slice(a, a + r[CX]);
        const f = this.files.get(r[BX]);
        if (f) {
          if (r[CX] === 0) ftruncateSync(f.fd, f.pos);
          else f.pos += writeSync(f.fd, data, 0, data.length, f.pos);
        } else {
          this.stdout += decodeCp866(data);
          data.forEach((b) => this.tty(b));
        }
        r[AX] = r[CX];
        break;
      }
      case 0x42: {
        const f = this.files.get(r[BX]);
        if (!f) {
          fail(6);
          break;
        }
        const off = (r[CX] << 16) | r[DX] | 0;
        f.pos = al === 0 ? off >>> 0 : al === 1 ? f.pos + off : fstatSync(f.fd).size + off;
        r[AX] = f.pos & 0xffff;
        r[DX] = f.pos >>> 16;
        break;
      }
      case 0x41: {
        const p = this.hostPath(this.asciiz(s[DS], r[DX]));
        if (existsSync(p)) unlinkSync(p);
        else fail(2);
        break;
      }
      case 0x43: {
        if (existsSync(this.hostPath(this.asciiz(s[DS], r[DX])))) r[CX] = 0x20;
        else fail(2);
        break;
      }
      case 0x4e: {
        const pat = this.asciiz(s[DS], r[DX]).replace(/\\/g, '/').split('/').pop()!.toUpperCase();
        const re = new RegExp(
          '^' + pat.replace(/\./g, '\\.').replace(/\*/g, '.*').replace(/\?/g, '.') + '$'
        );
        this.found = readdirSync(this.opts.workdir)
          .filter((f) => re.test(f.toUpperCase()) || (pat === '*.*' && !f.includes('.')))
          .sort();
        if (!this.nextFound()) fail(2);
        break;
      }
      case 0x4f:
        if (!this.nextFound()) fail(18);
        break;
      case 0x4c:
        this.exited = true;
        this.exitCode = al;
        c.stop = true;
        break;
      default:
        throw new Error(`int21 ah=${ah.toString(16)} at ${s[CS].toString(16)}`);
    }
    c.cf = !ok;
    void DI;
  }

  private found: string[] = [];
  private nextFound() {
    const name = this.found.shift();
    if (name === undefined) return false;
    const m = this.cpu.mem,
      a = this.dta;
    const size = statSync(join(this.opts.workdir, name)).size;
    m.fill(0, a, a + 43);
    m[a + 0x15] = 0x20;
    m[a + 0x1a] = size;
    m[a + 0x1b] = size >> 8;
    m[a + 0x1c] = size >> 16;
    m[a + 0x1d] = size >>> 24;
    m.set(encodeCp866(name.toUpperCase().slice(0, 12)), a + 0x1e);
    return true;
  }

  // ------------------------------------------------------------------ driving
  /** run until the program blocks on input (or exits) */
  run(maxSteps = 2_000_000_000) {
    this.waiting = false;
    while (!this.exited && !this.waiting && !this.cpu.halted) {
      const n = this.cpu.run(maxSteps);
      this.steps += n;
      if (n >= maxSteps)
        throw new Error(`step limit at ${this.cpu.s[CS].toString(16)}:${this.cpu.ip.toString(16)}`);
    }
    return this;
  }

  send(...keys: string[]) {
    this.keys.push(...keys.map(keyCode));
    return this.run();
  }

  screen(): string {
    const m = this.cpu.mem;
    const chars = Uint8Array.from({ length: COLS * ROWS }, (_, i) => m[VIDEO + i * 2]);
    const text = decodeCp866(chars);
    return Array.from({ length: ROWS }, (_, i) =>
      text.slice(i * COLS, (i + 1) * COLS).trimEnd()
    ).join('\n');
  }

  /** raw char/attr pairs of the text screen */
  screenCells(): Uint8Array {
    return this.cpu.mem.slice(VIDEO, VIDEO + COLS * ROWS * 2);
  }
}
