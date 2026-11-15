/** The player character: stats screen, level-ups, beer, items. */
import { Effect } from 'effect';

import { writeLn } from '../crt/crt';
import { attr, dec, inc } from '../state/attributes';
import { type ChainRing, type Item, put, RING_HEALTH } from '../state/items';
import { CHARACTER_CLASSES } from '../state/kinds';
import { typeName, rankName } from '../state/names';
import type { Game, StatKey } from '../state/state';
import { div, i16, mod } from '../tp/num';
import { print, println, rnd, started } from './prelude';
import { type Color, text, type Text } from './text';
import { HERO } from './texts';

/** 0000:1A03 — `s`: look at yourself in a puddle */
export const showStats = Effect.gen(function* () {
  const st = yield* started;
  // boosted stats are shown in blue
  const c: Color[] = ['white', 'white', 'white', 'white'];
  yield* println(
    HERO.tyUrovnya(
      typeName(st.player.type),
      st.player.progression.level,
      rankName(st.player.progression.level)
    )
  );
  yield* println(HERO.aZovutTebya(st.player.name));
  if (st.player.progression.level <= 39)
    yield* println(
      HERO.seychasUTebyaOpyta(st.player.progression.exp, st.player.progression.expNext)
    );
  if (st.player.stoned > 0 || st.player.body.hands.rings.pomogi || st.player.body.hands.rings.mega)
    c[0] = 'blue';
  if (st.player.body.hands.rings.pomogi || st.player.body.hands.rings.mega) c[1] = c[2] = 'blue';
  if (
    st.player.body.neck.cross ||
    st.player.body.hands.rings.spasi ||
    st.player.body.hands.rings.pomogi ||
    st.player.body.hands.rings.mega
  )
    c[3] = 'blue';
  yield* println(
    HERO.slLvZhvUd(
      c[0],
      attr(st.player, 'strength'),
      c[1],
      attr(st.player, 'agility'),
      c[2],
      attr(st.player, 'vitality'),
      c[3],
      attr(st.player, 'luck')
    )
  );
  if (st.player.body.neck.cross || st.player.body.hands.rings.spasi) {
    yield* print(HERO.fenki());
    if (st.player.body.neck.cross) yield* print(HERO.krestikUdacha2());
    if (st.player.body.hands.rings.spasi) yield* print(HERO.koltsoGsUdacha1());
    yield* writeLn;
  }
  if (
    st.player.body.hands.rings.pomogi ||
    st.player.body.hands.rings.mega ||
    st.player.body.hands.rings.pomiluy
  ) {
    yield* print(HERO.moschnyeFenki());
    if (st.player.body.hands.rings.pomogi) yield* print(HERO.koltsoPgVse1());
    if (st.player.body.hands.rings.mega) yield* print(HERO.megaKoltsoVse4());
    if (st.player.body.hands.rings.pomiluy) yield* print(HERO.koltsoGpSamolechenie());
    yield* writeLn;
  }
  if (st.player.body.pockets.phone) yield* println(HERO.uTebyaEstMobilnik());
  if (st.player.body.eyes.glasses) yield* println(HERO.uTebyaEstTemnye());
  if (st.player.body.skin.tattoo) yield* println(HERO.naTebeZonovskayaNakolka());
  const pistol = st.player.body.pockets.pistol;
  if (pistol) {
    yield* writeLn;
    yield* print(HERO.uTebyaEstPistolet());
    if (pistol.silencer) yield* print(HERO.sGushitelem());
    if (pistol.bullets > 0) yield* println(HERO.patronov(pistol.bullets));
    if (pistol.bullets <= 2 && pistol.bullets > 0) yield* println(HERO.aPtronovToMalo());
    if (pistol.bullets <= 0) yield* println(HERO.pravdaBezPatronov());
    yield* writeLn;
  }
  const armed =
    st.player.stoned > 0 ||
    st.player.body.feet.boots ||
    st.player.body.feet.coolBoots ||
    st.player.body.hands.weapons.knuckles ||
    st.player.body.hands.weapons.club ||
    st.player.body.hands.weapons.knife ||
    st.player.body.hands.weapons.cleaver;
  yield* print(
    HERO.uron(armed ? 'blue' : 'white', attr(st.player, 'damageMin'), attr(st.player, 'damageMax'))
  );
  if (st.player.body.feet.boots && !st.player.body.feet.coolBoots) yield* print(HERO.butsy1());
  if (st.player.body.feet.boots && st.player.body.feet.coolBoots) yield* print(HERO.butsy());
  if (st.player.body.feet.coolBoots) yield* print(HERO.pontovyeButsyUron2());
  if (
    st.player.body.hands.weapons.knuckles &&
    !st.player.body.hands.weapons.knife &&
    !st.player.body.hands.weapons.club &&
    !st.player.body.hands.weapons.cleaver
  )
    yield* print(HERO.kastet2());
  if (
    st.player.body.hands.weapons.knuckles &&
    (st.player.body.hands.weapons.knife ||
      st.player.body.hands.weapons.club ||
      st.player.body.hands.weapons.cleaver)
  )
    yield* print(HERO.kastet());
  if (
    st.player.body.hands.weapons.club &&
    !st.player.body.hands.weapons.knife &&
    !st.player.body.hands.weapons.cleaver
  )
    yield* print(HERO.dubinka4());
  if (
    st.player.body.hands.weapons.club &&
    (st.player.body.hands.weapons.knife || st.player.body.hands.weapons.cleaver)
  )
    yield* print(HERO.dubinka());
  if (st.player.body.hands.weapons.knife && !st.player.body.hands.weapons.cleaver)
    yield* print(HERO.nozh6());
  if (st.player.body.hands.weapons.knife && st.player.body.hands.weapons.cleaver)
    yield* print(HERO.nozh());
  if (st.player.body.hands.weapons.cleaver) yield* print(HERO.tesakUron9());
  yield* writeLn;
  yield* println(
    HERO.zdorove(
      healthColor(st.player.health.current, attr(st.player, 'healthMax')),
      st.player.health.current,
      attr(st.player, 'healthMax'),
      text(...heroInjuries(st))
    )
  );
  yield* accuracy(attr(st.player, 'agility'));
  if (attr(st.player, 'armor') > 0) {
    yield* print(HERO.bronya(attr(st.player, 'armor')));
    if (st.player.body.torso.abibas) {
      if (st.player.body.torso.adidas) {
        yield* print(HERO.abibas());
        yield* print(HERO.kostyumAdidas2());
      } else yield* print(HERO.kostyumAbibas1());
    }
    if (st.player.body.torso.adidas && !st.player.body.torso.abibas)
      yield* print(HERO.kostyumAdidas2());
    if (st.player.body.torso.leather) {
      if (st.player.body.torso.coolLeather) {
        yield* print(HERO.kozhanka());
        yield* print(HERO.krutayaKozhanka4());
      } else yield* print(HERO.kozhanka2());
    }
    if (st.player.body.torso.coolLeather && !st.player.body.torso.leather)
      yield* print(HERO.krutayaKozhanka4());
    yield* writeLn;
  }
  if (st.player.resources.joints > 0) yield* println(HERO.kosyaki(st.player.resources.joints));
  if (st.player.resources.beer > 0)
    yield* println(
      HERO.pivoL(div(st.player.resources.beer, 2), beerTenths(st.player.resources.beer))
    );
  else yield* println(HERO.pivaNet());
  if (st.player.resources.money > 0) yield* println(HERO.babki(st.player.resources.money));
  else yield* println(HERO.netuBabok());
  if (st.player.resources.junk > 0) yield* println(HERO.hlam(st.player.resources.junk));
});

/** health colour: red up to 25%, yellow up to 50%, green above (Real division) */
export function healthColor(hp: number, max: number): Color {
  const ratio = hp / max;
  if (ratio > 0.5) return 'green';
  if (ratio > 0.25) return 'yellow';
  return 'red';
}

/** "Точность" lines shared by the stats of the hero and of the enemy */
export function accuracy(agility: number) {
  return Effect.gen(function* () {
    let a = agility;
    if (a <= 14) return yield* println(HERO.tochnost(a * 5 + 20));
    yield* print(HERO.tochnost90());
    a -= 14;
    let hits = 1;
    while (a > 18) {
      a -= 18;
      hits++;
    }
    if (hits === 1) yield* println(HERO.vtoroyUdar(a * 5));
    if (hits > 1) yield* println(HERO.udarovTochnostUdara(hits, hits + 1, a * 5));
  });
}

/** litres after the dot for beer counted in half-litres */
export function beerTenths(beer: number): number {
  return mod(mod(beer, 2) * 5, 10);
}

/** 0000:2526 — spend experience on level-ups; `rector` lifts the level-40 cap and the summary */
export function levelUp(rector: boolean) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (st.player.progression.exp < st.player.progression.expNext) return;
    let count = 0;
    do {
      st.player.progression.exp = i16(st.player.progression.exp - st.player.progression.expNext);
      st.player.progression.expNext = i16(st.player.progression.expNext + 10);
      count++;
    } while (st.player.progression.exp >= st.player.progression.expNext);
    for (let k = 1; k <= count; k++) {
      if (!rector && st.player.progression.level === 40) break;
      st.player.progression.level = i16(st.player.progression.level + 1);
      yield* print(HERO.pontovostUvelichivaetsya());
      const {
        strength: w0,
        agility: w1,
        vitality: w2,
        luck: w3,
      } = CHARACTER_CLASSES[st.player.type].weights;
      const total = w0 + w1 + w2 + w3;
      // the original keeps a string[2] per level for levels 1..40
      const history = (stat: StatKey) => {
        const level = st.player.progression.level;
        if (level > 40) return;
        const gains = st.player.progression.history[level] ?? [];
        st.player.progression.history[level] = [...gains, stat].slice(0, 2);
      };
      for (let j = 1; j <= 2; j++) {
        const r = (yield* rnd(total)) + 1;
        if (w0 >= r) {
          inc(st.player, 'strength', 1);
          yield* print(HERO.sila1());
          history('strength');
          inc(st.player, 'damageMax', 1);
          if (mod(attr(st.player, 'strength'), 2) === 0) inc(st.player, 'damageMin', 1);
          inc(st.player, 'healthMax', 1);
          st.player.health.current = i16(st.player.health.current + 1);
        } else if (w1 + w0 >= r) {
          inc(st.player, 'agility', 1);
          yield* print(HERO.lovkost1());
          history('agility');
        } else if (w2 + w1 + w0 >= r) {
          inc(st.player, 'vitality', 1);
          yield* print(HERO.zhivuchest1());
          history('vitality');
          inc(st.player, 'healthMax', 5);
          st.player.health.current = i16(st.player.health.current + 5);
        } else if (w3 + w2 + w1 + w0 >= r) {
          inc(st.player, 'luck', 1);
          yield* print(HERO.udacha1());
          history('luck');
        }
      }
      yield* writeLn;
    }
    if (!rector)
      yield* println(
        HERO.seychasUTebyaKachkov(st.player.progression.exp, st.player.progression.expNext)
      );
  });
}

/** `h` drinks one beer, `mh` drinks until healthy (or the beer runs out) */
export type BeerMode = 'one' | 'untilHealthy';

/** 0000:29C4 — only reached for the beer commands */
export function drinkBeer(mode: BeerMode) {
  return Effect.gen(function* () {
    const st = yield* started;
    const start = st.player.health.current;
    const h = mode === 'one';
    for (;;) {
      if (st.player.injuries.jaw) {
        yield* println(HERO.tyNeMozheshPit());
        break;
      }
      if (st.player.health.current >= attr(st.player, 'healthMax'))
        return yield* println(HERO.blinTolkoTupitNe());
      if (st.player.resources.beer > 0) {
        st.player.resources.beer = i16(st.player.resources.beer - 1);
        if (attr(st.player, 'healthMax') - st.player.health.current < 5) {
          if (h)
            yield* print(
              HERO.pivoPribavlyaetZ(attr(st.player, 'healthMax') - st.player.health.current)
            );
          st.player.health.current = attr(st.player, 'healthMax');
          if (h)
            yield* println(
              HERO.zdorovyaOstalosLPiva(
                st.player.health.current,
                attr(st.player, 'healthMax'),
                div(st.player.resources.beer, 2),
                beerTenths(st.player.resources.beer)
              )
            );
        } else {
          st.player.health.current = i16(st.player.health.current + 5);
          if (h)
            yield* println(
              HERO.pivoPribavlyaetZZdorovya(
                5,
                st.player.health.current,
                attr(st.player, 'healthMax'),
                div(st.player.resources.beer, 2),
                beerTenths(st.player.resources.beer)
              )
            );
        }
      } else if (h) yield* println(HERO.pivaNetu());
      if (
        h ||
        st.player.health.current >= attr(st.player, 'healthMax') ||
        st.player.resources.beer <= 0
      )
        break;
    }
    if (mode !== 'untilHealthy') return;
    if (st.player.health.current !== start)
      yield* println(
        HERO.pivoPribavlyaetZZdorovya(
          st.player.health.current - start,
          st.player.health.current,
          attr(st.player, 'healthMax'),
          div(st.player.resources.beer, 2),
          beerTenths(st.player.resources.beer)
        )
      );
    if (st.player.health.current !== start && st.player.resources.beer <= 0)
      yield* println(HERO.konchilosPivo());
    if (st.player.health.current === start && st.player.resources.beer <= 0)
      yield* println(HERO.pivaNetu());
  });
}

/** +1 strength with its derived stats (temple blessing) */
export const strengthUp = Effect.gen(function* () {
  const st = yield* started;
  inc(st.player, 'strength', 1);
  inc(st.player, 'healthMax', 1);
  st.player.health.current = i16(st.player.health.current + 1);
  inc(st.player, 'damageMax', 1);
  inc(st.player, 'damageMin', 1 - mod(attr(st.player, 'strength'), 2));
});

/** a found thing goes into its slot; a ring of the chain also heals what it adds to the maximum */
export function take(st: Game, item: Item) {
  put(st.player.body, item);
  st.player.health.current = i16(st.player.health.current + (RING_HEALTH[item] ?? 0));
}

/** the lines of a new ring; the Мега message differs between the places it comes from */
export function ringLines(ring: ChainRing, megaText: Text): Text[] {
  if (ring === 'pomogiRing') return [HERO.koltsoPomogiGospodi()];
  if (ring === 'megaRing') return [megaText];
  return [HERO.vaschePoleznoeKoltsoGospodi(), HERO.vosstZhizni35()];
}

/** the third level of a district opens the den */
export const DEN_LEVEL = 3;

/** the hero's level counted from the start of the current district (10 levels each) */
export function levelInDistrict(st: Game): number {
  return st.player.progression.level - (st.world.district - 1) * 10;
}

/** what is wrong with the hero, after the health */
function* heroInjuries(st: Game): Generator<Text> {
  if (st.player.injuries.jaw) yield HERO.slomanaChelyust();
  if (st.player.body.mouth.guard) yield HERO.zubnayaZaschita();
  if (st.player.injuries.leg) yield HERO.slomanaNoga();
  if (st.player.stoned > 0) yield HERO.obdolbanyy();
}

/** running away: the stats of the last level-up and the level itself are taken back */
export function levelDown(st: Game): readonly StatKey[] {
  const progression = st.player.progression;
  const lost = progression.history[progression.level] ?? [];
  progression.history[progression.level] = [];
  for (const stat of lost) loseStat(st, stat);
  progression.level = i16(progression.level - 1);
  progression.expNext = i16(progression.expNext - 10);
  if (progression.exp >= progression.expNext) progression.exp = i16(progression.expNext - 1);
  return lost;
}

function loseStat(st: Game, stat: StatKey) {
  if (stat === 'strength') {
    dec(st.player, 'strength', 1);
    dec(st.player, 'damageMax', 1);
    if (mod(attr(st.player, 'strength'), 2) === 1) dec(st.player, 'damageMin', 1);
    dec(st.player, 'healthMax', 1);
    if (st.player.health.current > attr(st.player, 'healthMax'))
      st.player.health.current = attr(st.player, 'healthMax');
  } else if (stat === 'agility') {
    dec(st.player, 'agility', 1);
  } else if (stat === 'vitality') {
    dec(st.player, 'vitality', 1);
    dec(st.player, 'healthMax', 5);
    if (st.player.health.current > attr(st.player, 'healthMax'))
      st.player.health.current = attr(st.player, 'healthMax');
  } else if (stat === 'luck') {
    dec(st.player, 'luck', 1);
  }
}
