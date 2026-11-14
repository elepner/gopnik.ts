/** Full-screen pictures: title, game over, victory animation, help. */
import { Effect } from 'effect';

import { clrScr, delay, keyPressed, readKey, textColor, write, writeLn } from '../crt/crt.ts';
import { STAT_WEIGHTS, TYPE_NAMES } from '../data/tables.ts';
import { Game, halt, println } from './prelude.ts';

/** 0000:02C2 */
export const titleScreen = Effect.gen(function* () {
  yield* newLines(5);
  yield* println('                  ^0┌──── ┌────┐ ┌────┐  │    │  │    │  │    /');
  yield* println('                  ^1│     │    │ │    │  │    │  │    │  │   / ');
  yield* println('                  ^2│     │    │ │    │  │    │  │    │  │  /  ');
  yield* println('                  ^3│     │    │ │    │  ├────┤  │   /│  │_/   ');
  yield* println('                  ^4│     │    │ │    │  │    │  │  / │  │ \\   ');
  yield* println('                  ^5│     │    │ │    │  │    │  │ /  │  │  \\  ');
  yield* println('                  ^6│     │    │ │    │  │    │  │/   │  │   \\ ');
  yield* println('                  ^7│     └────┘ │    │  │    │  │    │  │    \\');
  yield* writeLn;
  yield* println('                                                ^0Версия 1.02');
  yield* newLines(3);
  yield* println('                          ^6Нажми какую-нибудь кнопку');
  yield* newLines(4);
  yield* println('     ^02003 year, June,Sept                                         ^2by V.P.');
  yield* textColor(0);
  yield* readKey;
  yield* textColor(15);
  yield* clrScr;
});

/** 0000:074B — "ТЫ СДОХ" / "ТЫ ПОБЕДИЛ" screen, then Halt */
export function gameOver(won: boolean) {
  return Effect.gen(function* () {
    yield* clrScr;
    const c = won ? '2' : '4';
    yield* newLines(2);
    if (won) yield* println('                                    ^2Ты победил.');
    else yield* println('                                      ^4Ты сдох.');
    yield* newLines(3);
    for (const line of GAME_OVER_ART) yield* println(`          ^${c}${line}`);
    yield* newLines(5);
    yield* println('                          ^6Нажми какую-нибудь кнопку');
    yield* newLines(4);
    yield* textColor(0);
    yield* readKey;
    yield* textColor(15);
    yield* clrScr;
    return yield* halt;
  });
}

const GAME_OVER_ART = [
  '│    │ ┌────┐ ┌────┐  ┌────┐     │    │ ┌────┐ │    │ ┌────┐',
  '│    │ │      │    │  │          │    │ │    │ │    │ │    │',
  '│    │ │      │    │  │           \\  /  │    │ │    │ │    │',
  '│   /│ │      │    │  │            \\/   │    │ │    │ │    │',
  '│  / │ │      ├────┘  ├────        /\\   │    │ ├────┤ │    │',
  '│ /  │ │      │       │           /  \\  ├────┤ │    │ ├────┤',
  '│/   │ │      │       │          │    │ │    │ │    │ │    │',
  '│    │ │      │       └────┘     │    │ │    │ │    │ │    │',
];

/** 0000:0AEC — rainbow "ТЫ СУПЕР ГОП" until a key is pressed, then the victory screen */
export const victoryAnimation = Effect.gen(function* () {
  let shift = 0;
  for (;;) {
    const c = (i: number) => String.fromCharCode(0x30 + ((shift + i - 1) % 8));
    yield* delay(5000);
    yield* clrScr;
    yield* write(' '.repeat(32));
    yield* println(
      `^${c(1)}Т^${c(2)}Ы ^${c(3)}С^${c(4)}У^${c(5)}П^${c(6)}Е^${c(7)}Р ^${c(8)}Г^${c(9)}О^${c(10)}П`
    );
    shift = shift >= 8 ? 0 : shift + 1;
    if (yield* keyPressed) break;
  }
  yield* readKey;
  yield* readKey;
  return yield* gameOver(true);
});

/** 0000:5F55 — `help` */
export const help = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const type = mem.typeName(st.charType);
  yield* println(`^0Ну слушай, ${type} ${st.name} ^0,в чем тут батва`);
  yield* println('^0 Вначале ты должен выбрать свой характер.');
  yield* println(`^0 Например ${type}:`);
  const w = STAT_WEIGHTS[st.charType][0];
  yield* println(
    '^0 Всего навыки в сумме составляют 12, а сила у тебя # - значит при получении',
    w
  );
  yield* println('^0 нового уровня понтовости # из 12 шансов что увеличиться сила. То же и с ', w);
  for (const line of HELP_1) yield* println(line);
  if (st.district > 1)
    yield* println('^0 Придя в новый район, ты должен находить все эти места снова.');
  for (const line of HELP_2) yield* println(line);
});

function newLines(n: number) {
  return Effect.gen(function* () {
    for (let i = 0; i < n; i++) yield* writeLn;
  });
}

const HELP_1 = [
  '^0 остальными навыками. Шансы не меняются.',
  '^0',
  '^0 Сила - увеличивает урон, и довавляет 1 здоровья',
  '^0 Ловкость -  +5% попадания если больше 90% то можно бить дважды.',
  '^0 Живучесть - 5 здоровья',
  '^0 Удача - будет чаще везти по жизни',
  '^0 ',
  '^0 Здоровье = 10+Живучесть*5+Сила',
  '^0 Урон = (Сила/2)мин - (Сила)макс урону который нанесёшь ',
  '^0 Точность = (20+Ловкость*5)%',
  '^0 Броня - насколько уменьшается сила вражеского удара.',
  '^0',
  '^0 Спомощью разных вещей можно улутшать навыки, урон, броню и т.д.',
  '^0 Заходя вразные места, ты узнаешь чего полезного можно из них получить.',
];

const HELP_2 = [
  '^0 Хочешь спросить а че от них толку та?',
  '^0 Базар    - Покупаешь шмотки и еду. Можно воровать кошельки - Поднимай Удачу',
  '^0 Больница - Лечить переломы и царапины',
  '^0 Подруга  - Ты бомжуешь по кабакам и забыл че такое здоровый образ жизни. У неё',
  '^0            дома ты можешь пожить пару дней как человек - Поправить здоровье',
  '^0 Притон   - Там тусуются реальные пацаны, много че можно сделать, заходи туда',
  '^0            почаще. А главное ты можешь позвать братву, если дела идут хреново,',
  '^0            следи за притонной понтовостью.',
  '^0 Клуб     - Можно играть на бабло(Качай Удачу), но тамошние гопники не любят',
  '^0            проигрывать',
  '^0 Качалка  - Там можно повысить свои бойцовские навыки',
  '^0 Барыги   - Продают вещи и арсенала гопника, им ты можешь спихнуть награбленый',
  '^0            хлам и продать ненужные вещи(Выделеные красным в твоей статистике)',
  '^0Если не видать чё вверху - выйди и открой у G.exe:Свойства/Экран/Исходный размер',
];
