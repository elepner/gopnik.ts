import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import { ENEMIES } from '../state/kinds';
import { District } from '../tp/brands';
import { div, i16 } from '../tp/num';
import { setupRector, spawnEnemy } from './enemy';

describe('spawnEnemy (0000:0D14)', () => {
  it.effect('derived stats follow the type weights and the level', () =>
    Effect.gen(function* () {
      for (let seed = 1; seed <= 150; seed++) {
        const { st } = yield* play(spawnEnemy(0), {
          seed,
          setup: (s) => {
            hero(s);
            s.world.district = District((seed % 4) + 1);
            s.player.progression.level = i16(seed % 40);
          },
        });
        const { tier, weights } = ENEMIES[st.enemy.type];
        const { strength: w0, agility: w1, vitality: w2, luck: w3 } = weights;
        expect(tier).toBeLessThanOrEqual(9); // the rector never walks the streets
        expect(
          st.enemy.stats.strength +
            st.enemy.stats.agility +
            st.enemy.stats.vitality +
            st.enemy.stats.luck
        ).toBe((w0 + w1 + w2 + w3 + st.enemy.level * 2) & 0xff);
        expect(st.enemy.health.max).toBe(
          st.enemy.stats.vitality * 5 + st.enemy.stats.strength + 10
        );
        expect(st.enemy.health.current).toBe(st.enemy.health.max);
        expect([st.enemy.damage.min, st.enemy.damage.max]).toEqual([
          div(st.enemy.stats.strength, 2),
          st.enemy.stats.strength,
        ]);
        expect(st.enemy.loot.money).toBeGreaterThanOrEqual(0);
        expect(st.enemy.loot.junk).toBeGreaterThanOrEqual(0);
      }
    })
  );

  it.effect(
    'caught thieves never meet anyone above Беспредельщик; the den job always brings a cop',
    () =>
      Effect.gen(function* () {
        for (let seed = 1; seed <= 60; seed++) {
          const caught = yield* play(spawnEnemy(1), {
            seed,
            setup: (s) => (hero(s), (s.world.district = District(4)), (s.world.trail = true)),
          });
          expect(ENEMIES[caught.st.enemy.type].tier).toBeLessThanOrEqual(
            ENEMIES.bespredelshchik.tier
          );
          const job = yield* play(spawnEnemy(2), { seed, setup: hero });
          expect(job.st.enemy.type).toBe('ment');
        }
      })
  );

  it.effect('Random order: type, district bonus, then level parts right-to-left', () =>
    Effect.gen(function* () {
      const { rand } = yield* play(spawnEnemy(0), {
        seed: 3,
        setup: (s) => (hero(s), (s.world.district = District(2))),
      });
      expect(rand.slice(0, 6).map((r) => r.n)).toEqual([51, 2, 2, 5, 2, 2]);
    })
  );
});

describe('setupRector (0000:11C2)', () => {
  it.effect('the fake and the real rector have fixed stats', () =>
    Effect.gen(function* () {
      const fake = yield* play(setupRector(0), { setup: hero });
      expect([
        fake.st.enemy.type,
        fake.st.enemy.level,
        fake.st.enemy.health.max,
        fake.st.enemy.armor,
      ]).toEqual(['rector', 125, 41 + 123 * 5 + 10, 60]);
      const real = yield* play(setupRector(1), { setup: hero });
      expect([
        real.st.enemy.level,
        real.st.enemy.stats.strength,
        real.st.enemy.health.max,
        real.st.enemy.armor,
      ]).toEqual([160, 50, 50 + 188 * 5 + 10, 80]);
      expect(real.rand).toHaveLength(0);
    })
  );
});
