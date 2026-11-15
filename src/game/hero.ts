/** The player character: stats screen, level-ups, beer, items. */
import { Effect } from 'effect';

import { writeLn } from '../crt/crt';
import { CHARACTER_CLASSES } from '../state/kinds';
import { typeName, rankName } from '../state/names';
import type { StatKey } from '../state/state';
import { div, i16, mod } from '../tp/num';
import { CMD } from './commands';
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
      st.player.stats.strength,
      c[1],
      st.player.stats.agility,
      c[2],
      st.player.stats.vitality,
      c[3],
      st.player.stats.luck
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
  yield* print(HERO.uron(armed ? 'blue' : 'white', st.player.damage.min, st.player.damage.max));
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
  const injuries: Text[] = [];
  if (st.player.injuries.jaw) injuries.push(HERO.slomanaChelyust());
  if (st.player.body.mouth.guard) injuries.push(HERO.zubnayaZaschita());
  if (st.player.injuries.leg) injuries.push(HERO.slomanaNoga());
  if (st.player.stoned > 0) injuries.push(HERO.obdolbanyy());
  yield* println(
    HERO.zdorove(
      healthColor(st.player.health.current, st.player.health.max),
      st.player.health.current,
      st.player.health.max,
      text(...injuries)
    )
  );
  yield* accuracy(st.player.stats.agility);
  if (st.player.armor > 0) {
    yield* print(HERO.bronya(st.player.armor));
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
          st.player.stats.strength = i16(st.player.stats.strength + 1);
          yield* print(HERO.sila1());
          history('strength');
          st.player.damage.max = i16(st.player.damage.max + 1);
          if (mod(st.player.stats.strength, 2) === 0)
            st.player.damage.min = i16(st.player.damage.min + 1);
          st.player.health.max = i16(st.player.health.max + 1);
          st.player.health.current = i16(st.player.health.current + 1);
        } else if (w1 + w0 >= r) {
          st.player.stats.agility = i16(st.player.stats.agility + 1);
          yield* print(HERO.lovkost1());
          history('agility');
        } else if (w2 + w1 + w0 >= r) {
          st.player.stats.vitality = i16(st.player.stats.vitality + 1);
          yield* print(HERO.zhivuchest1());
          history('vitality');
          st.player.health.max = i16(st.player.health.max + 5);
          st.player.health.current = i16(st.player.health.current + 5);
        } else if (w3 + w2 + w1 + w0 >= r) {
          st.player.stats.luck = i16(st.player.stats.luck + 1);
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

/** the beer mode of a typed command, if it is one */
export function beerMode(command: string): BeerMode | undefined {
  if (command === CMD.beer.one) return 'one';
  if (command === CMD.beer.untilHealthy) return 'untilHealthy';
  return undefined;
}

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
      if (st.player.health.current >= st.player.health.max)
        return yield* println(HERO.blinTolkoTupitNe());
      if (st.player.resources.beer > 0) {
        st.player.resources.beer = i16(st.player.resources.beer - 1);
        if (st.player.health.max - st.player.health.current < 5) {
          if (h)
            yield* print(HERO.pivoPribavlyaetZ(st.player.health.max - st.player.health.current));
          st.player.health.current = st.player.health.max;
          if (h)
            yield* println(
              HERO.zdorovyaOstalosLPiva(
                st.player.health.current,
                st.player.health.max,
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
                st.player.health.max,
                div(st.player.resources.beer, 2),
                beerTenths(st.player.resources.beer)
              )
            );
        }
      } else if (h) yield* println(HERO.pivaNetu());
      if (h || st.player.health.current >= st.player.health.max || st.player.resources.beer <= 0)
        break;
    }
    if (mode !== 'untilHealthy') return;
    if (st.player.health.current !== start)
      yield* println(
        HERO.pivoPribavlyaetZZdorovya(
          st.player.health.current - start,
          st.player.health.current,
          st.player.health.max,
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
  st.player.stats.strength = i16(st.player.stats.strength + 1);
  st.player.health.max = i16(st.player.health.max + 1);
  st.player.health.current = i16(st.player.health.current + 1);
  st.player.damage.max = i16(st.player.damage.max + 1);
  st.player.damage.min = i16(st.player.damage.min + (1 - mod(st.player.stats.strength, 2)));
});

/** next ring of the Пг → Мега → Гп chain; the Мега message differs between callers */
export function gainRing(megaText: Text) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (!st.player.body.hands.rings.pomogi) {
      yield* println(HERO.koltsoPomogiGospodi());
      st.player.stats.strength = i16(st.player.stats.strength + 1);
      st.player.stats.agility = i16(st.player.stats.agility + 1);
      st.player.stats.vitality = i16(st.player.stats.vitality + 1);
      st.player.stats.luck = i16(st.player.stats.luck + 1);
      st.player.health.max = i16(st.player.health.max + 6);
      st.player.health.current = i16(st.player.health.current + 6);
      st.player.damage.max = i16(st.player.damage.max + 1);
      st.player.damage.min = i16(st.player.damage.min + (1 - mod(st.player.stats.strength, 2)));
      st.player.body.hands.rings.pomogi = true;
    } else if (!st.player.body.hands.rings.mega) {
      yield* println(megaText);
      st.player.stats.strength = i16(st.player.stats.strength + 4);
      st.player.stats.agility = i16(st.player.stats.agility + 4);
      st.player.stats.vitality = i16(st.player.stats.vitality + 4);
      st.player.stats.luck = i16(st.player.stats.luck + 4);
      st.player.health.max = i16(st.player.health.max + 24);
      st.player.health.current = i16(st.player.health.current + 24);
      st.player.damage.max = i16(st.player.damage.max + 4);
      st.player.damage.min = i16(st.player.damage.min + 2);
      st.player.body.hands.rings.mega = true;
    } else if (!st.player.body.hands.rings.pomiluy) {
      yield* println(HERO.vaschePoleznoeKoltsoGospodi());
      yield* println(HERO.vosstZhizni35());
      st.player.body.hands.rings.pomiluy = true;
    }
  });
}
