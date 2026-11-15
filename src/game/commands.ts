/**
 * Everything the player types, by context. The same letter means different things in different
 * places (`h` drinks a beer in the street but patches you up at the vet), so every prompt has
 * its own set of literals, and the input is parsed with the schema of its context. The original
 * keeps the typed string and re-checks it after every action (a fight inside a place overwrites
 * it), so places parse the last answer again on every check.
 */
import { Option, Schema } from 'effect';

export const CMD = {
  /** the main prompt `\` */
  main: {
    walk: 'w',
    /** walk and say so */
    run: 'run',
    market: 'mar',
    dealers: 'bmar',
    vet: 'rep',
    girlfriend: 'girl',
    /** a leftover of an older version: only prints a hint */
    oldFight: 'fight',
    den: 'pr',
    club: 'kl',
    gym: 'trn',
    beer: 'h',
    beerUntilHealthy: 'mh',
    joint: 'kos',
    commands: 'i',
    stats: 's',
    shoot: 'f',
    kick: 'k',
    rename: 'name',
    version: 'version',
    help: 'help',
    exit: 'exit',
    exitShort: 'e',
  },
  /** the fight prompt `Битва\` */
  fight: {
    kick: 'k',
    run: 'run',
    beer: 'h',
    beerUntilHealthy: 'mh',
    joint: 'kos',
    stats: 's',
    inspectEnemy: 'sv',
    exit: 'e',
    callBackup: 'v',
    shoot: 'f',
  },
  /** answers to yes/no questions */
  answer: {
    yes: 'y',
  },
  market: {
    hotdog: '1',
    beer: '2',
    glasses: '3',
    abibas: '4',
    boots: '5',
    leather: '6',
    adidas: '7',
    coolBoots: '8',
    coolLeather: '9',
    steal: 't',
    leave: 'w',
  },
  dealers: {
    joint: '1',
    phone: '2',
    superJoint: '3',
    tattoo: '4',
    knuckles: '5',
    club: '6',
    pistol: '7',
    bullets: '8',
    silencer: '9',
    sellJunk: 'x',
    sellSpareThings: 'wes',
    leave: 'w',
  },
  vet: {
    patchUp: 'h',
    fixBones: 'r',
    leave: 'w',
    exit: 'e',
  },
  den: {
    treatToBeer: 'p',
    borrow: 'r',
    helpTheLad: 'hp',
    respect: 's',
    ask: 'a',
    job: 'd',
    leave: 'w',
  },
  club: {
    playCards: 'p',
    disco: '1',
    cheatTricks: '2',
    leave: 'w',
  },
  gym: {
    weights: '1',
    machines: '2',
    exp: '3',
    mouthGuard: '4',
    press: '5',
    leave: 'w',
  },
} as const;

/** what the dealers leave in the input after selling spare things: no command at all */
export const NO_ANSWER = ' ';

export type Context = keyof typeof CMD;

/** the raw input of a command of a context */
export type Command<C extends Context> = (typeof CMD)[C][keyof (typeof CMD)[C]];

/** a schema per context: the literals of its commands */
const SCHEMAS = Object.fromEntries(
  Object.entries(CMD).map(([context, commands]) => [
    context,
    Schema.decodeUnknownOption(Schema.Literals(Object.values(commands))),
  ])
) as { [C in Context]: (input: unknown) => Option.Option<Command<C>> };

/** the command of a context the typed text is, if any */
export function parseCommand<C extends Context>(context: C, input: string): Command<C> | undefined {
  return Option.getOrUndefined(SCHEMAS[context](input));
}
