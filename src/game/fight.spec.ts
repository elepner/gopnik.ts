import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import type { State } from '../state/layout';
import { TypeId } from '../tp/brands';
import { fight } from './fight';

/** a sturdy Гопник of level 5 in front of the hero */
function enemy(st: State) {
  st.eType = TypeId(5);
  st.eLevel = 5;
  st.eStr = 6;
  st.eAgi = 4;
  st.eVit = 6;
  st.eLuck = 2;
  st.eDmgMin = 3;
  st.eDmgMax = 6;
  st.eHpMax = 46;
  st.eHp = 46;
}

const keys = (line: string) => [...line, 'enter'];

describe('fight (0000:3D11)', () => {
  it.effect('running away takes back the last level-up', () =>
    Effect.gen(function* () {
      const { st, mem, lines } = yield* play(fight(0), {
        keys: keys('run'),
        setup: (s, m) => {
          hero(s);
          enemy(s);
          s.level = 3;
          s.expNext = 40;
          s.exp = 39;
          m.setHistory(3, '12');
        },
      });
      expect([st.str, st.agi, st.dmgMax, st.hpMax]).toEqual([4, 1, 4, 34]);
      expect([st.level, st.expNext, st.exp]).toEqual([2, 30, 29]);
      expect(mem.history(3)).toBe('');
      expect(lines).toEqual(
        expect.arrayContaining(['Враг: Трусливый засранец! ', 'Сила -1 ', 'Ловкость -1 '])
      );
    })
  );

  it.effect('no running on a broken leg or from the rector', () =>
    Effect.gen(function* () {
      const leg = yield* play(fight(0), {
        keys: keys('run'),
        setup: (s) => (hero(s), enemy(s), (s.legBroken = 1)),
      });
      expect(leg.lines).toContain('Ты не можешь убежать на сломаной ноге.');
      const rector = yield* play(fight(3), {
        keys: [' ', ' ', ' ', ' ', ...keys('run')],
        setup: (s) => (hero(s), enemy(s), (s.rector = 1)),
      });
      expect(rector.lines).toContain('Ректор: Кудa? Стоять! Бейся до конца трусливый урод!');
    })
  );

  it.effect('a joint in a fight: 3 turns stoned, +2 strength, up to 10 health', () =>
    Effect.gen(function* () {
      const { st } = yield* play(fight(0), {
        keys: [...keys('kos'), ...keys('run')],
        setup: (s) => (hero(s), enemy(s), (s.joints = 2), (s.hp = 20)),
      });
      expect([st.joints, st.stoned, st.str, st.dmgMin, st.dmgMax, st.hp]).toEqual([
        1, 3, 7, 3, 7, 30,
      ]);
    })
  );

  it.effect('the crit check calls Random(100) after the damage roll, even with negative luck', () =>
    Effect.gen(function* () {
      for (const luck of [3, -642]) {
        const { rand } = yield* play(fight(0), {
          seed: 5,
          keys: keys('k'),
          setup: (s) => (hero(s), enemy(s), (s.luck = luck), (s.agi = 20)),
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
          s.eHp = 1;
          s.eMoney = 7;
          s.eJunk = 3;
          s.eBeer = 1;
          s.agi = 30;
          s.hp = 20;
          s.expNext = 100; // no level-up in between
        },
      });
      expect(lines).toContain('Враг сдох.');
      expect(lines).toContain('За отпин врага ты получаешь 18 качков опыта');
      expect([st.money, st.junk, st.beer]).toEqual([7, 3, 1]);
      expect(st.hp).toBe(25);
    })
  );
});
