/**
 * The fight (0000:3D11). The rules decide what happens and say it (`events.ts`): `apply` puts
 * an event into the state (the hero's and the enemy's), then it is shown (`fight-view.ts`, wired
 * as a layer), so the view reads the state the event made. `FightRules` hold what differs
 * between fights.
 */
import { Effect } from 'effect';

import { attr, dec, inc, set } from '../state/attributes';
import { type Battle, battle, type Game, type Injuries, type Player } from '../state/state';
import { div, i16, round, u8 } from '../tp/num';
import type { IRng } from '../tp/rng';
import { drink } from './beer';
import { CMD, promptCommand } from './commands';
import { emit, type IEvents, reporter } from './events';
import { type FightEvent, type Hit, type Side } from './fight-view';
import { DEN_LEVEL, levelDown, levelInDistrict, lostStats } from './hero';
import { halt, rnd, started } from './prelude';
import type { EndOfInput } from './terminal';

const report = reporter(apply);

/**
 * What makes one fight differ from another; the rest is the same in every fight. Who the enemy
 * is, what he says first and what follows the fight are up to the caller.
 */
export interface FightRules {
  /** every turn once the crowd has gathered: maybe a shout */
  readonly crowd: Effect.Effect<void, EndOfInput, IRng | IEvents>;
  /** `run` */
  readonly flee: (st: Game) => FleeEvent;
  /** whether the den lads pick up a beaten hero */
  readonly bailOut: (st: Game) => boolean;
  readonly backup: BackupRules;
}

/** the lads the hero can call with `v` */
export interface BackupRules {
  /** whether they come, or why not */
  readonly access: (st: Game) => 'granted' | 'respect' | 'den';
  /** the count at which they join: a call makes it 1, every kick adds 1, a phone brings them at once */
  readonly arrivesAt: number;
  /** the count at which they are beaten up (it goes on growing while they kick) */
  readonly beatenAt: number;
}

type FleeEvent = Extract<FightEvent, { type: 'cantRun' | 'fled' | 'fledUnranked' }>;

/** the lads of the den: they come to a hero they respect */
export const DEN_LADS: BackupRules = {
  access: (st) => (!st.world.places.den ? 'den' : respected(st) ? 'granted' : 'respect'),
  arrivesAt: 3,
  beatenAt: 7,
};

/** a gathered crowd shouts now and then */
const shout = Effect.gen(function* () {
  if ((yield* rnd(10)) === 0) yield* emit({ type: 'crowdShout', line: yield* rnd(18) });
});

/** every fight but the rector's */
export const STREET_FIGHT: FightRules = {
  crowd: shout,
  flee,
  bailOut: ladsBailOut,
  backup: DEN_LADS,
};

/** the fake and the real rector: no crowd, no running, no one to pick the hero up */
export const RECTOR_FIGHT: FightRules = {
  crowd: Effect.void,
  flee: () => ({ type: 'cantRun', because: 'rector' }),
  bailOut: () => false,
  backup: DEN_LADS,
};

/** how a fight ended; the caller decides what follows (`aftermath.ts`) */
export type FightOutcome = 'won' | 'died' | 'fled' | 'bailedOut';

/**
 * 0000:3D11. After a victory the called lads stay for it: the battle ends with the encounter
 * (`encounter` in `enemy.ts`).
 */
export function fight(rules: FightRules) {
  return Effect.gen(function* () {
    const st = yield* started;
    const enemyBudget = hitBudget(battle(st).enemy.stats.agility);
    const playerBudget = hitBudget(attr(st.player, 'agility'));
    const enemyHits = extraHits(enemyBudget, playerBudget);
    const playerHits = extraHits(playerBudget, enemyBudget);
    yield* emit({ type: 'fightStarted' });

    let spectators = 0;
    let outcome: FightOutcome | undefined;
    while (!outcome) {
      if (spectators < FULL_CROWD) {
        spectators++;
        if (spectators === FULL_CROWD) yield* emit({ type: 'crowdGathered' });
      }
      if (spectators === FULL_CROWD) yield* rules.crowd;

      const command = yield* promptCommand('fight');

      if (command === CMD.fight.kick) {
        yield* kickSeries(st, 'hero', playerHits);
        if (alive(battle(st).enemy)) yield* kickSeries(st, 'enemy', enemyHits);
      }
      if (command === CMD.fight.run) {
        const fled = rules.flee(st);
        yield* report(fled);
        if (fled.type !== 'cantRun') outcome = 'fled';
      }
      if (command === CMD.fight.beer) yield* drink('one');
      if (command === CMD.fight.beerUntilHealthy) yield* drink('untilHealthy');
      if (command === CMD.fight.joint) yield* report(smoke(st, FIGHT_JOINT));
      if (command === CMD.fight.stats) yield* emit({ type: 'stats' });
      if (command === CMD.fight.inspectEnemy) yield* emit({ type: 'enemyInfo' });
      if (command === CMD.fight.exit) return yield* halt;
      if (command === CMD.fight.kick && backupCalled(battle(st))) {
        // every kick brings the called lads closer
        yield* report({ type: 'backupApproached' });
        if (battle(st).backup === rules.backup.arrivesAt)
          yield* emit({ type: 'backupArrived', by: 'kicks' });
      }
      if (command === CMD.fight.callBackup) yield* callBackup(st, rules.backup);
      if (alive(battle(st).enemy) && backupHere(battle(st), rules.backup))
        yield* backupKicks(st, rules.backup);
      if (command === CMD.fight.shoot && st.player.body.pockets.pistol)
        yield* report(yield* shoot(st));

      if (!alive(st.player)) {
        if (rules.bailOut(st)) {
          yield* report({ type: 'bailedOut' });
          outcome = 'bailedOut';
        } else return 'died';
      }
      // the enemy may go down in the very turn the hero ran or was picked up
      if (!alive(battle(st).enemy)) outcome = 'won';
    }
    return outcome;
  });
}

/** the kicks of one side in a turn, while its budget lasts */
function kickSeries(st: Game, by: Side, hits: number) {
  return Effect.gen(function* () {
    let budget = hits;
    for (;;) {
      yield* report({ type: 'kick', by, hit: yield* kick(st, by, budget) });
      budget -= KICK;
      if ((by === 'hero' && !alive(battle(st).enemy)) || budget <= 0) return;
      yield* emit({ type: 'anotherKick', by });
      // sic: a hero at exactly 0 takes the next kick too
      if (by === 'enemy' && st.player.health.current < 0) return;
    }
  });
}

// ------------------------------------------------------------------ rules

/** what one kick costs of a hit budget */
export const KICK = 18;

/** the hit budget of a fighter: agility + 4, a kick per 18 */
export function hitBudget(agility: number): number {
  return agility + 4;
}

/** the attacker's budget against the defender's: a nimble defender takes kicks away */
export function extraHits(attacker: number, defender: number): number {
  let a = attacker;
  let d = defender;
  if (a <= 10) return a;
  while (d > KICK) {
    if (a < KICK + 10) return 10;
    a -= KICK;
    d -= KICK;
  }
  return a;
}

/** `x > Random(n) + 1` (Longint compare; Random is always called first) */
function luckBeats(x: number, n: number) {
  return Effect.map(rnd(n), (r) => x > r + 1);
}

/** a kick lands with 5% per budget point, never more than 90% (`roll` is 1..100) */
function lands(budget: number, roll: number): boolean {
  return budget * 5 >= roll && roll <= 90;
}

/** a critical kick adds the maximum damage: 3% per luck point */
function criticalKick(luck: number) {
  return luckBeats(luck * 3, 100);
}

/** a kick breaks a jaw or a leg: the attacker's luck against the defender's */
function breaksBone(attacker: number, defender: number) {
  return luckBeats(attacker * 3, defender * 3 + 200);
}

/** what a kick needs of a fighter */
interface Fighter {
  readonly luck: number;
  readonly damageMin: number;
  readonly damageMax: number;
  readonly armor: number;
  readonly injuries: Readonly<Injuries>;
}

function fighter(st: Game, side: Side): Fighter {
  if (side === 'hero') {
    const p = st.player;
    return {
      luck: attr(p, 'luck'),
      damageMin: attr(p, 'damageMin'),
      damageMax: attr(p, 'damageMax'),
      armor: attr(p, 'armor'),
      injuries: p.injuries,
    };
  }
  const e = battle(st).enemy;
  return {
    luck: e.stats.luck,
    damageMin: e.damage.min,
    damageMax: e.damage.max,
    armor: e.armor,
    injuries: e.injuries,
  };
}

/** one kick with what is left of the budget; no hit is a miss */
function kick(st: Game, by: Side, budget: number) {
  return Effect.gen(function* () {
    const attacker = fighter(st, by);
    const victim = fighter(st, by === 'hero' ? 'enemy' : 'hero');
    const guard = by === 'enemy' && st.player.body.mouth.guard;
    const roll = (yield* rnd(100)) + 1;
    if (!lands(budget, roll)) return undefined;
    let damage = attacker.damageMin + (yield* rnd(attacker.damageMax - attacker.damageMin)) + 1;
    let critical: number | undefined;
    if (yield* criticalKick(attacker.luck)) {
      damage += attacker.damageMax;
      critical = yield* rnd(3);
    }
    damage -= victim.armor;
    if (damage < 0) damage = 0;
    let broke: Hit['broke'];
    if (yield* breaksBone(attacker.luck, victim.luck)) {
      if ((yield* rnd(2)) === 0) {
        if (!victim.injuries.jaw) {
          if (!guard) broke = 'jaw';
          else broke = (yield* rnd(4)) === 0 ? 'jawThroughGuard' : 'guardHeld';
        }
      } else if (!victim.injuries.leg) broke = 'leg';
    }
    return { damage, critical, broke } satisfies Hit;
  });
}

/** `run`: running away costs the stats of the last level-up and the level itself */
function flee(st: Game): FleeEvent {
  if (st.player.injuries.leg) return { type: 'cantRun', because: 'leg' };
  if (st.player.progression.level <= 0) return { type: 'fledUnranked' };
  const denRumour = st.player.type !== 'gopnik' && levelInDistrict(st) === DEN_LEVEL;
  return { type: 'fled', lost: lostStats(st), denRumour };
}

/** a joint keeps the hero stoned for 3 turns of a fight */
export const FIGHT_JOINT = 3;

/** `kos` outside a fight */
export function smokeJoint(turns: number) {
  return Effect.flatMap(started, (st) => report(smoke(st, turns)));
}

/** `kos` — a joint: +2 strength for a while, heals up to 10 (fight: 3 turns, walking: 10) */
export function smoke(st: Game, turns: number): JointEvent {
  if (st.player.injuries.jaw) return { type: 'jointRefused', because: 'jaw' };
  if (st.player.stoned !== 0) return { type: 'jointRefused', because: 'stoned' };
  if (st.player.resources.joints <= 0) return { type: 'jointRefused', because: 'none' };
  const missing = attr(st.player, 'healthMax') - st.player.health.current;
  const full = missing < 10;
  return { type: 'smoked', healed: full ? missing : 10, full, turns };
}

type JointEvent = Extract<FightEvent, { type: 'jointRefused' | 'smoked' }>;

/** `v`: call the den lads; the phone brings them at once */
function callBackup(st: Game, backup: BackupRules) {
  return Effect.gen(function* () {
    const access = backup.access(st);
    if (access === 'granted') {
      if (st.player.body.pockets.phone) {
        yield* report({ type: 'backupCalled', count: backup.arrivesAt });
        yield* emit({ type: 'backupArrived', by: 'phone' });
      } else if (!backupCalled(battle(st))) yield* report({ type: 'backupCalled', count: 1 });
    } else yield* emit({ type: 'backupRefused', because: access });
    if (backupCalled(battle(st))) {
      if (!backupHere(battle(st), backup))
        yield* emit({ type: 'backupComing', turns: backup.arrivesAt - battle(st).backup });
      else if (battle(st).backup !== backup.arrivesAt || !st.player.body.pockets.phone)
        yield* emit({ type: 'backupAlreadyHere' });
    }
  });
}

/** the lads kick the enemy every turn, for respect, until they are beaten or fed up */
function backupKicks(st: Game, backup: BackupRules) {
  return Effect.gen(function* () {
    let damage = st.world.district * 3 + (yield* rnd(st.world.district * 4));
    damage -= div(battle(st).enemy.armor, 3);
    if (damage < 0) damage = 0;
    const hurt = (yield* rnd(2)) === 0;
    yield* report({ type: 'backupKicked', damage, hurt });
    // sic: never true, the lads kick only once they have arrived
    if (hurt && battle(st).backup === backup.arrivesAt)
      yield* emit({ type: 'backupArrived', by: 'time' });
    if (battle(st).backup === backup.beatenAt) yield* report({ type: 'backupBeaten' });
    if (st.player.respect <= 0) yield* report({ type: 'backupFedUp' });
  });
}

/** `f`: only reached with a pistol in the pocket */
function shoot(st: Game) {
  return Effect.gen(function* () {
    const pistol = st.player.body.pockets.pistol!;
    if (!st.world.trail && !pistol.silencer) return { type: 'shotForbidden' } satisfies FightEvent;
    if (pistol.bullets <= 0) return { type: 'outOfBullets' } satisfies FightEvent;
    const aim = yield* rnd(50);
    if (attr(st.player, 'agility') <= aim) return { type: 'shotMissed' } satisfies FightEvent;
    return { type: 'shotHit', damage: (yield* rnd(10)) + 20 } satisfies FightEvent;
  });
}

// ------------------------------------------------------------------ the state

/** what happens in a fight goes into the state */
function apply(st: Game, event: FightEvent) {
  const p = st.player;
  switch (event.type) {
    case 'kick':
      if (event.hit) kicked(st, event.by === 'hero' ? 'enemy' : 'hero', event.hit);
      return;
    case 'fled':
      levelDown(st);
      if (event.denRumour) st.world.places.den = true; // sic: the original grants access while saying the opposite
      return;
    case 'smoked':
      dec(p, 'joints', 1);
      p.stoned = u8(event.turns);
      return inc(p, 'health', event.healed);
    case 'backupCalled':
      battle(st).backup = event.count;
      return;
    case 'backupApproached':
      battle(st).backup = i16(battle(st).backup + 1);
      return;
    case 'backupKicked': {
      const combat = battle(st);
      combat.enemy.health.current = i16(combat.enemy.health.current - event.damage);
      if (event.hurt) combat.backup = i16(combat.backup + 1);
      return dec(p, 'respect', st.world.district * 5);
    }
    case 'backupBeaten':
    case 'backupFedUp':
      battle(st).backup = 0;
      return;
    case 'shotMissed':
    case 'shotHit': {
      const pistol = p.body.pockets.pistol!;
      pistol.bullets = i16(pistol.bullets - 1);
      if (event.type === 'shotHit') hurtEnemy(st, event.damage);
      return;
    }
    case 'bailedOut':
      return bailOut(p);
  }
}

/** the victim of a kick that landed takes its damage and maybe a broken bone */
function kicked(st: Game, victim: Side, hit: Hit) {
  const injuries = victim === 'hero' ? st.player.injuries : battle(st).enemy.injuries;
  if (victim === 'hero') dec(st.player, 'health', hit.damage);
  else hurtEnemy(st, hit.damage);
  if (hit.broke === 'jaw' || hit.broke === 'jawThroughGuard') injuries.jaw = true;
  if (hit.broke === 'leg') injuries.leg = true;
}

function hurtEnemy(st: Game, damage: number) {
  const { health } = battle(st).enemy;
  health.current = i16(health.current - damage);
}

/** the den lads pick up a beaten hero: respect, money for the treatment, full health */
function bailOut(p: Player) {
  dec(p, 'respect', 10);
  dec(p, 'money', round((attr(p, 'healthMax') / 5) * 3));
  set(p, 'health', attr(p, 'healthMax'));
  if (fractured(p.injuries)) {
    dec(p, 'money', 7);
    p.injuries.jaw = false;
    p.injuries.leg = false;
  }
  if (p.resources.money < 0) {
    inc(p, 'respect', p.resources.money);
    set(p, 'money', 0);
  }
}

// ------------------------------------------------------------------ conditions

/** spectators gather one per turn; a full crowd starts shouting */
const FULL_CROWD = 5;

function alive(fighter: { readonly health: { readonly current: number } }): boolean {
  return fighter.health.current > 0;
}

function fractured(injuries: Injuries): boolean {
  return injuries.jaw || injuries.leg;
}

/** respected enough for the den lads to come and help */
function respected(st: Game): boolean {
  return st.world.district * 10 + 10 <= st.player.respect;
}

/** a beaten hero is picked up by the den lads, for 10 respect */
function ladsBailOut(st: Game): boolean {
  return st.world.places.den && st.player.respect >= 10;
}

function backupCalled(combat: Battle): boolean {
  return combat.backup >= 1;
}

function backupHere(combat: Battle, backup: BackupRules): boolean {
  return combat.backup >= backup.arrivesAt;
}
