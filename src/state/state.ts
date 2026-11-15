/**
 * The game state as plain TypeScript objects, grouped by meaning. Invalid combinations are
 * excluded by the types (flags are booleans, a silencer only exists on a pistol, the character
 * type is a union). The byte layout of the original lives only in `legacy.ts` (saves and the
 * comparison with the emulated original). Numbers are Turbo Pascal Integers/Bytes: game code
 * wraps them explicitly (`i16`, `u8`) when it writes them.
 */
import type { District, TypeId } from '../tp/brands';

/** a fresh game: title screen, save selection and character creation still ahead */
export function createState(): GameState {
  return {
    phase: 'not-started',
    typeChoice: 0,
    version: '',
    world: {
      district: 0 as District,
      trail: false,
      places: {
        market: false,
        dealers: false,
        den: false,
        girlfriend: false,
        hospital: false,
        club: false,
        gym: false,
      },
      heat: { market: 0, club: 0 },
      den: { loans: 0, helpQuest: false, jobQuest: false },
      dealerCalls: 0,
      templeVisits: 0,
      rector: false,
    },
    player: {
      name: '',
      stats: { strength: 0, agility: 0, vitality: 0, luck: 0 },
      health: { current: 0, max: 0 },
      damage: { min: 0, max: 0 },
      armor: 0,
      injuries: { jaw: false, leg: false },
      progression: { level: 0, exp: 0, expNext: 0, history: [] },
      resources: { money: 0, beer: 0, joints: 0, junk: 0 },
      respect: 0,
      stoned: 0,
      body: {
        eyes: { glasses: false },
        mouth: { guard: false },
        neck: { cross: false },
        skin: { tattoo: false },
        torso: { abibas: false, adidas: false, leather: false, coolLeather: false },
        feet: { boots: false, coolBoots: false },
        hands: {
          weapons: { knuckles: false, club: false, knife: false, cleaver: false },
          rings: { spasi: false, pomogi: false, mega: false, pomiluy: false },
        },
        pockets: { phone: false, pistol: null },
      },
    },
    enemy: {
      type: 0 as TypeId,
      level: 0,
      stats: { strength: 0, agility: 0, vitality: 0, luck: 0 },
      health: { current: 0, max: 0 },
      damage: { min: 0, max: 0 },
      armor: 0,
      injuries: { jaw: false, leg: false },
      loot: { beer: 0, money: 0, junk: 0 },
    },
    combat: { backup: 0 },
    scratch: {
      cmd: '',
      input: '',
      tmp: '',
      dir: '',
      valCode: 0,
      event: 0,
      eventRoll: 0,
      engaged: false,
      found: 0,
      color: 0,
      sneak: 0,
      bet: 0,
      sold: 0,
      press: 0,
      saveCount: 0,
      saveKey: 0,
    },
  };
}

export type GameState = NotStartedGame | StartedGame;

/** before the character exists: title, save menu, story, choosing a type */
export interface NotStartedGame extends CommonState {
  readonly phase: 'not-started';
  /** the typed character choice (0..4, any Integer) */
  typeChoice: number;
  readonly player: PlayerBase;
}

/** a created (or loaded) character walks the districts */
export interface StartedGame extends CommonState {
  readonly phase: 'started';
  readonly player: Player;
}

/** the only transition between the phases: the character got its type */
export function startGame(st: GameState, type: CharacterType): StartedGame {
  const started = st as unknown as { phase: string; typeChoice?: number; player: Player };
  started.phase = 'started';
  delete started.typeChoice;
  started.player.type = type;
  return st as StartedGame;
}

/** the state of a running game; the game never asks for it before the start */
export function playing(st: GameState): StartedGame {
  if (st.phase !== 'started') throw new Error('the game has not started yet');
  return st;
}

interface CommonState {
  /** version banner stored at the start of every save */
  version: string;
  readonly world: World;
  readonly enemy: Enemy;
  readonly combat: Combat;
  readonly scratch: Scratch;
}

// ------------------------------------------------------------------ world

export interface World {
  /** 1..5; 0 only while a SAVE_R0 is being loaded */
  district: District;
  /** on a bandit path: enemies are tougher, shooting is safe */
  trail: boolean;
  /** places the hero knows in this district (PLACES.SAV) */
  readonly places: KnownPlaces;
  /** walks left until the cops forget the hero at the market / in the club */
  readonly heat: { market: number; club: number };
  readonly den: Den;
  /** walks counted until the dealers call about the silencer (25) */
  dealerCalls: number;
  /** 0 first visit, 1 second, 2 and more */
  templeVisits: number;
  /** the final fight with the rector is on */
  rector: boolean;
}

export interface KnownPlaces {
  market: boolean;
  dealers: boolean;
  /** access to the den (притон) */
  den: boolean;
  girlfriend: boolean;
  hospital: boolean;
  club: boolean;
  gym: boolean;
}

export interface Den {
  /** 2-rouble loans left (refills one per walk up to district*10) */
  loans: number;
  /** "a lad is being bullied" quest (command hp) */
  helpQuest: boolean;
  /** "there is a job" quest (command d) */
  jobQuest: boolean;
}

// ------------------------------------------------------------------ fighters

export type CharacterType = 'patsan' | 'otmorozok' | 'gopnik' | 'vor';

export type StatKey = 'strength' | 'agility' | 'vitality' | 'luck';

export interface Stats {
  strength: number;
  agility: number;
  vitality: number;
  luck: number;
}

export interface Health {
  current: number;
  max: number;
}

export interface Damage {
  min: number;
  max: number;
}

export interface Injuries {
  jaw: boolean;
  leg: boolean;
}

export interface Player extends PlayerBase {
  type: CharacterType;
}

/** everything of the hero except the type, which only exists once the game has started */
export interface PlayerBase {
  name: string;
  readonly stats: Stats;
  readonly health: Health;
  readonly damage: Damage;
  armor: number;
  readonly injuries: Injuries;
  readonly progression: Progression;
  readonly resources: Resources;
  /** понтовость among the den's lads */
  respect: number;
  /** walks (or fight turns) left under a joint; 0 = sober */
  stoned: number;
  readonly body: Body;
}

export interface Progression {
  level: number;
  exp: number;
  expNext: number;
  /** stats gained on each level-up (index = level, at most two) — running away takes them back */
  readonly history: StatKey[][];
}

export interface Resources {
  money: number;
  /** half-litres */
  beer: number;
  joints: number;
  /** junk to sell to the dealers */
  junk: number;
}

export interface Enemy {
  /** index into the type table (0 Дохляк .. 9 Маньячок, 10 Ректор) */
  type: TypeId;
  level: number;
  readonly stats: Stats;
  readonly health: Health;
  readonly damage: Damage;
  armor: number;
  readonly injuries: Injuries;
  readonly loot: { beer: number; money: number; junk: number };
}

// ------------------------------------------------------------------ equipment by body slot

export interface Body {
  readonly eyes: { glasses: boolean };
  /** boxer's mouth guard: -75% chance of a broken jaw */
  readonly mouth: { guard: boolean };
  readonly neck: { cross: boolean };
  /** prison tattoo: halves the chance of being attacked */
  readonly skin: { tattoo: boolean };
  /** a spare piece can be kept and sold to the dealers */
  readonly torso: { abibas: boolean; adidas: boolean; leather: boolean; coolLeather: boolean };
  readonly feet: { boots: boolean; coolBoots: boolean };
  readonly hands: { readonly weapons: Weapons; readonly rings: Rings };
  readonly pockets: { phone: boolean; pistol: Pistol | null };
}

export interface Weapons {
  knuckles: boolean;
  club: boolean;
  knife: boolean;
  cleaver: boolean;
}

export interface Rings {
  /** "Господи спаси": luck +1 */
  spasi: boolean;
  /** "Помоги Господи": all +1 */
  pomogi: boolean;
  /** Мега Кольцо: all +4 */
  mega: boolean;
  /** "Господи помилуй": self-healing */
  pomiluy: boolean;
}

export interface Pistol {
  silencer: boolean;
  bullets: number;
}

// ------------------------------------------------------------------ transient

export interface Combat {
  /** backup counter: 1..2 waiting, 3.. fighting, 7 beaten */
  backup: number;
}

/**
 * Working variables the original keeps in its data segment between procedures. They are part
 * of the state because the original's behaviour depends on them (e.g. a fight overwrites the
 * input a place loop checks next) and the comparison with the original covers them.
 */
export interface Scratch {
  /** last main-loop command */
  cmd: string;
  /** last answer inside places, fights and questions */
  input: string;
  tmp: string;
  dir: string;
  valCode: number;
  event: number;
  eventRoll: number;
  engaged: boolean;
  found: number;
  /** colour digit of the last price line */
  color: number;
  sneak: number;
  bet: number;
  sold: number;
  press: number;
  saveCount: number;
  saveKey: number;
}

/** the type table index of a character type */
export const TYPE_ID: Record<CharacterType, number> = {
  patsan: 3,
  otmorozok: 4,
  gopnik: 5,
  vor: 6,
};

export const CHARACTER_TYPES: readonly CharacterType[] = ['patsan', 'otmorozok', 'gopnik', 'vor'];
