/** What the player sees of the rare encounters (`encounters.ts`): the mage and the temple. */
import { Effect } from 'effect';

import { readKey, writeLn } from '../crt/crt';
import type { ChainRing } from '../state/items';
import { rankName, typeName } from '../state/names';
import { pausedLines } from './fight-view';
import { ringLines } from './hero';
import { println, started } from './prelude';
import { ENCOUNTERS } from './texts';
import type { View } from './view';

export type Blessing =
  | 'level'
  | 'strength'
  | 'agility'
  | 'vitality'
  | 'luck'
  | 'ring'
  | 'armor'
  | 'respect';

export type EncountersEvent =
  /** Рушель Блаво offers to save: yes? */
  | { readonly type: 'mageMet' }
  | { readonly type: 'mageDeclined' }
  /** not enough money */
  | { readonly type: 'mageUnpaid' }
  /** paid for the save, before it is written */
  | { readonly type: 'magePaid' }
  | { readonly type: 'mageSaved' }
  /** the temple, before this visit is counted (`world.templeVisits`) */
  | { readonly type: 'templeEntered' }
  /** God's blessing (this visit counted): what it gives at once is given, the level-up and
   *  strength follow */
  | { readonly type: 'templeBlessed'; readonly blessing: Blessing }
  /** the next ring of the chain, given */
  | { readonly type: 'templeRingGiven'; readonly ring: ChainRing }
  /** the respect just given */
  | { readonly type: 'templeRespect'; readonly respect: number }
  | { readonly type: 'templeLeft' };

/** the encounters as the player sees them */
export const encountersView: View<EncountersEvent> = {
  events: {
    mageMet: true,
    mageDeclined: true,
    mageUnpaid: true,
    magePaid: true,
    mageSaved: true,
    templeEntered: true,
    templeBlessed: true,
    templeRingGiven: true,
    templeRespect: true,
    templeLeft: true,
  },
  show: (event) => showEncounters(event),
};

function showEncounters(event: EncountersEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'mageMet':
        yield* pausedLines(
          ENCOUNTERS.brodyaPoOkrestnostyamS(),
          ENCOUNTERS.tyVstretilVelikogoMaga(),
          // sic: he asks for half of what he takes
          ENCOUNTERS.zaRubleyOnMozhet(st.world.district * 25)
        );
        return yield* println(ENCOUNTERS.tyHocheshSohranitsya());
      case 'mageDeclined':
        return yield* println(ENCOUNTERS.nehotiteKakHotiteMoe());
      case 'mageUnpaid':
        return yield* println(ENCOUNTERS.parenVseStoitBabok());
      case 'magePaid':
        return;
      case 'mageSaved':
        return yield* println(ENCOUNTERS.sohranenoMozheshBespredelnichatDalshe());
      case 'templeEntered':
        return yield* templeIntro(st.world.templeVisits, st.player.name, typeName(st.player.type));
      case 'templeBlessed':
        if (event.blessing === 'level') {
          const level = st.player.progression.level;
          yield* println(ENCOUNTERS.daUvelichitsyaTvoyaPontovost());
          yield* readKey;
          return yield* println(ENCOUNTERS.bylTyAStal(rankName(level), rankName(level + 1)));
        }
        return yield* println(BLESSINGS[event.blessing]);
      case 'templeRingGiven':
        for (const line of ringLines(event.ring, ENCOUNTERS.megaKoltsoSoSvoego()))
          yield* println(line);
        return;
      case 'templeRespect':
        return yield* println(ENCOUNTERS.poluchi(event.respect));
      case 'templeLeft':
        yield* readKey;
        if (st.world.templeVisits < 2) yield* println(ENCOUNTERS.aTeperValiOtsyuda());
        else yield* println(ENCOUNTERS.aTeperProvalivay());
        yield* writeLn;
        return yield* println(ENCOUNTERS.tyIdeschDalshe());
    }
  });
}

/** what God says, by the visits before this one */
function templeIntro(visits: number, name: string, type: string) {
  return Effect.gen(function* () {
    switch (visits) {
      case 0:
        return yield* pausedLines(
          ENCOUNTERS.brodyaPoOkrestnostyamS(),
          ENCOUNTERS.tyNatknulsyaNaHram(),
          ENCOUNTERS.razTakayaBatva(),
          ENCOUNTERS.nadoTipaPomolitsyaGospodu(),
          ENCOUNTERS.kakDelayutNovyeRusskie(),
          ENCOUNTERS.gospodiBratanProstiGreshnika2(),
          ENCOUNTERS.gromovoyGolosDaPoshel(),
          ENCOUNTERS.eeeTipaAChe(),
          ENCOUNTERS.aCheBlinChertov(name, type),
          ENCOUNTERS.nu(),
          ENCOUNTERS.ladnaNasylayuNaTebya()
        );
      case 1:
        return yield* pausedLines(
          ENCOUNTERS.brodyaPoOkrestnostyamS(),
          ENCOUNTERS.tyNatknulsyaNaHram(),
          ENCOUNTERS.vProshlyyRazBog(),
          ENCOUNTERS.noNadoByTipa(),
          ENCOUNTERS.gospodiBratanProstiGreshnika(),
          ENCOUNTERS.bogDaBlinUpornyy(),
          ENCOUNTERS.ladnoNasylayuNaTebya()
        );
      case 2:
        yield* println(ENCOUNTERS.brodyaPoOkrestnostyamS());
        yield* println(ENCOUNTERS.tyNatknulsyaNaHram());
        yield* readKey;
        yield* println(ENCOUNTERS.bogATyOpyat());
        yield* println(ENCOUNTERS.nuLadnoNasylayuNa());
        return yield* readKey;
    }
  });
}

/** the line of each blessing but the level's */
const BLESSINGS = {
  strength: ENCOUNTERS.daUvelichitsyaTvoyaSila(),
  agility: ENCOUNTERS.daUmenshitsyaTvoyaKoryavost(),
  vitality: ENCOUNTERS.daVozrastutTvoySily(),
  luck: ENCOUNTERS.daSnizoydetNaTebya(),
  ring: ENCOUNTERS.daryuTebeFenku(),
  armor: ENCOUNTERS.nakladyvayuNaTebyaZaschitu(),
  respect: ENCOUNTERS.daUvelichitsyaOfigennoTvoya(),
};
