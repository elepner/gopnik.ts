/**
 * The running game kept in localStorage: saved at every main prompt, so a reload goes on from
 * there; a lost game is forgotten. The state is a few kilobytes of plain data.
 */
import type { Game, GameState } from '../src/state/state';

const KEY = 'gopnik:autosave';

export function autosave(st: Game) {
  try {
    localStorage.setItem(KEY, JSON.stringify(st));
  } catch {
    // storage full or blocked: the game goes on without
  }
}

export function autosaved(): GameState | undefined {
  try {
    const json = localStorage.getItem(KEY);
    return json ? (JSON.parse(json) as GameState) : undefined;
  } catch {
    return undefined;
  }
}

export function forgetAutosave() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nothing kept
  }
}
