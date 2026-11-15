/**
 * The original's data segment layout (DS offsets of G.EXE) as a codec for `GameState`:
 * SAVE_R?.SAV / PLACES.SAV records and field snapshots that the tests compare with the
 * emulated original. Game code never touches bytes; it works on `GameState`.
 */
import { DS_INIT } from '../data/ds-init';
import { District, DsOffset, type TypeId } from '../tp/brands';
import { decodeCp866, encodeCp866 } from '../tp/cp866';
import { CHARACTER_CLASSES, CHARACTER_TYPES, ENEMIES, enemyAt } from './kinds';
import { type GameState, startGame, type StatKey } from './state';

/** SAVE_R?.SAV: the 694-byte record at DS:369C */
export function encodeSave(st: GameState): Uint8Array {
  return encode(st).saveRecord();
}

/** PLACES.SAV: seven known-place flags */
export function encodePlaces(st: GameState): Uint8Array {
  return encode(st).placesRecord();
}

/** loads a SAVE_R?.SAV record into the state (fields of the record only) */
export function decodeSave(st: GameState, record: Uint8Array) {
  const m = encode(st);
  m.loadRecord(record);
  decode(st, m, (f) => f.off >= SAVE_OFF && f.off < SAVE_OFF + SAVE_SIZE);
}

/** loads PLACES.SAV into the state */
export function decodePlaces(st: GameState, record: Uint8Array) {
  const m = encode(st);
  m.loadPlaces(record);
  decode(st, m, (f) => f.off >= PLACES_OFF && f.off < PLACES_OFF + PLACES_SIZE);
}

/** field-by-field view of the state as the original would hold it in memory */
export function snapshotState(st: GameState): Record<string, number | string> {
  return snapshot(encode(st).bytes);
}

/** the state written into a fresh data segment */
export function encode(st: GameState): Memory {
  const m = new Memory();
  for (const [name, [get]] of Object.entries(BINDINGS) as [FieldName, Binding][])
    m.set(
      LAYOUT[name],
      typeof get(st) === 'boolean' ? Number(get(st)) : (get(st) as number | string)
    );
  for (let level = 1; level <= 40; level++)
    m.setHistory(
      level,
      (st.player.progression.history[level] ?? []).map((k) => STAT_CODE[k]).join('')
    );
  return m;
}

function decode(st: GameState, m: Memory, include: (f: Field) => boolean) {
  for (const [name, [, set]] of Object.entries(BINDINGS) as [FieldName, Binding][])
    if (include(LAYOUT[name])) set(st, m.get(LAYOUT[name]));
  if (include(LAYOUT.level))
    for (let level = 1; level <= 40; level++)
      st.player.progression.history[level] = [...m.history(level)].map((c) => CODE_STAT[c]);
}

type Binding = readonly [
  (st: GameState) => number | string | boolean,
  (st: GameState, v: number | string) => void,
];

const STAT_CODE: Record<StatKey, string> = {
  strength: '1',
  agility: '2',
  vitality: '3',
  luck: '4',
};
const CODE_STAT: Record<string, StatKey> = {
  1: 'strength',
  2: 'agility',
  3: 'vitality',
  4: 'luck',
};

/** how every LAYOUT field maps to the state */
const BINDINGS: Record<FieldName, Binding> = {
  district: [(s) => s.world.district, (s, v) => (s.world.district = District(Number(v)))],
  trail: flag((s) => s.world, 'trail'),
  knowsMarket: flag((s) => s.world.places, 'market'),
  knowsDealers: flag((s) => s.world.places, 'dealers'),
  denAccess: flag((s) => s.world.places, 'den'),
  hasGirl: flag((s) => s.world.places, 'girlfriend'),
  knowsHospital: flag((s) => s.world.places, 'hospital'),
  knowsClub: flag((s) => s.world.places, 'club'),
  knowsGym: flag((s) => s.world.places, 'gym'),
  version: [(s) => s.version, (s, v) => (s.version = String(v))],
  name: [(s) => s.player.name, (s, v) => (s.player.name = String(v))],
  charType: [
    (s) => (s.phase === 'started' ? CHARACTER_CLASSES[s.player.type].tier : s.typeChoice),
    (s, v) => {
      const type = CHARACTER_TYPES.find((t) => CHARACTER_CLASSES[t].tier === v);
      if (!type) throw new Error(`save holds an unknown character type ${v}`);
      startGame(s, type);
    },
  ],
  str: num((s) => s.player.stats, 'strength'),
  agi: num((s) => s.player.stats, 'agility'),
  vit: num((s) => s.player.stats, 'vitality'),
  luck: num((s) => s.player.stats, 'luck'),
  level: num((s) => s.player.progression, 'level'),
  dmgMin: num((s) => s.player.damage, 'min'),
  dmgMax: num((s) => s.player.damage, 'max'),
  hp: num((s) => s.player.health, 'current'),
  hpMax: num((s) => s.player.health, 'max'),
  jawBroken: flag((s) => s.player.injuries, 'jaw'),
  legBroken: flag((s) => s.player.injuries, 'leg'),
  armor: num((s) => s.player, 'armor'),
  glasses: flag((s) => s.player.body.eyes, 'glasses'),
  abibas: flag((s) => s.player.body.torso, 'abibas'),
  boots: flag((s) => s.player.body.feet, 'boots'),
  leather: flag((s) => s.player.body.torso, 'leather'),
  adidas: flag((s) => s.player.body.torso, 'adidas'),
  boots2: flag((s) => s.player.body.feet, 'coolBoots'),
  leather2: flag((s) => s.player.body.torso, 'coolLeather'),
  knuckles: flag((s) => s.player.body.hands.weapons, 'knuckles'),
  phone: flag((s) => s.player.body.pockets, 'phone'),
  tattoo: flag((s) => s.player.body.skin, 'tattoo'),
  cross: flag((s) => s.player.body.neck, 'cross'),
  ringGs: flag((s) => s.player.body.hands.rings, 'spasi'),
  ringPg: flag((s) => s.player.body.hands.rings, 'pomogi'),
  megaRing: flag((s) => s.player.body.hands.rings, 'mega'),
  ringGp: flag((s) => s.player.body.hands.rings, 'pomiluy'),
  knife: flag((s) => s.player.body.hands.weapons, 'knife'),
  beer: num((s) => s.player.resources, 'beer'),
  joints: num((s) => s.player.resources, 'joints'),
  money: num((s) => s.player.resources, 'money'),
  junk: num((s) => s.player.resources, 'junk'),
  respect: num((s) => s.player, 'respect'),
  stoned: num((s) => s.player, 'stoned'),
  exp: num((s) => s.player.progression, 'exp'),
  expNext: num((s) => s.player.progression, 'expNext'),
  mouthGuard: flag((s) => s.player.body.mouth, 'guard'),
  club: flag((s) => s.player.body.hands.weapons, 'club'),
  cleaver: flag((s) => s.player.body.hands.weapons, 'cleaver'),
  // the pistol owns the silencer and the bullets; decode order: pistol, silencer, bullets
  pistol: [
    (s) => s.player.body.pockets.pistol !== null,
    (s, v) => (s.player.body.pockets.pistol = v ? { silencer: false, bullets: 0 } : null),
  ],
  silencer: [
    (s) => s.player.body.pockets.pistol?.silencer ?? false,
    (s, v) => {
      if (s.player.body.pockets.pistol) s.player.body.pockets.pistol.silencer = !!v;
    },
  ],
  bullets: [
    (s) => s.player.body.pockets.pistol?.bullets ?? 0,
    (s, v) => {
      if (s.player.body.pockets.pistol) s.player.body.pockets.pistol.bullets = Number(v);
    },
  ],
  templeVisits: num((s) => s.world, 'templeVisits'),
  eType: [(s) => ENEMIES[s.enemy.type].tier, (s, v) => (s.enemy.type = enemyAt(Number(v)))],
  eStr: num((s) => s.enemy.stats, 'strength'),
  eAgi: num((s) => s.enemy.stats, 'agility'),
  eVit: num((s) => s.enemy.stats, 'vitality'),
  eLuck: num((s) => s.enemy.stats, 'luck'),
  eLevel: num((s) => s.enemy, 'level'),
  eDmgMin: num((s) => s.enemy.damage, 'min'),
  eDmgMax: num((s) => s.enemy.damage, 'max'),
  eHp: num((s) => s.enemy.health, 'current'),
  eHpMax: num((s) => s.enemy.health, 'max'),
  eJawBroken: flag((s) => s.enemy.injuries, 'jaw'),
  eLegBroken: flag((s) => s.enemy.injuries, 'leg'),
  eArmor: num((s) => s.enemy, 'armor'),
  eBeer: num((s) => s.enemy.loot, 'beer'),
  eMoney: num((s) => s.enemy.loot, 'money'),
  eJunk: num((s) => s.enemy.loot, 'junk'),
  event: num((s) => s.scratch, 'event'),
  eventRoll: num((s) => s.scratch, 'eventRoll'),
  cmd: text((s) => s.scratch, 'cmd'),
  input: text((s) => s.scratch, 'input'),
  engaged: flag((s) => s.scratch, 'engaged'),
  found: num((s) => s.scratch, 'found'),
  marketHeat: num((s) => s.world.heat, 'market'),
  clubHeat: num((s) => s.world.heat, 'club'),
  denQuestHelp: flag((s) => s.world.den, 'helpQuest'),
  denQuestJob: flag((s) => s.world.den, 'jobQuest'),
  color: num((s) => s.scratch, 'color'),
  tmp: text((s) => s.scratch, 'tmp'),
  valCode: num((s) => s.scratch, 'valCode'),
  sneak: num((s) => s.scratch, 'sneak'),
  backup: num((s) => s.combat, 'backup'),
  bet: num((s) => s.scratch, 'bet'),
  rector: flag((s) => s.world, 'rector'),
  saveCount: num((s) => s.scratch, 'saveCount'),
  saveKey: num((s) => s.scratch, 'saveKey'),
  dir: text((s) => s.scratch, 'dir'),
  phoneCalls: num((s) => s.world, 'dealerCalls'),
  sold: num((s) => s.scratch, 'sold'),
  press: num((s) => s.scratch, 'press'),
  loans: num((s) => s.world.den, 'loans'),
};

/** a field of some object of the state; the codec is the one place that addresses fields by name */
type Holder = (s: GameState) => object;

function num(obj: Holder, key: string): Binding {
  return [
    (s) => (obj(s) as Record<string, number>)[key],
    (s, v) => ((obj(s) as Record<string, number>)[key] = Number(v)),
  ];
}
function flag(obj: Holder, key: string): Binding {
  return [
    (s) => (obj(s) as Record<string, boolean>)[key],
    (s, v) => ((obj(s) as Record<string, boolean>)[key] = v !== 0),
  ];
}
function text(obj: Holder, key: string): Binding {
  return [
    (s) => (obj(s) as Record<string, string>)[key],
    (s, v) => ((obj(s) as Record<string, string>)[key] = String(v)),
  ];
}

type Kind = 'u8' | 'i16' | 'str';
/** a variable of the data segment; `T` is the (possibly branded) value type seen by the game */
interface Field<K extends Kind = Kind, T = unknown> {
  readonly off: DsOffset;
  readonly kind: K;
  readonly cap?: number;
  readonly __value?: T;
}

function u8<T extends number = number>(off: number): Field<'u8', T> {
  return { off: DsOffset(off), kind: 'u8' };
}
function i16<T extends number = number>(off: number): Field<'i16', T> {
  return { off: DsOffset(off), kind: 'i16' };
}
function str(off: number, cap = 255): Field<'str', string> {
  return { off: DsOffset(off), kind: 'str', cap };
}

export const LAYOUT = {
  // --- district / known places (PLACES.SAV = 0x3694..0x369A)
  district: u8<District>(0x3692),
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
  charType: i16<TypeId>(0x389c), // 3 пацан, 4 отморозок, 5 гопник, 6 вор (0..4 while choosing)
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
  eType: i16<TypeId>(0x3952),
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

  constructor() {
    this.bytes.set(DS_INIT);
  }

  /** Pascal string at a DS offset */
  pstr(off: DsOffset): string {
    const o = off & 0xffff;
    return decodeCp866(this.bytes.subarray(o + 1, o + 1 + this.bytes[o]));
  }

  /** TYPE_NAMES[i] as the original indexes it: DS:002E + i*256 (no bounds) */
  typeName(i: TypeId): string {
    return this.pstr(DsOffset((i << 8) + 0x2e));
  }

  /** RANK_NAMES[i] as the original indexes it: DS:0B42 + i*256 (no bounds) */
  rankName(i: number): string {
    return this.pstr(DsOffset((i << 8) + 0xb42));
  }

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

/** field-by-field snapshot used to compare against the emulated original */
export function snapshot(bytes: Uint8Array, base = 0): Record<string, number | string> {
  const m = new Memory();
  m.bytes.set(bytes.subarray(base + DS_LO, base + DS_HI), DS_LO);
  const out: Record<string, number | string> = {};
  for (const [k, f] of Object.entries(LAYOUT) as [FieldName, Field][]) out[k] = m.get(f);
  for (let lvl = 1; lvl <= 40; lvl++) out[`history${lvl}`] = m.history(lvl);
  return out;
}
