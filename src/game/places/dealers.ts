/** 0000:C4B4 — `bmar`: the dealers. */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { attr, inc } from '../../state/attributes';
import { outclassed } from '../../state/items';
import { i16, mod, u8 } from '../../tp/num';
import { CMD, promptCommand, readAnswer } from '../commands';
import { print, println, rnd, started } from '../prelude';
import type { Text } from '../text';
import { PLACES } from '../texts';
import { offer, offerShowing } from './shop';

/** 0000:C4B4 — `bmar` */
export const dealers = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.dealers) return yield* println(PLACES.tudaLyubogoDebilaS());
  yield* println(PLACES.tyPrishelKBarygam());
  yield* println(PLACES.zdesMozhnoTolknutHlam());
  yield* println(PLACES.escheTyMozheshProdat());
  yield* offer(1, PRICE.joint, PLACES.rubKosyak());
  yield* offer(2, PRICE.phone, PLACES.rubKradenyyMobilnikPodmoga());
  yield* offer(3, PRICE.superJoint, PLACES.rubOfigennyyKosyakOchko());
  yield* offer(4, PRICE.tattoo, PLACES.rubSdelatTipaZonovskuyu());
  if (st.world.district > 1) yield* offer(5, PRICE.knuckles, PLACES.rubKastetUron2());
  if (st.world.district > 2) yield* offer(6, PRICE.club, PLACES.rubDubinkaUron4());
  if (st.world.district > 3)
    yield* offer(7, PRICE.pistol, PLACES.rubSamopalnyyPistoletMozhno(20, 30));
  if (st.world.district > 3) yield* offer(8, PRICE.bullets, PLACES.rubPatrony6());
  // sic: colour by the silencer price, but the bullets price is shown
  if (st.world.district > 3 && st.player.body.pockets.pistol && st.world.dealerCalls === 25)
    yield* offerShowing(9, PRICE.silencer, PRICE.bullets, PLACES.rubGlushitel());
  for (;;) {
    const command = yield* promptCommand('dealers');
    if (command === CMD.dealers.joint) {
      if (PRICE.joint > st.player.resources.money) yield* println(PLACES.chertBabokNeHvataet());
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.joint);
        st.player.resources.joints = i16(st.player.resources.joints + 1);
        yield* println(PLACES.tyKupilKosyak());
      }
    }
    if (command === CMD.dealers.phone) {
      if (st.player.body.pockets.phone) yield* println(PLACES.uTebyaUzheEst3());
      else if (PRICE.phone > st.player.resources.money) yield* println(PLACES.netuDeneg());
      else {
        st.player.body.pockets.phone = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.phone);
        yield* println(PLACES.cheTyModnyyTipa());
      }
    }
    if (command === CMD.dealers.superJoint) {
      if (PRICE.superJoint > st.player.resources.money) yield* println(PLACES.neHvataet());
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.superJoint);
        yield* println(PLACES.poshliSteroidy());
        const r = yield* rnd(4);
        if (r === 0) {
          inc(st.player, 'strength', 1);
          yield* println(PLACES.sila1());
          inc(st.player, 'damageMax', 1);
          if (mod(attr(st.player, 'strength'), 2) === 0) inc(st.player, 'damageMin', 1);
          inc(st.player, 'healthMax', 1);
          st.player.health.current = i16(st.player.health.current + 1);
        } else if (r === 1) {
          inc(st.player, 'agility', 1);
          yield* println(PLACES.lovkost1());
        } else if (r === 2) {
          inc(st.player, 'vitality', 1);
          yield* println(PLACES.zhivuchest1());
          inc(st.player, 'healthMax', 5);
          st.player.health.current = i16(st.player.health.current + 5);
        } else if (r === 3) {
          inc(st.player, 'luck', 1);
          yield* println(PLACES.udacha1());
        }
      }
    }
    if (command === CMD.dealers.tattoo) {
      if (st.player.body.skin.tattoo) yield* println(PLACES.sdelatKonechnoMozhnoNo());
      else if (PRICE.tattoo > st.player.resources.money) yield* println(PLACES.netuDeneg());
      else {
        st.player.body.skin.tattoo = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.tattoo);
        yield* println(PLACES.chistyyZek());
      }
    }
    if (command === CMD.dealers.knuckles) {
      if (outclassed(st.player.body.hands.weapons, 'knuckles'))
        yield* println(PLACES.nafigTebeOnNuzhen());
      else if (st.player.body.hands.weapons.knuckles) yield* println(PLACES.uTebyaEstEta());
      else if (PRICE.knuckles > st.player.resources.money)
        yield* println(PLACES.neHvataetDenzhat());
      else {
        st.player.body.hands.weapons.knuckles = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.knuckles);
        yield* println(PLACES.tyKupilKastetSmotri());
      }
    }
    if (command === CMD.dealers.club) {
      if (outclassed(st.player.body.hands.weapons, 'club'))
        yield* println(PLACES.daNafigOnaNuzhna());
      else if (st.player.body.hands.weapons.club) yield* println(PLACES.uTebyaEstDubina());
      else if (PRICE.club > st.player.resources.money) yield* println(PLACES.neHvataetNaDubinku());
      else {
        st.player.body.hands.weapons.club = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.club);
        yield* println(PLACES.tyKupilDubinkuPohozhe());
      }
    }
    if (command === CMD.dealers.pistol) {
      if (st.player.body.pockets.pistol) yield* println(PLACES.nuTyVascheOfigel());
      else if (PRICE.pistol > st.player.resources.money) yield* println(PLACES.dorogayaShtuka());
      else {
        st.player.body.pockets.pistol = { silencer: false, bullets: 3 };
        st.player.resources.money = i16(st.player.resources.money - PRICE.pistol);
        yield* println(PLACES.spasaysyaKtoMozhet());
        yield* println(PLACES.tolkoPomniStrelyayV());
      }
    }
    if (command === CMD.dealers.bullets) {
      if (!st.player.body.pockets.pistol) yield* println(PLACES.netuPushkiSnachalaKupi());
      else if (PRICE.bullets > st.player.resources.money) yield* println(PLACES.nehvatkaDeneg());
      else {
        st.player.body.pockets.pistol.bullets = i16(st.player.body.pockets.pistol.bullets + 5);
        st.player.resources.money = i16(st.player.resources.money - PRICE.bullets);
        yield* println(PLACES.poluchiPyatPulNa());
      }
    }
    if (
      command === CMD.dealers.silencer &&
      st.player.body.pockets.pistol &&
      st.world.dealerCalls === 25
    ) {
      if (st.player.body.pockets.pistol.silencer) yield* println(PLACES.daKupilUzheKupil());
      else if (PRICE.silencer > st.player.resources.money) yield* println(PLACES.podkopiBabla());
      else {
        st.player.body.pockets.pistol.silencer = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.silencer);
        yield* println(PLACES.teperStrelyayGdeHochesh());
      }
    }
    if (command === CMD.dealers.sellJunk) {
      if (st.player.resources.junk > 0) {
        st.player.resources.money = i16(st.player.resources.money + st.player.resources.junk);
        st.player.resources.junk = 0;
        yield* println(PLACES.barygiDaliTebeDeneg());
      } else yield* println(PLACES.tebeNechegoSpihnut());
    }
    if (command === CMD.dealers.sellSpareThings) yield* sellStuff;
    if (command === CMD.dealers.leave) break;
  }
});

const sellStuff = Effect.gen(function* () {
  const st = yield* started;
  /** price of the last offer as a signed byte; 255 = nothing to sell */
  let sold = 255;
  const sell = (
    question: Text,
    base: number,
    spread: number,
    done: (price: number) => Text,
    drop: () => void
  ) =>
    Effect.gen(function* () {
      yield* println(question);
      yield* print(PLACES.prodatVeschi());
      const answer = yield* readAnswer;
      sold = u8((yield* rnd(spread)) + base);
      if (answer !== CMD.answer.yes) return;
      drop();
      st.player.resources.money = i16(st.player.resources.money + ((sold << 24) >> 24));
      yield* println(done((sold << 24) >> 24));
    });
  if (st.player.body.torso.abibas && st.player.body.torso.adidas)
    yield* sell(PLACES.uTebyaEstNenuzhnyy(), 8, 5, PLACES.tyProdalKostyumZa, () => {
      st.player.body.torso.abibas = false;
    });
  if (st.player.body.feet.boots && st.player.body.feet.coolBoots)
    yield* sell(PLACES.uTebyaEstNenuzhnye(), 8, 5, PLACES.tyProdalKrossovkiZa, () => {
      st.player.body.feet.boots = false;
    });
  if (st.player.body.torso.leather && st.player.body.torso.coolLeather)
    yield* sell(PLACES.uTebyaEstNenuzhnaya(), 13, 8, PLACES.tyProdalKozhankuZa, () => {
      st.player.body.torso.leather = false;
    });
  if (
    st.player.body.hands.weapons.knuckles &&
    (st.player.body.hands.weapons.club ||
      st.player.body.hands.weapons.knife ||
      st.player.body.hands.weapons.cleaver)
  )
    yield* sell(PLACES.uTebyaEstKastet(), 13, 8, PLACES.tyProdalKastetZa, () => {
      st.player.body.hands.weapons.knuckles = false;
    });
  if (
    st.player.body.hands.weapons.club &&
    (st.player.body.hands.weapons.knife || st.player.body.hands.weapons.cleaver)
  )
    yield* sell(PLACES.uTebyaEstDubinka(), 25, 15, PLACES.tyProdalDubinkuZa, () => {
      st.player.body.hands.weapons.club = false;
    });
  if (st.player.body.hands.weapons.knife && st.player.body.hands.weapons.cleaver)
    yield* sell(PLACES.uTebyaEstNozhik(), 38, 23, PLACES.tyProdalNozhikZa, () => {
      st.player.body.hands.weapons.knife = false;
    });
  if (sold === 255) yield* println(PLACES.uTebyaNetNeuzhnyh());
});
