/** The game's views listening to its events: what the player sees on the screen. */
import { Effect, Layer } from 'effect';

import { aftermathView } from './aftermath-view';
import { beerView } from './beer-view';
import type { Context } from './commands';
import { encountersView } from './encounters-view';
import { enemyView } from './enemy-view';
import { Events, type GameEvent } from './events';
import { fightView } from './fight-view';
import { heroView } from './hero-view';
import { mainView } from './main-view';
import { clubView } from './places/club-view';
import { dealersView } from './places/dealers-view';
import { denView } from './places/den-view';
import { girlfriendView } from './places/girlfriend-view';
import { gymView } from './places/gym-view';
import { marketView } from './places/market-view';
import { vetView } from './places/vet-view';
import { print } from './prelude';
import { startView } from './start-view';
import { plain, type Text } from './text';
import { FIGHT, PLACES } from './texts';
import type { View } from './view';
import { walkView } from './walk-view';

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

/** every part of the game's view */
const VIEWS: readonly View<GameEvent>[] = [
  mainView,
  startView,
  walkView,
  encountersView,
  heroView,
  enemyView,
  fightView,
  beerView,
  aftermathView,
  marketView,
  dealersView,
  vetView,
  girlfriendView,
  denView,
  clubView,
  gymView,
] as readonly View<never>[] as readonly View<GameEvent>[];

/** event type → its view; an event type shown by two views is a mistake */
const ROUTES = new Map<string, View<GameEvent>>();
for (const view of VIEWS)
  for (const type of Object.keys(view.events)) {
    if (ROUTES.has(type)) throw new Error(`event type ${type} is shown by two views`);
    ROUTES.set(type, view);
  }

function show(event: GameEvent) {
  if (event.type === 'prompt') {
    const prompt = PROMPTS[event.context];
    if (!prompt) return Effect.die(`no prompt for ${event.context}`);
    return print(prompt);
  }
  const view = ROUTES.get(event.type);
  if (!view) return Effect.die(`no view shows ${event.type}`);
  return view.show(event);
}

/** `Events` shown on the screen, with the services the views use */
export const viewLayer = Layer.effect(
  Events,
  Effect.gen(function* () {
    const services = yield* Effect.context<Effect.Services<ReturnType<typeof show>>>();
    return { emit: (event: GameEvent) => show(event).pipe(Effect.provide(services)) };
  })
);
