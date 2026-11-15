import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../../test/game';
import { set } from '../../state/attributes';
import type { GameState } from '../../state/state';
import { District } from '../../tp/brands';
import type { GameEvent } from '../events';
import { den } from './den';

const keys = (...lines: string[]) => lines.flatMap((l) => [...Array.from(l), 'enter']);
const types = (events: GameEvent[]) => events.map((e) => e.type);
const prompt = { type: 'prompt', context: 'den' };

/** the hero in an open den, district 1 */
function inDen(s: GameState) {
  const st = hero(s);
  st.world.places.den = true;
  return st;
}

/** the den's events after the entrance (`enteredDen` and the first prompt) */
function after(events: GameEvent[]) {
  expect(types(events.slice(0, 2))).toEqual(['enteredDen', 'prompt']);
  return events.slice(2);
}

describe('den (0000:D80C)', () => {
  it.effect('a closed den lets nobody in', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit, rand } = yield* play(den, { events, setup: hero });
      expect(Exit.isSuccess(exit)).toBe(true);
      expect(types(events)).toEqual(['denClosed']);
      expect(rand).toHaveLength(0);
    })
  );

  it.effect('in district 1 the dorm number is rolled, w leaves', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit, rand } = yield* play(den, { events, keys: keys('w'), setup: inDen });
      expect(Exit.isSuccess(exit)).toBe(true);
      expect(rand.map((r) => r.n)).toEqual([6]);
      expect(events).toEqual([{ type: 'enteredDen', dorm: rand[0].result + 3 }, prompt]);
    })
  );

  it.effect('outside district 1 there is no dorm and no roll', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { rand } = yield* play(den, {
        events,
        setup: (s) => (inDen(s).world.district = District(2)),
      });
      expect(rand).toHaveLength(0);
      expect(events).toEqual([{ type: 'enteredDen', dorm: 0 }, prompt]);
    })
  );

  it.effect('p treats the lads to a beer: +5 respect', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('p'),
        setup: (s) => (inDen(s).player.resources.beer = 2),
      });
      expect([st.player.resources.beer, st.player.respect]).toEqual([1, 5]);
      expect(after(events)).toEqual([{ type: 'denTreated' }, prompt]);
    })
  );

  it.effect('p without beer treats nobody', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, { events, keys: keys('p'), setup: inDen });
      expect(st.player.respect).toBe(0);
      expect(after(events)).toEqual([{ type: 'denNoBeerToTreat' }, prompt]);
    })
  );

  it.effect('r borrows 2 roubles for 2 respect', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('r'),
        setup: (s) => {
          const st = inDen(s);
          st.world.den.loans = 3;
          st.player.respect = 5;
        },
      });
      expect([st.player.resources.money, st.player.respect, st.world.den.loans]).toEqual([2, 3, 2]);
      expect(after(events)).toEqual([{ type: 'denBorrowed' }, prompt]);
    })
  );

  it.effect('r without respect is refused', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('r'),
        setup: (s) => (inDen(s).world.den.loans = 3),
      });
      expect([st.player.resources.money, st.world.den.loans]).toEqual([0, 3]);
      expect(after(events)).toEqual([{ type: 'denLoanRefused' }, prompt]);
    })
  );

  it.effect('r when the loans are gone', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('r'),
        setup: (s) => (inDen(s).player.respect = 5),
      });
      expect([st.player.resources.money, st.player.respect]).toEqual([0, 5]);
      expect(after(events)).toEqual([{ type: 'denLoansGone' }, prompt]);
    })
  );

  it.effect('s tells the respect', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(den, { events, keys: keys('s'), setup: inDen });
      expect(after(events)).toEqual([{ type: 'denRespectTold' }, prompt]);
    })
  );

  it.effect('a with enough respect tells where the dealers and the gym are', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('a'),
        setup: (s) => (inDen(s).player.respect = 40), // level 0 in district 1: 0*2 + 40
      });
      expect([st.world.places.dealers, st.world.places.gym]).toEqual([true, true]);
      expect(after(events)).toEqual([{ type: 'denToldPlaces' }, prompt]);
    })
  );

  it.effect('a with too little respect tells nothing', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('a'),
        setup: (s) => (inDen(s).player.respect = 39),
      });
      expect([st.world.places.dealers, st.world.places.gym]).toEqual([false, false]);
      expect(after(events)).toEqual([prompt]);
    })
  );

  it.effect('a tells nothing when the dealers and the gym are known', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(den, {
        events,
        keys: keys('a'),
        setup: (s) => {
          const st = inDen(s);
          st.player.respect = 100;
          st.world.places.dealers = true;
          st.world.places.gym = true;
        },
      });
      expect(after(events)).toEqual([prompt]);
    })
  );

  it.effect('hp without a lad to help does nothing', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { rand } = yield* play(den, { events, keys: keys('hp'), setup: inDen });
      expect(rand).toHaveLength(1); // the dorm
      expect(after(events)).toEqual([prompt]);
    })
  );

  it.effect('hp: helping the lad starts a fight', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(den, {
        events,
        keys: keys('hp'),
        setup: (s) => (inDen(s).world.den.helpQuest = true),
      });
      expect(after(events)).toEqual([
        { type: 'denHelpFight' },
        { type: 'greeting', by: 'enemy' },
        { type: 'fightStarted' },
        { type: 'prompt', context: 'fight' },
      ]);
    })
  );

  it.effect('hp: after running away from the fight the quest is over and the den goes on', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        events,
        keys: keys('hp', 'run'),
        setup: (s) => (inDen(s).world.den.helpQuest = true),
      });
      expect(st.world.den.helpQuest).toBe(false);
      expect(st.battle).toBeNull();
      expect(types(events).slice(-3)).toEqual(['fledUnranked', 'denHelpFinished', 'prompt']);
      expect(events.at(-1)).toEqual(prompt);
    })
  );

  for (const [why, respect, jobQuest] of [
    ['too little respect', 99, true],
    ['no job', 100, false],
  ] as const)
    it.effect(`d without a job offered (${why}) does nothing`, () =>
      Effect.gen(function* () {
        const events: GameEvent[] = [];
        const { st } = yield* play(den, {
          events,
          keys: keys('d'),
          setup: (s) => {
            const st = inDen(s);
            st.player.respect = respect;
            st.world.den.jobQuest = jobQuest;
          },
        });
        expect([st.player.resources.money, st.world.den.jobQuest]).toEqual([0, jobQuest]);
        expect(after(events)).toEqual([prompt]);
      })
    );

  /** a respected hero with luck 7 and a job waiting */
  function onJob(s: GameState) {
    const st = inDen(s);
    st.player.respect = 100;
    st.world.den.jobQuest = true;
    set(st.player, 'luck', 7);
  }

  it.effect('d: a lucky job brings money, junk and experience', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(den, {
        seed: 0, // luck check Random(15) = 0, money 10 + 8, junk 10 + 2
        events,
        keys: keys('d'),
        setup: onJob,
      });
      expect(rand.slice(1, 4)).toEqual([
        { n: 15, result: 0 },
        { n: 10, result: 8 },
        { n: 10, result: 2 },
      ]);
      expect([
        st.player.resources.money,
        st.player.resources.junk,
        st.player.progression.level,
        st.world.den.jobQuest,
      ]).toEqual([18, 12, 1, false]);
      const job = after(events);
      expect(job.slice(0, 3)).toEqual([
        { type: 'denJobStarted' },
        { type: 'denJobLooted', money: 18, junk: 12 },
        { type: 'heroExpGained', exp: 12 },
      ]);
      expect(job.slice(-2)).toEqual([{ type: 'denJobFinished' }, prompt]);
    })
  );

  it.effect('d: the cops come, the hero gets away', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, rand } = yield* play(den, {
        seed: 1, // luck checks Random(15) = 12, then 3
        events,
        keys: keys('d'),
        setup: onJob,
      });
      expect(rand.slice(1)).toEqual([
        { n: 15, result: 12 },
        { n: 15, result: 3 },
      ]);
      expect([st.player.resources.money, st.world.den.jobQuest]).toEqual([0, false]);
      expect(types(after(events))).toEqual([
        'denJobStarted',
        'denJobCops',
        'denJobEscaped',
        'denJobFinished',
        'prompt',
      ]);
    })
  );

  it.effect('d: the cops come and catch the hero: a fight', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(den, {
        seed: 2, // luck checks Random(15) = 10, then 8
        events,
        keys: keys('d'),
        setup: onJob,
      });
      expect(after(events)).toEqual([
        { type: 'denJobStarted' },
        { type: 'denJobCops' },
        { type: 'fightStarted' },
        { type: 'prompt', context: 'fight' },
      ]);
    })
  );

  it.effect('d: after running from the cop the hero is busted, the job is over', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(den, {
        seed: 2,
        events,
        keys: keys('d', 'run'),
        setup: onJob,
      });
      expect([st.world.den.jobQuest, st.battle]).toEqual([false, null]);
      expect(types(events).slice(-4)).toEqual([
        'fledUnranked',
        'denJobBusted',
        'denJobFinished',
        'prompt',
      ]);
      expect(events.at(-1)).toEqual(prompt);
    })
  );
});
