/** 0000:C4B4 — `bmar`: the dealers. */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { attr, dec, inc, set } from '../../state/attributes';
import { drop, outclassed, put } from '../../state/items';
import type { Game, Player } from '../../state/state';
import { i16, mod, u8 } from '../../tp/num';
import { CMD, promptCommand, readAnswer } from '../commands';
import { emit, reporter } from '../events';
import { rnd, started } from '../prelude';
import type {
  DealersEvent,
  DealersGoods,
  DealersRefusal,
  SpareThing,
  SteroidsStat,
} from './dealers-view';

const report = reporter(apply);

const buy = (goods: DealersGoods) => report({ type: 'dealersBought', goods });

const refuse = (goods: DealersGoods, because: DealersRefusal) =>
  emit({ type: 'dealersRefused', goods, because });

/** 0000:C4B4 — `bmar` */
export const dealers = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.dealers) return yield* emit({ type: 'dealersUnknown' });
  yield* emit({ type: 'enteredDealers' });
  for (;;) {
    const command = yield* promptCommand('dealers');
    const money = st.player.resources.money;
    const pistol = st.player.body.pockets.pistol;
    const weapons = st.player.body.hands.weapons;
    if (command === CMD.dealers.joint) {
      if (PRICE.joint > money) yield* refuse('joint', 'money');
      else yield* buy('joint');
    }
    if (command === CMD.dealers.phone) {
      if (st.player.body.pockets.phone) yield* refuse('phone', 'owned');
      else if (PRICE.phone > money) yield* refuse('phone', 'money');
      else yield* buy('phone');
    }
    if (command === CMD.dealers.superJoint) {
      if (PRICE.superJoint > money) yield* refuse('superJoint', 'money');
      else {
        yield* buy('superJoint');
        yield* report({ type: 'dealersSteroids', stat: STEROIDS[yield* rnd(4)]! });
      }
    }
    if (command === CMD.dealers.tattoo) {
      if (st.player.body.skin.tattoo) yield* refuse('tattoo', 'owned');
      else if (PRICE.tattoo > money) yield* refuse('tattoo', 'money');
      else yield* buy('tattoo');
    }
    if (command === CMD.dealers.knuckles) {
      if (outclassed(weapons, 'knuckles')) yield* refuse('knuckles', 'ownedBetter');
      else if (weapons.knuckles) yield* refuse('knuckles', 'owned');
      else if (PRICE.knuckles > money) yield* refuse('knuckles', 'money');
      else yield* buy('knuckles');
    }
    if (command === CMD.dealers.club) {
      if (outclassed(weapons, 'club')) yield* refuse('club', 'ownedBetter');
      else if (weapons.club) yield* refuse('club', 'owned');
      else if (PRICE.club > money) yield* refuse('club', 'money');
      else yield* buy('club');
    }
    if (command === CMD.dealers.pistol) {
      if (pistol) yield* refuse('pistol', 'owned');
      else if (PRICE.pistol > money) yield* refuse('pistol', 'money');
      else yield* buy('pistol');
    }
    if (command === CMD.dealers.bullets) {
      if (!pistol) yield* refuse('bullets', 'noPistol');
      else if (PRICE.bullets > money) yield* refuse('bullets', 'money');
      else yield* buy('bullets');
    }
    if (command === CMD.dealers.silencer && pistol && st.world.dealerCalls === 25) {
      if (pistol.silencer) yield* refuse('silencer', 'owned');
      else if (PRICE.silencer > money) yield* refuse('silencer', 'money');
      else yield* buy('silencer');
    }
    if (command === CMD.dealers.sellJunk) {
      if (st.player.resources.junk > 0) yield* report({ type: 'dealersSoldJunk' });
      else yield* emit({ type: 'dealersNoJunk' });
    }
    if (command === CMD.dealers.sellSpareThings) yield* sellStuff;
    if (command === CMD.dealers.leave) break;
  }
});

/** what the super joint raises, by its roll */
const STEROIDS: readonly SteroidsStat[] = ['strength', 'agility', 'vitality', 'luck'];

const sellStuff = Effect.gen(function* () {
  const st = yield* started;
  /** price of the last offer as a signed byte; 255 = nothing to sell */
  let sold = 255;
  const sell = (thing: SpareThing, base: number, spread: number) =>
    Effect.gen(function* () {
      yield* emit({ type: 'dealersSellAsked', thing });
      const answer = yield* readAnswer;
      sold = u8((yield* rnd(spread)) + base);
      if (answer === CMD.answer.yes)
        yield* report({ type: 'dealersSold', thing, price: (sold << 24) >> 24 });
    });
  if (st.player.body.torso.abibas && st.player.body.torso.adidas) yield* sell('abibas', 8, 5);
  if (st.player.body.feet.boots && st.player.body.feet.coolBoots) yield* sell('boots', 8, 5);
  if (st.player.body.torso.leather && st.player.body.torso.coolLeather)
    yield* sell('leather', 13, 8);
  if (
    st.player.body.hands.weapons.knuckles &&
    (st.player.body.hands.weapons.club ||
      st.player.body.hands.weapons.knife ||
      st.player.body.hands.weapons.cleaver)
  )
    yield* sell('knuckles', 13, 8);
  if (
    st.player.body.hands.weapons.club &&
    (st.player.body.hands.weapons.knife || st.player.body.hands.weapons.cleaver)
  )
    yield* sell('club', 25, 15);
  if (st.player.body.hands.weapons.knife && st.player.body.hands.weapons.cleaver)
    yield* sell('knife', 38, 23);
  if (sold === 255) yield* emit({ type: 'dealersNothingSpare' });
});

/** what happens at the dealers goes into the state */
function apply(st: Game, event: DealersEvent) {
  const p = st.player;
  switch (event.type) {
    case 'dealersBought':
      dec(p, 'money', PRICE[event.goods]);
      return GOODS[event.goods](p);
    case 'dealersSteroids':
      return steroids(p, event.stat);
    case 'dealersSoldJunk':
      inc(p, 'money', p.resources.junk);
      return set(p, 'junk', 0);
    case 'dealersSold':
      drop(p.body, event.thing);
      return inc(p, 'money', event.price);
  }
}

/** what each purchase puts on the hero */
const GOODS: Record<DealersGoods, (p: Player) => void> = {
  joint: (p) => inc(p, 'joints', 1),
  phone: (p) => put(p.body, 'phone'),
  superJoint: () => {},
  tattoo: (p) => {
    p.body.skin.tattoo = true;
  },
  knuckles: (p) => put(p.body, 'knuckles'),
  club: (p) => put(p.body, 'club'),
  pistol: (p) => {
    p.body.pockets.pistol = { silencer: false, bullets: 3 };
  },
  bullets: (p) => {
    const pistol = p.body.pockets.pistol!;
    pistol.bullets = i16(pistol.bullets + 5);
  },
  silencer: (p) => {
    p.body.pockets.pistol!.silencer = true;
  },
};

/** strength also hits harder and adds health, vitality adds health */
function steroids(p: Player, stat: SteroidsStat) {
  inc(p, stat, 1);
  if (stat === 'strength') {
    inc(p, 'damageMax', 1);
    if (mod(attr(p, 'strength'), 2) === 0) inc(p, 'damageMin', 1);
    inc(p, 'healthMax', 1);
    inc(p, 'health', 1);
  }
  if (stat === 'vitality') {
    inc(p, 'healthMax', 5);
    inc(p, 'health', 5);
  }
}
