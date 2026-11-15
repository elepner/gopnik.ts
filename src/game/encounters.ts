/** Rare encounters while walking: the saving mage and the temple. */
import { Effect } from 'effect';

import { dec, inc, set } from '../state/attributes';
import { nextRing } from '../state/items';
import { encodeSave, encodePlaces } from '../state/legacy';
import type { Game, Player } from '../state/state';
import { SaveName } from '../tp/brands';
import { u8 } from '../tp/num';
import { CMD, readAnswer } from './commands';
import type { Blessing, EncountersEvent } from './encounters-view';
import { emit, reporter } from './events';
import { levelUp, strengthUp, take } from './hero';
import { Disk, rnd, started } from './prelude';

const report = reporter(apply);

/** 0000:7538 — Рушель Блаво offers to save the game */
export const saveMage = Effect.gen(function* () {
  const st = yield* started;
  const disk = yield* Disk;
  yield* emit({ type: 'mageMet' });
  if ((yield* readAnswer) !== CMD.answer.yes) return yield* emit({ type: 'mageDeclined' });
  if (st.world.district * 50 > st.player.resources.money)
    return yield* emit({ type: 'mageUnpaid' });
  yield* report({ type: 'magePaid' });
  yield* disk.write(SaveName('save_r0.sav'), encodeSave(st));
  yield* disk.write(SaveName('places.sav'), encodePlaces(st));
  yield* emit({ type: 'mageSaved' });
});

/** 0000:7C67 — the temple: a random blessing */
export const temple = Effect.gen(function* () {
  const st = yield* started;
  yield* emit({ type: 'templeEntered' });
  const blessing = BLESSINGS[yield* rnd(5)] ?? STATS[yield* rnd(4)]!;
  yield* report({ type: 'templeBlessed', blessing });
  if (blessing === 'level') yield* levelUp(false);
  if (blessing === 'strength') yield* strengthUp;
  if (blessing === 'ring') {
    const ring = nextRing(st.player.body);
    if (ring) yield* report({ type: 'templeRingGiven', ring });
  }
  if (blessing === 'respect')
    yield* report({ type: 'templeRespect', respect: st.world.district * 50 + 50 });
  yield* emit({ type: 'templeLeft' });
});

/** God's blessings by the first roll; the second one (`null`) raises a stat, by another roll */
const BLESSINGS: readonly (Blessing | null)[] = ['level', null, 'ring', 'armor', 'respect'];
const STATS: readonly Blessing[] = ['strength', 'agility', 'vitality', 'luck'];

/** what happens at the mage and in the temple goes into the state */
function apply(st: Game, event: EncountersEvent) {
  const p = st.player;
  switch (event.type) {
    case 'magePaid':
      return dec(p, 'money', st.world.district * 50);
    case 'templeBlessed':
      // the visit counts now (the greeting went by the visits before): up to 2, then God is fed up
      if (st.world.templeVisits < 2) st.world.templeVisits = u8(st.world.templeVisits + 1);
      return bless(p, event.blessing);
    case 'templeRingGiven':
      return take(st, event.ring);
    case 'templeRespect':
      return inc(p, 'respect', event.respect);
  }
}

/** what a blessing gives at once; the level-up, strength, the ring and respect follow it */
function bless(p: Player, blessing: Blessing) {
  switch (blessing) {
    case 'level':
      return set(p, 'exp', p.progression.expNext);
    case 'vitality':
      inc(p, 'vitality', 1);
      inc(p, 'healthMax', 5);
      return inc(p, 'health', 5);
    case 'agility':
    case 'luck':
    case 'armor':
      return inc(p, blessing, 1);
  }
}
