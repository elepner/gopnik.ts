/** The main command loop of G.EXE (0000:AB59) and walking around (`w`/`run`). */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt';
import { SaveName, TypeId } from '../tp/brands';
import { str } from '../tp/num';
import { saveMage, temple } from './encounters';
import { setupRector, spawnEnemy } from './enemy';
import { fight, smokeJoint } from './fight';
import { drinkBeer, showStats } from './hero';
import { club, dealers, den, girlfriend, gym, market, prompt, vet } from './places';
import { Disk, Game, halt, lowerCase, luckAtLeast, print, println, rnd } from './prelude';
import { help } from './screens';
import { resetPlaces } from './start';
import { MAIN } from './texts';

/** 0000:AB75 */
export const mainLoop = Effect.gen(function* () {
  const { st } = yield* Game;
  for (;;) {
    if (st.district * 10 <= st.level && st.district < 5) yield* nextDistrict;
    if (st.rector === 1) {
      st.denAccess = 1;
      yield* setupRector(0);
      yield* fight(3);
      yield* setupRector(1);
      yield* fight(4);
    }
    yield* print('\\');
    st.cmd = lowerCase(yield* readLine);
    const cmd = st.cmd;
    if (cmd === 'w' || cmd === 'run') yield* walk;
    if (cmd === 'mar') yield* market;
    if (cmd === 'bmar') yield* dealers;
    if (cmd === 'rep') yield* vet;
    if (cmd === 'girl') yield* girlfriend;
    if (cmd === 'fight') yield* println(MAIN.perezhitkiProshlogoZhmiW);
    if (cmd === 'pr') yield* den;
    if (cmd === 'kl') yield* club;
    if (cmd === 'trn') yield* gym;
    yield* drinkBeer(cmd);
    if (cmd === 'kos') yield* smokeJoint(10);
    if (cmd === 'i') yield* commands;
    if (cmd === 's') yield* showStats;
    if (cmd === 'f' && st.pistol) yield* println(MAIN.tyChePsihMigom);
    if (cmd === 'k') yield* println(MAIN.cheMasheshKopytamiIschi);
    if (cmd === 'name') yield* rename;
    if (cmd === 'version') yield* println(MAIN.gopnikVersion102);
    if (cmd === 'help') yield* help;
    if (cmd === 'exit' || cmd === 'e') {
      yield* println(MAIN.blinNeBytTebe);
      yield* println(MAIN.aRezultat);
      yield* showStats;
      yield* readKey;
      return yield* halt;
    }
  }
});

/** 0000:AB92 — the district is done: move on, maybe save */
const nextDistrict = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  st.district++;
  yield* resetPlaces;
  st.marketHeat = 0;
  st.clubHeat = 0;
  yield* println(MAIN.tyDokazalChtoTy);
  yield* println(MAIN.hocheshSohranitSvoiDostizheniya);
  if ((yield* prompt('\\')) === 'y') {
    st.tmp = str(st.district);
    yield* (yield* Disk).write(SaveName(`save_r${st.tmp}.sav`), mem.saveRecord());
    yield* println(MAIN.sohranenoVSaveR, st.tmp);
  }
  switch (st.district) {
    case 2:
      yield* println(MAIN.tySelNaAvtobus);
      yield* println(MAIN.tamBroditShlyuzovskayaShpana);
      break;
    case 3:
      yield* println(MAIN.naMarshrutkeTyDoehal);
      yield* println(MAIN.zdesBroditUzheBolee);
      break;
    case 4:
      yield* println(MAIN.tyPriehalVEltsovku);
      yield* println(MAIN.otoVsyuduDonosyatsyaKriki);
      break;
    case 5:
      yield* println(MAIN.poraNakonetsOtomstitRektoru);
      yield* readKey;
      yield* println(MAIN.tyProbralsyaVUniver);
      yield* println(MAIN.aVotIOn);
      st.rector = 1;
      break;
  }
});

/** 0000:AEA1 — `w`/`run`: wander around looking for trouble */
const walk = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.stoned > 0) {
    st.stoned--;
    if (st.stoned === 0) {
      st.str -= 2;
      st.dmgMin--;
      st.dmgMax -= 2;
      yield* println(MAIN.glyukiProshliSila2);
    }
  }
  if (st.cmd === 'run') yield* println(MAIN.zabegalMudak);
  if (st.loans < st.district * 10) st.loans++;
  if (st.knowsDealers && st.pistol && st.phoneCalls < 25) {
    st.phoneCalls++;
    if (st.phoneCalls === 25 && st.phone === 1) yield* println(MAIN.telefonAleTyGde);
  }
  if (!st.denQuestHelp && (yield* rnd(20)) === 0) {
    st.denQuestHelp = 1;
    if (st.denAccess && st.phone === 1) yield* println(MAIN.telefonAleTyGde2, st.name);
  }
  if (!st.denQuestJob && (yield* rnd(20)) === 0) {
    st.denQuestJob = 1;
    if (st.denAccess && st.respect >= 100 && st.phone === 1)
      yield* println(MAIN.telefonAleTySchas, st.name);
  }
  if (st.phone === 1 && (yield* rnd(200)) === 0) {
    yield* println(MAIN.telefonAleVasya);
    yield* readKey;
    yield* println(MAIN.netEto, st.name);
    yield* readKey;
    yield* println(MAIN.telefonAVasyuMozhno);
    yield* readKey;
    yield* println(MAIN.netOnBudetV);
  }
  if (st.phone === 1) {
    if ((yield* rnd(100)) === 0 && st.hasGirl) {
      yield* println(MAIN.telefonTvoyaPassiyaPrivet);
      yield* println(MAIN.aTyBezbazarovZhdi);
    }
    if (st.marketHeat === 1 && st.denAccess) yield* println(MAIN.telefonEtoTyTam);
    if (st.clubHeat === 1 && st.denAccess) yield* println(MAIN.telefonTyCheTam);
  }
  if (st.marketHeat > 0) st.marketHeat--;
  if (st.clubHeat > 0) st.clubHeat--;
  if ((yield* rnd(10)) === 0 && !st.knowsHospital) {
    st.knowsHospital = 1;
    yield* println(MAIN.tySprosilUProhozhego);
  }
  if ((yield* rnd(10)) === 0 && !st.knowsMarket) {
    st.knowsMarket = 1;
    yield* println(MAIN.tyNashelBazar);
  }
  if ((yield* rnd(100)) === 0 && !st.knowsClub) {
    st.knowsClub = 1;
    yield* println(MAIN.tyUvidelObyavlenieTipa);
  }
  if ((yield* rnd(100)) === 0 && !st.knowsGym) {
    st.knowsGym = 1;
    yield* println(MAIN.naSteneReklamaZhizn);
  }
  if (st.ringGp) {
    if (st.hp < st.hpMax) {
      st.hp += 3;
      if (st.hp > st.hpMax) st.hp = st.hpMax;
    }
    if ((yield* rnd(20)) === 0) {
      if (!st.jawBroken && st.legBroken) {
        st.legBroken = 0;
        yield* println(MAIN.tvoyaNogaZalechilasS);
      }
      if (st.jawBroken) {
        st.jawBroken = 0;
        yield* println(MAIN.tvoyaChelyustZalechilasS);
      }
    }
  }
  if (st.charType === 4) {
    if (st.hp < st.hpMax) st.hp++;
  } else if (st.charType === 6 && (yield* luckAtLeast(st.district * 20))) {
    st.found = (yield* rnd(st.district * 5)) + 1;
    st.money += st.found;
    yield* println(MAIN.opaBabkiRubleyNa, st.found);
  }
  st.eventRoll = (yield* rnd(25)) + 1;
  if (st.eventRoll >= 10) st.event = 4;
  if (st.eventRoll <= 9 && st.eventRoll >= 5) st.event = 3;
  if (st.eventRoll <= 4 && st.eventRoll >= 2) st.event = 2;
  if (st.eventRoll === 1) st.event = 1;
  if ((yield* rnd(200)) === 0) yield* temple;
  if ((yield* rnd(100)) === 0) yield* saveMage;
  switch (st.event) {
    case 1:
      return yield* toggleTrail;
    case 2:
      return yield* prettyGirl;
    case 3:
      return yield* meetSomeone;
    case 4:
      return yield* nothingHappens;
    default:
      return yield* println(MAIN.nicheNeProishodit);
  }
});

const toggleTrail = Effect.gen(function* () {
  const { st } = yield* Game;
  st.trail = st.trail === 0 ? 1 : 0;
  const msgs = st.trail ? TRAIL_IN : TRAIL_OUT;
  if (st.district >= 1 && st.district <= 4) yield* println(msgs[st.district - 1]);
});

const TRAIL_IN = [
  MAIN.tyZashelNaTropinku,
  MAIN.tyZashelVKakie,
  MAIN.tyZashelNaPlany,
  MAIN.tyZashelCherteKuda,
];
const TRAIL_OUT = [
  MAIN.tyVyshelSTropinki,
  MAIN.tyVyshelIzPodvaroten,
  MAIN.tyVyshelSPlanov,
  MAIN.tyVyshelCherteOtkuda,
];

const prettyGirl = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.hasGirl) return yield* println(MAIN.sovsemNicheNeProishodit);
  yield* println(MAIN.idetTipaKlevayaTsypa);
  st.input = lowerCase(yield* readLine);
  if (st.input !== 'y') return;
  if ((yield* rnd(2)) === 0) {
    yield* println(MAIN.tyTakoyPodkatyvaeshA);
    st.hasGirl = 1;
  } else yield* println(MAIN.tyEschePodkatitNeuspel);
});

const meetSomeone = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  yield* spawnEnemy(0);
  st.engaged = 0;
  if (st.eType !== 8) {
    st.sneak = st.district * 7 + 15;
    if (st.tattoo === 1) st.sneak = Math.trunc(st.sneak / 2);
    const calm = ((yield* luckAtLeast(st.sneak)) || st.eType < 3) && st.eType < 7;
    const type = mem.typeName(st.eType);
    if (calm) {
      yield* println(MAIN.idetUrovnyaHocheshNaehat, type, st.eLevel);
      st.input = lowerCase(yield* readLine);
      if (st.input === 'y') st.engaged = 1;
    } else {
      yield* println(MAIN.idetUrovnyaIschuschiyKogo, type, st.eLevel);
      st.input = lowerCase(yield* readLine);
      if (st.input === 'y') st.engaged = 1;
      else if ((yield* rnd(2)) === 0) {
        yield* println(MAIN.onTebyaZametil);
        st.engaged = 1;
      } else yield* println(MAIN.tySmylsya);
    }
  } else {
    yield* println(MAIN.idetMentyaraUrovnyaGroza, st.eLevel);
    if (yield* luckAtLeast(st.district * 7 + 15)) yield* println(MAIN.tyZatailsyaPrikinulsyaNe);
    else if (st.glasses === 1) {
      yield* println(MAIN.tyNapyalilTemnyeOchki);
      yield* println(MAIN.stendeRazyskivayutsyaZaGopnichestvo);
    } else {
      yield* println(MAIN.zapalil);
      st.engaged = 1;
    }
  }
  if (st.engaged) yield* fight(0);
});

const nothingHappens = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  if (st.stoned > 0 && (yield* rnd(7)) === 0) yield* println(MAIN.vseKudaToPlyvet);
  if (st.stoned > 0 && (yield* rnd(7)) === 0) {
    const type = mem.typeName(TypeId(yield* rnd(7)));
    yield* println(MAIN.idetUrovnyaHocheshNaehat, type, yield* rnd(st.district * 10 + 1));
    st.input = yield* readLine;
    yield* println(MAIN.cheZaBotvaNi);
  } else yield* println(MAIN.nicheNeProishodit);
});

/** `i` */
const commands = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println(MAIN.napishiWChtobyShatatsya);
  if (st.knowsMarket === 1) yield* println(MAIN.napishiMarChtobyIdti);
  if (st.knowsDealers === 1) yield* println(MAIN.napishiBmarChtobyIdti);
  if (st.knowsHospital === 1) yield* println(MAIN.napishiRepChtobyIdti);
  if (st.hasGirl === 1) yield* println(MAIN.napishiGirlChtobyZavalitsya);
  if (st.denAccess === 1) yield* println(MAIN.napishiPrChtobyIdti);
  if (st.knowsClub === 1) yield* println(MAIN.napishiKlChtobyIdti);
  if (st.knowsGym === 1) yield* println(MAIN.napishiTrnChtobyIdti);
  for (const line of COMMANDS) yield* println(line);
});

const COMMANDS = [
  MAIN.napishiSChtobyPosmotret,
  MAIN.napishiSvChtobyPriglyadetsya,
  MAIN.napishiKChtobyGasit,
  MAIN.napishiVChtobyPozvat,
  MAIN.napishiKosChtobyShavat,
  MAIN.napishiHChtobyVypit,
  MAIN.napishiMhChtobyNabuhatsya,
  MAIN.napishiNameChtobySmenit,
  MAIN.napishiEEsliZahochesh,
];

/** `name` */
const rename = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println(MAIN.zvaliTebya, st.name);
  yield* print(MAIN.aTeperBudut);
  st.name = yield* readLine;
  if (st.name === '') st.name = MAIN.razDolBay;
  st.name = MAIN.namePrefix + st.name;
});
