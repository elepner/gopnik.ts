/** Names of classes, enemy kinds and ranks; ranks are read from the original's data image. */
import { CHARACTER_CLASSES, type CharacterType, ENEMIES, type EnemyKind } from './kinds';
import { Memory } from './legacy';

/** name of a character class or an enemy kind */
export function typeName(kind: CharacterType | EnemyKind): string {
  return kind in CHARACTER_CLASSES
    ? CHARACTER_CLASSES[kind as CharacterType].name
    : ENEMIES[kind as EnemyKind].name;
}

/** DS:0B42 + i*256 — rank titles by level; levels past the table read the image beyond it */
export function rankName(level: number): string {
  return IMAGE.rankName(level);
}

const IMAGE = new Memory();
