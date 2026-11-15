/** Game start: save selection, intro story, character creation; `start-view.ts` shows it. */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt';
import { attr, set } from '../state/attributes';
import { CHARACTER_CLASSES, CHARACTER_TYPES } from '../state/kinds';
import { decodeSave, decodePlaces } from '../state/legacy';
import { startGame } from '../state/state';
import { District, SaveName } from '../tp/brands';
import { div, i16, val } from '../tp/num';
import { emit } from './events';
import { Disk, started, state } from './prelude';
import { titleScreen } from './screens';
import { START } from './texts';

/** 0000:6A0D */
export const newGame = Effect.gen(function* () {
  const st = yield* state;
  const disk = yield* Disk;
  yield* titleScreen;
  // Randomize happens here; the Rng service is seeded when it is created
  const saves = yield* disk.list(/^save_r.\.sav$/i);
  if (saves.length > 0) {
    yield* emit({ type: 'startSavesFound', districts: saves.map((name) => name.toUpperCase()[6]) });
    // input, not a pause
    const key = String.fromCharCode(yield* readKey);
    if ('23450'.includes(key)) {
      const rec = yield* disk.read(SaveName(`save_r${key}.sav`));
      if (rec) {
        st.world.district = District(val(key)[0]);
        decodeSave(st, rec);
        yield* emit({ type: 'startSaveLoaded', key });
        if (st.world.district === 0) yield* loadPlaces;
        if (st.world.district === 0)
          st.world.district = District(div(st.player.progression.level, 10) + 1);
        return yield* arrive;
      }
      yield* emit({ type: 'startSaveBroken' });
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
    yield* emit({ type: 'startPlacesLoaded' });
    return;
  }
  yield* resetPlaces;
  yield* emit({ type: 'startPlacesLost' });
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
  yield* emit({ type: 'startStory' });
  let choice = yield* readType;
  if (choice === 4) {
    yield* emit({ type: 'startTypesExplained' });
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
  yield* emit({ type: 'startNameAsked' });
  st.player.name = yield* readLine;
  if (st.player.name === '') st.player.name = START.razDolBay().format;
  st.player.name = START.namePrefix().format + st.player.name;
});

/** the typed choice as Val reads it (garbage reads as 0) */
const readType = Effect.gen(function* () {
  const [choice] = val(yield* readLine);
  return i16(choice);
});

/** 0000:7262 — district intro, starting bonuses of the character type */
const arrive = Effect.gen(function* () {
  const st = yield* started;
  yield* emit({ type: 'startArrived' });
  if (st.world.district === 5) st.world.rector = true;
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
