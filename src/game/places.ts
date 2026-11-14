/** Places of a district: market, dealers, vet, girlfriend, den, club, gym. */
import { Effect } from 'effect';

import { readLine, writeLn } from '../crt/crt.ts';
import { PRICE, TYPE_NAMES } from '../data/tables.ts';
import { mod } from '../tp/num.ts';
import { spawnEnemy } from './enemy.ts';
import { fight } from './fight.ts';
import { levelUp } from './hero.ts';
import { Game, lowerCase, print, println, rnd } from './prelude.ts';

/** 0000:B940 — `mar` */
export const market = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsMarket !== 1) return yield* println('^6Ты незнаешь, пока ешё, где находтся базар');
  if (st.marketHeat !== 0)
    return yield* println('^6На базар пока нельзя там менты бродят, тебя ищут.');
  yield* println('Ты пришел на базар напиши  ^6w^7  чтобы уйти.');
  yield* println('Можно потискать здесь у лохов кошельки(^6t^7).');
  yield* println('А можно чё-то купить');
  yield* offer(1, PRICE.hotdog, ' руб.  Хотдог(3-4 з)');
  yield* offer(2, PRICE.beer, ' руб.  Пиво(#з)', 5);
  yield* offer(3, PRICE.glasses, ' руб. Затемнённые очки(Чтоб менты не узнали)');
  yield* offer(4, PRICE.abibas, ' руб. Реальный спортивный костюм abibas(Смягчает пинок на 1)');
  yield* offer(5, PRICE.boots, ' руб. Понтовые бутсы(Увеличивают урон)');
  if (st.district > 1) {
    yield* offer(
      6,
      PRICE.leather,
      ' руб. Реальную кожанку(Дополнительная защита от случайностей на 2)'
    );
    yield* offer(7, PRICE.adidas, ' руб. Реальный спортивный костюм adidas(Смягчает пинок на 2)');
  }
  if (st.district > 2) yield* offer(8, PRICE.boots2, ' руб. Понтовёйшие бутсы(Урон+2)');
  if (st.district > 3) yield* offer(9, PRICE.leather2, ' руб. Ваще крутую кожанку(Броня +4)');
  do {
    yield* prompt('^0Базар\\');
    if (st.input === '1') {
      if (st.jawBroken === 1) yield* println('^4Ты не можешь хавать из-за сломаной челюсти.');
      else if (st.hp < st.hpMax) {
        if (PRICE.hotdog > st.money) yield* println('^4Чёрт, бабок даже на жратву не хватает.');
        else {
          st.money -= PRICE.hotdog;
          st.hp += (yield* rnd(2)) + 3;
          if (st.hp > st.hpMax) st.hp = st.hpMax;
          yield* println('^2Ты сожрал хот-дог');
        }
      } else yield* println('^6Да неохота хавать');
    }
    if (st.input === '2') {
      if (PRICE.beer > st.money) yield* println('^4Не хватает');
      else {
        st.money -= PRICE.beer;
        yield* println(BEER_LINES[yield* rnd(3)]);
        st.beer++;
      }
    }
    if (st.input === '3') {
      if (st.glasses) yield* println('^6У тебя есть очки от солнца.');
      else if (PRICE.glasses > st.money) yield* println('^4Не хватает бабок');
      else {
        st.glasses = 1;
        st.money -= PRICE.glasses;
        yield* println('^2Модные такие очки от солнца.');
      }
    }
    if (st.input === '4') {
      if (st.adidas) yield* println('^6У тебя есть более крутой костюм.');
      else if (st.abibas) yield* println('^6У тебя уже есть костюм.');
      else if (PRICE.abibas > st.money) yield* println('^4Не хватает денег');
      else {
        st.abibas = 1;
        st.money -= PRICE.abibas;
        yield* println('^2Теперь ты больше похож на гопа.');
        st.armor++;
      }
    }
    if (st.input === '5') {
      if (st.boots2) yield* println('^6У тебя бутсы по круче.');
      else if (st.boots) yield* println('^6У тебя такие уже есть.');
      else if (PRICE.boots > st.money) yield* println('^4Нету на них денег');
      else {
        st.boots = 1;
        st.money -= PRICE.boots;
        yield* println('^2Зацени красовки.');
        st.dmgMin++;
        st.dmgMax++;
      }
    }
    if (st.district > 1 && st.input === '6') {
      if (st.leather2) yield* println('^6Утебя есть кожанка круче.');
      else if (st.leather) yield* println('^6Ты уже купил это.');
      else if (PRICE.leather > st.money) yield* println('^4Не достаточно бабла');
      else {
        st.leather = 1;
        st.money -= PRICE.leather;
        yield* println('^2Ну весь на понтах.');
        st.armor += 2;
      }
    }
    // sic: no district check for the adidas suit
    if (st.input === '7') {
      if (st.adidas) yield* println('^6У тебя уже есть этот костюм.');
      else if (PRICE.adidas > st.money) yield* println('^4Не хватает денег');
      else {
        st.adidas = 1;
        st.money -= PRICE.adidas;
        yield* println('^2Чистый гопник.');
        st.armor += st.abibas ? 1 : 2;
      }
    }
    if (st.district > 2 && st.input === '8') {
      if (st.boots2) yield* println('^6У тебя такие уже есть.');
      else if (PRICE.boots2 > st.money) yield* println('^4Нету на них денег');
      else {
        st.boots2 = 1;
        st.money -= PRICE.boots2;
        yield* println('^2Офигенные бутцы.');
        const bonus = st.boots ? 1 : 2;
        st.dmgMin += bonus;
        st.dmgMax += bonus;
      }
    }
    if (st.district > 3 && st.input === '9') {
      if (st.leather2) yield* println('^6Ты уже купил это.');
      else if (PRICE.leather2 > st.money) yield* println('^4Не достаточно бабла');
      else {
        st.leather2 = 1;
        st.money -= PRICE.leather2;
        yield* println('^2Ну крутой, сдохнуть можно!');
        st.armor += st.leather ? 2 : 4;
      }
    }
    if (st.input === 't') yield* pickpocket;
  } while (st.input !== 'w');
});

const BEER_LINES = [
  '^2Глинское? Чё за нафиг? А ладно.',
  '^2Пивко. Холодненькое.',
  '^2Ну чё по пиву?.',
];

const pickpocket = Effect.gen(function* () {
  const { st } = yield* Game;
  if ((yield* luckAtLeast(st.district * 5 + 5)) && (yield* rnd(10)) < 9) {
    st.found = (yield* rnd(st.luck * 2)) + 1;
    st.money += st.found;
    yield* println('^2Опа бабки! # рублей на пиво!', st.found);
    yield* gainExp(st.district * 2);
    return;
  }
  yield* spawnEnemy(1);
  st.engaged = 1;
  yield* println('^4Корявый! ты попался!');
  yield* println(`^6Это ${TYPE_NAMES[st.eType]} # уровня.`, st.eLevel);
  yield* fight(1);
  yield* println('^6Блин менты запалят сматывайся!.');
  st.input = 'w';
  st.marketHeat = 5;
});

/** 0000:C4B4 — `bmar` */
export const dealers = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsDealers !== 1)
    return yield* println(
      '^6Туда любого дебила с улицы непропустят - сначала докажи, что ты не засранец - отпинай побольше ублюдков'
    );
  yield* println('Ты пришел к барыгам напиши  ^6w^7  чтобы уйти.');
  yield* println('Здесь можно толкнуть хлам(^6x^7) и купить кое-что');
  yield* println('Ещё ты можешь продать ненужные вещи - ^6wes^7');
  yield* offer(1, PRICE.joint, ' руб. Косяк');
  yield* offer(2, PRICE.phone, ' руб. Краденый мобильник(Подмога быстрее приходит)');
  yield* offer(3, PRICE.superJoint, ' руб. Офигенный косяк(Очко прокачки)');
  yield* offer(
    4,
    PRICE.tattoo,
    ' руб. Сделать типа зоновскую наколку(Шансы, что наедут -50%(кроме бандитов, ментов и маньяков))'
  );
  if (st.district > 1) yield* offer(5, PRICE.knuckles, ' руб. Кастет(урон+2)', 5);
  if (st.district > 2) yield* offer(6, PRICE.club, ' руб. Дубинка(урон+4), заменяет кастет', 5);
  if (st.district > 3)
    yield* offer(
      7,
      PRICE.pistol,
      ' руб. Самопальный пистолет (Можно стрелять в бандитских районах - ^6f^7 урон(#-#)).',
      20,
      30
    );
  if (st.district > 3) yield* offer(8, PRICE.bullets, ' руб. Патроны - 6.');
  // sic: colour by the silencer price, but the bullets price is shown
  if (st.district > 3 && st.pistol && st.phoneCalls === 25)
    yield* offerShowing(9, PRICE.silencer, PRICE.bullets, ' руб. Глушитель.');
  do {
    yield* prompt('^0Барыги\\');
    if (st.input === '1') {
      if (PRICE.joint > st.money) yield* println('^4Чёрт, бабок не хватает.');
      else {
        st.money -= PRICE.joint;
        st.joints++;
        yield* println('^2Ты купил косяк');
      }
    }
    if (st.input === '2') {
      if (st.phone) yield* println('^6У тебя уже есть мобила.');
      else if (PRICE.phone > st.money) yield* println('^4Нету денег');
      else {
        st.phone = 1;
        st.money -= PRICE.phone;
        yield* println('^2Чё ты модный типа да?.');
      }
    }
    if (st.input === '3') {
      if (PRICE.superJoint > st.money) yield* println('^4Не хватает');
      else {
        st.money -= PRICE.superJoint;
        yield* println('^2Пошли стероиды!');
        const r = yield* rnd(4);
        if (r === 0) {
          st.str++;
          yield* println('^1Сила +1 ');
          st.dmgMax++;
          if (mod(st.str, 2) === 0) st.dmgMin++;
          st.hpMax++;
          st.hp++;
        } else if (r === 1) {
          st.agi++;
          yield* println('^1Ловкость +1 ');
        } else if (r === 2) {
          st.vit++;
          yield* println('^1Живучесть +1 ');
          st.hpMax += 5;
          st.hp += 5;
        } else if (r === 3) {
          st.luck++;
          yield* println('^1Удача +1 ');
        }
      }
    }
    if (st.input === '4') {
      if (st.tattoo) yield* println('^6Сделать, конечно, можно но толку не будет.');
      else if (PRICE.tattoo > st.money) yield* println('^4Нету денег');
      else {
        st.tattoo = 1;
        st.money -= PRICE.tattoo;
        yield* println('^2Чистый зек.');
      }
    }
    if (st.input === '5') {
      if (st.club && st.knife && st.cleaver)
        yield* println('^6Нафиг тебе он нужен, когда есть более мощное оружие.');
      else if (st.knuckles) yield* println('^6У тебя есть эта железка.');
      else if (PRICE.knuckles > st.money) yield* println('^4Не хватает деньжат');
      else {
        st.knuckles = 1;
        st.money -= PRICE.knuckles;
        st.dmgMin += 2;
        st.dmgMax += 2;
        yield* println('^2Ты купил кастет смотри чтоб менты с ним не запалили.');
      }
    }
    if (st.input === '6') {
      if (st.knife && st.cleaver)
        yield* println('^6Да нафиг она нужна, когда есть более мощное оружие.');
      else if (st.club) yield* println('^6У тебя есть дубина.');
      else if (PRICE.club > st.money) yield* println('^4Не хватает на дубинку деньжат');
      else {
        st.club = 1;
        st.money -= PRICE.club;
        if (st.knuckles) {
          st.dmgMin += 2;
          st.dmgMax += 2;
        }
        yield* println('^2Ты купил дубинку - похоже задумал чё-то нехорошее.');
      }
    }
    if (st.input === '7') {
      if (st.pistol) yield* println('^6Ну.. ты.. ВАЩЕ ОФИГЕЛ!');
      else if (PRICE.pistol > st.money) yield* println('^4Дорогая штука!');
      else {
        st.pistol = 1;
        st.bullets += 3;
        st.money -= PRICE.pistol;
        yield* println('^2Спасайся кто может!!!');
        yield* println('^0Только помни стреляй в бандитских районах - там менты не накроют');
      }
    }
    if (st.input === '8') {
      if (!st.pistol) yield* println('^6Нету пушки. Сначала купи пистолет');
      else if (PRICE.bullets > st.money) yield* println('^4Нехватка денег.');
      else {
        st.bullets += 5;
        st.money -= PRICE.bullets;
        yield* println('^2Получи пять пуль.. на руки');
      }
    }
    if (st.input === '9' && st.pistol && st.phoneCalls === 25) {
      if (st.silencer) yield* println('^6Да купил уже, купил');
      else if (PRICE.silencer > st.money) yield* println('^4Подкопи бабла.');
      else {
        st.silencer = 1;
        st.money -= PRICE.silencer;
        yield* println('^2Теперь стреляй где хочешь!');
      }
    }
    if (st.input === 'x') {
      if (st.junk > 0) {
        st.money += st.junk;
        st.junk = 0;
        yield* println('^6Барыги дали тебе денег за хлам.');
      } else yield* println('^4Тебе нечего спихнуть.');
    }
    if (st.input === 'wes') yield* sellStuff;
  } while (st.input !== 'w');
});

const sellStuff = Effect.gen(function* () {
  const { st } = yield* Game;
  st.sold = 255;
  const sell = (question: string, base: number, spread: number, done: string, drop: () => void) =>
    Effect.gen(function* () {
      yield* println(question);
      const answer = yield* prompt('^0Продать вещи\\');
      st.sold = (yield* rnd(spread)) + base;
      if (answer !== 'y') return;
      drop();
      st.money += (st.sold << 24) >> 24;
      yield* println(done, (st.sold << 24) >> 24);
    });
  if (st.abibas && st.adidas)
    yield* sell(
      '^2У тебя есть ненужный костюм хочешь продать?',
      8,
      5,
      '^2Ты продал костюм за #.',
      () => {
        st.abibas = 0;
      }
    );
  if (st.boots && st.boots2)
    yield* sell(
      '^2У тебя есть ненужные кроссовки хочешь продать?',
      8,
      5,
      '^2Ты продал кроссовки за #.',
      () => {
        st.boots = 0;
      }
    );
  if (st.leather && st.leather2)
    yield* sell(
      '^2У тебя есть ненужная кожанка хочешь продать?',
      13,
      8,
      '^2Ты продал кожанку за #.',
      () => {
        st.leather = 0;
      }
    );
  if (st.knuckles && (st.club || st.knife || st.cleaver))
    yield* sell(
      '^2У тебя есть кастет, а это отстой хочешь продать?',
      13,
      8,
      '^2Ты продал кастет за #.',
      () => {
        st.knuckles = 0;
      }
    );
  if (st.club && (st.knife || st.cleaver))
    yield* sell(
      '^2У тебя есть дубинка - барахло - хочешь продать?',
      25,
      15,
      '^2Ты продал дубинку за #.',
      () => {
        st.club = 0;
      }
    );
  if (st.knife && st.cleaver)
    yield* sell(
      '^2У тебя есть ножик и тeсак, хочешь продать ножик?',
      38,
      23,
      '^2Ты продал ножик за #.',
      () => {
        st.knife = 0;
      }
    );
  if (st.sold === 255) yield* println('^6У тебя нет неужных вещей.');
  st.input = ' ';
});

/** 0000:D39C — `rep`: the vet */
export const vet = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsHospital !== 1) return yield* println('^6Сначала найди где находтся эта больница');
  yield* println('Ты пришел на ремот, к ветеринару напиши  ^6w^7  чтобы уйти');
  const healthy = () => st.hp >= st.hpMax && !st.jawBroken && !st.legBroken;
  if (!healthy()) {
    yield* println('^0Док: не волнуйся всё зарастёт как на собаке');
    st.color = st.money >= 3 ? 48 : 52;
    yield* println(`  ^2h^7 - за ^${String.fromCharCode(st.color)}3^7 рубля тебя залатают`);
    st.color = st.money >= 7 ? 48 : 52;
    yield* println(`  ^2r^7 - за ^${String.fromCharCode(st.color)}7^7 рублей починят переломы`);
  }
  for (;;) {
    if (healthy()) return yield* println('^0Док: вали отсюда ты здоров.');
    yield* prompt('^0Ветеренар\\');
    if (st.input === 'r' && (st.jawBroken === 1 || st.legBroken === 1)) {
      if (st.money >= 7) {
        st.money -= 7;
        st.jawBroken = 0;
        st.legBroken = 0;
        yield* println('^0Ого! да тебя не иначе как грузовик откатал!');
        yield* println('^2Твои переломы залечены.');
      } else yield* println('^4Блин халявщик, медицина не бесплатная');
    }
    if (st.input === 'h' && st.hp < st.hpMax) {
      if (st.money >= 3) {
        st.money -= 3;
        st.hp += 5;
        if (st.hp > st.hpMax) st.hp = st.hpMax;
        const r = yield* rnd(3);
        if (r === 1) yield* println('^0Щас гайки подтянем и будешь как новый!');
        else if (r === 2)
          yield* println('^0Так чё тут у нас? Ага, пара швов и всё будет в порядке.');
        else {
          yield* println('^6Эй, Док а зачем тебе паяльник?');
          yield* println('^0Док: Молчи животное!');
        }
        yield* println('^2Здоровья #/#', st.hp, st.hpMax);
      } else yield* println('^4Блин халявщик, медицина не бесплатная');
    }
    if (st.input === 'w' || st.input === 'e') return;
  }
});

/** 0000:D6E3 — `girl` */
export const girlfriend = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.hasGirl !== 1) return yield* println('^4У тебя пока нет девчонки.');
  if (st.money < 12) return yield* println('^6Ну непойдёшь же как придурок без ничего.');
  yield* println('^2Ты пришел к своей подруге.');
  if ((yield* rnd(2)) === 0 && !st.knowsClub) {
    yield* println('^2Она вытащила тебя в клуб и теперь ты знаешь где он находиться.');
    st.knowsClub = 1;
  }
  yield* println('^6Ты купил ей чё-то, потратив 12 рублей.');
  yield* println('^2Ты расслабился, отдохнул и снова можешь творить свои гоповские дела.');
  st.hp = st.hpMax;
  st.money -= 12;
  st.marketHeat = 0;
});

/** 0000:D80C — `pr`: the den */
export const den = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.denAccess !== 1)
    return yield* println('^4Тебя мудака такого туда не пустят - поднимай понтовость');
  yield* print('Ты пришел в притон - ');
  if (st.district === 1) yield* println('^0общагу №#', (yield* rnd(6)) + 3);
  if (st.district === 2) yield* println('^0общагу ВКИ');
  if (st.district === 3) yield* println('^0гоповский притон');
  if (st.district === 4) yield* println('^0притон отморозков');
  yield* writeLn;
  const rel = () => st.level - (st.district - 1) * 10;
  const curious = () => !st.knowsDealers || !st.knowsGym;
  if (st.denQuestHelp === 1) yield* println('^6На одного пацана наехал какой-то урод');
  if (st.denQuestJob && st.respect >= 100) yield* println('^6Ты пацан нормальный. Есть дело.');
  if (curious() && (rel() - 5) * 5 + st.respect >= 40)
    yield* println('^6Пацаны хотят тебе кое-чё сказать');
  yield* writeLn;
  yield* println('Напиши ^6w^7 чтобы уйти');
  st.color = st.beer !== 0 ? 48 : 52;
  yield* println(`Напиши ^${String.fromCharCode(st.color)}p^7  чтобы угостить пацанов пивом`);
  st.color = st.respect >= 2 ? 48 : 52;
  if (st.loans > 0)
    yield* println(`Напиши ^${String.fromCharCode(st.color)}r^7  чтобы занять 2 рубля`);
  if (st.denQuestHelp === 1)
    yield* println('Напиши ^6hp^7 чтобы отпинать мудака который наезжал на пацана');
  yield* println('Напиши ^6s^7  чтобы узнать отношение');
  if (curious() && (rel() - 5) * 5 + st.respect >= 40)
    yield* println('Напиши ^6a^7  чтобы спросить чё-то');
  if (st.respect >= 100 && st.denQuestJob) yield* println('Напиши ^6d^7 чтобы пойти на дело');
  do {
    yield* prompt('^0Притон\\');
    if (st.input === 'p') {
      if (st.beer > 0) {
        st.beer--;
        st.respect += 5;
        yield* println('^2Ты угостил пацанов пивом. Понтовость улутшилась на 5.');
      } else yield* println('^6А нет у тебя пива.');
    }
    if (st.input === 'r') {
      if (st.loans <= 0) yield* println('^6Ты уже всю мелочь выгреб!');
      else if (st.respect > 0) {
        st.money += 2;
        st.respect -= 2;
        st.loans--;
        yield* println('^2Ты занял 2 рубля на пиво. Понтовость уменьшилась на 2.');
      } else yield* println('^6Ты не можешь занять денег.');
    }
    if (st.denQuestHelp === 1 && st.input === 'hp') {
      yield* spawnEnemy(1);
      st.engaged = 1;
      yield* println(`^6Это ${TYPE_NAMES[st.eType]} # уровня.`, st.eLevel);
      yield* fight(6);
      st.denQuestHelp = 0;
    }
    if (st.input === 's') {
      yield* println('^4Твоя понтовость сейчас = #.', st.respect);
      if (st.district * 10 + 10 <= st.respect)
        yield* println('^0Да если чё мы за тебя впрягаемся.');
    }
    if (curious() && rel() * 2 + st.respect >= 40 && st.input === 'a') {
      st.knowsDealers = 1;
      st.knowsGym = 1;
      yield* println('^0Тут у нас есть пара мест куда тебе стоит сходить');
      yield* println('^2Ты узнал где находится качалка и где находятся барыги');
    }
    if (st.input === 'd' && st.respect >= 100 && st.denQuestJob) yield* job;
  } while (st.input !== 'w');
});

const job = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println('^0Давай быстрее..');
  yield* println('^2Ты пришел воровать деньги');
  if (yield* luckAtLeast(st.district * 15)) {
    yield* println('^2Ты наваровал денег');
    st.money += st.district * 10 + (yield* rnd(st.district * 10));
    st.junk += st.district * 10 + (yield* rnd(st.district * 10));
    yield* gainExp(st.district * 12);
  } else {
    yield* println('^4Шухер менты!');
    if (yield* luckAtLeast(st.district * 15)) yield* println('^2Ты смылся от ментов.');
    else {
      yield* spawnEnemy(2);
      yield* fight(5);
      yield* println('^6Пора валить!');
    }
  }
  st.denQuestJob = 0;
});

/** 0000:DEFC — `kl`: the club */
export const club = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsClub !== 1) return yield* println('^6Ты пока что неузнал где в этом районе клуб');
  if (st.clubHeat > 0) return yield* println('^6Тебе не стоит пока туда соваться');
  yield* println('Ты пришел в клуб напиши  ^6w^7  чтобы уйти');
  yield* println(' Здесь можно сыграть в карты (^6p^7 Минимальная ставка- 5р.)');
  st.color = st.money >= 15 ? 48 : 52;
  yield* println(
    ` 1 -  ^${String.fromCharCode(st.color)}15^7  потусоваться на дискотеке(Ловкость +1)`
  );
  if (st.district > 1) {
    st.color = st.money >= 22 ? 48 : 52;
    yield* println(
      ` 2 -  ^${String.fromCharCode(st.color)}22^7  разузнать приемы мухлёжников(Удача +1)`
    );
  }
  st.bet = 5;
  do {
    yield* prompt('^0Клуб\\');
    if (st.input === 'p') {
      if (st.bet <= st.money) yield* playCards;
      else yield* println('^6Не хватает денег - надо #.', st.bet);
    }
    if (st.input === '1') {
      if (st.money >= 15) {
        st.money -= 15;
        yield* println('^2Ты прокачиваешь ловкость.');
        st.agi++;
        yield* println('^1Ловкость +1 ');
      } else yield* println('^4Не хватает');
    }
    if (st.district > 1 && st.input === '2') {
      if (st.money >= 22) {
        st.money -= 22;
        yield* println('^2Ты прокачиваешь удачу.');
        st.luck++;
        yield* println('^1Удача +1 ');
      } else yield* println('^4Не хватает');
    }
  } while (st.input !== 'w');
});

const playCards = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println('Ты поставил # рублей', st.bet);
  st.money -= st.bet;
  if (yield* luckAtLeast(st.district * 12)) {
    st.money += st.bet * 2;
    yield* println('^2Ты выиграл # рублей ', st.bet);
    st.bet += 2;
    yield* gainExp(st.district);
  } else {
    yield* println('^4Ты проиграл # рублей', st.bet);
    st.bet = 5;
  }
  if (st.bet < 17 && st.bet > 5) yield* println('^6Ставки изменились. Теперь ставка - #', st.bet);
  if (st.bet < 17) return;
  yield* spawnEnemy(1);
  st.engaged = 1;
  yield* println('^4Козёл! Да ты мухлевал!');
  yield* println(`^6Это ${TYPE_NAMES[st.eType]} # уровня.`, st.eLevel);
  yield* println('^6Ты получаешь # качков опыта за победу в игре', st.district * 5);
  st.exp += st.district * 5;
  yield* levelUp(false);
  yield* fight(2);
  yield* println('^6Уноси ноги, пока не отобрали деньги другие канадидаты');
  st.clubHeat = 5;
  st.input = 'w';
});

/** 0000:E386 — `trn`: the gym */
export const gym = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsGym !== 1) return yield* println('^6Ты пока незнаешь где в этом районе качалка');
  st.press = st.armor;
  if (st.abibas && !st.adidas) st.press--;
  if (st.adidas) st.press -= 2;
  if (st.leather && !st.leather2) st.press -= 2;
  if (st.leather2) st.press -= 4;
  yield* println('Ты пришел в качалку напиши  ^6w^7  чтобы уйти');
  const c = (price: number) => {
    st.color = st.money >= price ? 48 : 52;
    return String.fromCharCode(st.color);
  };
  yield* println(` 1 -  ^${c(20)}20^7  качаться гателями и шгангой(Сила +1)`);
  yield* println(` 2 -  ^${c(20)}20^7  качаться на тренажерах(Выносливость +1)`);
  if (st.district > 1 && st.district * 10 - 3 > st.level)
    yield* println(` 3 -  ^${c(10)}10^7  прокачать # качков опыта`, 10);
  if (st.district > 1)
    yield* println(` 4 -  ^${c(30)}30^7  купить зубную защиту боксёров(-75% что сломают челюсть)`);
  if (st.district > 2 && st.press < st.district * 2)
    yield* println(` 5 -  ^${c(20)}20^7  прокачать пресс(Броня +1)`);
  do {
    yield* prompt('^0Качалка\\');
    if (st.input === '1') {
      if (st.money >= 20) {
        st.money -= 20;
        yield* println('^2Ты прокачиваешь силу.');
        st.str++;
        st.hpMax++;
        st.hp++;
        if (mod(st.str, 2) === 0) st.dmgMin++;
        st.dmgMax++;
        yield* println('^1Сила +1 ');
      } else yield* println('^4Не хватает');
    }
    if (st.input === '2') {
      if (st.money >= 20) {
        st.money -= 20;
        yield* println('^2Ты прокачиваешь выносливость.');
        st.vit++;
        st.hpMax += 5;
        st.hp += 5;
        yield* println('^1Выносливость +1 ');
      } else yield* println('^4Не хватает');
    }
    if (st.district > 1 && st.input === '3') {
      if (st.district * 10 - 3 <= st.level)
        yield* println('^6Ты слишком крутой чтобы тренироваться здесь.');
      else if (st.money < 10) yield* println('^4Не хватает деньжат');
      else {
        st.money -= 10;
        yield* println('^2Ты тренируешься.');
        st.exp += 10;
        yield* println('^1 +# качков опыта ', 10);
        if (st.exp >= st.expNext) yield* levelUp(false);
      }
    }
    if (st.district > 1 && st.input === '4') {
      if (st.mouthGuard) yield* println('^6У тебя есть эта штучка.');
      else if (st.money < 30) yield* println('^4А не хватает рубликов');
      else {
        st.money -= 30;
        st.mouthGuard = 1;
        yield* println('^2Ты купил защиту.');
      }
    }
    if (st.district > 2 && st.input === '5') {
      if (st.press < (st.district - 2) * 10) {
        if (st.money < 20) yield* println('^4Не хватает рубликов');
        else {
          st.money -= 20;
          yield* println('^2Ты прокачиваешь пресс.');
          st.armor++;
          st.press++;
          yield* println('^1Броня +1');
        }
      } else {
        yield* println('^6Ты максимально прокачал пресс для своего уровня');
        if (st.district < 4) yield* println('^6Качай дальше в следующем районе');
      }
    }
  } while (st.input !== 'w');
});

/** "Print(prompt); ReadLn(input); LowerCase(input)" */
export function prompt(text: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    yield* print(text);
    st.input = lowerCase(yield* readLine);
    return st.input;
  });
}

/** `luck >= Random(n)` as the original's Longint compare: no Random call when luck < 0 */
export function luckAtLeast(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (st.luck < 0) return false;
    return st.luck >= (yield* rnd(n));
  });
}

/** "Ты получаешь # качков опыта" + level-up */
export function gainExp(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    yield* println('^6Ты получаешь # качков опыта', n);
    st.exp += n;
    yield* levelUp(false);
  });
}

/** a shop line: number, price coloured by affordability, description with optional # args */
function offer(n: number, price: number, text: string, ...args: number[]) {
  return offerShowing(n, price, price, text, ...args);
}

/** a shop line whose colour comes from one price while another one is printed */
function offerShowing(n: number, price: number, shown: number, text: string, ...args: number[]) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    st.color = price <= st.money ? 48 : 52;
    yield* println(`^6${n}^7 - ^${String.fromCharCode(st.color)}#^7${text}`, shown, ...args);
  });
}
