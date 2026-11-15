/** 0000:E386 — `trn`: the gym. */
import { Effect } from 'effect';

import { attr, dec, inc } from '../../state/attributes';
import type { Game, Player } from '../../state/state';
import { mod, u8 } from '../../tp/num';
import { CMD, promptCommand } from '../commands';
import { emit, reporter } from '../events';
import { levelUp } from '../hero';
import { started } from '../prelude';
import type { GymEvent, Training } from './gym-view';

const report = reporter(apply);

/** what each training (or the mouth guard) costs */
export const GYM_PRICE: Record<Training, number> = {
  weights: 20,
  machines: 20,
  exp: 10,
  mouthGuard: 30,
  press: 20,
};

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
  const affords = (training: Training) => st.player.resources.money >= GYM_PRICE[training];
  for (;;) {
    const command = yield* promptCommand('gym');
    if (command === CMD.gym.weights) {
      if (affords('weights')) yield* report({ type: 'gymTrained', training: 'weights' });
      else yield* emit({ type: 'gymBroke', training: 'weights' });
    }
    if (command === CMD.gym.machines) {
      if (affords('machines')) yield* report({ type: 'gymTrained', training: 'machines' });
      else yield* emit({ type: 'gymBroke', training: 'machines' });
    }
    if (st.world.district > 1 && command === CMD.gym.exp) {
      if (tooCoolToTrain(st)) yield* emit({ type: 'gymTooCool' });
      else if (!affords('exp')) yield* emit({ type: 'gymBroke', training: 'exp' });
      else {
        yield* report({ type: 'gymTrained', training: 'exp' });
        if (st.player.progression.exp >= st.player.progression.expNext) yield* levelUp(false);
      }
    }
    if (st.world.district > 1 && command === CMD.gym.mouthGuard) {
      if (st.player.body.mouth.guard) yield* emit({ type: 'gymHasMouthGuard' });
      else if (!affords('mouthGuard')) yield* emit({ type: 'gymBroke', training: 'mouthGuard' });
      else yield* report({ type: 'gymBoughtMouthGuard' });
    }
    if (st.world.district > 2 && command === CMD.gym.press) {
      if (press < (st.world.district - 2) * 10) {
        if (!affords('press')) yield* emit({ type: 'gymBroke', training: 'press' });
        else {
          yield* report({ type: 'gymTrained', training: 'press' });
          press = u8(press + 1);
        }
      } else yield* emit({ type: 'gymPressMaxed' });
    }
    if (command === CMD.gym.leave) break;
  }
});

/** what happens in the gym goes into the state */
function apply(st: Game, event: GymEvent) {
  const p = st.player;
  switch (event.type) {
    case 'gymTrained':
      dec(p, 'money', GYM_PRICE[event.training]);
      return TRAINING[event.training](p);
    case 'gymBoughtMouthGuard':
      dec(p, 'money', GYM_PRICE.mouthGuard);
      p.body.mouth.guard = true;
      return;
  }
}

/** what each training raises */
const TRAINING: Record<Exclude<Training, 'mouthGuard'>, (p: Player) => void> = {
  weights: (p) => {
    inc(p, 'strength', 1);
    inc(p, 'healthMax', 1);
    inc(p, 'health', 1);
    if (mod(attr(p, 'strength'), 2) === 0) inc(p, 'damageMin', 1);
    inc(p, 'damageMax', 1);
  },
  machines: (p) => {
    inc(p, 'vitality', 1);
    inc(p, 'healthMax', 5);
    inc(p, 'health', 5);
  },
  exp: (p) => inc(p, 'exp', 10),
  press: (p) => inc(p, 'armor', 1),
};
