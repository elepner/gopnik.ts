/** 0000:D39C — `rep`: the vet. */
import { Effect } from 'effect';

import { attr } from '../../state/attributes';
import type { Player } from '../../state/state';
import { i16 } from '../../tp/num';
import { CMD, promptCommand } from '../commands';
import { emit } from '../events';
import { rnd, started } from '../prelude';

/** 0000:D39C — `rep`: the vet */
export const vet = Effect.gen(function* () {
  const st = yield* started;
  const p = st.player;
  if (!st.world.places.hospital) return yield* emit({ type: 'vetNotFound' });
  yield* emit({ type: 'enteredVet' });
  for (;;) {
    if (healthy(p)) return yield* emit({ type: 'vetSentAway' });
    const command = yield* promptCommand('vet');
    if (command === CMD.vet.fixBones && (p.injuries.jaw || p.injuries.leg)) {
      if (p.resources.money >= 7) {
        p.resources.money = i16(p.resources.money - 7);
        p.injuries.jaw = false;
        p.injuries.leg = false;
        yield* emit({ type: 'vetBonesFixed' });
      } else yield* emit({ type: 'vetRefused' });
    }
    if (command === CMD.vet.patchUp && p.health.current < attr(p, 'healthMax')) {
      if (p.resources.money >= 3) {
        p.resources.money = i16(p.resources.money - 3);
        p.health.current = i16(p.health.current + 5);
        if (p.health.current > attr(p, 'healthMax')) p.health.current = attr(p, 'healthMax');
        yield* emit({ type: 'vetPatchedUp', roll: yield* rnd(3) });
      } else yield* emit({ type: 'vetRefused' });
    }
    if (command === CMD.vet.leave || command === CMD.vet.exit) return;
  }
});

/** nothing for the vet to do: full health, no broken bones */
export function healthy(p: Player): boolean {
  return p.health.current >= attr(p, 'healthMax') && !p.injuries.jaw && !p.injuries.leg;
}
