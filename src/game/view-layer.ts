/** The game's views listening to its events: what the player sees on the screen. */
import { Effect, Layer } from 'effect';

import { AFTERMATH_EVENTS, showAftermath } from './aftermath-view';
import type { Context } from './commands';
import { Events, type GameEvent } from './events';
import { showFight } from './fight-view';
import { print } from './prelude';
import { plain, type Text } from './text';
import { FIGHT, PLACES } from './texts';

/** what each prompt looks like */
const PROMPTS: Partial<Record<Context, Text>> = {
  main: plain`\\`,
  fight: FIGHT.bitva(),
  market: PLACES.bazar(),
  dealers: PLACES.barygi(),
  vet: PLACES.veterenar(),
  den: PLACES.priton(),
  club: PLACES.klub(),
  gym: PLACES.kachalka(),
};

function show(event: GameEvent) {
  if (event.type === 'prompt') {
    const prompt = PROMPTS[event.context];
    if (!prompt) return Effect.die(`no prompt for ${event.context}`);
    return print(prompt);
  }
  if (event.type in AFTERMATH_EVENTS)
    return showAftermath(event as Parameters<typeof showAftermath>[0]);
  return showFight(event as Parameters<typeof showFight>[0]);
}

/** `Events` shown on the screen, with the services the views use */
export const viewLayer = Layer.effect(
  Events,
  Effect.gen(function* () {
    const services = yield* Effect.context<Effect.Services<ReturnType<typeof show>>>();
    return { emit: (event: GameEvent) => show(event).pipe(Effect.provide(services)) };
  })
);
