/** 0000:C4B4 — `bmar`: the dealers. */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { attr, inc } from '../../state/attributes';
import { outclassed } from '../../state/items';
import { i16, mod, u8 } from '../../tp/num';
import { CMD, promptCommand, readAnswer } from '../commands';
import { emit } from '../events';
import { rnd, started } from '../prelude';
import type { DealersGoods, DealersRefusal, SpareThing } from './dealers-view';

const bought = (goods: DealersGoods) => emit({ type: 'dealersBought', goods });

const refuse = (goods: DealersGoods, because: DealersRefusal) =>
  emit({ type: 'dealersRefused', goods, because });

/** 0000:C4B4 — `bmar` */
export const dealers = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.dealers) return yield* emit({ type: 'dealersUnknown' });
  yield* emit({ type: 'enteredDealers' });
  for (;;) {
    const command = yield* promptCommand('dealers');
    if (command === CMD.dealers.joint) {
      if (PRICE.joint > st.player.resources.money) yield* refuse('joint', 'money');
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.joint);
        st.player.resources.joints = i16(st.player.resources.joints + 1);
        yield* bought('joint');
      }
    }
    if (command === CMD.dealers.phone) {
      if (st.player.body.pockets.phone) yield* refuse('phone', 'owned');
      else if (PRICE.phone > st.player.resources.money) yield* refuse('phone', 'money');
      else {
        st.player.body.pockets.phone = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.phone);
        yield* bought('phone');
      }
    }
    if (command === CMD.dealers.superJoint) {
      if (PRICE.superJoint > st.player.resources.money) yield* refuse('superJoint', 'money');
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.superJoint);
        yield* bought('superJoint');
        const r = yield* rnd(4);
        if (r === 0) {
          inc(st.player, 'strength', 1);
          yield* emit({ type: 'dealersSteroids', stat: 'strength' });
          inc(st.player, 'damageMax', 1);
          if (mod(attr(st.player, 'strength'), 2) === 0) inc(st.player, 'damageMin', 1);
          inc(st.player, 'healthMax', 1);
          st.player.health.current = i16(st.player.health.current + 1);
        } else if (r === 1) {
          inc(st.player, 'agility', 1);
          yield* emit({ type: 'dealersSteroids', stat: 'agility' });
        } else if (r === 2) {
          inc(st.player, 'vitality', 1);
          yield* emit({ type: 'dealersSteroids', stat: 'vitality' });
          inc(st.player, 'healthMax', 5);
          st.player.health.current = i16(st.player.health.current + 5);
        } else if (r === 3) {
          inc(st.player, 'luck', 1);
          yield* emit({ type: 'dealersSteroids', stat: 'luck' });
        }
      }
    }
    if (command === CMD.dealers.tattoo) {
      if (st.player.body.skin.tattoo) yield* refuse('tattoo', 'owned');
      else if (PRICE.tattoo > st.player.resources.money) yield* refuse('tattoo', 'money');
      else {
        st.player.body.skin.tattoo = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.tattoo);
        yield* bought('tattoo');
      }
    }
    if (command === CMD.dealers.knuckles) {
      if (outclassed(st.player.body.hands.weapons, 'knuckles'))
        yield* refuse('knuckles', 'ownedBetter');
      else if (st.player.body.hands.weapons.knuckles) yield* refuse('knuckles', 'owned');
      else if (PRICE.knuckles > st.player.resources.money) yield* refuse('knuckles', 'money');
      else {
        st.player.body.hands.weapons.knuckles = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.knuckles);
        yield* bought('knuckles');
      }
    }
    if (command === CMD.dealers.club) {
      if (outclassed(st.player.body.hands.weapons, 'club')) yield* refuse('club', 'ownedBetter');
      else if (st.player.body.hands.weapons.club) yield* refuse('club', 'owned');
      else if (PRICE.club > st.player.resources.money) yield* refuse('club', 'money');
      else {
        st.player.body.hands.weapons.club = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.club);
        yield* bought('club');
      }
    }
    if (command === CMD.dealers.pistol) {
      if (st.player.body.pockets.pistol) yield* refuse('pistol', 'owned');
      else if (PRICE.pistol > st.player.resources.money) yield* refuse('pistol', 'money');
      else {
        st.player.body.pockets.pistol = { silencer: false, bullets: 3 };
        st.player.resources.money = i16(st.player.resources.money - PRICE.pistol);
        yield* bought('pistol');
      }
    }
    if (command === CMD.dealers.bullets) {
      if (!st.player.body.pockets.pistol) yield* refuse('bullets', 'noPistol');
      else if (PRICE.bullets > st.player.resources.money) yield* refuse('bullets', 'money');
      else {
        st.player.body.pockets.pistol.bullets = i16(st.player.body.pockets.pistol.bullets + 5);
        st.player.resources.money = i16(st.player.resources.money - PRICE.bullets);
        yield* bought('bullets');
      }
    }
    if (
      command === CMD.dealers.silencer &&
      st.player.body.pockets.pistol &&
      st.world.dealerCalls === 25
    ) {
      if (st.player.body.pockets.pistol.silencer) yield* refuse('silencer', 'owned');
      else if (PRICE.silencer > st.player.resources.money) yield* refuse('silencer', 'money');
      else {
        st.player.body.pockets.pistol.silencer = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.silencer);
        yield* bought('silencer');
      }
    }
    if (command === CMD.dealers.sellJunk) {
      if (st.player.resources.junk > 0) {
        st.player.resources.money = i16(st.player.resources.money + st.player.resources.junk);
        st.player.resources.junk = 0;
        yield* emit({ type: 'dealersSoldJunk' });
      } else yield* emit({ type: 'dealersNoJunk' });
    }
    if (command === CMD.dealers.sellSpareThings) yield* sellStuff;
    if (command === CMD.dealers.leave) break;
  }
});

const sellStuff = Effect.gen(function* () {
  const st = yield* started;
  /** price of the last offer as a signed byte; 255 = nothing to sell */
  let sold = 255;
  const sell = (thing: SpareThing, base: number, spread: number, drop: () => void) =>
    Effect.gen(function* () {
      yield* emit({ type: 'dealersSellAsked', thing });
      const answer = yield* readAnswer;
      sold = u8((yield* rnd(spread)) + base);
      if (answer !== CMD.answer.yes) return;
      drop();
      st.player.resources.money = i16(st.player.resources.money + ((sold << 24) >> 24));
      yield* emit({ type: 'dealersSold', thing, price: (sold << 24) >> 24 });
    });
  if (st.player.body.torso.abibas && st.player.body.torso.adidas)
    yield* sell('abibas', 8, 5, () => {
      st.player.body.torso.abibas = false;
    });
  if (st.player.body.feet.boots && st.player.body.feet.coolBoots)
    yield* sell('boots', 8, 5, () => {
      st.player.body.feet.boots = false;
    });
  if (st.player.body.torso.leather && st.player.body.torso.coolLeather)
    yield* sell('leather', 13, 8, () => {
      st.player.body.torso.leather = false;
    });
  if (
    st.player.body.hands.weapons.knuckles &&
    (st.player.body.hands.weapons.club ||
      st.player.body.hands.weapons.knife ||
      st.player.body.hands.weapons.cleaver)
  )
    yield* sell('knuckles', 13, 8, () => {
      st.player.body.hands.weapons.knuckles = false;
    });
  if (
    st.player.body.hands.weapons.club &&
    (st.player.body.hands.weapons.knife || st.player.body.hands.weapons.cleaver)
  )
    yield* sell('club', 25, 15, () => {
      st.player.body.hands.weapons.club = false;
    });
  if (st.player.body.hands.weapons.knife && st.player.body.hands.weapons.cleaver)
    yield* sell('knife', 38, 23, () => {
      st.player.body.hands.weapons.knife = false;
    });
  if (sold === 255) yield* emit({ type: 'dealersNothingSpare' });
});
