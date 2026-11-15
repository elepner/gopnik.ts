/** 0000:B940 — `mar`: the market. */
import { Effect } from 'effect';

import { PRICE } from '../../data/tables';
import { attr } from '../../state/attributes';
import { typeName } from '../../state/names';
import { battle } from '../../state/state';
import { i16 } from '../../tp/num';
import { settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp } from '../hero';
import { luckAtLeast, println, rnd, started } from '../prelude';
import { PLACES } from '../texts';
import { offer } from './shop';

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
  for (;;) {
    const command = yield* promptCommand('market');
    if (command === CMD.market.hotdog) {
      if (st.player.injuries.jaw) yield* println(PLACES.tyNeMozheshHavat());
      else if (st.player.health.current < attr(st.player, 'healthMax')) {
        if (PRICE.hotdog > st.player.resources.money) yield* println(PLACES.chertBabokDazheNa());
        else {
          st.player.resources.money = i16(st.player.resources.money - PRICE.hotdog);
          st.player.health.current = i16(st.player.health.current + ((yield* rnd(2)) + 3));
          if (st.player.health.current > attr(st.player, 'healthMax'))
            st.player.health.current = attr(st.player, 'healthMax');
          yield* println(PLACES.tySozhralHotDog());
        }
      } else yield* println(PLACES.daNeohotaHavat());
    }
    if (command === CMD.market.beer) {
      if (PRICE.beer > st.player.resources.money) yield* println(PLACES.neHvataet());
      else {
        st.player.resources.money = i16(st.player.resources.money - PRICE.beer);
        yield* println(BEER_LINES[yield* rnd(3)]);
        st.player.resources.beer = i16(st.player.resources.beer + 1);
      }
    }
    if (command === CMD.market.glasses) {
      if (st.player.body.eyes.glasses) yield* println(PLACES.uTebyaEstOchki());
      else if (PRICE.glasses > st.player.resources.money) yield* println(PLACES.neHvataetBabok());
      else {
        st.player.body.eyes.glasses = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.glasses);
        yield* println(PLACES.modnyeTakieOchkiOt());
      }
    }
    if (command === CMD.market.abibas) {
      if (st.player.body.torso.adidas) yield* println(PLACES.uTebyaEstBolee());
      else if (st.player.body.torso.abibas) yield* println(PLACES.uTebyaUzheEst());
      else if (PRICE.abibas > st.player.resources.money) yield* println(PLACES.neHvataetDeneg());
      else {
        st.player.body.torso.abibas = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.abibas);
        yield* println(PLACES.teperTyBolshePohozh());
      }
    }
    if (command === CMD.market.boots) {
      if (st.player.body.feet.coolBoots) yield* println(PLACES.uTebyaButsyPo());
      else if (st.player.body.feet.boots) yield* println(PLACES.uTebyaTakieUzhe());
      else if (PRICE.boots > st.player.resources.money) yield* println(PLACES.netuNaNihDeneg());
      else {
        st.player.body.feet.boots = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.boots);
        yield* println(PLACES.zatseniKrasovki());
      }
    }
    if (st.world.district > 1 && command === CMD.market.leather) {
      if (st.player.body.torso.coolLeather) yield* println(PLACES.utebyaEstKozhankaKruche());
      else if (st.player.body.torso.leather) yield* println(PLACES.tyUzheKupilEto());
      else if (PRICE.leather > st.player.resources.money)
        yield* println(PLACES.neDostatochnoBabla());
      else {
        st.player.body.torso.leather = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.leather);
        yield* println(PLACES.nuVesNaPontah());
      }
    }
    // sic: no district check for the adidas suit
    if (command === CMD.market.adidas) {
      if (st.player.body.torso.adidas) yield* println(PLACES.uTebyaUzheEst2());
      else if (PRICE.adidas > st.player.resources.money) yield* println(PLACES.neHvataetDeneg());
      else {
        st.player.body.torso.adidas = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.adidas);
        yield* println(PLACES.chistyyGopnik());
      }
    }
    if (st.world.district > 2 && command === CMD.market.coolBoots) {
      if (st.player.body.feet.coolBoots) yield* println(PLACES.uTebyaTakieUzhe());
      else if (PRICE.boots2 > st.player.resources.money) yield* println(PLACES.netuNaNihDeneg());
      else {
        st.player.body.feet.coolBoots = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.boots2);
        yield* println(PLACES.ofigennyeButtsy());
      }
    }
    if (st.world.district > 3 && command === CMD.market.coolLeather) {
      if (st.player.body.torso.coolLeather) yield* println(PLACES.tyUzheKupilEto());
      else if (PRICE.leather2 > st.player.resources.money)
        yield* println(PLACES.neDostatochnoBabla());
      else {
        st.player.body.torso.coolLeather = true;
        st.player.resources.money = i16(st.player.resources.money - PRICE.leather2);
        yield* println(PLACES.nuKrutoySdohnutMozhno());
      }
    }
    // a caught thief has to run
    if (command === CMD.market.steal && (yield* pickpocket)) break;
    if (command === CMD.market.leave) break;
  }
});

const BEER_LINES = [PLACES.glinskoeCheZaNafig(), PLACES.pivkoHolodnenkoe(), PLACES.nuChePoPivu()];

/** `t`: steal at the market; true when the hero was caught (he has to run) */
const pickpocket = Effect.gen(function* () {
  const st = yield* started;
  if ((yield* luckAtLeast(st.world.district * 5 + 5)) && (yield* rnd(10)) < 9) {
    const found = i16((yield* rnd(attr(st.player, 'luck') * 2)) + 1);
    st.player.resources.money = i16(st.player.resources.money + found);
    yield* println(PLACES.opaBabkiRubleyNa(found));
    yield* gainExp(st.world.district * 2);
    return false;
  }
  yield* encounter(
    spawnEnemy(1),
    Effect.gen(function* () {
      yield* println(PLACES.koryavyyTyPopalsya());
      yield* println(PLACES.etoUrovnya(typeName(battle(st).enemy.type), battle(st).enemy.level));
      yield* emit({ type: 'greeting', by: 'caughtStealing' });
      yield* settle(yield* fight(STREET_FIGHT));
    })
  );
  yield* println(PLACES.blinMentyZapalyatSmatyvaysya());
  st.world.heat.market = 5;
  return true;
});
