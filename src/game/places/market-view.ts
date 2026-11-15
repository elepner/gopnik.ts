/** What the player sees of the market (`market.ts`). */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { typeName } from '../../state/names';
import { battle } from '../../state/state';
import { println, started } from '../prelude';
import type { Text } from '../text';
import { PLACES } from '../texts';
import type { View } from '../view';
import { offer } from './shop';

/** what the market sells */
export type MarketGoods =
  | 'hotdog'
  | 'beer'
  | 'glasses'
  | 'abibas'
  | 'boots'
  | 'leather'
  | 'adidas'
  | 'coolBoots'
  | 'coolLeather';

/** why the market won't sell */
export type MarketRefusal =
  /** a broken jaw can't eat */
  | 'jaw'
  /** healthy, no appetite */
  | 'notHungry'
  | 'money'
  | 'owned'
  /** something better is in the slot */
  | 'ownedBetter';

export type MarketEvent =
  /** the market isn't known yet */
  | { readonly type: 'marketUnknown' }
  /** the cops still watch the market */
  | { readonly type: 'marketWatched' }
  | { readonly type: 'enteredMarket' }
  | { readonly type: 'marketBought'; readonly goods: Exclude<MarketGoods, 'beer'> }
  /** a beer; `line`: the roll that picked what is said */
  | { readonly type: 'marketBeerBought'; readonly line: number }
  | { readonly type: 'marketRefused'; readonly goods: MarketGoods; readonly because: MarketRefusal }
  /** a pocket picked */
  | { readonly type: 'marketStole'; readonly money: number }
  /** caught stealing: the enemy of the battle steps in */
  | { readonly type: 'marketCaughtStealing' }
  /** the thief runs from the cops */
  | { readonly type: 'marketCopsAlerted' };

/** the market as the player sees it */
export const marketView: View<MarketEvent> = {
  events: {
    marketUnknown: true,
    marketWatched: true,
    enteredMarket: true,
    marketBought: true,
    marketBeerBought: true,
    marketRefused: true,
    marketStole: true,
    marketCaughtStealing: true,
    marketCopsAlerted: true,
  },
  show: (event) => showMarket(event),
};

function showMarket(event: MarketEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'marketUnknown':
        return yield* println(PLACES.tyNeznaeshPokaEshe());
      case 'marketWatched':
        return yield* println(PLACES.naBazarPokaNelzya());
      case 'enteredMarket':
        return yield* entrance;
      case 'marketBought':
        return yield* println(BOUGHT[event.goods]);
      case 'marketBeerBought':
        return yield* println(BEER_LINES[event.line]!);
      case 'marketRefused':
        return yield* println(REFUSED[event.goods][event.because]!);
      case 'marketStole':
        return yield* println(PLACES.opaBabkiRubleyNa(event.money));
      case 'marketCaughtStealing': {
        const enemy = battle(st).enemy;
        yield* println(PLACES.koryavyyTyPopalsya());
        return yield* println(PLACES.etoUrovnya(typeName(enemy.type), enemy.level));
      }
      case 'marketCopsAlerted':
        return yield* println(PLACES.blinMentyZapalyatSmatyvaysya());
    }
  });
}

/** the greeting and what is offered in this district */
const entrance = Effect.gen(function* () {
  const district = (yield* started).world.district;
  yield* println(PLACES.tyPrishelNaBazar());
  yield* println(PLACES.mozhnoPotiskatZdesU());
  yield* println(PLACES.aMozhnoCheTo());
  yield* offer(1, PRICE.hotdog, PLACES.rubHotdog34());
  yield* offer(2, PRICE.beer, PLACES.rubPivoZ(5));
  yield* offer(3, PRICE.glasses, PLACES.rubZatemnennyeOchkiChtob());
  yield* offer(4, PRICE.abibas, PLACES.rubRealnyySportivnyyKostyum());
  yield* offer(5, PRICE.boots, PLACES.rubPontovyeButsyUvelichivayut());
  if (district > 1) {
    yield* offer(6, PRICE.leather, PLACES.rubRealnuyuKozhankuDopolnitelnaya());
    yield* offer(7, PRICE.adidas, PLACES.rubRealnyySportivnyyKostyum2());
  }
  if (district > 2) yield* offer(8, PRICE.boots2, PLACES.rubPontoveyshieButsyUron());
  if (district > 3) yield* offer(9, PRICE.leather2, PLACES.rubVascheKrutuyuKozhanku());
});

const BEER_LINES = [PLACES.glinskoeCheZaNafig(), PLACES.pivkoHolodnenkoe(), PLACES.nuChePoPivu()];

const BOUGHT: Record<Exclude<MarketGoods, 'beer'>, Text> = {
  hotdog: PLACES.tySozhralHotDog(),
  glasses: PLACES.modnyeTakieOchkiOt(),
  abibas: PLACES.teperTyBolshePohozh(),
  boots: PLACES.zatseniKrasovki(),
  leather: PLACES.nuVesNaPontah(),
  adidas: PLACES.chistyyGopnik(),
  coolBoots: PLACES.ofigennyeButtsy(),
  coolLeather: PLACES.nuKrutoySdohnutMozhno(),
};

const REFUSED: Record<MarketGoods, Partial<Record<MarketRefusal, Text>>> = {
  hotdog: {
    jaw: PLACES.tyNeMozheshHavat(),
    notHungry: PLACES.daNeohotaHavat(),
    money: PLACES.chertBabokDazheNa(),
  },
  beer: { money: PLACES.neHvataet() },
  glasses: { owned: PLACES.uTebyaEstOchki(), money: PLACES.neHvataetBabok() },
  abibas: {
    ownedBetter: PLACES.uTebyaEstBolee(),
    owned: PLACES.uTebyaUzheEst(),
    money: PLACES.neHvataetDeneg(),
  },
  boots: {
    ownedBetter: PLACES.uTebyaButsyPo(),
    owned: PLACES.uTebyaTakieUzhe(),
    money: PLACES.netuNaNihDeneg(),
  },
  leather: {
    ownedBetter: PLACES.utebyaEstKozhankaKruche(),
    owned: PLACES.tyUzheKupilEto(),
    money: PLACES.neDostatochnoBabla(),
  },
  adidas: { owned: PLACES.uTebyaUzheEst2(), money: PLACES.neHvataetDeneg() },
  coolBoots: { owned: PLACES.uTebyaTakieUzhe(), money: PLACES.netuNaNihDeneg() },
  coolLeather: { owned: PLACES.tyUzheKupilEto(), money: PLACES.neDostatochnoBabla() },
};
