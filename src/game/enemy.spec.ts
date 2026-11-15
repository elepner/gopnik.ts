import { describe, expect, it } from '@effect/vitest';
import { Effect } from 'effect';

import { hero, play } from '../../test/game';
import { STAT_WEIGHTS } from '../data/tables';
import { District } from '../tp/brands';
import { div } from '../tp/num';
import { setupRector, spawnEnemy } from './enemy';

describe('spawnEnemy (0000:0D14)', () => {
  it.effect('derived stats follow the type weights and the level', () =>
    Effect.gen(function* () {
      for (let seed = 1; seed <= 150; seed++) {
        const { st } = yield* play(spawnEnemy(0), {
          seed,
          setup: (s) => {
            hero(s);
            s.district = District((seed % 4) + 1);
            s.level = seed % 40;
          },
        });
        const [w0, w1, w2, w3] = STAT_WEIGHTS[st.eType];
        expect(st.eType).toBeGreaterThanOrEqual(0);
        expect(st.eType).toBeLessThanOrEqual(9);
        expect(st.eStr + st.eAgi + st.eVit + st.eLuck).toBe(
          (w0 + w1 + w2 + w3 + st.eLevel * 2) & 0xff
        );
        expect(st.eHpMax).toBe(st.eVit * 5 + st.eStr + 10);
        expect(st.eHp).toBe(st.eHpMax);
        expect([st.eDmgMin, st.eDmgMax]).toEqual([div(st.eStr, 2), st.eStr]);
        expect(st.eMoney).toBeGreaterThanOrEqual(0);
        expect(st.eJunk).toBeGreaterThanOrEqual(0);
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
            setup: (s) => (hero(s), (s.district = District(4)), (s.trail = 1)),
          });
          expect(caught.st.eType).toBeLessThanOrEqual(7);
          const job = yield* play(spawnEnemy(2), { seed, setup: hero });
          expect(job.st.eType).toBe(8);
        }
      })
  );

  it.effect('Random order: type, district bonus, then level parts right-to-left', () =>
    Effect.gen(function* () {
      const { rand } = yield* play(spawnEnemy(0), {
        seed: 3,
        setup: (s) => (hero(s), (s.district = District(2))),
      });
      expect(rand.slice(0, 6).map((r) => r.n)).toEqual([51, 2, 2, 5, 2, 2]);
    })
  );
});

describe('setupRector (0000:11C2)', () => {
  it.effect('the fake and the real rector have fixed stats', () =>
    Effect.gen(function* () {
      const fake = yield* play(setupRector(0));
      expect([fake.st.eType, fake.st.eLevel, fake.st.eHpMax, fake.st.eArmor]).toEqual([
        10,
        125,
        41 + 123 * 5 + 10,
        60,
      ]);
      const real = yield* play(setupRector(1));
      expect([real.st.eLevel, real.st.eStr, real.st.eHpMax, real.st.eArmor]).toEqual([
        160,
        50,
        50 + 188 * 5 + 10,
        80,
      ]);
      expect(real.rand).toHaveLength(0);
    })
  );
});
