/**
 * The things a hero can carry: where each one goes on the body and what it gives. The hero's
 * attributes are projected from what is in the slots (`attributes.ts`), so taking or selling a
 * thing is only putting it into its slot or out of it.
 */
import type { Attributes, Body, Weapons } from './state';

export type Item =
  | 'glasses'
  | 'cross'
  | 'phone'
  | 'abibas'
  | 'adidas'
  | 'leather'
  | 'coolLeather'
  | 'boots'
  | 'coolBoots'
  | 'knuckles'
  | 'club'
  | 'knife'
  | 'cleaver'
  | 'spasiRing'
  | 'pomogiRing'
  | 'megaRing'
  | 'pomiluyRing';

/** the rings of the Пг → Мега → Гп chain, found in this order */
export type ChainRing = 'pomogiRing' | 'megaRing' | 'pomiluyRing';

/** a part of the body and the flag of the thing in it */
type Slot = object;

const SLOTS: Record<Item, (b: Body) => readonly [Slot, string]> = {
  glasses: (b) => [b.eyes, 'glasses'],
  cross: (b) => [b.neck, 'cross'],
  phone: (b) => [b.pockets, 'phone'],
  abibas: (b) => [b.torso, 'abibas'],
  adidas: (b) => [b.torso, 'adidas'],
  leather: (b) => [b.torso, 'leather'],
  coolLeather: (b) => [b.torso, 'coolLeather'],
  boots: (b) => [b.feet, 'boots'],
  coolBoots: (b) => [b.feet, 'coolBoots'],
  knuckles: (b) => [b.hands.weapons, 'knuckles'],
  club: (b) => [b.hands.weapons, 'club'],
  knife: (b) => [b.hands.weapons, 'knife'],
  cleaver: (b) => [b.hands.weapons, 'cleaver'],
  spasiRing: (b) => [b.hands.rings, 'spasi'],
  pomogiRing: (b) => [b.hands.rings, 'pomogi'],
  megaRing: (b) => [b.hands.rings, 'mega'],
  pomiluyRing: (b) => [b.hands.rings, 'pomiluy'],
};

export function has(body: Body, item: Item): boolean {
  const [slot, key] = SLOTS[item](body);
  return (slot as Record<string, unknown>)[key] === true;
}

/** puts a thing into its slot */
export function put(body: Body, item: Item) {
  const [slot, key] = SLOTS[item](body);
  (slot as Record<string, unknown>)[key] = true;
}

/** takes a thing out of its slot (sold) */
export function drop(body: Body, item: Item) {
  const [slot, key] = SLOTS[item](body);
  (slot as Record<string, unknown>)[key] = false;
}

/** the next ring of the chain, nothing when it is complete */
export function nextRing(body: Body): ChainRing | undefined {
  return (['pomogiRing', 'megaRing', 'pomiluyRing'] as const).find((r) => !has(body, r));
}

/**
 * What the things give, by slot; within a slot only the best thing counts (listed first): a
 * better suit, jacket, pair of boots or weapon replaces the worse one, a spare one adds nothing.
 */
const GEAR: readonly (readonly (readonly [Item, Partial<Attributes>])[])[] = [
  [
    ['adidas', { armor: 2 }],
    ['abibas', { armor: 1 }],
  ],
  [
    ['coolLeather', { armor: 4 }],
    ['leather', { armor: 2 }],
  ],
  [
    ['coolBoots', { damageMin: 2, damageMax: 2 }],
    ['boots', { damageMin: 1, damageMax: 1 }],
  ],
  [
    ['cleaver', { damageMin: 9, damageMax: 9 }],
    ['knife', { damageMin: 6, damageMax: 6 }],
    ['club', { damageMin: 4, damageMax: 4 }],
    ['knuckles', { damageMin: 2, damageMax: 2 }],
  ],
  [
    // the original adds 1 - (strength mod 2) to the minimum damage, 1 when the ring makes the
    // strength even; a slot gives a fixed value: 1, what both golden games got
    [
      'pomogiRing',
      { strength: 1, agility: 1, vitality: 1, luck: 1, healthMax: 6, damageMin: 1, damageMax: 1 },
    ],
  ],
  [
    [
      'megaRing',
      { strength: 4, agility: 4, vitality: 4, luck: 4, healthMax: 24, damageMin: 2, damageMax: 4 },
    ],
  ],
  [['spasiRing', { luck: 1 }]],
  [['cross', { luck: 2 }]],
];

/** what the things on the body add to an attribute */
export function gear(body: Body, a: keyof Attributes): number {
  return GEAR.reduce((sum, slot) => sum + (slot.find(([item]) => has(body, item))?.[1][a] ?? 0), 0);
}

/** health a ring gives the moment it is put on */
export const RING_HEALTH: Partial<Record<Item, number>> = { pomogiRing: 6, megaRing: 24 };

/** a better weapon than this one is already in hand */
export function outclassed(weapons: Weapons, weapon: keyof Weapons): boolean {
  const rank = WEAPONS.indexOf(weapon);
  return WEAPONS.some((w, i) => i < rank && weapons[w]);
}

/** best first */
const WEAPONS = ['cleaver', 'knife', 'club', 'knuckles'] as const;
