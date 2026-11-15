import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../test/game';
import type { GameEvent } from './events';
import { gameOver, help, titleScreen, victoryAnimation } from './screens';
import { Halt } from './terminal';

describe('screens', () => {
  it.effect('gameOver (0000:074B): the end is shown, then the game halts', () =>
    Effect.gen(function* () {
      for (const won of [false, true]) {
        const events: GameEvent[] = [];
        const { exit } = yield* play(gameOver(won), { setup: hero, events });
        expect(events).toEqual([{ type: 'gameEnded', won }]);
        expect(exit).toStrictEqual(Exit.fail(new Halt({ code: 0 })));
      }
    })
  );

  it.effect('victoryAnimation (0000:0AEC): the celebration, then the won game over', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const { exit } = yield* play(victoryAnimation, { setup: hero, events });
      expect(events).toEqual([{ type: 'victoryCelebrated' }, { type: 'gameEnded', won: true }]);
      expect(exit).toStrictEqual(Exit.fail(new Halt({ code: 0 })));
    })
  );

  it.effect('the title (0000:02C2) and help (0000:5F55) only show, the game goes on', () =>
    Effect.gen(function* () {
      const events: GameEvent[] = [];
      const title = yield* play(titleScreen, { setup: hero, events });
      const shown = yield* play(help, { setup: hero, events });
      expect(events).toEqual([{ type: 'startTitle' }, { type: 'helpRequested' }]);
      expect([title.exit, shown.exit]).toStrictEqual([Exit.void, Exit.void]);
    })
  );
});
