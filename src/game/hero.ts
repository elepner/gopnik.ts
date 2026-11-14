/** The player character: stats screen, level-ups, beer, items. */
import { Effect } from 'effect';

import { writeLn } from '../crt/crt.ts';
import { RANK_NAMES, STAT_WEIGHTS, TYPE_NAMES } from '../data/tables.ts';
import { div, mod } from '../tp/num.ts';
import { Game, print, println, rnd } from './prelude.ts';

/** 0000:1A03 — `s`: look at yourself in a puddle */
export const showStats = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const c = ['7', '7', '7', '7'];
  yield* println(
    `^2Ты ${mem.typeName(st.charType)} # уровня - ${mem.rankName(st.level)}`,
    st.level
  );
  yield* println(`^2А зовут тебя: ${st.name}`);
  if (st.level <= 39)
    yield* println('^6Сейчас у тебя # опыта, А для прокачки надо #', st.exp, st.expNext);
  if (st.stoned > 0 || st.ringPg || st.megaRing) c[0] = '1';
  if (st.ringPg || st.megaRing) c[1] = c[2] = '1';
  if (st.cross || st.ringGs || st.ringPg || st.megaRing) c[3] = '1';
  yield* println(
    `Сл:^${c[0]}#^7 Лв:^${c[1]}#^7 Жв:^${c[2]}#^7 Уд:^${c[3]}#`,
    st.str,
    st.agi,
    st.vit,
    st.luck
  );
  if (st.cross || st.ringGs) {
    yield* print('Феньки: ');
    if (st.cross) yield* print('^1Крестик(Удача +2) ');
    if (st.ringGs) yield* print('^1Кольцо "Гс"(Удача +1) ');
    yield* writeLn;
  }
  if (st.ringPg || st.megaRing || st.ringGp) {
    yield* print('Мощные феньки: ');
    if (st.ringPg) yield* print('^1Кольцо "Пг"(Всё +1) ');
    if (st.megaRing) yield* print('^1Мега Кольцо(Всё +4) ');
    if (st.ringGp) yield* print('^1Кольцо "Гп"(Самолечение) ');
    yield* writeLn;
  }
  if (st.phone) yield* println('^1У тебя есть мобильник');
  if (st.glasses) yield* println('^1У тебя есть тёмные очки');
  if (st.tattoo) yield* println('^1На тебе зоновская наколка');
  if (st.pistol) {
    yield* writeLn;
    yield* print('^1У тебя есть пистолет');
    if (st.silencer) yield* print('^1 с гушителем');
    if (st.bullets > 0) yield* println('^1! патронов - #', st.bullets);
    if (st.bullets <= 2 && st.bullets > 0) yield* println('^6 А птронов-то мало ');
    if (st.bullets <= 0) yield* println('^1.^4 Правда без патронов');
    yield* writeLn;
  }
  const armed =
    st.stoned > 0 || st.boots || st.boots2 || st.knuckles || st.club || st.knife || st.cleaver;
  yield* print(`^${armed ? '1' : '7'}Урон #-#    `, st.dmgMin, st.dmgMax);
  if (st.boots && !st.boots2) yield* print('^1Бутсы(+1) ');
  if (st.boots && st.boots2) yield* print('^4Бутсы ');
  if (st.boots2) yield* print('^1Понтовые бутсы(Урон+2) ');
  if (st.knuckles && !st.knife && !st.club && !st.cleaver) yield* print('^1Кастет(+2) ');
  if (st.knuckles && (st.knife || st.club || st.cleaver)) yield* print('^4Кастет ');
  if (st.club && !st.knife && !st.cleaver) yield* print('^1Дубинка(+4)  ');
  if (st.club && (st.knife || st.cleaver)) yield* print('^4Дубинка ');
  if (st.knife && !st.cleaver) yield* print('^1Нож(+6) ');
  if (st.knife && st.cleaver) yield* print('^4Нож ');
  if (st.cleaver) yield* print('^1Тесак(Урон+9) ');
  yield* writeLn;
  let injuries = '';
  if (st.jawBroken === 1) injuries += '^4Сломана челюсть  ';
  if (st.mouthGuard === 1) injuries += '^1Зубная защита  ';
  if (st.legBroken === 1) injuries += '^4Сломана нога  ';
  if (st.stoned > 0) injuries += '^6Обдолбаный  ';
  yield* println(`^${healthColor(st.hp, st.hpMax)}Здоровье #/#  ${injuries}`, st.hp, st.hpMax);
  yield* accuracy(st.agi);
  if (st.armor > 0) {
    yield* print('^2Броня #    ', st.armor);
    if (st.abibas) {
      if (st.adidas) {
        yield* print('^4Abibas ');
        yield* print('^1Костюм Adidas(+2) ');
      } else yield* print('^1Костюм Abibas(+1) ');
    }
    if (st.adidas && !st.abibas) yield* print('^1Костюм Adidas(+2) ');
    if (st.leather) {
      if (st.leather2) {
        yield* print('^4Кожанка ');
        yield* print('^1Крутая кожанка(+4) ');
      } else yield* print('^1Кожанка(+2) ');
    }
    if (st.leather2 && !st.leather) yield* print('^1Крутая кожанка(+4) ');
    yield* writeLn;
  }
  if (st.joints > 0) yield* println('Косяки #', st.joints);
  if (st.beer > 0) yield* println('Пиво #.#л.', div(st.beer, 2), beerTenths(st.beer));
  else yield* println('^4Пива нет');
  if (st.money > 0) yield* println('Бабки #', st.money);
  else yield* println('^4Нету бабок');
  if (st.junk > 0) yield* println('Хлам #', st.junk);
});

/** health colour: red up to 25%, yellow up to 50%, green above (Real division) */
export function healthColor(hp: number, max: number): string {
  const ratio = hp / max;
  if (ratio > 0.5) return '2';
  if (ratio > 0.25) return '6';
  return '4';
}

/** "Точность" lines shared by the stats of the hero and of the enemy */
export function accuracy(agility: number) {
  return Effect.gen(function* () {
    let a = agility;
    if (a <= 14) return yield* println('Точность #%', a * 5 + 20);
    yield* print('Точность 90% ');
    a -= 14;
    let hits = 1;
    while (a > 18) {
      a -= 18;
      hits++;
    }
    if (hits === 1) yield* println('   Второй удар #%', a * 5);
    if (hits > 1) yield* println('- # ударов,  Точность # удара #%', hits, hits + 1, a * 5);
  });
}

/** litres after the dot for beer counted in half-litres */
export function beerTenths(beer: number): number {
  return mod(mod(beer, 2) * 5, 10);
}

/** 0000:2526 — spend experience on level-ups; `rector` lifts the level-40 cap and the summary */
export function levelUp(rector: boolean) {
  return Effect.gen(function* () {
    const { st, mem } = yield* Game;
    if (st.exp < st.expNext) return;
    let count = 0;
    do {
      st.exp -= st.expNext;
      st.expNext += 10;
      count++;
    } while (st.exp >= st.expNext);
    for (let k = 1; k <= count; k++) {
      if (!rector && st.level === 40) break;
      st.level++;
      yield* print('^1Понтовость увеличивается: ');
      const [w0, w1, w2, w3] = STAT_WEIGHTS[st.charType];
      const total = w0 + w1 + w2 + w3;
      const history = (d: string) => {
        if (st.level <= 40) mem.setHistory(st.level, mem.history(st.level) + d);
      };
      for (let j = 1; j <= 2; j++) {
        const r = (yield* rnd(total)) + 1;
        if (w0 >= r) {
          st.str++;
          yield* print('^1Сила +1 ');
          history('1');
          st.dmgMax++;
          if (mod(st.str, 2) === 0) st.dmgMin++;
          st.hpMax++;
          st.hp++;
        } else if (w1 + w0 >= r) {
          st.agi++;
          yield* print('^1Ловкость +1 ');
          history('2');
        } else if (w2 + w1 + w0 >= r) {
          st.vit++;
          yield* print('^1Живучесть +1 ');
          history('3');
          st.hpMax += 5;
          st.hp += 5;
        } else if (w3 + w2 + w1 + w0 >= r) {
          st.luck++;
          yield* print('^1Удача +1 ');
          history('4');
        }
      }
      yield* writeLn;
    }
    if (!rector)
      yield* println(
        '^6Сейчас у тебя # качков опыта. До слеующей прокачки надо #',
        st.exp,
        st.expNext
      );
  });
}

/** 0000:29C4 — `h` drinks one beer, `mh` drinks until healthy */
export function drinkBeer(cmd: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (cmd !== 'h' && cmd !== 'mh') return;
    const start = st.hp;
    const h = cmd === 'h';
    for (;;) {
      if (st.jawBroken === 1) {
        yield* println('^4Ты не можешь пить пиво из-за сломаной челюсти.');
        break;
      }
      if (st.hp >= st.hpMax)
        return yield* println('^6Блин только тупить не надо - и так здоровья до фига.');
      if (st.beer > 0) {
        st.beer--;
        if (st.hpMax - st.hp < 5) {
          if (h) yield* print('^2Пиво прибавляет #з. ', st.hpMax - st.hp);
          st.hp = st.hpMax;
          if (h)
            yield* println(
              '^2Здоровья:#/#. Осталось #.#л. пива',
              st.hp,
              st.hpMax,
              div(st.beer, 2),
              beerTenths(st.beer)
            );
        } else {
          st.hp += 5;
          if (h)
            yield* println(
              '^2Пиво прибавляет #з. Здоровья:#/#. Осталось #.#л. пива',
              5,
              st.hp,
              st.hpMax,
              div(st.beer, 2),
              beerTenths(st.beer)
            );
        }
      } else if (h) yield* println('^4Пива нету');
      if (h || st.hp >= st.hpMax || st.beer <= 0) break;
    }
    if (cmd !== 'mh') return;
    if (st.hp !== start)
      yield* println(
        '^2Пиво прибавляет #з. Здоровья:#/#. Осталось #.#л. пива',
        st.hp - start,
        st.hp,
        st.hpMax,
        div(st.beer, 2),
        beerTenths(st.beer)
      );
    if (st.hp !== start && st.beer <= 0) yield* println('^4Кончилось пиво');
    if (st.hp === start && st.beer <= 0) yield* println('^4Пива нету');
  });
}

/** +1 strength with its derived stats (temple blessing) */
export const strengthUp = Effect.gen(function* () {
  const { st } = yield* Game;
  st.str++;
  st.hpMax++;
  st.hp++;
  st.dmgMax++;
  st.dmgMin += 1 - mod(st.str, 2);
});

/** next ring of the Пг → Мега → Гп chain; the Мега message differs between callers */
export function gainRing(megaText: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (!st.ringPg) {
      yield* println('^1Кольцо "Помоги Господи"');
      st.str++;
      st.agi++;
      st.vit++;
      st.luck++;
      st.hpMax += 6;
      st.hp += 6;
      st.dmgMax++;
      st.dmgMin += 1 - mod(st.str, 2);
      st.ringPg = 1;
    } else if (!st.megaRing) {
      yield* println(megaText);
      st.str += 4;
      st.agi += 4;
      st.vit += 4;
      st.luck += 4;
      st.hpMax += 24;
      st.hp += 24;
      st.dmgMax += 4;
      st.dmgMin += 2;
      st.megaRing = 1;
    } else if (!st.ringGp) {
      yield* println('^1Ваще полезное кольцо "Господи помилуй"');
      yield* println('^1Восст. жизни - 3, 5% - самозарост переломов');
      st.ringGp = 1;
    }
  });
}
