/** The main command loop of G.EXE (0000:AB59) and walking around (`w`/`run`). */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt';
import { ENEMIES, enemyAt } from '../state/kinds';
import { encodeSave } from '../state/legacy';
import { typeName } from '../state/names';
import { SaveName } from '../tp/brands';
import { i16, str, u8 } from '../tp/num';
import { CMD, type Command, parseCommand } from './commands';
import { saveMage, temple } from './encounters';
import { setupRector, spawnEnemy } from './enemy';
import { fight, smokeJoint } from './fight';
import { drinkBeer, showStats } from './hero';
import { club, dealers, den, girlfriend, gym, market, prompt, vet } from './places';
import {
  Disk,
  halt,
  lowerCase,
  luckAtLeast,
  print,
  println,
  rnd,
  started,
  transaction,
} from './prelude';
import { help } from './screens';
import { resetPlaces } from './start';
import { plain } from './text';
import { MAIN } from './texts';

/** 0000:AB75 — every command is one transaction of the game state */
export const mainLoop = Effect.gen(function* () {
  for (;;) yield* transaction(turn);
});

/** one pass of the main loop: district change, the rector, then one command */
const turn = Effect.gen(function* () {
  const st = yield* started;
  if (st.world.district * 10 <= st.player.progression.level && st.world.district < 5)
    yield* nextDistrict;
  if (st.world.rector) {
    st.world.places.den = true;
    yield* setupRector(0);
    yield* fight(3);
    yield* setupRector(1);
    yield* fight(4);
  }
  yield* print(plain`\\`);
  const cmd = parseCommand('main', lowerCase(yield* readLine));
  if (cmd) yield* MAIN_COMMANDS[cmd];
});

/** 0000:AB92 — the district is done: move on, maybe save */
const nextDistrict = Effect.gen(function* () {
  const st = yield* started;
  st.world.district++;
  yield* resetPlaces;
  st.world.heat.market = 0;
  st.world.heat.club = 0;
  yield* println(MAIN.tyDokazalChtoTy());
  yield* println(MAIN.hocheshSohranitSvoiDostizheniya());
  if (parseCommand('answer', yield* prompt(plain`\\`)) === CMD.answer.yes) {
    const slot = str(st.world.district);
    yield* (yield* Disk).write(SaveName(`save_r${slot}.sav`), encodeSave(st));
    yield* println(MAIN.sohranenoVSaveR(slot));
  }
  switch (st.world.district) {
    case 2:
      yield* println(MAIN.tySelNaAvtobus());
      yield* println(MAIN.tamBroditShlyuzovskayaShpana());
      break;
    case 3:
      yield* println(MAIN.naMarshrutkeTyDoehal());
      yield* println(MAIN.zdesBroditUzheBolee());
      break;
    case 4:
      yield* println(MAIN.tyPriehalVEltsovku());
      yield* println(MAIN.otoVsyuduDonosyatsyaKriki());
      break;
    case 5:
      yield* println(MAIN.poraNakonetsOtomstitRektoru());
      yield* readKey;
      yield* println(MAIN.tyProbralsyaVUniver());
      yield* println(MAIN.aVotIOn());
      st.world.rector = true;
      break;
  }
});

/** 0000:AEA1 — `w`/`run`: wander around looking for trouble */
function walk(running: boolean) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (st.player.stoned > 0) {
      st.player.stoned = u8(st.player.stoned - 1);
      if (st.player.stoned === 0) {
        st.player.stats.strength = i16(st.player.stats.strength - 2);
        st.player.damage.min = i16(st.player.damage.min - 1);
        st.player.damage.max = i16(st.player.damage.max - 2);
        yield* println(MAIN.glyukiProshliSila2());
      }
    }
    if (running) yield* println(MAIN.zabegalMudak());
    if (st.world.den.loans < st.world.district * 10)
      st.world.den.loans = u8(st.world.den.loans + 1);
    if (st.world.places.dealers && st.player.body.pockets.pistol && st.world.dealerCalls < 25) {
      st.world.dealerCalls = u8(st.world.dealerCalls + 1);
      if (st.world.dealerCalls === 25 && st.player.body.pockets.phone)
        yield* println(MAIN.telefonAleTyGde());
    }
    if (!st.world.den.helpQuest && (yield* rnd(20)) === 0) {
      st.world.den.helpQuest = true;
      if (st.world.places.den && st.player.body.pockets.phone)
        yield* println(MAIN.telefonAleTyGde2(st.player.name));
    }
    if (!st.world.den.jobQuest && (yield* rnd(20)) === 0) {
      st.world.den.jobQuest = true;
      if (st.world.places.den && st.player.respect >= 100 && st.player.body.pockets.phone)
        yield* println(MAIN.telefonAleTySchas(st.player.name));
    }
    if (st.player.body.pockets.phone && (yield* rnd(200)) === 0) {
      yield* println(MAIN.telefonAleVasya());
      yield* readKey;
      yield* println(MAIN.netEto(st.player.name));
      yield* readKey;
      yield* println(MAIN.telefonAVasyuMozhno());
      yield* readKey;
      yield* println(MAIN.netOnBudetV());
    }
    if (st.player.body.pockets.phone) {
      if ((yield* rnd(100)) === 0 && st.world.places.girlfriend) {
        yield* println(MAIN.telefonTvoyaPassiyaPrivet());
        yield* println(MAIN.aTyBezbazarovZhdi());
      }
      if (st.world.heat.market === 1 && st.world.places.den) yield* println(MAIN.telefonEtoTyTam());
      if (st.world.heat.club === 1 && st.world.places.den) yield* println(MAIN.telefonTyCheTam());
    }
    if (st.world.heat.market > 0) st.world.heat.market = u8(st.world.heat.market - 1);
    if (st.world.heat.club > 0) st.world.heat.club = u8(st.world.heat.club - 1);
    if ((yield* rnd(10)) === 0 && !st.world.places.hospital) {
      st.world.places.hospital = true;
      yield* println(MAIN.tySprosilUProhozhego());
    }
    if ((yield* rnd(10)) === 0 && !st.world.places.market) {
      st.world.places.market = true;
      yield* println(MAIN.tyNashelBazar());
    }
    if ((yield* rnd(100)) === 0 && !st.world.places.club) {
      st.world.places.club = true;
      yield* println(MAIN.tyUvidelObyavlenieTipa());
    }
    if ((yield* rnd(100)) === 0 && !st.world.places.gym) {
      st.world.places.gym = true;
      yield* println(MAIN.naSteneReklamaZhizn());
    }
    if (st.player.body.hands.rings.pomiluy) {
      if (st.player.health.current < st.player.health.max) {
        st.player.health.current = i16(st.player.health.current + 3);
        if (st.player.health.current > st.player.health.max)
          st.player.health.current = st.player.health.max;
      }
      if ((yield* rnd(20)) === 0) {
        if (!st.player.injuries.jaw && st.player.injuries.leg) {
          st.player.injuries.leg = false;
          yield* println(MAIN.tvoyaNogaZalechilasS());
        }
        if (st.player.injuries.jaw) {
          st.player.injuries.jaw = false;
          yield* println(MAIN.tvoyaChelyustZalechilasS());
        }
      }
    }
    if (st.player.type === 'otmorozok') {
      if (st.player.health.current < st.player.health.max)
        st.player.health.current = i16(st.player.health.current + 1);
    } else if (st.player.type === 'vor' && (yield* luckAtLeast(st.world.district * 20))) {
      const found = i16((yield* rnd(st.world.district * 5)) + 1);
      st.player.resources.money = i16(st.player.resources.money + found);
      yield* println(MAIN.opaBabkiRubleyNa(found));
    }
    // what happens on this walk: 1 path, 2 girl, 3 someone comes along, 4 nothing (by 1/25 odds)
    const roll = (yield* rnd(25)) + 1;
    let event = roll >= 10 ? 4 : roll >= 5 ? 3 : roll >= 2 ? 2 : 1;
    if ((yield* rnd(200)) === 0) {
      yield* temple;
      event = 0; // the temple visit is the whole walk
    }
    if ((yield* rnd(100)) === 0) yield* saveMage;
    switch (event) {
      case 1:
        return yield* toggleTrail;
      case 2:
        return yield* prettyGirl;
      case 3:
        return yield* meetSomeone;
      case 4:
        return yield* nothingHappens;
      default:
        return yield* println(MAIN.nicheNeProishodit());
    }
  });
}

const toggleTrail = Effect.gen(function* () {
  const st = yield* started;
  st.world.trail = !st.world.trail;
  const msgs = st.world.trail ? TRAIL_IN : TRAIL_OUT;
  if (st.world.district >= 1 && st.world.district <= 4) yield* println(msgs[st.world.district - 1]);
});

const TRAIL_IN = [
  MAIN.tyZashelNaTropinku(),
  MAIN.tyZashelVKakie(),
  MAIN.tyZashelNaPlany(),
  MAIN.tyZashelCherteKuda(),
];
const TRAIL_OUT = [
  MAIN.tyVyshelSTropinki(),
  MAIN.tyVyshelIzPodvaroten(),
  MAIN.tyVyshelSPlanov(),
  MAIN.tyVyshelCherteOtkuda(),
];

const prettyGirl = Effect.gen(function* () {
  const st = yield* started;
  if (st.world.places.girlfriend) return yield* println(MAIN.sovsemNicheNeProishodit());
  yield* println(MAIN.idetTipaKlevayaTsypa());
  st.session.lastAnswer = lowerCase(yield* readLine);
  if (parseCommand('answer', st.session.lastAnswer) !== CMD.answer.yes) return;
  if ((yield* rnd(2)) === 0) {
    yield* println(MAIN.tyTakoyPodkatyvaeshA());
    st.world.places.girlfriend = true;
  } else yield* println(MAIN.tyEschePodkatitNeuspel());
});

const meetSomeone = Effect.gen(function* () {
  const st = yield* started;
  yield* spawnEnemy(0);
  let engaged = false;
  if (st.enemy.type !== 'ment') {
    // the tattoo halves the odds of being picked on
    let sneak = st.world.district * 7 + 15;
    if (st.player.body.skin.tattoo) sneak = Math.trunc(sneak / 2);
    // weaklings never look for trouble; lads only when the hero is unlucky; thugs and maniacs always
    const group = ENEMIES[st.enemy.type].group;
    const calm =
      ((yield* luckAtLeast(sneak)) || group === 'weakling') &&
      (group === 'weakling' || group === 'lad');
    const type = typeName(st.enemy.type);
    if (calm) {
      yield* println(MAIN.idetUrovnyaHocheshNaehat(type, st.enemy.level));
      st.session.lastAnswer = lowerCase(yield* readLine);
      if (parseCommand('answer', st.session.lastAnswer) === CMD.answer.yes) engaged = true;
    } else {
      yield* println(MAIN.idetUrovnyaIschuschiyKogo(type, st.enemy.level));
      st.session.lastAnswer = lowerCase(yield* readLine);
      if (parseCommand('answer', st.session.lastAnswer) === CMD.answer.yes) engaged = true;
      else if ((yield* rnd(2)) === 0) {
        yield* println(MAIN.onTebyaZametil());
        engaged = true;
      } else yield* println(MAIN.tySmylsya());
    }
  } else {
    yield* println(MAIN.idetMentyaraUrovnyaGroza(st.enemy.level));
    if (yield* luckAtLeast(st.world.district * 7 + 15))
      yield* println(MAIN.tyZatailsyaPrikinulsyaNe());
    else if (st.player.body.eyes.glasses) {
      yield* println(MAIN.tyNapyalilTemnyeOchki());
      yield* println(MAIN.stendeRazyskivayutsyaZaGopnichestvo());
    } else {
      yield* println(MAIN.zapalil());
      engaged = true;
    }
  }
  if (engaged) yield* fight(0);
});

const nothingHappens = Effect.gen(function* () {
  const st = yield* started;
  if (st.player.stoned > 0 && (yield* rnd(7)) === 0) yield* println(MAIN.vseKudaToPlyvet());
  if (st.player.stoned > 0 && (yield* rnd(7)) === 0) {
    const type = typeName(enemyAt(yield* rnd(7)));
    yield* println(MAIN.idetUrovnyaHocheshNaehat(type, yield* rnd(st.world.district * 10 + 1)));
    st.session.lastAnswer = yield* readLine;
    yield* println(MAIN.cheZaBotvaNi());
  } else yield* println(MAIN.nicheNeProishodit());
});

/** `i` */
const commands = Effect.gen(function* () {
  const st = yield* started;
  yield* println(MAIN.napishiWChtobyShatatsya());
  if (st.world.places.market) yield* println(MAIN.napishiMarChtobyIdti());
  if (st.world.places.dealers) yield* println(MAIN.napishiBmarChtobyIdti());
  if (st.world.places.hospital) yield* println(MAIN.napishiRepChtobyIdti());
  if (st.world.places.girlfriend) yield* println(MAIN.napishiGirlChtobyZavalitsya());
  if (st.world.places.den) yield* println(MAIN.napishiPrChtobyIdti());
  if (st.world.places.club) yield* println(MAIN.napishiKlChtobyIdti());
  if (st.world.places.gym) yield* println(MAIN.napishiTrnChtobyIdti());
  for (const line of COMMANDS) yield* println(line);
});

const COMMANDS = [
  MAIN.napishiSChtobyPosmotret(),
  MAIN.napishiSvChtobyPriglyadetsya(),
  MAIN.napishiKChtobyGasit(),
  MAIN.napishiVChtobyPozvat(),
  MAIN.napishiKosChtobyShavat(),
  MAIN.napishiHChtobyVypit(),
  MAIN.napishiMhChtobyNabuhatsya(),
  MAIN.napishiNameChtobySmenit(),
  MAIN.napishiEEsliZahochesh(),
];

/** `name` */
const rename = Effect.gen(function* () {
  const st = yield* started;
  yield* println(MAIN.zvaliTebya(st.player.name));
  yield* print(MAIN.aTeperBudut());
  st.player.name = yield* readLine;
  if (st.player.name === '') st.player.name = MAIN.razDolBay().format;
  st.player.name = MAIN.namePrefix().format + st.player.name;
});

/** `exit`/`e`: the results, then quit */
const exit = Effect.gen(function* () {
  yield* println(MAIN.blinNeBytTebe());
  yield* println(MAIN.aRezultat());
  yield* showStats;
  yield* readKey;
  return yield* halt;
});

/** what every command of the main prompt does (here, after everything it uses is defined) */
const MAIN_COMMANDS = {
  [CMD.main.walk]: walk(false),
  [CMD.main.run]: walk(true),
  [CMD.main.market]: market,
  [CMD.main.dealers]: dealers,
  [CMD.main.vet]: vet,
  [CMD.main.girlfriend]: girlfriend,
  [CMD.main.oldFight]: println(MAIN.perezhitkiProshlogoZhmiW()),
  [CMD.main.den]: den,
  [CMD.main.club]: club,
  [CMD.main.gym]: gym,
  [CMD.main.beer]: drinkBeer('one'),
  [CMD.main.beerUntilHealthy]: drinkBeer('untilHealthy'),
  [CMD.main.joint]: smokeJoint(10),
  [CMD.main.commands]: commands,
  [CMD.main.stats]: showStats,
  [CMD.main.shoot]: Effect.gen(function* () {
    if ((yield* started).player.body.pockets.pistol) yield* println(MAIN.tyChePsihMigom());
  }),
  [CMD.main.kick]: println(MAIN.cheMasheshKopytamiIschi()),
  [CMD.main.rename]: rename,
  [CMD.main.version]: println(MAIN.gopnikVersion102()),
  [CMD.main.help]: help,
  [CMD.main.exit]: exit,
  [CMD.main.exitShort]: exit,
} satisfies Record<Command<'main'>, unknown>;
