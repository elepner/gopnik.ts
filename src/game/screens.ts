/** Full-screen pictures: title, game over, victory animation, help. */
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
import { STAT_WEIGHTS } from '../data/tables';
import { Game, halt, println } from './prelude';
import { SCREENS } from './texts';

/** 0000:02C2 */
export const titleScreen = Effect.gen(function* () {
  yield* newLines(5);
  yield* println(SCREENS.logo1);
  yield* println(SCREENS.logo2);
  yield* println(SCREENS.logo3);
  yield* println(SCREENS.logo4);
  yield* println(SCREENS.logo5);
  yield* println(SCREENS.logo6);
  yield* println(SCREENS.logo7);
  yield* println(SCREENS.logo8);
  yield* writeLn;
  yield* println(SCREENS.versiya102);
  yield* newLines(3);
  yield* println(SCREENS.nazhmiKakuyuNibudKnopku);
  yield* newLines(4);
  yield* println(SCREENS.n2003YearJuneSept);
  yield* textColor(BLACK);
  yield* readKey;
  yield* textColor(WHITE);
  yield* clrScr;
});

/** 0000:074B — "ТЫ СДОХ" / "ТЫ ПОБЕДИЛ" screen, then Halt */
export function gameOver(won: boolean) {
  return Effect.gen(function* () {
    yield* clrScr;
    const c = won ? '2' : '4';
    yield* newLines(2);
    if (won) yield* println(SCREENS.tyPobedil);
    else yield* println(SCREENS.tySdoh);
    yield* newLines(3);
    for (const line of GAME_OVER_ART) yield* println(SCREENS.gameOverLine, c, line);
    yield* newLines(5);
    yield* println(SCREENS.nazhmiKakuyuNibudKnopku);
    yield* newLines(4);
    yield* textColor(BLACK);
    yield* readKey;
    yield* textColor(WHITE);
    yield* clrScr;
    return yield* halt;
  });
}

const GAME_OVER_ART = [
  SCREENS.gameOver1,
  SCREENS.gameOver2,
  SCREENS.gameOver3,
  SCREENS.gameOver4,
  SCREENS.gameOver5,
  SCREENS.gameOver6,
  SCREENS.gameOver7,
  SCREENS.gameOver8,
];

/** 0000:0AEC — rainbow "ТЫ СУПЕР ГОП" until a key is pressed, then the victory screen */
export const victoryAnimation = Effect.gen(function* () {
  let shift = 0;
  for (;;) {
    const c = (i: number) => String.fromCharCode(0x30 + ((shift + i - 1) % 8));
    yield* delay(5000);
    yield* clrScr;
    yield* write(' '.repeat(32));
    yield* println(SCREENS.superGop, c(1), c(2), c(3), c(4), c(5), c(6), c(7), c(8), c(9), c(10));
    shift = shift >= 8 ? 0 : shift + 1;
    if (yield* keyPressed) break;
  }
  yield* readKey;
  yield* readKey;
  return yield* gameOver(true);
});

/** 0000:5F55 — `help` */
export const help = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const type = mem.typeName(st.charType);
  yield* println(SCREENS.nuSlushayVChem, type, st.name);
  yield* println(SCREENS.vnachaleTyDolzhenVybrat);
  yield* println(SCREENS.naprimer, type);
  const w = STAT_WEIGHTS[st.charType][0];
  yield* println(SCREENS.vsegoNavykiVSumme, w);
  yield* println(SCREENS.novogoUrovnyaPontovostiIz, w);
  for (const line of HELP_1) yield* println(line);
  if (st.district > 1) yield* println(SCREENS.pridyaVNovyyRayon);
  for (const line of HELP_2) yield* println(line);
});

function newLines(n: number) {
  return Effect.gen(function* () {
    for (let i = 0; i < n; i++) yield* writeLn;
  });
}

const HELP_1 = [
  SCREENS.ostalnymiNavykamiShansyNe,
  SCREENS.helpBlank,
  SCREENS.silaUvelichivaetUronI,
  SCREENS.lovkost5PopadaniyaEsli,
  SCREENS.zhivuchest5Zdorovya,
  SCREENS.udachaBudetChascheVezti,
  SCREENS.helpBlank2,
  SCREENS.zdorove10Zhivuchest5,
  SCREENS.uronSila2Min,
  SCREENS.tochnost20Lovkost5,
  SCREENS.bronyaNaskolkoUmenshaetsyaSila,
  SCREENS.helpBlank,
  SCREENS.spomoschyuRaznyhVescheyMozhno,
  SCREENS.zahodyaVraznyeMestaTy,
];

const HELP_2 = [
  SCREENS.hocheshSprositAChe,
  SCREENS.bazarPokupaeshShmotkiI,
  SCREENS.bolnitsaLechitPerelomyI,
  SCREENS.podrugaTyBomzhueshPo,
  SCREENS.domaTyMozheshPozhit,
  SCREENS.pritonTamTusuyutsyaRealnye,
  SCREENS.pochascheAGlavnoeTy,
  SCREENS.slediZaPritonnoyPontovostyu,
  SCREENS.klubMozhnoIgratNa,
  SCREENS.proigryvat,
  SCREENS.kachalkaTamMozhnoPovysit,
  SCREENS.barygiProdayutVeschiI,
  SCREENS.hlamIProdatNenuzhnye,
  SCREENS.esliNeVidatChe,
];
