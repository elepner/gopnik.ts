/** What the player sees of the gym (`gym.ts`). */
import { Effect } from 'effect';

import { println, started } from '../prelude';
import { PLACES } from '../texts';
import type { View } from '../view';
import { tooCoolToTrain, trainedArmor } from './gym';
import { affordable } from './shop';

/** what the gym trains (or sells) */
export type Training = 'weights' | 'machines' | 'exp' | 'mouthGuard' | 'press';

export type GymEvent =
  /** the hero hasn't found the gym yet */
  | { readonly type: 'gymUnknown' }
  | { readonly type: 'enteredGym' }
  /** paid and trained: strength, vitality, 10 exp or armour */
  | { readonly type: 'gymTrained'; readonly training: Exclude<Training, 'mouthGuard'> }
  /** not enough money for it */
  | { readonly type: 'gymBroke'; readonly training: Training }
  /** the level is too high for the experience training */
  | { readonly type: 'gymTooCool' }
  | { readonly type: 'gymHasMouthGuard' }
  | { readonly type: 'gymBoughtMouthGuard' }
  /** the press can't be trained more in this district */
  | { readonly type: 'gymPressMaxed' };

/** the gym as the player sees it */
export const gymView: View<GymEvent> = {
  events: {
    gymUnknown: true,
    enteredGym: true,
    gymTrained: true,
    gymBroke: true,
    gymTooCool: true,
    gymHasMouthGuard: true,
    gymBoughtMouthGuard: true,
    gymPressMaxed: true,
  },
  show: (event) => showGym(event),
};

function showGym(event: GymEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'gymUnknown':
        return yield* println(PLACES.tyPokaNeznaeshGde());
      case 'enteredGym': {
        const c = (price: number) => affordable(st.player.resources.money >= price);
        yield* println(PLACES.tyPrishelVKachalku());
        yield* println(PLACES.n120KachatsyaGatelyami(c(20)));
        yield* println(PLACES.n220KachatsyaNa(c(20)));
        if (st.world.district > 1 && !tooCoolToTrain(st))
          yield* println(PLACES.n310ProkachatKachkov(c(10), 10));
        if (st.world.district > 1) yield* println(PLACES.n430KupitZubnuyu(c(30)));
        // sic: offered below district × 2, trained up to (district − 2) × 10
        if (st.world.district > 2 && trainedArmor(st.player) < st.world.district * 2)
          yield* println(PLACES.n520ProkachatPress(c(20)));
        return;
      }
      case 'gymTrained':
        switch (event.training) {
          case 'weights':
            yield* println(PLACES.tyProkachivaeshSilu());
            return yield* println(PLACES.sila1());
          case 'machines':
            yield* println(PLACES.tyProkachivaeshVynoslivost());
            return yield* println(PLACES.vynoslivost1());
          case 'exp':
            yield* println(PLACES.tyTrenirueshsya());
            return yield* println(PLACES.kachkovOpyta(10));
          case 'press':
            yield* println(PLACES.tyProkachivaeshPress());
            return yield* println(PLACES.bronya1());
        }
        return;
      case 'gymBroke':
        switch (event.training) {
          case 'weights':
          case 'machines':
            return yield* println(PLACES.neHvataet());
          case 'exp':
            return yield* println(PLACES.neHvataetDenzhat());
          case 'mouthGuard':
            return yield* println(PLACES.aNeHvataetRublikov());
          case 'press':
            return yield* println(PLACES.neHvataetRublikov());
        }
        return;
      case 'gymTooCool':
        return yield* println(PLACES.tySlishkomKrutoyChtoby());
      case 'gymHasMouthGuard':
        return yield* println(PLACES.uTebyaEstEta2());
      case 'gymBoughtMouthGuard':
        return yield* println(PLACES.tyKupilZaschitu());
      case 'gymPressMaxed':
        yield* println(PLACES.tyMaksimalnoProkachalPress());
        if (st.world.district < 4) yield* println(PLACES.kachayDalsheVSleduyuschem());
        return;
    }
  });
}
