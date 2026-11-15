import { Effect } from 'effect';

/** Rare encounters while walking: the saving mage and the temple. */
import { i16, u8 } from '../../src/tp/num';
import { readKey, readLine, writeLn } from '../crt/crt';
import { encodeSave, encodePlaces } from '../state/legacy';
import { typeName, rankName } from '../state/names';
import { SaveName } from '../tp/brands';
import { CMD, parseCommand } from './commands';
import { gainRing, levelUp, strengthUp } from './hero';
import { Disk, lowerCase, println, rnd, started } from './prelude';
import type { Text } from './text';
import { ENCOUNTERS } from './texts';

/** 0000:7538 — Рушель Блаво offers to save the game */
export const saveMage = Effect.gen(function* () {
  const st = yield* started;
  const disk = yield* Disk;
  yield* println(ENCOUNTERS.brodyaPoOkrestnostyamS());
  yield* readKey;
  yield* println(ENCOUNTERS.tyVstretilVelikogoMaga());
  yield* readKey;
  yield* println(ENCOUNTERS.zaRubleyOnMozhet(st.world.district * 25));
  yield* readKey;
  yield* println(ENCOUNTERS.tyHocheshSohranitsya());
  const answer = lowerCase(yield* readLine);
  if (parseCommand('answer', answer) !== CMD.answer.yes)
    return yield* println(ENCOUNTERS.nehotiteKakHotiteMoe());
  if (st.world.district * 50 > st.player.resources.money)
    return yield* println(ENCOUNTERS.parenVseStoitBabok());
  st.player.resources.money = i16(st.player.resources.money - st.world.district * 50);
  yield* disk.write(SaveName('save_r0.sav'), encodeSave(st));
  yield* disk.write(SaveName('places.sav'), encodePlaces(st));
  yield* println(ENCOUNTERS.sohranenoMozheshBespredelnichatDalshe());
});

/** 0000:7C67 — the temple: a random blessing */
export const temple = Effect.gen(function* () {
  const st = yield* started;
  const lines = (...ls: Text[]) =>
    Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
  if (st.world.templeVisits === 2) {
    yield* println(ENCOUNTERS.brodyaPoOkrestnostyamS());
    yield* println(ENCOUNTERS.tyNatknulsyaNaHram());
    yield* readKey;
    yield* println(ENCOUNTERS.bogATyOpyat());
    yield* println(ENCOUNTERS.nuLadnoNasylayuNa());
    yield* readKey;
  }
  if (st.world.templeVisits === 1) {
    yield* lines(
      ENCOUNTERS.brodyaPoOkrestnostyamS(),
      ENCOUNTERS.tyNatknulsyaNaHram(),
      ENCOUNTERS.vProshlyyRazBog(),
      ENCOUNTERS.noNadoByTipa(),
      ENCOUNTERS.gospodiBratanProstiGreshnika(),
      ENCOUNTERS.bogDaBlinUpornyy(),
      ENCOUNTERS.ladnoNasylayuNaTebya()
    );
    st.world.templeVisits = u8(st.world.templeVisits + 1);
  }
  if (st.world.templeVisits === 0) {
    yield* lines(
      ENCOUNTERS.brodyaPoOkrestnostyamS(),
      ENCOUNTERS.tyNatknulsyaNaHram(),
      ENCOUNTERS.razTakayaBatva(),
      ENCOUNTERS.nadoTipaPomolitsyaGospodu(),
      ENCOUNTERS.kakDelayutNovyeRusskie(),
      ENCOUNTERS.gospodiBratanProstiGreshnika2(),
      ENCOUNTERS.gromovoyGolosDaPoshel(),
      ENCOUNTERS.eeeTipaAChe(),
      ENCOUNTERS.aCheBlinChertov(st.player.name, typeName(st.player.type)),
      ENCOUNTERS.nu(),
      ENCOUNTERS.ladnaNasylayuNaTebya()
    );
    st.world.templeVisits = u8(st.world.templeVisits + 1);
  }
  switch (yield* rnd(5)) {
    case 0:
      yield* println(ENCOUNTERS.daUvelichitsyaTvoyaPontovost());
      yield* readKey;
      yield* println(
        ENCOUNTERS.bylTyAStal(
          rankName(st.player.progression.level),
          rankName(st.player.progression.level + 1)
        )
      );
      st.player.progression.exp = st.player.progression.expNext;
      yield* levelUp(false);
      break;
    case 1:
      switch (yield* rnd(4)) {
        case 0:
          yield* println(ENCOUNTERS.daUvelichitsyaTvoyaSila());
          yield* strengthUp;
          break;
        case 1:
          yield* println(ENCOUNTERS.daUmenshitsyaTvoyaKoryavost());
          st.player.stats.agility = i16(st.player.stats.agility + 1);
          break;
        case 2:
          yield* println(ENCOUNTERS.daVozrastutTvoySily());
          st.player.stats.vitality = i16(st.player.stats.vitality + 1);
          st.player.health.max = i16(st.player.health.max + 5);
          st.player.health.current = i16(st.player.health.current + 5);
          break;
        case 3:
          yield* println(ENCOUNTERS.daSnizoydetNaTebya());
          st.player.stats.luck = i16(st.player.stats.luck + 1);
          break;
      }
      break;
    case 2:
      yield* println(ENCOUNTERS.daryuTebeFenku());
      yield* gainRing(ENCOUNTERS.megaKoltsoSoSvoego());
      break;
    case 3:
      yield* println(ENCOUNTERS.nakladyvayuNaTebyaZaschitu());
      st.player.armor = u8(st.player.armor + 1);
      break;
    case 4:
      yield* println(ENCOUNTERS.daUvelichitsyaOfigennoTvoya());
      st.player.respect = i16(st.player.respect + (st.world.district * 50 + 50));
      yield* println(ENCOUNTERS.poluchi(st.world.district * 50 + 50));
      break;
  }
  yield* readKey;
  if (st.world.templeVisits < 2) yield* println(ENCOUNTERS.aTeperValiOtsyuda());
  else yield* println(ENCOUNTERS.aTeperProvalivay());
  yield* writeLn;
  yield* println(ENCOUNTERS.tyIdeschDalshe());
});
