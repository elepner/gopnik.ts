/**
 * Everything the player types, by context. The same letter means different things in different
 * places (`h` drinks a beer in the street but patches you up at the vet), so every prompt has
 * its own dictionary. Game code compares the raw input with these constants: the original keeps
 * the typed string and re-checks it after every action (a fight inside a place overwrites it).
 */
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
  /** beer, in the street and in a fight */
  beer: {
    one: 'h',
    untilHealthy: 'mh',
  },
  /** the fight prompt `Битва\` */
  fight: {
    kick: 'k',
    run: 'run',
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
  /** every place loop */
  place: {
    leave: 'w',
    /** what the dealers leave in the input after selling spare things */
    nothing: ' ',
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
  },
  vet: {
    patchUp: 'h',
    fixBones: 'r',
    exit: 'e',
  },
  den: {
    treatToBeer: 'p',
    borrow: 'r',
    helpTheLad: 'hp',
    respect: 's',
    ask: 'a',
    job: 'd',
  },
  club: {
    playCards: 'p',
    disco: '1',
    cheatTricks: '2',
  },
  gym: {
    weights: '1',
    machines: '2',
    exp: '3',
    mouthGuard: '4',
    press: '5',
  },
} as const;

export type Context = keyof typeof CMD;

/** the raw input of a command of a context */
export type Command<C extends Context> = (typeof CMD)[C][keyof (typeof CMD)[C]];
