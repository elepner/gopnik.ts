/** What the player sees of walking around (`walk.ts`). */
import { Effect } from 'effect';

import type { EnemyKind } from '../state/kinds';
import { typeName } from '../state/names';
import { battle } from '../state/state';
import { pausedLines } from './fight-view';
import { println, started } from './prelude';
import { MAIN } from './texts';
import type { View } from './view';

export type WalkEvent =
  /** the time a walk takes: the joint wears off, loans refill, the heat cools, the hero heals */
  | { readonly type: 'walkStepped' }
  /** the joint wore off */
  | { readonly type: 'walkSoberedUp' }
  /** `run` instead of `w` */
  | { readonly type: 'walkRan' }
  /** the dealers call: the pistol's 25 walks are over */
  | { readonly type: 'walkDealersCalled' }
  /** the den has a quest now (the call comes only with a phone) */
  | { readonly type: 'walkDenQuest'; readonly quest: 'help' | 'job' }
  /** the den calls: a lad needs help */
  | { readonly type: 'walkDenCalledForHelp' }
  /** the den calls: there is a job */
  | { readonly type: 'walkDenCalledForJob' }
  /** somebody wants Вася */
  | { readonly type: 'walkWrongNumber' }
  | { readonly type: 'walkGirlfriendCalled' }
  /** the den warns: the market or the club is looking for the hero */
  | { readonly type: 'walkHeatCalled'; readonly from: 'market' | 'club' }
  | { readonly type: 'walkFound'; readonly place: 'hospital' | 'market' | 'club' | 'gym' }
  /** the ring «Помилуй» healed a bone */
  | { readonly type: 'walkHealed'; readonly injury: 'leg' | 'jaw' }
  /** a вор finds money on the way */
  | { readonly type: 'walkMoneyFound'; readonly money: number }
  /** on or off the trail (`world.trail`) */
  | { readonly type: 'walkTrailToggled' }
  | { readonly type: 'walkQuiet' }
  /** the girl event, with a girlfriend already */
  | { readonly type: 'walkVeryQuiet' }
  /** a pretty girl: chat her up? */
  | { readonly type: 'walkGirlSeen' }
  | { readonly type: 'walkGirlWon' }
  | { readonly type: 'walkGirlLost' }
  /** someone comes along (the enemy of the battle): pick on him? `calm`: he isn't looking for trouble */
  | { readonly type: 'walkMet'; readonly calm: boolean }
  /** said no, but he picks on the hero */
  | { readonly type: 'walkNoticed' }
  | { readonly type: 'walkSlippedAway' }
  /** a cop comes along */
  | { readonly type: 'walkCopMet' }
  | { readonly type: 'walkCopHidden' }
  /** the dark glasses */
  | { readonly type: 'walkCopFooled' }
  | { readonly type: 'walkCopSpotted' }
  /** stoned: everything swims */
  | { readonly type: 'walkFloating' }
  /** stoned: someone who isn't there comes along */
  | { readonly type: 'walkGlitch'; readonly enemy: EnemyKind; readonly level: number }
  | { readonly type: 'walkGlitchGone' };

/** walking as the player sees it */
export const walkView: View<WalkEvent> = {
  events: {
    walkStepped: true,
    walkDenQuest: true,
    walkSoberedUp: true,
    walkRan: true,
    walkDealersCalled: true,
    walkDenCalledForHelp: true,
    walkDenCalledForJob: true,
    walkWrongNumber: true,
    walkGirlfriendCalled: true,
    walkHeatCalled: true,
    walkFound: true,
    walkHealed: true,
    walkMoneyFound: true,
    walkTrailToggled: true,
    walkQuiet: true,
    walkVeryQuiet: true,
    walkGirlSeen: true,
    walkGirlWon: true,
    walkGirlLost: true,
    walkMet: true,
    walkNoticed: true,
    walkSlippedAway: true,
    walkCopMet: true,
    walkCopHidden: true,
    walkCopFooled: true,
    walkCopSpotted: true,
    walkFloating: true,
    walkGlitch: true,
    walkGlitchGone: true,
  },
  show: (event) => showWalk(event),
};

function showWalk(event: WalkEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'walkStepped':
      case 'walkDenQuest':
        return;
      case 'walkSoberedUp':
        return yield* println(MAIN.glyukiProshliSila2());
      case 'walkRan':
        return yield* println(MAIN.zabegalMudak());
      case 'walkDealersCalled':
        return yield* println(MAIN.telefonAleTyGde());
      case 'walkDenCalledForHelp':
        return yield* println(MAIN.telefonAleTyGde2(st.player.name));
      case 'walkDenCalledForJob':
        return yield* println(MAIN.telefonAleTySchas(st.player.name));
      case 'walkWrongNumber':
        yield* pausedLines(
          MAIN.telefonAleVasya(),
          MAIN.netEto(st.player.name),
          MAIN.telefonAVasyuMozhno()
        );
        return yield* println(MAIN.netOnBudetV());
      case 'walkGirlfriendCalled':
        yield* println(MAIN.telefonTvoyaPassiyaPrivet());
        return yield* println(MAIN.aTyBezbazarovZhdi());
      case 'walkHeatCalled':
        return yield* println(
          event.from === 'market' ? MAIN.telefonEtoTyTam() : MAIN.telefonTyCheTam()
        );
      case 'walkFound':
        return yield* println(FOUND[event.place]);
      case 'walkHealed':
        return yield* println(
          event.injury === 'leg' ? MAIN.tvoyaNogaZalechilasS() : MAIN.tvoyaChelyustZalechilasS()
        );
      case 'walkMoneyFound':
        return yield* println(MAIN.opaBabkiRubleyNa(event.money));
      case 'walkTrailToggled': {
        const district = st.world.district;
        if (district < 1 || district > 4) return;
        return yield* println((st.world.trail ? TRAIL_IN : TRAIL_OUT)[district - 1]!);
      }
      case 'walkQuiet':
        return yield* println(MAIN.nicheNeProishodit());
      case 'walkVeryQuiet':
        return yield* println(MAIN.sovsemNicheNeProishodit());
      case 'walkGirlSeen':
        return yield* println(MAIN.idetTipaKlevayaTsypa());
      case 'walkGirlWon':
        return yield* println(MAIN.tyTakoyPodkatyvaeshA());
      case 'walkGirlLost':
        return yield* println(MAIN.tyEschePodkatitNeuspel());
      case 'walkMet': {
        const { type, level } = battle(st).enemy;
        return yield* println(
          event.calm
            ? MAIN.idetUrovnyaHocheshNaehat(typeName(type), level)
            : MAIN.idetUrovnyaIschuschiyKogo(typeName(type), level)
        );
      }
      case 'walkNoticed':
        return yield* println(MAIN.onTebyaZametil());
      case 'walkSlippedAway':
        return yield* println(MAIN.tySmylsya());
      case 'walkCopMet':
        return yield* println(MAIN.idetMentyaraUrovnyaGroza(battle(st).enemy.level));
      case 'walkCopHidden':
        return yield* println(MAIN.tyZatailsyaPrikinulsyaNe());
      case 'walkCopFooled':
        yield* println(MAIN.tyNapyalilTemnyeOchki());
        return yield* println(MAIN.stendeRazyskivayutsyaZaGopnichestvo());
      case 'walkCopSpotted':
        return yield* println(MAIN.zapalil());
      case 'walkFloating':
        return yield* println(MAIN.vseKudaToPlyvet());
      case 'walkGlitch':
        return yield* println(MAIN.idetUrovnyaHocheshNaehat(typeName(event.enemy), event.level));
      case 'walkGlitchGone':
        return yield* println(MAIN.cheZaBotvaNi());
    }
  });
}

const FOUND = {
  hospital: MAIN.tySprosilUProhozhego(),
  market: MAIN.tyNashelBazar(),
  club: MAIN.tyUvidelObyavlenieTipa(),
  gym: MAIN.naSteneReklamaZhizn(),
};

const TRAIL_IN = [
  MAIN.tyZashelNaTropinku(),
  MAIN.tyZashelVKakie(),
  MAIN.tyZashelNaPlany(),
  MAIN.tyZashelCherteKuda(),
];
const TRAIL_OUT = [
  MAIN.tyVyshelSTropinki(),
  MAIN.tyVyshelIzPodvaroten(),
  MAIN.tyVyshelSPlanov(),
  MAIN.tyVyshelCherteOtkuda(),
];
