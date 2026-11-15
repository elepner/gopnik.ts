/** 0000:DEFC — `kl`: the club and its cards. */
import { Effect } from 'effect';

import { inc } from '../../state/attributes';
import { i16, u8 } from '../../tp/num';
import { settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { emit } from '../events';
import { fight, STREET_FIGHT } from '../fight';
import { gainExp, levelUp } from '../hero';
import { luckAtLeast, started } from '../prelude';

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
      if (st.player.resources.money >= 15) {
        st.player.resources.money = i16(st.player.resources.money - 15);
        inc(st.player, 'agility', 1);
        yield* emit({ type: 'clubDanced' });
      } else yield* emit({ type: 'clubBroke' });
    }
    if (st.world.district > 1 && command === CMD.club.cheatTricks) {
      if (st.player.resources.money >= 22) {
        st.player.resources.money = i16(st.player.resources.money - 22);
        inc(st.player, 'luck', 1);
        yield* emit({ type: 'clubLearnedTricks' });
      } else yield* emit({ type: 'clubBroke' });
    }
    if (command === CMD.club.leave) break;
  }
});

/** one round of cards: the next bet (a byte; 17 and more means "you cheated"), and whether the hero was thrown out */
function playCards(stake: number) {
  return Effect.gen(function* () {
    let bet = stake;
    const st = yield* started;
    yield* emit({ type: 'clubBet', bet });
    st.player.resources.money = i16(st.player.resources.money - bet);
    if (yield* luckAtLeast(st.world.district * 12)) {
      st.player.resources.money = i16(st.player.resources.money + bet * 2);
      yield* emit({ type: 'clubCardsWon', bet });
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
        yield* emit({ type: 'clubCaughtCheating' });
        st.player.progression.exp = i16(st.player.progression.exp + st.world.district * 5);
        yield* levelUp(false);
        yield* settle(yield* fight(STREET_FIGHT));
      })
    );
    yield* emit({ type: 'clubThrownOut' });
    st.world.heat.club = 5;
    return { bet, thrownOut: true };
  });
}
