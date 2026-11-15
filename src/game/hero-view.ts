/** What the player sees of the hero: stats, level-ups, experience (`hero.ts`). */
import { Effect } from 'effect';

import { attr } from '../state/attributes';
import type { ChainRing } from '../state/items';
import { rankName, typeName } from '../state/names';
import type { Game, StatKey } from '../state/state';
import { div } from '../tp/num';
import { beerTenths, healthColor } from './hero';
import { print, println, started } from './prelude';
import { writeLn } from './terminal';
import { type Color, text, type Text } from './text';
import { HERO, PLACES } from './texts';
import type { View } from './view';

export type HeroEvent =
  /** experience spent on this many level-ups (the level-40 cap may still keep the levels) */
  | { readonly type: 'heroExpSpent'; readonly levels: number }
  /** a level, with the two stats it raised */
  | { readonly type: 'heroLevelGained'; readonly gains: readonly StatKey[] }
  /** the experience left after the level-ups */
  | { readonly type: 'heroExpLeft' }
  /** experience earned in a place */
  | { readonly type: 'heroExpGained'; readonly exp: number }
  /** +1 strength from the temple */
  | { readonly type: 'heroStrengthGained' };

/** the hero as the player sees him */
export const heroView: View<HeroEvent> = {
  events: {
    heroExpSpent: true,
    heroLevelGained: true,
    heroExpLeft: true,
    heroExpGained: true,
    heroStrengthGained: true,
  },
  show: (event) => showHero(event),
};

function showHero(event: HeroEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'heroLevelGained':
        yield* print(HERO.pontovostUvelichivaetsya());
        for (const stat of event.gains) yield* print(GAIN[stat]);
        return yield* writeLn;
      case 'heroExpLeft':
        return yield* println(
          HERO.seychasUTebyaKachkov(st.player.progression.exp, st.player.progression.expNext)
        );
      case 'heroExpGained':
        return yield* println(PLACES.tyPoluchaeshKachkovOpyta2(event.exp));
      case 'heroExpSpent':
      case 'heroStrengthGained':
        return;
    }
  });
}

/** the line of a raised stat */
const GAIN: Record<StatKey, Text> = {
  strength: HERO.sila1(),
  agility: HERO.lovkost1(),
  vitality: HERO.zhivuchest1(),
  luck: HERO.udacha1(),
};

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

/** what is wrong with the hero, after the health */
function* heroInjuries(st: Game): Generator<Text> {
  if (st.player.injuries.jaw) yield HERO.slomanaChelyust();
  if (st.player.body.mouth.guard) yield HERO.zubnayaZaschita();
  if (st.player.injuries.leg) yield HERO.slomanaNoga();
  if (st.player.stoned > 0) yield HERO.obdolbanyy();
}

/** the lines of a new ring; the Мега message differs between the places it comes from */
export function ringLines(ring: ChainRing, megaText: Text): Text[] {
  if (ring === 'pomogiRing') return [HERO.koltsoPomogiGospodi()];
  if (ring === 'megaRing') return [megaText];
  return [HERO.vaschePoleznoeKoltsoGospodi(), HERO.vosstZhizni35()];
}
