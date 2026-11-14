/**
 * Game state laid out exactly like the original data segment (DS offsets of G.EXE).
 * Byte-exact layout gives Turbo Pascal wrap-around semantics for free, makes
 * SAVE_R*.SAV files interchangeable with the original, and lets tests diff the
 * TS state against the emulated original field by field.
 */
import { decodeCp866, encodeCp866 } from '../tp/cp866.ts';

/** fresh zeroed data segment plus a named-field view over it */
export function createState(): { readonly mem: Memory; readonly st: State } {
  const mem = new Memory();
  return { mem, st: stateView(mem) };
}

type Kind = 'u8' | 'i16' | 'str';
interface Field<K extends Kind = Kind> {
  readonly off: number;
  readonly kind: K;
  readonly cap?: number;
}

function u8(off: number): Field<'u8'> {
  return { off, kind: 'u8' };
}
function i16(off: number): Field<'i16'> {
  return { off, kind: 'i16' };
}
function str(off: number, cap = 255): Field<'str'> {
  return { off, kind: 'str', cap };
}

export const LAYOUT = {
  // --- district / known places (PLACES.SAV = 0x3694..0x369A)
  district: u8(0x3692), // 1..5
  trail: u8(0x3693), // on a "bandit" path where shooting is allowed
  knowsMarket: u8(0x3694),
  knowsDealers: u8(0x3695),
  denAccess: u8(0x3696), // притон
  hasGirl: u8(0x3697),
  knowsHospital: u8(0x3698),
  knowsClub: u8(0x3699),
  knowsGym: u8(0x369a),

  // --- SAVE_R?.SAV record: 0x369C..0x3951 (694 bytes)
  version: str(0x369c),
  name: str(0x379c),
  charType: i16(0x389c), // index into TYPE_NAMES: 3 пацан, 4 отморозок, 5 гопник, 6 вор
  str: i16(0x389e),
  agi: i16(0x38a0),
  vit: i16(0x38a2),
  luck: i16(0x38a4),
  level: i16(0x38a6),
  dmgMin: i16(0x38a8),
  dmgMax: i16(0x38aa),
  hp: i16(0x38ac),
  hpMax: i16(0x38ae),
  jawBroken: u8(0x38b0),
  legBroken: u8(0x38b1),
  armor: u8(0x38b2),
  glasses: u8(0x38b3),
  abibas: u8(0x38b4),
  boots: u8(0x38b5),
  leather: u8(0x38b6),
  adidas: u8(0x38b7),
  boots2: u8(0x38b8),
  leather2: u8(0x38b9),
  knuckles: u8(0x38ba),
  phone: u8(0x38bb),
  tattoo: u8(0x38bc),
  cross: u8(0x38bd),
  ringGs: u8(0x38be),
  ringPg: u8(0x38bf),
  megaRing: u8(0x38c0),
  ringGp: u8(0x38c1), // self-healing
  knife: u8(0x38c2),
  beer: i16(0x38c3), // half-litres
  joints: i16(0x38c5),
  money: i16(0x38c7),
  junk: i16(0x38c9),
  respect: i16(0x38cb), // понтовость в притоне
  stoned: u8(0x38cd),
  exp: i16(0x38ce),
  expNext: i16(0x38d0),
  // 0x38CF + 3*level: string[2] history of which stat grew on each level-up
  mouthGuard: u8(0x394a),
  club: u8(0x394b), // дубинка
  cleaver: u8(0x394c), // тесак
  pistol: u8(0x394d),
  silencer: u8(0x394e),
  bullets: i16(0x394f),
  templeVisits: u8(0x3951),

  // --- current enemy
  eType: i16(0x3952),
  eStr: i16(0x3954),
  eAgi: i16(0x3956),
  eVit: i16(0x3958),
  eLuck: i16(0x395a),
  eLevel: i16(0x395c),
  eDmgMin: i16(0x395e),
  eDmgMax: i16(0x3960),
  eHp: i16(0x3962),
  eHpMax: i16(0x3964),
  eJawBroken: u8(0x3966),
  eLegBroken: u8(0x3967),
  eArmor: u8(0x3968),
  eBeer: i16(0x396a),
  eMoney: i16(0x396c),
  eJunk: i16(0x396e),

  // --- walking / misc
  event: u8(0x3970),
  eventRoll: u8(0x3971),
  cmd: str(0x3972),
  input: str(0x3a72),
  engaged: u8(0x3b72),
  found: i16(0x3b74),
  marketHeat: u8(0x3b76), // менты на базаре
  clubHeat: u8(0x3b77),
  denQuestHelp: u8(0x3b78),
  denQuestJob: u8(0x3b79),
  color: u8(0x3b7a),
  tmp: str(0x3b7c),
  valCode: i16(0x3c7c),
  sneak: i16(0x3c7e),
  backup: i16(0x3c80), // подмога
  bet: u8(0x3c82),
  rector: u8(0x3c83),
  saveCount: u8(0x3d04),
  saveKey: u8(0x3d31),
  dir: str(0x3d32),
  phoneCalls: u8(0x3e32),
  sold: u8(0x3e33),
  press: u8(0x3e34),
  loans: u8(0x3e35),
} as const satisfies Record<string, Field>;

export type FieldName = keyof typeof LAYOUT;
export type State = {
  -readonly [K in FieldName]: (typeof LAYOUT)[K]['kind'] extends 'str' ? string : number;
};

export const DS_LO = 0x3692;
export const DS_HI = 0x3e36;
export const SAVE_OFF = 0x369c;
export const SAVE_SIZE = 694;
export const PLACES_OFF = 0x3694;
export const PLACES_SIZE = 7;
const HISTORY_OFF = 0x38cf;

/** a slice of the data segment with typed accessors for every LAYOUT field */
export class Memory {
  readonly bytes = new Uint8Array(0x10000);
  readonly view = new DataView(this.bytes.buffer);

  get(f: Field): number | string {
    switch (f.kind) {
      case 'u8':
        return this.bytes[f.off];
      case 'i16':
        return this.view.getInt16(f.off, true);
      case 'str':
        return decodeCp866(this.bytes.subarray(f.off + 1, f.off + 1 + this.bytes[f.off]));
    }
  }

  set(f: Field, v: number | string) {
    switch (f.kind) {
      case 'u8':
        this.bytes[f.off] = Number(v) & 0xff;
        return;
      case 'i16':
        this.view.setInt16(f.off, (Number(v) << 16) >> 16, true);
        return;
      case 'str': {
        const b = encodeCp866(String(v)).subarray(0, f.cap);
        this.bytes[f.off] = b.length;
        this.bytes.set(b, f.off + 1);
      }
    }
  }

  /** string[2] at 0x38CF + 3*level */
  history(level: number): string {
    const off = HISTORY_OFF + level * 3;
    return decodeCp866(this.bytes.subarray(off + 1, off + 1 + Math.min(this.bytes[off], 2)));
  }
  setHistory(level: number, s: string) {
    const off = HISTORY_OFF + level * 3;
    const b = encodeCp866(s).subarray(0, 2);
    this.bytes[off] = b.length;
    this.bytes.set(b, off + 1);
  }

  saveRecord(): Uint8Array {
    return this.bytes.slice(SAVE_OFF, SAVE_OFF + SAVE_SIZE);
  }
  loadRecord(rec: Uint8Array) {
    this.bytes.set(rec.subarray(0, SAVE_SIZE), SAVE_OFF);
  }
  placesRecord(): Uint8Array {
    return this.bytes.slice(PLACES_OFF, PLACES_OFF + PLACES_SIZE);
  }
  loadPlaces(rec: Uint8Array) {
    this.bytes.set(rec.subarray(0, PLACES_SIZE), PLACES_OFF);
  }
}

/** plain-property view over Memory: `st.hp -= 3` wraps exactly like an Integer */
export function stateView(mem: Memory): State {
  const o = {} as State;
  for (const [k, f] of Object.entries(LAYOUT) as [FieldName, Field][])
    Object.defineProperty(o, k, {
      get: () => mem.get(f),
      set: (v) => {
        mem.set(f, v);
      },
      enumerable: true,
    });
  return o;
}

/** field-by-field snapshot used to compare against the emulated original */
export function snapshot(bytes: Uint8Array, base = 0): Record<string, number | string> {
  const m = new Memory();
  m.bytes.set(bytes.subarray(base + DS_LO, base + DS_HI), DS_LO);
  const out: Record<string, number | string> = {};
  for (const [k, f] of Object.entries(LAYOUT) as [FieldName, Field][]) out[k] = m.get(f);
  for (let lvl = 1; lvl <= 40; lvl++) out[`history${lvl}`] = m.history(lvl);
  return out;
}
