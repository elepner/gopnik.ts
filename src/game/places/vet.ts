/** 0000:D39C — `rep`: the vet. */
import { Effect } from 'effect';

import { attr, dec, inc, set } from '../../state/attributes';
import type { Game, Player } from '../../state/state';
import { CMD, promptCommand } from '../commands';
import { emit, reporter } from '../events';
import { rnd, started } from '../prelude';
import type { VetEvent } from './vet-view';

const report = reporter(apply);

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
      if (p.resources.money >= 7) yield* report({ type: 'vetBonesFixed' });
      else yield* emit({ type: 'vetRefused' });
    }
    if (command === CMD.vet.patchUp && p.health.current < attr(p, 'healthMax')) {
      if (p.resources.money >= 3) yield* report({ type: 'vetPatchedUp', roll: yield* rnd(3) });
      else yield* emit({ type: 'vetRefused' });
    }
    if (command === CMD.vet.leave || command === CMD.vet.exit) return;
  }
});

/** nothing for the vet to do: full health, no broken bones */
export function healthy(p: Player): boolean {
  return p.health.current >= attr(p, 'healthMax') && !p.injuries.jaw && !p.injuries.leg;
}

/** what the vet does goes into the state */
function apply(st: Game, event: VetEvent) {
  const p = st.player;
  switch (event.type) {
    case 'vetBonesFixed':
      dec(p, 'money', 7);
      p.injuries.jaw = false;
      p.injuries.leg = false;
      return;
    case 'vetPatchedUp':
      dec(p, 'money', 3);
      inc(p, 'health', 5);
      if (p.health.current > attr(p, 'healthMax')) set(p, 'health', attr(p, 'healthMax'));
      return;
  }
}
