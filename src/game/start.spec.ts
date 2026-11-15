import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit, Layer } from 'effect';

import { keyCode } from '../../oracle/dos';
import { hero, play } from '../../test/game';
import { biosKey, type IKeyboard } from '../crt/crt';
import { dirDisk } from '../dir-disk';
import { gameLayer } from '../runtime';
import { attr } from '../state/attributes';
import { encodePlaces, encodeSave } from '../state/legacy';
import { createState, type Game, playing } from '../state/state';
import { Seed } from '../tp/brands';
import { Events, type GameEvent } from './events';
import { Engine, transaction } from './prelude';
import { newGame, resetPlaces } from './start';
import { EndOfInput } from './terminal';

const STORY = ['space', '1', '2', '3', '4', '5', '6', '7'];
const keys = (...lines: string[]) => lines.flatMap((l) => [...l, 'enter']);

describe('newGame (0000:6A0D)', () => {
  it.effect('Отморозок: stats, health and damage', () =>
    Effect.gen(function* () {
      const { st, exit } = yield* play(newGame, { keys: [...STORY, ...keys('1', 'vasya')] });
      expect(exit._tag).toBe('Success');
      expect([
        st.player.type,
        attr(st.player, 'strength'),
        attr(st.player, 'agility'),
        attr(st.player, 'vitality'),
        attr(st.player, 'luck'),
      ]).toEqual(['otmorozok', 5, 2, 4, 1]);
      expect([
        attr(st.player, 'healthMax'),
        st.player.health.current,
        attr(st.player, 'damageMin'),
        attr(st.player, 'damageMax'),
      ]).toEqual([35, 35, 2, 5]);
      expect([
        st.world.district,
        st.player.progression.expNext,
        st.world.den.loans,
        st.player.name,
      ]).toEqual([1, 10, 5, '^7 vasya']);
      expect([st.world.places.market, st.world.places.hospital]).toEqual([true, true]);
    })
  );

  it.effect(
    'class bonuses: Пацан gets a girlfriend and the club, Вор the dealers, Гопник the den',
    () =>
      Effect.gen(function* () {
        const patsan = yield* play(newGame, { keys: [...STORY, ...keys('0', 'a')] });
        expect([patsan.st.world.places.girlfriend, patsan.st.world.places.club]).toEqual([
          true,
          true,
        ]);
        const vor = yield* play(newGame, { keys: [...STORY, ...keys('3', 'a')] });
        expect([vor.st.world.places.dealers, attr(vor.st.player, 'luck')]).toEqual([true, 4]);
        const gop = yield* play(newGame, { keys: [...STORY, ...keys('2', 'a')] });
        expect(gop.st.world.places.den).toBe(true);
      })
  );

  it.effect(
    '"4" explains the classes and asks again; nonsense means Пацан; empty name is Раздолбай',
    () =>
      Effect.gen(function* () {
        const { st, lines } = yield* play(newGame, { keys: [...STORY, ...keys('4', 'xyz', '')] });
        expect(lines).toContain('Пацан - это нормальный тип. (Бонус - Гёлфренд, Клуб).');
        expect([st.player.type, attr(st.player, 'strength')]).toEqual(['patsan', 3]);
        expect(st.player.name).toBe('^7 Раз^6дол^4бай');
      })
  );
});

describe('newGame, events', () => {
  it.effect('no saves: the story, the type, the name, the arrival', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st, exit } = yield* play(newGame, { keys: keys('1', 'vasya'), events });
      expect(exit._tag).toBe('Success');
      expect(events).toEqual([
        { type: 'startTitle' },
        { type: 'startStory' },
        { type: 'startTypeChosen', hero: 'otmorozok' },
        { type: 'startNameAsked' },
        { type: 'startNamed', name: 'vasya' },
        { type: 'startArrived' },
      ]);
      expect([st.world.district, st.version.length > 0, st.world.den.loans]).toEqual([1, true, 5]);
    })
  );

  it.effect('"4" explains the types once; the second answer counts even if it is "4"', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { st } = yield* play(newGame, { keys: keys('4', '4', 'a'), events });
      expect(types(events)).toContain('startTypesExplained');
      // 4 again is out of range: Пацан
      expect(st.player.type).toBe('patsan');
    })
  );

  it.effect('a type number out of range means Пацан', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      yield* play(newGame, { keys: keys('-1', 'a'), events });
      expect(events).toContainEqual({ type: 'startTypeChosen', hero: 'patsan' });
    })
  );

  it.effect('Вор arrives with the dealers and no den', () =>
    Effect.gen(function* () {
      const { st } = yield* play(newGame, { keys: keys('3', 'a'), events: [] });
      expect([st.world.places.dealers, st.world.places.den, st.world.places.club]).toEqual([
        true,
        false,
        false,
      ]);
    })
  );

  it.effect('the keys run out at the name: the game is stopped', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(newGame, { keys: keys('1'), events });
      expect(exit).toStrictEqual(Exit.fail(new EndOfInput()));
      expect(types(events).at(-1)).toBe('startNameAsked');
    })
  );
});

describe('newGame with saves on the disk', () => {
  it.effect('lists the districts of the saves and loads the pressed one into its district', () =>
    Effect.gen(function* () {
      const dir = disk({ save_r2: saved(), save_r4: saved() });
      const events: GameEvent[] = [];
      const { st, exit } = yield* playIn(dir, newGame, { keys: ['4'], events });
      expect(exit._tag).toBe('Success');
      expect(events).toEqual([
        { type: 'startTitle' },
        { type: 'startSavesFound', districts: ['2', '4'] },
        { type: 'startSaveLoaded', key: '4' },
        { type: 'startArrived' },
      ]);
      expect([st.world.district, st.player.name]).toEqual([4, '^7 saved']);
    })
  );

  it.effect('the rector waits in district 5', () =>
    Effect.gen(function* () {
      const dir = disk({ save_r5: saved() });
      const { st } = yield* playIn(dir, newGame, { keys: ['5'], events: [] });
      expect([st.world.district, st.world.rector]).toEqual([5, true]);
    })
  );

  it.effect('arriving gives the type its places and five loans', () =>
    Effect.gen(function* () {
      const dir = disk({
        save_r3: saved((st) => {
          st.player.type = 'gopnik';
          st.world.den.loans = 0;
        }),
      });
      const { st } = yield* playIn(dir, newGame, { keys: ['3'], events: [] });
      expect([st.world.places.den, st.world.den.loans]).toEqual([true, 5]);
    })
  );

  it.effect('"0": the district from the level, the places from places.sav', () =>
    Effect.gen(function* () {
      const places = createState();
      const p = hero(places);
      p.world.places.gym = true;
      p.world.places.market = false;
      const dir = disk({
        save_r0: saved((st) => (st.player.progression.level = 23)),
        places: encodePlaces(places),
      });
      const events: GameEvent[] = [];
      const { st } = yield* playIn(dir, newGame, { keys: ['0'], events });
      expect(types(events)).toEqual([
        'startTitle',
        'startSavesFound',
        'startSaveLoaded',
        'startPlacesLoaded',
        'startArrived',
      ]);
      expect([st.world.district, st.world.places.gym, st.world.places.market]).toEqual([
        3,
        true,
        false,
      ]);
    })
  );

  it.effect('"0" without places.sav: the places are forgotten', () =>
    Effect.gen(function* () {
      const dir = disk({
        save_r0: saved((st) => {
          st.world.places.gym = true;
          st.world.places.market = true;
        }),
      });
      const events: GameEvent[] = [];
      const { st } = yield* playIn(dir, newGame, { keys: ['0'], events });
      expect(types(events)).toContain('startPlacesLost');
      expect([st.world.places.gym, st.world.places.market]).toEqual([false, false]);
    })
  );

  it.effect('a key without its save: broken, then a new character', () =>
    Effect.gen(function* () {
      const dir = disk({ save_r2: saved() });
      const events: GameEvent[] = [];
      const { st } = yield* playIn(dir, newGame, { keys: ['3', ...keys('1', 'a')], events });
      expect(types(events).slice(0, 4)).toEqual([
        'startTitle',
        'startSavesFound',
        'startSaveBroken',
        'startStory',
      ]);
      expect([st.player.type, st.world.district]).toEqual(['otmorozok', 1]);
    })
  );

  it.effect('any other key: a new character, nothing loaded', () =>
    Effect.gen(function* () {
      const dir = disk({ save_r2: saved() });
      const events: GameEvent[] = [];
      yield* playIn(dir, newGame, { keys: ['n', ...keys('1', 'a')], events });
      expect(types(events).slice(0, 3)).toEqual(['startTitle', 'startSavesFound', 'startStory']);
    })
  );
});

describe('resetPlaces', () => {
  it.effect('forgets the places of the district, a type keeps its bonus places', () =>
    Effect.gen(function* () {
      const all = (st: Game) => {
        for (const k of Object.keys(st.world.places) as (keyof Game['world']['places'])[])
          st.world.places[k] = true;
      };
      const events: GameEvent[] = [];
      const otm = yield* play(resetPlaces, { setup: (s) => all(hero(s)), events });
      expect(events).toEqual([{ type: 'startPlacesReset' }]);
      expect(Object.values(otm.st.world.places).some((v) => v)).toBe(false);
      const pat = yield* play(resetPlaces, {
        setup: (s) => {
          const st = hero(s);
          all(st);
          st.player.type = 'patsan';
        },
        events: [],
      });
      expect(
        Object.entries(pat.st.world.places)
          .filter(([, v]) => v)
          .map(([k]) => k)
          .sort()
      ).toEqual(['club', 'girlfriend']);
      const gop = yield* play(resetPlaces, {
        setup: (s) => {
          const st = hero(s);
          all(st);
          st.player.type = 'gopnik';
        },
        events: [],
      });
      expect(
        Object.entries(gop.st.world.places)
          .filter(([, v]) => v)
          .map(([k]) => k)
      ).toEqual(['den']);
    })
  );
});

const types = (events: GameEvent[]) => events.map((e) => e.type);

/** a save of a level-0 Отморозок named "saved", changed by `edit` */
function saved(edit: (st: Game) => void = () => {}) {
  const st = createState();
  const game = hero(st);
  game.player.name = '^7 saved';
  edit(game);
  return encodeSave(st);
}

/** a throw-away game directory with these files (`<name>.sav`) */
function disk(files: Record<string, Uint8Array>) {
  const dir = mkdtempSync(join(tmpdir(), 'gopnik-start-'));
  for (const [name, data] of Object.entries(files)) writeFileSync(join(dir, `${name}.sav`), data);
  return dir;
}

/** `play` from test/game.ts with the game directory given (test/game.ts makes an empty one) */
function playIn<A, E, R>(
  dir: string,
  eff: Effect.Effect<A, E, R>,
  opts: { keys: readonly string[]; events: GameEvent[] }
) {
  const queue = [...opts.keys];
  const keyboard: IKeyboard = {
    read: Effect.suspend(() => {
      const k = queue.shift();
      return k === undefined ? Effect.fail(new EndOfInput()) : Effect.succeed(biosKey(keyCode(k)));
    }),
    peek: Effect.sync(() => queue.length > 0),
    delay: () => Effect.void,
  };
  const events = Layer.succeed(Events, {
    emit: (event) => Effect.sync(() => void opts.events.push(event)),
  });
  return Effect.gen(function* () {
    const game = yield* Engine;
    const exit = yield* Effect.exit(transaction(eff));
    return { exit, st: playing(game.state.committed) };
  }).pipe(
    Effect.provide(gameLayer({ seed: Seed(0), disk: dirDisk(dir), keyboard, events }))
  ) as Effect.Effect<{
    exit: Exit.Exit<A, unknown>;
    st: Game;
  }>;
}
