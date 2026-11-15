/**
 * The hero's attributes as a projection: the base (start, levels, training) plus what the
 * things in the slots give (`items.ts`) plus a joint while the hero is stoned. Game code reads
 * them with `attr` and changes the base with `inc`/`dec`/`set`; things only go into slots.
 * Every value wraps like the original's (Integer, armor a Byte).
 */
import { i16, u8 } from '../tp/num';
import { gear } from './items';
import type { Attribute, Attributes, PlayerBase } from './state';

/** what a joint gives while the hero is stoned */
export const JOINT: Partial<Attributes> = { strength: 2, damageMin: 1, damageMax: 2 };

function wrap(a: Attribute, n: number): number {
  return a === 'armor' ? u8(n) : i16(n);
}

/** what the things and a joint add to the base */
function bonus(p: PlayerBase, a: Attribute): number {
  return gear(p.body, a) + (p.stoned > 0 ? (JOINT[a] ?? 0) : 0);
}

/** the attribute as the game uses it */
export function attr(p: PlayerBase, a: Attribute): number {
  return wrap(a, p.base[a] + bonus(p, a));
}

export function inc(p: PlayerBase, a: Attribute, n: number) {
  p.base[a] = wrap(a, p.base[a] + n);
}

export function dec(p: PlayerBase, a: Attribute, n: number) {
  inc(p, a, -n);
}

/** sets what the game uses: the base takes whatever the things don't give */
export function set(p: PlayerBase, a: Attribute, value: number) {
  p.base[a] = wrap(a, value - bonus(p, a));
}

/** values that only know totals (a save) were put into the base as they are: take the things and the joint out */
export function fromTotals(p: PlayerBase) {
  for (const a of Object.keys(p.base) as Attribute[]) dec(p, a, bonus(p, a));
}
