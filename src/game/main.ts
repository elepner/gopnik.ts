/** The main command loop of G.EXE (0000:AB59). */
import { Effect } from 'effect';

import { readLine } from '../crt/crt';
import { encodeSave } from '../state/legacy';
import type { Game } from '../state/state';
import { SaveName } from '../tp/brands';
import { str } from '../tp/num';
import { beatFakeRector, beatRector, killedByRector } from './aftermath';
import { drink } from './beer';
import { CMD, type Command, promptCommand, readAnswer } from './commands';
import { encounter, setupRector } from './enemy';
import { emit, reporter } from './events';
import { fight, RECTOR_FIGHT, smokeJoint } from './fight';
import type { MainEvent } from './main-view';
import { club } from './places/club';
import { dealers } from './places/dealers';
import { den } from './places/den';
import { girlfriend } from './places/girlfriend';
import { gym } from './places/gym';
import { market } from './places/market';
import { vet } from './places/vet';
import { Disk, halt, started, transaction } from './prelude';
import { help } from './screens';
import { resetPlaces } from './start';
import { heroName } from './stored-texts';
import { walk } from './walk';

const report = reporter(apply);

/** 0000:AB75 — every command is one transaction of the game state */
export const mainLoop = Effect.gen(function* () {
  for (;;) yield* transaction(turn);
});

/** one pass of the main loop: district change, the rector, then one command */
const turn = Effect.gen(function* () {
  const st = yield* started;
  if (st.world.district * 10 <= st.player.progression.level && st.world.district < 5)
    yield* nextDistrict;
  if (st.world.rector) {
    yield* report({ type: 'mainRectorAhead' });
    // the rector's fights end in a victory or death
    yield* encounter(
      setupRector(0),
      Effect.gen(function* () {
        yield* emit({ type: 'greeting', by: 'fakeRector' });
        const fake = yield* fight(RECTOR_FIGHT);
        yield* fake === 'won' ? beatFakeRector : killedByRector;
      })
    );
    yield* encounter(
      setupRector(1),
      Effect.gen(function* () {
        yield* emit({ type: 'greeting', by: 'rector' });
        const real = yield* fight(RECTOR_FIGHT);
        yield* real === 'won' ? beatRector : killedByRector;
      })
    );
  }
  const cmd = yield* promptCommand('main');
  if (cmd) yield* MAIN_COMMANDS[cmd];
});

/** 0000:AB92 — the district is done: move on, maybe save */
const nextDistrict = Effect.gen(function* () {
  const st = yield* started;
  yield* resetPlaces;
  yield* report({ type: 'mainDistrictDone' });
  if ((yield* readAnswer) === CMD.answer.yes) {
    yield* (yield* Disk).write(SaveName(`save_r${str(st.world.district)}.sav`), encodeSave(st));
    yield* emit({ type: 'mainSaved' });
  }
  yield* report({ type: 'mainDistrictEntered' });
});

/** `name` */
const rename = Effect.gen(function* () {
  yield* emit({ type: 'mainRenaming' });
  yield* report({ type: 'mainRenamed', name: yield* readLine });
});

/** `exit`/`e`: the results, then quit */
const exit = Effect.andThen(emit({ type: 'mainQuit' }), halt);

/** what every command of the main prompt does (here, after everything it uses is defined) */
const MAIN_COMMANDS = {
  [CMD.main.walk]: walk(false),
  [CMD.main.run]: walk(true),
  [CMD.main.market]: market,
  [CMD.main.dealers]: dealers,
  [CMD.main.vet]: vet,
  [CMD.main.girlfriend]: girlfriend,
  [CMD.main.oldFight]: emit({ type: 'mainOldFight' }),
  [CMD.main.den]: den,
  [CMD.main.club]: club,
  [CMD.main.gym]: gym,
  [CMD.main.beer]: drink('one'),
  [CMD.main.beerUntilHealthy]: drink('untilHealthy'),
  [CMD.main.joint]: smokeJoint(10),
  [CMD.main.commands]: emit({ type: 'mainCommands' }),
  [CMD.main.stats]: emit({ type: 'mainStats' }),
  [CMD.main.shoot]: Effect.gen(function* () {
    if ((yield* started).player.body.pockets.pistol) yield* emit({ type: 'mainShotRefused' });
  }),
  [CMD.main.kick]: emit({ type: 'mainKick' }),
  [CMD.main.rename]: rename,
  [CMD.main.version]: emit({ type: 'mainVersion' }),
  [CMD.main.help]: help,
  [CMD.main.exit]: exit,
  [CMD.main.exitShort]: exit,
} satisfies Record<Command<'main'>, unknown>;

/** what happens at the main prompt goes into the state */
function apply(st: Game, event: MainEvent) {
  const w = st.world;
  switch (event.type) {
    case 'mainRectorAhead':
      w.places.den = true;
      return;
    case 'mainDistrictDone':
      w.district++;
      w.heat.market = 0;
      w.heat.club = 0;
      return;
    case 'mainDistrictEntered':
      if (w.district === 5) w.rector = true;
      return;
    case 'mainRenamed':
      st.player.name = heroName(event.name);
      return;
  }
}
