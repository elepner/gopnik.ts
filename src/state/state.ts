/**
 * The game state as plain TypeScript objects, grouped by meaning. Invalid combinations are
 * excluded by the types (flags are booleans, a silencer only exists on a pistol, the character
 * type is a union). The byte layout of the original lives only in `legacy.ts` (saves and the
 * comparison with the emulated original). Numbers are Turbo Pascal Integers/Bytes: game code
 * wraps them explicitly (`i16`, `u8`) when it writes them.
 */
import type { District } from '../tp/brands';
import type { CharacterType, EnemyKind } from './kinds';

export type { CharacterType, EnemyKind } from './kinds';

/** a fresh game: title screen, save selection and character creation still ahead */
export function createState(): GameState {
  return {
    phase: 'not-started',
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
      base: {
        strength: 0,
        agility: 0,
        vitality: 0,
        luck: 0,
        damageMin: 0,
        damageMax: 0,
        armor: 0,
        healthMax: 0,
      },
      boosts: {},
      health: { current: 0 },
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
      type: 'dohlyak',
      level: 0,
      stats: { strength: 0, agility: 0, vitality: 0, luck: 0 },
      health: { current: 0, max: 0 },
      damage: { min: 0, max: 0 },
      armor: 0,
      injuries: { jaw: false, leg: false },
      loot: { beer: 0, money: 0, junk: 0 },
    },
    combat: { backup: 0 },
    session: { lastAnswer: '' },
  };
}

export type GameState = NotStartedGame | Game;

/** before the character exists: title, save menu, story, choosing a type */
export interface NotStartedGame extends CommonState {
  readonly phase: 'not-started';
  readonly player: PlayerBase;
}

/** a created (or loaded) character walks the districts */
export interface Game extends CommonState {
  readonly phase: 'started';
  readonly player: Player;
}

/** the only transition between the phases: the character got its type */
export function startGame(st: GameState, type: CharacterType): Game {
  const started = st as unknown as { phase: string; player: Player };
  started.phase = 'started';
  started.player.type = type;
  return st as Game;
}

/** the state of a running game; the game never asks for it before the start */
export function playing(st: GameState): Game {
  if (st.phase !== 'started') throw new Error('the game has not started yet');
  return st;
}

interface CommonState {
  /** version banner stored at the start of every save */
  version: string;
  readonly world: World;
  readonly enemy: Enemy;
  readonly combat: Combat;
  readonly session: Session;
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

export type StatKey = 'strength' | 'agility' | 'vitality' | 'luck';

/** what a hero is made of: the four stats, damage, armor and maximum health */
export type Attribute = StatKey | 'damageMin' | 'damageMax' | 'armor' | 'healthMax';

export type Attributes = Record<Attribute, number>;

/** where a boost comes from: things worn, or a joint (weapons are not added up: the best counts) */
export type BoostSource = 'rings' | 'cross' | 'clothes' | 'joint';

/** what each source adds, as it was added (the original adds differences, not totals) */
export type Boosts = { [S in BoostSource]?: Partial<Attributes> };

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
  /**
   * stats, damage, armor and maximum health: what training and levels gave; items and effects
   * add their `boosts` on top (`attributes.ts` reads and changes them)
   */
  readonly base: Attributes;
  readonly boosts: Boosts;
  readonly health: { current: number };
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
  type: EnemyKind;
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

/** the conversation with the player */
export interface Session {
  /**
   * The last answer typed in a place, a fight or to a question. One string shared by all of them,
   * like in the original: a fight started inside a place leaves its last command here, and the
   * place's loop goes on checking it.
   */
  lastAnswer: string;
}
