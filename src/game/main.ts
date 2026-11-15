/** The main command loop of G.EXE (0000:AB59). */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt';
import { encodeSave } from '../state/legacy';
import { SaveName } from '../tp/brands';
import { str } from '../tp/num';
import { beatFakeRector, beatRector, killedByRector } from './aftermath';
import { drink } from './beer';
import { CMD, type Command, promptCommand, readAnswer } from './commands';
import { encounter, setupRector } from './enemy';
import { emit } from './events';
import { fight, RECTOR_FIGHT, smokeJoint } from './fight';
import { showStats } from './hero';
import { club } from './places/club';
import { dealers } from './places/dealers';
import { den } from './places/den';
import { girlfriend } from './places/girlfriend';
import { gym } from './places/gym';
import { market } from './places/market';
import { vet } from './places/vet';
import { Disk, halt, print, println, started, transaction } from './prelude';
import { help } from './screens';
import { resetPlaces } from './start';
import { plain } from './text';
import { MAIN } from './texts';
import { walk } from './walk';

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
    st.world.places.den = true;
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
  st.world.district++;
  yield* resetPlaces;
  st.world.heat.market = 0;
  st.world.heat.club = 0;
  yield* println(MAIN.tyDokazalChtoTy());
  yield* println(MAIN.hocheshSohranitSvoiDostizheniya());
  yield* print(plain`\\`);
  if ((yield* readAnswer) === CMD.answer.yes) {
    const slot = str(st.world.district);
    yield* (yield* Disk).write(SaveName(`save_r${slot}.sav`), encodeSave(st));
    yield* println(MAIN.sohranenoVSaveR(slot));
  }
  switch (st.world.district) {
    case 2:
      yield* println(MAIN.tySelNaAvtobus());
      yield* println(MAIN.tamBroditShlyuzovskayaShpana());
      break;
    case 3:
      yield* println(MAIN.naMarshrutkeTyDoehal());
      yield* println(MAIN.zdesBroditUzheBolee());
      break;
    case 4:
      yield* println(MAIN.tyPriehalVEltsovku());
      yield* println(MAIN.otoVsyuduDonosyatsyaKriki());
      break;
    case 5:
      yield* println(MAIN.poraNakonetsOtomstitRektoru());
      yield* readKey;
      yield* println(MAIN.tyProbralsyaVUniver());
      yield* println(MAIN.aVotIOn());
      st.world.rector = true;
      break;
  }
});

/** `i` */
const commands = Effect.gen(function* () {
  const st = yield* started;
  yield* println(MAIN.napishiWChtobyShatatsya());
  if (st.world.places.market) yield* println(MAIN.napishiMarChtobyIdti());
  if (st.world.places.dealers) yield* println(MAIN.napishiBmarChtobyIdti());
  if (st.world.places.hospital) yield* println(MAIN.napishiRepChtobyIdti());
  if (st.world.places.girlfriend) yield* println(MAIN.napishiGirlChtobyZavalitsya());
  if (st.world.places.den) yield* println(MAIN.napishiPrChtobyIdti());
  if (st.world.places.club) yield* println(MAIN.napishiKlChtobyIdti());
  if (st.world.places.gym) yield* println(MAIN.napishiTrnChtobyIdti());
  for (const line of COMMANDS) yield* println(line);
});

const COMMANDS = [
  MAIN.napishiSChtobyPosmotret(),
  MAIN.napishiSvChtobyPriglyadetsya(),
  MAIN.napishiKChtobyGasit(),
  MAIN.napishiVChtobyPozvat(),
  MAIN.napishiKosChtobyShavat(),
  MAIN.napishiHChtobyVypit(),
  MAIN.napishiMhChtobyNabuhatsya(),
  MAIN.napishiNameChtobySmenit(),
  MAIN.napishiEEsliZahochesh(),
];

/** `name` */
const rename = Effect.gen(function* () {
  const st = yield* started;
  yield* println(MAIN.zvaliTebya(st.player.name));
  yield* print(MAIN.aTeperBudut());
  st.player.name = yield* readLine;
  if (st.player.name === '') st.player.name = MAIN.razDolBay().format;
  st.player.name = MAIN.namePrefix().format + st.player.name;
});

/** `exit`/`e`: the results, then quit */
const exit = Effect.gen(function* () {
  yield* println(MAIN.blinNeBytTebe());
  yield* println(MAIN.aRezultat());
  yield* showStats;
  yield* readKey;
  return yield* halt;
});

/** what every command of the main prompt does (here, after everything it uses is defined) */
const MAIN_COMMANDS = {
  [CMD.main.walk]: walk(false),
  [CMD.main.run]: walk(true),
  [CMD.main.market]: market,
  [CMD.main.dealers]: dealers,
  [CMD.main.vet]: vet,
  [CMD.main.girlfriend]: girlfriend,
  [CMD.main.oldFight]: println(MAIN.perezhitkiProshlogoZhmiW()),
  [CMD.main.den]: den,
  [CMD.main.club]: club,
  [CMD.main.gym]: gym,
  [CMD.main.beer]: drink('one'),
  [CMD.main.beerUntilHealthy]: drink('untilHealthy'),
  [CMD.main.joint]: smokeJoint(10),
  [CMD.main.commands]: commands,
  [CMD.main.stats]: showStats,
  [CMD.main.shoot]: Effect.gen(function* () {
    if ((yield* started).player.body.pockets.pistol) yield* println(MAIN.tyChePsihMigom());
  }),
  [CMD.main.kick]: println(MAIN.cheMasheshKopytamiIschi()),
  [CMD.main.rename]: rename,
  [CMD.main.version]: println(MAIN.gopnikVersion102()),
  [CMD.main.help]: help,
  [CMD.main.exit]: exit,
  [CMD.main.exitShort]: exit,
} satisfies Record<Command<'main'>, unknown>;
