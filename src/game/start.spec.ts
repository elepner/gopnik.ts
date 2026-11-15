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
      expect([
        st.player.type,
        st.player.stats.strength,
        st.player.stats.agility,
        st.player.stats.vitality,
        st.player.stats.luck,
      ]).toEqual(['otmorozok', 5, 2, 4, 1]);
      expect([
        st.player.health.max,
        st.player.health.current,
        st.player.damage.min,
        st.player.damage.max,
      ]).toEqual([35, 35, 2, 5]);
      expect([
        st.world.district,
        st.player.progression.expNext,
        st.world.den.loans,
        st.player.name,
      ]).toEqual([1, 10, 5, '^7 vasya']);
      expect([st.world.places.market, st.world.places.hospital]).toEqual([true, true]);
    })
  );

  it.effect(
    'class bonuses: Пацан gets a girlfriend and the club, Вор the dealers, Гопник the den',
    () =>
      Effect.gen(function* () {
        const patsan = yield* play(newGame, { keys: [...STORY, ...keys('0', 'a')] });
        expect([patsan.st.world.places.girlfriend, patsan.st.world.places.club]).toEqual([
          true,
          true,
        ]);
        const vor = yield* play(newGame, { keys: [...STORY, ...keys('3', 'a')] });
        expect([vor.st.world.places.dealers, vor.st.player.stats.luck]).toEqual([true, 4]);
        const gop = yield* play(newGame, { keys: [...STORY, ...keys('2', 'a')] });
        expect(gop.st.world.places.den).toBe(true);
      })
  );

  it.effect(
    '"4" explains the classes and asks again; nonsense means Пацан; empty name is Раздолбай',
    () =>
      Effect.gen(function* () {
        const { st, lines } = yield* play(newGame, { keys: [...STORY, ...keys('4', 'xyz', '')] });
        expect(lines).toContain('Пацан - это нормальный тип. (Бонус - Гёлфренд, Клуб).');
        expect([st.player.type, st.player.stats.strength]).toEqual(['patsan', 3]);
        expect(st.player.name).toBe('^7 Раз^6дол^4бай');
      })
  );
});
