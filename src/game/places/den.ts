/** 0000:D80C — `pr`: the den and its job. */
import { Effect } from 'effect';

import { writeLn } from '../../crt/crt';
import { typeName } from '../../state/names';
import { battle } from '../../state/state';
import { i16, u8 } from '../../tp/num';
import { denHelpReward, settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp } from '../hero';
import { luckAtLeast, print, println, rnd, started } from '../prelude';
import { PLACES } from '../texts';
import { affordable } from './shop';

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
  yield* println(PLACES.napishiPChtobyUgostit(affordable(st.player.resources.beer !== 0)));
  if (st.world.den.loans > 0)
    yield* println(PLACES.napishiRChtobyZanyat(affordable(st.player.respect >= 2)));
  if (st.world.den.helpQuest) yield* println(PLACES.napishiHpChtobyOtpinat());
  yield* println(PLACES.napishiSChtobyUznat());
  if (curious() && (rel() - 5) * 5 + st.player.respect >= 40)
    yield* println(PLACES.napishiAChtobySprosit());
  if (st.player.respect >= 100 && st.world.den.jobQuest)
    yield* println(PLACES.napishiDChtobyPoyti());
  for (;;) {
    const command = yield* promptCommand('den');
    if (command === CMD.den.treatToBeer) {
      if (st.player.resources.beer > 0) {
        st.player.resources.beer = i16(st.player.resources.beer - 1);
        st.player.respect = i16(st.player.respect + 5);
        yield* println(PLACES.tyUgostilPatsanovPivom());
      } else yield* println(PLACES.aNetUTebya());
    }
    if (command === CMD.den.borrow) {
      if (st.world.den.loans <= 0) yield* println(PLACES.tyUzheVsyuMeloch());
      else if (st.player.respect > 0) {
        st.player.resources.money = i16(st.player.resources.money + 2);
        st.player.respect = i16(st.player.respect - 2);
        st.world.den.loans = u8(st.world.den.loans - 1);
        yield* println(PLACES.tyZanyal2Rublya());
      } else yield* println(PLACES.tyNeMozheshZanyat());
    }
    if (st.world.den.helpQuest && command === CMD.den.helpTheLad) {
      const outcome = yield* encounter(
        spawnEnemy(1),
        Effect.gen(function* () {
          yield* println(
            PLACES.etoUrovnya(typeName(battle(st).enemy.type), battle(st).enemy.level)
          );
          yield* emit({ type: 'greeting', by: 'enemy' });
          const outcome = yield* fight(STREET_FIGHT);
          yield* settle(outcome);
          return outcome;
        })
      );
      if (outcome === 'won') yield* denHelpReward;
      st.world.den.helpQuest = false;
    }
    if (command === CMD.den.respect) {
      yield* println(PLACES.tvoyaPontovostSeychas(st.player.respect));
      if (st.world.district * 10 + 10 <= st.player.respect) yield* println(PLACES.daEsliCheMy());
    }
    if (curious() && rel() * 2 + st.player.respect >= 40 && command === CMD.den.ask) {
      st.world.places.dealers = true;
      st.world.places.gym = true;
      yield* println(PLACES.tutUNasEst());
      yield* println(PLACES.tyUznalGdeNahoditsya());
    }
    if (command === CMD.den.job && st.player.respect >= 100 && st.world.den.jobQuest) yield* job;
    if (command === CMD.den.leave) break;
  }
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
      yield* encounter(
        spawnEnemy(2),
        Effect.gen(function* () {
          yield* settle(yield* fight(STREET_FIGHT));
        })
      );
      yield* println(PLACES.poraValit());
    }
  }
  st.world.den.jobQuest = false;
});
