import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../test/game';
import type { GameState } from '../state/state';
import { District } from '../tp/brands';
import type { GameEvent } from './events';
import { mainLoop } from './main';
import { Saves } from './prelude';
import { heroName } from './stored-texts';
import { EndOfInput, Halt } from './terminal';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l.split(''), 'enter']);

/** the main loop until the keys run out; the events are kept */
function turn(setup: (s: GameState) => void, opts: { seed?: number; keys?: string[] } = {}) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(mainLoop, { ...opts, setup, events });
    return { ...played, events, types: events.map((e) => e.type) };
  });
}

/** the main loop, then the save of a district */
function loopThenSave(district: number) {
  return Effect.gen(function* () {
    yield* Effect.exit(mainLoop);
    return yield* (yield* Saves).load(String(district));
  });
}

const PROMPT = { type: 'prompt', context: 'main' } as const;

describe('mainLoop: commands (0000:AB75)', () => {
  // the first event of each command, for a hero who knows nothing but the market and the vet
  const FIRST: readonly (readonly [string, GameEvent['type']])[] = [
    ['w', 'walkStepped'],
    ['run', 'walkStepped'],
    ['mar', 'enteredMarket'],
    ['bmar', 'dealersUnknown'],
    ['rep', 'enteredVet'],
    ['girl', 'girlfriendNone'],
    ['fight', 'mainOldFight'],
    ['pr', 'denClosed'],
    ['kl', 'clubUnknown'],
    ['trn', 'gymUnknown'],
    ['h', 'notThirsty'],
    ['mh', 'notThirsty'],
    ['kos', 'jointRefused'],
    ['i', 'mainCommands'],
    ['s', 'mainStats'],
    ['k', 'mainKick'],
    ['name', 'mainRenaming'],
    ['version', 'mainVersion'],
    ['help', 'helpRequested'],
    ['exit', 'mainQuit'],
    ['e', 'mainQuit'],
  ];
  for (const [command, first] of FIRST)
    it.effect(`\`${command}\` → ${first}`, () =>
      Effect.gen(function* () {
        const { types } = yield* turn(hero, { seed: 3, keys: keys(command) });
        expect(types.slice(0, 2)).toEqual(['prompt', first]);
      })
    );

  it.effect('a command that is not one: the prompt again', () =>
    Effect.gen(function* () {
      const { events, exit } = yield* turn(hero, { keys: keys('xyz') });
      expect(events).toEqual([PROMPT, PROMPT]);
      expect(exit).toStrictEqual(Exit.fail(new EndOfInput()));
    })
  );

  it.effect('the commands are typed in any case', () =>
    Effect.gen(function* () {
      const { types } = yield* turn(hero, { keys: keys('VERSION') });
      expect(types).toEqual(['prompt', 'mainVersion', 'prompt']);
    })
  );

  it.effect('`exit` quits the game', () =>
    Effect.gen(function* () {
      const { types, exit } = yield* turn(hero, { keys: keys('exit') });
      expect(types).toEqual(['prompt', 'mainQuit']);
      expect(exit).toStrictEqual(Exit.fail(new Halt({ code: 0 })));
    })
  );

  it.effect('`f` with a pistol: not here', () =>
    Effect.gen(function* () {
      const { types } = yield* turn(
        (s) => (hero(s).player.body.pockets.pistol = { silencer: false, bullets: 0 }),
        {
          keys: keys('f'),
        }
      );
      expect(types).toEqual(['prompt', 'mainShotRefused', 'prompt']);
    })
  );

  it.effect('`f` without a pistol: nothing', () =>
    Effect.gen(function* () {
      const { types } = yield* turn(hero, { keys: keys('f') });
      expect(types).toEqual(['prompt', 'prompt']);
    })
  );

  it.effect('`name` renames the hero', () =>
    Effect.gen(function* () {
      const { st, events } = yield* turn(hero, { keys: keys('name', 'vasya') });
      expect(events).toEqual([
        PROMPT,
        { type: 'mainRenaming' },
        { type: 'mainRenamed', name: 'vasya' },
        PROMPT,
      ]);
      expect(st.player.name).toBe(heroName('vasya'));
    })
  );

  it.effect('each command is one transaction: done before the next prompt', () =>
    Effect.gen(function* () {
      const { st } = yield* turn((s) => (hero(s).player.resources.money = 12), {
        keys: keys('mar', '2', 'w'),
      });
      expect([st.player.resources.money, st.player.resources.beer]).toEqual([7, 1]);
    })
  );
});

describe('mainLoop: the next district (0000:AB92)', () => {
  /** a hero of level 10 in district 1 */
  const done = (s: GameState) => {
    const st = hero(s);
    st.player.progression.level = 10;
    st.world.heat.market = 3;
    st.world.heat.club = 2;
    st.world.places.dealers = true;
  };

  it.effect('level district*10: on to the next district, places and heat forgotten', () =>
    Effect.gen(function* () {
      const { st, types } = yield* turn(done, { keys: keys('n') });
      expect(types).toEqual([
        'startPlacesReset',
        'mainDistrictDone',
        'mainDistrictEntered',
        'prompt',
      ]);
      expect([st.world.district, st.world.heat.market, st.world.heat.club]).toEqual([2, 0, 0]);
      expect([st.world.places.dealers, st.world.rector]).toEqual([false, false]);
    })
  );

  it.effect('not saved when declined', () =>
    Effect.gen(function* () {
      const { exit } = yield* play(loopThenSave(2), { setup: done, keys: keys('n') });
      expect(exit).toStrictEqual(Exit.succeed(undefined));
    })
  );

  it.effect('saved in the slot of the new district when asked', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(loopThenSave(2), { setup: done, keys: keys('y'), events });
      expect(events.map((e) => e.type)).toEqual([
        'startPlacesReset',
        'mainDistrictDone',
        'mainSaved',
        'mainDistrictEntered',
        'prompt',
      ]);
      expect(exit).toMatchObject({ value: { player: { type: 'otmorozok' } } });
    })
  );

  it.effect('below the level the district stays', () =>
    Effect.gen(function* () {
      const { st, types } = yield* turn((s) => (hero(s).player.progression.level = 9));
      expect(types).toEqual(['prompt']);
      expect(st.world.district).toBe(1);
    })
  );

  it.effect('district 5 brings the rector', () =>
    Effect.gen(function* () {
      const { st } = yield* turn(
        (s) => {
          const st = hero(s);
          st.world.district = District(4);
          st.player.progression.level = 40;
        },
        { keys: keys('n') }
      );
      expect([st.world.district, st.world.rector]).toEqual([5, true]);
    })
  );

  it.effect('district 5 is the last', () =>
    Effect.gen(function* () {
      const { st, types } = yield* turn((s) => {
        const st = hero(s);
        st.world.district = District(5);
        st.player.progression.level = 60;
      });
      expect(types).toEqual(['prompt']);
      expect(st.world.district).toBe(5);
    })
  );
});

describe('mainLoop: the rector', () => {
  it.effect('before every command: the den opens, the fake rector greets and fights', () =>
    Effect.gen(function* () {
      const { st, events } = yield* turn((s) => {
        const st = hero(s);
        st.world.district = District(5);
        st.player.progression.level = 45;
        st.world.rector = true;
      });
      expect(events).toEqual([
        { type: 'mainRectorAhead' },
        { type: 'greeting', by: 'fakeRector' },
        { type: 'fightStarted' },
        { type: 'prompt', context: 'fight' },
      ]);
      expect(st.world.places.den).toBe(true);
      expect(st.battle).toBeNull();
    })
  );
});
