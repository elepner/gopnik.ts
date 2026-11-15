/** 0000:E386 — `trn`: the gym. */
import { Effect } from 'effect';

import { attr, inc } from '../../state/attributes';
import { i16, mod, u8 } from '../../tp/num';
import { CMD, promptCommand } from '../commands';
import { levelUp } from '../hero';
import { println, started } from '../prelude';
import { PLACES } from '../texts';
import { affordable } from './shop';

/** 0000:E386 — `trn`: the gym */
export const gym = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.gym) return yield* println(PLACES.tyPokaNeznaeshGde());
  /** armour from training only: total armour minus what the clothes give */
  let press = attr(st.player, 'armor');
  if (st.player.body.torso.abibas && !st.player.body.torso.adidas) press = u8(press - 1);
  if (st.player.body.torso.adidas) press = u8(press - 2);
  if (st.player.body.torso.leather && !st.player.body.torso.coolLeather) press = u8(press - 2);
  if (st.player.body.torso.coolLeather) press = u8(press - 4);
  yield* println(PLACES.tyPrishelVKachalku());
  const c = (price: number) => affordable(st.player.resources.money >= price);
  yield* println(PLACES.n120KachatsyaGatelyami(c(20)));
  yield* println(PLACES.n220KachatsyaNa(c(20)));
  if (st.world.district > 1 && st.world.district * 10 - 3 > st.player.progression.level)
    yield* println(PLACES.n310ProkachatKachkov(c(10), 10));
  if (st.world.district > 1) yield* println(PLACES.n430KupitZubnuyu(c(30)));
  if (st.world.district > 2 && press < st.world.district * 2)
    yield* println(PLACES.n520ProkachatPress(c(20)));
  for (;;) {
    const command = yield* promptCommand('gym');
    if (command === CMD.gym.weights) {
      if (st.player.resources.money >= 20) {
        st.player.resources.money = i16(st.player.resources.money - 20);
        yield* println(PLACES.tyProkachivaeshSilu());
        inc(st.player, 'strength', 1);
        inc(st.player, 'healthMax', 1);
        st.player.health.current = i16(st.player.health.current + 1);
        if (mod(attr(st.player, 'strength'), 2) === 0) inc(st.player, 'damageMin', 1);
        inc(st.player, 'damageMax', 1);
        yield* println(PLACES.sila1());
      } else yield* println(PLACES.neHvataet());
    }
    if (command === CMD.gym.machines) {
      if (st.player.resources.money >= 20) {
        st.player.resources.money = i16(st.player.resources.money - 20);
        yield* println(PLACES.tyProkachivaeshVynoslivost());
        inc(st.player, 'vitality', 1);
        inc(st.player, 'healthMax', 5);
        st.player.health.current = i16(st.player.health.current + 5);
        yield* println(PLACES.vynoslivost1());
      } else yield* println(PLACES.neHvataet());
    }
    if (st.world.district > 1 && command === CMD.gym.exp) {
      if (st.world.district * 10 - 3 <= st.player.progression.level)
        yield* println(PLACES.tySlishkomKrutoyChtoby());
      else if (st.player.resources.money < 10) yield* println(PLACES.neHvataetDenzhat());
      else {
        st.player.resources.money = i16(st.player.resources.money - 10);
        yield* println(PLACES.tyTrenirueshsya());
        st.player.progression.exp = i16(st.player.progression.exp + 10);
        yield* println(PLACES.kachkovOpyta(10));
        if (st.player.progression.exp >= st.player.progression.expNext) yield* levelUp(false);
      }
    }
    if (st.world.district > 1 && command === CMD.gym.mouthGuard) {
      if (st.player.body.mouth.guard) yield* println(PLACES.uTebyaEstEta2());
      else if (st.player.resources.money < 30) yield* println(PLACES.aNeHvataetRublikov());
      else {
        st.player.resources.money = i16(st.player.resources.money - 30);
        st.player.body.mouth.guard = true;
        yield* println(PLACES.tyKupilZaschitu());
      }
    }
    if (st.world.district > 2 && command === CMD.gym.press) {
      if (press < (st.world.district - 2) * 10) {
        if (st.player.resources.money < 20) yield* println(PLACES.neHvataetRublikov());
        else {
          st.player.resources.money = i16(st.player.resources.money - 20);
          yield* println(PLACES.tyProkachivaeshPress());
          inc(st.player, 'armor', 1);
          press = u8(press + 1);
          yield* println(PLACES.bronya1());
        }
      } else {
        yield* println(PLACES.tyMaksimalnoProkachalPress());
        if (st.world.district < 4) yield* println(PLACES.kachayDalsheVSleduyuschem());
      }
    }
    if (command === CMD.gym.leave) break;
  }
});
