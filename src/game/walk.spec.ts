import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import { attr } from '../state/attributes';
import type { GameState } from '../state/state';
import type { GameEvent } from './events';
import { walk } from './walk';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l.split(''), 'enter']);

/** one walk (`w`, or `run`) with the hero prepared by `setup`; the events are kept */
function step(
  setup: (s: GameState) => void,
  opts: { seed?: number; keys?: string[]; running?: boolean } = {}
) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(walk(opts.running ?? false), {
      seed: opts.seed,
      keys: opts.keys,
      setup,
      events,
    });
    return { ...played, events, types: events.map((e) => e.type) };
  });
}

/** the hero with a phone in the pocket */
function phone(s: GameState) {
  const st = hero(s);
  st.player.body.pockets.phone = true;
  return st;
}

/** seed 3: nothing happens on the way (only the step) */
const QUIET = 3;

describe('walk: the step (0000:AEA1)', () => {
  it.effect('a quiet walk is just the step', () =>
    Effect.gen(function* () {
      const { types } = yield* step(hero, { seed: QUIET });
      expect(types).toEqual(['walkStepped', 'walkQuiet']);
    })
  );

  it.effect('the joint wears off, loans refill, heat cools, the dealers count the pistol', () =>
    Effect.gen(function* () {
      const { st } = yield* step(
        (s) => {
          const st = hero(s);
          st.player.stoned = 3;
          st.world.den.loans = 4;
          st.world.heat.market = 3;
          st.world.heat.club = 2;
          st.world.places.dealers = true;
          st.player.body.pockets.pistol = { silencer: false, bullets: 0 };
          st.world.dealerCalls = 7;
        },
        { seed: QUIET }
      );
      expect([
        st.player.stoned,
        st.world.den.loans,
        st.world.heat.market,
        st.world.heat.club,
        st.world.dealerCalls,
      ]).toEqual([2, 5, 2, 1, 8]);
    })
  );

  it.effect('loans stop at district*10, the dealers at 25 walks, heat at 0', () =>
    Effect.gen(function* () {
      const { st } = yield* step(
        (s) => {
          const st = hero(s);
          st.world.den.loans = 10;
          st.world.places.dealers = true;
          st.player.body.pockets.pistol = { silencer: false, bullets: 0 };
          st.world.dealerCalls = 25;
        },
        { seed: QUIET }
      );
      expect([st.world.den.loans, st.world.dealerCalls, st.world.heat.market]).toEqual([10, 25, 0]);
    })
  );

  it.effect('an отморозок heals 1 on the way', () =>
    Effect.gen(function* () {
      const { st } = yield* step((s) => (hero(s).player.health.current = 20), { seed: QUIET });
      expect(st.player.health.current).toBe(21);
    })
  );

  it.effect('another class does not heal', () =>
    Effect.gen(function* () {
      const { st } = yield* step(
        (s) => {
          const st = hero(s);
          st.player.type = 'gopnik';
          st.player.health.current = 20;
        },
        { seed: QUIET }
      );
      expect(st.player.health.current).toBe(20);
    })
  );

  it.effect('the ring «Помилуй» heals 3 more, up to the maximum', () =>
    Effect.gen(function* () {
      const ring = (health: number) => (s: GameState) => {
        const st = hero(s);
        st.player.body.hands.rings.pomiluy = true;
        st.player.health.current = health;
      };
      const low = yield* step(ring(20), { seed: QUIET });
      expect(low.st.player.health.current).toBe(24);
      const high = yield* step(ring(33), { seed: QUIET });
      expect(high.st.player.health.current).toBe(attr(high.st.player, 'healthMax'));
    })
  );

  it.effect('the last walk of a joint sobers up', () =>
    Effect.gen(function* () {
      const { st, types } = yield* step((s) => (hero(s).player.stoned = 1), { seed: QUIET });
      expect(st.player.stoned).toBe(0);
      expect(types.slice(0, 2)).toEqual(['walkStepped', 'walkSoberedUp']);
    })
  );

  it.effect('`run` says so', () =>
    Effect.gen(function* () {
      const { types } = yield* step(hero, { seed: QUIET, running: true });
      expect(types).toEqual(['walkStepped', 'walkRan', 'walkQuiet']);
    })
  );

  it.effect('the 25th walk with the pistol: the dealers call the phone', () =>
    Effect.gen(function* () {
      const dealers = (calls: number) => (s: GameState) => {
        const st = phone(s);
        st.world.places.dealers = true;
        st.player.body.pockets.pistol = { silencer: false, bullets: 0 };
        st.world.dealerCalls = calls;
      };
      const called = yield* step(dealers(24), { seed: QUIET });
      expect(called.st.world.dealerCalls).toBe(25);
      expect(called.types).toContain('walkDealersCalled');
      const again = yield* step(dealers(25), { seed: QUIET });
      expect(again.types).not.toContain('walkDealersCalled');
    })
  );

  it.effect('the market heat running out: the den lads call', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step(
        (s) => {
          const st = phone(s);
          st.world.places.den = true;
          st.world.heat.market = 1;
        },
        { seed: QUIET }
      );
      expect(st.world.heat.market).toBe(0);
      expect(events).toContainEqual({ type: 'walkHeatCalled', from: 'market' });
    })
  );

  it.effect('the club heat running out: the den lads call', () =>
    Effect.gen(function* () {
      const { events } = yield* step(
        (s) => {
          const st = phone(s);
          st.world.places.den = true;
          st.world.heat.club = 1;
        },
        { seed: QUIET }
      );
      expect(events).toContainEqual({ type: 'walkHeatCalled', from: 'club' });
    })
  );

  it.effect('no call about the heat without the den', () =>
    Effect.gen(function* () {
      const { types } = yield* step(
        (s) => {
          phone(s).world.heat.market = 1;
        },
        { seed: QUIET }
      );
      expect(types).not.toContain('walkHeatCalled');
    })
  );
});

describe('walk: on the way', () => {
  // seed 0: both den quests roll 0 out of 20
  it.effect('the den needs help: a call when the hero knows the den and has a phone', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step((s) => (phone(s).world.places.den = true), { seed: 0 });
      expect(st.world.den.helpQuest).toBe(true);
      expect(events.slice(1, 3)).toEqual([
        { type: 'walkDenQuest', quest: 'help' },
        { type: 'walkDenCalledForHelp' },
      ]);
    })
  );

  it.effect('a den quest without a phone: no call', () =>
    Effect.gen(function* () {
      const { st, types } = yield* step((s) => (hero(s).world.places.den = true), { seed: 0 });
      expect([st.world.den.helpQuest, st.world.den.jobQuest]).toEqual([true, true]);
      expect(types).not.toContain('walkDenCalledForHelp');
      expect(types).not.toContain('walkDenCalledForJob');
    })
  );

  // seed 1: the job quest rolls 0 out of 20 (the help quest is taken already)
  it.effect('the den has a job: a call with respect 100', () =>
    Effect.gen(function* () {
      const job = (respect: number) => (s: GameState) => {
        const st = phone(s);
        st.world.places.den = true;
        st.world.den.helpQuest = true;
        st.player.respect = respect;
      };
      const called = yield* step(job(100), { seed: 1 });
      expect(called.st.world.den.jobQuest).toBe(true);
      expect(called.types).toEqual([
        'walkStepped',
        'walkDenQuest',
        'walkDenCalledForJob',
        'walkQuiet',
      ]);
      const unknown = yield* step(job(99), { seed: 1 });
      expect(unknown.st.world.den.jobQuest).toBe(true);
      expect(unknown.types).not.toContain('walkDenCalledForJob');
    })
  );

  it.effect('a wrong number (seed 302: 0 out of 200)', () =>
    Effect.gen(function* () {
      const { types } = yield* step(phone, { seed: 302 });
      expect(types).toEqual(['walkStepped', 'walkWrongNumber', 'walkQuiet']);
    })
  );

  it.effect('the girlfriend calls (seed 310: 0 out of 100)', () =>
    Effect.gen(function* () {
      const { types } = yield* step((s) => (phone(s).world.places.girlfriend = true), {
        seed: 310,
      });
      expect(types).toEqual(['walkStepped', 'walkGirlfriendCalled', 'walkQuiet']);
    })
  );

  it.effect('the hospital is found (seed 18: 0 out of 10)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step((s) => (hero(s).world.places.hospital = false), {
        seed: 18,
      });
      expect(st.world.places.hospital).toBe(true);
      expect(events).toContainEqual({ type: 'walkFound', place: 'hospital' });
    })
  );

  it.effect('a known place is not found again (seed 18)', () =>
    Effect.gen(function* () {
      const { types } = yield* step(hero, { seed: 18 });
      expect(types).not.toContain('walkFound');
    })
  );

  it.effect('the gym is found (seed 679: 0 out of 100)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step(hero, { seed: 679 });
      expect(st.world.places.gym).toBe(true);
      expect(events).toContainEqual({ type: 'walkFound', place: 'gym' });
    })
  );

  // seed 2: the ring «Помилуй» rolls 0 out of 20
  it.effect('the ring «Помилуй» heals the leg', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step(
        (s) => {
          const st = hero(s);
          st.player.body.hands.rings.pomiluy = true;
          st.player.injuries.leg = true;
        },
        { seed: 2 }
      );
      expect(st.player.injuries.leg).toBe(false);
      expect(events).toContainEqual({ type: 'walkHealed', injury: 'leg' });
    })
  );

  it.effect('the ring «Помилуй» heals the jaw first, the leg stays broken', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step(
        (s) => {
          const st = hero(s);
          st.player.body.hands.rings.pomiluy = true;
          st.player.injuries.leg = true;
          st.player.injuries.jaw = true;
        },
        { seed: 2 }
      );
      expect([st.player.injuries.jaw, st.player.injuries.leg]).toEqual([false, true]);
      expect(events.filter((e) => e.type === 'walkHealed')).toEqual([
        { type: 'walkHealed', injury: 'jaw' },
      ]);
    })
  );

  it.effect('a вор finds money (seed 2)', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step((s) => (hero(s).player.type = 'vor'), { seed: 2 });
      const found = events.find((e) => e.type === 'walkMoneyFound');
      expect(found).toBeDefined();
      expect(st.player.resources.money).toBe(found?.type === 'walkMoneyFound' ? found.money : -1);
    })
  );

  it.effect('the path: the trail toggles (seed 2)', () =>
    Effect.gen(function* () {
      const { st, types } = yield* step(hero, { seed: 2 });
      expect(st.world.trail).toBe(true);
      expect(types).toEqual(['walkStepped', 'walkTrailToggled']);
    })
  );
});

describe('walk: a pretty girl', () => {
  it.effect('with a girlfriend already it is very quiet (seed 8)', () =>
    Effect.gen(function* () {
      const { types } = yield* step((s) => (hero(s).world.places.girlfriend = true), { seed: 8 });
      expect(types).toEqual(['walkStepped', 'walkVeryQuiet']);
    })
  );

  it.effect('passing her by', () =>
    Effect.gen(function* () {
      const { st, types } = yield* step(hero, { seed: 8, keys: keys('n') });
      expect(st.world.places.girlfriend).toBe(false);
      expect(types).toEqual(['walkStepped', 'walkGirlSeen']);
    })
  );

  it.effect('she likes the hero (seed 27)', () =>
    Effect.gen(function* () {
      const { st, types } = yield* step(hero, { seed: 27, keys: keys('y') });
      expect(st.world.places.girlfriend).toBe(true);
      expect(types).toEqual(['walkStepped', 'walkGirlSeen', 'walkGirlWon']);
    })
  );

  it.effect('she does not (seed 8)', () =>
    Effect.gen(function* () {
      const { st, types } = yield* step(hero, { seed: 8, keys: keys('y') });
      expect(st.world.places.girlfriend).toBe(false);
      expect(types).toEqual(['walkStepped', 'walkGirlSeen', 'walkGirlLost']);
    })
  );
});

describe('walk: someone comes along', () => {
  // seed 13: a calm lad
  it.effect('a calm one is let go', () =>
    Effect.gen(function* () {
      const { st, events } = yield* step(hero, { seed: 13, keys: keys('n') });
      expect(events.slice(1)).toEqual([{ type: 'walkMet', calm: true }]);
      expect(st.battle).toBeNull();
    })
  );

  it.effect('picking on him starts a fight', () =>
    Effect.gen(function* () {
      const { events } = yield* step(hero, { seed: 13, keys: keys('y') });
      expect(events.slice(1)).toEqual([
        { type: 'walkMet', calm: true },
        { type: 'greeting', by: 'enemy' },
        { type: 'fightStarted' },
        { type: 'prompt', context: 'fight' },
      ]);
    })
  );

  it.effect('one looking for trouble notices the hero (seed 26)', () =>
    Effect.gen(function* () {
      const { events } = yield* step(hero, { seed: 26, keys: keys('n') });
      expect(events.slice(1)).toEqual([
        { type: 'walkMet', calm: false },
        { type: 'walkNoticed' },
        { type: 'greeting', by: 'enemy' },
        { type: 'fightStarted' },
        { type: 'prompt', context: 'fight' },
      ]);
    })
  );

  it.effect('or the hero slips away (seed 38)', () =>
    Effect.gen(function* () {
      const { events } = yield* step(hero, { seed: 38, keys: keys('n') });
      expect(events.slice(1)).toEqual([
        { type: 'walkMet', calm: false },
        { type: 'walkSlippedAway' },
      ]);
    })
  );

  it.effect('after the fight the walk is over and the enemy gone', () =>
    Effect.gen(function* () {
      // level 0 runs away for free
      const { st, types } = yield* step(hero, { seed: 13, keys: keys('y', 'run') });
      expect(types.at(-1)).toBe('fledUnranked');
      expect(st.battle).toBeNull();
    })
  );

  it.effect('a cop: the hero hides (seed 39)', () =>
    Effect.gen(function* () {
      const { types } = yield* step(hero, { seed: 39 });
      expect(types).toEqual(['walkStepped', 'walkCopMet', 'walkCopHidden']);
    })
  );

  // seed 7: a cop who sees the hero
  it.effect('a cop: the glasses fool him', () =>
    Effect.gen(function* () {
      const { types } = yield* step((s) => (hero(s).player.body.eyes.glasses = true), {
        seed: 7,
      });
      expect(types).toEqual(['walkStepped', 'walkCopMet', 'walkCopFooled']);
    })
  );

  it.effect('a cop: spotted, a fight', () =>
    Effect.gen(function* () {
      const { events } = yield* step(hero, { seed: 7 });
      expect(events.slice(1)).toEqual([
        { type: 'walkCopMet' },
        { type: 'walkCopSpotted' },
        { type: 'greeting', by: 'enemy' },
        { type: 'fightStarted' },
        { type: 'prompt', context: 'fight' },
      ]);
    })
  );
});

describe('walk: nothing happens', () => {
  it.effect('stoned: floating (seed 30)', () =>
    Effect.gen(function* () {
      const { types } = yield* step((s) => (hero(s).player.stoned = 5), { seed: 30 });
      expect(types).toEqual(['walkStepped', 'walkFloating', 'walkQuiet']);
    })
  );

  it.effect('stoned: a glitch, whatever the hero answers (seed 5)', () =>
    Effect.gen(function* () {
      const { events, types } = yield* step((s) => (hero(s).player.stoned = 5), {
        seed: 5,
        keys: keys('hi'),
      });
      expect(types).toEqual(['walkStepped', 'walkGlitch', 'walkGlitchGone']);
      expect(events[1]).toMatchObject({ type: 'walkGlitch', level: expect.any(Number) });
    })
  );
});

describe('walk: rare encounters', () => {
  it.effect('the temple is the whole walk (seed 23)', () =>
    Effect.gen(function* () {
      const { types } = yield* step(hero, { seed: 23 });
      expect(types).toEqual([
        'walkStepped',
        'templeEntered',
        'templeBlessed',
        'templeLeft',
        'walkQuiet',
      ]);
    })
  );

  it.effect('the mage comes along (seed 68)', () =>
    Effect.gen(function* () {
      const { types } = yield* step(hero, { seed: 68 });
      expect(types).toEqual(['walkStepped', 'mageMet']);
    })
  );
});
