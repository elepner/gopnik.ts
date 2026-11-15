/** 0000:DEFC — `kl`: the club and its cards. */
import { Effect } from 'effect';

import { dec, inc } from '../../state/attributes';
import type { Game } from '../../state/state';
import { u8 } from '../../tp/num';
import { settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit, reporter } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp, levelUp } from '../hero';
import { luckAtLeast, started } from '../prelude';
import type { ClubEvent } from './club-view';

const report = reporter(apply);

/** what the disco and the cheat tricks cost */
export const CLUB_PRICE = { disco: 15, tricks: 22 } as const;

/** 0000:DEFC — `kl`: the club */
export const club = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.club) return yield* emit({ type: 'clubUnknown' });
  if (st.world.heat.club > 0) return yield* emit({ type: 'clubBanned' });
  yield* emit({ type: 'enteredClub' });
  let bet = 5;
  for (;;) {
    const command = yield* promptCommand('club');
    if (command === CMD.club.playCards) {
      if (bet <= st.player.resources.money) {
        const round = yield* playCards(bet);
        bet = round.bet;
        if (round.thrownOut) break;
      } else yield* emit({ type: 'clubCantCoverBet', bet });
    }
    if (command === CMD.club.disco) {
      if (st.player.resources.money >= CLUB_PRICE.disco) yield* report({ type: 'clubDanced' });
      else yield* emit({ type: 'clubBroke' });
    }
    if (st.world.district > 1 && command === CMD.club.cheatTricks) {
      if (st.player.resources.money >= CLUB_PRICE.tricks)
        yield* report({ type: 'clubLearnedTricks' });
      else yield* emit({ type: 'clubBroke' });
    }
    if (command === CMD.club.leave) break;
  }
});

/** one round of cards: the next bet (a byte; 17 and more means "you cheated"), and whether the hero was thrown out */
function playCards(stake: number) {
  return Effect.gen(function* () {
    let bet = stake;
    const st = yield* started;
    yield* report({ type: 'clubBet', bet });
    if (yield* luckAtLeast(st.world.district * 12)) {
      yield* report({ type: 'clubCardsWon', bet });
      bet = u8(bet + 2);
      yield* gainExp(st.world.district);
    } else {
      yield* emit({ type: 'clubCardsLost', bet });
      bet = 5;
    }
    if (bet < 17 && bet > 5) yield* emit({ type: 'clubBetRaised', bet });
    if (bet < 17) return { bet, thrownOut: false };
    yield* encounter(
      spawnEnemy(1),
      Effect.gen(function* () {
        yield* report({ type: 'clubCaughtCheating' });
        yield* levelUp(false);
        yield* settle(yield* fight(STREET_FIGHT));
      })
    );
    yield* report({ type: 'clubThrownOut' });
    return { bet, thrownOut: true };
  });
}

/** what happens in the club goes into the state */
function apply(st: Game, event: ClubEvent) {
  const p = st.player;
  switch (event.type) {
    case 'clubDanced':
      dec(p, 'money', CLUB_PRICE.disco);
      return inc(p, 'agility', 1);
    case 'clubLearnedTricks':
      dec(p, 'money', CLUB_PRICE.tricks);
      return inc(p, 'luck', 1);
    case 'clubBet':
      return dec(p, 'money', event.bet);
    case 'clubCardsWon':
      return inc(p, 'money', event.bet * 2);
    case 'clubCaughtCheating':
      return inc(p, 'exp', st.world.district * 5);
    case 'clubThrownOut':
      st.world.heat.club = 5;
      return;
  }
}
