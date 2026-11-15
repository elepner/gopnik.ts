/** Names of types and ranks, read from the original's data image like G.EXE does (no bounds). */
import type { TypeId } from '../tp/brands';
import { Memory } from './legacy';
import { TYPE_ID, type CharacterType } from './state';

/** DS:002E + i*256 */
export function typeName(i: TypeId | CharacterType): string {
  return IMAGE.typeName((typeof i === 'string' ? TYPE_ID[i] : i) as TypeId);
}

/** DS:0B42 + i*256 — rank titles by level; levels past the table read the image beyond it */
export function rankName(level: number): string {
  return IMAGE.rankName(level);
}

const IMAGE = new Memory();
