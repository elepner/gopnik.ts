/** 0000:B940 — `mar`: the market. */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { attr } from '../../state/attributes';
import { i16 } from '../../tp/num';
import { settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp } from '../hero';
import { luckAtLeast, rnd, started } from '../prelude';
import type { MarketGoods, MarketRefusal } from './market-view';

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
    if (command === CMD.market.hotdog) {
      if (st.player.injuries.jaw) yield* refuse('hotdog', 'jaw');
      else if (st.player.health.current < attr(st.player, 'healthMax')) {
        if (PRICE.hotdog > st.player.resources.money) yield* refuse('hotdog', 'money');
        else {
          st.player.resources.money = i16(st.player.resources.money - PRICE.hotdog);
          st.player.health.current = i16(st.player.health.current + ((yield* rnd(2)) + 3));
          if (st.player.health.current > attr(st.player, 'healthMax'))
            st.player.health.current = attr(st.player, 'healthMax');
          yield* emit({ type: 'marketBought', goods: 'hotdog' });
        }
      } else yield* refuse('hotdog', 'notHungry');
    }
    if (command === CMD.market.beer) {
      if (PRICE.beer > st.player.resources.money) yield* refuse('beer', 'money');
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.beer);
        yield* emit({ type: 'marketBeerBought', line: yield* rnd(3) });
        st.player.resources.beer = i16(st.player.resources.beer + 1);
      }
    }
    if (command === CMD.market.glasses) {
      if (st.player.body.eyes.glasses) yield* refuse('glasses', 'owned');
      else if (PRICE.glasses > st.player.resources.money) yield* refuse('glasses', 'money');
      else {
        st.player.body.eyes.glasses = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.glasses);
        yield* emit({ type: 'marketBought', goods: 'glasses' });
      }
    }
    if (command === CMD.market.abibas) {
      if (st.player.body.torso.adidas) yield* refuse('abibas', 'ownedBetter');
      else if (st.player.body.torso.abibas) yield* refuse('abibas', 'owned');
      else if (PRICE.abibas > st.player.resources.money) yield* refuse('abibas', 'money');
      else {
        st.player.body.torso.abibas = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.abibas);
        yield* emit({ type: 'marketBought', goods: 'abibas' });
      }
    }
    if (command === CMD.market.boots) {
      if (st.player.body.feet.coolBoots) yield* refuse('boots', 'ownedBetter');
      else if (st.player.body.feet.boots) yield* refuse('boots', 'owned');
      else if (PRICE.boots > st.player.resources.money) yield* refuse('boots', 'money');
      else {
        st.player.body.feet.boots = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.boots);
        yield* emit({ type: 'marketBought', goods: 'boots' });
      }
    }
    if (st.world.district > 1 && command === CMD.market.leather) {
      if (st.player.body.torso.coolLeather) yield* refuse('leather', 'ownedBetter');
      else if (st.player.body.torso.leather) yield* refuse('leather', 'owned');
      else if (PRICE.leather > st.player.resources.money) yield* refuse('leather', 'money');
      else {
        st.player.body.torso.leather = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.leather);
        yield* emit({ type: 'marketBought', goods: 'leather' });
      }
    }
    // sic: no district check for the adidas suit
    if (command === CMD.market.adidas) {
      if (st.player.body.torso.adidas) yield* refuse('adidas', 'owned');
      else if (PRICE.adidas > st.player.resources.money) yield* refuse('adidas', 'money');
      else {
        st.player.body.torso.adidas = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.adidas);
        yield* emit({ type: 'marketBought', goods: 'adidas' });
      }
    }
    if (st.world.district > 2 && command === CMD.market.coolBoots) {
      if (st.player.body.feet.coolBoots) yield* refuse('coolBoots', 'owned');
      else if (PRICE.boots2 > st.player.resources.money) yield* refuse('coolBoots', 'money');
      else {
        st.player.body.feet.coolBoots = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.boots2);
        yield* emit({ type: 'marketBought', goods: 'coolBoots' });
      }
    }
    if (st.world.district > 3 && command === CMD.market.coolLeather) {
      if (st.player.body.torso.coolLeather) yield* refuse('coolLeather', 'owned');
      else if (PRICE.leather2 > st.player.resources.money) yield* refuse('coolLeather', 'money');
      else {
        st.player.body.torso.coolLeather = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.leather2);
        yield* emit({ type: 'marketBought', goods: 'coolLeather' });
      }
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
    const found = i16((yield* rnd(attr(st.player, 'luck') * 2)) + 1);
    st.player.resources.money = i16(st.player.resources.money + found);
    yield* emit({ type: 'marketStole', money: found });
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
  yield* emit({ type: 'marketCopsAlerted' });
  st.world.heat.market = 5;
  return true;
});
