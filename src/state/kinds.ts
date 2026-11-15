/**
 * Who is who: the hero's character classes and the kinds of enemies. Both come from one type
 * table of the original (DS:002E names, DS:0002 stat weights); `tier` is the row in that table —
 * the original's formulas (loot, respect, spawn limits) still compute with it.
 */
import { STAT_WEIGHTS, TYPE_NAMES } from '../data/tables';

/** classes in the order of the creation menu (0..3) */
export const CHARACTER_TYPES = ['patsan', 'otmorozok', 'gopnik', 'vor'] as const;

export type CharacterType = (typeof CHARACTER_TYPES)[number];

export interface CharacterClass {
  readonly id: CharacterType;
  /** row of the type table */
  readonly tier: number;
  readonly name: string;
  /** stats right after choosing the class */
  readonly start: StatValues;
  /** chances of each stat on a level-up (out of their sum, 12) */
  readonly weights: StatValues;
  /** what the class gets for free at the start of a district */
  readonly bonus: string;
}

export const CHARACTER_CLASSES: Readonly<Record<CharacterType, CharacterClass>> = {
  patsan: characterClass('patsan', 3, [3, 3, 3, 3], 'girlfriend and club'),
  otmorozok: characterClass('otmorozok', 4, [5, 2, 4, 1], 'heals one point per walk'),
  gopnik: characterClass('gopnik', 5, [4, 3, 3, 2], 'den access'),
  vor: characterClass('vor', 6, [3, 3, 2, 4], 'dealers; finds money while walking'),
};

/** enemy kinds by tier (the order of the original table) */
export const ENEMY_KINDS = [
  'dohlyak',
  'nefor',
  'nark',
  'podtsan',
  'otmorozok',
  'gopnik',
  'vor',
  'bespredelshchik',
  'ment',
  'manyak',
  'rector',
] as const;

export type EnemyKind = (typeof ENEMY_KINDS)[number];

/** how the game treats a kind: greetings, loot, whether a rank title is shown */
export type EnemyGroup = 'weakling' | 'lad' | 'thug' | 'cop' | 'maniac' | 'boss';

export interface EnemyKindInfo {
  readonly id: EnemyKind;
  /** row of the type table: spawn arithmetic, loot and respect formulas use it */
  readonly tier: number;
  readonly name: string;
  readonly group: EnemyGroup;
  /** distribution of the stat points an enemy of this kind gets */
  readonly weights: StatValues;
}

const GROUPS: Readonly<Record<EnemyKind, EnemyGroup>> = {
  dohlyak: 'weakling',
  nefor: 'weakling',
  nark: 'weakling',
  podtsan: 'lad',
  otmorozok: 'lad',
  gopnik: 'lad',
  vor: 'lad',
  bespredelshchik: 'thug',
  ment: 'cop',
  manyak: 'maniac',
  rector: 'boss',
};

export const ENEMIES: Readonly<Record<EnemyKind, EnemyKindInfo>> = Object.fromEntries(
  ENEMY_KINDS.map((id, tier) => [
    id,
    {
      id,
      tier,
      name: TYPE_NAMES[tier],
      group: GROUPS[id],
      weights: values(STAT_WEIGHTS[tier]),
    },
  ])
) as Record<EnemyKind, EnemyKindInfo>;

/** the enemy kind in a row of the type table */
export function enemyAt(tier: number): EnemyKind {
  const kind: EnemyKind | undefined = ENEMY_KINDS[tier];
  if (!kind) throw new Error(`no enemy kind at tier ${tier}`);
  return kind;
}

export interface StatValues {
  readonly strength: number;
  readonly agility: number;
  readonly vitality: number;
  readonly luck: number;
}

function characterClass(
  id: CharacterType,
  tier: number,
  start: readonly [number, number, number, number],
  bonus: string
): CharacterClass {
  return {
    id,
    tier,
    name: TYPE_NAMES[tier],
    start: values(start),
    weights: values(STAT_WEIGHTS[tier]),
    bonus,
  };
}

function values([strength, agility, vitality, luck]: readonly number[]): StatValues {
  return { strength, agility, vitality, luck };
}
