/** Rare encounters while walking: the saving mage and the temple. */
import { Effect } from 'effect';

import { readKey, readLine, writeLn } from '../crt/crt';
import { SaveName } from '../tp/brands';
import { gainRing, levelUp, strengthUp } from './hero';
import { Disk, Game, lowerCase, println, rnd, fmt } from './prelude';
import { ENCOUNTERS } from './texts';

/** 0000:7538 — Рушель Блаво offers to save the game */
export const saveMage = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const disk = yield* Disk;
  yield* println(ENCOUNTERS.brodyaPoOkrestnostyamS);
  yield* readKey;
  yield* println(ENCOUNTERS.tyVstretilVelikogoMaga);
  yield* readKey;
  yield* println(ENCOUNTERS.zaRubleyOnMozhet, st.district * 25);
  yield* readKey;
  yield* println(ENCOUNTERS.tyHocheshSohranitsya);
  const answer = lowerCase(yield* readLine);
  if (answer !== 'y') return yield* println(ENCOUNTERS.nehotiteKakHotiteMoe);
  if (st.district * 50 > st.money) return yield* println(ENCOUNTERS.parenVseStoitBabok);
  st.money -= st.district * 50;
  yield* disk.write(SaveName('save_r0.sav'), mem.saveRecord());
  yield* disk.write(SaveName('places.sav'), mem.placesRecord());
  yield* println(ENCOUNTERS.sohranenoMozheshBespredelnichatDalshe);
});

/** 0000:7C67 — the temple: a random blessing */
export const temple = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const lines = (...ls: string[]) =>
    Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
  if (st.templeVisits === 2) {
    yield* println(ENCOUNTERS.brodyaPoOkrestnostyamS);
    yield* println(ENCOUNTERS.tyNatknulsyaNaHram);
    yield* readKey;
    yield* println(ENCOUNTERS.bogATyOpyat);
    yield* println(ENCOUNTERS.nuLadnoNasylayuNa);
    yield* readKey;
  }
  if (st.templeVisits === 1) {
    yield* lines(
      ENCOUNTERS.brodyaPoOkrestnostyamS,
      ENCOUNTERS.tyNatknulsyaNaHram,
      ENCOUNTERS.vProshlyyRazBog,
      ENCOUNTERS.noNadoByTipa,
      ENCOUNTERS.gospodiBratanProstiGreshnika,
      ENCOUNTERS.bogDaBlinUpornyy,
      ENCOUNTERS.ladnoNasylayuNaTebya
    );
    st.templeVisits++;
  }
  if (st.templeVisits === 0) {
    yield* lines(
      ENCOUNTERS.brodyaPoOkrestnostyamS,
      ENCOUNTERS.tyNatknulsyaNaHram,
      ENCOUNTERS.razTakayaBatva,
      ENCOUNTERS.nadoTipaPomolitsyaGospodu,
      ENCOUNTERS.kakDelayutNovyeRusskie,
      ENCOUNTERS.gospodiBratanProstiGreshnika2,
      ENCOUNTERS.gromovoyGolosDaPoshel,
      ENCOUNTERS.eeeTipaAChe,
      fmt(ENCOUNTERS.aCheBlinChertov, st.name, mem.typeName(st.charType)),
      ENCOUNTERS.nu,
      ENCOUNTERS.ladnaNasylayuNaTebya
    );
    st.templeVisits++;
  }
  switch (yield* rnd(5)) {
    case 0:
      yield* println(ENCOUNTERS.daUvelichitsyaTvoyaPontovost);
      yield* readKey;
      yield* println(ENCOUNTERS.bylTyAStal, mem.rankName(st.level), mem.rankName(st.level + 1));
      st.exp = st.expNext;
      yield* levelUp(false);
      break;
    case 1:
      switch (yield* rnd(4)) {
        case 0:
          yield* println(ENCOUNTERS.daUvelichitsyaTvoyaSila);
          yield* strengthUp;
          break;
        case 1:
          yield* println(ENCOUNTERS.daUmenshitsyaTvoyaKoryavost);
          st.agi++;
          break;
        case 2:
          yield* println(ENCOUNTERS.daVozrastutTvoySily);
          st.vit++;
          st.hpMax += 5;
          st.hp += 5;
          break;
        case 3:
          yield* println(ENCOUNTERS.daSnizoydetNaTebya);
          st.luck++;
          break;
      }
      break;
    case 2:
      yield* println(ENCOUNTERS.daryuTebeFenku);
      yield* gainRing(ENCOUNTERS.megaKoltsoSoSvoego);
      break;
    case 3:
      yield* println(ENCOUNTERS.nakladyvayuNaTebyaZaschitu);
      st.armor++;
      break;
    case 4:
      yield* println(ENCOUNTERS.daUvelichitsyaOfigennoTvoya);
      st.respect += st.district * 50 + 50;
      yield* println(ENCOUNTERS.poluchi, st.district * 50 + 50);
      break;
  }
  yield* readKey;
  if (st.templeVisits < 2) yield* println(ENCOUNTERS.aTeperValiOtsyuda);
  else yield* println(ENCOUNTERS.aTeperProvalivay);
  st.event = 0;
  yield* writeLn;
  yield* println(ENCOUNTERS.tyIdeschDalshe);
});
