/** What the player sees of the den (`den.ts`). */
import { Effect } from 'effect';

import { writeLn } from '../../crt/crt';
import { typeName } from '../../state/names';
import { battle } from '../../state/state';
import { print, println, started } from '../prelude';
import { PLACES } from '../texts';
import type { View } from '../view';
import { asksAbout, jobOffered } from './den';
import { affordable } from './shop';

export type DenEvent =
  /** the den isn't open to the hero yet */
  | { readonly type: 'denClosed' }
  /** the den of the district, the lads' news and the menu; `dorm`: the dormitory number in
   * the first district (Random) */
  | { readonly type: 'enteredDen'; readonly dorm: number }
  | { readonly type: 'denTreated' }
  | { readonly type: 'denNoBeerToTreat' }
  /** no more loans in this district */
  | { readonly type: 'denLoansGone' }
  | { readonly type: 'denBorrowed' }
  /** no respect left to borrow on */
  | { readonly type: 'denLoanRefused' }
  /** the lad's offender is here (the battle's enemy) */
  | { readonly type: 'denHelpFight' }
  /** the lad's quarrel is over, whoever won */
  | { readonly type: 'denHelpFinished' }
  | { readonly type: 'denRespectTold' }
  /** the dealers and the gym are known now */
  | { readonly type: 'denToldPlaces' }
  | { readonly type: 'denJobStarted' }
  /** the money and the junk just taken */
  | { readonly type: 'denJobLooted'; readonly money: number; readonly junk: number }
  | { readonly type: 'denJobCops' }
  | { readonly type: 'denJobEscaped' }
  /** after the fight with the cops */
  | { readonly type: 'denJobBusted' }
  /** the job is done, however it went */
  | { readonly type: 'denJobFinished' };

export const denView: View<DenEvent> = {
  events: {
    denClosed: true,
    enteredDen: true,
    denTreated: true,
    denNoBeerToTreat: true,
    denLoansGone: true,
    denBorrowed: true,
    denLoanRefused: true,
    denHelpFight: true,
    denHelpFinished: true,
    denRespectTold: true,
    denToldPlaces: true,
    denJobStarted: true,
    denJobLooted: true,
    denJobCops: true,
    denJobEscaped: true,
    denJobBusted: true,
    denJobFinished: true,
  },
  show: (event) => showDen(event),
};

function showDen(event: DenEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'denClosed':
        return yield* println(PLACES.tebyaMudakaTakogoTuda());
      case 'enteredDen':
        return yield* entrance(event.dorm);
      case 'denTreated':
        return yield* println(PLACES.tyUgostilPatsanovPivom());
      case 'denNoBeerToTreat':
        return yield* println(PLACES.aNetUTebya());
      case 'denLoansGone':
        return yield* println(PLACES.tyUzheVsyuMeloch());
      case 'denBorrowed':
        return yield* println(PLACES.tyZanyal2Rublya());
      case 'denLoanRefused':
        return yield* println(PLACES.tyNeMozheshZanyat());
      case 'denHelpFight': {
        const { enemy } = battle(st);
        return yield* println(PLACES.etoUrovnya(typeName(enemy.type), enemy.level));
      }
      case 'denRespectTold':
        yield* println(PLACES.tvoyaPontovostSeychas(st.player.respect));
        if (st.world.district * 10 + 10 <= st.player.respect) yield* println(PLACES.daEsliCheMy());
        return;
      case 'denToldPlaces':
        yield* println(PLACES.tutUNasEst());
        return yield* println(PLACES.tyUznalGdeNahoditsya());
      case 'denJobStarted':
        yield* println(PLACES.davayBystree());
        return yield* println(PLACES.tyPrishelVorovatDengi());
      case 'denJobLooted':
        return yield* println(PLACES.tyNavarovalDeneg());
      case 'denJobCops':
        return yield* println(PLACES.shuherMenty());
      case 'denJobEscaped':
        return yield* println(PLACES.tySmylsyaOtMentov());
      case 'denJobBusted':
        return yield* println(PLACES.poraValit());
      case 'denHelpFinished':
      case 'denJobFinished':
        return;
    }
  });
}

/** the den of the district, what the lads have to say, the menu */
function entrance(dorm: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* print(PLACES.tyPrishelVPriton());
    if (st.world.district === 1) yield* println(PLACES.obschagu(dorm));
    if (st.world.district === 2) yield* println(PLACES.obschaguVki());
    if (st.world.district === 3) yield* println(PLACES.gopovskiyPriton());
    if (st.world.district === 4) yield* println(PLACES.pritonOtmorozkov());
    yield* writeLn;
    if (st.world.den.helpQuest) yield* println(PLACES.naOdnogoPatsanaNaehal());
    if (jobOffered(st)) yield* println(PLACES.tyPatsanNormalnyyEst());
    if (asksAbout(st)) yield* println(PLACES.patsanyHotyatTebeKoe());
    yield* writeLn;
    yield* println(PLACES.napishiWChtobyUyti());
    yield* println(PLACES.napishiPChtobyUgostit(affordable(st.player.resources.beer !== 0)));
    if (st.world.den.loans > 0)
      yield* println(PLACES.napishiRChtobyZanyat(affordable(st.player.respect >= 2)));
    if (st.world.den.helpQuest) yield* println(PLACES.napishiHpChtobyOtpinat());
    yield* println(PLACES.napishiSChtobyUznat());
    if (asksAbout(st)) yield* println(PLACES.napishiAChtobySprosit());
    if (jobOffered(st)) yield* println(PLACES.napishiDChtobyPoyti());
  });
}
