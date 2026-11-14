/**
 * Real-mode 8086/80186 interpreter — just enough PC to run a Turbo Pascal 7 program.
 * Deliberately imperative: this is the hot loop of the oracle.
 */

// register indices (16-bit)
export const AX = 0,
  CX = 1,
  DX = 2,
  BX = 3,
  SP = 4,
  BP = 5,
  SI = 6,
  DI = 7;
// segment indices
export const ES = 0,
  CS = 1,
  SS = 2,
  DS = 3;

const CF = 0x0001,
  PF = 0x0004,
  AF = 0x0010,
  ZF = 0x0040,
  SF = 0x0080,
  TF = 0x0100,
  IF = 0x0200,
  DF = 0x0400,
  OF = 0x0800;

const PARITY = new Uint8Array(256).map((_, i) => {
  let b = i,
    p = 1;
  while (b) {
    p ^= b & 1;
    b >>= 1;
  }
  return p;
});

export interface CpuHost {
  /** return true if the interrupt was serviced by the host (no IVT dispatch) */
  interrupt(cpu: Cpu, n: number): boolean;
  portIn(cpu: Cpu, port: number, word: boolean): number;
  portOut(cpu: Cpu, port: number, value: number, word: boolean): void;
  memRead?(addr: number): void;
}

export class Cpu {
  readonly mem = new Uint8Array(0x110000);
  readonly r = new Uint16Array(8);
  readonly s = new Uint16Array(4);
  ip = 0;
  flags = 0x0202;
  halted = false;
  stop = false;
  /** linear address -> callback, checked before every instruction */
  readonly breakpoints = new Map<number, (cpu: Cpu) => void>();
  private readonly bpMask = new Uint8Array(0x110000);
  /** linear address range whose reads are reported to host.memRead */
  watchLo = -1;
  watchHi = -1;

  // per-instruction decode state
  private segOv = -1;
  private rep = 0; // 0 none, 0xF3 rep/repe, 0xF2 repne
  private mod = 0;
  private reg = 0;
  private rm = 0;
  private eaSeg = 0;
  private eaOff = 0;
  private instStart = 0;

  constructor(private readonly host: CpuHost) {}

  addBreakpoint(lin: number, fn: (cpu: Cpu) => void) {
    this.breakpoints.set(lin, fn);
    this.bpMask[lin] = 1;
  }

  // ------------------------------------------------------------ memory
  lin(seg: number, off: number) {
    return ((seg << 4) + (off & 0xffff)) & 0xfffff;
  }
  rd8(a: number) {
    if (a >= this.watchLo && a <= this.watchHi) this.host.memRead?.(a);
    return this.mem[a];
  }
  rd16(a: number) {
    if (a + 1 >= this.watchLo && a <= this.watchHi) this.host.memRead?.(a);
    return this.mem[a] | (this.mem[(a + 1) & 0xfffff] << 8);
  }
  wr8(a: number, v: number) {
    this.mem[a] = v;
  }
  wr16(a: number, v: number) {
    this.mem[a] = v;
    this.mem[(a + 1) & 0xfffff] = v >> 8;
  }
  rdW(seg: number, off: number) {
    return this.rd16(this.lin(seg, off));
  }
  rdB(seg: number, off: number) {
    return this.rd8(this.lin(seg, off));
  }
  wrW(seg: number, off: number, v: number) {
    this.wr16(this.lin(seg, off), v);
  }
  wrB(seg: number, off: number, v: number) {
    this.wr8(this.lin(seg, off), v);
  }

  // ------------------------------------------------------------ registers
  get8(i: number) {
    return i < 4 ? this.r[i] & 0xff : this.r[i - 4] >> 8;
  }
  set8(i: number, v: number) {
    v &= 0xff;
    if (i < 4) this.r[i] = (this.r[i] & 0xff00) | v;
    else this.r[i - 4] = (this.r[i - 4] & 0x00ff) | (v << 8);
  }
  flag(f: number) {
    return (this.flags & f) !== 0;
  }
  setFlag(f: number, on: boolean) {
    this.flags = on ? this.flags | f : this.flags & ~f;
  }
  get cf() {
    return this.flag(CF);
  }
  set cf(v: boolean) {
    this.setFlag(CF, v);
  }
  get zf() {
    return this.flag(ZF);
  }
  set zf(v: boolean) {
    this.setFlag(ZF, v);
  }

  // ------------------------------------------------------------ stack
  push(v: number) {
    this.r[SP] -= 2;
    this.wrW(this.s[SS], this.r[SP], v);
  }
  pop() {
    const v = this.rdW(this.s[SS], this.r[SP]);
    this.r[SP] += 2;
    return v;
  }

  // ------------------------------------------------------------ fetch
  private f8() {
    const v = this.mem[this.lin(this.s[CS], this.ip)];
    this.ip = (this.ip + 1) & 0xffff;
    return v;
  }
  private f16() {
    const lo = this.f8();
    return lo | (this.f8() << 8);
  }
  private fs8() {
    return (this.f8() << 24) >> 24;
  }

  private modrm() {
    const b = this.f8();
    this.mod = b >> 6;
    this.reg = (b >> 3) & 7;
    this.rm = b & 7;
    if (this.mod === 3) return;
    const r = this.r;
    let off = 0,
      seg = DS;
    switch (this.rm) {
      case 0:
        off = r[BX] + r[SI];
        break;
      case 1:
        off = r[BX] + r[DI];
        break;
      case 2:
        off = r[BP] + r[SI];
        seg = SS;
        break;
      case 3:
        off = r[BP] + r[DI];
        seg = SS;
        break;
      case 4:
        off = r[SI];
        break;
      case 5:
        off = r[DI];
        break;
      case 6:
        if (this.mod === 0) off = this.f16();
        else {
          off = r[BP];
          seg = SS;
        }
        break;
      case 7:
        off = r[BX];
        break;
    }
    if (this.mod === 1) off += this.fs8();
    else if (this.mod === 2) off += this.f16();
    this.eaOff = off & 0xffff;
    this.eaSeg = this.segOv >= 0 ? this.segOv : seg;
  }
  private ea() {
    return this.lin(this.s[this.eaSeg], this.eaOff);
  }
  private getRm8() {
    return this.mod === 3 ? this.get8(this.rm) : this.rd8(this.ea());
  }
  private getRm16() {
    return this.mod === 3 ? this.r[this.rm] : this.rd16(this.ea());
  }
  private setRm8(v: number) {
    if (this.mod === 3) this.set8(this.rm, v);
    else this.wr8(this.ea(), v);
  }
  private setRm16(v: number) {
    if (this.mod === 3) this.r[this.rm] = v;
    else this.wr16(this.ea(), v);
  }
  private dseg() {
    return this.s[this.segOv >= 0 ? this.segOv : DS];
  }

  // ------------------------------------------------------------ flags / ALU
  private szp(v: number, w: boolean) {
    const m = w ? 0xffff : 0xff;
    v &= m;
    let f = this.flags & ~(ZF | SF | PF);
    if (v === 0) f |= ZF;
    if (v & (w ? 0x8000 : 0x80)) f |= SF;
    if (PARITY[v & 0xff]) f |= PF;
    this.flags = f;
  }
  private alu(op: number, a: number, b: number, w: boolean): number {
    const m = w ? 0xffff : 0xff,
      sb = w ? 0x8000 : 0x80;
    let r: number;
    switch (op) {
      case 0:
      case 2: {
        // add, adc
        const c = op === 2 && this.cf ? 1 : 0;
        r = a + b + c;
        this.setFlag(CF, r > m);
        this.setFlag(OF, ((a ^ r) & (b ^ r) & sb) !== 0);
        this.setFlag(AF, ((a ^ b ^ r) & 0x10) !== 0);
        break;
      }
      case 5:
      case 3:
      case 7: {
        // sub, sbb, cmp
        const c = op === 3 && this.cf ? 1 : 0;
        r = a - b - c;
        this.setFlag(CF, r < 0);
        this.setFlag(OF, ((a ^ b) & (a ^ r) & sb) !== 0);
        this.setFlag(AF, ((a ^ b ^ r) & 0x10) !== 0);
        break;
      }
      case 1:
        r = a | b;
        this.flags &= ~(CF | OF | AF);
        break;
      case 4:
        r = a & b;
        this.flags &= ~(CF | OF | AF);
        break;
      case 6:
        r = a ^ b;
        this.flags &= ~(CF | OF | AF);
        break;
      default:
        throw new Error('alu');
    }
    r &= m;
    this.szp(r, w);
    return r;
  }
  private inc(v: number, w: boolean, d: number) {
    const m = w ? 0xffff : 0xff,
      sb = w ? 0x8000 : 0x80;
    const r = (v + d) & m;
    this.setFlag(OF, d > 0 ? r === sb : r === sb - 1);
    this.setFlag(AF, ((v ^ r) & 0x10) !== 0);
    this.szp(r, w);
    return r;
  }
  private shift(op: number, v: number, cnt: number, w: boolean): number {
    cnt &= 0x1f;
    if (cnt === 0) return v;
    const bits = w ? 16 : 8,
      m = w ? 0xffff : 0xff,
      sb = w ? 0x8000 : 0x80;
    let cf = this.cf;
    for (let i = 0; i < cnt; i++) {
      switch (op) {
        case 0:
          cf = (v & sb) !== 0;
          v = ((v << 1) | (cf ? 1 : 0)) & m;
          break; // rol
        case 1:
          cf = (v & 1) !== 0;
          v = (v >> 1) | (cf ? sb : 0);
          break; // ror
        case 2: {
          const c = (v & sb) !== 0;
          v = ((v << 1) | (cf ? 1 : 0)) & m;
          cf = c;
          break;
        } // rcl
        case 3: {
          const c = (v & 1) !== 0;
          v = (v >> 1) | (cf ? sb : 0);
          cf = c;
          break;
        } // rcr
        case 4:
        case 6:
          cf = (v & sb) !== 0;
          v = (v << 1) & m;
          break; // shl/sal
        case 5:
          cf = (v & 1) !== 0;
          v = v >> 1;
          break; // shr
        case 7:
          cf = (v & 1) !== 0;
          v = (v >> 1) | (v & sb);
          break; // sar
      }
    }
    this.setFlag(CF, cf);
    const msb = (v & sb) !== 0;
    switch (op) {
      case 0:
      case 2:
        this.setFlag(OF, msb !== cf);
        break;
      case 1:
      case 3:
        this.setFlag(OF, msb !== ((v & (sb >> 1)) !== 0));
        break;
      case 4:
      case 6:
        this.setFlag(OF, msb !== cf);
        this.szp(v, w);
        break;
      case 5:
        this.setFlag(OF, cnt === 1 && ((v << 1) & sb) !== 0);
        this.szp(v, w);
        break;
      case 7:
        this.setFlag(OF, false);
        this.szp(v, w);
        break;
    }
    void bits;
    return v;
  }

  private cond(c: number): boolean {
    const f = this.flags;
    let r: boolean;
    switch (c >> 1) {
      case 0:
        r = (f & OF) !== 0;
        break;
      case 1:
        r = (f & CF) !== 0;
        break;
      case 2:
        r = (f & ZF) !== 0;
        break;
      case 3:
        r = (f & (CF | ZF)) !== 0;
        break;
      case 4:
        r = (f & SF) !== 0;
        break;
      case 5:
        r = (f & PF) !== 0;
        break;
      case 6:
        r = ((f & SF) !== 0) !== ((f & OF) !== 0);
        break;
      default:
        r = (f & ZF) !== 0 || ((f & SF) !== 0) !== ((f & OF) !== 0);
        break;
    }
    return c & 1 ? !r : r;
  }

  // ------------------------------------------------------------ interrupts
  interrupt(n: number) {
    if (this.host.interrupt(this, n)) return;
    this.push(this.flags);
    this.push(this.s[CS]);
    this.push(this.ip);
    this.flags &= ~(IF | TF);
    this.ip = this.rdW(0, n * 4);
    this.s[CS] = this.rdW(0, n * 4 + 2);
  }
  /** rewind IP to the start of the current instruction (used by blocking host services) */
  rewind() {
    this.ip = this.instStart;
  }

  // ------------------------------------------------------------ main loop
  run(maxSteps = Infinity): number {
    this.stop = false;
    let steps = 0;
    while (!this.stop && !this.halted && steps < maxSteps) {
      const lin = this.lin(this.s[CS], this.ip);
      if (this.bpMask[lin]) {
        this.breakpoints.get(lin)!(this);
        if (this.stop) break;
      }
      this.step();
      steps++;
    }
    return steps;
  }

  step() {
    this.instStart = this.ip;
    this.segOv = -1;
    this.rep = 0;
    const r = this.r,
      s = this.s;
    let op: number;
    for (;;) {
      op = this.f8();
      if (op === 0x26 || op === 0x2e || op === 0x36 || op === 0x3e) this.segOv = (op >> 3) & 3;
      else if (op === 0xf2 || op === 0xf3) this.rep = op;
      else if (op === 0xf0) {
        /* lock */
      } else break;
    }

    if (op < 0x40 && (op & 7) < 6) {
      const aop = op >> 3;
      const w = (op & 1) === 1;
      let a: number, b: number;
      switch (op & 7) {
        case 0:
          this.modrm();
          a = this.getRm8();
          b = this.get8(this.reg);
          {
            const v = this.alu(aop, a, b, false);
            if (aop !== 7) this.setRm8(v);
          }
          return;
        case 1:
          this.modrm();
          a = this.getRm16();
          b = r[this.reg];
          {
            const v = this.alu(aop, a, b, true);
            if (aop !== 7) this.setRm16(v);
          }
          return;
        case 2:
          this.modrm();
          a = this.get8(this.reg);
          b = this.getRm8();
          {
            const v = this.alu(aop, a, b, false);
            if (aop !== 7) this.set8(this.reg, v);
          }
          return;
        case 3:
          this.modrm();
          a = r[this.reg];
          b = this.getRm16();
          {
            const v = this.alu(aop, a, b, true);
            if (aop !== 7) r[this.reg] = v;
          }
          return;
        case 4: {
          const v = this.alu(aop, r[AX] & 0xff, this.f8(), false);
          if (aop !== 7) this.set8(0, v);
          return;
        }
        case 5: {
          const v = this.alu(aop, r[AX], this.f16(), true);
          if (aop !== 7) r[AX] = v;
          void w;
          return;
        }
      }
    }

    switch (op) {
      case 0x06:
      case 0x0e:
      case 0x16:
      case 0x1e:
        this.push(s[op >> 3]);
        return;
      case 0x07:
      case 0x17:
      case 0x1f:
        s[op >> 3] = this.pop();
        return;
      case 0x27: {
        // daa
        let al = r[AX] & 0xff;
        const oldCf = this.cf,
          oldAl = al;
        if ((al & 0xf) > 9 || this.flag(AF)) {
          al += 6;
          this.setFlag(AF, true);
        } else this.setFlag(AF, false);
        if (oldAl > 0x99 || oldCf) {
          al += 0x60;
          this.cf = true;
        } else this.cf = false;
        this.set8(0, al);
        this.szp(al, false);
        return;
      }
      case 0x2f: {
        // das
        let al = r[AX] & 0xff;
        const oldCf = this.cf,
          oldAl = al;
        if ((al & 0xf) > 9 || this.flag(AF)) {
          al -= 6;
          this.setFlag(AF, true);
        } else this.setFlag(AF, false);
        if (oldAl > 0x99 || oldCf) {
          al -= 0x60;
          this.cf = true;
        } else this.cf = false;
        this.set8(0, al);
        this.szp(al, false);
        return;
      }
      case 0x37:
      case 0x3f: {
        // aaa / aas
        const sub = op === 0x3f;
        if ((r[AX] & 0xf) > 9 || this.flag(AF)) {
          const al = (r[AX] & 0xff) + (sub ? -6 : 6),
            ah = (r[AX] >> 8) + (sub ? -1 : 1);
          r[AX] = ((ah & 0xff) << 8) | (al & 0x0f);
          this.setFlag(AF, true);
          this.cf = true;
        } else {
          r[AX] &= 0xff0f;
          this.setFlag(AF, false);
          this.cf = false;
        }
        return;
      }
    }
    if (op >= 0x40 && op < 0x48) {
      r[op & 7] = this.inc(r[op & 7], true, 1);
      return;
    }
    if (op >= 0x48 && op < 0x50) {
      r[op & 7] = this.inc(r[op & 7], true, -1);
      return;
    }
    if (op >= 0x50 && op < 0x58) {
      const v = op === 0x54 ? r[SP] : r[op & 7];
      this.push(v);
      return;
    }
    if (op >= 0x58 && op < 0x60) {
      const v = this.pop();
      r[op & 7] = v;
      return;
    }
    if (op >= 0x70 && op < 0x80) {
      const d = this.fs8();
      if (this.cond(op & 0xf)) this.ip = (this.ip + d) & 0xffff;
      return;
    }
    if (op >= 0x91 && op < 0x98) {
      const t = r[AX];
      r[AX] = r[op & 7];
      r[op & 7] = t;
      return;
    }
    if (op >= 0xb0 && op < 0xb8) {
      this.set8(op & 7, this.f8());
      return;
    }
    if (op >= 0xb8 && op < 0xc0) {
      r[op & 7] = this.f16();
      return;
    }
    if (op >= 0xd8 && op <= 0xdf) {
      this.modrm();
      return;
    } // no FPU present: ESC is a no-op

    switch (op) {
      case 0x60: {
        const sp = r[SP];
        for (const i of [AX, CX, DX, BX]) this.push(r[i]);
        this.push(sp);
        for (const i of [BP, SI, DI]) this.push(r[i]);
        return;
      }
      case 0x61: {
        for (const i of [DI, SI, BP]) r[i] = this.pop();
        this.pop();
        for (const i of [BX, DX, CX, AX]) r[i] = this.pop();
        return;
      }
      case 0x62:
        this.modrm();
        return; // bound: assume in range
      case 0x68:
        this.push(this.f16());
        return;
      case 0x6a:
        this.push(this.fs8() & 0xffff);
        return;
      case 0x69:
      case 0x6b: {
        this.modrm();
        const a = (this.getRm16() << 16) >> 16;
        const b = op === 0x69 ? (this.f16() << 16) >> 16 : this.fs8();
        const p = a * b;
        r[this.reg] = p;
        const ovf = p !== (p << 16) >> 16;
        this.setFlag(CF, ovf);
        this.setFlag(OF, ovf);
        return;
      }
      case 0x80:
      case 0x81:
      case 0x82:
      case 0x83: {
        this.modrm();
        const w = (op & 1) === 1;
        const a = w ? this.getRm16() : this.getRm8();
        const b = op === 0x81 ? this.f16() : op === 0x83 ? this.fs8() & 0xffff : this.f8();
        const v = this.alu(this.reg, a, b, w);
        if (this.reg !== 7) w ? this.setRm16(v) : this.setRm8(v);
        return;
      }
      case 0x84:
        this.modrm();
        this.alu(4, this.getRm8(), this.get8(this.reg), false);
        return;
      case 0x85:
        this.modrm();
        this.alu(4, this.getRm16(), r[this.reg], true);
        return;
      case 0x86: {
        this.modrm();
        const t = this.getRm8();
        this.setRm8(this.get8(this.reg));
        this.set8(this.reg, t);
        return;
      }
      case 0x87: {
        this.modrm();
        const t = this.getRm16();
        this.setRm16(r[this.reg]);
        r[this.reg] = t;
        return;
      }
      case 0x88:
        this.modrm();
        this.setRm8(this.get8(this.reg));
        return;
      case 0x89:
        this.modrm();
        this.setRm16(r[this.reg]);
        return;
      case 0x8a:
        this.modrm();
        this.set8(this.reg, this.getRm8());
        return;
      case 0x8b:
        this.modrm();
        r[this.reg] = this.getRm16();
        return;
      case 0x8c:
        this.modrm();
        this.setRm16(s[this.reg & 3]);
        return;
      case 0x8d:
        this.modrm();
        r[this.reg] = this.eaOff;
        return;
      case 0x8e:
        this.modrm();
        s[this.reg & 3] = this.getRm16();
        return;
      case 0x8f: {
        const v = this.pop();
        this.modrm();
        this.setRm16(v);
        return;
      }
      case 0x90:
        return;
      case 0x98:
        r[AX] = ((r[AX] & 0xff) << 24) >> 24;
        return;
      case 0x99:
        r[DX] = r[AX] & 0x8000 ? 0xffff : 0;
        return;
      case 0x9a: {
        const o = this.f16(),
          sg = this.f16();
        this.push(s[CS]);
        this.push(this.ip);
        s[CS] = sg;
        this.ip = o;
        return;
      }
      case 0x9b:
        return;
      case 0x9c:
        this.push(this.flags | 0xf002);
        return;
      case 0x9d:
        this.flags = (this.pop() & 0x0fd5) | 0x0002;
        return;
      case 0x9e:
        this.flags = (this.flags & 0xff00) | ((r[AX] >> 8) & 0xd5) | 2;
        return;
      case 0x9f:
        this.set8(4, this.flags & 0xff);
        return;
      case 0xa0:
        this.set8(0, this.rdB(this.dseg(), this.f16()));
        return;
      case 0xa1:
        r[AX] = this.rdW(this.dseg(), this.f16());
        return;
      case 0xa2:
        this.wrB(this.dseg(), this.f16(), r[AX]);
        return;
      case 0xa3:
        this.wrW(this.dseg(), this.f16(), r[AX]);
        return;
      case 0xa4:
      case 0xa5:
      case 0xa6:
      case 0xa7:
      case 0xaa:
      case 0xab:
      case 0xac:
      case 0xad:
      case 0xae:
      case 0xaf:
        this.strOp(op);
        return;
      case 0xa8:
        this.alu(4, r[AX] & 0xff, this.f8(), false);
        return;
      case 0xa9:
        this.alu(4, r[AX], this.f16(), true);
        return;
      case 0xc0:
      case 0xc1:
      case 0xd0:
      case 0xd1:
      case 0xd2:
      case 0xd3: {
        this.modrm();
        const w = (op & 1) === 1;
        const cnt = op <= 0xc1 ? this.f8() : op <= 0xd1 ? 1 : r[CX] & 0xff;
        const v = this.shift(this.reg, w ? this.getRm16() : this.getRm8(), cnt, w);
        w ? this.setRm16(v) : this.setRm8(v);
        return;
      }
      case 0xc2: {
        const n = this.f16();
        this.ip = this.pop();
        r[SP] += n;
        return;
      }
      case 0xc3:
        this.ip = this.pop();
        return;
      case 0xc4:
      case 0xc5: {
        this.modrm();
        const a = this.ea();
        r[this.reg] = this.rd16(a);
        s[op === 0xc4 ? ES : DS] = this.rd16((a + 2) & 0xfffff);
        return;
      }
      case 0xc6:
        this.modrm();
        this.setRm8(this.f8());
        return;
      case 0xc7:
        this.modrm();
        this.setRm16(this.f16());
        return;
      case 0xc8: {
        const size = this.f16(),
          level = this.f8() & 0x1f;
        this.push(r[BP]);
        const frame = r[SP];
        for (let i = 1; i < level; i++) {
          r[BP] -= 2;
          this.push(this.rdW(s[SS], r[BP]));
        }
        if (level > 0) this.push(frame);
        r[BP] = frame;
        r[SP] -= size;
        return;
      }
      case 0xc9:
        r[SP] = r[BP];
        r[BP] = this.pop();
        return;
      case 0xca: {
        const n = this.f16();
        this.ip = this.pop();
        s[CS] = this.pop();
        r[SP] += n;
        return;
      }
      case 0xcb:
        this.ip = this.pop();
        s[CS] = this.pop();
        return;
      case 0xcc:
        this.interrupt(3);
        return;
      case 0xcd:
        this.interrupt(this.f8());
        return;
      case 0xce:
        if (this.flag(OF)) this.interrupt(4);
        return;
      case 0xcf:
        this.ip = this.pop();
        s[CS] = this.pop();
        this.flags = (this.pop() & 0x0fd5) | 2;
        return;
      case 0xd4: {
        const b = this.f8() || 10;
        const al = r[AX] & 0xff;
        r[AX] = (Math.floor(al / b) << 8) | (al % b);
        this.szp(r[AX], false);
        return;
      }
      case 0xd5: {
        const b = this.f8();
        const al = ((r[AX] & 0xff) + (r[AX] >> 8) * b) & 0xff;
        r[AX] = al;
        this.szp(al, false);
        return;
      }
      case 0xd6:
        this.set8(0, this.cf ? 0xff : 0);
        return;
      case 0xd7:
        this.set8(0, this.rdB(this.dseg(), r[BX] + (r[AX] & 0xff)));
        return;
      case 0xe0:
      case 0xe1:
      case 0xe2: {
        const d = this.fs8();
        r[CX]--;
        const go = r[CX] !== 0 && (op === 0xe2 || (op === 0xe1 ? this.zf : !this.zf));
        if (go) this.ip = (this.ip + d) & 0xffff;
        return;
      }
      case 0xe3: {
        const d = this.fs8();
        if (r[CX] === 0) this.ip = (this.ip + d) & 0xffff;
        return;
      }
      case 0xe4:
        this.set8(0, this.host.portIn(this, this.f8(), false));
        return;
      case 0xe5:
        r[AX] = this.host.portIn(this, this.f8(), true);
        return;
      case 0xe6:
        this.host.portOut(this, this.f8(), r[AX] & 0xff, false);
        return;
      case 0xe7:
        this.host.portOut(this, this.f8(), r[AX], true);
        return;
      case 0xec:
        this.set8(0, this.host.portIn(this, r[DX], false));
        return;
      case 0xed:
        r[AX] = this.host.portIn(this, r[DX], true);
        return;
      case 0xee:
        this.host.portOut(this, r[DX], r[AX] & 0xff, false);
        return;
      case 0xef:
        this.host.portOut(this, r[DX], r[AX], true);
        return;
      case 0xe8: {
        const d = this.f16();
        this.push(this.ip);
        this.ip = (this.ip + d) & 0xffff;
        return;
      }
      case 0xe9: {
        const d = this.f16();
        this.ip = (this.ip + d) & 0xffff;
        return;
      }
      case 0xea: {
        const o = this.f16(),
          sg = this.f16();
        this.ip = o;
        s[CS] = sg;
        return;
      }
      case 0xeb: {
        const d = this.fs8();
        this.ip = (this.ip + d) & 0xffff;
        return;
      }
      case 0xf4:
        this.halted = true;
        return;
      case 0xf5:
        this.cf = !this.cf;
        return;
      case 0xf6:
      case 0xf7:
        this.grp3((op & 1) === 1);
        return;
      case 0xf8:
        this.cf = false;
        return;
      case 0xf9:
        this.cf = true;
        return;
      case 0xfa:
        this.setFlag(IF, false);
        return;
      case 0xfb:
        this.setFlag(IF, true);
        return;
      case 0xfc:
        this.setFlag(DF, false);
        return;
      case 0xfd:
        this.setFlag(DF, true);
        return;
      case 0xfe: {
        this.modrm();
        if (this.reg > 1) throw this.bad(op);
        this.setRm8(this.inc(this.getRm8(), false, this.reg === 0 ? 1 : -1));
        return;
      }
      case 0xff: {
        this.modrm();
        switch (this.reg) {
          case 0:
            this.setRm16(this.inc(this.getRm16(), true, 1));
            return;
          case 1:
            this.setRm16(this.inc(this.getRm16(), true, -1));
            return;
          case 2: {
            const t = this.getRm16();
            this.push(this.ip);
            this.ip = t;
            return;
          }
          case 3: {
            const a = this.ea();
            this.push(s[CS]);
            this.push(this.ip);
            this.ip = this.rd16(a);
            s[CS] = this.rd16((a + 2) & 0xfffff);
            return;
          }
          case 4:
            this.ip = this.getRm16();
            return;
          case 5: {
            const a = this.ea();
            this.ip = this.rd16(a);
            s[CS] = this.rd16((a + 2) & 0xfffff);
            return;
          }
          case 6:
            this.push(this.getRm16());
            return;
        }
        throw this.bad(op);
      }
    }
    throw this.bad(op);
  }

  private bad(op: number) {
    return new Error(
      `unimplemented opcode ${op.toString(16)} at ${this.s[CS].toString(16)}:${this.instStart.toString(16)}`
    );
  }

  private divide() {
    // division error: 8086 semantics, return address after the instruction
    this.interrupt(0);
  }

  private grp3(w: boolean) {
    this.modrm();
    const r = this.r;
    switch (this.reg) {
      case 0:
      case 1:
        this.alu(4, w ? this.getRm16() : this.getRm8(), w ? this.f16() : this.f8(), w);
        return;
      case 2:
        w ? this.setRm16(~this.getRm16()) : this.setRm8(~this.getRm8());
        return;
      case 3: {
        const v = w ? this.getRm16() : this.getRm8();
        const res = this.alu(5, 0, v, w);
        this.cf = v !== 0;
        w ? this.setRm16(res) : this.setRm8(res);
        return;
      }
      case 4:
      case 5: {
        const signed = this.reg === 5;
        if (w) {
          const a = signed ? (r[AX] << 16) >> 16 : r[AX];
          const b = signed ? (this.getRm16() << 16) >> 16 : this.getRm16();
          const p = a * b;
          r[AX] = p & 0xffff;
          r[DX] = Math.floor(p / 0x10000) & 0xffff;
          const ovf = signed ? p !== (p << 16) >> 16 : r[DX] !== 0;
          this.setFlag(CF, ovf);
          this.setFlag(OF, ovf);
        } else {
          const a = signed ? ((r[AX] & 0xff) << 24) >> 24 : r[AX] & 0xff;
          const b = signed ? (this.getRm8() << 24) >> 24 : this.getRm8();
          const p = a * b;
          r[AX] = p & 0xffff;
          const ovf = signed ? p !== (p << 24) >> 24 : (p & 0xff00) !== 0;
          this.setFlag(CF, ovf);
          this.setFlag(OF, ovf);
        }
        return;
      }
      case 6:
      case 7: {
        const signed = this.reg === 7;
        if (w) {
          let d = this.getRm16();
          if (signed) d = (d << 16) >> 16;
          if (d === 0) return this.divide();
          const n = signed ? (r[DX] << 16) | r[AX] : r[DX] * 0x10000 + r[AX];
          const q = Math.trunc(n / d),
            m = n - q * d;
          if (signed ? q > 0x7fff || q < -0x8000 : q > 0xffff) return this.divide();
          r[AX] = q & 0xffff;
          r[DX] = m & 0xffff;
        } else {
          let d = this.getRm8();
          if (signed) d = (d << 24) >> 24;
          if (d === 0) return this.divide();
          const n = signed ? (r[AX] << 16) >> 16 : r[AX];
          const q = Math.trunc(n / d),
            m = n - q * d;
          if (signed ? q > 0x7f || q < -0x80 : q > 0xff) return this.divide();
          r[AX] = ((m & 0xff) << 8) | (q & 0xff);
        }
        return;
      }
    }
  }

  private strOp(op: number) {
    const r = this.r,
      s = this.s;
    const w = (op & 1) === 1;
    const delta = this.flag(DF) ? -(w ? 2 : 1) : w ? 2 : 1;
    const src = this.dseg();
    const cmp = op === 0xa6 || op === 0xa7 || op === 0xae || op === 0xaf;
    for (;;) {
      if (this.rep && r[CX] === 0) return;
      switch (op) {
        case 0xa4:
          this.wrB(s[ES], r[DI], this.rdB(src, r[SI]));
          r[SI] += delta;
          r[DI] += delta;
          break;
        case 0xa5:
          this.wrW(s[ES], r[DI], this.rdW(src, r[SI]));
          r[SI] += delta;
          r[DI] += delta;
          break;
        case 0xa6:
          this.alu(7, this.rdB(src, r[SI]), this.rdB(s[ES], r[DI]), false);
          r[SI] += delta;
          r[DI] += delta;
          break;
        case 0xa7:
          this.alu(7, this.rdW(src, r[SI]), this.rdW(s[ES], r[DI]), true);
          r[SI] += delta;
          r[DI] += delta;
          break;
        case 0xaa:
          this.wrB(s[ES], r[DI], r[AX]);
          r[DI] += delta;
          break;
        case 0xab:
          this.wrW(s[ES], r[DI], r[AX]);
          r[DI] += delta;
          break;
        case 0xac:
          this.set8(0, this.rdB(src, r[SI]));
          r[SI] += delta;
          break;
        case 0xad:
          r[AX] = this.rdW(src, r[SI]);
          r[SI] += delta;
          break;
        case 0xae:
          this.alu(7, r[AX] & 0xff, this.rdB(s[ES], r[DI]), false);
          r[DI] += delta;
          break;
        case 0xaf:
          this.alu(7, r[AX], this.rdW(s[ES], r[DI]), true);
          r[DI] += delta;
          break;
      }
      if (!this.rep) return;
      r[CX]--;
      if (cmp && (this.rep === 0xf3 ? !this.zf : this.zf)) return;
    }
  }
}
