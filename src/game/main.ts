/** The main command loop of G.EXE (0000:AB59) and walking around (`w`/`run`). */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt.ts';
import { TYPE_NAMES } from '../data/tables.ts';
import { str } from '../tp/num.ts';
import { saveMage, temple } from './encounters.ts';
import { setupRector, spawnEnemy } from './enemy.ts';
import { fight, smokeJoint } from './fight.ts';
import { drinkBeer, showStats } from './hero.ts';
import { club, dealers, den, girlfriend, gym, luckAtLeast, market, prompt, vet } from './places.ts';
import { Disk, Game, halt, lowerCase, print, println, rnd } from './prelude.ts';
import { help } from './screens.ts';
import { resetPlaces } from './start.ts';

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
    if (cmd === 'fight') yield* println('^6Пережитки прошлого жми ^6w^7 чтобы искать врагов');
    if (cmd === 'pr') yield* den;
    if (cmd === 'kl') yield* club;
    if (cmd === 'trn') yield* gym;
    yield* drinkBeer(cmd);
    if (cmd === 'kos') yield* smokeJoint(10);
    if (cmd === 'i') yield* commands;
    if (cmd === 's') yield* showStats;
    if (cmd === 'f' && st.pistol) yield* println('^6Ты чё псих? мигом менты накроют!');
    if (cmd === 'k') yield* println('^6Чё машешь копытами? Ищи мудака которого будешь пинать!');
    if (cmd === 'name') yield* rename;
    if (cmd === 'version') yield* println('^4Gopnik: ^7version 1.02 june,sept 2003');
    if (cmd === 'help') yield* help;
    if (cmd === 'exit' || cmd === 'e') {
      yield* println('^6Блин не быть тебе нормальным пацаном');
      yield* println('^1А результат:');
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
  yield* println('^1Ты доказал, что ты самый крутой в этом районе - отправляйся в следующий');
  yield* println('^0Хочешь сохранить свои достижения?');
  if ((yield* prompt('\\')) === 'y') {
    st.tmp = str(st.district);
    yield* (yield* Disk).write(`save_r${st.tmp}.sav`, mem.saveRecord());
    yield* println(`^1Сохранено в save_r${st.tmp}.sav`);
  }
  switch (st.district) {
    case 2:
      yield* println('^1Ты сел на автобус и попёрся на шлюз...');
      yield* println('^1Там бродит шлюзовская шпана.');
      break;
    case 3:
      yield* println('^1На маршрутке ты доехал до ОбьГЭСа...');
      yield* println('^1Здесь бродит уже более крутая гопота.');
      break;
    case 4:
      yield* println('^1Ты приехал в Ельцовку...');
      yield* println('^1Ото всюду доносятся крики запинываемых.');
      break;
    case 5:
      yield* println('^1Пора наконец отомстить ректору...');
      yield* readKey;
      yield* println('^1Ты пробрался в универ, в тёмный ректорский кабинет...');
      yield* println('^1А вот и он...');
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
      yield* println('^6Глюки прошли. Сила -2.');
    }
  }
  if (st.cmd === 'run') yield* println('^6Забегал мудак.');
  if (st.loans < st.district * 10) st.loans++;
  if (st.knowsDealers && st.pistol && st.phoneCalls < 25) {
    st.phoneCalls++;
    if (st.phoneCalls === 25 && st.phone === 1)
      yield* println(
        'Телефон:^6Алё, ты где? Приходи, мы вещицу для тебя раздобыли.(Иди к барыгам)'
      );
  }
  if (!st.denQuestHelp && (yield* rnd(20)) === 0) {
    st.denQuestHelp = 1;
    if (st.denAccess && st.phone === 1)
      yield* println(`Телефон:^6Алё,${st.name}^6? ты где щас? Тут помощь нужна.(Иди в притон)`);
  }
  if (!st.denQuestJob && (yield* rnd(20)) === 0) {
    st.denQuestJob = 1;
    if (st.denAccess && st.respect >= 100 && st.phone === 1)
      yield* println(`Телефон:^6Алё,${st.name}^6? ты щас где? Базар есть.(Иди в притон)`);
  }
  if (st.phone === 1 && (yield* rnd(200)) === 0) {
    yield* println('Телефон:^6Алё Вася?');
    yield* readKey;
    yield* println(`^2Нет это ${st.name}.`);
    yield* readKey;
    yield* println('Телефон:^6А Васю можно?');
    yield* readKey;
    yield* println('^2Нет, он будет в больнице в ближайшие 2 месяца.');
  }
  if (st.phone === 1) {
    if ((yield* rnd(100)) === 0 && st.hasGirl) {
      yield* println('Телефон(Твоя пассия):^5Привет, это я. Зайдешь ко мне сегодня?');
      yield* println('^2А ты: Безбазаров, жди.');
    }
    if (st.marketHeat === 1 && st.denAccess)
      yield* println('Телефон:^2Это ты там на базаре шухер наводил? Ну короче там менты свалили.');
    if (st.clubHeat === 1 && st.denAccess)
      yield* println('Телефон:^2Ты че там, в клуб-та пойдёшь. Уже утряслось всё.');
  }
  if (st.marketHeat > 0) st.marketHeat--;
  if (st.clubHeat > 0) st.clubHeat--;
  if ((yield* rnd(10)) === 0 && !st.knowsHospital) {
    st.knowsHospital = 1;
    yield* println('^1Ты спросил у прохожего где больница.');
  }
  if ((yield* rnd(10)) === 0 && !st.knowsMarket) {
    st.knowsMarket = 1;
    yield* println('^1Ты нашел базар.');
  }
  if ((yield* rnd(100)) === 0 && !st.knowsClub) {
    st.knowsClub = 1;
    yield* println('^1Ты увидел объявление "Типа заходи в наш понтовый клуб".');
  }
  if ((yield* rnd(100)) === 0 && !st.knowsGym) {
    st.knowsGym = 1;
    yield* println('^1На стене реклама "Жизнь тяжела. Если не хочешь сдохнуть качайся!".');
  }
  if (st.ringGp) {
    if (st.hp < st.hpMax) {
      st.hp += 3;
      if (st.hp > st.hpMax) st.hp = st.hpMax;
    }
    if ((yield* rnd(20)) === 0) {
      if (!st.jawBroken && st.legBroken) {
        st.legBroken = 0;
        yield* println('^2Твоя нога залечилась с Божей помощью.');
      }
      if (st.jawBroken) {
        st.jawBroken = 0;
        yield* println('^2Твоя челюсть залечилась с Божей помощью.');
      }
    }
  }
  if (st.charType === 4) {
    if (st.hp < st.hpMax) st.hp++;
  } else if (st.charType === 6 && (yield* luckAtLeast(st.district * 20))) {
    st.found = (yield* rnd(st.district * 5)) + 1;
    st.money += st.found;
    yield* println('^2Опа бабки! # рублей на пиво!', st.found);
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
      return yield* println('Ничё не происходит.');
  }
});

const toggleTrail = Effect.gen(function* () {
  const { st } = yield* Game;
  st.trail = st.trail === 0 ? 1 : 0;
  const msgs = st.trail ? TRAIL_IN : TRAIL_OUT;
  if (st.district >= 1 && st.district <= 4) yield* println(msgs[st.district - 1]);
});

const TRAIL_IN = [
  '^6Ты зашел на тропинку где бродит искитимская гопота.',
  '^6Ты зашел в какие-то дебри подваротен.',
  '^6Ты зашел на планы.',
  '^6Ты зашел чёрте куда.',
];
const TRAIL_OUT = [
  '^6Ты вышел с тропинки.',
  '^6Ты вышел из подваротен.',
  '^6Ты вышел с планов.',
  '^6Ты вышел чёрте откуда.',
];

const prettyGirl = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.hasGirl) return yield* println('Совсем ничё не происходит.');
  yield* println('^5Идет типа клёвая цыпа. Хочешь её зацепить?');
  st.input = lowerCase(yield* readLine);
  if (st.input !== 'y') return;
  if ((yield* rnd(2)) === 0) {
    yield* println('^5Ты такой подкатываешь, а она:"Глянулся ты мне парниша"');
    st.hasGirl = 1;
  } else yield* println('^4Ты ещё подкатить неуспел - а она:"Отдыхай урод". - Тебя обломали кент');
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
      yield* println(`^6Идет ${type} # уровня. Хочешь наехать?`, st.eLevel);
      st.input = lowerCase(yield* readLine);
      if (st.input === 'y') st.engaged = 1;
    } else {
      yield* println(`^6Идет ${type} # уровня, ищущий кого отпинать. Хочешь наехать?`, st.eLevel);
      st.input = lowerCase(yield* readLine);
      if (st.input === 'y') st.engaged = 1;
      else if ((yield* rnd(2)) === 0) {
        yield* println('^4Он тебя заметил.');
        st.engaged = 1;
      } else yield* println('^2Ты смылся.');
    }
  } else {
    yield* println('^6Идет ментяра # уровня гроза гопов.', st.eLevel);
    if (yield* luckAtLeast(st.district * 7 + 15))
      yield* println('^2Ты затаился, прикинулся не гопом... Мент вроде не заметил');
    else if (st.glasses === 1) {
      yield* println(
        '^2Ты напялил тёмные очки и мент не узнал твою рожу, которая весит на почётном'
      );
      yield* println('^2стенде "Разыскиваются за гопничество"');
    } else {
      yield* println('^4Запалил!');
      st.engaged = 1;
    }
  }
  if (st.engaged) yield* fight(0);
});

const nothingHappens = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  if (st.stoned > 0 && (yield* rnd(7)) === 0)
    yield* println('Все куда-то плывёт - совсем башню заклинило');
  if (st.stoned > 0 && (yield* rnd(7)) === 0) {
    const type = mem.typeName(yield* rnd(7));
    yield* println(`^6Идет ${type} # уровня. Хочешь наехать?`, yield* rnd(st.district * 10 + 1));
    st.input = yield* readLine;
    yield* println('^6Чё за ботва? ни кого нет.. глюки какие-то...');
  } else yield* println('Ничё не происходит.');
});

/** `i` */
const commands = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println(
    'Напиши: ^6w^7    чтобы шататься по окрестностям - искать на свою жопу приключения'
  );
  if (st.knowsMarket === 1) yield* println('Напиши: ^6mar^7  чтобы идти на рынок');
  if (st.knowsDealers === 1) yield* println('Напиши: ^6bmar^7 чтобы идти к барыгам');
  if (st.knowsHospital === 1) yield* println('Напиши: ^6rep^7  чтобы идти к ветеринару');
  if (st.hasGirl === 1) yield* println('Напиши: ^6girl^7 чтобы завалиться к своей девчонке');
  if (st.denAccess === 1) yield* println('Напиши: ^6pr^7   чтобы идти в местный притон гопоты');
  if (st.knowsClub === 1) yield* println('Напиши: ^6kl^7   чтобы идти в клуб');
  if (st.knowsGym === 1) yield* println('Напиши: ^6trn^7  чтобы идти в качалку');
  for (const line of COMMANDS) yield* println(line);
});

const COMMANDS = [
  'Напиши: ^6s^7    чтобы посмотреть в лужу на свою уродскую рожу',
  'Напиши: ^6sv^7   чтобы приглядеться к пинаемому мудаку',
  'Напиши: ^6k^7    чтобы гасить мудака который тебе попался на дороге',
  'Напиши: ^6v^7    чтобы позвать подкрепление',
  'Напиши: ^6kos^7  чтобы схавать косяк',
  'Напиши: ^6h^7    чтобы выпить пиво (если не охото к ветеринару)',
  'Напиши: ^6mh^7   чтобы набухаться до чёртиков',
  'Напиши: ^6name^7 чтобы сменить погоняло',
  'Напиши: ^6e^7    если захочешь выйти',
];

/** `name` */
const rename = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println(`^2Звали тебя:^7 ${st.name}`);
  yield* print('^2А теперь будут:^7 ');
  st.name = yield* readLine;
  if (st.name === '') st.name = 'Раз^6дол^4бай';
  st.name = '^7 ' + st.name;
});
