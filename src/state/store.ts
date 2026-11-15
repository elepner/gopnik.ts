/**
 * Immutable game state with transactions. Committed versions are frozen immer snapshots.
 * A transaction (one game command) works on a single immer draft: game code mutates it with
 * plain assignments, and the end of the transaction commits one new snapshot. Code outside
 * a transaction (rendering, tests, an LLM layer) only ever sees frozen snapshots.
 */
import { createDraft, current, type Draft, finishDraft, freeze } from 'immer';

import type { GameState } from './state';

export interface Store {
  /** the last committed snapshot */
  readonly committed: GameState;
  /** the open transaction's draft, if any */
  readonly draft: Draft<GameState> | undefined;
}

export function createStore(initial: GameState): Store {
  return { committed: freeze(initial, true), draft: undefined };
}

/** opens a transaction; returns false when one is already open (nested procedures join it) */
export function begin(store: Store): boolean {
  if (store.draft) return false;
  writable(store).draft = createDraft(store.committed);
  return true;
}

/** ends the open transaction with one new snapshot */
export function commit(store: Store) {
  const s = writable(store);
  if (!s.draft) throw new Error('no open transaction');
  s.committed = finishDraft(s.draft) as GameState;
  s.draft = undefined;
}

/** the draft of the open transaction — the state game code works on */
export function draft(store: Store): Draft<GameState> {
  if (!store.draft) throw new Error('game state is only changed inside a transaction');
  return store.draft;
}

/** the state as it is right now: the committed snapshot or a frozen copy of the open draft */
export function snapshot(store: Store): GameState {
  return store.draft ? (freeze(current(store.draft), true) as GameState) : store.committed;
}

function writable(store: Store) {
  return store as { committed: GameState; draft: Draft<GameState> | undefined };
}
