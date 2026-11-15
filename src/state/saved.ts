/**
 * What a save holds, as plain data: the hero, the version banner and the temple visits — the
 * fields of the original's SAVE_R?.SAV record. The district comes from the slot it is loaded
 * from; the known places are saved apart (Рушель Блаво keeps them); the rest of the world is not
 * saved. `legacy.ts` turns it into the original's bytes, the browser keeps it as JSON.
 */
import { type Game, type GameState, type Player, startGame } from './state';

export interface SavedGame {
  readonly version: string;
  readonly player: Player;
  readonly templeVisits: number;
}

/** the save of a game (a copy: the game goes on) */
export function savedGame(st: Game): SavedGame {
  return copy({ version: st.version, player: st.player, templeVisits: st.world.templeVisits });
}

/** a save loaded into a state: the hero and what else the save holds; the world stays */
export function loadSave(state: GameState, saved: SavedGame): Game {
  const st = startGame(state, saved.player.type);
  st.version = saved.version;
  st.world.templeVisits = saved.templeVisits;
  (st as { player: Player }).player = copy(saved.player);
  return st;
}

/** plain data through JSON: also a draft of the state comes out as a plain copy */
function copy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
