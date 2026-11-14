/** Game start: save selection, intro story, character creation. */
import { Effect } from 'effect';

import { clrScr, readKey, readLine, writeLn } from '../crt/crt.ts';
import { div, val } from '../tp/num.ts';
import { Disk, Game, println, print } from './prelude.ts';
import { titleScreen } from './screens.ts';

/** 0000:6A0D */
export const newGame = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const disk = yield* Disk;
  yield* clrScr;
  st.dir = 'C:\\GOP\\';
  yield* titleScreen;
  // Randomize happens here; the Rng service is seeded when it is created
  st.saveCount = 0;
  const saves = yield* disk.list(/^save_r.\.sav$/i);
  for (const name of saves) {
    if (st.saveCount > 0) yield* println('^1или');
    st.saveCount++;
    const ch = name.toUpperCase()[6];
    if (ch !== '0') yield* println(`^1Можно начать с ${ch} района`);
    if (ch === '0') yield* println('^1Можно начать с того места где ты сохранился');
  }
  if (st.saveCount > 0) {
    yield* println('^0Нажми цифру с какого района начать. 1-начать сначала');
    st.saveKey = yield* readKey;
    const key = String.fromCharCode(st.saveKey);
    if ('23450'.includes(key)) {
      const rec = yield* disk.read(`save_r${key}.sav`);
      if (rec) {
        st.district = val(key)[0];
        mem.loadRecord(rec);
        yield* println(`^0Загружено из save_r${key}`);
        if (st.district === 0) yield* loadPlaces;
        if (st.district === 0) st.district = div(st.level, 10) + 1;
        return yield* arrive;
      }
      yield* println('^6Чё-то глюкануло - нaверно нет такого сейва, Default:1');
    }
  }
  yield* createCharacter;
  yield* arrive;
});

const loadPlaces = Effect.gen(function* () {
  const { mem } = yield* Game;
  const places = yield* (yield* Disk).read('places.sav');
  if (places) {
    mem.loadPlaces(places);
    yield* println('^0Загружено из places');
    return;
  }
  yield* resetPlaces;
  yield* println('^6Чё-то глюкануло - немогу прoгрузить Places:Ресет ту Default');
});

/** places a character type keeps when moving to a new district (also used on load failure) */
export const resetPlaces = Effect.gen(function* () {
  const { st } = yield* Game;
  st.knowsHospital = 0;
  st.knowsMarket = 0;
  if (st.charType !== 3) st.knowsClub = 0;
  st.knowsGym = 0;
  if (st.charType !== 3) st.hasGirl = 0;
  st.knowsDealers = 0;
  if (st.charType !== 5) st.denAccess = 0;
});

/** 0000:6DBE */
const createCharacter = Effect.gen(function* () {
  const { st } = yield* Game;
  st.district = 1;
  st.knowsHospital = 1;
  st.knowsMarket = 1;
  st.version = '^4Gopnik: ^7version 1.02 june,sept 2003';
  st.expNext = 10;
  yield* println('Год 2xxx от Р.Х.');
  yield* readKey;
  yield* println('Последний день ты пришел в универ');
  yield* println('Ты по-страшному косил и забивал');
  yield* println('Ты ещё мог сдать все задания, которые ты взял у друзей');
  yield* println('Но тут...');
  yield* readKey;
  yield* println('^6Ректор: Ах ты урод, чёртов забивала. Вали из универа!');
  yield* readKey;
  yield* println('^2Ты: А типа чё?');
  yield* readKey;
  yield* println('^6Ректор: Ты отчислен мудак!!! Как ты был лохом так и останешься.');
  yield* readKey;
  yield* println('^4Это слышали все и ты из пацана превратился в опушенного.');
  yield* readKey;
  yield* writeLn;
  yield* println('Ты неможешь стерпеть такой наезд, однако ректор офигительно крутой.');
  yield* println('Ты решил доказать свою крутизну всему миру(в твоем понимании - Городу).');
  yield* readKey;
  yield* println('Выбери кем ты будешь: ');
  for (const line of TYPE_MENU) yield* println(line);
  yield* println('4-Чё за батва?');
  yield* readType;
  if (st.charType === 4) {
    st.charType = 0;
    yield* writeLn;
    yield* println('^1Пацан - это нормальный тип. (Бонус - Гёлфренд, Клуб).');
    yield* println('^1Отморозок - тупой корявый мудак. (Бонус - Самолечение царапин).');
    yield* println('^1Гопник - гоп он и есть гоп. (Бонус - Притон)');
    yield* println('^1Вор - везучий ублюдок. (Бонус - Воровство, Барыги)');
    yield* writeLn;
    yield* println('А теперь выбирай: ');
    for (const line of TYPE_MENU) yield* println(line);
    yield* readType;
  }
  if (st.charType < 0 || st.charType > 3) st.charType = 0;
  const [str, agi, vit, luck] = START_STATS[st.charType];
  st.str = str;
  st.agi = agi;
  st.vit = vit;
  st.luck = luck;
  st.charType += 3;
  st.hpMax = st.vit * 5 + 10 + st.str;
  st.hp = st.hpMax;
  st.dmgMin = div(st.str, 2);
  st.dmgMax = st.str;
  yield* print('^2А зовут тебя:^7 ');
  st.name = yield* readLine;
  if (st.name === '') st.name = 'Раз^6дол^4бай';
  st.name = '^7 ' + st.name;
});

const TYPE_MENU = ['0-Пацан', '1-Отморозок', '2-Гопник', '3-Вор'];

/** [str, agi, vit, luck] by the chosen number */
const START_STATS = [
  [3, 3, 3, 3],
  [5, 2, 4, 1],
  [4, 3, 3, 2],
  [3, 3, 2, 4],
] as const;

const readType = Effect.gen(function* () {
  const { st } = yield* Game;
  st.tmp = yield* readLine;
  const [v, code] = val(st.tmp);
  st.charType = v;
  st.valCode = code;
});

/** 0000:7262 — district intro, starting bonuses of the character type */
const arrive = Effect.gen(function* () {
  const { st } = yield* Game;
  switch (st.district) {
    case 1:
      yield* println('^1Ты стоишь у дверей университета.');
      yield* println('^1Отсюда ты начнешь свой нелёгкий путь гопника.');
      break;
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
      st.rector = 1;
      break;
  }
  if (st.district === 1) {
    yield* println('Доказать свою крутизну ты можешь, отпинывая разных мудаков.');
    yield* println('Тебе придётся поработать над сабой, чтобы стать крутым.');
    yield* println(
      'Введи ^6i^7 чтобы посмотреть команды, введи ^6help^7 что бы узнать чё за батва.'
    );
  }
  if (st.charType === 5) st.denAccess = 1;
  else if (st.charType === 3) {
    st.hasGirl = 1;
    st.knowsClub = 1;
  } else if (st.charType === 6) st.knowsDealers = 1;
  st.loans = 5;
});
