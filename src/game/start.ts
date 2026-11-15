/** Game start: save selection, intro story, character creation. */
import { Effect } from 'effect';

import { clrScr, readKey, readLine, writeLn } from '../crt/crt';
import { CHARACTER_CLASSES, CHARACTER_TYPES } from '../state/kinds';
import { decodeSave, decodePlaces } from '../state/legacy';
import { startGame } from '../state/state';
import { District, SaveName } from '../tp/brands';
import { div, i16, u8, val } from '../tp/num';
import { Disk, println, print, started, state } from './prelude';
import { titleScreen } from './screens';
import { START } from './texts';

/** 0000:6A0D */
export const newGame = Effect.gen(function* () {
  const st = yield* state;
  const disk = yield* Disk;
  yield* clrScr;
  st.scratch.dir = 'C:\\GOP\\';
  yield* titleScreen;
  // Randomize happens here; the Rng service is seeded when it is created
  st.scratch.saveCount = 0;
  const saves = yield* disk.list(/^save_r.\.sav$/i);
  for (const name of saves) {
    if (st.scratch.saveCount > 0) yield* println(START.ili);
    st.scratch.saveCount = u8(st.scratch.saveCount + 1);
    const ch = name.toUpperCase()[6];
    if (ch !== '0') yield* println(START.mozhnoNachatSRayona, ch);
    if (ch === '0') yield* println(START.mozhnoNachatSTogo);
  }
  if (st.scratch.saveCount > 0) {
    yield* println(START.nazhmiTsifruSKakogo);
    st.scratch.saveKey = u8(yield* readKey);
    const key = String.fromCharCode(st.scratch.saveKey);
    if ('23450'.includes(key)) {
      const rec = yield* disk.read(SaveName(`save_r${key}.sav`));
      if (rec) {
        st.world.district = District(val(key)[0]);
        decodeSave(st, rec);
        yield* println(START.zagruzhenoIzSaveR, key);
        if (st.world.district === 0) yield* loadPlaces;
        if (st.world.district === 0)
          st.world.district = District(div(st.player.progression.level, 10) + 1);
        return yield* arrive;
      }
      yield* println(START.cheToGlyukanuloNaverno);
    }
  }
  yield* createCharacter;
  yield* arrive;
});

const loadPlaces = Effect.gen(function* () {
  const st = yield* started;
  const places = yield* (yield* Disk).read(SaveName('places.sav'));
  if (places) {
    decodePlaces(st, places);
    yield* println(START.zagruzhenoIzPlaces);
    return;
  }
  yield* resetPlaces;
  yield* println(START.cheToGlyukanuloNemogu);
});

/** places a character type keeps when moving to a new district (also used on load failure) */
export const resetPlaces = Effect.gen(function* () {
  const st = yield* started;
  st.world.places.hospital = false;
  st.world.places.market = false;
  if (st.player.type !== 'patsan') st.world.places.club = false;
  st.world.places.gym = false;
  if (st.player.type !== 'patsan') st.world.places.girlfriend = false;
  st.world.places.dealers = false;
  if (st.player.type !== 'gopnik') st.world.places.den = false;
});

/** 0000:6DBE */
const createCharacter = Effect.gen(function* () {
  const st = yield* creating;
  st.world.district = District(1);
  st.world.places.hospital = true;
  st.world.places.market = true;
  st.version = START.gopnikVersion102;
  st.player.progression.expNext = 10;
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
  if (st.typeChoice === 4) {
    st.typeChoice = 0;
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
  if (st.typeChoice < 0 || st.typeChoice > 3) st.typeChoice = 0;
  const {
    strength: str,
    agility: agi,
    vitality: vit,
    luck,
  } = CHARACTER_CLASSES[CHARACTER_TYPES[st.typeChoice]].start;
  st.player.stats.strength = i16(str);
  st.player.stats.agility = i16(agi);
  st.player.stats.vitality = i16(vit);
  st.player.stats.luck = i16(luck);
  startGame(st, CHARACTER_TYPES[st.typeChoice]);
  st.player.health.max = i16(st.player.stats.vitality * 5 + 10 + st.player.stats.strength);
  st.player.health.current = st.player.health.max;
  st.player.damage.min = i16(div(st.player.stats.strength, 2));
  st.player.damage.max = st.player.stats.strength;
  yield* print(START.aZovutTebya);
  st.player.name = yield* readLine;
  if (st.player.name === '') st.player.name = START.razDolBay;
  st.player.name = START.namePrefix + st.player.name;
});

const TYPE_MENU = [START.n0Patsan, START.n1Otmorozok, START.n2Gopnik, START.n3Vor];

const readType = Effect.gen(function* () {
  const st = yield* creating;
  st.scratch.tmp = yield* readLine;
  const [v, code] = val(st.scratch.tmp);
  st.typeChoice = i16(v);
  st.scratch.valCode = i16(code);
});

/** 0000:7262 — district intro, starting bonuses of the character type */
const arrive = Effect.gen(function* () {
  const st = yield* started;
  switch (st.world.district) {
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
      st.world.rector = true;
      break;
  }
  if (st.world.district === 1) {
    yield* println(START.dokazatSvoyuKrutiznuTy);
    yield* println(START.tebePridetsyaPorabotatNad);
    yield* println(START.vvediIChtobyPosmotret);
  }
  if (st.player.type === 'gopnik') st.world.places.den = true;
  else if (st.player.type === 'patsan') {
    st.world.places.girlfriend = true;
    st.world.places.club = true;
  } else if (st.player.type === 'vor') st.world.places.dealers = true;
  st.world.den.loans = 5;
});

/** the state while the character is being created */
const creating = Effect.gen(function* () {
  const st = yield* state;
  if (st.phase !== 'not-started') throw new Error('the character already exists');
  return st;
});
