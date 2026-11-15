import { describe, expect, it } from '@effect/vitest';
import { Effect, Exit } from 'effect';

import { hero, play } from '../../../test/game';
import { attr, set } from '../../state/attributes';
import type { GameState } from '../../state/state';
import { District } from '../../tp/brands';
import { i16 } from '../../tp/num';
import type { GameEvent } from '../events';
import { club, CLUB_PRICE } from './club';

const keys = (...lines: string[]) => lines.flatMap((l) => [...l.split(''), 'enter']);

/** a hero who knows the club, with money for a few rounds */
function inClub(s: GameState, money = 20) {
  const st = hero(s);
  st.world.places.club = true;
  st.player.resources.money = money;
  return st;
}

/** luck 100 wins every round of cards in district 1 (Random(12)), luck -1 loses every one */
const lucky = (s: GameState) => set(inClub(s).player, 'luck', 100);
const unlucky = (s: GameState) => set(inClub(s).player, 'luck', i16(-1));

/** plays the club with these command lines; `types` are the events without the prompts */
function visit(setup: (s: GameState) => void, ...lines: string[]) {
  return Effect.gen(function* () {
    const events: GameEvent[] = [];
    const played = yield* play(club, { keys: keys(...lines), setup, events });
    const types = events.filter((e) => e.type !== 'prompt').map((e) => e.type);
    return { ...played, events, types };
  });
}

describe('club (0000:DEFC)', () => {
  it.effect('an unknown club is not there', () =>
    Effect.gen(function* () {
      const { events, exit } = yield* visit(hero);
      expect(events).toEqual([{ type: 'clubUnknown' }]);
      expect(Exit.isSuccess(exit)).toBe(true);
    })
  );

  it.effect('the club is closed while the hero is banned', () =>
    Effect.gen(function* () {
      const { events } = yield* visit((s) => (inClub(s).world.heat.club = 3));
      expect(events).toEqual([{ type: 'clubBanned' }]);
    })
  );

  it.effect('the hero enters and leaves with w', () =>
    Effect.gen(function* () {
      const { events, exit, st } = yield* visit(inClub, 'w');
      expect(events).toEqual([{ type: 'enteredClub' }, { type: 'prompt', context: 'club' }]);
      expect(Exit.isSuccess(exit)).toBe(true);
      expect(st.player.resources.money).toBe(20);
    })
  );

  it.effect('the disco costs 15 and gives agility', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(inClub, '1', 'w');
      expect(types).toEqual(['enteredClub', 'clubDanced']);
      expect(st.player.resources.money).toBe(20 - CLUB_PRICE.disco);
      expect(attr(st.player, 'agility')).toBe(3);
    })
  );

  it.effect('no disco without the money', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit((s) => inClub(s, CLUB_PRICE.disco - 1), '1', 'w');
      expect(types).toEqual(['enteredClub', 'clubBroke']);
      expect([st.player.resources.money, attr(st.player, 'agility')]).toEqual([14, 2]);
    })
  );

  it.effect('cheat tricks cost 22 and give luck from district 2 on', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(
        (s) => (inClub(s, 30).world.district = District(2)),
        '2',
        'w'
      );
      expect(types).toEqual(['enteredClub', 'clubLearnedTricks']);
      expect([st.player.resources.money, attr(st.player, 'luck')]).toEqual([
        30 - CLUB_PRICE.tricks,
        2,
      ]);
    })
  );

  it.effect('no cheat tricks without the money', () =>
    Effect.gen(function* () {
      const { types, st } = yield* visit(
        (s) => (inClub(s, CLUB_PRICE.tricks - 1).world.district = District(2)),
        '2',
        'w'
      );
      expect(types).toEqual(['enteredClub', 'clubBroke']);
      expect([st.player.resources.money, attr(st.player, 'luck')]).toEqual([21, 1]);
    })
  );

  it.effect('district 1 has no cheat tricks: 2 does nothing', () =>
    Effect.gen(function* () {
      const { events, st } = yield* visit((s) => inClub(s, 30), '2', 'w');
      expect(events).toEqual([
        { type: 'enteredClub' },
        { type: 'prompt', context: 'club' },
        { type: 'prompt', context: 'club' },
      ]);
      expect([st.player.resources.money, attr(st.player, 'luck')]).toEqual([30, 1]);
    })
  );

  it.effect('cards need money for the bet', () =>
    Effect.gen(function* () {
      const { types, events, rand, st } = yield* visit((s) => inClub(s, 4), 'p', 'w');
      expect(types).toEqual(['enteredClub', 'clubCantCoverBet']);
      expect(events).toContainEqual({ type: 'clubCantCoverBet', bet: 5 });
      expect(rand).toHaveLength(0);
      expect(st.player.resources.money).toBe(4);
    })
  );

  it.effect('a won round pays twice the bet, gives district experience and raises the bet', () =>
    Effect.gen(function* () {
      const { events, types, rand, st } = yield* visit(lucky, 'p', 'w');
      expect(types).toEqual([
        'enteredClub',
        'clubBet',
        'clubCardsWon',
        'heroExpGained',
        'clubBetRaised',
      ]);
      expect(events).toContainEqual({ type: 'clubBetRaised', bet: 7 });
      expect(rand.map((r) => r.n)).toEqual([12]); // the luck check: Random(district * 12)
      expect([st.player.resources.money, st.player.progression.exp]).toEqual([20 + 5, 1]);
    })
  );

  it.effect('the raised bet stays for the next round', () =>
    Effect.gen(function* () {
      const { events } = yield* visit(lucky, 'p', 'p', 'w');
      expect(events.filter((e) => e.type === 'clubBet')).toEqual([
        { type: 'clubBet', bet: 5 },
        { type: 'clubBet', bet: 7 },
      ]);
    })
  );

  it.effect('a lost round takes the bet and puts it back to 5', () =>
    Effect.gen(function* () {
      const { events, types, st } = yield* visit(unlucky, 'p', 'w');
      expect(types).toEqual(['enteredClub', 'clubBet', 'clubCardsLost']);
      expect(events).toContainEqual({ type: 'clubCardsLost', bet: 5 });
      expect([st.player.resources.money, st.player.progression.exp]).toEqual([15, 0]);
    })
  );

  /** bets 5 7 9 11 13 15: the sixth win makes 17 */
  const cheat = ['p', 'p', 'p', 'p', 'p', 'p'];

  it.effect('a bet of 17 means the hero cheated: a fight with a bouncer', () =>
    Effect.gen(function* () {
      const { events, types, exit, st } = yield* visit(lucky, ...cheat);
      const last = types.slice(types.lastIndexOf('clubCardsWon'));
      expect(last.slice(0, 4)).toEqual([
        'clubCardsWon',
        'heroExpGained',
        'clubCaughtCheating',
        'heroExpSpent',
      ]);
      expect(last).toContain('fightStarted');
      expect(types.filter((t) => t === 'clubBetRaised')).toHaveLength(5);
      expect(events.at(-1)).toEqual({ type: 'prompt', context: 'fight' });
      expect(Exit.isFailure(exit)).toBe(true); // the keys ran out in the fight
      expect(st.player.progression.level).toBe(1); // 6 for the wins + 5 for being caught
    })
  );

  it.effect('after the fight the hero is thrown out and banned for five walks', () =>
    Effect.gen(function* () {
      const { types, exit, st } = yield* visit(lucky, ...cheat, 'run');
      expect(types.slice(-2)).toEqual(['fled', 'clubThrownOut']);
      expect(Exit.isSuccess(exit)).toBe(true); // out of the club without a w
      expect(st.world.heat.club).toBe(5);
    })
  );
});
