/** Game start: save selection, intro story, character creation; `start-view.ts` shows it. */
import { Effect } from 'effect';

import { readKey, readLine } from '../crt/crt';
import { attr, set } from '../state/attributes';
import { CHARACTER_CLASSES, CHARACTER_TYPES, type CharacterType } from '../state/kinds';
import { decodeSave, decodePlaces } from '../state/legacy';
import { type Game, type GameState, playing, startGame } from '../state/state';
import { District, SaveName } from '../tp/brands';
import { div, i16, val } from '../tp/num';
import { emit, reporterOn } from './events';
import { Disk, started, state } from './prelude';
import { titleScreen } from './screens';
import type { StartEvent } from './start-view';
import { heroName, VERSION } from './stored-texts';

const report = reporterOn(state)(apply);

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
        decodeSave(st, rec);
        yield* report({ type: 'startSaveLoaded', key });
        if (key === '0') yield* loadPlaces;
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
  } else yield* report({ type: 'startPlacesLost' });
});

/** places a character type keeps when moving to a new district (also used on load failure) */
export const resetPlaces = report({ type: 'startPlacesReset' });

/** 0000:6DBE */
const createCharacter = Effect.gen(function* () {
  yield* report({ type: 'startStory' });
  let choice = yield* readType;
  if (choice === 4) {
    yield* emit({ type: 'startTypesExplained' });
    choice = yield* readType;
  }
  if (choice < 0 || choice > 3) choice = 0;
  yield* report({ type: 'startTypeChosen', hero: CHARACTER_TYPES[choice] });
  yield* emit({ type: 'startNameAsked' });
  yield* report({ type: 'startNamed', name: yield* readLine });
});

/** the typed choice as Val reads it (garbage reads as 0) */
const readType = Effect.gen(function* () {
  const [choice] = val(yield* readLine);
  return i16(choice);
});

/** 0000:7262 — district intro, starting bonuses of the character type */
const arrive = report({ type: 'startArrived' });

/** what happens at the start goes into the state */
function apply(st: GameState, event: StartEvent) {
  switch (event.type) {
    case 'startSaveLoaded':
      // `0`: the district the save was made in, from the level
      st.world.district = District(
        event.key === '0' ? div(st.player.progression.level, 10) + 1 : val(event.key)[0]
      );
      return;
    case 'startPlacesLost':
    case 'startPlacesReset':
      return forgetPlaces(playing(st));
    case 'startStory':
      st.world.district = District(1);
      st.world.places.hospital = true;
      st.world.places.market = true;
      st.version = VERSION;
      st.player.progression.expNext = 10;
      return;
    case 'startTypeChosen':
      return begin(st, event.hero);
    case 'startNamed':
      st.player.name = heroName(event.name);
      return;
    case 'startArrived':
      return settle(playing(st));
  }
}

/** the places a new district doesn't know yet; a type keeps its bonus places */
function forgetPlaces(st: Game) {
  const places = st.world.places;
  places.hospital = false;
  places.market = false;
  if (st.player.type !== 'patsan') places.club = false;
  places.gym = false;
  if (st.player.type !== 'patsan') places.girlfriend = false;
  places.dealers = false;
  if (st.player.type !== 'gopnik') places.den = false;
}

/** the new character: the type's stats, health and damage from them */
function begin(st: GameState, hero: CharacterType) {
  const { strength, agility, vitality, luck } = CHARACTER_CLASSES[hero].start;
  set(st.player, 'strength', strength);
  set(st.player, 'agility', agility);
  set(st.player, 'vitality', vitality);
  set(st.player, 'luck', luck);
  const p = startGame(st, hero).player;
  set(p, 'healthMax', attr(p, 'vitality') * 5 + 10 + attr(p, 'strength'));
  set(p, 'health', attr(p, 'healthMax'));
  set(p, 'damageMin', div(attr(p, 'strength'), 2));
  set(p, 'damageMax', attr(p, 'strength'));
}

/** the district's rector, the type's bonus places, the den's loans */
function settle(st: Game) {
  if (st.world.district === 5) st.world.rector = true;
  if (st.player.type === 'gopnik') st.world.places.den = true;
  else if (st.player.type === 'patsan') {
    st.world.places.girlfriend = true;
    st.world.places.club = true;
  } else if (st.player.type === 'vor') st.world.places.dealers = true;
  st.world.den.loans = 5;
}
