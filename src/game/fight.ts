/** The fight loop (0000:3D11). */
import { Effect } from 'effect';

import { readKey, readLine, writeLn } from '../crt/crt.ts';
import { TYPE_NAMES } from '../data/tables.ts';
import { div, mod, round } from '../tp/num.ts';
import { showEnemy } from './enemy.ts';
import { drinkBeer, gainRing, levelUp, showStats } from './hero.ts';
import { Game, halt, lowerCase, print, println, rnd } from './prelude.ts';
import { gameOver, victoryAnimation } from './screens.ts';

/**
 * Why the fight started: 0 met while walking, 1 caught stealing at the market,
 * 2 caught cheating in the club, 3 the fake rector, 4 the real rector,
 * 5 cops during the den job, 6 helping the den.
 */
export type FightKind = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** 0000:3D11 */
export function fight(kind: FightKind) {
  return Effect.gen(function* () {
    const { st, mem } = yield* Game;
    yield* greeting(kind);
    const enemyHits = extraHits(st.eAgi + 4, st.agi + 4);
    if (st.eAgi + 4 > 18 && div(enemyHits, 18) < div(st.eAgi + 4, 18))
      yield* println(
        '^2Из-за твоей хорошей ловкости враг сможет пнуть тебя раз # вместо #',
        div(enemyHits - 1, 18) + 1,
        div(st.eAgi + 4 - 1, 18) + 1
      );
    const playerHits = extraHits(st.agi + 4, st.eAgi + 4);
    if (st.agi + 4 > 18 && div(playerHits, 18) < div(st.agi + 4, 18))
      yield* println(
        '^4Из-за хорошей ловкости врага ты сможешь пнуть его раз # вместо #',
        div(playerHits - 1, 18) + 1,
        div(st.agi + 4 - 1, 18) + 1
      );

    let spectators = 0;
    let over = false;
    while (!over) {
      if (spectators < 5) {
        spectators++;
        if (spectators === 5) yield* println('^7Начинают собираться зрители');
      }
      if (st.rector === 0 && spectators === 5 && (yield* rnd(10)) === 0)
        for (const line of yield* crowdShout) yield* println(line);

      yield* print('^0Битва\\');
      st.input = lowerCase(yield* readLine);
      const input = st.input;

      if (input === 'k') {
        yield* playerKicks(playerHits);
        if (st.eHp > 0) yield* enemyKicks(enemyHits);
      }

      if (input === 'run') {
        if (st.rector === 1)
          yield* println('^4Ректор: Кудa? Стоять! Бейся до конца трусливый урод!');
        else if (st.legBroken === 1) yield* println('^4Ты не можешь убежать на сломаной ноге.');
        else {
          if (st.level > 0) {
            yield* print('^4Враг: Трусливый засранец! ');
            const lost = mem.history(st.level);
            mem.setHistory(st.level, '');
            for (const c of lost) yield* loseStat(c);
            yield* writeLn;
            if (st.charType !== 5 && st.level - (st.district - 1) * 10 === 3) {
              st.denAccess = 1; // sic: the original grants access while saying the opposite
              yield* println('^4Такого конявого непустят в местный притон!');
            }
            st.level--;
            st.expNext -= 10;
            if (st.exp >= st.expNext) st.exp = st.expNext - 1;
          } else yield* println('^4Враг: Засранец!');
          over = true;
        }
      }

      yield* drinkBeer(input);
      if (input === 'kos') yield* smokeJoint(3);
      if (input === 's') yield* showStats;
      if (input === 'sv') yield* showEnemy;
      if (input === 'e') return yield* halt;
      if (st.backup >= 1 && input === 'k') {
        st.backup++;
        if (st.backup === 3) yield* println('^2Подошли пацаны - Ща начнется!');
      }
      if (input === 'v') yield* callBackup;
      if (st.eHp > 0 && st.backup >= 3) yield* backupKicks;
      if (input === 'f' && st.pistol) yield* shoot;

      if (st.hp <= 0) {
        if (st.rector === 1) {
          yield* println('^4Ты сдох. Ректор тебя замочил. Ты так и не доказал свою крутизну.');
          yield* readKey;
          yield* gameOver(false);
        } else if (st.denAccess === 1 && st.respect >= 10) {
          yield* println('^1Тебе повезло знакомые пацаны отвезли тебя в больницу а то бы ты сдох.');
          st.respect -= 10;
          st.money -= round((st.hpMax / 5) * 3);
          st.hp = st.hpMax;
          if (st.jawBroken === 1 || st.legBroken === 1) {
            st.money -= 7;
            st.jawBroken = 0;
            st.legBroken = 0;
          }
          if (st.money < 0) {
            st.respect += st.money;
            st.money = 0;
          }
          over = true;
        } else {
          yield* println('^4Ты сдох.');
          yield* readKey;
          yield* gameOver(false);
        }
      }

      if (st.eHp <= 0) {
        yield* enemyDied(kind);
        over = true;
      }
    }
    st.backup = 0;
  });
}

function greeting(kind: FightKind) {
  return Effect.gen(function* () {
    const { st, mem } = yield* Game;
    const type = mem.typeName(st.charType);
    if (kind === 0 || kind === 6) {
      if (st.eType <= 2) {
        yield* println('Слышь Вась..');
        yield* println('^4А чё ваще?');
      } else if (st.eType <= 6) {
        yield* println('^4Пацан ты из какого района?');
        yield* println('А ты по пинкам суди!');
      } else if (st.eType === 7) yield* println('^4Эй мудак?!');
      else if (st.eType === 8) yield* println(`^4Блин! это же ${st.name}^4 - известный ${type}`);
      else if (st.eType === 9) {
        yield* println('^4Я МАНЬЯК!!!');
        yield* println(`Рад познакомиться - ${type}`);
      }
    } else if (kind === 1) yield* println('^4Отдай кошелёк урод!');
    else if (kind === 3)
      yield* lines(
        '^2Ну вот мы и встретились мудак!',
        '^4Чё те нада козёл?!',
        '^2Урыть тебя ублюдок!',
        '^4Ну ты меня достал ща урою!'
      );
    else if (kind === 4)
      yield* lines(
        '^6Тут заходит настоящий ректор.',
        '^4Мудак! ты тупой дебил, думал что я идиот?',
        '^2Я думаю ты сконил!',
        '^4Ну тада сдохни!'
      );
  });
}

/** each line is followed by a key press */
function lines(...ls: string[]) {
  return Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
}

/** hit budget of the attacker (agility+4) against the defender's agility+4; 18 per kick */
function extraHits(attacker: number, defender: number): number {
  let a = attacker;
  let d = defender;
  if (a <= 10) return a;
  while (d > 18) {
    if (a < 28) return 10;
    a -= 18;
    d -= 18;
  }
  return a;
}

const crowdShout = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const r = yield* rnd(18);
  if (r === 4)
    return [`Зрители:^6Не подкачай ${mem.typeName(st.charType)}, я на тебя трёшку поставил!`];
  if (r === 17) return [`Зрители:^6Ну и кого там ${st.name} ^6сегодня пинает?`];
  if (r === 8)
    return [
      'Зрители:^6Дерьмово дерётесь придурки',
      '^2А ты: Заткнись мудак, а то щас тебя запинаю!',
    ];
  return [CROWD[r]];
});

const CROWD: Record<number, string> = {
  0: 'Зрители:^6Мочи его, мочи!',
  1: 'Зрители:^6Врежь ему!',
  2: 'Зрители:^6Блин долго ты ещё будешь мудиться?',
  3: 'Зрители:^6Да вы только посмотрите на эти пинки!',
  5: 'Зрители:^6Чё-тут за батва?',
  6: 'Зрители:^6Я знаю вон того мудака, он уже нескольких запинал!',
  7: 'Зрители:^6Чё так слабо бьёшь?! Пинай сильнее!',
  9: 'Зрители:^6Да, а помнишь мы вчера также одного пинали, пинали.. А потом подошла его братва..',
  10: 'Зрители:^6Это чё реслинг?',
  11: 'Зрители:^6Двинь ему в рыло!',
  12: 'Зрители:^6И куда менты смотрят?',
  13: 'Зрители:^6Пинай!',
  14: 'Зрители:^6Врежь гаду!',
  15: 'Зрители:^6Господа делайте ваши ставки!',
  16: 'Зрители:^6Ну чё там? Какой счет?',
};

/** `x > Random(n) + 1` as the original's Longint compare: no Random call when x < 0 */
function luckBeats(x: number, n: number) {
  return Effect.gen(function* () {
    if (x < 0) return false;
    return x > (yield* rnd(n)) + 1;
  });
}

function playerKicks(hits: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    let a = hits;
    for (;;) {
      const r = (yield* rnd(100)) + 1;
      if (a * 5 >= r && r <= 90) {
        const prev = st.eHp;
        let dmg = st.dmgMin + (yield* rnd(st.dmgMax - st.dmgMin)) + 1;
        if (yield* luckBeats(st.luck * 3, 100)) {
          dmg += st.dmgMax;
          const shout = yield* rnd(3);
          if (shout === 0) yield* println('^2Точный удар!!!');
          else if (shout === 1) yield* println('^2Не хило приложил!!!');
          else if (shout === 2) yield* println('^2Двойной урон!!!');
        }
        dmg -= st.eArmor;
        if (dmg < 0) dmg = 0;
        st.eHp -= dmg;
        if (yield* luckBeats(st.luck * 3, st.eLuck * 3 + 200)) {
          if ((yield* rnd(2)) === 0) {
            if (!st.eJawBroken) {
              yield* println('^2Ты сломал врагу челюсть. ^4Враг: А! козёл!');
              st.eJawBroken = 1;
            }
          } else if (!st.eLegBroken) {
            yield* println('^2Ты сломал врагу ногу. ^4Враг: Ну что за урод!');
            st.eLegBroken = 1;
          }
        }
        yield* println('^2Ты пнул врага на #з. У него осталось #', prev - st.eHp, st.eHp);
      } else yield* println('^4Ты промазал');
      a -= 18;
      if (st.eHp <= 0) return;
      if (a > 0) yield* println('^2Из-за большой ловкости ты можешь пнуть ещё раз');
      if (!(a > 0 && st.eHp >= 0)) return;
    }
  });
}

function enemyKicks(hits: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    let a = hits;
    for (;;) {
      const r = (yield* rnd(100)) + 1;
      if (a * 5 >= r && r <= 90) {
        const prev = st.hp;
        let dmg = st.eDmgMin + (yield* rnd(st.eDmgMax - st.eDmgMin)) + 1;
        if (yield* luckBeats(st.eLuck * 3, 100)) {
          dmg += st.eDmgMax;
          const shout = yield* rnd(3);
          if (shout === 0) yield* println('^4Враг:Сдохни урод!!');
          else if (shout === 1) yield* println('^4Тебе не хило врезали!');
          else if (shout === 2) yield* println('^4Враг:Получи гнида!!');
        }
        dmg -= st.armor;
        if (dmg < 0) dmg = 0;
        st.hp -= dmg;
        if (yield* luckBeats(st.eLuck * 3, st.luck * 3 + 200)) {
          if ((yield* rnd(2)) === 0) {
            if (!st.jawBroken) {
              if (!st.mouthGuard) {
                yield* println('^4Враг сломал тебе челюсть.');
                st.jawBroken = 1;
              } else if ((yield* rnd(4)) === 0) {
                yield* println('^4Враг сломал тебе челюсть, даже защита не помогла.');
                st.jawBroken = 1;
              } else yield* println('^2Защита спасла твои кривые клыки.');
            }
          } else if (!st.legBroken) {
            yield* println('^4Враг сломал тебе ногу.');
            st.legBroken = 1;
          }
        }
        yield* println('^4Он пнул тебя на #з. У тебя осталось #', prev - st.hp, st.hp);
      } else yield* println('^2Враг промазал');
      a -= 18;
      if (a > 0) yield* println('^4Из-за большой ловкости враг может пнуть ещё раз');
      if (!(a > 0 && st.hp >= 0)) return;
    }
  });
}

/** running away takes back the stats of the last level-up ('1'..'4' = str/agi/vit/luck) */
function loseStat(c: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (c === '1') {
      st.str--;
      yield* print('^4Сила -1 ');
      st.dmgMax--;
      if (mod(st.str, 2) === 1) st.dmgMin--;
      st.hpMax--;
      if (st.hp > st.hpMax) st.hp = st.hpMax;
    } else if (c === '2') {
      st.agi--;
      yield* print('^4Ловкость -1 ');
    } else if (c === '3') {
      st.vit--;
      yield* print('^4Живучесть -1 ');
      st.hpMax -= 5;
      if (st.hp > st.hpMax) st.hp = st.hpMax;
    } else if (c === '4') {
      st.luck--;
      yield* print('^4Удача -1 ');
    }
  });
}

/** `kos` — a joint: +2 strength for a while, heals up to 10 (fight: 3 turns, walking: 10) */
export function smokeJoint(turns: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (st.jawBroken === 1) return yield* println('^4Ты не схавать колёса из-за сломаной челюсти.');
    if (st.stoned !== 0) return yield* println('^6Ты неможешь схавать ещё один косяк.');
    if (st.joints <= 0) return yield* println('^4У тебя нет косяков');
    st.joints--;
    st.stoned = turns;
    st.str += 2;
    st.dmgMin++;
    st.dmgMax += 2;
    if (st.hpMax - st.hp < 10) {
      yield* print('^2Колёса прибавляют #з. ', st.hpMax - st.hp);
      st.hp = st.hpMax;
      yield* println('^2Здоровья:#/#. Осталось # косяков', st.hp, st.hpMax, st.joints);
    } else {
      st.hp += 10;
      yield* println(
        turns === 3
          ? '^2Колёса прибавляют #з. Здоровья:#/#. Осталось # косяков'
          : '^2Колёса прибавляют #з. Здоровья:#/#. Осталось # косякова',
        10,
        st.hp,
        st.hpMax,
        st.joints
      );
    }
    yield* println('^2Сила +2.');
  });
}

const callBackup = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.denAccess === 1 && st.district * 10 + 10 <= st.respect) {
    if (st.backup === 0) st.backup = 1;
    if (st.phone === 1) {
      st.backup = 3;
      yield* println('^2Подошли пацаны - Ща начнется!.');
    }
  } else if (st.denAccess !== 0) yield* println('^4Ни кто не хочет за тебя впрягаться.');
  else yield* println('^6Сначала надо скорешиться с местной гопотой.');
  if (st.backup > 0) {
    if (st.backup < 3)
      yield* println('^6Тебе надо продержатся до подхода братвы # пинка.', 3 - st.backup);
    else if (st.backup !== 3 || st.phone === 0) yield* println('^2Они уже здесь.');
  }
});

const backupKicks = Effect.gen(function* () {
  const { st } = yield* Game;
  const prev = st.eHp;
  let dmg = st.district * 3 + (yield* rnd(st.district * 4));
  dmg -= div(st.eArmor, 3);
  if (dmg < 0) dmg = 0;
  st.eHp -= dmg;
  yield* println('^2Врага отпинали на #з. У него осталось #', prev - st.eHp, st.eHp);
  if ((yield* rnd(2)) === 0) {
    st.backup++;
    if (st.backup === 3) yield* println('^2Подошли пацаны.');
  }
  if (st.backup === 7) {
    st.backup = 0;
    yield* println('^2Твою подмогу отпинали.');
  }
  st.respect -= st.district * 5;
  if (st.respect <= 0) {
    st.backup = 0;
    yield* println('^4Подмоге надоело столько парится из-за мало понтового мудака');
  }
});

const shoot = Effect.gen(function* () {
  const { st } = yield* Game;
  if (!st.trail && !st.silencer) return yield* println('^6Тельзя тут стрелять! Менты накроют!');
  if (st.bullets <= 0) return yield* println('^6Чё за батва? Блин патроны кончились!');
  st.bullets--;
  if (st.agi >= 0 && st.agi > (yield* rnd(50))) {
    const prev = st.eHp;
    st.eHp -= (yield* rnd(10)) + 20;
    yield* println(
      '^2Ты выстрелил и ранил врага на #з. У него осталось #з., осталось патронов #',
      prev - st.eHp,
      st.eHp,
      st.bullets
    );
  } else yield* println('^2Это был хреновый выстрел.');
});

function enemyDied(kind: FightKind) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (kind === 4) {
      st.exp = st.expNext;
      yield* levelUp(true);
      yield* lines(
        '^1Ты замочил самого ректора!!! ТЫ САМЫЙ КРУТОЙ!!!',
        '^1Вновь сила торжествует над интелектом.',
        '^1После этого сразу началась анархия и полный беспредел.',
        '^1И не стыдно тебе гоп чёртов?'
      );
      yield* println('^1А результат:');
      yield* showStats;
      yield* readKey;
      return yield* victoryAnimation;
    }
    if (kind === 3) {
      st.exp = st.expNext;
      yield* levelUp(true);
      yield* lines(
        '^1Ты замочил самого ректора!!!^6 о чёрт! да это ж не ректор был.',
        '^6Это был проректор СУНЦа!'
      );
    } else yield* println('^2Враг сдох.');
    const rector = kind === 3;
    if (!rector) {
      const exp = st.eStr + st.eAgi + st.eVit + st.eLuck;
      yield* println('^6За отпин врага ты получаешь # качков опыта', exp);
      st.exp += exp;
    }
    if (st.exp < st.expNext) {
      if (!rector) {
        yield* println('^6Ты запинал слишком слабого мудака для увеличения понтовости');
        yield* println('^6Сейчас у тебя # качков опыта, А для прокачки надо #', st.exp, st.expNext);
      }
    } else yield* levelUp(false);
    st.beer += st.eBeer;
    st.money += st.eMoney;
    st.junk += st.eJunk;
    yield* println('^1Пиво победителю!');
    st.hp += 5;
    if (st.hp > st.hpMax) st.hp = st.hpMax;
    st.respect += st.eType + 1 + div(st.eLevel, 3);
    if (st.denAccess === 0 && st.level - (st.district - 1) * 10 >= 3) {
      st.denAccess = 1;
      yield* println(
        '^1Поновость улутшилась на столько, что тебе можно заходить в местный притон!'
      );
    }
    if ((yield* rnd(30)) === 0) {
      if (!(st.ringPg && st.megaRing && st.ringGp))
        yield* println('^1Оба на! Колечко! Вот свезло, так свезло!');
      yield* gainRing('^1"Мега Кольцо"!');
    }
    yield* loot;
    if (kind === 6) {
      st.respect += st.district * 20;
      yield* println(
        '^2Ты отпинал этого мудака - пацаны этого незабудут. Понтовость улутшилась на #.',
        st.district * 20
      );
      yield* println('^6Ты получаешь # качков опыта за помощь', st.district * 10);
      st.exp += st.district * 10;
      yield* levelUp(false);
    }
  });
}

/** `luck >= Random(n)` as the original's Longint compare: no Random call when luck < 0 */
function luckAtLeast(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (st.luck < 0) return false;
    return st.luck >= (yield* rnd(n));
  });
}

const loot = Effect.gen(function* () {
  const { st } = yield* Game;
  if ((yield* luckAtLeast(st.district * 25)) && st.eType === 2) {
    st.joints += yield* rnd(3);
    yield* println('^1А у нарка был косячок');
  }
  if (!(yield* luckAtLeast(st.district * 40))) return;
  const weapon = (n: number) => {
    st.dmgMin += n;
    st.dmgMax += n;
  };
  if (st.eType === 1) {
    const r = yield* rnd(3);
    if (r === 0 && !st.cross) {
      st.luck += 2;
      yield* println('^1Ты нашёл крестик: удача +2');
      st.cross = 1;
    } else if (r === 1 && !st.ringGs) {
      st.luck++;
      yield* println('^1Ты нашёл кольцо "Господи спаси": удача +1');
      st.ringGs = 1;
    } else if (r === 2 && !st.phone) {
      yield* println('^1Ты нашёл мобилу');
      st.phone = 1;
    }
  } else if (st.eType >= 3 && st.eType <= 6) {
    const r = yield* rnd(2);
    if (r === 0 && !st.knuckles) {
      st.knuckles = 1;
      yield* println('^1Ты надыбал кастет(урон+2)');
      if (!st.knife && !st.club && !st.cleaver) weapon(2);
      else yield* println('^6Но у тебя есть более мощное оружие');
    } else if (r === 1 && !st.club) {
      st.club = 1;
      yield* println('^1Ты отобрал у врага дубинку(урон+4)');
      if (!st.knife && !st.cleaver) weapon(st.knuckles ? 2 : 4);
      else yield* println('^6Но у тебя есть более мощное оружие');
    }
  } else if (st.eType === 7) {
    const r = yield* rnd(2);
    if (r === 0 && !st.glasses) {
      st.glasses = 1;
      yield* println('^1Ты нашёл тёмные очки.');
    } else if (r === 1 && !st.phone) {
      yield* println('^1Ты нашёл мобилу');
      st.phone = 1;
    }
  } else if (st.eType === 9) {
    const r = yield* rnd(2);
    if (r === 0 && !st.knife) {
      st.knife = 1;
      yield* println('^1Ты нашел ножик(урон+6).');
      // sic: the original's boolean arithmetic, stacking bonuses
      if ((st.club === 0 ? 1 : 0) === st.knuckles) weapon(4);
      if (st.club) weapon(2);
      if (!st.knuckles && !st.club && !st.cleaver) weapon(6);
      if (st.cleaver) yield* println('^6Но утебя есть тесак который круче.');
    } else if (r === 1 && !st.cleaver) {
      st.cleaver = 1;
      yield* println('^1Ты нашел тесак(урон+9)!!! - ужасное оружие.');
      if ((!st.club && !st.knife ? 1 : 0) === st.knuckles) weapon(7);
      if (st.club && !st.knife) weapon(5);
      if (st.knife) weapon(3);
      if (!st.knuckles && !st.club && !st.knife) weapon(9);
    }
  }
});
