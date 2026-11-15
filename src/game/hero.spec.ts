import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import { drinkBeer, levelUp } from './hero';

describe('levelUp (0000:2526)', () => {
  it.effect('spends experience, raises two stats per level and records them', () =>
    Effect.gen(function* () {
      const { st, mem, lines, rand } = yield* play(levelUp(false), {
        seed: 9,
        setup: (s) => (hero(s), (s.exp = 25)),
      });
      expect([st.level, st.exp, st.expNext]).toEqual([1, 15, 20]);
      expect(rand.map((r) => r.n)).toEqual([12, 12]); // Отморозок weights 5+2+4+1
      expect(st.str + st.agi + st.vit + st.luck).toBe(5 + 2 + 4 + 1 + 2);
      expect(mem.history(1)).toMatch(/^[1-4]{2}$/);
      expect(lines.at(-1)).toBe('Сейчас у тебя 15 качков опыта. До слеующей прокачки надо 20');
    })
  );

  it.effect('several levels at once', () =>
    Effect.gen(function* () {
      const { st } = yield* play(levelUp(false), {
        setup: (s) => (hero(s), (s.exp = 10 + 20 + 30 + 5)),
      });
      expect([st.level, st.exp, st.expNext]).toEqual([3, 5, 40]);
    })
  );

  it.effect('level 40 is the cap outside of the rector fight', () =>
    Effect.gen(function* () {
      const capped = yield* play(levelUp(false), {
        setup: (s) => (hero(s), (s.level = 40), (s.exp = 500)),
      });
      expect(capped.st.level).toBe(40);
      expect(capped.rand).toHaveLength(0);
      const rector = yield* play(levelUp(true), {
        setup: (s) => (hero(s), (s.level = 40), (s.exp = 500)),
      });
      expect(rector.st.level).toBeGreaterThan(40);
    })
  );
});

describe('drinkBeer (0000:29C4)', () => {
  it.effect('h drinks one beer for up to 5 health', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drinkBeer('h'), {
        setup: (s) => (hero(s), (s.hp = 20), (s.beer = 3)),
      });
      expect([st.hp, st.beer]).toEqual([25, 2]);
      expect(lines).toEqual(['Пиво прибавляет 5з. Здоровья:25/35. Осталось 1.0л. пива']);
    })
  );

  it.effect('mh drinks until healthy and reports once', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drinkBeer('mh'), {
        setup: (s) => (hero(s), (s.hp = 22), (s.beer = 5)),
      });
      expect([st.hp, st.beer]).toEqual([35, 2]);
      expect(lines).toEqual(['Пиво прибавляет 13з. Здоровья:35/35. Осталось 1.0л. пива']);
    })
  );

  it.effect('a broken jaw stops drinking', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(drinkBeer('mh'), {
        setup: (s) => (hero(s), (s.hp = 10), (s.beer = 5), (s.jawBroken = 1)),
      });
      expect([st.hp, st.beer]).toEqual([10, 5]);
      expect(lines[0]).toBe('Ты не можешь пить пиво из-за сломаной челюсти.');
    })
  );

  it.effect('other commands do nothing', () =>
    Effect.gen(function* () {
      const { lines } = yield* play(drinkBeer('w'), { setup: hero });
      expect(lines).toEqual([]);
    })
  );
});
