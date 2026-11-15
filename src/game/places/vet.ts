/** 0000:D39C — `rep`: the vet. */
import { Effect } from 'effect';

import { attr } from '../../state/attributes';
import { i16 } from '../../tp/num';
import { CMD, promptCommand } from '../commands';
import { println, rnd, started } from '../prelude';
import { PLACES } from '../texts';
import { affordable } from './shop';

/** 0000:D39C — `rep`: the vet */
export const vet = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.hospital) return yield* println(PLACES.snachalaNaydiGdeNahodtsya());
  yield* println(PLACES.tyPrishelNaRemot());
  const healthy = () =>
    st.player.health.current >= attr(st.player, 'healthMax') &&
    !st.player.injuries.jaw &&
    !st.player.injuries.leg;
  if (!healthy()) {
    yield* println(PLACES.dokNeVolnuysyaVse());
    yield* println(PLACES.hZa3Rublya(affordable(st.player.resources.money >= 3)));
    yield* println(PLACES.rZa7Rubley(affordable(st.player.resources.money >= 7)));
  }
  for (;;) {
    if (healthy()) return yield* println(PLACES.dokValiOtsyudaTy());
    const command = yield* promptCommand('vet');
    if (command === CMD.vet.fixBones && (st.player.injuries.jaw || st.player.injuries.leg)) {
      if (st.player.resources.money >= 7) {
        st.player.resources.money = i16(st.player.resources.money - 7);
        st.player.injuries.jaw = false;
        st.player.injuries.leg = false;
        yield* println(PLACES.ogoDaTebyaNe());
        yield* println(PLACES.tvoiPerelomyZalecheny());
      } else yield* println(PLACES.blinHalyavschikMeditsinaNe());
    }
    if (command === CMD.vet.patchUp && st.player.health.current < attr(st.player, 'healthMax')) {
      if (st.player.resources.money >= 3) {
        st.player.resources.money = i16(st.player.resources.money - 3);
        st.player.health.current = i16(st.player.health.current + 5);
        if (st.player.health.current > attr(st.player, 'healthMax'))
          st.player.health.current = attr(st.player, 'healthMax');
        const r = yield* rnd(3);
        if (r === 1) yield* println(PLACES.schasGaykiPodtyanemI());
        else if (r === 2) yield* println(PLACES.takCheTutU());
        else {
          yield* println(PLACES.eyDokAZachem());
          yield* println(PLACES.dokMolchiZhivotnoe());
        }
        yield* println(PLACES.zdorovya(st.player.health.current, attr(st.player, 'healthMax')));
      } else yield* println(PLACES.blinHalyavschikMeditsinaNe());
    }
    if (command === CMD.vet.leave || command === CMD.vet.exit) return;
  }
});
