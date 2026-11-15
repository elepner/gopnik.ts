/** 0000:B940 — `mar`: the market. */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { attr, dec, inc, set } from '../../state/attributes';
import { put } from '../../state/items';
import type { Game } from '../../state/state';
import { i16 } from '../../tp/num';
import { settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit, reporter } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp } from '../hero';
import { luckAtLeast, rnd, started } from '../prelude';
import type { MarketClothes, MarketEvent, MarketGoods, MarketRefusal } from './market-view';

const report = reporter(apply);

const buy = (goods: MarketClothes) => report({ type: 'marketBought', goods });

const refuse = (goods: MarketGoods, because: MarketRefusal) =>
  emit({ type: 'marketRefused', goods, because });

/** 0000:B940 — `mar` */
export const market = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.market) return yield* emit({ type: 'marketUnknown' });
  if (st.world.heat.market !== 0) return yield* emit({ type: 'marketWatched' });
  yield* emit({ type: 'enteredMarket' });
  for (;;) {
    const command = yield* promptCommand('market');
    const money = st.player.resources.money;
    const { eyes, torso, feet } = st.player.body;
    if (command === CMD.market.hotdog) {
      if (st.player.injuries.jaw) yield* refuse('hotdog', 'jaw');
      else if (st.player.health.current < attr(st.player, 'healthMax')) {
        if (PRICE.hotdog > money) yield* refuse('hotdog', 'money');
        else yield* report({ type: 'marketAteHotdog', health: (yield* rnd(2)) + 3 });
      } else yield* refuse('hotdog', 'notHungry');
    }
    if (command === CMD.market.beer) {
      if (PRICE.beer > money) yield* refuse('beer', 'money');
      else yield* report({ type: 'marketBeerBought', line: yield* rnd(3) });
    }
    if (command === CMD.market.glasses) {
      if (eyes.glasses) yield* refuse('glasses', 'owned');
      else if (PRICE.glasses > money) yield* refuse('glasses', 'money');
      else yield* buy('glasses');
    }
    if (command === CMD.market.abibas) {
      if (torso.adidas) yield* refuse('abibas', 'ownedBetter');
      else if (torso.abibas) yield* refuse('abibas', 'owned');
      else if (PRICE.abibas > money) yield* refuse('abibas', 'money');
      else yield* buy('abibas');
    }
    if (command === CMD.market.boots) {
      if (feet.coolBoots) yield* refuse('boots', 'ownedBetter');
      else if (feet.boots) yield* refuse('boots', 'owned');
      else if (PRICE.boots > money) yield* refuse('boots', 'money');
      else yield* buy('boots');
    }
    if (command === CMD.market.leather) {
      // not in the original: it said nothing about goods of a higher district
      if (st.world.district <= 1) yield* refuse('leather', 'notHere');
      else if (torso.coolLeather) yield* refuse('leather', 'ownedBetter');
      else if (torso.leather) yield* refuse('leather', 'owned');
      else if (PRICE.leather > money) yield* refuse('leather', 'money');
      else yield* buy('leather');
    }
    // sic: no district check for the adidas suit
    if (command === CMD.market.adidas) {
      if (torso.adidas) yield* refuse('adidas', 'owned');
      else if (PRICE.adidas > money) yield* refuse('adidas', 'money');
      else yield* buy('adidas');
    }
    if (command === CMD.market.coolBoots) {
      if (st.world.district <= 2) yield* refuse('coolBoots', 'notHere');
      else if (feet.coolBoots) yield* refuse('coolBoots', 'owned');
      else if (PRICE.boots2 > money) yield* refuse('coolBoots', 'money');
      else yield* buy('coolBoots');
    }
    if (command === CMD.market.coolLeather) {
      if (st.world.district <= 3) yield* refuse('coolLeather', 'notHere');
      else if (torso.coolLeather) yield* refuse('coolLeather', 'owned');
      else if (PRICE.leather2 > money) yield* refuse('coolLeather', 'money');
      else yield* buy('coolLeather');
    }
    // a caught thief has to run
    if (command === CMD.market.steal && (yield* pickpocket)) break;
    if (command === CMD.market.leave) break;
  }
});

/** `t`: steal at the market; true when the hero was caught (he has to run) */
const pickpocket = Effect.gen(function* () {
  const st = yield* started;
  if ((yield* luckAtLeast(st.world.district * 5 + 5)) && (yield* rnd(10)) < 9) {
    const money = i16((yield* rnd(attr(st.player, 'luck') * 2)) + 1);
    yield* report({ type: 'marketStole', money });
    yield* gainExp(st.world.district * 2);
    return false;
  }
  yield* encounter(
    spawnEnemy(1),
    Effect.gen(function* () {
      yield* emit({ type: 'marketCaughtStealing' });
      yield* emit({ type: 'greeting', by: 'caughtStealing' });
      yield* settle(yield* fight(STREET_FIGHT));
    })
  );
  yield* report({ type: 'marketCopsAlerted' });
  return true;
});

/** what happens at the market goes into the state */
function apply(st: Game, event: MarketEvent) {
  const p = st.player;
  switch (event.type) {
    case 'marketAteHotdog':
      dec(p, 'money', PRICE.hotdog);
      inc(p, 'health', event.health);
      if (p.health.current > attr(p, 'healthMax')) set(p, 'health', attr(p, 'healthMax'));
      return;
    case 'marketBeerBought':
      dec(p, 'money', PRICE.beer);
      return inc(p, 'beer', 1);
    case 'marketBought':
      dec(p, 'money', CLOTHES_PRICE[event.goods]);
      return put(p.body, event.goods);
    case 'marketStole':
      return inc(p, 'money', event.money);
    case 'marketCopsAlerted':
      st.world.heat.market = 5;
      return;
  }
}

/** what each piece of clothing costs */
const CLOTHES_PRICE: Record<MarketClothes, number> = {
  glasses: PRICE.glasses,
  abibas: PRICE.abibas,
  boots: PRICE.boots,
  leather: PRICE.leather,
  adidas: PRICE.adidas,
  coolBoots: PRICE.boots2,
  coolLeather: PRICE.leather2,
};
