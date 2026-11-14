/** Game start: save selection, intro story, character creation. */
import { Effect } from 'effect';

import { clrScr, readKey, readLine, writeLn } from '../crt/crt';
import { div, val } from '../tp/num';
import { Disk, Game, println, print } from './prelude';
import { titleScreen } from './screens';
import { START } from './texts';

/** 0000:6A0D */
export const newGame = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const disk = yield* Disk;
  yield* clrScr;
  st.dir = 'C:\\GOP\\';
  yield* titleScreen;
  // Randomize happens here; the Rng service is seeded when it is created
  st.saveCount = 0;
  const saves = yield* disk.list(/^save_r.\.sav$/i);
  for (const name of saves) {
    if (st.saveCount > 0) yield* println(START.ili);
    st.saveCount++;
    const ch = name.toUpperCase()[6];
    if (ch !== '0') yield* println(START.mozhnoNachatSRayona, ch);
    if (ch === '0') yield* println(START.mozhnoNachatSTogo);
  }
  if (st.saveCount > 0) {
    yield* println(START.nazhmiTsifruSKakogo);
    st.saveKey = yield* readKey;
    const key = String.fromCharCode(st.saveKey);
    if ('23450'.includes(key)) {
      const rec = yield* disk.read(`save_r${key}.sav`);
      if (rec) {
        st.district = val(key)[0];
        mem.loadRecord(rec);
        yield* println(START.zagruzhenoIzSaveR, key);
        if (st.district === 0) yield* loadPlaces;
        if (st.district === 0) st.district = div(st.level, 10) + 1;
        return yield* arrive;
      }
      yield* println(START.cheToGlyukanuloNaverno);
    }
  }
  yield* createCharacter;
  yield* arrive;
});

const loadPlaces = Effect.gen(function* () {
  const { mem } = yield* Game;
  const places = yield* (yield* Disk).read('places.sav');
  if (places) {
    mem.loadPlaces(places);
    yield* println(START.zagruzhenoIzPlaces);
    return;
  }
  yield* resetPlaces;
  yield* println(START.cheToGlyukanuloNemogu);
});

/** places a character type keeps when moving to a new district (also used on load failure) */
export const resetPlaces = Effect.gen(function* () {
  const { st } = yield* Game;
  st.knowsHospital = 0;
  st.knowsMarket = 0;
  if (st.charType !== 3) st.knowsClub = 0;
  st.knowsGym = 0;
  if (st.charType !== 3) st.hasGirl = 0;
  st.knowsDealers = 0;
  if (st.charType !== 5) st.denAccess = 0;
});

/** 0000:6DBE */
const createCharacter = Effect.gen(function* () {
  const { st } = yield* Game;
  st.district = 1;
  st.knowsHospital = 1;
  st.knowsMarket = 1;
  st.version = START.gopnikVersion102;
  st.expNext = 10;
  yield* println(START.god2xxxOtR);
  yield* readKey;
  yield* println(START.posledniyDenTyPrishel);
  yield* println(START.tyPoStrashnomuKosil);
  yield* println(START.tyEscheMogSdat);
  yield* println(START.noTut);
  yield* readKey;
  yield* println(START.rektorAhTyUrod);
  yield* readKey;
  yield* println(START.tyATipaChe);
  yield* readKey;
  yield* println(START.rektorTyOtchislenMudak);
  yield* readKey;
  yield* println(START.etoSlyshaliVseI);
  yield* readKey;
  yield* writeLn;
  yield* println(START.tyNemozheshSterpetTakoy);
  yield* println(START.tyReshilDokazatSvoyu);
  yield* readKey;
  yield* println(START.vyberiKemTyBudesh);
  for (const line of TYPE_MENU) yield* println(line);
  yield* println(START.n4CheZaBatva);
  yield* readType;
  if (st.charType === 4) {
    st.charType = 0;
    yield* writeLn;
    yield* println(START.patsanEtoNormalnyyTip);
    yield* println(START.otmorozokTupoyKoryavyyMudak);
    yield* println(START.gopnikGopOnI);
    yield* println(START.vorVezuchiyUblyudokBonus);
    yield* writeLn;
    yield* println(START.aTeperVybiray);
    for (const line of TYPE_MENU) yield* println(line);
    yield* readType;
  }
  if (st.charType < 0 || st.charType > 3) st.charType = 0;
  const [str, agi, vit, luck] = START_STATS[st.charType];
  st.str = str;
  st.agi = agi;
  st.vit = vit;
  st.luck = luck;
  st.charType += 3;
  st.hpMax = st.vit * 5 + 10 + st.str;
  st.hp = st.hpMax;
  st.dmgMin = div(st.str, 2);
  st.dmgMax = st.str;
  yield* print(START.aZovutTebya);
  st.name = yield* readLine;
  if (st.name === '') st.name = START.razDolBay;
  st.name = START.namePrefix + st.name;
});

const TYPE_MENU = [START.n0Patsan, START.n1Otmorozok, START.n2Gopnik, START.n3Vor];

/** [str, agi, vit, luck] by the chosen number */
const START_STATS = [
  [3, 3, 3, 3],
  [5, 2, 4, 1],
  [4, 3, 3, 2],
  [3, 3, 2, 4],
] as const;

const readType = Effect.gen(function* () {
  const { st } = yield* Game;
  st.tmp = yield* readLine;
  const [v, code] = val(st.tmp);
  st.charType = v;
  st.valCode = code;
});

/** 0000:7262 — district intro, starting bonuses of the character type */
const arrive = Effect.gen(function* () {
  const { st } = yield* Game;
  switch (st.district) {
    case 1:
      yield* println(START.tyStoishUDverey);
      yield* println(START.otsyudaTyNachneshSvoy);
      break;
    case 2:
      yield* println(START.tySelNaAvtobus);
      yield* println(START.tamBroditShlyuzovskayaShpana);
      break;
    case 3:
      yield* println(START.naMarshrutkeTyDoehal);
      yield* println(START.zdesBroditUzheBolee);
      break;
    case 4:
      yield* println(START.tyPriehalVEltsovku);
      yield* println(START.otoVsyuduDonosyatsyaKriki);
      break;
    case 5:
      yield* println(START.poraNakonetsOtomstitRektoru);
      st.rector = 1;
      break;
  }
  if (st.district === 1) {
    yield* println(START.dokazatSvoyuKrutiznuTy);
    yield* println(START.tebePridetsyaPorabotatNad);
    yield* println(START.vvediIChtobyPosmotret);
  }
  if (st.charType === 5) st.denAccess = 1;
  else if (st.charType === 3) {
    st.hasGirl = 1;
    st.knowsClub = 1;
  } else if (st.charType === 6) st.knowsDealers = 1;
  st.loans = 5;
});
