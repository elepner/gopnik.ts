import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { i16 } from '../../src/tp/num';
import { hero, play } from '../../test/game';
import type { GameState as State } from '../state/state';
import { TypeId } from '../tp/brands';
import { fight } from './fight';

/** a sturdy Гопник of level 5 in front of the hero */
function enemy(st: State) {
  st.enemy.type = TypeId(5);
  st.enemy.level = 5;
  st.enemy.stats.strength = 6;
  st.enemy.stats.agility = 4;
  st.enemy.stats.vitality = 6;
  st.enemy.stats.luck = 2;
  st.enemy.damage.min = 3;
  st.enemy.damage.max = 6;
  st.enemy.health.max = 46;
  st.enemy.health.current = 46;
}

const keys = (line: string) => [...line, 'enter'];

describe('fight (0000:3D11)', () => {
  it.effect('running away takes back the last level-up', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(fight(0), {
        keys: keys('run'),
        setup: (s) => {
          hero(s);
          enemy(s);
          s.player.progression.level = 3;
          s.player.progression.expNext = 40;
          s.player.progression.exp = 39;
          s.player.progression.history[3] = ['strength', 'agility'];
        },
      });
      expect([
        st.player.stats.strength,
        st.player.stats.agility,
        st.player.damage.max,
        st.player.health.max,
      ]).toEqual([4, 1, 4, 34]);
      expect([
        st.player.progression.level,
        st.player.progression.expNext,
        st.player.progression.exp,
      ]).toEqual([2, 30, 29]);
      expect(st.player.progression.history[3]).toEqual([]);
      expect(lines).toEqual(
        expect.arrayContaining(['Враг: Трусливый засранец! ', 'Сила -1 ', 'Ловкость -1 '])
      );
    })
  );

  it.effect('no running on a broken leg or from the rector', () =>
    Effect.gen(function* () {
      const leg = yield* play(fight(0), {
        keys: keys('run'),
        setup: (s) => (hero(s), enemy(s), (s.player.injuries.leg = true)),
      });
      expect(leg.lines).toContain('Ты не можешь убежать на сломаной ноге.');
      const rector = yield* play(fight(3), {
        keys: [' ', ' ', ' ', ' ', ...keys('run')],
        setup: (s) => (hero(s), enemy(s), (s.world.rector = true)),
      });
      expect(rector.lines).toContain('Ректор: Кудa? Стоять! Бейся до конца трусливый урод!');
    })
  );

  it.effect('a joint in a fight: 3 turns stoned, +2 strength, up to 10 health', () =>
    Effect.gen(function* () {
      const { st } = yield* play(fight(0), {
        keys: [...keys('kos'), ...keys('run')],
        setup: (s) => (
          hero(s),
          enemy(s),
          (s.player.resources.joints = 2),
          (s.player.health.current = 20)
        ),
      });
      expect([
        st.player.resources.joints,
        st.player.stoned,
        st.player.stats.strength,
        st.player.damage.min,
        st.player.damage.max,
        st.player.health.current,
      ]).toEqual([1, 3, 7, 3, 7, 30]);
    })
  );

  it.effect('the crit check calls Random(100) after the damage roll, even with negative luck', () =>
    Effect.gen(function* () {
      for (const luck of [3, -642]) {
        const { rand } = yield* play(fight(0), {
          seed: 5,
          keys: keys('k'),
          setup: (s) => (
            hero(s),
            enemy(s),
            (s.player.stats.luck = i16(luck)),
            (s.player.stats.agility = 20)
          ),
        });
        // Random(100) to hit, Random(dmgMax - dmgMin) damage, Random(100) crit — no skipping
        expect(rand.slice(0, 3).map((r) => r.n)).toEqual([100, 3, 100]);
      }
    })
  );

  it.effect('winning pays experience, loot and a beer', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(fight(0), {
        seed: 2,
        keys: [...keys('k'), ...keys('k'), ...keys('k'), ...keys('k'), ...keys('k')],
        setup: (s) => {
          hero(s);
          enemy(s);
          s.enemy.health.current = 1;
          s.enemy.loot.money = 7;
          s.enemy.loot.junk = 3;
          s.enemy.loot.beer = 1;
          s.player.stats.agility = 30;
          s.player.health.current = 20;
          s.player.progression.expNext = 100; // no level-up in between
        },
      });
      expect(lines).toContain('Враг сдох.');
      expect(lines).toContain('За отпин врага ты получаешь 18 качков опыта');
      expect([
        st.player.resources.money,
        st.player.resources.junk,
        st.player.resources.beer,
      ]).toEqual([7, 3, 1]);
      expect(st.player.health.current).toBe(25);
    })
  );
});
