/** What a lucky hero may find on a beaten enemy, by kind. */
import type { Item } from './items';
import type { EnemyKind } from './kinds';

export interface EnemyDrop {
  /** one of these is picked by Random; found only if the hero hasn't got it yet */
  readonly items: readonly Item[];
  /** a нарк may have joints on him (a luck check of its own, before the drop) */
  readonly joints: boolean;
}

const NOTHING: EnemyDrop = { items: [], joints: false };
const LAD: EnemyDrop = { items: ['knuckles', 'club'], joints: false };

export const ENEMY_DROPS: Readonly<Record<EnemyKind, EnemyDrop>> = {
  dohlyak: NOTHING,
  nefor: { items: ['cross', 'spasiRing', 'phone'], joints: false },
  nark: { items: [], joints: true },
  podtsan: LAD,
  otmorozok: LAD,
  gopnik: LAD,
  vor: LAD,
  bespredelshchik: { items: ['glasses', 'phone'], joints: false },
  ment: NOTHING,
  manyak: { items: ['knife', 'cleaver'], joints: false },
  rector: NOTHING,
};
