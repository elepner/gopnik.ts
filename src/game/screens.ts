/** Full-screen pictures: title, game over, victory animation, help; `start-view.ts` draws them. */
import { Effect } from 'effect';

import { emit } from './events';
import { halt } from './prelude';

/** 0000:02C2 */
export const titleScreen = emit({ type: 'startTitle' });

/** 0000:074B — "ТЫ СДОХ" / "ТЫ ПОБЕДИЛ" screen, then Halt */
export function gameOver(won: boolean) {
  return Effect.andThen(emit({ type: 'gameEnded', won }), halt);
}

/** 0000:0AEC — rainbow "ТЫ СУПЕР ГОП" until a key is pressed, then the victory screen */
export const victoryAnimation = Effect.andThen(emit({ type: 'victoryCelebrated' }), gameOver(true));

/** 0000:5F55 — `help` */
export const help = emit({ type: 'helpRequested' });
