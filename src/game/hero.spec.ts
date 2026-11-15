import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { i16 } from '../../src/tp/num';
import { hero, play } from '../../test/game';
import { drinkBeer, levelUp } from './hero';

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
        st.player.stats.strength +
          st.player.stats.agility +
          st.player.stats.vitality +
          st.player.stats.luck
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

describe('drinkBeer (0000:29C4)', () => {
  it.effect('one drinks one beer for up to 5 health', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drinkBeer('one'), {
        setup: (s) => (hero(s), (s.player.health.current = 20), (s.player.resources.beer = 3)),
      });
      expect([st.player.health.current, st.player.resources.beer]).toEqual([25, 2]);
      expect(lines).toEqual(['Пиво прибавляет 5з. Здоровья:25/35. Осталось 1.0л. пива']);
    })
  );

  it.effect('untilHealthy drinks until healthy and reports once', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drinkBeer('untilHealthy'), {
        setup: (s) => (hero(s), (s.player.health.current = 22), (s.player.resources.beer = 5)),
      });
      expect([st.player.health.current, st.player.resources.beer]).toEqual([35, 2]);
      expect(lines).toEqual(['Пиво прибавляет 13з. Здоровья:35/35. Осталось 1.0л. пива']);
    })
  );

  it.effect('a broken jaw stops drinking', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drinkBeer('untilHealthy'), {
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
