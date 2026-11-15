import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../../test/game';
import { PRICE } from '../../data/tables';
import { attr, set } from '../../state/attributes';
import type { GameState, Game } from '../../state/state';
import { District } from '../../tp/brands';
import { i16 } from '../../tp/num';
import type { GameEvent } from '../events';
import { market } from './market';
import type { MarketGoods, MarketRefusal } from './market-view';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l, 'enter']);

/** the hero at the market with some money; `more` prepares the rest */
function shopper(money: number, more: (st: Game) => void = () => {}) {
  return (s: GameState) => {
    const st = hero(s);
    st.player.resources.money = money;
    more(st);
  };
}

/** plays the market with `lines` typed and keeps its events, prompts left out */
function visit(setup: (s: GameState) => void, lines: string[], seed?: number) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(market, { keys: keys(...lines), setup, seed, events });
    return { ...played, events, happened: events.filter((e) => e.type !== 'prompt') };
  });
}

const entered = { type: 'enteredMarket' } as const;
const refused = (goods: MarketGoods, because: MarketRefusal) =>
  ({ type: 'marketRefused', goods, because }) as const;

describe('market (0000:B940)', () => {
  it.effect('an unknown market lets nobody in', () =>
    Effect.gen(function* () {
      const { happened, exit } = yield* visit(
        shopper(10, (st) => (st.world.places.market = false)),
        []
      );
      expect(happened).toEqual([{ type: 'marketUnknown' }]);
      expect(exit._tag).toBe('Success');
    })
  );

  it.effect('while the cops watch, the market stays shut', () =>
    Effect.gen(function* () {
      const { happened, exit } = yield* visit(
        shopper(10, (st) => (st.world.heat.market = 3)),
        []
      );
      expect(happened).toEqual([{ type: 'marketWatched' }]);
      expect(exit._tag).toBe('Success');
    })
  );

  it.effect('w leaves the market', () =>
    Effect.gen(function* () {
      const { events, exit } = yield* visit(shopper(10), ['w']);
      expect(events).toEqual([entered, { type: 'prompt', context: 'market' }]);
      expect(exit._tag).toBe('Success');
    })
  );

  it.effect('an unknown command just asks again', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit(shopper(10), ['x']);
      expect(events.map((e) => e.type)).toEqual(['enteredMarket', 'prompt', 'prompt']);
      expect(st.player.resources.money).toBe(10);
    })
  );

  describe('hot dog', () => {
    it.effect('heals 3 + Random(2), for 2', () =>
      Effect.gen(function* () {
        // seed 16: Random(2) = 1
        const { happened, st, rand } = yield* visit(
          shopper(10, (s) => (s.player.health.current = 20)),
          ['1'],
          16
        );
        expect(rand).toEqual([{ n: 2, result: 1 }]);
        expect(happened).toEqual([entered, { type: 'marketAteHotdog', health: 4 }]);
        expect([st.player.health.current, st.player.resources.money]).toEqual([
          24,
          10 - PRICE.hotdog,
        ]);
      })
    );

    it.effect('never heals above the maximum', () =>
      Effect.gen(function* () {
        const { st } = yield* visit(
          shopper(10, (s) => (s.player.health.current = 34)),
          ['1']
        );
        expect(st.player.health.current).toBe(attr(st.player, 'healthMax'));
      })
    );

    it.effect('a broken jaw can not eat', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          shopper(10, (s) => ((s.player.health.current = 20), (s.player.injuries.jaw = true))),
          ['1']
        );
        expect(happened).toEqual([entered, refused('hotdog', 'jaw')]);
        expect([st.player.health.current, st.player.resources.money]).toEqual([20, 10]);
      })
    );

    it.effect('a healthy hero is not hungry', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(shopper(10), ['1']);
        expect(happened).toEqual([entered, refused('hotdog', 'notHungry')]);
        expect(st.player.resources.money).toBe(10);
      })
    );

    it.effect('costs money', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          shopper(1, (s) => (s.player.health.current = 20)),
          ['1']
        );
        expect(happened).toEqual([entered, refused('hotdog', 'money')]);
        expect(st.player.health.current).toBe(20);
      })
    );
  });

  describe('beer', () => {
    it.effect('a beer for 5; Random(3) picks what is said', () =>
      Effect.gen(function* () {
        // seed 11: Random(3) = 1
        const { happened, st } = yield* visit(shopper(12), ['2'], 11);
        expect(happened).toEqual([entered, { type: 'marketBeerBought', line: 1 }]);
        expect([st.player.resources.money, st.player.resources.beer]).toEqual([12 - PRICE.beer, 1]);
      })
    );

    it.effect('costs money', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(shopper(4), ['2']);
        expect(happened).toEqual([entered, refused('beer', 'money')]);
        expect(st.player.resources.beer).toBe(0);
      })
    );

    it.effect('the shop stays open until w', () =>
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

    it.effect('not enough money and a broken jaw are refused (as printed)', () =>
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
  });

  describe('clothes', () => {
    /** command, goods, price, the district that offers it, what a better one is */
    const CLOTHES = [
      { key: '3', goods: 'glasses', price: PRICE.glasses, district: 1 },
      { key: '4', goods: 'abibas', price: PRICE.abibas, district: 1, better: 'adidas' },
      { key: '5', goods: 'boots', price: PRICE.boots, district: 1, better: 'coolBoots' },
      { key: '6', goods: 'leather', price: PRICE.leather, district: 2, better: 'coolLeather' },
      { key: '7', goods: 'adidas', price: PRICE.adidas, district: 1 },
      { key: '8', goods: 'coolBoots', price: PRICE.boots2, district: 3 },
      { key: '9', goods: 'coolLeather', price: PRICE.leather2, district: 4 },
    ] as const;

    const has = (st: Game, goods: string) =>
      ({
        glasses: st.player.body.eyes.glasses,
        abibas: st.player.body.torso.abibas,
        adidas: st.player.body.torso.adidas,
        leather: st.player.body.torso.leather,
        coolLeather: st.player.body.torso.coolLeather,
        boots: st.player.body.feet.boots,
        coolBoots: st.player.body.feet.coolBoots,
      })[goods];

    const wear = (st: Game, goods: string) => {
      const { eyes, torso, feet } = st.player.body;
      if (goods === 'glasses') eyes.glasses = true;
      if (goods === 'abibas') torso.abibas = true;
      if (goods === 'adidas') torso.adidas = true;
      if (goods === 'leather') torso.leather = true;
      if (goods === 'coolLeather') torso.coolLeather = true;
      if (goods === 'boots') feet.boots = true;
      if (goods === 'coolBoots') feet.coolBoots = true;
    };

    const inDistrict = (n: number) => (st: Game) => (st.world.district = District(n));

    for (const c of CLOTHES) {
      it.effect(`${c.key} buys ${c.goods} for ${c.price}`, () =>
        Effect.gen(function* () {
          const { happened, st } = yield* visit(shopper(100, inDistrict(c.district)), [c.key]);
          expect(happened).toEqual([entered, { type: 'marketBought', goods: c.goods }]);
          expect(has(st, c.goods)).toBe(true);
          expect(st.player.resources.money).toBe(100 - c.price);
        })
      );

      it.effect(`${c.goods} costs money`, () =>
        Effect.gen(function* () {
          const { happened, st } = yield* visit(shopper(c.price - 1, inDistrict(c.district)), [
            c.key,
          ]);
          expect(happened).toEqual([entered, refused(c.goods, 'money')]);
          expect(has(st, c.goods)).toBe(false);
        })
      );

      it.effect(`${c.goods} is not sold twice`, () =>
        Effect.gen(function* () {
          const { happened, st } = yield* visit(
            shopper(100, (s) => (inDistrict(c.district)(s), wear(s, c.goods))),
            [c.key]
          );
          expect(happened).toEqual([entered, refused(c.goods, 'owned')]);
          expect(st.player.resources.money).toBe(100);
        })
      );

      if ('better' in c)
        it.effect(`${c.goods} is not sold over ${c.better}`, () =>
          Effect.gen(function* () {
            const { happened, st } = yield* visit(
              shopper(100, (s) => (inDistrict(c.district)(s), wear(s, c.better))),
              [c.key]
            );
            expect(happened).toEqual([entered, refused(c.goods, 'ownedBetter')]);
            expect([has(st, c.goods), st.player.resources.money]).toEqual([false, 100]);
          })
        );

      if (c.district > 1)
        it.effect(`${c.goods} is not sold below district ${c.district}`, () =>
          Effect.gen(function* () {
            const { happened, st } = yield* visit(shopper(100, inDistrict(c.district - 1)), [
              c.key,
            ]);
            expect(happened).toEqual([entered]);
            expect([has(st, c.goods), st.player.resources.money]).toEqual([false, 100]);
          })
        );
    }

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
  });

  describe('stealing (t)', () => {
    it.effect('a picked pocket gives Random(luck*2)+1 and district*2 experience', () =>
      Effect.gen(function* () {
        // seed 0: Random(10) = 0 ≤ luck, Random(10) = 0 < 9, Random(40) = 34
        const { happened, st, rand } = yield* visit(
          shopper(0, (s) => set(s.player, 'luck', 20)),
          ['t'],
          0
        );
        expect(rand.map((r) => r.n)).toEqual([10, 10, 40]);
        expect(happened).toEqual([
          entered,
          { type: 'marketStole', money: 35 },
          { type: 'heroExpGained', exp: 2 },
        ]);
        expect([st.player.resources.money, st.player.progression.exp]).toEqual([35, 2]);
      })
    );

    it.effect('without luck the thief is caught and has to fight', () =>
      Effect.gen(function* () {
        const { events, exit } = yield* visit(
          shopper(0, (s) => set(s.player, 'luck', -1)),
          ['t']
        );
        expect(events.map((e) => e.type)).toEqual([
          'enteredMarket',
          'prompt',
          'marketCaughtStealing',
          'greeting',
          'fightStarted',
          'prompt',
        ]);
        expect(events).toContainEqual({ type: 'greeting', by: 'caughtStealing' });
        expect(events.at(-1)).toEqual({ type: 'prompt', context: 'fight' });
        expect(exit._tag).toBe('Failure');
      })
    );

    it.effect('a lucky thief is still caught one time in ten', () =>
      Effect.gen(function* () {
        // seed 12: Random(10) = 3 ≤ luck, Random(10) = 9
        const { happened, rand } = yield* visit(
          shopper(0, (s) => set(s.player, 'luck', 20)),
          ['t'],
          12
        );
        expect(rand.slice(0, 2)).toEqual([
          { n: 10, result: 3 },
          { n: 10, result: 9 },
        ]);
        expect(happened.map((e) => e.type)).toEqual([
          'enteredMarket',
          'marketCaughtStealing',
          'greeting',
          'fightStarted',
        ]);
      })
    );

    it.effect('after the fight the cops watch the market for five walks and the thief is out', () =>
      Effect.gen(function* () {
        const { happened, st, exit } = yield* visit(
          shopper(0, (s) => set(s.player, 'luck', -1)),
          ['t', 'run']
        );
        expect(happened.at(-1)).toEqual({ type: 'marketCopsAlerted' });
        expect(st.world.heat.market).toBe(5);
        expect(st.battle).toBeNull();
        expect(exit._tag).toBe('Success');
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

    it.effect('getting caught means a fight and five walks of police heat (as printed)', () =>
      Effect.gen(function* () {
        const { st, lines } = yield* play(market, {
          seed: 11,
          keys: [...keys('t'), ...keys('run')],
          setup: (s) => (hero(s), set(s.player, 'luck', i16(-642))),
        });
        expect(lines).toContain('Корявый! ты попался!');
        expect(st.world.heat.market).toBe(5);
      })
    );
  });
});
