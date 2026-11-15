/** What the player sees of the dealers (`dealers.ts`). */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { print, println, started } from '../prelude';
import type { Text } from '../text';
import { PLACES } from '../texts';
import type { View } from '../view';
import { offer, offerShowing } from './shop';

/** what the dealers sell */
export type DealersGoods =
  | 'joint'
  | 'phone'
  | 'superJoint'
  | 'tattoo'
  | 'knuckles'
  | 'club'
  | 'pistol'
  | 'bullets'
  | 'silencer';

/** why the dealers won't sell */
export type DealersRefusal =
  | 'money'
  | 'owned'
  /** a better weapon is in hand */
  | 'ownedBetter'
  /** bullets without a pistol */
  | 'noPistol';

/** a spare thing the dealers buy */
export type SpareThing = 'abibas' | 'boots' | 'leather' | 'knuckles' | 'club' | 'knife';

/** what the steroids raised */
export type SteroidsStat = 'strength' | 'agility' | 'vitality' | 'luck';

export type DealersEvent =
  /** not let in yet */
  | { readonly type: 'dealersUnknown' }
  | { readonly type: 'enteredDealers' }
  | { readonly type: 'dealersBought'; readonly goods: DealersGoods }
  | {
      readonly type: 'dealersRefused';
      readonly goods: DealersGoods;
      readonly because: DealersRefusal;
    }
  /** the super joint did its work */
  | { readonly type: 'dealersSteroids'; readonly stat: SteroidsStat }
  | { readonly type: 'dealersSoldJunk' }
  | { readonly type: 'dealersNoJunk' }
  /** a spare thing is offered for sale, a yes/no answer follows */
  | { readonly type: 'dealersSellAsked'; readonly thing: SpareThing }
  | { readonly type: 'dealersSold'; readonly thing: SpareThing; readonly price: number }
  | { readonly type: 'dealersNothingSpare' };

/** the dealers as the player sees them */
export const dealersView: View<DealersEvent> = {
  events: {
    dealersUnknown: true,
    enteredDealers: true,
    dealersBought: true,
    dealersRefused: true,
    dealersSteroids: true,
    dealersSoldJunk: true,
    dealersNoJunk: true,
    dealersSellAsked: true,
    dealersSold: true,
    dealersNothingSpare: true,
  },
  show: (event) => showDealers(event),
};

function showDealers(event: DealersEvent) {
  return Effect.gen(function* () {
    switch (event.type) {
      case 'dealersUnknown':
        return yield* println(PLACES.tudaLyubogoDebilaS());
      case 'enteredDealers':
        return yield* entrance;
      case 'dealersBought':
        for (const line of BOUGHT[event.goods]) yield* println(line);
        return;
      case 'dealersRefused':
        return yield* println(REFUSED[event.goods][event.because]!);
      case 'dealersSteroids':
        return yield* println(STEROIDS[event.stat]);
      case 'dealersSoldJunk':
        return yield* println(PLACES.barygiDaliTebeDeneg());
      case 'dealersNoJunk':
        return yield* println(PLACES.tebeNechegoSpihnut());
      case 'dealersSellAsked':
        yield* println(SPARE[event.thing].question);
        return yield* print(PLACES.prodatVeschi());
      case 'dealersSold':
        return yield* println(SPARE[event.thing].sold(event.price));
      case 'dealersNothingSpare':
        return yield* println(PLACES.uTebyaNetNeuzhnyh());
    }
  });
}

/** the greeting and what is offered in this district */
const entrance = Effect.gen(function* () {
  const st = yield* started;
  const district = st.world.district;
  yield* println(PLACES.tyPrishelKBarygam());
  yield* println(PLACES.zdesMozhnoTolknutHlam());
  yield* println(PLACES.escheTyMozheshProdat());
  yield* offer(1, PRICE.joint, PLACES.rubKosyak());
  yield* offer(2, PRICE.phone, PLACES.rubKradenyyMobilnikPodmoga());
  yield* offer(3, PRICE.superJoint, PLACES.rubOfigennyyKosyakOchko());
  yield* offer(4, PRICE.tattoo, PLACES.rubSdelatTipaZonovskuyu());
  if (district > 1) yield* offer(5, PRICE.knuckles, PLACES.rubKastetUron2());
  if (district > 2) yield* offer(6, PRICE.club, PLACES.rubDubinkaUron4());
  if (district > 3) yield* offer(7, PRICE.pistol, PLACES.rubSamopalnyyPistoletMozhno(20, 30));
  if (district > 3) yield* offer(8, PRICE.bullets, PLACES.rubPatrony6());
  // sic: colour by the silencer price, but the bullets price is shown
  if (district > 3 && st.player.body.pockets.pistol && st.world.dealerCalls === 25)
    yield* offerShowing(9, PRICE.silencer, PRICE.bullets, PLACES.rubGlushitel());
});

const BOUGHT: Record<DealersGoods, readonly Text[]> = {
  joint: [PLACES.tyKupilKosyak()],
  phone: [PLACES.cheTyModnyyTipa()],
  superJoint: [PLACES.poshliSteroidy()],
  tattoo: [PLACES.chistyyZek()],
  knuckles: [PLACES.tyKupilKastetSmotri()],
  club: [PLACES.tyKupilDubinkuPohozhe()],
  pistol: [PLACES.spasaysyaKtoMozhet(), PLACES.tolkoPomniStrelyayV()],
  bullets: [PLACES.poluchiPyatPulNa()],
  silencer: [PLACES.teperStrelyayGdeHochesh()],
};

const REFUSED: Record<DealersGoods, Partial<Record<DealersRefusal, Text>>> = {
  joint: { money: PLACES.chertBabokNeHvataet() },
  phone: { owned: PLACES.uTebyaUzheEst3(), money: PLACES.netuDeneg() },
  superJoint: { money: PLACES.neHvataet() },
  tattoo: { owned: PLACES.sdelatKonechnoMozhnoNo(), money: PLACES.netuDeneg() },
  knuckles: {
    ownedBetter: PLACES.nafigTebeOnNuzhen(),
    owned: PLACES.uTebyaEstEta(),
    money: PLACES.neHvataetDenzhat(),
  },
  club: {
    ownedBetter: PLACES.daNafigOnaNuzhna(),
    owned: PLACES.uTebyaEstDubina(),
    money: PLACES.neHvataetNaDubinku(),
  },
  pistol: { owned: PLACES.nuTyVascheOfigel(), money: PLACES.dorogayaShtuka() },
  bullets: { noPistol: PLACES.netuPushkiSnachalaKupi(), money: PLACES.nehvatkaDeneg() },
  silencer: { owned: PLACES.daKupilUzheKupil(), money: PLACES.podkopiBabla() },
};

const STEROIDS: Record<SteroidsStat, Text> = {
  strength: PLACES.sila1(),
  agility: PLACES.lovkost1(),
  vitality: PLACES.zhivuchest1(),
  luck: PLACES.udacha1(),
};

const SPARE: Record<SpareThing, { question: Text; sold: (price: number) => Text }> = {
  abibas: { question: PLACES.uTebyaEstNenuzhnyy(), sold: PLACES.tyProdalKostyumZa },
  boots: { question: PLACES.uTebyaEstNenuzhnye(), sold: PLACES.tyProdalKrossovkiZa },
  leather: { question: PLACES.uTebyaEstNenuzhnaya(), sold: PLACES.tyProdalKozhankuZa },
  knuckles: { question: PLACES.uTebyaEstKastet(), sold: PLACES.tyProdalKastetZa },
  club: { question: PLACES.uTebyaEstDubinka(), sold: PLACES.tyProdalDubinkuZa },
  knife: { question: PLACES.uTebyaEstNozhik(), sold: PLACES.tyProdalNozhikZa },
};
