/**
 * The game state in a stable, plain form for recordings (golden sessions) and comparisons:
 * every value as the game uses it. The hero's attributes are totals here (`attr`), whatever
 * base and boosts they are made of.
 */
import { attr, fromTotals } from './attributes';
import type {
  Damage,
  Game,
  GameState,
  Health,
  NotStartedGame,
  Player,
  PlayerBase,
  Stats,
} from './state';

interface Totals {
  readonly stats: Stats;
  readonly health: Health;
  readonly damage: Damage;
  readonly armor: number;
}

type Normalized<P> = Omit<P, 'base' | 'boosts' | 'health'> & Totals;

export type NormalizedState =
  | (Omit<NotStartedGame, 'player'> & { readonly player: Normalized<PlayerBase> })
  | (Omit<Game, 'player'> & { readonly player: Normalized<Player> });

/** plain JSON: what a recording holds is exactly what `normalize` returns (holes become null) */
export function normalize(st: GameState): NormalizedState {
  const { base: _base, boosts: _boosts, health, ...player } = st.player;
  const totals: Totals = {
    stats: {
      strength: attr(st.player, 'strength'),
      agility: attr(st.player, 'agility'),
      vitality: attr(st.player, 'vitality'),
      luck: attr(st.player, 'luck'),
    },
    health: { current: health.current, max: attr(st.player, 'healthMax') },
    damage: { min: attr(st.player, 'damageMin'), max: attr(st.player, 'damageMax') },
    armor: attr(st.player, 'armor'),
  };
  return JSON.parse(JSON.stringify({ ...st, player: { ...player, ...totals } }));
}

/** the totals become the base; a stoned hero's joint becomes its boost again */
export function denormalize(n: NormalizedState): GameState {
  const { stats, health, damage, armor, ...player } = structuredClone(n.player);
  const st = {
    ...structuredClone(n),
    player: {
      ...player,
      base: {
        ...stats,
        damageMin: damage.min,
        damageMax: damage.max,
        armor,
        healthMax: health.max,
      },
      boosts: {},
      health: { current: health.current },
    },
  } as GameState;
  fromTotals(st.player);
  return st;
}
