/** The player character: stats screen, level-ups, beer, items. */
import { Effect } from 'effect';

import { writeLn } from '../crt/crt';
import { STAT_WEIGHTS } from '../data/tables';
import { div, mod } from '../tp/num';
import { Game, print, println, rnd } from './prelude';
import { HERO } from './texts';

/** 0000:1A03 — `s`: look at yourself in a puddle */
export const showStats = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const c = ['7', '7', '7', '7'];
  yield* println(HERO.tyUrovnya, mem.typeName(st.charType), st.level, mem.rankName(st.level));
  yield* println(HERO.aZovutTebya, st.name);
  if (st.level <= 39) yield* println(HERO.seychasUTebyaOpyta, st.exp, st.expNext);
  if (st.stoned > 0 || st.ringPg || st.megaRing) c[0] = '1';
  if (st.ringPg || st.megaRing) c[1] = c[2] = '1';
  if (st.cross || st.ringGs || st.ringPg || st.megaRing) c[3] = '1';
  yield* println(HERO.slLvZhvUd, c[0], st.str, c[1], st.agi, c[2], st.vit, c[3], st.luck);
  if (st.cross || st.ringGs) {
    yield* print(HERO.fenki);
    if (st.cross) yield* print(HERO.krestikUdacha2);
    if (st.ringGs) yield* print(HERO.koltsoGsUdacha1);
    yield* writeLn;
  }
  if (st.ringPg || st.megaRing || st.ringGp) {
    yield* print(HERO.moschnyeFenki);
    if (st.ringPg) yield* print(HERO.koltsoPgVse1);
    if (st.megaRing) yield* print(HERO.megaKoltsoVse4);
    if (st.ringGp) yield* print(HERO.koltsoGpSamolechenie);
    yield* writeLn;
  }
  if (st.phone) yield* println(HERO.uTebyaEstMobilnik);
  if (st.glasses) yield* println(HERO.uTebyaEstTemnye);
  if (st.tattoo) yield* println(HERO.naTebeZonovskayaNakolka);
  if (st.pistol) {
    yield* writeLn;
    yield* print(HERO.uTebyaEstPistolet);
    if (st.silencer) yield* print(HERO.sGushitelem);
    if (st.bullets > 0) yield* println(HERO.patronov, st.bullets);
    if (st.bullets <= 2 && st.bullets > 0) yield* println(HERO.aPtronovToMalo);
    if (st.bullets <= 0) yield* println(HERO.pravdaBezPatronov);
    yield* writeLn;
  }
  const armed =
    st.stoned > 0 || st.boots || st.boots2 || st.knuckles || st.club || st.knife || st.cleaver;
  yield* print(HERO.uron, armed ? '1' : '7', st.dmgMin, st.dmgMax);
  if (st.boots && !st.boots2) yield* print(HERO.butsy1);
  if (st.boots && st.boots2) yield* print(HERO.butsy);
  if (st.boots2) yield* print(HERO.pontovyeButsyUron2);
  if (st.knuckles && !st.knife && !st.club && !st.cleaver) yield* print(HERO.kastet2);
  if (st.knuckles && (st.knife || st.club || st.cleaver)) yield* print(HERO.kastet);
  if (st.club && !st.knife && !st.cleaver) yield* print(HERO.dubinka4);
  if (st.club && (st.knife || st.cleaver)) yield* print(HERO.dubinka);
  if (st.knife && !st.cleaver) yield* print(HERO.nozh6);
  if (st.knife && st.cleaver) yield* print(HERO.nozh);
  if (st.cleaver) yield* print(HERO.tesakUron9);
  yield* writeLn;
  let injuries = '';
  if (st.jawBroken === 1) injuries += HERO.slomanaChelyust;
  if (st.mouthGuard === 1) injuries += HERO.zubnayaZaschita;
  if (st.legBroken === 1) injuries += HERO.slomanaNoga;
  if (st.stoned > 0) injuries += HERO.obdolbanyy;
  yield* println(HERO.zdorove, healthColor(st.hp, st.hpMax), st.hp, st.hpMax, injuries);
  yield* accuracy(st.agi);
  if (st.armor > 0) {
    yield* print(HERO.bronya, st.armor);
    if (st.abibas) {
      if (st.adidas) {
        yield* print(HERO.abibas);
        yield* print(HERO.kostyumAdidas2);
      } else yield* print(HERO.kostyumAbibas1);
    }
    if (st.adidas && !st.abibas) yield* print(HERO.kostyumAdidas2);
    if (st.leather) {
      if (st.leather2) {
        yield* print(HERO.kozhanka);
        yield* print(HERO.krutayaKozhanka4);
      } else yield* print(HERO.kozhanka2);
    }
    if (st.leather2 && !st.leather) yield* print(HERO.krutayaKozhanka4);
    yield* writeLn;
  }
  if (st.joints > 0) yield* println(HERO.kosyaki, st.joints);
  if (st.beer > 0) yield* println(HERO.pivoL, div(st.beer, 2), beerTenths(st.beer));
  else yield* println(HERO.pivaNet);
  if (st.money > 0) yield* println(HERO.babki, st.money);
  else yield* println(HERO.netuBabok);
  if (st.junk > 0) yield* println(HERO.hlam, st.junk);
});

/** health colour: red up to 25%, yellow up to 50%, green above (Real division) */
export function healthColor(hp: number, max: number): string {
  const ratio = hp / max;
  if (ratio > 0.5) return '2';
  if (ratio > 0.25) return '6';
  return '4';
}

/** "Точность" lines shared by the stats of the hero and of the enemy */
export function accuracy(agility: number) {
  return Effect.gen(function* () {
    let a = agility;
    if (a <= 14) return yield* println(HERO.tochnost, a * 5 + 20);
    yield* print(HERO.tochnost90);
    a -= 14;
    let hits = 1;
    while (a > 18) {
      a -= 18;
      hits++;
    }
    if (hits === 1) yield* println(HERO.vtoroyUdar, a * 5);
    if (hits > 1) yield* println(HERO.udarovTochnostUdara, hits, hits + 1, a * 5);
  });
}

/** litres after the dot for beer counted in half-litres */
export function beerTenths(beer: number): number {
  return mod(mod(beer, 2) * 5, 10);
}

/** 0000:2526 — spend experience on level-ups; `rector` lifts the level-40 cap and the summary */
export function levelUp(rector: boolean) {
  return Effect.gen(function* () {
    const { st, mem } = yield* Game;
    if (st.exp < st.expNext) return;
    let count = 0;
    do {
      st.exp -= st.expNext;
      st.expNext += 10;
      count++;
    } while (st.exp >= st.expNext);
    for (let k = 1; k <= count; k++) {
      if (!rector && st.level === 40) break;
      st.level++;
      yield* print(HERO.pontovostUvelichivaetsya);
      const [w0, w1, w2, w3] = STAT_WEIGHTS[st.charType];
      const total = w0 + w1 + w2 + w3;
      const history = (d: string) => {
        if (st.level <= 40) mem.setHistory(st.level, mem.history(st.level) + d);
      };
      for (let j = 1; j <= 2; j++) {
        const r = (yield* rnd(total)) + 1;
        if (w0 >= r) {
          st.str++;
          yield* print(HERO.sila1);
          history('1');
          st.dmgMax++;
          if (mod(st.str, 2) === 0) st.dmgMin++;
          st.hpMax++;
          st.hp++;
        } else if (w1 + w0 >= r) {
          st.agi++;
          yield* print(HERO.lovkost1);
          history('2');
        } else if (w2 + w1 + w0 >= r) {
          st.vit++;
          yield* print(HERO.zhivuchest1);
          history('3');
          st.hpMax += 5;
          st.hp += 5;
        } else if (w3 + w2 + w1 + w0 >= r) {
          st.luck++;
          yield* print(HERO.udacha1);
          history('4');
        }
      }
      yield* writeLn;
    }
    if (!rector) yield* println(HERO.seychasUTebyaKachkov, st.exp, st.expNext);
  });
}

/** 0000:29C4 — `h` drinks one beer, `mh` drinks until healthy */
export function drinkBeer(cmd: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (cmd !== 'h' && cmd !== 'mh') return;
    const start = st.hp;
    const h = cmd === 'h';
    for (;;) {
      if (st.jawBroken === 1) {
        yield* println(HERO.tyNeMozheshPit);
        break;
      }
      if (st.hp >= st.hpMax) return yield* println(HERO.blinTolkoTupitNe);
      if (st.beer > 0) {
        st.beer--;
        if (st.hpMax - st.hp < 5) {
          if (h) yield* print(HERO.pivoPribavlyaetZ, st.hpMax - st.hp);
          st.hp = st.hpMax;
          if (h)
            yield* println(
              HERO.zdorovyaOstalosLPiva,
              st.hp,
              st.hpMax,
              div(st.beer, 2),
              beerTenths(st.beer)
            );
        } else {
          st.hp += 5;
          if (h)
            yield* println(
              HERO.pivoPribavlyaetZZdorovya,
              5,
              st.hp,
              st.hpMax,
              div(st.beer, 2),
              beerTenths(st.beer)
            );
        }
      } else if (h) yield* println(HERO.pivaNetu);
      if (h || st.hp >= st.hpMax || st.beer <= 0) break;
    }
    if (cmd !== 'mh') return;
    if (st.hp !== start)
      yield* println(
        HERO.pivoPribavlyaetZZdorovya,
        st.hp - start,
        st.hp,
        st.hpMax,
        div(st.beer, 2),
        beerTenths(st.beer)
      );
    if (st.hp !== start && st.beer <= 0) yield* println(HERO.konchilosPivo);
    if (st.hp === start && st.beer <= 0) yield* println(HERO.pivaNetu);
  });
}

/** +1 strength with its derived stats (temple blessing) */
export const strengthUp = Effect.gen(function* () {
  const { st } = yield* Game;
  st.str++;
  st.hpMax++;
  st.hp++;
  st.dmgMax++;
  st.dmgMin += 1 - mod(st.str, 2);
});

/** next ring of the Пг → Мега → Гп chain; the Мега message differs between callers */
export function gainRing(megaText: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (!st.ringPg) {
      yield* println(HERO.koltsoPomogiGospodi);
      st.str++;
      st.agi++;
      st.vit++;
      st.luck++;
      st.hpMax += 6;
      st.hp += 6;
      st.dmgMax++;
      st.dmgMin += 1 - mod(st.str, 2);
      st.ringPg = 1;
    } else if (!st.megaRing) {
      yield* println(megaText);
      st.str += 4;
      st.agi += 4;
      st.vit += 4;
      st.luck += 4;
      st.hpMax += 24;
      st.hp += 24;
      st.dmgMax += 4;
      st.dmgMin += 2;
      st.megaRing = 1;
    } else if (!st.ringGp) {
      yield* println(HERO.vaschePoleznoeKoltsoGospodi);
      yield* println(HERO.vosstZhizni35);
      st.ringGp = 1;
    }
  });
}
