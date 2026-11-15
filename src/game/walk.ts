/** 0000:AEA1 — `w`/`run`: walking around and what happens on the way. */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt';
import { attr } from '../state/attributes';
import { ENEMIES, enemyAt } from '../state/kinds';
import { typeName } from '../state/names';
import { battle } from '../state/state';
import { i16, u8 } from '../tp/num';
import { settle } from './aftermath';
import { CMD, readAnswer } from './commands';
import { saveMage, temple } from './encounters';
import { encounter, spawnEnemy } from './enemy';
import { emit } from './events';
import { fight, STREET_FIGHT } from './fight';
import { luckAtLeast, println, rnd, started } from './prelude';
import { MAIN } from './texts';

/** 0000:AEA1 — `w`/`run`: wander around looking for trouble */
export function walk(running: boolean) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (st.player.stoned > 0) {
      st.player.stoned = u8(st.player.stoned - 1);
      if (st.player.stoned === 0) {
        yield* println(MAIN.glyukiProshliSila2());
      }
    }
    if (running) yield* println(MAIN.zabegalMudak());
    if (st.world.den.loans < st.world.district * 10)
      st.world.den.loans = u8(st.world.den.loans + 1);
    if (st.world.places.dealers && st.player.body.pockets.pistol && st.world.dealerCalls < 25) {
      st.world.dealerCalls = u8(st.world.dealerCalls + 1);
      if (st.world.dealerCalls === 25 && st.player.body.pockets.phone)
        yield* println(MAIN.telefonAleTyGde());
    }
    if (!st.world.den.helpQuest && (yield* rnd(20)) === 0) {
      st.world.den.helpQuest = true;
      if (st.world.places.den && st.player.body.pockets.phone)
        yield* println(MAIN.telefonAleTyGde2(st.player.name));
    }
    if (!st.world.den.jobQuest && (yield* rnd(20)) === 0) {
      st.world.den.jobQuest = true;
      if (st.world.places.den && st.player.respect >= 100 && st.player.body.pockets.phone)
        yield* println(MAIN.telefonAleTySchas(st.player.name));
    }
    if (st.player.body.pockets.phone && (yield* rnd(200)) === 0) {
      yield* println(MAIN.telefonAleVasya());
      yield* readKey;
      yield* println(MAIN.netEto(st.player.name));
      yield* readKey;
      yield* println(MAIN.telefonAVasyuMozhno());
      yield* readKey;
      yield* println(MAIN.netOnBudetV());
    }
    if (st.player.body.pockets.phone) {
      if ((yield* rnd(100)) === 0 && st.world.places.girlfriend) {
        yield* println(MAIN.telefonTvoyaPassiyaPrivet());
        yield* println(MAIN.aTyBezbazarovZhdi());
      }
      if (st.world.heat.market === 1 && st.world.places.den) yield* println(MAIN.telefonEtoTyTam());
      if (st.world.heat.club === 1 && st.world.places.den) yield* println(MAIN.telefonTyCheTam());
    }
    if (st.world.heat.market > 0) st.world.heat.market = u8(st.world.heat.market - 1);
    if (st.world.heat.club > 0) st.world.heat.club = u8(st.world.heat.club - 1);
    if ((yield* rnd(10)) === 0 && !st.world.places.hospital) {
      st.world.places.hospital = true;
      yield* println(MAIN.tySprosilUProhozhego());
    }
    if ((yield* rnd(10)) === 0 && !st.world.places.market) {
      st.world.places.market = true;
      yield* println(MAIN.tyNashelBazar());
    }
    if ((yield* rnd(100)) === 0 && !st.world.places.club) {
      st.world.places.club = true;
      yield* println(MAIN.tyUvidelObyavlenieTipa());
    }
    if ((yield* rnd(100)) === 0 && !st.world.places.gym) {
      st.world.places.gym = true;
      yield* println(MAIN.naSteneReklamaZhizn());
    }
    if (st.player.body.hands.rings.pomiluy) {
      if (st.player.health.current < attr(st.player, 'healthMax')) {
        st.player.health.current = i16(st.player.health.current + 3);
        if (st.player.health.current > attr(st.player, 'healthMax'))
          st.player.health.current = attr(st.player, 'healthMax');
      }
      if ((yield* rnd(20)) === 0) {
        if (!st.player.injuries.jaw && st.player.injuries.leg) {
          st.player.injuries.leg = false;
          yield* println(MAIN.tvoyaNogaZalechilasS());
        }
        if (st.player.injuries.jaw) {
          st.player.injuries.jaw = false;
          yield* println(MAIN.tvoyaChelyustZalechilasS());
        }
      }
    }
    if (st.player.type === 'otmorozok') {
      if (st.player.health.current < attr(st.player, 'healthMax'))
        st.player.health.current = i16(st.player.health.current + 1);
    } else if (st.player.type === 'vor' && (yield* luckAtLeast(st.world.district * 20))) {
      const found = i16((yield* rnd(st.world.district * 5)) + 1);
      st.player.resources.money = i16(st.player.resources.money + found);
      yield* println(MAIN.opaBabkiRubleyNa(found));
    }
    // what happens on this walk: 1 path, 2 girl, 3 someone comes along, 4 nothing (by 1/25 odds)
    const roll = (yield* rnd(25)) + 1;
    let event = roll >= 10 ? 4 : roll >= 5 ? 3 : roll >= 2 ? 2 : 1;
    if ((yield* rnd(200)) === 0) {
      yield* temple;
      event = 0; // the temple visit is the whole walk
    }
    if ((yield* rnd(100)) === 0) yield* saveMage;
    switch (event) {
      case 1:
        return yield* toggleTrail;
      case 2:
        return yield* prettyGirl;
      case 3:
        return yield* meetSomeone;
      case 4:
        return yield* nothingHappens;
      default:
        return yield* println(MAIN.nicheNeProishodit());
    }
  });
}

const toggleTrail = Effect.gen(function* () {
  const st = yield* started;
  st.world.trail = !st.world.trail;
  const msgs = st.world.trail ? TRAIL_IN : TRAIL_OUT;
  if (st.world.district >= 1 && st.world.district <= 4) yield* println(msgs[st.world.district - 1]);
});

const TRAIL_IN = [
  MAIN.tyZashelNaTropinku(),
  MAIN.tyZashelVKakie(),
  MAIN.tyZashelNaPlany(),
  MAIN.tyZashelCherteKuda(),
];
const TRAIL_OUT = [
  MAIN.tyVyshelSTropinki(),
  MAIN.tyVyshelIzPodvaroten(),
  MAIN.tyVyshelSPlanov(),
  MAIN.tyVyshelCherteOtkuda(),
];

const prettyGirl = Effect.gen(function* () {
  const st = yield* started;
  if (st.world.places.girlfriend) return yield* println(MAIN.sovsemNicheNeProishodit());
  yield* println(MAIN.idetTipaKlevayaTsypa());
  if ((yield* readAnswer) !== CMD.answer.yes) return;
  if ((yield* rnd(2)) === 0) {
    yield* println(MAIN.tyTakoyPodkatyvaeshA());
    st.world.places.girlfriend = true;
  } else yield* println(MAIN.tyEschePodkatitNeuspel());
});

const meetSomeone = encounter(
  spawnEnemy(0),
  Effect.gen(function* () {
    const st = yield* started;
    let engaged = false;
    if (battle(st).enemy.type !== 'ment') {
      // the tattoo halves the odds of being picked on
      let sneak = st.world.district * 7 + 15;
      if (st.player.body.skin.tattoo) sneak = Math.trunc(sneak / 2);
      // weaklings never look for trouble; lads only when the hero is unlucky; thugs and maniacs always
      const group = ENEMIES[battle(st).enemy.type].group;
      const calm =
        ((yield* luckAtLeast(sneak)) || group === 'weakling') &&
        (group === 'weakling' || group === 'lad');
      const type = typeName(battle(st).enemy.type);
      if (calm) {
        yield* println(MAIN.idetUrovnyaHocheshNaehat(type, battle(st).enemy.level));
        if ((yield* readAnswer) === CMD.answer.yes) engaged = true;
      } else {
        yield* println(MAIN.idetUrovnyaIschuschiyKogo(type, battle(st).enemy.level));
        if ((yield* readAnswer) === CMD.answer.yes) engaged = true;
        else if ((yield* rnd(2)) === 0) {
          yield* println(MAIN.onTebyaZametil());
          engaged = true;
        } else yield* println(MAIN.tySmylsya());
      }
    } else {
      yield* println(MAIN.idetMentyaraUrovnyaGroza(battle(st).enemy.level));
      if (yield* luckAtLeast(st.world.district * 7 + 15))
        yield* println(MAIN.tyZatailsyaPrikinulsyaNe());
      else if (st.player.body.eyes.glasses) {
        yield* println(MAIN.tyNapyalilTemnyeOchki());
        yield* println(MAIN.stendeRazyskivayutsyaZaGopnichestvo());
      } else {
        yield* println(MAIN.zapalil());
        engaged = true;
      }
    }
    if (engaged) {
      yield* emit({ type: 'greeting', by: 'enemy' });
      yield* settle(yield* fight(STREET_FIGHT));
    }
  })
);

const nothingHappens = Effect.gen(function* () {
  const st = yield* started;
  if (st.player.stoned > 0 && (yield* rnd(7)) === 0) yield* println(MAIN.vseKudaToPlyvet());
  if (st.player.stoned > 0 && (yield* rnd(7)) === 0) {
    const type = typeName(enemyAt(yield* rnd(7)));
    yield* println(MAIN.idetUrovnyaHocheshNaehat(type, yield* rnd(st.world.district * 10 + 1)));
    yield* readLine; // the answer to a glitch goes nowhere
    yield* println(MAIN.cheZaBotvaNi());
  } else yield* println(MAIN.nicheNeProishodit());
});
