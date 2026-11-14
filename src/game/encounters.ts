/** Rare encounters while walking: the saving mage and the temple. */
import { Effect } from 'effect';

import { readKey, readLine, writeLn } from '../crt/crt.ts';
import { RANK_NAMES, TYPE_NAMES } from '../data/tables.ts';
import { gainRing, levelUp, strengthUp } from './hero.ts';
import { Disk, Game, lowerCase, println, rnd } from './prelude.ts';

/** 0000:7538 — Рушель Блаво offers to save the game */
export const saveMage = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const disk = yield* Disk;
  yield* println('Бродя по окрестностям с самыми грязными намериниями...');
  yield* readKey;
  yield* println('Ты встретил великого мага и экстрасенса - Рушеля Блаво.');
  yield* readKey;
  yield* println('За # рублей он может сделать сохранение прямо здесь.', st.district * 25);
  yield* readKey;
  yield* println('Ты хочешь сохраниться?');
  const answer = lowerCase(yield* readLine);
  if (answer !== 'y') return yield* println('^6Нехотите как хотите - мое дело предложить');
  if (st.district * 50 > st.money) return yield* println('^6Парень, все стоит бабок!');
  st.money -= st.district * 50;
  yield* disk.write('save_r0.sav', mem.saveRecord());
  yield* disk.write('places.sav', mem.placesRecord());
  yield* println('^0Сохранено! ^1Можешь беспредельничать дальше.');
});

/** 0000:7C67 — the temple: a random blessing */
export const temple = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const lines = (...ls: string[]) =>
    Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
  if (st.templeVisits === 2) {
    yield* println('Бродя по окрестностям с самыми грязными намериниями...');
    yield* println('Ты наткнулся на храм Божий.');
    yield* readKey;
    yield* println('^1Бог: "А ты опять."');
    yield* println('^1Ну ладно насылаю на тебя "благославление"');
    yield* readKey;
  }
  if (st.templeVisits === 1) {
    yield* lines(
      'Бродя по окрестностям с самыми грязными намериниями...',
      'Ты наткнулся на храм Божий.',
      'В прошлый раз Бог сказал чтобы ты не осквернял своей рожей святой храм',
      'Но надо бы типа помолиться о прощении',
      '^2"Господи, Братан, прости грешника опять".',
      '^1Бог: "Да блин, упорный чудак!"',
      '^1Ладно насылаю на тебя, типа, "моё благославление" снова'
    );
    st.templeVisits++;
  }
  if (st.templeVisits === 0) {
    yield* lines(
      'Бродя по окрестностям с самыми грязными намериниями...',
      'Ты наткнулся на храм Божий.',
      'Раз такая батва...',
      'Надо типа помолиться Господу Богу...              ',
      'Как делают новыё русские.',
      '^2"Господи, Братан, прости грешника". - Начал было ты...',
      '^1Громовой голос: "Да пошел ты на хрен!"',
      '^2 - Эээ.. типа.. а чё?..',
      `^1 - "а чё?" блин! ${st.name}^1-${mem.typeName(st.charType)} чёртов!`,
      '^2Ну..',
      '^1Ладна насылаю на тебя, типа, "моё благославление"'
    );
    st.templeVisits++;
  }
  switch (yield* rnd(5)) {
    case 0:
      yield* println('^1Да увеличится твоя понтовость!');
      yield* readKey;
      yield* println(`^1Был ты ${mem.rankName(st.level)} а стал ${mem.rankName(st.level + 1)}`);
      st.exp = st.expNext;
      yield* levelUp(false);
      break;
    case 1:
      switch (yield* rnd(4)) {
        case 0:
          yield* println('^1Да увеличиться твоя сила!');
          yield* strengthUp;
          break;
        case 1:
          yield* println('^1Да уменьшиться твоя корявость!');
          st.agi++;
          break;
        case 2:
          yield* println('^1Да возрастут твой силы жизненные!');
          st.vit++;
          st.hpMax += 5;
          st.hp += 5;
          break;
        case 3:
          yield* println('^1Да снизойдет на тебя удача!');
          st.luck++;
          break;
      }
      break;
    case 2:
      yield* println('^1Дарю тебе феньку!');
      yield* gainRing('^1"Мега Кольцо"! со своего, можно сказать, пальца');
      break;
    case 3:
      yield* println('^1Накладываю на тебя защиту!');
      st.armor++;
      break;
    case 4:
      yield* println('^1Да увеличится, офигенно, твоя понтовость среди гопоты!');
      st.respect += st.district * 50 + 50;
      yield* println('^1Получи #!', st.district * 50 + 50);
      break;
  }
  yield* readKey;
  if (st.templeVisits < 2) yield* println('^1А теперь вали отсюда и никогда здесь не появляйся!');
  else yield* println('^1А теперь проваливай!');
  st.event = 0;
  yield* writeLn;
  yield* println('Ты идещь дальше...');
});
