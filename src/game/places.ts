/** Places of a district: market, dealers, vet, girlfriend, den, club, gym. */
import { Effect } from 'effect';

import { readLine, writeLn } from '../crt/crt';
import { PRICE } from '../data/tables';
import { typeName } from '../state/names';
import { i16, mod, u8 } from '../tp/num';
import { CMD } from './commands';
import { spawnEnemy } from './enemy';
import { fight } from './fight';
import { levelUp } from './hero';
import { lowerCase, luckAtLeast, print, println, rnd, started } from './prelude';
import { digitColor, type Text } from './text';
import { PLACES } from './texts';

/** 0000:B940 — `mar` */
export const market = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.market) return yield* println(PLACES.tyNeznaeshPokaEshe());
  if (st.world.heat.market !== 0) return yield* println(PLACES.naBazarPokaNelzya());
  yield* println(PLACES.tyPrishelNaBazar());
  yield* println(PLACES.mozhnoPotiskatZdesU());
  yield* println(PLACES.aMozhnoCheTo());
  yield* offer(1, PRICE.hotdog, PLACES.rubHotdog34());
  yield* offer(2, PRICE.beer, PLACES.rubPivoZ(5));
  yield* offer(3, PRICE.glasses, PLACES.rubZatemnennyeOchkiChtob());
  yield* offer(4, PRICE.abibas, PLACES.rubRealnyySportivnyyKostyum());
  yield* offer(5, PRICE.boots, PLACES.rubPontovyeButsyUvelichivayut());
  if (st.world.district > 1) {
    yield* offer(6, PRICE.leather, PLACES.rubRealnuyuKozhankuDopolnitelnaya());
    yield* offer(7, PRICE.adidas, PLACES.rubRealnyySportivnyyKostyum2());
  }
  if (st.world.district > 2) yield* offer(8, PRICE.boots2, PLACES.rubPontoveyshieButsyUron());
  if (st.world.district > 3) yield* offer(9, PRICE.leather2, PLACES.rubVascheKrutuyuKozhanku());
  do {
    yield* prompt(PLACES.bazar());
    if (st.scratch.input === CMD.market.hotdog) {
      if (st.player.injuries.jaw) yield* println(PLACES.tyNeMozheshHavat());
      else if (st.player.health.current < st.player.health.max) {
        if (PRICE.hotdog > st.player.resources.money) yield* println(PLACES.chertBabokDazheNa());
        else {
          st.player.resources.money = i16(st.player.resources.money - PRICE.hotdog);
          st.player.health.current = i16(st.player.health.current + ((yield* rnd(2)) + 3));
          if (st.player.health.current > st.player.health.max)
            st.player.health.current = st.player.health.max;
          yield* println(PLACES.tySozhralHotDog());
        }
      } else yield* println(PLACES.daNeohotaHavat());
    }
    if (st.scratch.input === CMD.market.beer) {
      if (PRICE.beer > st.player.resources.money) yield* println(PLACES.neHvataet());
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.beer);
        yield* println(BEER_LINES[yield* rnd(3)]);
        st.player.resources.beer = i16(st.player.resources.beer + 1);
      }
    }
    if (st.scratch.input === CMD.market.glasses) {
      if (st.player.body.eyes.glasses) yield* println(PLACES.uTebyaEstOchki());
      else if (PRICE.glasses > st.player.resources.money) yield* println(PLACES.neHvataetBabok());
      else {
        st.player.body.eyes.glasses = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.glasses);
        yield* println(PLACES.modnyeTakieOchkiOt());
      }
    }
    if (st.scratch.input === CMD.market.abibas) {
      if (st.player.body.torso.adidas) yield* println(PLACES.uTebyaEstBolee());
      else if (st.player.body.torso.abibas) yield* println(PLACES.uTebyaUzheEst());
      else if (PRICE.abibas > st.player.resources.money) yield* println(PLACES.neHvataetDeneg());
      else {
        st.player.body.torso.abibas = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.abibas);
        yield* println(PLACES.teperTyBolshePohozh());
        st.player.armor = u8(st.player.armor + 1);
      }
    }
    if (st.scratch.input === CMD.market.boots) {
      if (st.player.body.feet.coolBoots) yield* println(PLACES.uTebyaButsyPo());
      else if (st.player.body.feet.boots) yield* println(PLACES.uTebyaTakieUzhe());
      else if (PRICE.boots > st.player.resources.money) yield* println(PLACES.netuNaNihDeneg());
      else {
        st.player.body.feet.boots = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.boots);
        yield* println(PLACES.zatseniKrasovki());
        st.player.damage.min = i16(st.player.damage.min + 1);
        st.player.damage.max = i16(st.player.damage.max + 1);
      }
    }
    if (st.world.district > 1 && st.scratch.input === CMD.market.leather) {
      if (st.player.body.torso.coolLeather) yield* println(PLACES.utebyaEstKozhankaKruche());
      else if (st.player.body.torso.leather) yield* println(PLACES.tyUzheKupilEto());
      else if (PRICE.leather > st.player.resources.money)
        yield* println(PLACES.neDostatochnoBabla());
      else {
        st.player.body.torso.leather = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.leather);
        yield* println(PLACES.nuVesNaPontah());
        st.player.armor = u8(st.player.armor + 2);
      }
    }
    // sic: no district check for the adidas suit
    if (st.scratch.input === CMD.market.adidas) {
      if (st.player.body.torso.adidas) yield* println(PLACES.uTebyaUzheEst2());
      else if (PRICE.adidas > st.player.resources.money) yield* println(PLACES.neHvataetDeneg());
      else {
        st.player.body.torso.adidas = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.adidas);
        yield* println(PLACES.chistyyGopnik());
        st.player.armor = u8(st.player.armor + (st.player.body.torso.abibas ? 1 : 2));
      }
    }
    if (st.world.district > 2 && st.scratch.input === CMD.market.coolBoots) {
      if (st.player.body.feet.coolBoots) yield* println(PLACES.uTebyaTakieUzhe());
      else if (PRICE.boots2 > st.player.resources.money) yield* println(PLACES.netuNaNihDeneg());
      else {
        st.player.body.feet.coolBoots = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.boots2);
        yield* println(PLACES.ofigennyeButtsy());
        const bonus = st.player.body.feet.boots ? 1 : 2;
        st.player.damage.min = i16(st.player.damage.min + bonus);
        st.player.damage.max = i16(st.player.damage.max + bonus);
      }
    }
    if (st.world.district > 3 && st.scratch.input === CMD.market.coolLeather) {
      if (st.player.body.torso.coolLeather) yield* println(PLACES.tyUzheKupilEto());
      else if (PRICE.leather2 > st.player.resources.money)
        yield* println(PLACES.neDostatochnoBabla());
      else {
        st.player.body.torso.coolLeather = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.leather2);
        yield* println(PLACES.nuKrutoySdohnutMozhno());
        st.player.armor = u8(st.player.armor + (st.player.body.torso.leather ? 2 : 4));
      }
    }
    if (st.scratch.input === CMD.market.steal) yield* pickpocket;
  } while (st.scratch.input !== CMD.place.leave);
});

const BEER_LINES = [PLACES.glinskoeCheZaNafig(), PLACES.pivkoHolodnenkoe(), PLACES.nuChePoPivu()];

const pickpocket = Effect.gen(function* () {
  const st = yield* started;
  if ((yield* luckAtLeast(st.world.district * 5 + 5)) && (yield* rnd(10)) < 9) {
    st.scratch.found = i16((yield* rnd(st.player.stats.luck * 2)) + 1);
    st.player.resources.money = i16(st.player.resources.money + st.scratch.found);
    yield* println(PLACES.opaBabkiRubleyNa(st.scratch.found));
    yield* gainExp(st.world.district * 2);
    return;
  }
  yield* spawnEnemy(1);
  st.scratch.engaged = true;
  yield* println(PLACES.koryavyyTyPopalsya());
  yield* println(PLACES.etoUrovnya(typeName(st.enemy.type), st.enemy.level));
  yield* fight(1);
  yield* println(PLACES.blinMentyZapalyatSmatyvaysya());
  st.scratch.input = CMD.place.leave;
  st.world.heat.market = 5;
});

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
  do {
    yield* prompt(PLACES.barygi());
    if (st.scratch.input === CMD.dealers.joint) {
      if (PRICE.joint > st.player.resources.money) yield* println(PLACES.chertBabokNeHvataet());
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.joint);
        st.player.resources.joints = i16(st.player.resources.joints + 1);
        yield* println(PLACES.tyKupilKosyak());
      }
    }
    if (st.scratch.input === CMD.dealers.phone) {
      if (st.player.body.pockets.phone) yield* println(PLACES.uTebyaUzheEst3());
      else if (PRICE.phone > st.player.resources.money) yield* println(PLACES.netuDeneg());
      else {
        st.player.body.pockets.phone = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.phone);
        yield* println(PLACES.cheTyModnyyTipa());
      }
    }
    if (st.scratch.input === CMD.dealers.superJoint) {
      if (PRICE.superJoint > st.player.resources.money) yield* println(PLACES.neHvataet());
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.superJoint);
        yield* println(PLACES.poshliSteroidy());
        const r = yield* rnd(4);
        if (r === 0) {
          st.player.stats.strength = i16(st.player.stats.strength + 1);
          yield* println(PLACES.sila1());
          st.player.damage.max = i16(st.player.damage.max + 1);
          if (mod(st.player.stats.strength, 2) === 0)
            st.player.damage.min = i16(st.player.damage.min + 1);
          st.player.health.max = i16(st.player.health.max + 1);
          st.player.health.current = i16(st.player.health.current + 1);
        } else if (r === 1) {
          st.player.stats.agility = i16(st.player.stats.agility + 1);
          yield* println(PLACES.lovkost1());
        } else if (r === 2) {
          st.player.stats.vitality = i16(st.player.stats.vitality + 1);
          yield* println(PLACES.zhivuchest1());
          st.player.health.max = i16(st.player.health.max + 5);
          st.player.health.current = i16(st.player.health.current + 5);
        } else if (r === 3) {
          st.player.stats.luck = i16(st.player.stats.luck + 1);
          yield* println(PLACES.udacha1());
        }
      }
    }
    if (st.scratch.input === CMD.dealers.tattoo) {
      if (st.player.body.skin.tattoo) yield* println(PLACES.sdelatKonechnoMozhnoNo());
      else if (PRICE.tattoo > st.player.resources.money) yield* println(PLACES.netuDeneg());
      else {
        st.player.body.skin.tattoo = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.tattoo);
        yield* println(PLACES.chistyyZek());
      }
    }
    if (st.scratch.input === CMD.dealers.knuckles) {
      if (
        st.player.body.hands.weapons.club &&
        st.player.body.hands.weapons.knife &&
        st.player.body.hands.weapons.cleaver
      )
        yield* println(PLACES.nafigTebeOnNuzhen());
      else if (st.player.body.hands.weapons.knuckles) yield* println(PLACES.uTebyaEstEta());
      else if (PRICE.knuckles > st.player.resources.money)
        yield* println(PLACES.neHvataetDenzhat());
      else {
        st.player.body.hands.weapons.knuckles = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.knuckles);
        st.player.damage.min = i16(st.player.damage.min + 2);
        st.player.damage.max = i16(st.player.damage.max + 2);
        yield* println(PLACES.tyKupilKastetSmotri());
      }
    }
    if (st.scratch.input === CMD.dealers.club) {
      if (st.player.body.hands.weapons.knife && st.player.body.hands.weapons.cleaver)
        yield* println(PLACES.daNafigOnaNuzhna());
      else if (st.player.body.hands.weapons.club) yield* println(PLACES.uTebyaEstDubina());
      else if (PRICE.club > st.player.resources.money) yield* println(PLACES.neHvataetNaDubinku());
      else {
        st.player.body.hands.weapons.club = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.club);
        if (st.player.body.hands.weapons.knuckles) {
          st.player.damage.min = i16(st.player.damage.min + 2);
          st.player.damage.max = i16(st.player.damage.max + 2);
        }
        yield* println(PLACES.tyKupilDubinkuPohozhe());
      }
    }
    if (st.scratch.input === CMD.dealers.pistol) {
      if (st.player.body.pockets.pistol) yield* println(PLACES.nuTyVascheOfigel());
      else if (PRICE.pistol > st.player.resources.money) yield* println(PLACES.dorogayaShtuka());
      else {
        st.player.body.pockets.pistol = { silencer: false, bullets: 3 };
        st.player.resources.money = i16(st.player.resources.money - PRICE.pistol);
        yield* println(PLACES.spasaysyaKtoMozhet());
        yield* println(PLACES.tolkoPomniStrelyayV());
      }
    }
    if (st.scratch.input === CMD.dealers.bullets) {
      if (!st.player.body.pockets.pistol) yield* println(PLACES.netuPushkiSnachalaKupi());
      else if (PRICE.bullets > st.player.resources.money) yield* println(PLACES.nehvatkaDeneg());
      else {
        st.player.body.pockets.pistol.bullets = i16(st.player.body.pockets.pistol.bullets + 5);
        st.player.resources.money = i16(st.player.resources.money - PRICE.bullets);
        yield* println(PLACES.poluchiPyatPulNa());
      }
    }
    if (
      st.scratch.input === CMD.dealers.silencer &&
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
    if (st.scratch.input === CMD.dealers.sellJunk) {
      if (st.player.resources.junk > 0) {
        st.player.resources.money = i16(st.player.resources.money + st.player.resources.junk);
        st.player.resources.junk = 0;
        yield* println(PLACES.barygiDaliTebeDeneg());
      } else yield* println(PLACES.tebeNechegoSpihnut());
    }
    if (st.scratch.input === CMD.dealers.sellSpareThings) yield* sellStuff;
  } while (st.scratch.input !== CMD.place.leave);
});

const sellStuff = Effect.gen(function* () {
  const st = yield* started;
  st.scratch.sold = 255;
  const sell = (
    question: Text,
    base: number,
    spread: number,
    done: (price: number) => Text,
    drop: () => void
  ) =>
    Effect.gen(function* () {
      yield* println(question);
      const answer = yield* prompt(PLACES.prodatVeschi());
      st.scratch.sold = u8((yield* rnd(spread)) + base);
      if (answer !== CMD.answer.yes) return;
      drop();
      st.player.resources.money = i16(st.player.resources.money + ((st.scratch.sold << 24) >> 24));
      yield* println(done((st.scratch.sold << 24) >> 24));
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
  if (st.scratch.sold === 255) yield* println(PLACES.uTebyaNetNeuzhnyh());
  st.scratch.input = CMD.place.nothing;
});

/** 0000:D39C — `rep`: the vet */
export const vet = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.hospital) return yield* println(PLACES.snachalaNaydiGdeNahodtsya());
  yield* println(PLACES.tyPrishelNaRemot());
  const healthy = () =>
    st.player.health.current >= st.player.health.max &&
    !st.player.injuries.jaw &&
    !st.player.injuries.leg;
  if (!healthy()) {
    yield* println(PLACES.dokNeVolnuysyaVse());
    st.scratch.color = u8(st.player.resources.money >= 3 ? 48 : 52);
    yield* println(PLACES.hZa3Rublya(digitColor(st.scratch.color)));
    st.scratch.color = u8(st.player.resources.money >= 7 ? 48 : 52);
    yield* println(PLACES.rZa7Rubley(digitColor(st.scratch.color)));
  }
  for (;;) {
    if (healthy()) return yield* println(PLACES.dokValiOtsyudaTy());
    yield* prompt(PLACES.veterenar());
    if (
      st.scratch.input === CMD.vet.fixBones &&
      (st.player.injuries.jaw || st.player.injuries.leg)
    ) {
      if (st.player.resources.money >= 7) {
        st.player.resources.money = i16(st.player.resources.money - 7);
        st.player.injuries.jaw = false;
        st.player.injuries.leg = false;
        yield* println(PLACES.ogoDaTebyaNe());
        yield* println(PLACES.tvoiPerelomyZalecheny());
      } else yield* println(PLACES.blinHalyavschikMeditsinaNe());
    }
    if (st.scratch.input === CMD.vet.patchUp && st.player.health.current < st.player.health.max) {
      if (st.player.resources.money >= 3) {
        st.player.resources.money = i16(st.player.resources.money - 3);
        st.player.health.current = i16(st.player.health.current + 5);
        if (st.player.health.current > st.player.health.max)
          st.player.health.current = st.player.health.max;
        const r = yield* rnd(3);
        if (r === 1) yield* println(PLACES.schasGaykiPodtyanemI());
        else if (r === 2) yield* println(PLACES.takCheTutU());
        else {
          yield* println(PLACES.eyDokAZachem());
          yield* println(PLACES.dokMolchiZhivotnoe());
        }
        yield* println(PLACES.zdorovya(st.player.health.current, st.player.health.max));
      } else yield* println(PLACES.blinHalyavschikMeditsinaNe());
    }
    if (st.scratch.input === CMD.place.leave || st.scratch.input === CMD.vet.exit) return;
  }
});

/** 0000:D6E3 — `girl` */
export const girlfriend = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.girlfriend) return yield* println(PLACES.uTebyaPokaNet());
  if (st.player.resources.money < 12) return yield* println(PLACES.nuNepoydeshZheKak());
  yield* println(PLACES.tyPrishelKSvoey());
  if ((yield* rnd(2)) === 0 && !st.world.places.club) {
    yield* println(PLACES.onaVytaschilaTebyaV());
    st.world.places.club = true;
  }
  yield* println(PLACES.tyKupilEyChe());
  yield* println(PLACES.tyRasslabilsyaOtdohnulI());
  st.player.health.current = st.player.health.max;
  st.player.resources.money = i16(st.player.resources.money - 12);
  st.world.heat.market = 0;
});

/** 0000:D80C — `pr`: the den */
export const den = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.den) return yield* println(PLACES.tebyaMudakaTakogoTuda());
  yield* print(PLACES.tyPrishelVPriton());
  if (st.world.district === 1) yield* println(PLACES.obschagu((yield* rnd(6)) + 3));
  if (st.world.district === 2) yield* println(PLACES.obschaguVki());
  if (st.world.district === 3) yield* println(PLACES.gopovskiyPriton());
  if (st.world.district === 4) yield* println(PLACES.pritonOtmorozkov());
  yield* writeLn;
  const rel = () => st.player.progression.level - (st.world.district - 1) * 10;
  const curious = () => !st.world.places.dealers || !st.world.places.gym;
  if (st.world.den.helpQuest) yield* println(PLACES.naOdnogoPatsanaNaehal());
  if (st.world.den.jobQuest && st.player.respect >= 100)
    yield* println(PLACES.tyPatsanNormalnyyEst());
  if (curious() && (rel() - 5) * 5 + st.player.respect >= 40)
    yield* println(PLACES.patsanyHotyatTebeKoe());
  yield* writeLn;
  yield* println(PLACES.napishiWChtobyUyti());
  st.scratch.color = u8(st.player.resources.beer !== 0 ? 48 : 52);
  yield* println(PLACES.napishiPChtobyUgostit(digitColor(st.scratch.color)));
  st.scratch.color = u8(st.player.respect >= 2 ? 48 : 52);
  if (st.world.den.loans > 0)
    yield* println(PLACES.napishiRChtobyZanyat(digitColor(st.scratch.color)));
  if (st.world.den.helpQuest) yield* println(PLACES.napishiHpChtobyOtpinat());
  yield* println(PLACES.napishiSChtobyUznat());
  if (curious() && (rel() - 5) * 5 + st.player.respect >= 40)
    yield* println(PLACES.napishiAChtobySprosit());
  if (st.player.respect >= 100 && st.world.den.jobQuest)
    yield* println(PLACES.napishiDChtobyPoyti());
  do {
    yield* prompt(PLACES.priton());
    if (st.scratch.input === CMD.den.treatToBeer) {
      if (st.player.resources.beer > 0) {
        st.player.resources.beer = i16(st.player.resources.beer - 1);
        st.player.respect = i16(st.player.respect + 5);
        yield* println(PLACES.tyUgostilPatsanovPivom());
      } else yield* println(PLACES.aNetUTebya());
    }
    if (st.scratch.input === CMD.den.borrow) {
      if (st.world.den.loans <= 0) yield* println(PLACES.tyUzheVsyuMeloch());
      else if (st.player.respect > 0) {
        st.player.resources.money = i16(st.player.resources.money + 2);
        st.player.respect = i16(st.player.respect - 2);
        st.world.den.loans = u8(st.world.den.loans - 1);
        yield* println(PLACES.tyZanyal2Rublya());
      } else yield* println(PLACES.tyNeMozheshZanyat());
    }
    if (st.world.den.helpQuest && st.scratch.input === CMD.den.helpTheLad) {
      yield* spawnEnemy(1);
      st.scratch.engaged = true;
      yield* println(PLACES.etoUrovnya(typeName(st.enemy.type), st.enemy.level));
      yield* fight(6);
      st.world.den.helpQuest = false;
    }
    if (st.scratch.input === CMD.den.respect) {
      yield* println(PLACES.tvoyaPontovostSeychas(st.player.respect));
      if (st.world.district * 10 + 10 <= st.player.respect) yield* println(PLACES.daEsliCheMy());
    }
    if (curious() && rel() * 2 + st.player.respect >= 40 && st.scratch.input === CMD.den.ask) {
      st.world.places.dealers = true;
      st.world.places.gym = true;
      yield* println(PLACES.tutUNasEst());
      yield* println(PLACES.tyUznalGdeNahoditsya());
    }
    if (st.scratch.input === CMD.den.job && st.player.respect >= 100 && st.world.den.jobQuest)
      yield* job;
  } while (st.scratch.input !== CMD.place.leave);
});

const job = Effect.gen(function* () {
  const st = yield* started;
  yield* println(PLACES.davayBystree());
  yield* println(PLACES.tyPrishelVorovatDengi());
  if (yield* luckAtLeast(st.world.district * 15)) {
    yield* println(PLACES.tyNavarovalDeneg());
    st.player.resources.money = i16(
      st.player.resources.money + (st.world.district * 10 + (yield* rnd(st.world.district * 10)))
    );
    st.player.resources.junk = i16(
      st.player.resources.junk + (st.world.district * 10 + (yield* rnd(st.world.district * 10)))
    );
    yield* gainExp(st.world.district * 12);
  } else {
    yield* println(PLACES.shuherMenty());
    if (yield* luckAtLeast(st.world.district * 15)) yield* println(PLACES.tySmylsyaOtMentov());
    else {
      yield* spawnEnemy(2);
      yield* fight(5);
      yield* println(PLACES.poraValit());
    }
  }
  st.world.den.jobQuest = false;
});

/** 0000:DEFC — `kl`: the club */
export const club = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.club) return yield* println(PLACES.tyPokaChtoNeuznal());
  if (st.world.heat.club > 0) return yield* println(PLACES.tebeNeStoitPoka());
  yield* println(PLACES.tyPrishelVKlub());
  yield* println(PLACES.zdesMozhnoSygratV());
  st.scratch.color = u8(st.player.resources.money >= 15 ? 48 : 52);
  yield* println(PLACES.n115PotusovatsyaNa(digitColor(st.scratch.color)));
  if (st.world.district > 1) {
    st.scratch.color = u8(st.player.resources.money >= 22 ? 48 : 52);
    yield* println(PLACES.n222RazuznatPriemy(digitColor(st.scratch.color)));
  }
  st.scratch.bet = 5;
  do {
    yield* prompt(PLACES.klub());
    if (st.scratch.input === CMD.club.playCards) {
      if (st.scratch.bet <= st.player.resources.money) yield* playCards;
      else yield* println(PLACES.neHvataetDenegNado(st.scratch.bet));
    }
    if (st.scratch.input === CMD.club.disco) {
      if (st.player.resources.money >= 15) {
        st.player.resources.money = i16(st.player.resources.money - 15);
        yield* println(PLACES.tyProkachivaeshLovkost());
        st.player.stats.agility = i16(st.player.stats.agility + 1);
        yield* println(PLACES.lovkost1());
      } else yield* println(PLACES.neHvataet());
    }
    if (st.world.district > 1 && st.scratch.input === CMD.club.cheatTricks) {
      if (st.player.resources.money >= 22) {
        st.player.resources.money = i16(st.player.resources.money - 22);
        yield* println(PLACES.tyProkachivaeshUdachu());
        st.player.stats.luck = i16(st.player.stats.luck + 1);
        yield* println(PLACES.udacha1());
      } else yield* println(PLACES.neHvataet());
    }
  } while (st.scratch.input !== CMD.place.leave);
});

const playCards = Effect.gen(function* () {
  const st = yield* started;
  yield* println(PLACES.tyPostavilRubley(st.scratch.bet));
  st.player.resources.money = i16(st.player.resources.money - st.scratch.bet);
  if (yield* luckAtLeast(st.world.district * 12)) {
    st.player.resources.money = i16(st.player.resources.money + st.scratch.bet * 2);
    yield* println(PLACES.tyVyigralRubley(st.scratch.bet));
    st.scratch.bet = u8(st.scratch.bet + 2);
    yield* gainExp(st.world.district);
  } else {
    yield* println(PLACES.tyProigralRubley(st.scratch.bet));
    st.scratch.bet = 5;
  }
  if (st.scratch.bet < 17 && st.scratch.bet > 5)
    yield* println(PLACES.stavkiIzmenilisTeperStavka(st.scratch.bet));
  if (st.scratch.bet < 17) return;
  yield* spawnEnemy(1);
  st.scratch.engaged = true;
  yield* println(PLACES.kozelDaTyMuhleval());
  yield* println(PLACES.etoUrovnya(typeName(st.enemy.type), st.enemy.level));
  yield* println(PLACES.tyPoluchaeshKachkovOpyta(st.world.district * 5));
  st.player.progression.exp = i16(st.player.progression.exp + st.world.district * 5);
  yield* levelUp(false);
  yield* fight(2);
  yield* println(PLACES.unosiNogiPokaNe());
  st.world.heat.club = 5;
  st.scratch.input = CMD.place.leave;
});

/** 0000:E386 — `trn`: the gym */
export const gym = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.gym) return yield* println(PLACES.tyPokaNeznaeshGde());
  st.scratch.press = st.player.armor;
  if (st.player.body.torso.abibas && !st.player.body.torso.adidas)
    st.scratch.press = u8(st.scratch.press - 1);
  if (st.player.body.torso.adidas) st.scratch.press = u8(st.scratch.press - 2);
  if (st.player.body.torso.leather && !st.player.body.torso.coolLeather)
    st.scratch.press = u8(st.scratch.press - 2);
  if (st.player.body.torso.coolLeather) st.scratch.press = u8(st.scratch.press - 4);
  yield* println(PLACES.tyPrishelVKachalku());
  const c = (price: number) => {
    st.scratch.color = u8(st.player.resources.money >= price ? 48 : 52);
    return digitColor(st.scratch.color);
  };
  yield* println(PLACES.n120KachatsyaGatelyami(c(20)));
  yield* println(PLACES.n220KachatsyaNa(c(20)));
  if (st.world.district > 1 && st.world.district * 10 - 3 > st.player.progression.level)
    yield* println(PLACES.n310ProkachatKachkov(c(10), 10));
  if (st.world.district > 1) yield* println(PLACES.n430KupitZubnuyu(c(30)));
  if (st.world.district > 2 && st.scratch.press < st.world.district * 2)
    yield* println(PLACES.n520ProkachatPress(c(20)));
  do {
    yield* prompt(PLACES.kachalka());
    if (st.scratch.input === CMD.gym.weights) {
      if (st.player.resources.money >= 20) {
        st.player.resources.money = i16(st.player.resources.money - 20);
        yield* println(PLACES.tyProkachivaeshSilu());
        st.player.stats.strength = i16(st.player.stats.strength + 1);
        st.player.health.max = i16(st.player.health.max + 1);
        st.player.health.current = i16(st.player.health.current + 1);
        if (mod(st.player.stats.strength, 2) === 0)
          st.player.damage.min = i16(st.player.damage.min + 1);
        st.player.damage.max = i16(st.player.damage.max + 1);
        yield* println(PLACES.sila1());
      } else yield* println(PLACES.neHvataet());
    }
    if (st.scratch.input === CMD.gym.machines) {
      if (st.player.resources.money >= 20) {
        st.player.resources.money = i16(st.player.resources.money - 20);
        yield* println(PLACES.tyProkachivaeshVynoslivost());
        st.player.stats.vitality = i16(st.player.stats.vitality + 1);
        st.player.health.max = i16(st.player.health.max + 5);
        st.player.health.current = i16(st.player.health.current + 5);
        yield* println(PLACES.vynoslivost1());
      } else yield* println(PLACES.neHvataet());
    }
    if (st.world.district > 1 && st.scratch.input === CMD.gym.exp) {
      if (st.world.district * 10 - 3 <= st.player.progression.level)
        yield* println(PLACES.tySlishkomKrutoyChtoby());
      else if (st.player.resources.money < 10) yield* println(PLACES.neHvataetDenzhat());
      else {
        st.player.resources.money = i16(st.player.resources.money - 10);
        yield* println(PLACES.tyTrenirueshsya());
        st.player.progression.exp = i16(st.player.progression.exp + 10);
        yield* println(PLACES.kachkovOpyta(10));
        if (st.player.progression.exp >= st.player.progression.expNext) yield* levelUp(false);
      }
    }
    if (st.world.district > 1 && st.scratch.input === CMD.gym.mouthGuard) {
      if (st.player.body.mouth.guard) yield* println(PLACES.uTebyaEstEta2());
      else if (st.player.resources.money < 30) yield* println(PLACES.aNeHvataetRublikov());
      else {
        st.player.resources.money = i16(st.player.resources.money - 30);
        st.player.body.mouth.guard = true;
        yield* println(PLACES.tyKupilZaschitu());
      }
    }
    if (st.world.district > 2 && st.scratch.input === CMD.gym.press) {
      if (st.scratch.press < (st.world.district - 2) * 10) {
        if (st.player.resources.money < 20) yield* println(PLACES.neHvataetRublikov());
        else {
          st.player.resources.money = i16(st.player.resources.money - 20);
          yield* println(PLACES.tyProkachivaeshPress());
          st.player.armor = u8(st.player.armor + 1);
          st.scratch.press = u8(st.scratch.press + 1);
          yield* println(PLACES.bronya1());
        }
      } else {
        yield* println(PLACES.tyMaksimalnoProkachalPress());
        if (st.world.district < 4) yield* println(PLACES.kachayDalsheVSleduyuschem());
      }
    }
  } while (st.scratch.input !== CMD.place.leave);
});

/** "Print(prompt); ReadLn(input); LowerCase(input)" */
export function prompt(text: Text) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* print(text);
    st.scratch.input = lowerCase(yield* readLine);
    return st.scratch.input;
  });
}

/** "Ты получаешь # качков опыта" + level-up */
export function gainExp(n: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* println(PLACES.tyPoluchaeshKachkovOpyta2(n));
    st.player.progression.exp = i16(st.player.progression.exp + n);
    yield* levelUp(false);
  });
}

/** a shop line: number, price coloured by affordability, description */
function offer(n: number, price: number, description: Text) {
  return offerShowing(n, price, price, description);
}

/** a shop line whose colour comes from one price while another one is printed */
function offerShowing(n: number, price: number, shown: number, description: Text) {
  return Effect.gen(function* () {
    const st = yield* started;
    st.scratch.color = u8(price <= st.player.resources.money ? 48 : 52);
    yield* println(PLACES.offerLine(String(n), digitColor(st.scratch.color), shown, description));
  });
}
