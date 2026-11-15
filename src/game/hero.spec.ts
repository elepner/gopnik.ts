import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { i16 } from '../../src/tp/num';
import { hero, play } from '../../test/game';
import { attr, set } from '../state/attributes';
import { has } from '../state/items';
import { type GameState as State, playing } from '../state/state';
import { District } from '../tp/brands';
import { drink } from './beer';
import type { GameEvent } from './events';
import {
  beerTenths,
  blessStrength,
  gainExp,
  healthColor,
  levelDown,
  levelInDistrict,
  levelUp,
  lostStats,
  strengthUp,
  take,
} from './hero';

/** the hero after `change`, without running any game procedure */
function after(change: (s: State) => void) {
  return Effect.map(play(Effect.void, { setup: (s) => (hero(s), change(s)) }), ({ st }) => st);
}

const stats = (st: ReturnType<typeof playing>) =>
  (['strength', 'agility', 'vitality', 'damageMin', 'damageMax', 'healthMax'] as const)
    .map((k) => attr(st.player, k))
    .concat(st.player.health.current);

describe('levelUp (0000:2526)', () => {
  it.effect('spends experience, raises two stats per level and records them', () =>
    Effect.gen(function* () {
      const { st, lines, rand } = yield* play(levelUp(false), {
        seed: 9,
        setup: (s) => (hero(s), (s.player.progression.exp = 25)),
      });
      expect([
        st.player.progression.level,
        st.player.progression.exp,
        st.player.progression.expNext,
      ]).toEqual([1, 15, 20]);
      expect(rand.map((r) => r.n)).toEqual([12, 12]); // Отморозок weights 5+2+4+1
      expect(
        attr(st.player, 'strength') +
          attr(st.player, 'agility') +
          attr(st.player, 'vitality') +
          attr(st.player, 'luck')
      ).toBe(5 + 2 + 4 + 1 + 2);
      expect(st.player.progression.history[1]).toHaveLength(2);
      expect(lines.at(-1)).toBe('Сейчас у тебя 15 качков опыта. До слеующей прокачки надо 20');
    })
  );

  it.effect('several levels at once', () =>
    Effect.gen(function* () {
      const { st } = yield* play(levelUp(false), {
        setup: (s) => (hero(s), (s.player.progression.exp = i16(10 + 20 + 30 + 5))),
      });
      expect([
        st.player.progression.level,
        st.player.progression.exp,
        st.player.progression.expNext,
      ]).toEqual([3, 5, 40]);
    })
  );

  it.effect('level 40 is the cap outside of the rector fight', () =>
    Effect.gen(function* () {
      const capped = yield* play(levelUp(false), {
        setup: (s) => (
          hero(s),
          (s.player.progression.level = 40),
          (s.player.progression.exp = 500)
        ),
      });
      expect(capped.st.player.progression.level).toBe(40);
      expect(capped.rand).toHaveLength(0);
      const rector = yield* play(levelUp(true), {
        setup: (s) => (
          hero(s),
          (s.player.progression.level = 40),
          (s.player.progression.exp = 500)
        ),
      });
      expect(rector.st.player.progression.level).toBeGreaterThan(40);
    })
  );
});

describe('levelUp: events and stats', () => {
  it.effect('not enough experience: nothing happens, nothing is rolled', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { rand } = yield* play(levelUp(false), {
        events,
        setup: (s) => (hero(s), (s.player.progression.exp = 9)),
      });
      expect(events).toEqual([]);
      expect(rand).toEqual([]);
    })
  );

  it.effect('two strength points: damage, health and the minimum damage on an even strength', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      // seed 0: Random(12) rolls two strength points (1..5 of the weights 5+2+4+1)
      const { st } = yield* play(levelUp(false), {
        seed: 0,
        events,
        setup: (s) => (hero(s), (s.player.progression.exp = 10)),
      });
      expect(events).toEqual([
        { type: 'heroExpSpent', levels: 1 },
        { type: 'heroLevelGained', gains: ['strength', 'strength'] },
        { type: 'heroExpLeft' },
      ]);
      expect(stats(st)).toEqual([7, 2, 4, 3, 7, 37, 37]);
      expect(st.player.progression.history[1]).toEqual(['strength', 'strength']);
    })
  );

  it.effect('two vitality points: 5 health each', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      // seed 19: two vitality points
      const { st } = yield* play(levelUp(false), {
        seed: 19,
        events,
        setup: (s) => (hero(s), (s.player.progression.exp = 10)),
      });
      expect(events).toContainEqual({ type: 'heroLevelGained', gains: ['vitality', 'vitality'] });
      expect(stats(st)).toEqual([5, 2, 6, 2, 5, 45, 45]);
    })
  );

  it.effect('agility raises only itself', () =>
    Effect.gen(function* () {
      // seed 15: two agility points
      const { st } = yield* play(levelUp(false), {
        seed: 15,
        setup: (s) => (hero(s), (s.player.progression.exp = 10)),
      });
      expect(stats(st)).toEqual([5, 4, 4, 2, 5, 35, 35]);
    })
  );

  it.effect('at the cap the experience is still spent, but no level is gained', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(levelUp(false), {
        events,
        setup: (s) => (hero(s), (s.player.progression.level = 40), (s.player.progression.exp = 25)),
      });
      expect(events).toEqual([{ type: 'heroExpSpent', levels: 1 }, { type: 'heroExpLeft' }]);
      expect([st.player.progression.exp, st.player.progression.expNext]).toEqual([15, 20]);
    })
  );

  it.effect('the rector fights say nothing about the experience left', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(levelUp(true), {
        events,
        setup: (s) => (hero(s), (s.player.progression.exp = 10)),
      });
      expect(events.map((e) => e.type)).toEqual(['heroExpSpent', 'heroLevelGained']);
      expect(st.player.progression.level).toBe(1);
    })
  );
});

describe('gainExp and strengthUp', () => {
  it.effect('experience from a place, then the level-up it pays for', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(gainExp(12), {
        seed: 0,
        events,
        setup: (s) => (hero(s), (s.player.progression.exp = 3)),
      });
      expect(events.map((e) => e.type)).toEqual([
        'heroExpGained',
        'heroExpSpent',
        'heroLevelGained',
        'heroExpLeft',
      ]);
      expect(events[0]).toEqual({ type: 'heroExpGained', exp: 12 });
      expect([st.player.progression.level, st.player.progression.exp]).toEqual([1, 5]);
    })
  );

  it.effect('experience short of a level is only added', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(gainExp(4), { events, setup: hero });
      expect(events).toEqual([{ type: 'heroExpGained', exp: 4 }]);
      expect(st.player.progression.exp).toBe(4);
    })
  );

  it.effect(
    'the temple: +1 strength, health, maximum damage; the minimum on an even strength',
    () =>
      Effect.gen(function* () {
        const events: GameEvent[] = [];
        const even = yield* play(strengthUp, { events, setup: hero });
        expect(events).toEqual([{ type: 'heroStrengthGained' }]);
        expect(stats(even.st)).toEqual([6, 2, 4, 3, 6, 36, 36]);
        const odd = yield* after(
          (s) => (set(s.player, 'strength', 6), blessStrength(playing(s).player))
        );
        expect(stats(odd)).toEqual([7, 2, 4, 2, 6, 36, 36]);
      })
  );
});

describe('levelDown: running away', () => {
  /** a level-3 hero whose last level-up gave `lost` */
  const level3 = (lost: ('strength' | 'agility' | 'vitality' | 'luck')[]) => (s: State) => {
    const st = playing(s);
    st.player.progression.level = 3;
    st.player.progression.expNext = 40;
    st.player.progression.exp = 12;
    st.player.progression.history[3] = lost;
  };

  it.effect('takes back the level, its stats and 10 of the next level', () =>
    Effect.gen(function* () {
      const st = yield* after((s) => (level3(['agility', 'luck'])(s), levelDown(playing(s))));
      expect([
        st.player.progression.level,
        st.player.progression.expNext,
        st.player.progression.exp,
        attr(st.player, 'agility'),
        attr(st.player, 'luck'),
      ]).toEqual([2, 30, 12, 1, 0]);
      expect(st.player.progression.history[3]).toEqual([]);
    })
  );

  it.effect('the experience stays below the next level', () =>
    Effect.gen(function* () {
      const st = yield* after(
        (s) => (level3([])(s), (s.player.progression.exp = 35), levelDown(playing(s)))
      );
      expect([st.player.progression.exp, st.player.progression.expNext]).toEqual([29, 30]);
    })
  );

  it.effect('strength takes damage and maximum health, the minimum damage on an odd strength', () =>
    Effect.gen(function* () {
      const st = yield* after((s) => (level3(['strength', 'strength'])(s), levelDown(playing(s))));
      // 5 → 4 (even: no change) → 3 (odd: -1)
      expect(stats(st)).toEqual([3, 2, 4, 1, 3, 33, 33]);
    })
  );

  it.effect('vitality takes 5 maximum health; health is cut down to the maximum', () =>
    Effect.gen(function* () {
      const st = yield* after((s) => (level3(['vitality'])(s), levelDown(playing(s))));
      expect([attr(st.player, 'healthMax'), st.player.health.current]).toEqual([30, 30]);
      const hurt = yield* after(
        (s) => (level3(['vitality'])(s), (s.player.health.current = 12), levelDown(playing(s)))
      );
      expect(hurt.player.health.current).toBe(12);
    })
  );

  it.effect('lostStats reads the last level-up', () =>
    Effect.gen(function* () {
      const st = yield* after(level3(['luck', 'vitality']));
      expect(lostStats(st)).toEqual(['luck', 'vitality']);
      const fresh = yield* after(() => undefined);
      expect(lostStats(fresh)).toEqual([]);
    })
  );
});

describe('take: a found thing', () => {
  it.effect('goes into its slot; a ring of the chain heals what it adds', () =>
    Effect.gen(function* () {
      const st = yield* after((s) => (take(playing(s), 'megaRing'), take(playing(s), 'phone')));
      expect([has(st.player.body, 'megaRing'), has(st.player.body, 'phone')]).toEqual([true, true]);
      expect([attr(st.player, 'healthMax'), st.player.health.current]).toEqual([35 + 24, 35 + 24]);
      const spasi = yield* after((s) => take(playing(s), 'spasiRing'));
      expect(spasi.player.health.current).toBe(35);
    })
  );
});

describe('pure helpers', () => {
  it('healthColor: red up to 25%, yellow up to 50%, green above', () => {
    expect([25, 26, 50, 51].map((hp) => healthColor(hp, 100))).toEqual([
      'red',
      'yellow',
      'yellow',
      'green',
    ]);
  });

  it('beerTenths: half-litres show as .5', () => {
    expect([0, 1, 2, 3].map(beerTenths)).toEqual([0, 5, 0, 5]);
  });

  it.effect('levelInDistrict counts 10 levels per district', () =>
    Effect.gen(function* () {
      const st = yield* after(
        (s) => ((s.world.district = District(3)), (s.player.progression.level = 23))
      );
      expect(levelInDistrict(st)).toBe(3);
    })
  );
});

describe('drinkBeer (0000:29C4)', () => {
  it.effect('one drinks one beer for up to 5 health', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drink('one'), {
        setup: (s) => (hero(s), (s.player.health.current = 20), (s.player.resources.beer = 3)),
      });
      expect([st.player.health.current, st.player.resources.beer]).toEqual([25, 2]);
      expect(lines).toEqual(['Пиво прибавляет 5з. Здоровья:25/35. Осталось 1.0л. пива']);
    })
  );

  it.effect('untilHealthy drinks until healthy and reports once', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drink('untilHealthy'), {
        setup: (s) => (hero(s), (s.player.health.current = 22), (s.player.resources.beer = 5)),
      });
      expect([st.player.health.current, st.player.resources.beer]).toEqual([35, 2]);
      expect(lines).toEqual(['Пиво прибавляет 13з. Здоровья:35/35. Осталось 1.0л. пива']);
    })
  );

  it.effect('a broken jaw stops drinking', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drink('untilHealthy'), {
        setup: (s) => (
          hero(s),
          (s.player.health.current = 10),
          (s.player.resources.beer = 5),
          (s.player.injuries.jaw = true)
        ),
      });
      expect([st.player.health.current, st.player.resources.beer]).toEqual([10, 5]);
      expect(lines[0]).toBe('Ты не можешь пить пиво из-за сломаной челюсти.');
    })
  );
});
