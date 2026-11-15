import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { i16 } from '../../src/tp/num';
import { hero, play } from '../../test/game';
import { attr, set } from '../state/attributes';
import { battle, type GameState as State, newEnemy, playing } from '../state/state';
import { claimVictory } from './aftermath';
import type { GameEvent } from './events';
import { fight, RECTOR_FIGHT, STREET_FIGHT } from './fight';

/** a sturdy Гопник of level 5 in front of the hero */
function enemy(state: State) {
  const st = playing(state);
  st.battle = { enemy: newEnemy(), backup: 0 };
  const e = st.battle.enemy;
  e.type = 'gopnik';
  e.level = 5;
  e.stats.strength = 6;
  e.stats.agility = 4;
  e.stats.vitality = 6;
  e.stats.luck = 2;
  e.damage.min = 3;
  e.damage.max = 6;
  e.health.max = 46;
  e.health.current = 46;
  return e;
}

const keys = (line: string) => [...line, 'enter'];

describe('fight (0000:3D11)', () => {
  it.effect('running away takes back the last level-up', () =>
    Effect.gen(function* () {
      const { st, lines } = yield* play(fight(STREET_FIGHT), {
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
        attr(st.player, 'strength'),
        attr(st.player, 'agility'),
        attr(st.player, 'damageMax'),
        attr(st.player, 'healthMax'),
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
      const leg = yield* play(fight(STREET_FIGHT), {
        keys: keys('run'),
        setup: (s) => (hero(s), enemy(s), (s.player.injuries.leg = true)),
      });
      expect(leg.lines).toContain('Ты не можешь убежать на сломаной ноге.');
      const rector = yield* play(fight(RECTOR_FIGHT), {
        keys: keys('run'),
        setup: (s) => (hero(s), enemy(s)),
      });
      expect(rector.lines).toContain('Ректор: Кудa? Стоять! Бейся до конца трусливый урод!');
    })
  );

  it.effect('a joint in a fight: 3 turns stoned, +2 strength, up to 10 health', () =>
    Effect.gen(function* () {
      const { st } = yield* play(fight(STREET_FIGHT), {
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
        attr(st.player, 'strength'),
        attr(st.player, 'damageMin'),
        attr(st.player, 'damageMax'),
        st.player.health.current,
      ]).toEqual([1, 3, 7, 3, 7, 30]);
    })
  );

  it.effect('the crit check calls Random(100) after the damage roll, even with negative luck', () =>
    Effect.gen(function* () {
      for (const luck of [3, -642]) {
        const { rand } = yield* play(fight(STREET_FIGHT), {
          seed: 5,
          keys: keys('k'),
          setup: (s) => (
            hero(s),
            enemy(s),
            set(s.player, 'luck', i16(luck)),
            set(s.player, 'agility', 20)
          ),
        });
        // Random(100) to hit, Random(dmgMax - dmgMin) damage, Random(100) crit — no skipping
        expect(rand.slice(0, 3).map((r) => r.n)).toEqual([100, 3, 100]);
      }
    })
  );

  it.effect('winning pays experience, loot and a beer', () =>
    Effect.gen(function* () {
      const won = Effect.flatMap(fight(STREET_FIGHT), (outcome) =>
        outcome === 'won' ? claimVictory : Effect.die(`not won: ${outcome}`)
      );
      const { st, lines } = yield* play(won, {
        seed: 2,
        keys: [...keys('k'), ...keys('k'), ...keys('k'), ...keys('k'), ...keys('k')],
        setup: (s) => {
          hero(s);
          const e = enemy(s);
          e.health.current = 1;
          e.loot.money = 7;
          e.loot.junk = 3;
          e.loot.beer = 1;
          set(s.player, 'agility', 30);
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

describe('the fight emits events and does not know who listens', () => {
  it.effect('one kick finishes an enemy on his last legs', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, exit } = yield* play(fight(STREET_FIGHT), {
        keys: keys('k'),
        events,
        setup: (s) => (hero(s), (enemy(s).health.current = 1)),
      });
      expect(exit).toStrictEqual(Exit.succeed('won'));
      expect(events.map((e) => e.type)).toEqual(['fightStarted', 'prompt', 'kick']);
      expect(battle(st).enemy.health.current).toBeLessThanOrEqual(0);
    })
  );

  it.effect('the kicks of both sides come up from the nested rules', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(fight(STREET_FIGHT), {
        keys: keys('k'),
        events,
        setup: (s) => (hero(s), enemy(s)),
      });
      const kicks = events.flatMap((e) => (e.type === 'kick' ? [e.by] : []));
      expect(kicks).toEqual(['hero', 'enemy']);
    })
  );
});
