/** 0000:D80C — `pr`: the den and its job. */
import { Effect } from 'effect';

import type { Game } from '../../state/state';
import { i16, u8 } from '../../tp/num';
import { denHelpReward, settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp } from '../hero';
import { luckAtLeast, rnd, started } from '../prelude';

/** 0000:D80C — `pr`: the den */
export const den = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.den) return yield* emit({ type: 'denClosed' });
  const dorm = st.world.district === 1 ? (yield* rnd(6)) + 3 : 0;
  yield* emit({ type: 'enteredDen', dorm });
  for (;;) {
    const command = yield* promptCommand('den');
    if (command === CMD.den.treatToBeer) {
      if (st.player.resources.beer > 0) {
        st.player.resources.beer = i16(st.player.resources.beer - 1);
        st.player.respect = i16(st.player.respect + 5);
        yield* emit({ type: 'denTreated' });
      } else yield* emit({ type: 'denNoBeerToTreat' });
    }
    if (command === CMD.den.borrow) {
      if (st.world.den.loans <= 0) yield* emit({ type: 'denLoansGone' });
      else if (st.player.respect > 0) {
        st.player.resources.money = i16(st.player.resources.money + 2);
        st.player.respect = i16(st.player.respect - 2);
        st.world.den.loans = u8(st.world.den.loans - 1);
        yield* emit({ type: 'denBorrowed' });
      } else yield* emit({ type: 'denLoanRefused' });
    }
    if (st.world.den.helpQuest && command === CMD.den.helpTheLad) {
      const outcome = yield* encounter(
        spawnEnemy(1),
        Effect.gen(function* () {
          yield* emit({ type: 'denHelpFight' });
          yield* emit({ type: 'greeting', by: 'enemy' });
          const outcome = yield* fight(STREET_FIGHT);
          yield* settle(outcome);
          return outcome;
        })
      );
      if (outcome === 'won') yield* denHelpReward;
      st.world.den.helpQuest = false;
    }
    if (command === CMD.den.respect) yield* emit({ type: 'denRespectTold' });
    // sic: a looser condition than the hint's (`asksAbout`)
    if (curious(st) && rel(st) * 2 + st.player.respect >= 40 && command === CMD.den.ask) {
      st.world.places.dealers = true;
      st.world.places.gym = true;
      yield* emit({ type: 'denToldPlaces' });
    }
    if (command === CMD.den.job && jobOffered(st)) yield* job;
    if (command === CMD.den.leave) break;
  }
});

/** the hero's level within the district */
export function rel(st: Game): number {
  return st.player.progression.level - (st.world.district - 1) * 10;
}

/** the den can still tell where the dealers or the gym are */
export function curious(st: Game): boolean {
  return !st.world.places.dealers || !st.world.places.gym;
}

/** the lads want to tell the hero something (the hint and `a` in the menu) */
export function asksAbout(st: Game): boolean {
  return curious(st) && (rel(st) - 5) * 5 + st.player.respect >= 40;
}

/** the lads take the hero on a job */
export function jobOffered(st: Game): boolean {
  return st.player.respect >= 100 && st.world.den.jobQuest;
}

const job = Effect.gen(function* () {
  const st = yield* started;
  yield* emit({ type: 'denJobStarted' });
  if (yield* luckAtLeast(st.world.district * 15)) {
    yield* emit({ type: 'denJobLooted' });
    st.player.resources.money = i16(
      st.player.resources.money + (st.world.district * 10 + (yield* rnd(st.world.district * 10)))
    );
    st.player.resources.junk = i16(
      st.player.resources.junk + (st.world.district * 10 + (yield* rnd(st.world.district * 10)))
    );
    yield* gainExp(st.world.district * 12);
  } else {
    yield* emit({ type: 'denJobCops' });
    if (yield* luckAtLeast(st.world.district * 15)) yield* emit({ type: 'denJobEscaped' });
    else {
      yield* encounter(
        spawnEnemy(2),
        Effect.gen(function* () {
          yield* settle(yield* fight(STREET_FIGHT));
        })
      );
      yield* emit({ type: 'denJobBusted' });
    }
  }
  st.world.den.jobQuest = false;
});
