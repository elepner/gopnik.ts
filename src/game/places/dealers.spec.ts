import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../../test/game';
import { PRICE } from '../../data/tables';
import { attr, set } from '../../state/attributes';
import type { Game, GameState } from '../../state/state';
import { District } from '../../tp/brands';
import type { GameEvent } from '../events';
import { dealers } from './dealers';
import type { DealersGoods, DealersRefusal, SpareThing } from './dealers-view';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l, 'enter']);

/** the hero let in to the dealers of district 3 with some money; `more` prepares the rest */
function customer(money: number, more: (st: Game) => void = () => {}) {
  return (s: GameState) => {
    const st = hero(s);
    st.world.district = District(3);
    st.world.places.dealers = true;
    st.player.resources.money = money;
    more(st);
  };
}

/** plays the dealers with `lines` typed and keeps their events, prompts left out */
function visit(setup: (s: GameState) => void, lines: string[], seed?: number) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(dealers, { keys: keys(...lines), setup, seed, events });
    return { ...played, events, happened: events.filter((e) => e.type !== 'prompt') };
  });
}

const entered = { type: 'enteredDealers' } as const;
const bought = (goods: DealersGoods) => ({ type: 'dealersBought', goods }) as const;
const refused = (goods: DealersGoods, because: DealersRefusal) =>
  ({ type: 'dealersRefused', goods, because }) as const;
const asked = (thing: SpareThing) => ({ type: 'dealersSellAsked', thing }) as const;

const pistol =
  (bullets = 3, silencer = false) =>
  (st: Game) => {
    st.player.body.pockets.pistol = { silencer, bullets };
  };

describe('dealers (0000:C4B4)', () => {
  it.effect('nobody gets in before being let in', () =>
    Effect.gen(function* () {
      const { happened, exit } = yield* visit(
        customer(100, (st) => (st.world.places.dealers = false)),
        []
      );
      expect(happened).toEqual([{ type: 'dealersUnknown' }]);
      expect(exit._tag).toBe('Success');
    })
  );

  it.effect('w leaves', () =>
    Effect.gen(function* () {
      const { events, exit } = yield* visit(customer(100), ['w']);
      expect(events).toEqual([entered, { type: 'prompt', context: 'dealers' }]);
      expect(exit._tag).toBe('Success');
    })
  );

  describe('goods', () => {
    it.effect('a joint for 15', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100), ['1']);
        expect(happened).toEqual([entered, bought('joint')]);
        expect([st.player.resources.joints, st.player.resources.money]).toEqual([
          1,
          100 - PRICE.joint,
        ]);
      })
    );

    it.effect('a phone for 30', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100), ['2']);
        expect(happened).toEqual([entered, bought('phone')]);
        expect([st.player.body.pockets.phone, st.player.resources.money]).toEqual([
          true,
          100 - PRICE.phone,
        ]);
      })
    );

    it.effect('only one phone', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          customer(100, (s) => (s.player.body.pockets.phone = true)),
          ['2']
        );
        expect(happened).toEqual([entered, refused('phone', 'owned')]);
        expect(st.player.resources.money).toBe(100);
      })
    );

    it.effect('a tattoo for 10', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100), ['4']);
        expect(happened).toEqual([entered, bought('tattoo')]);
        expect([st.player.body.skin.tattoo, st.player.resources.money]).toEqual([
          true,
          100 - PRICE.tattoo,
        ]);
      })
    );

    it.effect('only one tattoo', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          customer(100, (s) => (s.player.body.skin.tattoo = true)),
          ['4']
        );
        expect(happened).toEqual([entered, refused('tattoo', 'owned')]);
        expect(st.player.resources.money).toBe(100);
      })
    );

    it.effect('knuckles for 25', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100), ['5']);
        expect(happened).toEqual([entered, bought('knuckles')]);
        expect([st.player.body.hands.weapons.knuckles, st.player.resources.money]).toEqual([
          true,
          100 - PRICE.knuckles,
        ]);
      })
    );

    it.effect('no second knuckles', () =>
      Effect.gen(function* () {
        const { happened } = yield* visit(
          customer(100, (s) => (s.player.body.hands.weapons.knuckles = true)),
          ['5']
        );
        expect(happened).toEqual([entered, refused('knuckles', 'owned')]);
      })
    );

    it.effect('no knuckles next to a knife', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          customer(100, (s) => (s.player.body.hands.weapons.knife = true)),
          ['5']
        );
        expect(happened).toEqual([entered, refused('knuckles', 'ownedBetter')]);
        expect(st.player.body.hands.weapons.knuckles).toBe(false);
      })
    );

    it.effect('a club for 50', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100), ['6']);
        expect(happened).toEqual([entered, bought('club')]);
        expect([st.player.body.hands.weapons.club, st.player.resources.money]).toEqual([
          true,
          100 - PRICE.club,
        ]);
      })
    );

    it.effect('no second club', () =>
      Effect.gen(function* () {
        const { happened } = yield* visit(
          customer(100, (s) => (s.player.body.hands.weapons.club = true)),
          ['6']
        );
        expect(happened).toEqual([entered, refused('club', 'owned')]);
      })
    );

    it.effect('no club next to a cleaver', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          customer(100, (s) => (s.player.body.hands.weapons.cleaver = true)),
          ['6']
        );
        expect(happened).toEqual([entered, refused('club', 'ownedBetter')]);
        expect(st.player.body.hands.weapons.club).toBe(false);
      })
    );

    it.effect('a pistol for 150 comes with 3 bullets', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(200), ['7']);
        expect(happened).toEqual([entered, bought('pistol')]);
        expect(st.player.body.pockets.pistol).toEqual({ silencer: false, bullets: 3 });
        expect(st.player.resources.money).toBe(200 - PRICE.pistol);
      })
    );

    it.effect('only one pistol', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(200, pistol(1)), ['7']);
        expect(happened).toEqual([entered, refused('pistol', 'owned')]);
        expect(st.player.body.pockets.pistol!.bullets).toBe(1);
      })
    );

    it.effect('5 bullets for 70', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100, pistol(1)), ['8']);
        expect(happened).toEqual([entered, bought('bullets')]);
        expect([st.player.body.pockets.pistol!.bullets, st.player.resources.money]).toEqual([
          6,
          100 - PRICE.bullets,
        ]);
      })
    );

    it.effect('no bullets without a pistol', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(100), ['8']);
        expect(happened).toEqual([entered, refused('bullets', 'noPistol')]);
        expect(st.player.resources.money).toBe(100);
      })
    );

    describe('silencer: only for a pistol, after 25 calls to the dealers', () => {
      const called = (st: Game) => (st.world.dealerCalls = 25);

      it.effect('a silencer for 60', () =>
        Effect.gen(function* () {
          const { happened, st } = yield* visit(
            customer(100, (s) => (pistol()(s), called(s))),
            ['9']
          );
          expect(happened).toEqual([entered, bought('silencer')]);
          expect([st.player.body.pockets.pistol!.silencer, st.player.resources.money]).toEqual([
            true,
            100 - PRICE.silencer,
          ]);
        })
      );

      it.effect('only one silencer', () =>
        Effect.gen(function* () {
          const { happened } = yield* visit(
            customer(100, (s) => (pistol(3, true)(s), called(s))),
            ['9']
          );
          expect(happened).toEqual([entered, refused('silencer', 'owned')]);
        })
      );

      it.effect('without a pistol 9 means nothing', () =>
        Effect.gen(function* () {
          const { happened } = yield* visit(customer(100, called), ['9']);
          expect(happened).toEqual([entered]);
        })
      );

      it.effect('before the 25th call 9 means nothing', () =>
        Effect.gen(function* () {
          const { happened } = yield* visit(
            customer(100, (s) => (pistol()(s), (s.world.dealerCalls = 24))),
            ['9']
          );
          expect(happened).toEqual([entered]);
        })
      );
    });

    /** every good, its key, and a setup in which it could be bought but for the money */
    const PRICED = [
      { key: '1', goods: 'joint', price: PRICE.joint },
      { key: '2', goods: 'phone', price: PRICE.phone },
      { key: '3', goods: 'superJoint', price: PRICE.superJoint },
      { key: '4', goods: 'tattoo', price: PRICE.tattoo },
      { key: '5', goods: 'knuckles', price: PRICE.knuckles },
      { key: '6', goods: 'club', price: PRICE.club },
      { key: '7', goods: 'pistol', price: PRICE.pistol },
      { key: '8', goods: 'bullets', price: PRICE.bullets, more: pistol() },
      {
        key: '9',
        goods: 'silencer',
        price: PRICE.silencer,
        more: (st: Game) => (pistol()(st), (st.world.dealerCalls = 25)),
      },
    ] as const;

    for (const g of PRICED)
      it.effect(`${g.goods} costs ${g.price}`, () =>
        Effect.gen(function* () {
          const { happened, st, rand } = yield* visit(
            customer(g.price - 1, 'more' in g ? g.more : undefined),
            [g.key]
          );
          expect(happened).toEqual([entered, refused(g.goods, 'money')]);
          expect([st.player.resources.money, rand]).toEqual([g.price - 1, []]);
        })
      );
  });

  describe('super joint: 20, and Random(4) picks the stat it raises', () => {
    it.effect('strength hits harder and adds health; an even strength raises the minimum', () =>
      Effect.gen(function* () {
        // seed 0: Random(4) = 0
        const { happened, st, rand } = yield* visit(customer(100), ['3'], 0);
        expect(rand).toEqual([{ n: 4, result: 0 }]);
        expect(happened).toEqual([
          entered,
          bought('superJoint'),
          { type: 'dealersSteroids', stat: 'strength' },
        ]);
        expect([
          attr(st.player, 'strength'),
          attr(st.player, 'damageMin'),
          attr(st.player, 'damageMax'),
          attr(st.player, 'healthMax'),
          st.player.health.current,
          st.player.resources.money,
        ]).toEqual([6, 3, 6, 36, 36, 100 - PRICE.superJoint]);
      })
    );

    it.effect('an odd strength leaves the minimum damage', () =>
      Effect.gen(function* () {
        // seed 0: Random(4) = 0
        const { st } = yield* visit(
          customer(100, (s) => set(s.player, 'strength', 6)),
          ['3'],
          0
        );
        expect([attr(st.player, 'strength'), attr(st.player, 'damageMin')]).toEqual([7, 2]);
      })
    );

    it.effect('agility', () =>
      Effect.gen(function* () {
        // seed 8: Random(4) = 1
        const { happened, st } = yield* visit(customer(100), ['3'], 8);
        expect(happened.at(-1)).toEqual({ type: 'dealersSteroids', stat: 'agility' });
        expect([attr(st.player, 'agility'), attr(st.player, 'healthMax')]).toEqual([3, 35]);
      })
    );

    it.effect('vitality adds 5 health', () =>
      Effect.gen(function* () {
        // seed 16: Random(4) = 2
        const { happened, st } = yield* visit(customer(100), ['3'], 16);
        expect(happened.at(-1)).toEqual({ type: 'dealersSteroids', stat: 'vitality' });
        expect([
          attr(st.player, 'vitality'),
          attr(st.player, 'healthMax'),
          st.player.health.current,
        ]).toEqual([5, 40, 40]);
      })
    );

    it.effect('luck', () =>
      Effect.gen(function* () {
        // seed 24: Random(4) = 3
        const { happened, st } = yield* visit(customer(100), ['3'], 24);
        expect(happened.at(-1)).toEqual({ type: 'dealersSteroids', stat: 'luck' });
        expect(attr(st.player, 'luck')).toBe(2);
      })
    );
  });

  describe('junk (x)', () => {
    it.effect('all the junk goes for its worth', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(
          customer(10, (s) => (s.player.resources.junk = 7)),
          ['x']
        );
        expect(happened).toEqual([entered, { type: 'dealersSoldJunk' }]);
        expect([st.player.resources.money, st.player.resources.junk]).toEqual([17, 0]);
      })
    );

    it.effect('no junk, nothing to sell', () =>
      Effect.gen(function* () {
        const { happened, st } = yield* visit(customer(10), ['x']);
        expect(happened).toEqual([entered, { type: 'dealersNoJunk' }]);
        expect(st.player.resources.money).toBe(10);
      })
    );
  });

  describe('spare things (wes): a worse thing next to a better one, for Random(spread)+base', () => {
    const { torso, feet, weapons } = {
      torso: (k: 'abibas' | 'adidas' | 'leather' | 'coolLeather') => (st: Game) =>
        (st.player.body.torso[k] = true),
      feet: (k: 'boots' | 'coolBoots') => (st: Game) => (st.player.body.feet[k] = true),
      weapons: (k: 'knuckles' | 'club' | 'knife' | 'cleaver') => (st: Game) =>
        (st.player.body.hands.weapons[k] = true),
    };
    const all =
      (...fs: ((st: Game) => unknown)[]) =>
      (st: Game) =>
        fs.forEach((f) => f(st));

    /** the thing, what makes it spare, its price range */
    const SPARES = [
      { thing: 'abibas', has: all(torso('abibas'), torso('adidas')), base: 8, spread: 5 },
      { thing: 'boots', has: all(feet('boots'), feet('coolBoots')), base: 8, spread: 5 },
      {
        thing: 'leather',
        has: all(torso('leather'), torso('coolLeather')),
        base: 13,
        spread: 8,
      },
      { thing: 'knuckles', has: all(weapons('knuckles'), weapons('club')), base: 13, spread: 8 },
      { thing: 'club', has: all(weapons('club'), weapons('knife')), base: 25, spread: 15 },
      { thing: 'knife', has: all(weapons('knife'), weapons('cleaver')), base: 38, spread: 23 },
    ] as const;

    const owns = (st: Game, thing: SpareThing) =>
      ({
        abibas: st.player.body.torso.abibas,
        boots: st.player.body.feet.boots,
        leather: st.player.body.torso.leather,
        knuckles: st.player.body.hands.weapons.knuckles,
        club: st.player.body.hands.weapons.club,
        knife: st.player.body.hands.weapons.knife,
      })[thing];

    for (const s of SPARES) {
      it.effect(`y sells the spare ${s.thing}`, () =>
        Effect.gen(function* () {
          const { happened, st, rand } = yield* visit(customer(10, s.has), ['wes', 'y']);
          expect(rand.map((r) => r.n)).toEqual([s.spread]);
          const price = s.base + rand[0].result;
          expect(happened).toEqual([
            entered,
            asked(s.thing),
            { type: 'dealersSold', thing: s.thing, price },
          ]);
          expect([owns(st, s.thing), st.player.resources.money]).toEqual([false, 10 + price]);
        })
      );
    }

    it.effect('another answer keeps the thing, the price is rolled anyway', () =>
      Effect.gen(function* () {
        const { happened, st, rand } = yield* visit(customer(10, SPARES[5].has), ['wes', 'n']);
        expect(rand.map((r) => r.n)).toEqual([23]);
        expect(happened).toEqual([entered, asked('knife')]);
        expect([st.player.body.hands.weapons.knife, st.player.resources.money]).toEqual([true, 10]);
      })
    );

    it.effect('every spare thing is offered, in order', () =>
      Effect.gen(function* () {
        const { happened } = yield* visit(customer(10, all(...SPARES.map((s) => s.has))), [
          'wes',
          'n',
          'n',
          'n',
          'n',
          'n',
          'n',
        ]);
        expect(happened).toEqual([entered, ...SPARES.map((s) => asked(s.thing))]);
      })
    );

    it.effect('nothing spare, nothing to sell', () =>
      Effect.gen(function* () {
        const { happened, rand } = yield* visit(
          customer(10, all(torso('adidas'), weapons('cleaver'))),
          ['wes']
        );
        expect(happened).toEqual([entered, { type: 'dealersNothingSpare' }]);
        expect(rand).toEqual([]);
      })
    );
  });

  describe('weapons (fixed: the best weapon in hand counts)', () => {
    const armed = (s: Parameters<typeof hero>[0]) => {
      const st = hero(s);
      st.world.district = District(3);
      st.world.places.dealers = true;
      st.player.resources.money = 200;
      return st;
    };

    it.effect('a club on its own gives +4 (the original: nothing)', () =>
      Effect.gen(function* () {
        const { st } = yield* play(dealers, { keys: keys('6', 'w'), setup: armed });
        expect([attr(st.player, 'damageMin'), attr(st.player, 'damageMax')]).toEqual([6, 9]);
      })
    );

    it.effect('no knuckles next to a club; selling the spare ones changes nothing', () =>
      Effect.gen(function* () {
        const { st, lines } = yield* play(dealers, {
          keys: keys('wes', 'y', '5', 'w'),
          setup: (s) => {
            const st = armed(s);
            st.player.body.hands.weapons.knuckles = true;
            st.player.body.hands.weapons.club = true;
          },
        });
        expect(lines).toContain('Нафиг тебе он нужен, когда есть более мощное оружие.');
        expect(st.player.body.hands.weapons.knuckles).toBe(false);
        expect([attr(st.player, 'damageMin'), attr(st.player, 'damageMax')]).toEqual([6, 9]);
      })
    );
  });
});
