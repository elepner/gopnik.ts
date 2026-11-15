/** 0000:DEFC — `kl`: the club and its cards. */
import { Effect } from 'effect';

import { inc } from '../../state/attributes';
import { typeName } from '../../state/names';
import { battle } from '../../state/state';
import { i16, u8 } from '../../tp/num';
import { settle } from '../aftermath';
import { CMD, promptCommand } from '../commands';
import { encounter, spawnEnemy } from '../enemy';
import { fight, STREET_FIGHT } from '../fight';
import { levelUp } from '../hero';
import { gainExp } from '../hero';
import { luckAtLeast, println, started } from '../prelude';
import { PLACES } from '../texts';
import { affordable } from './shop';

/** 0000:DEFC — `kl`: the club */
export const club = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.club) return yield* println(PLACES.tyPokaChtoNeuznal());
  if (st.world.heat.club > 0) return yield* println(PLACES.tebeNeStoitPoka());
  yield* println(PLACES.tyPrishelVKlub());
  yield* println(PLACES.zdesMozhnoSygratV());
  yield* println(PLACES.n115PotusovatsyaNa(affordable(st.player.resources.money >= 15)));
  if (st.world.district > 1) {
    yield* println(PLACES.n222RazuznatPriemy(affordable(st.player.resources.money >= 22)));
  }
  let bet = 5;
  for (;;) {
    const command = yield* promptCommand('club');
    if (command === CMD.club.playCards) {
      if (bet <= st.player.resources.money) {
        const round = yield* playCards(bet);
        bet = round.bet;
        if (round.thrownOut) break;
      } else yield* println(PLACES.neHvataetDenegNado(bet));
    }
    if (command === CMD.club.disco) {
      if (st.player.resources.money >= 15) {
        st.player.resources.money = i16(st.player.resources.money - 15);
        yield* println(PLACES.tyProkachivaeshLovkost());
        inc(st.player, 'agility', 1);
        yield* println(PLACES.lovkost1());
      } else yield* println(PLACES.neHvataet());
    }
    if (st.world.district > 1 && command === CMD.club.cheatTricks) {
      if (st.player.resources.money >= 22) {
        st.player.resources.money = i16(st.player.resources.money - 22);
        yield* println(PLACES.tyProkachivaeshUdachu());
        inc(st.player, 'luck', 1);
        yield* println(PLACES.udacha1());
      } else yield* println(PLACES.neHvataet());
    }
    if (command === CMD.club.leave) break;
  }
});

/** one round of cards: the next bet (a byte; 17 and more means "you cheated"), and whether the hero was thrown out */
function playCards(stake: number) {
  return Effect.gen(function* () {
    let bet = stake;
    const st = yield* started;
    yield* println(PLACES.tyPostavilRubley(bet));
    st.player.resources.money = i16(st.player.resources.money - bet);
    if (yield* luckAtLeast(st.world.district * 12)) {
      st.player.resources.money = i16(st.player.resources.money + bet * 2);
      yield* println(PLACES.tyVyigralRubley(bet));
      bet = u8(bet + 2);
      yield* gainExp(st.world.district);
    } else {
      yield* println(PLACES.tyProigralRubley(bet));
      bet = 5;
    }
    if (bet < 17 && bet > 5) yield* println(PLACES.stavkiIzmenilisTeperStavka(bet));
    if (bet < 17) return { bet, thrownOut: false };
    yield* encounter(
      spawnEnemy(1),
      Effect.gen(function* () {
        yield* println(PLACES.kozelDaTyMuhleval());
        yield* println(PLACES.etoUrovnya(typeName(battle(st).enemy.type), battle(st).enemy.level));
        yield* println(PLACES.tyPoluchaeshKachkovOpyta(st.world.district * 5));
        st.player.progression.exp = i16(st.player.progression.exp + st.world.district * 5);
        yield* levelUp(false);
        yield* settle(yield* fight(STREET_FIGHT));
      })
    );
    yield* println(PLACES.unosiNogiPokaNe());
    st.world.heat.club = 5;
    return { bet, thrownOut: true };
  });
}
