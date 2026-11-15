/** Rare encounters while walking: the saving mage and the temple. */
import { Effect } from 'effect';

import { inc } from '../state/attributes';
import { nextRing } from '../state/items';
import { encodeSave, encodePlaces } from '../state/legacy';
import { SaveName } from '../tp/brands';
import { i16, u8 } from '../tp/num';
import { CMD, readAnswer } from './commands';
import { emit } from './events';
import { levelUp, strengthUp, take } from './hero';
import { Disk, rnd, started } from './prelude';

/** 0000:7538 — Рушель Блаво offers to save the game */
export const saveMage = Effect.gen(function* () {
  const st = yield* started;
  const disk = yield* Disk;
  yield* emit({ type: 'mageMet' });
  if ((yield* readAnswer) !== CMD.answer.yes) return yield* emit({ type: 'mageDeclined' });
  if (st.world.district * 50 > st.player.resources.money)
    return yield* emit({ type: 'mageUnpaid' });
  st.player.resources.money = i16(st.player.resources.money - st.world.district * 50);
  yield* disk.write(SaveName('save_r0.sav'), encodeSave(st));
  yield* disk.write(SaveName('places.sav'), encodePlaces(st));
  yield* emit({ type: 'mageSaved' });
});

/** 0000:7C67 — the temple: a random blessing */
export const temple = Effect.gen(function* () {
  const st = yield* started;
  // visits are counted up to 2: from then on God is fed up
  yield* emit({ type: 'templeEntered' });
  if (st.world.templeVisits < 2) st.world.templeVisits = u8(st.world.templeVisits + 1);
  switch (yield* rnd(5)) {
    case 0:
      yield* emit({ type: 'templeBlessed', blessing: 'level' });
      st.player.progression.exp = st.player.progression.expNext;
      yield* levelUp(false);
      break;
    case 1:
      switch (yield* rnd(4)) {
        case 0:
          yield* emit({ type: 'templeBlessed', blessing: 'strength' });
          yield* strengthUp;
          break;
        case 1:
          yield* emit({ type: 'templeBlessed', blessing: 'agility' });
          inc(st.player, 'agility', 1);
          break;
        case 2:
          yield* emit({ type: 'templeBlessed', blessing: 'vitality' });
          inc(st.player, 'vitality', 1);
          inc(st.player, 'healthMax', 5);
          st.player.health.current = i16(st.player.health.current + 5);
          break;
        case 3:
          yield* emit({ type: 'templeBlessed', blessing: 'luck' });
          inc(st.player, 'luck', 1);
          break;
      }
      break;
    case 2: {
      yield* emit({ type: 'templeBlessed', blessing: 'ring' });
      const ring = nextRing(st.player.body);
      if (ring) {
        take(st, ring);
        yield* emit({ type: 'templeRingGiven', ring });
      }
      break;
    }
    case 3:
      yield* emit({ type: 'templeBlessed', blessing: 'armor' });
      inc(st.player, 'armor', 1);
      break;
    case 4: {
      const respect = st.world.district * 50 + 50;
      yield* emit({ type: 'templeBlessed', blessing: 'respect' });
      st.player.respect = i16(st.player.respect + respect);
      yield* emit({ type: 'templeRespect', respect });
      break;
    }
  }
  yield* emit({ type: 'templeLeft' });
});
