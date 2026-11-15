/**
 * The fight (0000:3D11). The loop applies the rules and tells what happened; a rule only
 * updates the state and returns the events that describe its update; what the player sees of
 * them is in `fight-view.ts`. An event is told right after its rule, before the next one runs:
 * the view reads the state.
 */
import { Effect } from 'effect';

import { readLine } from '../crt/crt';
import { ENEMIES } from '../state/kinds';
import {
  type Combat,
  type Enemy,
  type Health,
  type Injuries,
  type StartedGame,
  type StatKey,
  type Weapons,
} from '../state/state';
import { div, i16, mod, round, u8 } from '../tp/num';
import { CMD, parseCommand } from './commands';
import { showEnemy } from './enemy';
import { type FightEvent, type Hit, type Side, tell } from './fight-view';
import { drinkBeer, levelUp, nextRing, showStats } from './hero';
import { halt, lowerCase, luckAtLeast, rnd, started } from './prelude';
import { gameOver, victoryAnimation } from './screens';

/** why the fight started */
export type FightKind =
  /** met someone while walking */
  | 'street'
  /** caught stealing at the market */
  | 'caughtStealing'
  /** caught cheating at cards in the club */
  | 'caughtCheating'
  | 'fakeRector'
  | 'rector'
  /** cops during the den job */
  | 'cops'
  /** helping a lad of the den */
  | 'denHelp';

/** 0000:3D11 */
export function fight(kind: FightKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* tell({ type: 'greeting', kind });
    const enemyBudget = hitBudget(st.enemy.stats.agility);
    const playerBudget = hitBudget(st.player.stats.agility);
    const enemyHits = extraHits(enemyBudget, playerBudget);
    if (losesKicks(enemyBudget, enemyHits))
      yield* tell({
        type: 'slowedDown',
        side: 'enemy',
        kicks: kicks(enemyHits),
        of: kicks(enemyBudget),
      });
    const playerHits = extraHits(playerBudget, enemyBudget);
    if (losesKicks(playerBudget, playerHits))
      yield* tell({
        type: 'slowedDown',
        side: 'hero',
        kicks: kicks(playerHits),
        of: kicks(playerBudget),
      });

    let spectators = 0;
    let over = false;
    while (!over) {
      if (spectators < FULL_CROWD) {
        spectators++;
        if (spectators === FULL_CROWD) yield* tell({ type: 'crowdGathered' });
      }
      if (!st.world.rector && spectators === FULL_CROWD && (yield* rnd(10)) === 0)
        yield* tell({ type: 'crowdShout', line: yield* rnd(18) });

      yield* tell({ type: 'prompt' });
      st.session.lastAnswer = lowerCase(yield* readLine);
      const input = parseCommand('fight', st.session.lastAnswer);

      if (input === CMD.fight.kick) {
        yield* kickSeries('hero', playerHits);
        if (alive(st.enemy)) yield* kickSeries('enemy', enemyHits);
      }
      if (input === CMD.fight.run) {
        const fled = flee(st);
        yield* tell(fled);
        if (fled.type !== 'cantRun') over = true;
      }
      if (input === CMD.fight.beer) yield* drinkBeer('one');
      if (input === CMD.fight.beerUntilHealthy) yield* drinkBeer('untilHealthy');
      if (input === CMD.fight.joint) yield* tell(smoke(st, 3));
      if (input === CMD.fight.stats) yield* showStats;
      if (input === CMD.fight.inspectEnemy) yield* showEnemy;
      if (input === CMD.fight.exit) return yield* halt;
      if (input === CMD.fight.kick && backupApproaches(st.combat))
        yield* tell({ type: 'backupArrived', by: 'kicks' });
      if (input === CMD.fight.callBackup) yield* tell(...callBackup(st));
      if (alive(st.enemy) && backupHere(st.combat)) yield* tell(...(yield* backupKicks(st)));
      if (input === CMD.fight.shoot && st.player.body.pockets.pistol) yield* tell(yield* shoot(st));

      if (!alive(st.player)) {
        if (!st.world.rector && ladsBailOut(st)) {
          yield* tell(bailOut(st));
          over = true;
        } else {
          yield* tell({ type: 'heroDied', byRector: st.world.rector });
          yield* gameOver(false);
        }
      }
      if (!alive(st.enemy)) {
        yield* enemyDied(kind);
        over = true;
      }
    }
    st.combat.backup = 0;
  });
}

/** the kicks of one side in a turn, while its budget lasts */
function kickSeries(by: Side, hits: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    let budget = hits;
    for (;;) {
      yield* tell({ type: 'kick', by, hit: yield* kick(st, by, budget) });
      budget -= KICK;
      if ((by === 'hero' && !alive(st.enemy)) || budget <= 0) return;
      yield* tell({ type: 'anotherKick', by });
      // sic: a hero at exactly 0 takes the next kick too
      if (by === 'enemy' && st.player.health.current < 0) return;
    }
  });
}

/** 0000:4150 — the enemy is down: experience, spoils, maybe a ring and loot */
function enemyDied(kind: FightKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (kind === 'rector' || kind === 'fakeRector') {
      st.player.progression.exp = st.player.progression.expNext;
      yield* levelUp(true);
    }
    if (kind === 'rector') {
      yield* tell({ type: 'rectorKilled' });
      return yield* victoryAnimation;
    }
    const fakeRector = kind === 'fakeRector';
    yield* tell({ type: fakeRector ? 'fakeRectorKilled' : 'enemyDied' });
    if (!fakeRector) yield* tell(gainEnemyExp(st));
    if (st.player.progression.exp >= st.player.progression.expNext) yield* levelUp(false);
    else if (!fakeRector) yield* tell({ type: 'tooWeak' });
    yield* tell(takeSpoils(st));
    if (openDen(st)) yield* tell({ type: 'denOpened' });
    if ((yield* rnd(30)) === 0) {
      const ring = nextRing(st);
      if (ring) yield* tell({ type: 'ringDropped', ring });
    }
    yield* tell(...(yield* loot(st)));
    if (kind === 'denHelp') {
      yield* tell(rewardDenHelp(st));
      yield* levelUp(false);
    }
  });
}

/** `kos` — a joint: +2 strength for a while, heals up to 10 (fight: 3 turns, walking: 10) */
export function smokeJoint(turns: number) {
  return Effect.andThen(started, (st) => tell(smoke(st, turns)));
}

// ------------------------------------------------------------------ rules

/** what one kick costs of a hit budget */
const KICK = 18;

/** the hit budget of a fighter: agility + 4, a kick per 18 */
function hitBudget(agility: number): number {
  return agility + 4;
}

/** kicks per turn of a hit budget */
function kicks(budget: number): number {
  return div(budget - 1, KICK) + 1;
}

/** the attacker's budget against the defender's: a nimble defender takes kicks away */
function extraHits(attacker: number, defender: number): number {
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

/** the opponent's agility took kicks away from a budget worth more than one */
function losesKicks(budget: number, hits: number): boolean {
  return budget > KICK && div(hits, KICK) < div(budget, KICK);
}

/** `x > Random(n) + 1` (Longint compare; Random is always called first) */
function luckBeats(x: number, n: number) {
  return Effect.gen(function* () {
    const r = yield* rnd(n);
    return x > r + 1;
  });
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

type Fighter = Pick<Enemy, 'stats' | 'health' | 'damage' | 'armor' | 'injuries'>;

/** one kick with what is left of the budget; no hit is a miss */
function kick(st: StartedGame, by: Side, budget: number) {
  return Effect.gen(function* () {
    const [attacker, victim]: [Fighter, Fighter] =
      by === 'hero' ? [st.player, st.enemy] : [st.enemy, st.player];
    const guard = by === 'enemy' && st.player.body.mouth.guard;
    const roll = (yield* rnd(100)) + 1;
    if (!lands(budget, roll)) return undefined;
    const prev = victim.health.current;
    let dmg = attacker.damage.min + (yield* rnd(attacker.damage.max - attacker.damage.min)) + 1;
    let critical: number | undefined;
    if (yield* criticalKick(attacker.stats.luck)) {
      dmg += attacker.damage.max;
      critical = yield* rnd(3);
    }
    dmg -= victim.armor;
    if (dmg < 0) dmg = 0;
    victim.health.current = i16(victim.health.current - dmg);
    let broke: Hit['broke'];
    if (yield* breaksBone(attacker.stats.luck, victim.stats.luck)) {
      if ((yield* rnd(2)) === 0) {
        if (!victim.injuries.jaw) {
          if (!guard) broke = 'jaw';
          else broke = (yield* rnd(4)) === 0 ? 'jawThroughGuard' : 'guardHeld';
          if (broke !== 'guardHeld') victim.injuries.jaw = true;
        }
      } else if (!victim.injuries.leg) {
        broke = 'leg';
        victim.injuries.leg = true;
      }
    }
    return { damage: prev - victim.health.current, critical, broke } satisfies Hit;
  });
}

/** `run`: running away costs the stats of the last level-up and the level itself */
function flee(st: StartedGame): FightEvent & { type: 'cantRun' | 'fled' | 'fledUnranked' } {
  if (st.world.rector) return { type: 'cantRun', because: 'rector' };
  if (st.player.injuries.leg) return { type: 'cantRun', because: 'leg' };
  const progression = st.player.progression;
  if (progression.level <= 0) return { type: 'fledUnranked' };
  const lost = progression.history[progression.level] ?? [];
  progression.history[progression.level] = [];
  for (const stat of lost) loseStat(st, stat);
  const denRumour = st.player.type !== 'gopnik' && levelInDistrict(st) === DEN_LEVEL;
  if (denRumour) st.world.places.den = true; // sic: the original grants access while saying the opposite
  progression.level = i16(progression.level - 1);
  progression.expNext = i16(progression.expNext - 10);
  if (progression.exp >= progression.expNext) progression.exp = i16(progression.expNext - 1);
  return { type: 'fled', lost, denRumour };
}

/** running away takes back the stats of the last level-up */
function loseStat(st: StartedGame, stat: StatKey) {
  if (stat === 'strength') {
    st.player.stats.strength = i16(st.player.stats.strength - 1);
    st.player.damage.max = i16(st.player.damage.max - 1);
    if (mod(st.player.stats.strength, 2) === 1)
      st.player.damage.min = i16(st.player.damage.min - 1);
    st.player.health.max = i16(st.player.health.max - 1);
    if (st.player.health.current > st.player.health.max)
      st.player.health.current = st.player.health.max;
  } else if (stat === 'agility') {
    st.player.stats.agility = i16(st.player.stats.agility - 1);
  } else if (stat === 'vitality') {
    st.player.stats.vitality = i16(st.player.stats.vitality - 1);
    st.player.health.max = i16(st.player.health.max - 5);
    if (st.player.health.current > st.player.health.max)
      st.player.health.current = st.player.health.max;
  } else if (stat === 'luck') {
    st.player.stats.luck = i16(st.player.stats.luck - 1);
  }
}

function smoke(st: StartedGame, turns: number): FightEvent {
  if (st.player.injuries.jaw) return { type: 'jointRefused', because: 'jaw' };
  if (st.player.stoned !== 0) return { type: 'jointRefused', because: 'stoned' };
  if (st.player.resources.joints <= 0) return { type: 'jointRefused', because: 'none' };
  st.player.resources.joints = i16(st.player.resources.joints - 1);
  st.player.stoned = u8(turns);
  st.player.stats.strength = i16(st.player.stats.strength + 2);
  st.player.damage.min = i16(st.player.damage.min + 1);
  st.player.damage.max = i16(st.player.damage.max + 2);
  const full = st.player.health.max - st.player.health.current < 10;
  const healed = full ? st.player.health.max - st.player.health.current : 10;
  st.player.health.current = full ? st.player.health.max : i16(st.player.health.current + 10);
  return { type: 'smoked', healed, full, inFight: turns === 3 };
}

/** every kick brings the called lads closer; true when they arrive */
function backupApproaches(combat: Combat): boolean {
  if (!backupCalled(combat)) return false;
  combat.backup = i16(combat.backup + 1);
  return combat.backup === BACKUP_ARRIVED;
}

/** `v`: call the den lads; the phone brings them at once */
function callBackup(st: StartedGame): FightEvent[] {
  const events: FightEvent[] = [];
  if (st.world.places.den && respected(st)) {
    if (!backupCalled(st.combat)) st.combat.backup = 1;
    if (st.player.body.pockets.phone) {
      st.combat.backup = BACKUP_ARRIVED;
      events.push({ type: 'backupArrived', by: 'phone' });
    }
  } else events.push({ type: 'backupRefused', because: st.world.places.den ? 'respect' : 'den' });
  if (backupCalled(st.combat)) {
    if (!backupHere(st.combat))
      events.push({ type: 'backupComing', turns: BACKUP_ARRIVED - st.combat.backup });
    else if (st.combat.backup !== BACKUP_ARRIVED || !st.player.body.pockets.phone)
      events.push({ type: 'backupAlreadyHere' });
  }
  return events;
}

/** the lads kick the enemy every turn, for respect, until they are beaten or fed up */
function backupKicks(st: StartedGame) {
  return Effect.gen(function* () {
    const events: FightEvent[] = [];
    const prev = st.enemy.health.current;
    let dmg = st.world.district * 3 + (yield* rnd(st.world.district * 4));
    dmg -= div(st.enemy.armor, 3);
    if (dmg < 0) dmg = 0;
    st.enemy.health.current = i16(st.enemy.health.current - dmg);
    events.push({ type: 'backupKicked', damage: prev - st.enemy.health.current });
    if ((yield* rnd(2)) === 0) {
      st.combat.backup = i16(st.combat.backup + 1);
      if (st.combat.backup === BACKUP_ARRIVED) events.push({ type: 'backupArrived', by: 'time' });
    }
    if (st.combat.backup === BACKUP_BEATEN) {
      st.combat.backup = 0;
      events.push({ type: 'backupBeaten' });
    }
    st.player.respect = i16(st.player.respect - st.world.district * 5);
    if (st.player.respect <= 0) {
      st.combat.backup = 0;
      events.push({ type: 'backupFedUp' });
    }
    return events;
  });
}

/** `f`: only reached with a pistol in the pocket */
function shoot(st: StartedGame) {
  return Effect.gen(function* () {
    const pistol = st.player.body.pockets.pistol!;
    if (!st.world.trail && !pistol.silencer) return { type: 'shotForbidden' } satisfies FightEvent;
    if (pistol.bullets <= 0) return { type: 'outOfBullets' } satisfies FightEvent;
    pistol.bullets = i16(pistol.bullets - 1);
    const aim = yield* rnd(50);
    if (st.player.stats.agility <= aim) return { type: 'shotMissed' } satisfies FightEvent;
    const prev = st.enemy.health.current;
    st.enemy.health.current = i16(st.enemy.health.current - ((yield* rnd(10)) + 20));
    return { type: 'shotHit', damage: prev - st.enemy.health.current } satisfies FightEvent;
  });
}

/** the den lads pick up a beaten hero: respect, money for the treatment, full health */
function bailOut(st: StartedGame): FightEvent {
  st.player.respect = i16(st.player.respect - 10);
  st.player.resources.money = i16(
    st.player.resources.money - round((st.player.health.max / 5) * 3)
  );
  st.player.health.current = st.player.health.max;
  if (fractured(st.player.injuries)) {
    st.player.resources.money = i16(st.player.resources.money - 7);
    st.player.injuries.jaw = false;
    st.player.injuries.leg = false;
  }
  if (st.player.resources.money < 0) {
    st.player.respect = i16(st.player.respect + st.player.resources.money);
    st.player.resources.money = 0;
  }
  return { type: 'bailedOut' };
}

/** experience for an enemy: the sum of its stats */
function gainEnemyExp(st: StartedGame): FightEvent {
  const { strength, agility, vitality, luck } = st.enemy.stats;
  const exp = strength + agility + vitality + luck;
  st.player.progression.exp = i16(st.player.progression.exp + exp);
  return { type: 'exp', exp };
}

/** the enemy's beer, money and junk, 5 health and respect by its tier and level */
function takeSpoils(st: StartedGame): FightEvent {
  st.player.resources.beer = i16(st.player.resources.beer + st.enemy.loot.beer);
  st.player.resources.money = i16(st.player.resources.money + st.enemy.loot.money);
  st.player.resources.junk = i16(st.player.resources.junk + st.enemy.loot.junk);
  st.player.health.current = i16(st.player.health.current + 5);
  if (st.player.health.current > st.player.health.max)
    st.player.health.current = st.player.health.max;
  st.player.respect = i16(
    st.player.respect + (ENEMIES[st.enemy.type].tier + 1 + div(st.enemy.level, 3))
  );
  return { type: 'victoryBeer' };
}

/** true when the den opens now */
function openDen(st: StartedGame): boolean {
  if (st.world.places.den || levelInDistrict(st) < DEN_LEVEL) return false;
  st.world.places.den = true;
  return true;
}

function rewardDenHelp(st: StartedGame): FightEvent {
  const respect = st.world.district * 20;
  const exp = st.world.district * 10;
  st.player.respect = i16(st.player.respect + respect);
  st.player.progression.exp = i16(st.player.progression.exp + exp);
  return { type: 'denHelped', respect, exp };
}

/** what a lucky hero finds on the enemy, by its kind */
function loot(st: StartedGame) {
  return Effect.gen(function* () {
    const events: FightEvent[] = [];
    if ((yield* luckAtLeast(st.world.district * 25)) && st.enemy.type === 'nark') {
      st.player.resources.joints = i16(st.player.resources.joints + (yield* rnd(3)));
      events.push({ type: 'narkJoints' });
    }
    if (!(yield* luckAtLeast(st.world.district * 40))) return events;
    const found = (item: Extract<FightEvent, { type: 'found' }>['item']) =>
      events.push({ type: 'found', item });
    const weapon = (n: number) => {
      st.player.damage.min = i16(st.player.damage.min + n);
      st.player.damage.max = i16(st.player.damage.max + n);
    };
    const w = st.player.body.hands.weapons;
    const group = ENEMIES[st.enemy.type].group;
    if (st.enemy.type === 'nefor') {
      const r = yield* rnd(3);
      if (r === 0 && !st.player.body.neck.cross) {
        st.player.stats.luck = i16(st.player.stats.luck + 2);
        st.player.body.neck.cross = true;
        found('cross');
      } else if (r === 1 && !st.player.body.hands.rings.spasi) {
        st.player.stats.luck = i16(st.player.stats.luck + 1);
        st.player.body.hands.rings.spasi = true;
        found('spasiRing');
      } else if (r === 2 && !st.player.body.pockets.phone) {
        st.player.body.pockets.phone = true;
        found('phone');
      }
    } else if (group === 'lad') {
      const r = yield* rnd(2);
      if (r === 0 && !w.knuckles) {
        w.knuckles = true;
        found('knuckles');
        if (noneOf(w, 'knife', 'club', 'cleaver')) weapon(2);
        else events.push({ type: 'betterWeaponInHand' });
      } else if (r === 1 && !w.club) {
        w.club = true;
        found('club');
        if (noneOf(w, 'knife', 'cleaver')) weapon(w.knuckles ? 2 : 4);
        else events.push({ type: 'betterWeaponInHand' });
      }
    } else if (group === 'thug') {
      const r = yield* rnd(2);
      if (r === 0 && !st.player.body.eyes.glasses) {
        st.player.body.eyes.glasses = true;
        found('glasses');
      } else if (r === 1 && !st.player.body.pockets.phone) {
        st.player.body.pockets.phone = true;
        found('phone');
      }
    } else if (group === 'maniac') {
      const r = yield* rnd(2);
      if (r === 0 && !w.knife) {
        w.knife = true;
        found('knife');
        // sic: the original's boolean arithmetic, stacking bonuses
        if (!w.club === w.knuckles) weapon(4);
        if (w.club) weapon(2);
        if (noneOf(w, 'knuckles', 'club', 'cleaver')) weapon(6);
        if (w.cleaver) events.push({ type: 'cleaverInHand' });
      } else if (r === 1 && !w.cleaver) {
        w.cleaver = true;
        found('cleaver');
        if ((!w.club && !w.knife) === w.knuckles) weapon(7);
        if (w.club && !w.knife) weapon(5);
        if (w.knife) weapon(3);
        if (noneOf(w, 'knuckles', 'club', 'knife')) weapon(9);
      }
    }
    return events;
  });
}

// ------------------------------------------------------------------ conditions

/** spectators gather one per turn; a full crowd starts shouting */
const FULL_CROWD = 5;

/** the third level of a district opens the den */
const DEN_LEVEL = 3;

/** called lads join the fight at this count (the phone brings them at once) */
const BACKUP_ARRIVED = 3;

/** and get beaten up at this one */
const BACKUP_BEATEN = 7;

function alive(fighter: { readonly health: Health }): boolean {
  return fighter.health.current > 0;
}

function fractured(injuries: Injuries): boolean {
  return injuries.jaw || injuries.leg;
}

/** the hero's level counted from the start of the current district (10 levels each) */
function levelInDistrict(st: StartedGame): number {
  return st.player.progression.level - (st.world.district - 1) * 10;
}

/** respected enough for the den lads to come and help */
function respected(st: StartedGame): boolean {
  return st.world.district * 10 + 10 <= st.player.respect;
}

/** a beaten hero is picked up by the den lads, for 10 respect */
function ladsBailOut(st: StartedGame): boolean {
  return st.world.places.den && st.player.respect >= 10;
}

function backupCalled(combat: Combat): boolean {
  return combat.backup >= 1;
}

function backupHere(combat: Combat): boolean {
  return combat.backup >= BACKUP_ARRIVED;
}

/** none of these weapons in hand (a new weapon only adds the difference to the best one) */
function noneOf(weapons: Weapons, ...names: (keyof Weapons)[]): boolean {
  return names.every((name) => !weapons[name]);
}
