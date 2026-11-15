import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../test/game';
import { ENEMIES } from '../state/kinds';
import { battle } from '../state/state';
import { District } from '../tp/brands';
import { div, i16, round } from '../tp/num';
import { encounter, setupRector, spawnEnemy } from './enemy';
import { halt, started } from './prelude';
import { Halt } from './terminal';

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
        const { tier, weights } = ENEMIES[battle(st).enemy.type];
        const { strength: w0, agility: w1, vitality: w2, luck: w3 } = weights;
        expect(tier).toBeLessThanOrEqual(9); // the rector never walks the streets
        expect(
          battle(st).enemy.stats.strength +
            battle(st).enemy.stats.agility +
            battle(st).enemy.stats.vitality +
            battle(st).enemy.stats.luck
        ).toBe((w0 + w1 + w2 + w3 + battle(st).enemy.level * 2) & 0xff);
        expect(battle(st).enemy.health.max).toBe(
          battle(st).enemy.stats.vitality * 5 + battle(st).enemy.stats.strength + 10
        );
        expect(battle(st).enemy.health.current).toBe(battle(st).enemy.health.max);
        expect([battle(st).enemy.damage.min, battle(st).enemy.damage.max]).toEqual([
          div(battle(st).enemy.stats.strength, 2),
          battle(st).enemy.stats.strength,
        ]);
        expect(battle(st).enemy.loot.money).toBeGreaterThanOrEqual(0);
        expect(battle(st).enemy.loot.junk).toBeGreaterThanOrEqual(0);
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
          expect(ENEMIES[battle(caught.st).enemy.type].tier).toBeLessThanOrEqual(
            ENEMIES.bespredelshchik.tier
          );
          const job = yield* play(spawnEnemy(2), { seed, setup: hero });
          expect(battle(job.st).enemy.type).toBe('ment');
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

describe('spawnEnemy: level, armor, beer', () => {
  /** Random calls of the level: district bonus, r5, below, above (after the type's 2 or 3) */
  function expectedLevel(level: number, rolls: readonly number[], trail: boolean) {
    const [bonus, r5, below, above] = rolls.slice(trail ? 3 : 2, trail ? 7 : 6);
    const raw = Math.max(0, round((level * (above! + 1)) / (below! + 1) + r5! - 2) + bonus! * 4);
    return trail ? round(raw * 1.5) : raw;
  }

  it.effect("the level follows the hero's, never below 0; the trail adds Random(4) and half", () =>
    Effect.gen(function* () {
      let clamped = 0;
      for (let seed = 1; seed <= 60; seed++) {
        for (const trail of [false, true]) {
          const level = seed % 3;
          const { st, rand } = yield* play(spawnEnemy(0), {
            seed,
            setup: (s) => (
              hero(s),
              (s.world.district = District(2)),
              (s.world.trail = trail),
              (s.player.progression.level = level)
            ),
          });
          expect(rand.slice(0, 3).map((r) => r.n)).toEqual(trail ? [51, 2, 4] : [51, 2, 2]);
          const rolls = rand.map((r) => r.result);
          expect(battle(st).enemy.level).toBe(expectedLevel(level, rolls, trail));
          if (battle(st).enemy.level === 0) clamped++;
        }
      }
      expect(clamped).toBeGreaterThan(0);
    })
  );

  it.effect('armor grows with the district: none in the first, 8..15 in the third', () =>
    Effect.gen(function* () {
      for (let seed = 1; seed <= 20; seed++) {
        const first = yield* play(spawnEnemy(0), { seed, setup: hero });
        expect(battle(first.st).enemy.armor).toBe(0);
        const third = yield* play(spawnEnemy(0), {
          seed,
          setup: (s) => (hero(s), (s.world.district = District(3))),
        });
        expect(battle(third.st).enemy.armor).toBeGreaterThanOrEqual(8);
        expect(battle(third.st).enemy.armor).toBeLessThanOrEqual(15);
        const { enemy } = battle(third.st);
        expect(enemy.loot.beer - div(enemy.level, 10)).toBeOneOf([1, 2]);
      }
    })
  );
});

describe('encounter', () => {
  it.effect('the enemy is there for the meeting and gone after it', () =>
    Effect.gen(function* () {
      const seen = Effect.map(started, (st) => battle(st).enemy.type);
      const { st, exit } = yield* play(encounter(setupRector(0), seen), { setup: hero });
      expect(exit).toStrictEqual(Exit.succeed('rector'));
      expect(st.battle).toBeNull();
    })
  );

  it.effect('also when the game ends in it', () =>
    Effect.gen(function* () {
      const { st, exit } = yield* play(encounter(spawnEnemy(0), halt), { setup: hero });
      expect(exit).toStrictEqual(Exit.fail(new Halt({ code: 0 })));
      expect(st.battle).toBeNull();
    })
  );
});

describe('setupRector (0000:11C2)', () => {
  it.effect('the fake and the real rector have fixed stats', () =>
    Effect.gen(function* () {
      const fake = yield* play(setupRector(0), { setup: hero });
      expect([
        battle(fake.st).enemy.type,
        battle(fake.st).enemy.level,
        battle(fake.st).enemy.health.max,
        battle(fake.st).enemy.armor,
      ]).toEqual(['rector', 125, 41 + 123 * 5 + 10, 60]);
      const real = yield* play(setupRector(1), { setup: hero });
      expect([
        battle(real.st).enemy.level,
        battle(real.st).enemy.stats.strength,
        battle(real.st).enemy.health.max,
        battle(real.st).enemy.armor,
      ]).toEqual([160, 50, 50 + 188 * 5 + 10, 80]);
      expect(real.rand).toHaveLength(0);
    })
  );
});
