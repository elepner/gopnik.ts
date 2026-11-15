/** What the player sees of the club (`club.ts`). */
import { Effect } from 'effect';

import { typeName } from '../../state/names';
import { battle } from '../../state/state';
import { println, started } from '../prelude';
import { PLACES } from '../texts';
import type { View } from '../view';
import { CLUB_PRICE } from './club';
import { affordable } from './shop';

export type ClubEvent =
  /** the hero hasn't found the club yet */
  | { readonly type: 'clubUnknown' }
  /** thrown out lately (`heat.club`) */
  | { readonly type: 'clubBanned' }
  | { readonly type: 'enteredClub' }
  /** cards, but the money doesn't cover the bet */
  | { readonly type: 'clubCantCoverBet'; readonly bet: number }
  /** the disco: agility +1 */
  | { readonly type: 'clubDanced' }
  /** the cheat tricks: luck +1 */
  | { readonly type: 'clubLearnedTricks' }
  /** not enough money for the disco or the tricks */
  | { readonly type: 'clubBroke' }
  /** a round of cards starts with this bet */
  | { readonly type: 'clubBet'; readonly bet: number }
  | { readonly type: 'clubCardsWon'; readonly bet: number }
  | { readonly type: 'clubCardsLost'; readonly bet: number }
  /** the next round's bet after a win */
  | { readonly type: 'clubBetRaised'; readonly bet: number }
  /** the bets grew too fast: the battle's enemy calls the hero a cheat */
  | { readonly type: 'clubCaughtCheating' }
  | { readonly type: 'clubThrownOut' };

/** the club as the player sees it */
export const clubView: View<ClubEvent> = {
  events: {
    clubUnknown: true,
    clubBanned: true,
    enteredClub: true,
    clubCantCoverBet: true,
    clubDanced: true,
    clubLearnedTricks: true,
    clubBroke: true,
    clubBet: true,
    clubCardsWon: true,
    clubCardsLost: true,
    clubBetRaised: true,
    clubCaughtCheating: true,
    clubThrownOut: true,
  },
  show: (event) => showClub(event),
};

function showClub(event: ClubEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'clubUnknown':
        return yield* println(PLACES.tyPokaChtoNeuznal());
      case 'clubBanned':
        return yield* println(PLACES.tebeNeStoitPoka());
      case 'enteredClub':
        yield* println(PLACES.tyPrishelVKlub());
        yield* println(PLACES.zdesMozhnoSygratV());
        yield* println(
          PLACES.n115PotusovatsyaNa(affordable(st.player.resources.money >= CLUB_PRICE.disco))
        );
        if (st.world.district > 1)
          yield* println(
            PLACES.n222RazuznatPriemy(affordable(st.player.resources.money >= CLUB_PRICE.tricks))
          );
        return;
      case 'clubCantCoverBet':
        return yield* println(PLACES.neHvataetDenegNado(event.bet));
      case 'clubDanced':
        yield* println(PLACES.tyProkachivaeshLovkost());
        return yield* println(PLACES.lovkost1());
      case 'clubLearnedTricks':
        yield* println(PLACES.tyProkachivaeshUdachu());
        return yield* println(PLACES.udacha1());
      case 'clubBroke':
        return yield* println(PLACES.neHvataet());
      case 'clubBet':
        return yield* println(PLACES.tyPostavilRubley(event.bet));
      case 'clubCardsWon':
        return yield* println(PLACES.tyVyigralRubley(event.bet));
      case 'clubCardsLost':
        return yield* println(PLACES.tyProigralRubley(event.bet));
      case 'clubBetRaised':
        return yield* println(PLACES.stavkiIzmenilisTeperStavka(event.bet));
      case 'clubCaughtCheating': {
        const { enemy } = battle(st);
        yield* println(PLACES.kozelDaTyMuhleval());
        yield* println(PLACES.etoUrovnya(typeName(enemy.type), enemy.level));
        return yield* println(PLACES.tyPoluchaeshKachkovOpyta(st.world.district * 5));
      }
      case 'clubThrownOut':
        return yield* println(PLACES.unosiNogiPokaNe());
    }
  });
}
