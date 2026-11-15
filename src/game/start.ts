/** Game start: save selection, intro story, character creation. */
import { Effect } from 'effect';

import { clrScr, readKey, readLine, writeLn } from '../crt/crt';
import { attr, set } from '../state/attributes';
import { CHARACTER_CLASSES, CHARACTER_TYPES } from '../state/kinds';
import { decodeSave, decodePlaces } from '../state/legacy';
import { startGame } from '../state/state';
import { District, SaveName } from '../tp/brands';
import { div, i16, val } from '../tp/num';
import { Disk, println, print, started, state } from './prelude';
import { titleScreen } from './screens';
import { START } from './texts';

/** 0000:6A0D */
export const newGame = Effect.gen(function* () {
  const st = yield* state;
  const disk = yield* Disk;
  yield* clrScr;
  yield* titleScreen;
  // Randomize happens here; the Rng service is seeded when it is created
  let saveCount = 0;
  const saves = yield* disk.list(/^save_r.\.sav$/i);
  for (const name of saves) {
    if (saveCount > 0) yield* println(START.ili());
    saveCount++;
    const ch = name.toUpperCase()[6];
    if (ch !== '0') yield* println(START.mozhnoNachatSRayona(ch));
    if (ch === '0') yield* println(START.mozhnoNachatSTogo());
  }
  if (saveCount > 0) {
    yield* println(START.nazhmiTsifruSKakogo());
    const key = String.fromCharCode(yield* readKey);
    if ('23450'.includes(key)) {
      const rec = yield* disk.read(SaveName(`save_r${key}.sav`));
      if (rec) {
        st.world.district = District(val(key)[0]);
        decodeSave(st, rec);
        yield* println(START.zagruzhenoIzSaveR(key));
        if (st.world.district === 0) yield* loadPlaces;
        if (st.world.district === 0)
          st.world.district = District(div(st.player.progression.level, 10) + 1);
        return yield* arrive;
      }
      yield* println(START.cheToGlyukanuloNaverno());
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
    yield* println(START.zagruzhenoIzPlaces());
    return;
  }
  yield* resetPlaces;
  yield* println(START.cheToGlyukanuloNemogu());
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
  st.version = START.gopnikVersion102().format;
  st.player.progression.expNext = 10;
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
  let choice = yield* readType;
  if (choice === 4) {
    yield* writeLn;
    yield* println(START.patsanEtoNormalnyyTip());
    yield* println(START.otmorozokTupoyKoryavyyMudak());
    yield* println(START.gopnikGopOnI());
    yield* println(START.vorVezuchiyUblyudokBonus());
    yield* writeLn;
    yield* println(START.aTeperVybiray());
    for (const line of TYPE_MENU) yield* println(line);
    choice = yield* readType;
  }
  if (choice < 0 || choice > 3) choice = 0;
  const {
    strength: str,
    agility: agi,
    vitality: vit,
    luck,
  } = CHARACTER_CLASSES[CHARACTER_TYPES[choice]].start;
  set(st.player, 'strength', i16(str));
  set(st.player, 'agility', i16(agi));
  set(st.player, 'vitality', i16(vit));
  set(st.player, 'luck', i16(luck));
  startGame(st, CHARACTER_TYPES[choice]);
  set(
    st.player,
    'healthMax',
    i16(attr(st.player, 'vitality') * 5 + 10 + attr(st.player, 'strength'))
  );
  st.player.health.current = attr(st.player, 'healthMax');
  set(st.player, 'damageMin', i16(div(attr(st.player, 'strength'), 2)));
  set(st.player, 'damageMax', attr(st.player, 'strength'));
  yield* print(START.aZovutTebya());
  st.player.name = yield* readLine;
  if (st.player.name === '') st.player.name = START.razDolBay().format;
  st.player.name = START.namePrefix().format + st.player.name;
});

const TYPE_MENU = [START.n0Patsan(), START.n1Otmorozok(), START.n2Gopnik(), START.n3Vor()];

/** the typed choice as Val reads it (garbage reads as 0) */
const readType = Effect.gen(function* () {
  const [choice] = val(yield* readLine);
  return i16(choice);
});

/** 0000:7262 — district intro, starting bonuses of the character type */
const arrive = Effect.gen(function* () {
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
      st.world.rector = true;
      break;
  }
  if (st.world.district === 1) {
    yield* println(START.dokazatSvoyuKrutiznuTy());
    yield* println(START.tebePridetsyaPorabotatNad());
    yield* println(START.vvediIChtobyPosmotret());
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
