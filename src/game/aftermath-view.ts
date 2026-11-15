/**
 * What the player sees of a fight's aftermath: the events of `aftermath.ts` as the original's
 * lines and key pauses. Like the fight's view, it reads what the state already knows.
 */
import { Effect } from 'effect';

import { readKey } from '../crt/crt';
import { type ChainRing, type Item, outclassed } from '../state/items';
import { pausedLines } from './fight-view';
import { ringLines, showStats } from './hero';
import { println, started } from './prelude';
import type { Text } from './text';
import { FIGHT } from './texts';

export type AftermathEvent =
  | { readonly type: 'heroDied' }
  | { readonly type: 'killedByRector' }
  | { readonly type: 'rectorKilled' }
  | { readonly type: 'fakeRectorKilled' }
  | { readonly type: 'enemyDied' }
  /** a rector is worth a whole level */
  | { readonly type: 'levelEarned' }
  /** experience for the enemy's stats */
  | { readonly type: 'exp'; readonly exp: number }
  /** not enough for a level yet */
  | { readonly type: 'tooWeak' }
  /** the enemy's beer, money and junk, health and respect */
  | {
      readonly type: 'spoils';
      readonly beer: number;
      readonly money: number;
      readonly junk: number;
      readonly health: number;
      readonly respect: number;
    }
  | { readonly type: 'denOpened' }
  /** a ring of the chain drops from the enemy */
  | { readonly type: 'ringDropped'; readonly ring: ChainRing }
  /** a нарк's joints */
  | { readonly type: 'joints'; readonly joints: number }
  | { readonly type: 'found'; readonly item: Item }
  | { readonly type: 'denHelped'; readonly respect: number; readonly exp: number };

export function tell(event: AftermathEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'heroDied':
        yield* println(FIGHT.tySdoh());
        return yield* readKey;
      case 'killedByRector':
        yield* println(FIGHT.tySdohRektorTebya());
        return yield* readKey;
      case 'rectorKilled':
        yield* pausedLines(
          FIGHT.tyZamochilSamogoRektora(),
          FIGHT.vnovSilaTorzhestvuetNad(),
          FIGHT.posleEtogoSrazuNachalas(),
          FIGHT.iNeStydnoTebe()
        );
        yield* println(FIGHT.aRezultat());
        yield* showStats;
        return yield* readKey;
      case 'fakeRectorKilled':
        return yield* pausedLines(FIGHT.tyZamochilSamogoRektora2(), FIGHT.etoBylProrektorSuntsa());
      case 'enemyDied':
        return yield* println(FIGHT.vragSdoh());
      case 'levelEarned':
        return;
      case 'exp':
        return yield* println(FIGHT.zaOtpinVragaTy(event.exp));
      case 'tooWeak':
        yield* println(FIGHT.tyZapinalSlishkomSlabogo());
        return yield* println(
          FIGHT.seychasUTebyaKachkov(st.player.progression.exp, st.player.progression.expNext)
        );
      case 'spoils':
        return yield* println(FIGHT.pivoPobeditelyu());
      case 'denOpened':
        return yield* println(FIGHT.ponovostUlutshilasNaStolko());
      case 'ringDropped':
        yield* println(FIGHT.obaNaKolechkoVot());
        for (const line of ringLines(event.ring, FIGHT.megaKoltso())) yield* println(line);
        return;
      case 'joints':
        return yield* println(FIGHT.aUNarkaByl());
      case 'found': {
        yield* println(FOUND[event.item]!);
        const weapons = st.player.body.hands.weapons;
        if (event.item === 'knife' && weapons.cleaver) yield* println(FIGHT.noUtebyaEstTesak());
        else if (
          (event.item === 'knuckles' || event.item === 'club') &&
          outclassed(weapons, event.item)
        )
          yield* println(FIGHT.noUTebyaEst());
        return;
      }
      case 'denHelped':
        yield* println(FIGHT.tyOtpinalEtogoMudaka(event.respect));
        return yield* println(FIGHT.tyPoluchaeshKachkovOpyta(event.exp));
    }
  });
}

/** what enemies drop */
const FOUND: Partial<Record<Item, Text>> = {
  cross: FIGHT.tyNashelKrestikUdacha(),
  spasiRing: FIGHT.tyNashelKoltsoGospodi(),
  phone: FIGHT.tyNashelMobilu(),
  knuckles: FIGHT.tyNadybalKastetUron(),
  club: FIGHT.tyOtobralUVraga(),
  glasses: FIGHT.tyNashelTemnyeOchki(),
  knife: FIGHT.tyNashelNozhikUron(),
  cleaver: FIGHT.tyNashelTesakUron(),
};
