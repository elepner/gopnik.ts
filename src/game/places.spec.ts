import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { i16 } from '../../src/tp/num';
import { hero, play } from '../../test/game';
import { PRICE } from '../data/tables';
import { attr, set } from '../state/attributes';
import { market } from './places';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l, 'enter']);

describe('market (0000:B940)', () => {
  it.effect('beer costs 5 and the shop stays open until w', () =>
    Effect.gen(function* () {
      const { st } = yield* play(market, {
        keys: keys('2', '2', 'w'),
        setup: (s) => (hero(s), (s.player.resources.money = 12)),
      });
      expect([st.player.resources.money, st.player.resources.beer]).toEqual([
        12 - 2 * PRICE.beer,
        2,
      ]);
    })
  );

  it.effect('not enough money and a broken jaw are refused', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(market, {
        keys: keys('2', '1', 'w'),
        setup: (s) => (
          hero(s),
          (s.player.resources.money = 3),
          (s.player.health.current = 10),
          (s.player.injuries.jaw = true)
        ),
      });
      expect([
        st.player.resources.money,
        st.player.resources.beer,
        st.player.health.current,
      ]).toEqual([3, 0, 10]);
      expect(lines).toEqual(
        expect.arrayContaining(['Не хватает', 'Ты не можешь хавать из-за сломаной челюсти.'])
      );
    })
  );

  it.effect('sic: the Adidas suit can be bought in district 1 although it is not offered', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(market, {
        keys: keys('7', 'w'),
        setup: (s) => (hero(s), (s.player.resources.money = 40)),
      });
      expect(lines.some((l) => l.includes('adidas'))).toBe(false);
      expect([
        st.player.body.torso.adidas,
        attr(st.player, 'armor'),
        st.player.resources.money,
      ]).toEqual([true, 2, 40 - PRICE.adidas]);
    })
  );

  it.effect('pickpocketing rolls Random(district*5+5) first, even when luck has overflowed', () =>
    Effect.gen(function* () {
      for (const luck of [4, -642]) {
        const { rand } = yield* play(market, {
          seed: 11,
          keys: [...keys('t'), ...keys('run'), ...keys('w')],
          setup: (s) => (hero(s), set(s.player, 'luck', i16(luck))),
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
        setup: (s) => (hero(s), set(s.player, 'luck', i16(-642))),
      });
      expect(lines).toContain('Корявый! ты попался!');
      expect([st.world.heat.market, st.session.lastAnswer]).toEqual([5, 'w']);
    })
  );
});
