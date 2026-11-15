/** 0000:E386 — `trn`: the gym. */
import { Effect } from 'effect';

import { attr, inc } from '../../state/attributes';
import type { Game, Player } from '../../state/state';
import { i16, mod, u8 } from '../../tp/num';
import { CMD, promptCommand } from '../commands';
import { emit } from '../events';
import { levelUp } from '../hero';
import { started } from '../prelude';

/** armour from training only: total armour minus what the clothes give */
export function trainedArmor(p: Player) {
  let press = attr(p, 'armor');
  if (p.body.torso.abibas && !p.body.torso.adidas) press = u8(press - 1);
  if (p.body.torso.adidas) press = u8(press - 2);
  if (p.body.torso.leather && !p.body.torso.coolLeather) press = u8(press - 2);
  if (p.body.torso.coolLeather) press = u8(press - 4);
  return press;
}

/** the hero's level is too high to train experience in this district */
export function tooCoolToTrain(st: Game) {
  return st.world.district * 10 - 3 <= st.player.progression.level;
}

/** 0000:E386 — `trn`: the gym */
export const gym = Effect.gen(function* () {
  const st = yield* started;
  if (!st.world.places.gym) return yield* emit({ type: 'gymUnknown' });
  let press = trainedArmor(st.player);
  yield* emit({ type: 'enteredGym' });
  for (;;) {
    const command = yield* promptCommand('gym');
    if (command === CMD.gym.weights) {
      if (st.player.resources.money >= 20) {
        st.player.resources.money = i16(st.player.resources.money - 20);
        inc(st.player, 'strength', 1);
        inc(st.player, 'healthMax', 1);
        st.player.health.current = i16(st.player.health.current + 1);
        if (mod(attr(st.player, 'strength'), 2) === 0) inc(st.player, 'damageMin', 1);
        inc(st.player, 'damageMax', 1);
        yield* emit({ type: 'gymTrained', training: 'weights' });
      } else yield* emit({ type: 'gymBroke', training: 'weights' });
    }
    if (command === CMD.gym.machines) {
      if (st.player.resources.money >= 20) {
        st.player.resources.money = i16(st.player.resources.money - 20);
        inc(st.player, 'vitality', 1);
        inc(st.player, 'healthMax', 5);
        st.player.health.current = i16(st.player.health.current + 5);
        yield* emit({ type: 'gymTrained', training: 'machines' });
      } else yield* emit({ type: 'gymBroke', training: 'machines' });
    }
    if (st.world.district > 1 && command === CMD.gym.exp) {
      if (tooCoolToTrain(st)) yield* emit({ type: 'gymTooCool' });
      else if (st.player.resources.money < 10) yield* emit({ type: 'gymBroke', training: 'exp' });
      else {
        st.player.resources.money = i16(st.player.resources.money - 10);
        st.player.progression.exp = i16(st.player.progression.exp + 10);
        yield* emit({ type: 'gymTrained', training: 'exp' });
        if (st.player.progression.exp >= st.player.progression.expNext) yield* levelUp(false);
      }
    }
    if (st.world.district > 1 && command === CMD.gym.mouthGuard) {
      if (st.player.body.mouth.guard) yield* emit({ type: 'gymHasMouthGuard' });
      else if (st.player.resources.money < 30)
        yield* emit({ type: 'gymBroke', training: 'mouthGuard' });
      else {
        st.player.resources.money = i16(st.player.resources.money - 30);
        st.player.body.mouth.guard = true;
        yield* emit({ type: 'gymBoughtMouthGuard' });
      }
    }
    if (st.world.district > 2 && command === CMD.gym.press) {
      if (press < (st.world.district - 2) * 10) {
        if (st.player.resources.money < 20) yield* emit({ type: 'gymBroke', training: 'press' });
        else {
          st.player.resources.money = i16(st.player.resources.money - 20);
          inc(st.player, 'armor', 1);
          press = u8(press + 1);
          yield* emit({ type: 'gymTrained', training: 'press' });
        }
      } else yield* emit({ type: 'gymPressMaxed' });
    }
    if (command === CMD.gym.leave) break;
  }
});
