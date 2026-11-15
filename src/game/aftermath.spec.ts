import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../test/game';
import { attr, set } from '../state/attributes';
import { has, put } from '../state/items';
import type { EnemyKind } from '../state/kinds';
import { type GameState as State, newEnemy, playing } from '../state/state';
import { District } from '../tp/brands';
import {
  beatFakeRector,
  beatRector,
  claimVictory,
  denHelpReward,
  diedInFight,
  killedByRector,
  settle,
} from './aftermath';
import { encounter, spawnEnemy } from './enemy';
import type { GameEvent } from './events';
import { Halt } from './terminal';

/** a beaten level-5 enemy (stats 6+4+6+2) with 2 beer, 7 money and 3 junk on him */
function beaten(state: State, type: EnemyKind = 'gopnik') {
  const st = playing(state);
  st.battle = { enemy: newEnemy(), backup: 0 };
  const e = st.battle.enemy;
  e.type = type;
  e.level = 5;
  Object.assign(e.stats, { strength: 6, agility: 4, vitality: 6, luck: 2 });
  Object.assign(e.loot, { beer: 2, money: 7, junk: 3 });
  return e;
}

/** a hero far from the next level, so a victory rolls nothing before its spoils */
function setup(...more: ((s: State) => void)[]) {
  return (s: State) => {
    hero(s);
    beaten(s);
    s.player.progression.expNext = 100;
    s.player.health.current = 20;
    for (const f of more) f(s);
  };
}

const types = (events: GameEvent[]) => events.map((e) => e.type);
const halted = Exit.fail(new Halt({ code: 0 }));

describe('settle: the usual aftermath', () => {
  it.effect('a victory is claimed', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(settle('won'), { seed: 2, events, setup: setup() });
      expect(types(events)).toEqual(['enemyDied', 'exp', 'tooWeak', 'spoils']);
    })
  );

  it.effect('a death ends the game', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(settle('died'), { events, setup: setup() });
      expect(exit).toStrictEqual(halted);
      expect(events).toEqual([{ type: 'heroDied' }, { type: 'gameEnded', won: false }]);
    })
  );

  it.effect('running away and being bailed out bring nothing', () =>
    Effect.gen(function* () {
      for (const outcome of ['fled', 'bailedOut'] as const) {
        const events: GameEvent[] = [];
        const { exit, rand } = yield* play(settle(outcome), { events, setup: setup() });
        expect(exit).toStrictEqual(Exit.void);
        expect(events).toEqual([]);
        expect(rand).toEqual([]);
      }
    })
  );
});

describe('claimVictory', () => {
  it.effect('experience for the stats, then the spoils: beer, money, junk, 5 health, respect', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      // seed 2: Random(30) = 1 (no ring), luck checks 17 and 21 fail for luck 1
      const { st, rand } = yield* play(claimVictory, { seed: 2, events, setup: setup() });
      expect(events).toEqual([
        { type: 'enemyDied' },
        { type: 'exp', exp: 18 },
        { type: 'tooWeak' },
        { type: 'spoils', beer: 2, money: 7, junk: 3, health: 5, respect: 5 + 1 + 1 },
      ]);
      expect(rand.map((r) => r.n)).toEqual([30, 25, 40]);
      expect([
        st.player.progression.exp,
        st.player.resources.beer,
        st.player.resources.money,
        st.player.resources.junk,
        st.player.health.current,
        st.player.respect,
      ]).toEqual([18, 2, 7, 3, 25, 7]);
    })
  );

  it.effect('the health of the spoils stops at the maximum', () =>
    Effect.gen(function* () {
      const { st } = yield* play(claimVictory, {
        seed: 2,
        setup: setup((s) => (s.player.health.current = 33)),
      });
      expect(st.player.health.current).toBe(35);
    })
  );

  it.effect('enough experience means a level-up before the spoils', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(claimVictory, {
        seed: 2,
        events,
        setup: setup((s) => (s.player.progression.expNext = 10)),
      });
      expect(types(events)).toEqual([
        'enemyDied',
        'exp',
        'heroExpSpent',
        'heroLevelGained',
        'heroExpLeft',
        'spoils',
      ]);
      expect([st.player.progression.level, st.player.progression.exp]).toEqual([1, 8]);
    })
  );

  it.effect('the third level of a district opens the den, once', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(claimVictory, {
        seed: 2,
        events,
        setup: setup((s) => (s.player.progression.level = 3)),
      });
      expect(types(events)).toContain('denOpened');
      expect(st.world.places.den).toBe(true);

      const open: GameEvent[] = [];
      yield* play(claimVictory, {
        seed: 2,
        events: open,
        setup: setup((s) => ((s.player.progression.level = 3), (s.world.places.den = true))),
      });
      expect(types(open)).not.toContain('denOpened');

      const below: GameEvent[] = [];
      yield* play(claimVictory, {
        seed: 2,
        events: below,
        setup: setup((s) => ((s.player.progression.level = 12), (s.world.district = District(2)))),
      });
      expect(types(below)).not.toContain('denOpened');
    })
  );

  it.effect('Random(30) = 0 drops the next ring of the chain, which heals what it adds', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      // seed 0: Random(30) = 0; the luck checks roll 0 (passed, but a Гопник has no joints), 34
      const { st } = yield* play(claimVictory, { seed: 0, events, setup: setup() });
      expect(events.slice(4)).toEqual([{ type: 'ringDropped', ring: 'pomogiRing' }]);
      expect(has(st.player.body, 'pomogiRing')).toBe(true);
      expect(st.player.health.current).toBe(20 + 5 + 6);
      expect(attr(st.player, 'healthMax')).toBe(35 + 6);
    })
  );

  it.effect(
    'the ring after Помоги Господи is the mega ring; with the whole chain nothing drops',
    () =>
      Effect.gen(function* () {
        const events: GameEvent[] = [];
        yield* play(claimVictory, {
          seed: 0,
          events,
          setup: setup((s) => put(s.player.body, 'pomogiRing')),
        });
        expect(events).toContainEqual({ type: 'ringDropped', ring: 'megaRing' });

        const all: GameEvent[] = [];
        const { rand } = yield* play(claimVictory, {
          seed: 0,
          events: all,
          setup: setup((s) => {
            for (const ring of ['pomogiRing', 'megaRing', 'pomiluyRing'] as const)
              put(s.player.body, ring);
          }),
        });
        expect(types(all)).not.toContain('ringDropped');
        expect(rand[0]).toEqual({ n: 30, result: 0 });
      })
  );
});

describe('loot: what a lucky hero finds', () => {
  const lucky = (s: State) => set(s.player, 'luck', 1000);

  it.effect('one of the things the kind drops', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      // seed 2: Random(30) = 1, then the pick Random(3) = 1: the second thing of a Нефор
      const { st, rand } = yield* play(claimVictory, {
        seed: 2,
        events,
        setup: setup(lucky, (s) => beaten(s, 'nefor')),
      });
      expect(rand.map((r) => r.n)).toEqual([30, 25, 40, 3]);
      expect(events.at(-1)).toEqual({ type: 'found', item: 'spasiRing' });
      expect(has(st.player.body, 'spasiRing')).toBe(true);
    })
  );

  it.effect('nothing when the hero has that thing already', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { rand } = yield* play(claimVictory, {
        seed: 2,
        events,
        setup: setup(
          lucky,
          (s) => beaten(s, 'nefor'),
          (s) => put(s.player.body, 'spasiRing')
        ),
      });
      expect(rand).toHaveLength(4);
      expect(types(events)).not.toContain('found');
    })
  );

  it.effect('a нарк has joints on him and nothing else', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      // seed 3: Random(30) = 2, luck check, joints Random(3) = 2, luck check, no pick
      const { st, rand } = yield* play(claimVictory, {
        seed: 3,
        events,
        setup: setup(lucky, (s) => beaten(s, 'nark')),
      });
      expect(rand.map((r) => r.n)).toEqual([30, 25, 3, 40]);
      expect(events.at(-1)).toEqual({ type: 'joints', joints: 2 });
      expect(st.player.resources.joints).toBe(2);
    })
  );

  it.effect('a Дохляк has nothing to pick from', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { rand } = yield* play(claimVictory, {
        seed: 2,
        events,
        setup: setup(lucky, (s) => beaten(s, 'dohlyak')),
      });
      expect(rand.map((r) => r.n)).toEqual([30, 25, 40]);
      expect(events.at(-1)?.type).toBe('spoils');
    })
  );
});

describe('the rector fights and the den', () => {
  it.effect('the fake rector is worth a level, then the usual level-up and spoils', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(beatFakeRector, {
        seed: 2,
        events,
        setup: setup(
          (s) => (
            (s.player.progression.level = 30),
            (s.player.progression.expNext = 310),
            (s.world.places.den = true)
          )
        ),
      });
      expect(types(events)).toEqual([
        'levelEarned',
        'heroExpSpent',
        'heroLevelGained',
        'fakeRectorKilled',
        'spoils',
      ]);
      expect([
        st.player.progression.level,
        st.player.progression.exp,
        st.player.progression.expNext,
      ]).toEqual([31, 0, 320]);
    })
  );

  it.effect('the real rector ends the game with the victory', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit, st } = yield* play(beatRector, {
        seed: 2,
        events,
        setup: setup(
          (s) => ((s.player.progression.level = 40), (s.player.progression.expNext = 410))
        ),
      });
      expect(exit).toStrictEqual(halted);
      expect(types(events)).toEqual([
        'levelEarned',
        'heroExpSpent',
        'heroLevelGained',
        'rectorKilled',
        'victoryCelebrated',
        'gameEnded',
      ]);
      expect(events.at(-1)).toEqual({ type: 'gameEnded', won: true });
      expect(st.player.progression.level).toBe(41);
    })
  );

  it.effect('killed by the rector: the game is over', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(killedByRector, { events, setup: setup() });
      expect(exit).toStrictEqual(halted);
      expect(events).toEqual([{ type: 'killedByRector' }, { type: 'gameEnded', won: false }]);
    })
  );

  it.effect('diedInFight is the same ending', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(diedInFight, { events, setup: setup() });
      expect(exit).toStrictEqual(halted);
      expect(types(events)).toEqual(['heroDied', 'gameEnded']);
    })
  );

  it.effect(
    'helping a lad of the den: respect and experience by the district, then a level-up',
    () =>
      Effect.gen(function* () {
        const events: GameEvent[] = [];
        const { st } = yield* play(denHelpReward, {
          seed: 2,
          events,
          setup: setup(
            (s) => (
              (s.world.district = District(2)),
              (s.player.progression.level = 10),
              (s.player.progression.expNext = 20),
              (s.player.progression.exp = 5)
            )
          ),
        });
        expect(events[0]).toEqual({ type: 'denHelped', respect: 40, exp: 20 });
        expect(types(events).slice(1)).toEqual(['heroExpSpent', 'heroLevelGained', 'heroExpLeft']);
        expect([st.player.respect, st.player.progression.level, st.player.progression.exp]).toEqual(
          [40, 11, 5]
        );
      })
  );
});

describe('a spawned enemy, beaten', () => {
  it.effect('the victory inside an encounter pays for him, then the battle is gone', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(encounter(spawnEnemy(0), settle('won')), {
        seed: 7,
        events,
        setup: (s) => (hero(s), (s.player.progression.expNext = 1000)),
      });
      expect(types(events).slice(0, 4)).toEqual(['enemyDied', 'exp', 'tooWeak', 'spoils']);
      expect(st.battle).toBeNull();
    })
  );
});
