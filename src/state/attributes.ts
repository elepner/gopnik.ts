/**
 * The hero's attributes as a projection: the base (training, levels) plus the boosts of items
 * and effects, plus the best weapon in hand. Game code reads them with `attr` and changes the base with `inc`/`dec`/`set`; an
 * item or an effect adds its own `boost` and takes it back with `unboost`. Every value wraps
 * like the original's (Integer, armor a Byte): the sum of wrapped parts wraps to the same
 * number as the original's step-by-step additions.
 */
import { i16, u8 } from '../tp/num';
import type { Attribute, Attributes, BoostSource, PlayerBase, Weapons } from './state';

function wrap(a: Attribute, n: number): number {
  return a === 'armor' ? u8(n) : i16(n);
}

function boosted(p: PlayerBase, a: Attribute): number {
  const weapon = a === 'damageMin' || a === 'damageMax' ? weaponDamage(p.body.hands.weapons) : 0;
  return Object.values(p.boosts).reduce((sum, b) => sum + (b?.[a] ?? 0), weapon);
}

/** what each weapon adds to the damage; only the best one in hand counts */
export const WEAPON_DAMAGE: Record<keyof Weapons, number> = {
  knuckles: 2,
  club: 4,
  knife: 6,
  cleaver: 9,
};

export function weaponDamage(weapons: Weapons): number {
  return Math.max(0, ...held(weapons).map((w) => WEAPON_DAMAGE[w]));
}

/** a better weapon than this one is already in hand */
export function outclassed(weapons: Weapons, weapon: keyof Weapons): boolean {
  return held(weapons).some((w) => WEAPON_DAMAGE[w] > WEAPON_DAMAGE[weapon]);
}

function held(weapons: Weapons): (keyof Weapons)[] {
  return (Object.keys(WEAPON_DAMAGE) as (keyof Weapons)[]).filter((w) => weapons[w]);
}

/** the attribute as the game uses it */
export function attr(p: PlayerBase, a: Attribute): number {
  return wrap(a, p.base[a] + boosted(p, a));
}

export function inc(p: PlayerBase, a: Attribute, n: number) {
  p.base[a] = wrap(a, p.base[a] + n);
}

export function dec(p: PlayerBase, a: Attribute, n: number) {
  inc(p, a, -n);
}

/** sets what the game uses: the base takes whatever the boosts don't give */
export function set(p: PlayerBase, a: Attribute, value: number) {
  p.base[a] = wrap(a, value - boosted(p, a));
}

export function boost(p: PlayerBase, source: BoostSource, a: Attribute, n: number) {
  const b = (p.boosts[source] ??= {});
  b[a] = wrap(a, (b[a] ?? 0) + n);
}

/** the source is gone with everything it gave */
export function unboost(p: PlayerBase, source: BoostSource) {
  delete p.boosts[source];
}

export function boostAll(p: PlayerBase, source: BoostSource, values: Partial<Attributes>) {
  for (const [a, n] of Object.entries(values) as [Attribute, number][]) boost(p, source, a, n);
}

/** what a joint gives while the hero is stoned */
export const JOINT: Partial<Attributes> = { strength: 2, damageMin: 1, damageMax: 2 };

/**
 * Values that only know totals (a save) were put into the base as they are; this takes out the
 * best weapon in hand and the joint of a stoned hero, which has to wear off. The other items
 * stay in the base: nothing ever takes them away.
 */
export function fromTotals(p: PlayerBase & { readonly stoned: number }) {
  const weapon = weaponDamage(p.body.hands.weapons);
  dec(p, 'damageMin', weapon);
  dec(p, 'damageMax', weapon);
  if (p.stoned <= 0) return;
  for (const [a, n] of Object.entries(JOINT) as [Attribute, number][]) dec(p, a, n);
  boostAll(p, 'joint', JOINT);
}
