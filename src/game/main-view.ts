/** What the player sees of the main prompt and the district change (`main.ts`). */
import { Effect } from 'effect';

import { str } from '../tp/num';
import { showStats } from './hero-view';
import { print, println, started } from './prelude';
import { readKey } from './terminal';
import { plain } from './text';
import { MAIN } from './texts';
import type { View } from './view';

export type MainEvent =
  /** the rector is near: the den is open for the fights with him */
  | { readonly type: 'mainRectorAhead' }
  /** the district is done (`world.district` is the next one): save? */
  | { readonly type: 'mainDistrictDone' }
  | { readonly type: 'mainSaved' }
  /** arrived in the next district */
  | { readonly type: 'mainDistrictEntered' }
  /** `fight`: a leftover of an older version */
  | { readonly type: 'mainOldFight' }
  /** `i`: the commands, with the places found so far */
  | { readonly type: 'mainCommands' }
  /** `s` */
  | { readonly type: 'mainStats' }
  /** `f` with a pistol, but no one to shoot */
  | { readonly type: 'mainShotRefused' }
  /** `k` with no one to kick */
  | { readonly type: 'mainKick' }
  /** `name`: what is the new name? */
  | { readonly type: 'mainRenaming' }
  /** what was typed for the new name (empty: the default one) */
  | { readonly type: 'mainRenamed'; readonly name: string }
  | { readonly type: 'mainVersion' }
  /** `exit`: the results before the game ends */
  | { readonly type: 'mainQuit' };

/** the main prompt as the player sees it */
export const mainView: View<MainEvent> = {
  events: {
    mainRectorAhead: true,
    mainRenamed: true,
    mainDistrictDone: true,
    mainSaved: true,
    mainDistrictEntered: true,
    mainOldFight: true,
    mainCommands: true,
    mainStats: true,
    mainShotRefused: true,
    mainKick: true,
    mainRenaming: true,
    mainVersion: true,
    mainQuit: true,
  },
  show: (event) => showMain(event),
};

function showMain(event: MainEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'mainRectorAhead':
      case 'mainRenamed':
        return;
      case 'mainDistrictDone':
        yield* println(MAIN.tyDokazalChtoTy());
        yield* println(MAIN.hocheshSohranitSvoiDostizheniya());
        return yield* print(plain`\\`);
      case 'mainSaved':
        return yield* println(MAIN.sohranenoVSaveR(str(st.world.district)));
      case 'mainDistrictEntered':
        return yield* districtIntro(st.world.district);
      case 'mainOldFight':
        return yield* println(MAIN.perezhitkiProshlogoZhmiW());
      case 'mainCommands': {
        const places = st.world.places;
        yield* println(MAIN.napishiWChtobyShatatsya());
        if (places.market) yield* println(MAIN.napishiMarChtobyIdti());
        if (places.dealers) yield* println(MAIN.napishiBmarChtobyIdti());
        if (places.hospital) yield* println(MAIN.napishiRepChtobyIdti());
        if (places.girlfriend) yield* println(MAIN.napishiGirlChtobyZavalitsya());
        if (places.den) yield* println(MAIN.napishiPrChtobyIdti());
        if (places.club) yield* println(MAIN.napishiKlChtobyIdti());
        if (places.gym) yield* println(MAIN.napishiTrnChtobyIdti());
        for (const line of COMMANDS) yield* println(line);
        return;
      }
      case 'mainStats':
        return yield* showStats;
      case 'mainShotRefused':
        return yield* println(MAIN.tyChePsihMigom());
      case 'mainKick':
        return yield* println(MAIN.cheMasheshKopytamiIschi());
      case 'mainRenaming':
        yield* println(MAIN.zvaliTebya(st.player.name));
        return yield* print(MAIN.aTeperBudut());
      case 'mainVersion':
        return yield* println(MAIN.gopnikVersion102());
      case 'mainQuit':
        yield* println(MAIN.blinNeBytTebe());
        yield* println(MAIN.aRezultat());
        yield* showStats;
        return yield* readKey;
    }
  });
}

/** how the hero gets to a district and what he finds there */
function districtIntro(district: number) {
  return Effect.gen(function* () {
    switch (district) {
      case 2:
        yield* println(MAIN.tySelNaAvtobus());
        return yield* println(MAIN.tamBroditShlyuzovskayaShpana());
      case 3:
        yield* println(MAIN.naMarshrutkeTyDoehal());
        return yield* println(MAIN.zdesBroditUzheBolee());
      case 4:
        yield* println(MAIN.tyPriehalVEltsovku());
        return yield* println(MAIN.otoVsyuduDonosyatsyaKriki());
      case 5:
        yield* println(MAIN.poraNakonetsOtomstitRektoru());
        yield* readKey;
        yield* println(MAIN.tyProbralsyaVUniver());
        return yield* println(MAIN.aVotIOn());
    }
  });
}

const COMMANDS = [
  MAIN.napishiSChtobyPosmotret(),
  MAIN.napishiSvChtobyPriglyadetsya(),
  MAIN.napishiKChtobyGasit(),
  MAIN.napishiVChtobyPozvat(),
  MAIN.napishiKosChtobyShavat(),
  MAIN.napishiHChtobyVypit(),
  MAIN.napishiMhChtobyNabuhatsya(),
  MAIN.napishiNameChtobySmenit(),
  MAIN.napishiEEsliZahochesh(),
];
