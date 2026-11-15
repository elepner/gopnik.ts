import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { play } from '../../test/game';
import { newGame } from './start';

const STORY = ['space', '1', '2', '3', '4', '5', '6', '7'];
const keys = (...lines: string[]) => lines.flatMap((l) => [...l, 'enter']);

describe('newGame (0000:6A0D)', () => {
  it.effect('Отморозок: stats, health and damage', () =>
    Effect.gen(function* () {
      const { st, exit } = yield* play(newGame, { keys: [...STORY, ...keys('1', 'vasya')] });
      expect(exit._tag).toBe('Success');
      expect([st.charType, st.str, st.agi, st.vit, st.luck]).toEqual([4, 5, 2, 4, 1]);
      expect([st.hpMax, st.hp, st.dmgMin, st.dmgMax]).toEqual([35, 35, 2, 5]);
      expect([st.district, st.expNext, st.loans, st.name]).toEqual([1, 10, 5, '^7 vasya']);
      expect([st.knowsMarket, st.knowsHospital]).toEqual([1, 1]);
    })
  );

  it.effect(
    'class bonuses: Пацан gets a girlfriend and the club, Вор the dealers, Гопник the den',
    () =>
      Effect.gen(function* () {
        const patsan = yield* play(newGame, { keys: [...STORY, ...keys('0', 'a')] });
        expect([patsan.st.hasGirl, patsan.st.knowsClub]).toEqual([1, 1]);
        const vor = yield* play(newGame, { keys: [...STORY, ...keys('3', 'a')] });
        expect([vor.st.knowsDealers, vor.st.luck]).toEqual([1, 4]);
        const gop = yield* play(newGame, { keys: [...STORY, ...keys('2', 'a')] });
        expect(gop.st.denAccess).toBe(1);
      })
  );

  it.effect(
    '"4" explains the classes and asks again; nonsense means Пацан; empty name is Раздолбай',
    () =>
      Effect.gen(function* () {
        const { st, lines } = yield* play(newGame, { keys: [...STORY, ...keys('4', 'xyz', '')] });
        expect(lines).toContain('Пацан - это нормальный тип. (Бонус - Гёлфренд, Клуб).');
        expect([st.charType, st.str]).toEqual([3, 3]);
        expect(st.name).toBe('^7 Раз^6дол^4бай');
      })
  );
});
