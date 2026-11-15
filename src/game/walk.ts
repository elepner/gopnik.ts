/** 0000:AEA1 — `w`/`run`: walking around and what happens on the way. */
import { Effect } from 'effect';

import { attr, inc, set } from '../state/attributes';
import { ENEMIES, enemyAt } from '../state/kinds';
import { battle, type Game } from '../state/state';
import { u8 } from '../tp/num';
import { settle } from './aftermath';
import { CMD, readAnswer } from './commands';
import { saveMage, temple } from './encounters';
import { encounter, spawnEnemy } from './enemy';
import { emit, reporter } from './events';
import { fight, STREET_FIGHT } from './fight';
import { luckAtLeast, rnd, started } from './prelude';
import { readLine } from './terminal';
import type { WalkEvent } from './walk-view';

const report = reporter(apply);

/** 0000:AEA1 — `w`/`run`: wander around looking for trouble */
export function walk(running: boolean) {
  return Effect.gen(function* () {
    const st = yield* started;
    // what the step changes is told against the state before it
    const stoned = st.player.stoned;
    const dealerCalls = st.world.dealerCalls;
    const heat = { ...st.world.heat };
    yield* report({ type: 'walkStepped' });
    if (stoned === 1) yield* emit({ type: 'walkSoberedUp' });
    if (running) yield* emit({ type: 'walkRan' });
    if (dealerCalls === 24 && st.world.dealerCalls === 25 && st.player.body.pockets.phone)
      yield* emit({ type: 'walkDealersCalled' });
    if (!st.world.den.helpQuest && (yield* rnd(20)) === 0) {
      yield* report({ type: 'walkDenQuest', quest: 'help' });
      if (st.world.places.den && st.player.body.pockets.phone)
        yield* emit({ type: 'walkDenCalledForHelp' });
    }
    if (!st.world.den.jobQuest && (yield* rnd(20)) === 0) {
      yield* report({ type: 'walkDenQuest', quest: 'job' });
      if (st.world.places.den && st.player.respect >= 100 && st.player.body.pockets.phone)
        yield* emit({ type: 'walkDenCalledForJob' });
    }
    if (st.player.body.pockets.phone && (yield* rnd(200)) === 0)
      yield* emit({ type: 'walkWrongNumber' });
    if (st.player.body.pockets.phone) {
      if ((yield* rnd(100)) === 0 && st.world.places.girlfriend) {
        yield* emit({ type: 'walkGirlfriendCalled' });
      }
      if (heat.market === 1 && st.world.places.den)
        yield* emit({ type: 'walkHeatCalled', from: 'market' });
      if (heat.club === 1 && st.world.places.den)
        yield* emit({ type: 'walkHeatCalled', from: 'club' });
    }
    for (const [place, odds] of FINDS)
      if ((yield* rnd(odds)) === 0 && !st.world.places[place])
        yield* report({ type: 'walkFound', place });
    if (st.player.body.hands.rings.pomiluy && (yield* rnd(20)) === 0) {
      if (!st.player.injuries.jaw && st.player.injuries.leg)
        yield* report({ type: 'walkHealed', injury: 'leg' });
      if (st.player.injuries.jaw) yield* report({ type: 'walkHealed', injury: 'jaw' });
    }
    if (st.player.type === 'vor' && (yield* luckAtLeast(st.world.district * 20))) {
      const money = (yield* rnd(st.world.district * 5)) + 1;
      yield* report({ type: 'walkMoneyFound', money });
    }
    // what happens on this walk: 1 path, 2 girl, 3 someone comes along, 4 nothing (by 1/25 odds)
    const roll = (yield* rnd(25)) + 1;
    let event = roll >= 10 ? 4 : roll >= 5 ? 3 : roll >= 2 ? 2 : 1;
    if ((yield* rnd(200)) === 0) {
      yield* temple;
      event = 0; // the temple visit is the whole walk
    }
    if ((yield* rnd(100)) === 0) yield* saveMage;
    switch (event) {
      case 1:
        return yield* report({ type: 'walkTrailToggled' });
      case 2:
        return yield* prettyGirl;
      case 3:
        return yield* meetSomeone;
      case 4:
        return yield* nothingHappens;
      default:
        return yield* emit({ type: 'walkQuiet' });
    }
  });
}

/** places found on the way, with the odds (1 in n) of finding each one */
const FINDS = [
  ['hospital', 10],
  ['market', 10],
  ['club', 100],
  ['gym', 100],
] as const;

const prettyGirl = Effect.gen(function* () {
  const st = yield* started;
  if (st.world.places.girlfriend) return yield* emit({ type: 'walkVeryQuiet' });
  yield* emit({ type: 'walkGirlSeen' });
  if ((yield* readAnswer) !== CMD.answer.yes) return;
  if ((yield* rnd(2)) === 0) yield* report({ type: 'walkGirlWon' });
  else yield* emit({ type: 'walkGirlLost' });
});

const meetSomeone = encounter(
  spawnEnemy(0),
  Effect.gen(function* () {
    const st = yield* started;
    let engaged = false;
    if (battle(st).enemy.type !== 'ment') {
      // the tattoo halves the odds of being picked on
      let sneak = st.world.district * 7 + 15;
      if (st.player.body.skin.tattoo) sneak = Math.trunc(sneak / 2);
      // weaklings never look for trouble; lads only when the hero is unlucky; thugs and maniacs always
      const group = ENEMIES[battle(st).enemy.type].group;
      const calm =
        ((yield* luckAtLeast(sneak)) || group === 'weakling') &&
        (group === 'weakling' || group === 'lad');
      yield* emit({ type: 'walkMet', calm });
      if ((yield* readAnswer) === CMD.answer.yes) engaged = true;
      else if (!calm) {
        engaged = (yield* rnd(2)) === 0;
        yield* emit({ type: engaged ? 'walkNoticed' : 'walkSlippedAway' });
      }
    } else {
      yield* emit({ type: 'walkCopMet' });
      if (yield* luckAtLeast(st.world.district * 7 + 15)) yield* emit({ type: 'walkCopHidden' });
      else if (st.player.body.eyes.glasses) yield* emit({ type: 'walkCopFooled' });
      else {
        yield* emit({ type: 'walkCopSpotted' });
        engaged = true;
      }
    }
    if (engaged) {
      yield* emit({ type: 'greeting', by: 'enemy' });
      yield* settle(yield* fight(STREET_FIGHT));
    }
  })
);

const nothingHappens = Effect.gen(function* () {
  const st = yield* started;
  if (st.player.stoned > 0 && (yield* rnd(7)) === 0) yield* emit({ type: 'walkFloating' });
  if (st.player.stoned > 0 && (yield* rnd(7)) === 0) {
    const enemy = enemyAt(yield* rnd(7));
    yield* emit({ type: 'walkGlitch', enemy, level: yield* rnd(st.world.district * 10 + 1) });
    yield* readLine; // the answer to a glitch goes nowhere
    yield* emit({ type: 'walkGlitchGone' });
  } else yield* emit({ type: 'walkQuiet' });
});

/** what happens on the way goes into the state */
function apply(st: Game, event: WalkEvent) {
  const p = st.player;
  const w = st.world;
  switch (event.type) {
    case 'walkStepped':
      return step(st);
    case 'walkDenQuest':
      if (event.quest === 'help') w.den.helpQuest = true;
      else w.den.jobQuest = true;
      return;
    case 'walkFound':
      w.places[event.place] = true;
      return;
    case 'walkHealed':
      p.injuries[event.injury] = false;
      return;
    case 'walkMoneyFound':
      return inc(p, 'money', event.money);
    case 'walkTrailToggled':
      w.trail = !w.trail;
      return;
    case 'walkGirlWon':
      w.places.girlfriend = true;
      return;
  }
}

/**
 * the time a walk takes, before anything happens on it: the joint wears off, the den's loans
 * refill, the dealers count the pistol's walks, the heat cools down, the hero heals
 */
function step(st: Game) {
  const p = st.player;
  const w = st.world;
  if (p.stoned > 0) p.stoned = u8(p.stoned - 1);
  if (w.den.loans < w.district * 10) w.den.loans = u8(w.den.loans + 1);
  if (w.places.dealers && p.body.pockets.pistol && w.dealerCalls < 25)
    w.dealerCalls = u8(w.dealerCalls + 1);
  if (w.heat.market > 0) w.heat.market = u8(w.heat.market - 1);
  if (w.heat.club > 0) w.heat.club = u8(w.heat.club - 1);
  // the ring «Помилуй» heals 3 up to the maximum, an отморозок 1
  if (p.body.hands.rings.pomiluy && p.health.current < attr(p, 'healthMax')) {
    inc(p, 'health', 3);
    if (p.health.current > attr(p, 'healthMax')) set(p, 'health', attr(p, 'healthMax'));
  }
  if (p.type === 'otmorozok' && p.health.current < attr(p, 'healthMax')) inc(p, 'health', 1);
}
