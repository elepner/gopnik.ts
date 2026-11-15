import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import { PRICE } from '../data/tables';
import { market } from './places';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l, 'enter']);

describe('market (0000:B940)', () => {
  it.effect('beer costs 5 and the shop stays open until w', () =>
    Effect.gen(function* () {
      const { st } = yield* play(market, {
        keys: keys('2', '2', 'w'),
        setup: (s) => (hero(s), (s.money = 12)),
      });
      expect([st.money, st.beer]).toEqual([12 - 2 * PRICE.beer, 2]);
    })
  );

  it.effect('not enough money and a broken jaw are refused', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(market, {
        keys: keys('2', '1', 'w'),
        setup: (s) => (hero(s), (s.money = 3), (s.hp = 10), (s.jawBroken = 1)),
      });
      expect([st.money, st.beer, st.hp]).toEqual([3, 0, 10]);
      expect(lines).toEqual(
        expect.arrayContaining(['Не хватает', 'Ты не можешь хавать из-за сломаной челюсти.'])
      );
    })
  );

  it.effect('sic: the Adidas suit can be bought in district 1 although it is not offered', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(market, {
        keys: keys('7', 'w'),
        setup: (s) => (hero(s), (s.money = 40)),
      });
      expect(lines.some((l) => l.includes('adidas'))).toBe(false);
      expect([st.adidas, st.armor, st.money]).toEqual([1, 2, 40 - PRICE.adidas]);
    })
  );

  it.effect('pickpocketing rolls Random(district*5+5) first, even when luck has overflowed', () =>
    Effect.gen(function* () {
      for (const luck of [4, -642]) {
        const { rand } = yield* play(market, {
          seed: 11,
          keys: [...keys('t'), ...keys('run'), ...keys('w')],
          setup: (s) => (hero(s), (s.luck = luck)),
        });
        expect(rand[0].n).toBe(10);
      }
    })
  );

  it.effect('getting caught means a fight and five walks of police heat', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(market, {
        seed: 11,
        keys: [...keys('t'), ...keys('run')],
        setup: (s) => (hero(s), (s.luck = -642)),
      });
      expect(lines).toContain('Корявый! ты попался!');
      expect([st.marketHeat, st.input]).toEqual([5, 'w']);
    })
  );
});
