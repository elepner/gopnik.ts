/**
 * Lifts Turbo Pascal 7 code templates into readable pseudo-code (gotos kept).
 *   bun oracle/lift.ts [procAddrHex...] > analysis/g.pas.txt
 * Symbolic evaluation per basic block: registers hold expressions, pushes build
 * argument lists, runtime calls are rendered by name. Anything not understood is
 * emitted as a raw `asm` line so nothing is silently lost.
 */
import {
  ENTRY,
  NAMES,
  SEGMENTS,
  hex,
  img,
  insns,
  labels,
  procs,
  pstr,
  segOf,
  segoff,
  type Insn,
} from './disasm';

type Entry = { e: string; w: number; kind?: 'seg' | 'hi' | 'real' | 'tmpstr' };

const R16 = ['ax', 'bx', 'cx', 'dx', 'si', 'di', 'bp', 'sp', 'es', 'ds', 'ss', 'cs'];
const LO: Record<string, string> = { al: 'ax', bl: 'bx', cl: 'cx', dl: 'dx' };
const HI: Record<string, string> = { ah: 'ax', bh: 'bx', ch: 'cx', dh: 'dx' };

const num = (s: string) => parseInt(s, 16);
const isImm = (s: string) => /^-?0x[0-9a-f]+$|^-?\d+$/.test(s);
const immVal = (s: string) => (s.startsWith('-') ? -parseInt(s.slice(1)) : parseInt(s));

/** 6-byte TP Real from CX(lo exp):SI:DI words */
const real48 = (cx: number, si: number, di: number) => {
  const exp = cx & 0xff;
  if (exp === 0) return 0;
  const sign = di & 0x8000 ? -1 : 1;
  const mant = 1 + (((di & 0x7fff) * 0x10000 + si) * 0x100 + (cx >> 8)) / 2 ** 39;
  return sign * mant * 2 ** (exp - 0x81);
};

const memName = (op: string, segBase: number): string => {
  const m =
    op.match(/^(?:(byte|word|dword) ptr )?(?:(\w\w):)?\[(.+)\]$/) ??
    op.match(/^ptr (?:(\w\w):)?\[(.+)\]$/);
  if (!m) return op;
  const width = op.startsWith('byte') ? 'b' : '';
  const seg = op.match(/(\w\w):\[/)?.[1];
  const inner = op.slice(op.indexOf('[') + 1, -1).replace(/\s+/g, '');
  let mm: RegExpMatchArray | null;
  if ((mm = inner.match(/^0x([0-9a-f]+)$/)) && !seg) return `g${mm[1].padStart(4, '0')}${width}`;
  if ((mm = inner.match(/^bp([+-])0x([0-9a-f]+)$/)))
    return mm[1] === '-' ? `L${mm[2]}${width}` : `P${num(mm[2])}${width}`;
  if ((mm = inner.match(/^bp([+-])(\d+)$/)))
    return mm[1] === '-' ? `L${num(mm[2])}${width}` : `P${mm[2]}${width}`;
  if ((mm = inner.match(/^bp\+(di|si|bx)([+-])0x([0-9a-f]+)$/)))
    return mm[2] === '-' ? `L${mm[3]}${width}[${mm[1]}]` : `P${num(mm[3])}${width}[${mm[1]}]`;
  if ((mm = inner.match(/^(di|si|bx)\+0x([0-9a-f]+)$/)) && !seg)
    return `g${mm[2].padStart(4, '0')}${width}[${mm[1]}]`;
  if (seg === 'cs' && (mm = inner.match(/^(di|si|bx)\+0x([0-9a-f]+)$/)))
    return `CS:${hex(segBase * 16 + num(mm[2]))}${width}[${mm[1]}]`;
  void segBase;
  return `${seg ? seg + ':' : ''}[${inner}]${width}`;
};

class Lifter {
  out: string[] = [];
  r: Record<string, string> = {};
  stack: Entry[] = [];
  flags: { a: string; b: string; kind?: string } | undefined;
  realA = '?';
  realB: string | undefined;
  realPops = 0;
  rnd = 0;
  hiPop: string | undefined;
  snapshots = new Map<number, (Record<string, string> | null)[]>();
  constructor(
    private readonly start: number,
    private readonly end: number,
    private readonly segBase: number
  ) {}

  emit(s: string) {
    this.out.push('    ' + s);
  }
  reset() {
    this.r = {};
    this.flags = undefined;
  }

  reg(name: string): string {
    if (LO[name]) {
      const v = this.r[LO[name]];
      return v ?? name;
    }
    if (HI[name]) return this.r[name] ?? name;
    return this.r[name] ?? name;
  }
  setReg(name: string, v: string) {
    if (LO[name]) {
      this.r[LO[name]] = v;
      delete this.r[name.replace('l', 'h')];
      return;
    }
    if (HI[name]) {
      this.r[name] = v;
      return;
    }
    this.r[name] = v;
    if (name in { ax: 1, bx: 1, cx: 1, dx: 1 }) delete this.r[name[0] + 'h'];
  }
  read(op: string): string {
    if (R16.includes(op) || LO[op] || HI[op]) return this.reg(op);
    if (isImm(op)) {
      const v = immVal(op);
      return v > 9 ? `${v}` : `${v}`;
    }
    return this.mem(op);
  }
  /** memory operand; base/index registers without bp are replaced by their symbolic value */
  mem(op: string): string {
    const inner = op.match(/\[(.+)\]/)?.[1];
    if (inner && !inner.includes('bp')) {
      const m = inner
        .replace(/\s+/g, '')
        .match(/^(bx|si|di)(?:\+(bx|si|di))?([+-](?:0x[0-9a-f]+|\d+))?$/);
      if (m) {
        const seg = op.match(/(\w\w):\[/)?.[1];
        const base = [m[1], m[2]]
          .filter(Boolean)
          .map((r) => this.reg(r!))
          .join(' + ');
        const disp = m[3] ? (m[3][0] === '-' ? -1 : 1) * parseInt(m[3].slice(1)) : 0;
        const w = op.startsWith('byte') ? 'b' : '';
        if (seg === 'es' || (!seg && false)) return `ES[${base}${disp ? ' + ' + disp : ''}]${w}`;
        return `${seg ? seg.toUpperCase() : 'DS'}[${base}${disp ? ' + 0x' + disp.toString(16) : ''}]${w}`;
      }
    }
    return memName(op, this.segBase);
  }
  write(op: string, v: string) {
    if (R16.includes(op) || LO[op] || HI[op]) this.setReg(op, v);
    else this.emit(`${this.mem(op)} := ${v}`);
  }

  push(v: string, kind?: Entry['kind']) {
    const top = this.stack[this.stack.length - 1];
    if (top?.kind === 'seg' && !kind) {
      // seg:off pointer
      this.stack.pop();
      let e = `${top.e}:${v}`;
      if (top.e === 'cs' && isImm(v)) {
        const s = pstr(this.segBase * 16 + immVal(v));
        if (s !== undefined) e = JSON.stringify(s);
      } else if (top.e === 'ds' && isImm(v)) e = `@g${hex(immVal(v), 4)}`;
      else if (top.e === 'ss' || top.e === 'ds' || top.e === 'es')
        e = v.startsWith('&') ? '@' + v.slice(1) : v.startsWith('*') ? v.slice(1) : `${top.e}:${v}`;
      this.stack.push({ e, w: 2 });
      return;
    }
    if (top?.kind === 'hi' && !kind && top.e === v) {
      top.w = 2;
      top.kind = undefined;
      return;
    }
    if (kind === 'real') {
      // three pushes of the real accumulator collapse into one entry
      if (top?.kind === 'real' && top.w < 3 && top.e === v) {
        top.w++;
        return;
      }
    }
    this.stack.push({ e: v, w: 1, kind });
  }
  popEntry(): string {
    const e = this.stack.pop();
    return e ? e.e : '<stack?>';
  }
  popWords(words: number): string[] {
    const args: string[] = [];
    let w = 0;
    while (w < words && this.stack.length) {
      const e = this.stack.pop()!;
      args.unshift(e.e);
      w += e.w;
    }
    if (w < words) args.unshift(`<missing ${words - w}w>`);
    return args;
  }

  jcc(m: string, target: number) {
    const f = this.flags ?? { a: '?', b: '?' };
    const ops: Record<string, string> = {
      je: '==',
      jne: '!=',
      jl: '<',
      jb: '<u',
      jle: '<=',
      jbe: '<=u',
      jg: '>',
      ja: '>u',
      jge: '>=',
      jae: '>=u',
      js: '<0 (sign)',
      jns: '>=0 (sign)',
    };
    const op = ops[m];
    let cond: string;
    if (f.kind === 'str') cond = `${f.a} ${op?.replace('u', '')} ${f.b}`;
    else if (op)
      cond = `${f.a} ${op.replace('u', '')} ${f.b}${op.endsWith('u') ? ' (unsigned)' : ''}`;
    else cond = `${m} [${f.a} ? ${f.b}]`;
    this.emit(`if ${cond} goto L${hex(target)}`);
    this.snap(target);
  }
  snap(target: number) {
    if (!this.snapshots.has(target)) this.snapshots.set(target, []);
    this.snapshots.get(target)!.push({ ...this.r });
  }

  /** pop an argument of n words; a 2-word long whose high part is 0/sign-extension collapses to its low part */
  arg(n: number): string {
    const parts = this.popWords(n);
    if (parts.length === 2 && (parts[0] === '0' || parts[0] === `sx(${parts[1]})`)) return parts[1];
    return parts.join(':');
  }

  callRuntime(name: string) {
    const p = (n = 2) => this.arg(n);
    const p1 = () => this.arg(1);
    switch (name) {
      case 'StackCheck':
      case 'IOCheck':
      case 'SysInit':
      case 'CrtInit':
        return;
      case 'WriteEnd':
        p();
        return;
      case 'PrintLn':
      case 'Print': {
        const a = [p1(), p1(), p1(), p1(), p1()].reverse();
        this.emit(`${name}(${[p(), ...a].join(', ').replace(/(, 0)+$/, '')})`);
        return;
      }
      case 'LowerCase':
        this.emit(`LowerCase(${p()})`);
        return;
      case 'Random':
        this.setReg('ax', `Random#${++this.rnd}(${p1()})`);
        return;
      case 'Randomize':
        this.emit('Randomize()');
        return;
      case 'StrLoad': {
        const src = p();
        const t = this.stack[this.stack.length - 1];
        if (t) {
          t.e = src;
          t.kind = 'tmpstr';
        }
        return;
      }
      case 'StrConcat': {
        const s = p();
        const t = this.stack[this.stack.length - 1];
        if (t) t.e = `${t.e} + ${s}`;
        return;
      }
      case 'CharToStr': {
        const c = p1();
        const t = this.stack[this.stack.length - 1];
        if (t) {
          t.e = `chr(${c})`;
          t.kind = 'tmpstr';
        }
        return;
      }
      case 'StrCmp': {
        const b = p(),
          a = p();
        this.flags = { a, b, kind: 'str' };
        return;
      }
      case 'StrStore': {
        p1();
        const dst = p(),
          src = p();
        this.emit(`${dst} := ${src}`);
        return;
      }
      case 'WriteStr':
      case 'WriteChar': {
        const wd = p1(),
          s = name === 'WriteChar' ? p1() : p();
        this.emit(`Write(${s}${wd !== '0' ? ':' + wd : ''})`);
        return;
      }
      case 'WriteLnEnd':
        p();
        this.emit('WriteLn');
        return;
      case 'ReadStr': {
        p1();
        const s = p();
        this.emit(`ReadStr(${s})`);
        return;
      }
      case 'ReadLnEnd':
        p();
        this.emit('ReadLn');
        return;
      case 'StrLong': {
        p1();
        const dst = p(),
          wd = p1(),
          v = p();
        this.emit(`Str(${v}${wd !== '0' ? ':' + wd : ''}, ${dst})`);
        return;
      }
      case 'ValLong': {
        const code = p(),
          s = p();
        this.setReg('ax', `Val(${s}, ${code})`);
        this.setReg('dx', `hi(Val)`);
        return;
      }
      case 'Assign': {
        const n = p(),
          f = p();
        this.emit(`Assign(${f}, ${n})`);
        return;
      }
      case 'Reset':
      case 'Rewrite': {
        const sz = p1(),
          f = p();
        this.emit(`${name}(${f}, ${sz})`);
        return;
      }
      case 'ReadRec':
      case 'WriteRec': {
        const rec = p();
        const f = this.stack[this.stack.length - 1]?.e;
        this.emit(`${name}(${f}, ${rec})`);
        return;
      }
      case 'Close':
        this.emit(`Close(${p()})`);
        return;
      case 'IOResult':
        this.setReg('ax', 'IOResult()');
        return;
      case 'Halt':
        this.emit(`Halt(${this.reg('ax')})`);
        return;
      case 'GetDir': {
        p1();
        const s = p(),
          d = p1();
        this.emit(`GetDir(${d}, ${s})`);
        return;
      }
      case 'TextColor':
        this.emit(`TextColor(${p1()})`);
        return;
      case 'ClrScr':
        this.emit('ClrScr()');
        return;
      case 'Delay':
        this.emit(`Delay(${p1()})`);
        return;
      case 'KeyPressed':
        this.setReg('ax', 'KeyPressed()');
        return;
      case 'ReadKey':
        this.emit('key := ReadKey()');
        this.setReg('ax', 'key');
        return;
      case 'FindFirst': {
        const sr = p(),
          at = p1(),
          path = p();
        this.emit(`FindFirst(${path}, ${at}, ${sr})`);
        return;
      }
      case 'FindNext':
        this.emit(`FindNext(${p()})`);
        return;
      case 'LongMul':
      case 'LongDiv': {
        const a = this.long('dx', 'ax'),
          b = this.long('bx', 'cx');
        const v = `(${a} ${name === 'LongMul' ? '*' : 'div'} ${b})`;
        this.setReg('ax', v);
        this.setReg('dx', `hi${v}`);
        return;
      }
      case 'RFloat':
        this.realA = `real(${this.long('dx', 'ax')})`;
        this.markReal();
        return;
      case 'RAdd':
      case 'RSub':
      case 'RMul':
      case 'RDiv': {
        const op = { RAdd: '+', RSub: '-', RMul: '*', RDiv: '/' }[name];
        this.realA = `(${this.realA} ${op} ${this.operandB()})`;
        this.markReal();
        return;
      }
      case 'RCmp':
        this.flags = { a: this.realA, b: this.operandB() };
        return;
      case 'RRound': {
        const v = `Round(${this.realA})`;
        this.setReg('ax', v);
        this.setReg('dx', `hi${v}`);
        return;
      }
    }
    this.emit(`call ${name}  ; ??? stack=[${this.stack.map((e) => e.e).join(', ')}]`);
  }
  long(hi: string, lo: string) {
    const h = this.reg(hi),
      l = this.reg(lo);
    if (h === `hi${l}` || h === `sx(${l})` || h === '0' || h === `hi(${l})` || h.startsWith('hi'))
      return l;
    return `${h}:${l}`;
  }
  markReal() {
    for (const x of ['ax', 'bx', 'dx']) this.r[x] = '⟨real⟩';
    this.realB = undefined;
  }
  operandB(): string {
    if (this.realB !== undefined) {
      const b = this.realB;
      this.realB = undefined;
      return b;
    }
    const [cx, si, di] = ['cx', 'si', 'di'].map((x) => this.reg(x));
    if ([cx, si, di].every(isImm)) return `${real48(immVal(cx), immVal(si), immVal(di))}`;
    return `real(${cx},${si},${di})`;
  }

  step(i: Insn) {
    const m = i.mnemonic;
    const ops = i.op.split(/,\s*/);
    const [d, s] = ops;
    const raw = () => {
      this.emit(`asm ${m} ${i.op}`);
      for (const x of ops) if (R16.includes(x) || LO[x] || HI[x]) this.setReg(x, `?${x}`);
    };
    switch (m) {
      case 'push': {
        const v = this.reg(d);
        if (['cs', 'ds', 'ss', 'es'].includes(d)) {
          this.push(d, 'seg');
          return;
        }
        if (v === '⟨real⟩') {
          this.push(this.realA, 'real');
          return;
        }
        if (d === 'dx' && (v.startsWith('hi') || v.startsWith('sx('))) {
          this.push(this.reg('ax'), 'hi');
          return;
        }
        this.push(R16.includes(d) ? v : this.read(d));
        return;
      }
      case 'pop': {
        const top = this.stack[this.stack.length - 1];
        if (top?.kind === 'real' && d === 'cx') {
          this.stack.pop();
          this.realB = top.e;
          this.realPops = 2;
          return;
        }
        if (this.realPops > 0 && (d === 'si' || d === 'di' || d === 'bx')) {
          this.realPops--;
          return;
        }
        if (this.hiPop !== undefined && (d === 'bx' || d === 'dx')) {
          this.setReg(d, `hi(${this.hiPop})`);
          this.hiPop = undefined;
          return;
        }
        if (
          top &&
          top.w === 2 &&
          !top.kind &&
          (d === 'cx' || d === 'ax') &&
          !top.e.startsWith('@') &&
          !top.e.startsWith('"')
        ) {
          this.stack.pop();
          this.setReg(d, top.e);
          this.hiPop = top.e;
          return;
        }
        this.write(d, this.popEntry());
        return;
      }
      case 'mov':
        this.write(d, this.read(s));
        return;
      case 'lea':
        this.setReg(d, `&${memName(s, this.segBase)}`);
        return;
      case 'les':
      case 'lds':
        this.setReg(d, `*${memName(s, this.segBase)}`);
        this.setReg(m === 'les' ? 'es' : 'ds', `seg(${memName(s, this.segBase)})`);
        return;
      case 'xor':
        if (d === s) {
          this.write(d, '0');
          if (!LO[d] && !HI[d] && !R16.includes(d)) return;
          this.flags = { a: '0', b: '0' };
          return;
        }
        break;
      case 'cdq':
      case 'cwd': {
        const a = this.reg('ax');
        this.r.dx = `sx(${a})`;
        return;
      }
      case 'cbw':
        return;
      case 'cmp':
        this.flags = { a: this.read(d), b: this.read(s) };
        return;
      case 'test':
        this.flags =
          d === s
            ? { a: this.read(d), b: '0' }
            : { a: `(${this.read(d)} and ${this.read(s)})`, b: '0' };
        return;
      case 'or':
        if (d === s) {
          this.flags = { a: this.read(d), b: '0' };
          return;
        }
        break;
      case 'inc':
      case 'dec': {
        const v = this.read(d),
          o = m === 'inc' ? '+' : '-';
        if (R16.includes(d) || LO[d]) this.setReg(d, `(${v} ${o} 1)`);
        else this.emit(`${v} := ${v} ${o} 1`);
        this.flags = { a: `${v} ${o} 1`, b: '0' };
        return;
      }
      case 'neg':
      case 'not': {
        const v = this.read(d);
        if (R16.includes(d) || LO[d]) this.setReg(d, m === 'neg' ? `-(${v})` : `not(${v})`);
        else this.emit(`${v} := ${m}(${v})`);
        return;
      }
      case 'mul':
      case 'imul': {
        if (ops.length !== 1) break;
        const a = d.startsWith('byte') || LO[d] ? this.reg('al') : this.reg('ax');
        const v = `(${a} * ${this.read(d)})`;
        this.setReg('ax', v);
        this.r.dx = `hi${v}`;
        return;
      }
      case 'div':
      case 'idiv': {
        const a = d.startsWith('byte') || LO[d] ? this.reg('ax') : this.long('dx', 'ax');
        const b = this.read(d);
        if (d.startsWith('byte') || LO[d]) {
          this.setReg('ax', `(${a} div ${b})`);
          this.r.ah = `(${a} mod ${b})`;
        } else {
          this.setReg('ax', `(${a} div ${b})`);
          this.r.dx = `(${a} mod ${b})`;
        }
        return;
      }
      case 'ret':
      case 'retf':
        this.emit('return');
        return;
      case 'jmp':
        if (isImm(d)) {
          this.emit(`goto L${hex(this.target(d))}`);
          this.snap(this.target(d));
          return;
        }
        break;
      case 'lcall': {
        if (i.bytes[0] !== 0x9a) break;
        const t = (i.bytes[3] | (i.bytes[4] << 8)) * 16 + (i.bytes[1] | (i.bytes[2] << 8));
        const nm = NAMES[segoff(t)];
        if (nm) {
          this.callRuntime(nm);
          return;
        }
        this.emit(`call far ${segoff(t)}`);
        return;
      }
      case 'call': {
        if (!isImm(d)) break;
        const t = this.target(d);
        const nm = NAMES[segoff(t)];
        if (nm) {
          this.callRuntime(nm);
          return;
        }
        const words = retWords(t);
        const args = this.popWords(words);
        this.emit(`p${hex(t, 4)}(${args.join(', ')})`);
        this.setReg('ax', `ret_p${hex(t, 4)}`);
        this.r.dx = `hi(ret_p${hex(t, 4)})`;
        return;
      }
      case 'nop':
      case 'cld':
      case 'wait':
        return;
      case 'xchg':
        if (R16.includes(d) && R16.includes(s)) {
          const t = this.reg(d);
          this.setReg(d, this.reg(s));
          this.setReg(s, t);
          return;
        }
        break;
    }
    if (m.startsWith('j') && isImm(d)) {
      this.jcc(m, this.target(d));
      return;
    }
    if (
      ['add', 'sub', 'and', 'or', 'xor', 'adc', 'sbb', 'shl', 'shr', 'sar'].includes(m) &&
      ops.length === 2
    ) {
      const sym: Record<string, string> = {
        add: '+',
        sub: '-',
        and: 'and',
        or: 'or',
        xor: 'xor',
        adc: '+c',
        sbb: '-c',
        shl: 'shl',
        shr: 'shr',
        sar: 'sar',
      };
      if (d === 'sp' && m === 'add' && isImm(s)) {
        this.popWords(immVal(s) / 2);
        return;
      }
      if (d === 'sp' && m === 'sub') {
        this.emit(`locals ${s}`);
        return;
      }
      if ((m === 'adc' || m === 'sbb') && d === 'dx') {
        this.setReg('dx', `hi${this.reg('ax')}`);
        return;
      }
      const v = `(${this.read(d)} ${sym[m]} ${this.read(s)})`;
      if (R16.includes(d) || LO[d] || HI[d]) this.setReg(d, v);
      else this.emit(`${this.read(d)} := ${v}`);
      this.flags = { a: v, b: '0' };
      return;
    }
    raw();
  }

  target(d: string) {
    return this.segBase * 16 + ((immVal(d) - this.segBase * 16) & 0xffff);
  }

  run(): string[] {
    const addrs = [...insns.keys()]
      .filter((a) => a >= this.start && a < this.end)
      .sort((a, b) => a - b);
    let prevFallsThrough = true;
    for (const a of addrs) {
      const i = insns.get(a)!;
      if (labels.has(a)) {
        const snaps = this.snapshots.get(a) ?? [];
        if (prevFallsThrough) snaps.push({ ...this.r });
        // keep only register values all predecessors agree on
        const merged: Record<string, string> = {};
        if (snaps.length && snaps.every((x) => x))
          for (const k of Object.keys(snaps[0]!))
            if (snaps.every((x) => x![k] === snaps[0]![k])) merged[k] = snaps[0]![k];
        this.r = snaps.length ? merged : {};
        this.flags = undefined;
        if (this.stack.length)
          this.out.push(`    ; stack carried: [${this.stack.map((e) => e.e).join(', ')}]`);
        this.out.push(`L${hex(a)}:`);
      }
      if (
        i.mnemonic === 'push' &&
        i.op === 'bp' &&
        insns.get(a + 1)?.mnemonic === 'mov' &&
        insns.get(a + 1)?.op === 'bp, sp'
      )
        continue;
      if (i.mnemonic === 'mov' && i.op === 'bp, sp') continue;
      if (i.mnemonic === 'mov' && i.op === 'sp, bp') continue;
      if (
        i.mnemonic === 'pop' &&
        i.op === 'bp' &&
        ['ret', 'retf'].includes(insns.get(a + 1)?.mnemonic ?? '')
      )
        continue;
      this.step(i);
      prevFallsThrough = !['jmp', 'ret', 'retf', 'ljmp', 'iret'].includes(i.mnemonic);
    }
    return this.out;
  }
}

const retWords = (proc: number): number => {
  const addrs = [...insns.keys()].filter((a) => a >= proc).sort((a, b) => a - b);
  for (const a of addrs) {
    const i = insns.get(a)!;
    if (i.mnemonic === 'ret' || i.mnemonic === 'retf') return i.op ? immVal(i.op) / 2 : 0;
  }
  return 0;
};

export const liftProc = (start: number): string[] => {
  const seg = segOf(start);
  const all = [...procs.keys()].filter((p) => segOf(p) === seg).sort((a, b) => a - b);
  const segEnd = Math.min(
    ...Object.keys(SEGMENTS)
      .map((k) => parseInt(k) * 16)
      .filter((x) => x > start)
  );
  const next = Math.min(all.find((p) => p > start) ?? segEnd, segEnd);
  const header = `;======== proc ${segoff(start)} args=${retWords(start)}w callers: ${[...(procs.get(start) ?? [])].join(' ')}`;
  return [header, ...new Lifter(start, next, seg).run()];
};

if (import.meta.main) {
  const want = process.argv.slice(2).map((x) => parseInt(x, 16));
  const list = want.length
    ? want
    : [...procs.keys()].filter((p) => segOf(p) === 0).sort((a, b) => a - b);
  for (const p of list) console.log(liftProc(p).join('\n') + '\n');
  void ENTRY;
}
