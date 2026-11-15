/** A view: the events of one part of the game it shows, and how. */
import type { Effect } from 'effect';

import type { EndOfInput, ICrt, IKeyboard } from '../crt/crt';
import type { IEngine } from './prelude';

export interface View<E extends { readonly type: string }> {
  /** every event type it shows (the views' types must not overlap) */
  readonly events: Record<E['type'], true>;
  /** shows an event; may read the state (`started`) and wait for a key */
  readonly show: (event: E) => Effect.Effect<void, EndOfInput, ICrt | IEngine | IKeyboard>;
}
