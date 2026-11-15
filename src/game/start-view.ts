/**
 * What the player sees of the start and the full-screen pictures: title, saves menu, story,
 * character creation, district intro (`start.ts`); game over, the victory animation and help
 * (`screens.ts`).
 */
import { Effect } from 'effect';

import {
  BLACK,
  clrScr,
  delay,
  keyPressed,
  readKey,
  textColor,
  write,
  writeLn,
  WHITE,
} from '../crt/crt';
import { CHARACTER_CLASSES, type CharacterType } from '../state/kinds';
import { typeName } from '../state/names';
import { print, println, started } from './prelude';
import { type Color, COLORS } from './text';
import { SCREENS, START } from './texts';
import type { View } from './view';

export type StartEvent =
  /** the title picture, until a key is pressed */
  | { readonly type: 'startTitle' }
  /** saves found on the disk: the district digit of each (`0`: the same place) */
  | { readonly type: 'startSavesFound'; readonly districts: readonly string[] }
  /** the save of the pressed key is loaded: the key's district (`0`: the save's own) */
  | { readonly type: 'startSaveLoaded'; readonly key: string }
  /** the save of the pressed key is not there */
  | { readonly type: 'startSaveBroken' }
  | { readonly type: 'startPlacesLoaded' }
  /** `places.sav` is not there: the places are reset */
  | { readonly type: 'startPlacesLost' }
  /** a new district: the places are reset, the type keeps its bonus places */
  | { readonly type: 'startPlacesReset' }
  /** a new game in the first district: the story, then the character types to choose from */
  | { readonly type: 'startStory' }
  /** "4": the types explained, choose again */
  | { readonly type: 'startTypesExplained' }
  /** the character gets its type and its stats */
  | { readonly type: 'startTypeChosen'; readonly hero: CharacterType }
  | { readonly type: 'startNameAsked' }
  /** the name as typed (empty: Раздолбай) */
  | { readonly type: 'startNamed'; readonly name: string }
  /** the hero arrives in the district (`started` knows which) and gets the type's places */
  | { readonly type: 'startArrived' }
  /** the end: "ТЫ ПОБЕДИЛ" or "ТЫ СДОХ", until a key is pressed */
  | { readonly type: 'gameEnded'; readonly won: boolean }
  /** the rainbow "ТЫ СУПЕР ГОП", until a key is pressed */
  | { readonly type: 'victoryCelebrated' }
  /** `help` */
  | { readonly type: 'helpRequested' };

/** the start and the screens as the player sees them */
export const startView: View<StartEvent> = {
  events: {
    startTitle: true,
    startSavesFound: true,
    startSaveLoaded: true,
    startSaveBroken: true,
    startPlacesLoaded: true,
    startPlacesLost: true,
    startPlacesReset: true,
    startStory: true,
    startTypesExplained: true,
    startTypeChosen: true,
    startNameAsked: true,
    startNamed: true,
    startArrived: true,
    gameEnded: true,
    victoryCelebrated: true,
    helpRequested: true,
  },
  show: (event) => showStart(event),
};

function showStart(event: StartEvent) {
  return Effect.gen(function* () {
    switch (event.type) {
      case 'startTitle':
        yield* clrScr;
        return yield* titleScreen;
      case 'startSavesFound':
        for (const [i, ch] of event.districts.entries()) {
          if (i > 0) yield* println(START.ili());
          if (ch !== '0') yield* println(START.mozhnoNachatSRayona(ch));
          if (ch === '0') yield* println(START.mozhnoNachatSTogo());
        }
        return yield* println(START.nazhmiTsifruSKakogo());
      case 'startSaveLoaded':
        return yield* println(START.zagruzhenoIzSaveR(event.key));
      case 'startSaveBroken':
        return yield* println(START.cheToGlyukanuloNaverno());
      case 'startPlacesLoaded':
        return yield* println(START.zagruzhenoIzPlaces());
      case 'startPlacesLost':
        return yield* println(START.cheToGlyukanuloNemogu());
      case 'startStory':
        return yield* story;
      case 'startTypesExplained':
        yield* writeLn;
        yield* println(START.patsanEtoNormalnyyTip());
        yield* println(START.otmorozokTupoyKoryavyyMudak());
        yield* println(START.gopnikGopOnI());
        yield* println(START.vorVezuchiyUblyudokBonus());
        yield* writeLn;
        yield* println(START.aTeperVybiray());
        for (const line of TYPE_MENU) yield* println(line);
        return;
      case 'startNameAsked':
        return yield* print(START.aZovutTebya());
      case 'startPlacesReset':
      case 'startTypeChosen':
      case 'startNamed':
        return;
      case 'startArrived':
        return yield* arrival;
      case 'gameEnded':
        return yield* gameOverScreen(event.won);
      case 'victoryCelebrated':
        return yield* victoryAnimation;
      case 'helpRequested':
        return yield* help;
    }
  });
}

/** 0000:6DBE — the story of a new game, then the menu of character types */
const story = Effect.gen(function* () {
  yield* println(START.god2xxxOtR());
  yield* readKey;
  yield* println(START.posledniyDenTyPrishel());
  yield* println(START.tyPoStrashnomuKosil());
  yield* println(START.tyEscheMogSdat());
  yield* println(START.noTut());
  yield* readKey;
  yield* println(START.rektorAhTyUrod());
  yield* readKey;
  yield* println(START.tyATipaChe());
  yield* readKey;
  yield* println(START.rektorTyOtchislenMudak());
  yield* readKey;
  yield* println(START.etoSlyshaliVseI());
  yield* readKey;
  yield* writeLn;
  yield* println(START.tyNemozheshSterpetTakoy());
  yield* println(START.tyReshilDokazatSvoyu());
  yield* readKey;
  yield* println(START.vyberiKemTyBudesh());
  for (const line of TYPE_MENU) yield* println(line);
  yield* println(START.n4CheZaBatva());
});

const TYPE_MENU = [START.n0Patsan(), START.n1Otmorozok(), START.n2Gopnik(), START.n3Vor()];

/** 0000:7262 — the district intro */
const arrival = Effect.gen(function* () {
  const st = yield* started;
  switch (st.world.district) {
    case 1:
      yield* println(START.tyStoishUDverey());
      yield* println(START.otsyudaTyNachneshSvoy());
      break;
    case 2:
      yield* println(START.tySelNaAvtobus());
      yield* println(START.tamBroditShlyuzovskayaShpana());
      break;
    case 3:
      yield* println(START.naMarshrutkeTyDoehal());
      yield* println(START.zdesBroditUzheBolee());
      break;
    case 4:
      yield* println(START.tyPriehalVEltsovku());
      yield* println(START.otoVsyuduDonosyatsyaKriki());
      break;
    case 5:
      yield* println(START.poraNakonetsOtomstitRektoru());
      break;
  }
  if (st.world.district === 1) {
    yield* println(START.dokazatSvoyuKrutiznuTy());
    yield* println(START.tebePridetsyaPorabotatNad());
    yield* println(START.vvediIChtobyPosmotret());
  }
});

/** 0000:02C2 */
const titleScreen = Effect.gen(function* () {
  yield* newLines(5);
  yield* println(SCREENS.logo1());
  yield* println(SCREENS.logo2());
  yield* println(SCREENS.logo3());
  yield* println(SCREENS.logo4());
  yield* println(SCREENS.logo5());
  yield* println(SCREENS.logo6());
  yield* println(SCREENS.logo7());
  yield* println(SCREENS.logo8());
  yield* writeLn;
  yield* println(SCREENS.versiya102());
  yield* newLines(3);
  yield* println(SCREENS.nazhmiKakuyuNibudKnopku());
  yield* newLines(4);
  yield* println(SCREENS.n2003YearJuneSept());
  yield* textColor(BLACK);
  yield* readKey;
  yield* textColor(WHITE);
  yield* clrScr;
});

/** 0000:074B — "ТЫ СДОХ" / "ТЫ ПОБЕДИЛ" screen (the game halts after it) */
function gameOverScreen(won: boolean) {
  return Effect.gen(function* () {
    yield* clrScr;
    const c: Color = won ? 'green' : 'red';
    yield* newLines(2);
    if (won) yield* println(SCREENS.tyPobedil());
    else yield* println(SCREENS.tySdoh());
    yield* newLines(3);
    for (const line of GAME_OVER_ART) yield* println(SCREENS.gameOverLine(c, line));
    yield* newLines(5);
    yield* println(SCREENS.nazhmiKakuyuNibudKnopku());
    yield* newLines(4);
    yield* textColor(BLACK);
    yield* readKey;
    yield* textColor(WHITE);
    yield* clrScr;
  });
}

const GAME_OVER_ART = [
  SCREENS.gameOver1(),
  SCREENS.gameOver2(),
  SCREENS.gameOver3(),
  SCREENS.gameOver4(),
  SCREENS.gameOver5(),
  SCREENS.gameOver6(),
  SCREENS.gameOver7(),
  SCREENS.gameOver8(),
];

/** 0000:0AEC — rainbow "ТЫ СУПЕР ГОП" until a key is pressed (the victory screen follows) */
const victoryAnimation = Effect.gen(function* () {
  let shift = 0;
  for (;;) {
    const c = (i: number) => COLORS[(shift + i - 1) % 8];
    yield* delay(5000);
    yield* clrScr;
    yield* write(' '.repeat(32));
    yield* println(SCREENS.superGop(c(1), c(2), c(3), c(4), c(5), c(6), c(7), c(8), c(9), c(10)));
    shift = shift >= 8 ? 0 : shift + 1;
    if (yield* keyPressed) break;
  }
  yield* readKey;
  yield* readKey;
});

/** 0000:5F55 — `help` */
const help = Effect.gen(function* () {
  const st = yield* started;
  const type = typeName(st.player.type);
  yield* println(SCREENS.nuSlushayVChem(type, st.player.name));
  yield* println(SCREENS.vnachaleTyDolzhenVybrat());
  yield* println(SCREENS.naprimer(type));
  const w = CHARACTER_CLASSES[st.player.type].weights.strength;
  yield* println(SCREENS.vsegoNavykiVSumme(w));
  yield* println(SCREENS.novogoUrovnyaPontovostiIz(w));
  for (const line of HELP_1) yield* println(line);
  if (st.world.district > 1) yield* println(SCREENS.pridyaVNovyyRayon());
  for (const line of HELP_2) yield* println(line);
});

function newLines(n: number) {
  return Effect.gen(function* () {
    for (let i = 0; i < n; i++) yield* writeLn;
  });
}

const HELP_1 = [
  SCREENS.ostalnymiNavykamiShansyNe(),
  SCREENS.helpBlank(),
  SCREENS.silaUvelichivaetUronI(),
  SCREENS.lovkost5PopadaniyaEsli(),
  SCREENS.zhivuchest5Zdorovya(),
  SCREENS.udachaBudetChascheVezti(),
  SCREENS.helpBlank2(),
  SCREENS.zdorove10Zhivuchest5(),
  SCREENS.uronSila2Min(),
  SCREENS.tochnost20Lovkost5(),
  SCREENS.bronyaNaskolkoUmenshaetsyaSila(),
  SCREENS.helpBlank(),
  SCREENS.spomoschyuRaznyhVescheyMozhno(),
  SCREENS.zahodyaVraznyeMestaTy(),
];

const HELP_2 = [
  SCREENS.hocheshSprositAChe(),
  SCREENS.bazarPokupaeshShmotkiI(),
  SCREENS.bolnitsaLechitPerelomyI(),
  SCREENS.podrugaTyBomzhueshPo(),
  SCREENS.domaTyMozheshPozhit(),
  SCREENS.pritonTamTusuyutsyaRealnye(),
  SCREENS.pochascheAGlavnoeTy(),
  SCREENS.slediZaPritonnoyPontovostyu(),
  SCREENS.klubMozhnoIgratNa(),
  SCREENS.proigryvat(),
  SCREENS.kachalkaTamMozhnoPovysit(),
  SCREENS.barygiProdayutVeschiI(),
  SCREENS.hlamIProdatNenuzhnye(),
  SCREENS.esliNeVidatChe(),
];
