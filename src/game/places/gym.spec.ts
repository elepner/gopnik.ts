import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../../test/game';
import { attr, set } from '../../state/attributes';
import type { Game, GameState } from '../../state/state';
import { District } from '../../tp/brands';
import type { GameEvent } from '../events';
import { gym, GYM_PRICE } from './gym';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l.split(''), 'enter']);

/** a hero who knows the gym, in a district, with some money */
function inGym(s: GameState, district = 1, money = 100) {
  const st = hero(s);
  st.world.places.gym = true;
  st.world.district = District(district);
  st.player.resources.money = money;
  return st;
}

/** plays the gym with these command lines; `types` are the events without the prompts */
function visit(setup: (s: GameState) => void, ...lines: string[]) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(gym, { keys: keys(...lines), setup, events });
    const types = events.filter((e) => e.type !== 'prompt').map((e) => e.type);
    return { ...played, events, types };
  });
}

/** strength, vitality, maximum and current health, minimum and maximum damage */
const stats = ({ player: p }: Game) => [
  attr(p, 'strength'),
  attr(p, 'vitality'),
  attr(p, 'healthMax'),
  p.health.current,
  attr(p, 'damageMin'),
  attr(p, 'damageMax'),
];

describe('gym (0000:E386)', () => {
  it.effect('an unknown gym is not there', () =>
    Effect.gen(function* () {
      const { events, exit } = yield* visit(hero);
      expect(events).toEqual([{ type: 'gymUnknown' }]);
      expect(Exit.isSuccess(exit)).toBe(true);
    })
  );

  it.effect('the hero enters and leaves with w', () =>
    Effect.gen(function* () {
      const { events, exit, st } = yield* visit(inGym, 'w');
      expect(events).toEqual([{ type: 'enteredGym' }, { type: 'prompt', context: 'gym' }]);
      expect(Exit.isSuccess(exit)).toBe(true);
      expect(st.player.resources.money).toBe(100);
    })
  );

  it.effect('weights: +1 strength, health and maximum damage; an even strength +1 minimum', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit(inGym, '1', 'w');
      expect(events).toContainEqual({ type: 'gymTrained', training: 'weights' });
      expect(stats(st)).toEqual([6, 4, 36, 36, 3, 6]);
      expect(st.player.resources.money).toBe(100 - GYM_PRICE.weights);
    })
  );

  it.effect('weights to an odd strength leave the minimum damage', () =>
    Effect.gen(function* () {
      const { st } = yield* visit((s) => set(inGym(s).player, 'strength', 6), '1', 'w');
      expect(stats(st)).toEqual([7, 4, 36, 36, 2, 6]);
    })
  );

  it.effect('machines: +1 vitality, +5 health', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit(inGym, '2', 'w');
      expect(events).toContainEqual({ type: 'gymTrained', training: 'machines' });
      expect(stats(st)).toEqual([5, 5, 40, 40, 2, 5]);
      expect(st.player.resources.money).toBe(100 - GYM_PRICE.machines);
    })
  );

  for (const [command, training] of [
    ['1', 'weights'],
    ['2', 'machines'],
  ] as const)
    it.effect(`no ${training} without the money`, () =>
      Effect.gen(function* () {
        const { types, events, st } = yield* visit(
          (s) => inGym(s, 1, GYM_PRICE[training] - 1),
          command,
          'w'
        );
        expect(types).toEqual(['enteredGym', 'gymBroke']);
        expect(events).toContainEqual({ type: 'gymBroke', training });
        expect(stats(st)).toEqual([5, 4, 35, 35, 2, 5]);
        expect(st.player.resources.money).toBe(19);
      })
    );

  it.effect('district 1 has no experience, mouth guard or press: 3, 4, 5 do nothing', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(inGym, '3', '4', '5', 'w');
      expect(types).toEqual(['enteredGym']);
      expect(st.player.resources.money).toBe(100);
    })
  );

  it.effect('district 2 has no press: 5 does nothing', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit((s) => inGym(s, 2), '5', 'w');
      expect(types).toEqual(['enteredGym']);
      expect(attr(st.player, 'armor')).toBe(0);
    })
  );

  it.effect('experience: +10 for 10 money', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(
        (s) => (inGym(s, 2).player.progression.expNext = 20),
        '3',
        'w'
      );
      expect(types).toEqual(['enteredGym', 'gymTrained']);
      expect([st.player.progression.exp, st.player.resources.money]).toEqual([
        10,
        100 - GYM_PRICE.exp,
      ]);
    })
  );

  it.effect('experience that reaches the next level levels up', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit((s) => inGym(s, 2), '3', 'w');
      expect(types.slice(0, 3)).toEqual(['enteredGym', 'gymTrained', 'heroExpSpent']);
      expect(st.player.progression.level).toBe(1);
    })
  );

  it.effect('no experience for a hero too cool for the district', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(
        (s) => (inGym(s, 2).player.progression.level = 17), // 2 * 10 - 3
        '3',
        'w'
      );
      expect(types).toEqual(['enteredGym', 'gymTooCool']);
      expect([st.player.progression.exp, st.player.resources.money]).toEqual([0, 100]);
    })
  );

  it.effect('no experience without the money', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit((s) => inGym(s, 2, GYM_PRICE.exp - 1), '3', 'w');
      expect(events).toContainEqual({ type: 'gymBroke', training: 'exp' });
      expect(st.player.progression.exp).toBe(0);
    })
  );

  it.effect('a mouth guard costs 30', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit((s) => inGym(s, 2), '4', 'w');
      expect(types).toEqual(['enteredGym', 'gymBoughtMouthGuard']);
      expect(st.player.body.mouth.guard).toBe(true);
      expect(st.player.resources.money).toBe(100 - GYM_PRICE.mouthGuard);
    })
  );

  it.effect('a second mouth guard is refused', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(
        (s) => (inGym(s, 2).player.body.mouth.guard = true),
        '4',
        'w'
      );
      expect(types).toEqual(['enteredGym', 'gymHasMouthGuard']);
      expect(st.player.resources.money).toBe(100);
    })
  );

  it.effect('no mouth guard without the money', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit((s) => inGym(s, 2, GYM_PRICE.mouthGuard - 1), '4', 'w');
      expect(events).toContainEqual({ type: 'gymBroke', training: 'mouthGuard' });
      expect(st.player.body.mouth.guard).toBe(false);
    })
  );

  it.effect('press: +1 armour', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit((s) => inGym(s, 3), '5', 'w');
      expect(types).toEqual(['enteredGym', 'gymTrained']);
      expect(attr(st.player, 'armor')).toBe(1);
      expect(st.player.resources.money).toBe(100 - GYM_PRICE.press);
    })
  );

  it.effect('no press without the money', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit((s) => inGym(s, 3, GYM_PRICE.press - 1), '5', 'w');
      expect(events).toContainEqual({ type: 'gymBroke', training: 'press' });
      expect(attr(st.player, 'armor')).toBe(0);
    })
  );

  it.effect('press stops at (district - 2) * 10 trained armour, counted within the visit', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit((s) => set(inGym(s, 3).player, 'armor', 9), '5', '5', 'w');
      expect(types).toEqual(['enteredGym', 'gymTrained', 'gymPressMaxed']);
      expect([attr(st.player, 'armor'), st.player.resources.money]).toEqual([10, 80]);
    })
  );

  it.effect('the armour of clothes does not count against the press limit', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(
        (s) => {
          const st = inGym(s, 3);
          set(st.player, 'armor', 9);
          st.player.body.torso.coolLeather = true;
        },
        '5',
        'w'
      );
      expect(types).toEqual(['enteredGym', 'gymTrained']);
      expect(attr(st.player, 'armor')).toBe(9 + 4 + 1);
    })
  );
});
