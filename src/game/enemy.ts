/** Enemies: generation, the rector bosses, `sv` (inspect the enemy). */
import { Effect } from 'effect';

import { RANK_NAMES, STAT_WEIGHTS, TYPE_NAMES } from '../data/tables.ts';
import { div, i16, round } from '../tp/num.ts';
import { accuracy, healthColor } from './hero.ts';
import { Game, println, rnd } from './prelude.ts';

/** who spawned the enemy: walking, being caught (market/club/den help), the den job (cop) */
export type SpawnKind = 0 | 1 | 2;

/** 0000:0D14 */
export function spawnEnemy(kind: SpawnKind) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    st.eType = (yield* rnd(51)) + 1;
    for (let l = 1; l <= 10; l++) {
      if (st.eType - l < 0) {
        st.eType = 10 - l;
        break;
      }
      st.eType -= l;
    }
    st.eType += yield* rnd(st.district);
    if (st.trail) st.eType += yield* rnd(4);
    if (st.eType > 9) st.eType = 9;
    if (kind === 1 && st.eType > 7) st.eType = 7;
    if (kind === 2) st.eType = 8;

    const bonus = (yield* rnd(st.district)) * 4;
    const r5 = yield* rnd(5);
    const below = (yield* rnd(2)) + 1;
    const above = (yield* rnd(2)) + 1;
    st.eLevel = round((st.level * above) / below + r5 - 2) + bonus;
    if (st.eLevel < 0) st.eLevel = 0;
    if (st.trail) st.eLevel = round(st.eLevel * 1.5);

    st.eStr = st.eAgi = st.eVit = st.eLuck = 0;
    const [w0, w1, w2, w3] = STAT_WEIGHTS[st.eType];
    const total = (w0 + w1 + w2 + w3) & 0xff;
    const points = (total + st.eLevel * 2) & 0xff;
    for (let l = 1; l <= points; l++) {
      const r = (yield* rnd(total)) + 1;
      if (r <= w0) st.eStr++;
      else if (r <= w1 + w0) st.eAgi++;
      else if (r <= w2 + w1 + w0) st.eVit++;
      else if (r <= w3 + w2 + w1 + w0) st.eLuck++;
    }
    yield* deriveEnemy;

    const loot = () => round(i16(st.eType * st.eLevel) / 5) + div(st.eLevel, 2);
    const junkBase = yield* rnd(6);
    st.eJunk = (yield* rnd(loot())) * 2 - loot() + junkBase;
    if (st.eJunk < 0) st.eJunk = 0;
    const moneyBase = yield* rnd(6);
    st.eMoney = (yield* rnd(loot())) - div(loot(), 2) + moneyBase;
    if (st.eMoney < 0) st.eMoney = 0;
    st.eBeer = (yield* rnd(2)) + div(st.eLevel, 10) + 1;
    const armor = div((st.district - 1) * (st.district - 1) * 4, 2);
    st.eArmor = (yield* rnd(armor)) + armor;
  });
}

/** 0000:11C2 — the fake rector (0) and the real one (1) */
export function setupRector(which: 0 | 1) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    st.eType = 10;
    const [level, str, agi, vit, luck, armor] = RECTORS[which];
    st.eLevel = level;
    st.eStr = str;
    st.eAgi = agi;
    st.eVit = vit;
    st.eLuck = luck;
    st.eArmor = armor;
    yield* deriveEnemy;
    st.eMoney = 0;
    st.eBeer = 0;
    st.eJunk = 0;
  });
}

const RECTORS = [
  [125, 41, 50, 123, 36, 60],
  [160, 50, 60, 188, 32, 80],
] as const;

const deriveEnemy = Effect.gen(function* () {
  const { st } = yield* Game;
  st.eDmgMin = div(st.eStr, 2);
  st.eDmgMax = st.eStr;
  st.eHpMax = st.eVit * 5 + st.eStr + 10;
  st.eHp = st.eHpMax;
  st.eJawBroken = 0;
  st.eLegBroken = 0;
});

/** 0000:1348 — `sv`: inspect the enemy */
export const showEnemy = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  let title = st.eLevel > 40 ? 'Не в этой жизни.' : mem.rankName(st.eLevel);
  title = ' - ' + title;
  if (st.eType >= 8) title = '';
  yield* println(`^2Это ${mem.typeName(st.eType)} # уровня${title}`, st.eLevel);
  yield* println('Сл:# Лв:# Жв:# Уд:#', st.eStr, st.eAgi, st.eVit, st.eLuck);
  yield* println('Урон #-#', st.eDmgMin, st.eDmgMax);
  let injuries = '';
  if (st.eJawBroken === 1) injuries += '^4Сломана челюсть  ';
  if (st.eLegBroken === 1) injuries += '^4Сломана нога  ';
  yield* println(`^${healthColor(st.eHp, st.eHpMax)}Здоровье #/#  ${injuries}`, st.eHp, st.eHpMax);
  yield* accuracy(st.eAgi);
  if (st.eArmor > 0) yield* println('^2Броня #    ', st.eArmor);
});
