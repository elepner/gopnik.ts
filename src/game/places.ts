/** Places of a district: market, dealers, vet, girlfriend, den, club, gym. */
import { Effect } from 'effect';

import { readLine, writeLn } from '../crt/crt';
import { PRICE } from '../data/tables';
import { mod } from '../tp/num';
import { spawnEnemy } from './enemy';
import { fight } from './fight';
import { levelUp } from './hero';
import { Game, lowerCase, print, printf, println, rnd } from './prelude';
import { PLACES } from './texts';

/** 0000:B940 — `mar` */
export const market = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsMarket !== 1) return yield* println(PLACES.tyNeznaeshPokaEshe);
  if (st.marketHeat !== 0) return yield* println(PLACES.naBazarPokaNelzya);
  yield* println(PLACES.tyPrishelNaBazar);
  yield* println(PLACES.mozhnoPotiskatZdesU);
  yield* println(PLACES.aMozhnoCheTo);
  yield* offer(1, PRICE.hotdog, PLACES.rubHotdog34);
  yield* offer(2, PRICE.beer, PLACES.rubPivoZ, 5);
  yield* offer(3, PRICE.glasses, PLACES.rubZatemnennyeOchkiChtob);
  yield* offer(4, PRICE.abibas, PLACES.rubRealnyySportivnyyKostyum);
  yield* offer(5, PRICE.boots, PLACES.rubPontovyeButsyUvelichivayut);
  if (st.district > 1) {
    yield* offer(6, PRICE.leather, PLACES.rubRealnuyuKozhankuDopolnitelnaya);
    yield* offer(7, PRICE.adidas, PLACES.rubRealnyySportivnyyKostyum2);
  }
  if (st.district > 2) yield* offer(8, PRICE.boots2, PLACES.rubPontoveyshieButsyUron);
  if (st.district > 3) yield* offer(9, PRICE.leather2, PLACES.rubVascheKrutuyuKozhanku);
  do {
    yield* prompt(PLACES.bazar);
    if (st.input === '1') {
      if (st.jawBroken === 1) yield* println(PLACES.tyNeMozheshHavat);
      else if (st.hp < st.hpMax) {
        if (PRICE.hotdog > st.money) yield* println(PLACES.chertBabokDazheNa);
        else {
          st.money -= PRICE.hotdog;
          st.hp += (yield* rnd(2)) + 3;
          if (st.hp > st.hpMax) st.hp = st.hpMax;
          yield* println(PLACES.tySozhralHotDog);
        }
      } else yield* println(PLACES.daNeohotaHavat);
    }
    if (st.input === '2') {
      if (PRICE.beer > st.money) yield* println(PLACES.neHvataet);
      else {
        st.money -= PRICE.beer;
        yield* println(BEER_LINES[yield* rnd(3)]);
        st.beer++;
      }
    }
    if (st.input === '3') {
      if (st.glasses) yield* println(PLACES.uTebyaEstOchki);
      else if (PRICE.glasses > st.money) yield* println(PLACES.neHvataetBabok);
      else {
        st.glasses = 1;
        st.money -= PRICE.glasses;
        yield* println(PLACES.modnyeTakieOchkiOt);
      }
    }
    if (st.input === '4') {
      if (st.adidas) yield* println(PLACES.uTebyaEstBolee);
      else if (st.abibas) yield* println(PLACES.uTebyaUzheEst);
      else if (PRICE.abibas > st.money) yield* println(PLACES.neHvataetDeneg);
      else {
        st.abibas = 1;
        st.money -= PRICE.abibas;
        yield* println(PLACES.teperTyBolshePohozh);
        st.armor++;
      }
    }
    if (st.input === '5') {
      if (st.boots2) yield* println(PLACES.uTebyaButsyPo);
      else if (st.boots) yield* println(PLACES.uTebyaTakieUzhe);
      else if (PRICE.boots > st.money) yield* println(PLACES.netuNaNihDeneg);
      else {
        st.boots = 1;
        st.money -= PRICE.boots;
        yield* println(PLACES.zatseniKrasovki);
        st.dmgMin++;
        st.dmgMax++;
      }
    }
    if (st.district > 1 && st.input === '6') {
      if (st.leather2) yield* println(PLACES.utebyaEstKozhankaKruche);
      else if (st.leather) yield* println(PLACES.tyUzheKupilEto);
      else if (PRICE.leather > st.money) yield* println(PLACES.neDostatochnoBabla);
      else {
        st.leather = 1;
        st.money -= PRICE.leather;
        yield* println(PLACES.nuVesNaPontah);
        st.armor += 2;
      }
    }
    // sic: no district check for the adidas suit
    if (st.input === '7') {
      if (st.adidas) yield* println(PLACES.uTebyaUzheEst2);
      else if (PRICE.adidas > st.money) yield* println(PLACES.neHvataetDeneg);
      else {
        st.adidas = 1;
        st.money -= PRICE.adidas;
        yield* println(PLACES.chistyyGopnik);
        st.armor += st.abibas ? 1 : 2;
      }
    }
    if (st.district > 2 && st.input === '8') {
      if (st.boots2) yield* println(PLACES.uTebyaTakieUzhe);
      else if (PRICE.boots2 > st.money) yield* println(PLACES.netuNaNihDeneg);
      else {
        st.boots2 = 1;
        st.money -= PRICE.boots2;
        yield* println(PLACES.ofigennyeButtsy);
        const bonus = st.boots ? 1 : 2;
        st.dmgMin += bonus;
        st.dmgMax += bonus;
      }
    }
    if (st.district > 3 && st.input === '9') {
      if (st.leather2) yield* println(PLACES.tyUzheKupilEto);
      else if (PRICE.leather2 > st.money) yield* println(PLACES.neDostatochnoBabla);
      else {
        st.leather2 = 1;
        st.money -= PRICE.leather2;
        yield* println(PLACES.nuKrutoySdohnutMozhno);
        st.armor += st.leather ? 2 : 4;
      }
    }
    if (st.input === 't') yield* pickpocket;
  } while (st.input !== 'w');
});

const BEER_LINES = [PLACES.glinskoeCheZaNafig, PLACES.pivkoHolodnenkoe, PLACES.nuChePoPivu];

const pickpocket = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  if ((yield* luckAtLeast(st.district * 5 + 5)) && (yield* rnd(10)) < 9) {
    st.found = (yield* rnd(st.luck * 2)) + 1;
    st.money += st.found;
    yield* println(PLACES.opaBabkiRubleyNa, st.found);
    yield* gainExp(st.district * 2);
    return;
  }
  yield* spawnEnemy(1);
  st.engaged = 1;
  yield* println(PLACES.koryavyyTyPopalsya);
  yield* println(PLACES.etoUrovnya, mem.typeName(st.eType), st.eLevel);
  yield* fight(1);
  yield* println(PLACES.blinMentyZapalyatSmatyvaysya);
  st.input = 'w';
  st.marketHeat = 5;
});

/** 0000:C4B4 — `bmar` */
export const dealers = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsDealers !== 1) return yield* println(PLACES.tudaLyubogoDebilaS);
  yield* println(PLACES.tyPrishelKBarygam);
  yield* println(PLACES.zdesMozhnoTolknutHlam);
  yield* println(PLACES.escheTyMozheshProdat);
  yield* offer(1, PRICE.joint, PLACES.rubKosyak);
  yield* offer(2, PRICE.phone, PLACES.rubKradenyyMobilnikPodmoga);
  yield* offer(3, PRICE.superJoint, PLACES.rubOfigennyyKosyakOchko);
  yield* offer(4, PRICE.tattoo, PLACES.rubSdelatTipaZonovskuyu);
  if (st.district > 1) yield* offer(5, PRICE.knuckles, PLACES.rubKastetUron2, 5);
  if (st.district > 2) yield* offer(6, PRICE.club, PLACES.rubDubinkaUron4, 5);
  if (st.district > 3) yield* offer(7, PRICE.pistol, PLACES.rubSamopalnyyPistoletMozhno, 20, 30);
  if (st.district > 3) yield* offer(8, PRICE.bullets, PLACES.rubPatrony6);
  // sic: colour by the silencer price, but the bullets price is shown
  if (st.district > 3 && st.pistol && st.phoneCalls === 25)
    yield* offerShowing(9, PRICE.silencer, PRICE.bullets, PLACES.rubGlushitel);
  do {
    yield* prompt(PLACES.barygi);
    if (st.input === '1') {
      if (PRICE.joint > st.money) yield* println(PLACES.chertBabokNeHvataet);
      else {
        st.money -= PRICE.joint;
        st.joints++;
        yield* println(PLACES.tyKupilKosyak);
      }
    }
    if (st.input === '2') {
      if (st.phone) yield* println(PLACES.uTebyaUzheEst3);
      else if (PRICE.phone > st.money) yield* println(PLACES.netuDeneg);
      else {
        st.phone = 1;
        st.money -= PRICE.phone;
        yield* println(PLACES.cheTyModnyyTipa);
      }
    }
    if (st.input === '3') {
      if (PRICE.superJoint > st.money) yield* println(PLACES.neHvataet);
      else {
        st.money -= PRICE.superJoint;
        yield* println(PLACES.poshliSteroidy);
        const r = yield* rnd(4);
        if (r === 0) {
          st.str++;
          yield* println(PLACES.sila1);
          st.dmgMax++;
          if (mod(st.str, 2) === 0) st.dmgMin++;
          st.hpMax++;
          st.hp++;
        } else if (r === 1) {
          st.agi++;
          yield* println(PLACES.lovkost1);
        } else if (r === 2) {
          st.vit++;
          yield* println(PLACES.zhivuchest1);
          st.hpMax += 5;
          st.hp += 5;
        } else if (r === 3) {
          st.luck++;
          yield* println(PLACES.udacha1);
        }
      }
    }
    if (st.input === '4') {
      if (st.tattoo) yield* println(PLACES.sdelatKonechnoMozhnoNo);
      else if (PRICE.tattoo > st.money) yield* println(PLACES.netuDeneg);
      else {
        st.tattoo = 1;
        st.money -= PRICE.tattoo;
        yield* println(PLACES.chistyyZek);
      }
    }
    if (st.input === '5') {
      if (st.club && st.knife && st.cleaver) yield* println(PLACES.nafigTebeOnNuzhen);
      else if (st.knuckles) yield* println(PLACES.uTebyaEstEta);
      else if (PRICE.knuckles > st.money) yield* println(PLACES.neHvataetDenzhat);
      else {
        st.knuckles = 1;
        st.money -= PRICE.knuckles;
        st.dmgMin += 2;
        st.dmgMax += 2;
        yield* println(PLACES.tyKupilKastetSmotri);
      }
    }
    if (st.input === '6') {
      if (st.knife && st.cleaver) yield* println(PLACES.daNafigOnaNuzhna);
      else if (st.club) yield* println(PLACES.uTebyaEstDubina);
      else if (PRICE.club > st.money) yield* println(PLACES.neHvataetNaDubinku);
      else {
        st.club = 1;
        st.money -= PRICE.club;
        if (st.knuckles) {
          st.dmgMin += 2;
          st.dmgMax += 2;
        }
        yield* println(PLACES.tyKupilDubinkuPohozhe);
      }
    }
    if (st.input === '7') {
      if (st.pistol) yield* println(PLACES.nuTyVascheOfigel);
      else if (PRICE.pistol > st.money) yield* println(PLACES.dorogayaShtuka);
      else {
        st.pistol = 1;
        st.bullets += 3;
        st.money -= PRICE.pistol;
        yield* println(PLACES.spasaysyaKtoMozhet);
        yield* println(PLACES.tolkoPomniStrelyayV);
      }
    }
    if (st.input === '8') {
      if (!st.pistol) yield* println(PLACES.netuPushkiSnachalaKupi);
      else if (PRICE.bullets > st.money) yield* println(PLACES.nehvatkaDeneg);
      else {
        st.bullets += 5;
        st.money -= PRICE.bullets;
        yield* println(PLACES.poluchiPyatPulNa);
      }
    }
    if (st.input === '9' && st.pistol && st.phoneCalls === 25) {
      if (st.silencer) yield* println(PLACES.daKupilUzheKupil);
      else if (PRICE.silencer > st.money) yield* println(PLACES.podkopiBabla);
      else {
        st.silencer = 1;
        st.money -= PRICE.silencer;
        yield* println(PLACES.teperStrelyayGdeHochesh);
      }
    }
    if (st.input === 'x') {
      if (st.junk > 0) {
        st.money += st.junk;
        st.junk = 0;
        yield* println(PLACES.barygiDaliTebeDeneg);
      } else yield* println(PLACES.tebeNechegoSpihnut);
    }
    if (st.input === 'wes') yield* sellStuff;
  } while (st.input !== 'w');
});

const sellStuff = Effect.gen(function* () {
  const { st } = yield* Game;
  st.sold = 255;
  const sell = (question: string, base: number, spread: number, done: string, drop: () => void) =>
    Effect.gen(function* () {
      yield* println(question);
      const answer = yield* prompt(PLACES.prodatVeschi);
      st.sold = (yield* rnd(spread)) + base;
      if (answer !== 'y') return;
      drop();
      st.money += (st.sold << 24) >> 24;
      yield* println(done, (st.sold << 24) >> 24);
    });
  if (st.abibas && st.adidas)
    yield* sell(PLACES.uTebyaEstNenuzhnyy, 8, 5, PLACES.tyProdalKostyumZa, () => {
      st.abibas = 0;
    });
  if (st.boots && st.boots2)
    yield* sell(PLACES.uTebyaEstNenuzhnye, 8, 5, PLACES.tyProdalKrossovkiZa, () => {
      st.boots = 0;
    });
  if (st.leather && st.leather2)
    yield* sell(PLACES.uTebyaEstNenuzhnaya, 13, 8, PLACES.tyProdalKozhankuZa, () => {
      st.leather = 0;
    });
  if (st.knuckles && (st.club || st.knife || st.cleaver))
    yield* sell(PLACES.uTebyaEstKastet, 13, 8, PLACES.tyProdalKastetZa, () => {
      st.knuckles = 0;
    });
  if (st.club && (st.knife || st.cleaver))
    yield* sell(PLACES.uTebyaEstDubinka, 25, 15, PLACES.tyProdalDubinkuZa, () => {
      st.club = 0;
    });
  if (st.knife && st.cleaver)
    yield* sell(PLACES.uTebyaEstNozhik, 38, 23, PLACES.tyProdalNozhikZa, () => {
      st.knife = 0;
    });
  if (st.sold === 255) yield* println(PLACES.uTebyaNetNeuzhnyh);
  st.input = ' ';
});

/** 0000:D39C — `rep`: the vet */
export const vet = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsHospital !== 1) return yield* println(PLACES.snachalaNaydiGdeNahodtsya);
  yield* println(PLACES.tyPrishelNaRemot);
  const healthy = () => st.hp >= st.hpMax && !st.jawBroken && !st.legBroken;
  if (!healthy()) {
    yield* println(PLACES.dokNeVolnuysyaVse);
    st.color = st.money >= 3 ? 48 : 52;
    yield* println(PLACES.hZa3Rublya, String.fromCharCode(st.color));
    st.color = st.money >= 7 ? 48 : 52;
    yield* println(PLACES.rZa7Rubley, String.fromCharCode(st.color));
  }
  for (;;) {
    if (healthy()) return yield* println(PLACES.dokValiOtsyudaTy);
    yield* prompt(PLACES.veterenar);
    if (st.input === 'r' && (st.jawBroken === 1 || st.legBroken === 1)) {
      if (st.money >= 7) {
        st.money -= 7;
        st.jawBroken = 0;
        st.legBroken = 0;
        yield* println(PLACES.ogoDaTebyaNe);
        yield* println(PLACES.tvoiPerelomyZalecheny);
      } else yield* println(PLACES.blinHalyavschikMeditsinaNe);
    }
    if (st.input === 'h' && st.hp < st.hpMax) {
      if (st.money >= 3) {
        st.money -= 3;
        st.hp += 5;
        if (st.hp > st.hpMax) st.hp = st.hpMax;
        const r = yield* rnd(3);
        if (r === 1) yield* println(PLACES.schasGaykiPodtyanemI);
        else if (r === 2) yield* println(PLACES.takCheTutU);
        else {
          yield* println(PLACES.eyDokAZachem);
          yield* println(PLACES.dokMolchiZhivotnoe);
        }
        yield* println(PLACES.zdorovya, st.hp, st.hpMax);
      } else yield* println(PLACES.blinHalyavschikMeditsinaNe);
    }
    if (st.input === 'w' || st.input === 'e') return;
  }
});

/** 0000:D6E3 — `girl` */
export const girlfriend = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.hasGirl !== 1) return yield* println(PLACES.uTebyaPokaNet);
  if (st.money < 12) return yield* println(PLACES.nuNepoydeshZheKak);
  yield* println(PLACES.tyPrishelKSvoey);
  if ((yield* rnd(2)) === 0 && !st.knowsClub) {
    yield* println(PLACES.onaVytaschilaTebyaV);
    st.knowsClub = 1;
  }
  yield* println(PLACES.tyKupilEyChe);
  yield* println(PLACES.tyRasslabilsyaOtdohnulI);
  st.hp = st.hpMax;
  st.money -= 12;
  st.marketHeat = 0;
});

/** 0000:D80C — `pr`: the den */
export const den = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  if (st.denAccess !== 1) return yield* println(PLACES.tebyaMudakaTakogoTuda);
  yield* print(PLACES.tyPrishelVPriton);
  if (st.district === 1) yield* println(PLACES.obschagu, (yield* rnd(6)) + 3);
  if (st.district === 2) yield* println(PLACES.obschaguVki);
  if (st.district === 3) yield* println(PLACES.gopovskiyPriton);
  if (st.district === 4) yield* println(PLACES.pritonOtmorozkov);
  yield* writeLn;
  const rel = () => st.level - (st.district - 1) * 10;
  const curious = () => !st.knowsDealers || !st.knowsGym;
  if (st.denQuestHelp === 1) yield* println(PLACES.naOdnogoPatsanaNaehal);
  if (st.denQuestJob && st.respect >= 100) yield* println(PLACES.tyPatsanNormalnyyEst);
  if (curious() && (rel() - 5) * 5 + st.respect >= 40) yield* println(PLACES.patsanyHotyatTebeKoe);
  yield* writeLn;
  yield* println(PLACES.napishiWChtobyUyti);
  st.color = st.beer !== 0 ? 48 : 52;
  yield* println(PLACES.napishiPChtobyUgostit, String.fromCharCode(st.color));
  st.color = st.respect >= 2 ? 48 : 52;
  if (st.loans > 0) yield* println(PLACES.napishiRChtobyZanyat, String.fromCharCode(st.color));
  if (st.denQuestHelp === 1) yield* println(PLACES.napishiHpChtobyOtpinat);
  yield* println(PLACES.napishiSChtobyUznat);
  if (curious() && (rel() - 5) * 5 + st.respect >= 40) yield* println(PLACES.napishiAChtobySprosit);
  if (st.respect >= 100 && st.denQuestJob) yield* println(PLACES.napishiDChtobyPoyti);
  do {
    yield* prompt(PLACES.priton);
    if (st.input === 'p') {
      if (st.beer > 0) {
        st.beer--;
        st.respect += 5;
        yield* println(PLACES.tyUgostilPatsanovPivom);
      } else yield* println(PLACES.aNetUTebya);
    }
    if (st.input === 'r') {
      if (st.loans <= 0) yield* println(PLACES.tyUzheVsyuMeloch);
      else if (st.respect > 0) {
        st.money += 2;
        st.respect -= 2;
        st.loans--;
        yield* println(PLACES.tyZanyal2Rublya);
      } else yield* println(PLACES.tyNeMozheshZanyat);
    }
    if (st.denQuestHelp === 1 && st.input === 'hp') {
      yield* spawnEnemy(1);
      st.engaged = 1;
      yield* println(PLACES.etoUrovnya, mem.typeName(st.eType), st.eLevel);
      yield* fight(6);
      st.denQuestHelp = 0;
    }
    if (st.input === 's') {
      yield* println(PLACES.tvoyaPontovostSeychas, st.respect);
      if (st.district * 10 + 10 <= st.respect) yield* println(PLACES.daEsliCheMy);
    }
    if (curious() && rel() * 2 + st.respect >= 40 && st.input === 'a') {
      st.knowsDealers = 1;
      st.knowsGym = 1;
      yield* println(PLACES.tutUNasEst);
      yield* println(PLACES.tyUznalGdeNahoditsya);
    }
    if (st.input === 'd' && st.respect >= 100 && st.denQuestJob) yield* job;
  } while (st.input !== 'w');
});

const job = Effect.gen(function* () {
  const { st } = yield* Game;
  yield* println(PLACES.davayBystree);
  yield* println(PLACES.tyPrishelVorovatDengi);
  if (yield* luckAtLeast(st.district * 15)) {
    yield* println(PLACES.tyNavarovalDeneg);
    st.money += st.district * 10 + (yield* rnd(st.district * 10));
    st.junk += st.district * 10 + (yield* rnd(st.district * 10));
    yield* gainExp(st.district * 12);
  } else {
    yield* println(PLACES.shuherMenty);
    if (yield* luckAtLeast(st.district * 15)) yield* println(PLACES.tySmylsyaOtMentov);
    else {
      yield* spawnEnemy(2);
      yield* fight(5);
      yield* println(PLACES.poraValit);
    }
  }
  st.denQuestJob = 0;
});

/** 0000:DEFC — `kl`: the club */
export const club = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsClub !== 1) return yield* println(PLACES.tyPokaChtoNeuznal);
  if (st.clubHeat > 0) return yield* println(PLACES.tebeNeStoitPoka);
  yield* println(PLACES.tyPrishelVKlub);
  yield* println(PLACES.zdesMozhnoSygratV);
  st.color = st.money >= 15 ? 48 : 52;
  yield* println(PLACES.n115PotusovatsyaNa, String.fromCharCode(st.color));
  if (st.district > 1) {
    st.color = st.money >= 22 ? 48 : 52;
    yield* println(PLACES.n222RazuznatPriemy, String.fromCharCode(st.color));
  }
  st.bet = 5;
  do {
    yield* prompt(PLACES.klub);
    if (st.input === 'p') {
      if (st.bet <= st.money) yield* playCards;
      else yield* println(PLACES.neHvataetDenegNado, st.bet);
    }
    if (st.input === '1') {
      if (st.money >= 15) {
        st.money -= 15;
        yield* println(PLACES.tyProkachivaeshLovkost);
        st.agi++;
        yield* println(PLACES.lovkost1);
      } else yield* println(PLACES.neHvataet);
    }
    if (st.district > 1 && st.input === '2') {
      if (st.money >= 22) {
        st.money -= 22;
        yield* println(PLACES.tyProkachivaeshUdachu);
        st.luck++;
        yield* println(PLACES.udacha1);
      } else yield* println(PLACES.neHvataet);
    }
  } while (st.input !== 'w');
});

const playCards = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  yield* println(PLACES.tyPostavilRubley, st.bet);
  st.money -= st.bet;
  if (yield* luckAtLeast(st.district * 12)) {
    st.money += st.bet * 2;
    yield* println(PLACES.tyVyigralRubley, st.bet);
    st.bet += 2;
    yield* gainExp(st.district);
  } else {
    yield* println(PLACES.tyProigralRubley, st.bet);
    st.bet = 5;
  }
  if (st.bet < 17 && st.bet > 5) yield* println(PLACES.stavkiIzmenilisTeperStavka, st.bet);
  if (st.bet < 17) return;
  yield* spawnEnemy(1);
  st.engaged = 1;
  yield* println(PLACES.kozelDaTyMuhleval);
  yield* println(PLACES.etoUrovnya, mem.typeName(st.eType), st.eLevel);
  yield* println(PLACES.tyPoluchaeshKachkovOpyta, st.district * 5);
  st.exp += st.district * 5;
  yield* levelUp(false);
  yield* fight(2);
  yield* println(PLACES.unosiNogiPokaNe);
  st.clubHeat = 5;
  st.input = 'w';
});

/** 0000:E386 — `trn`: the gym */
export const gym = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.knowsGym !== 1) return yield* println(PLACES.tyPokaNeznaeshGde);
  st.press = st.armor;
  if (st.abibas && !st.adidas) st.press--;
  if (st.adidas) st.press -= 2;
  if (st.leather && !st.leather2) st.press -= 2;
  if (st.leather2) st.press -= 4;
  yield* println(PLACES.tyPrishelVKachalku);
  const c = (price: number) => {
    st.color = st.money >= price ? 48 : 52;
    return String.fromCharCode(st.color);
  };
  yield* println(PLACES.n120KachatsyaGatelyami, c(20));
  yield* println(PLACES.n220KachatsyaNa, c(20));
  if (st.district > 1 && st.district * 10 - 3 > st.level)
    yield* println(PLACES.n310ProkachatKachkov, c(10), 10);
  if (st.district > 1) yield* println(PLACES.n430KupitZubnuyu, c(30));
  if (st.district > 2 && st.press < st.district * 2)
    yield* println(PLACES.n520ProkachatPress, c(20));
  do {
    yield* prompt(PLACES.kachalka);
    if (st.input === '1') {
      if (st.money >= 20) {
        st.money -= 20;
        yield* println(PLACES.tyProkachivaeshSilu);
        st.str++;
        st.hpMax++;
        st.hp++;
        if (mod(st.str, 2) === 0) st.dmgMin++;
        st.dmgMax++;
        yield* println(PLACES.sila1);
      } else yield* println(PLACES.neHvataet);
    }
    if (st.input === '2') {
      if (st.money >= 20) {
        st.money -= 20;
        yield* println(PLACES.tyProkachivaeshVynoslivost);
        st.vit++;
        st.hpMax += 5;
        st.hp += 5;
        yield* println(PLACES.vynoslivost1);
      } else yield* println(PLACES.neHvataet);
    }
    if (st.district > 1 && st.input === '3') {
      if (st.district * 10 - 3 <= st.level) yield* println(PLACES.tySlishkomKrutoyChtoby);
      else if (st.money < 10) yield* println(PLACES.neHvataetDenzhat);
      else {
        st.money -= 10;
        yield* println(PLACES.tyTrenirueshsya);
        st.exp += 10;
        yield* println(PLACES.kachkovOpyta, 10);
        if (st.exp >= st.expNext) yield* levelUp(false);
      }
    }
    if (st.district > 1 && st.input === '4') {
      if (st.mouthGuard) yield* println(PLACES.uTebyaEstEta2);
      else if (st.money < 30) yield* println(PLACES.aNeHvataetRublikov);
      else {
        st.money -= 30;
        st.mouthGuard = 1;
        yield* println(PLACES.tyKupilZaschitu);
      }
    }
    if (st.district > 2 && st.input === '5') {
      if (st.press < (st.district - 2) * 10) {
        if (st.money < 20) yield* println(PLACES.neHvataetRublikov);
        else {
          st.money -= 20;
          yield* println(PLACES.tyProkachivaeshPress);
          st.armor++;
          st.press++;
          yield* println(PLACES.bronya1);
        }
      } else {
        yield* println(PLACES.tyMaksimalnoProkachalPress);
        if (st.district < 4) yield* println(PLACES.kachayDalsheVSleduyuschem);
      }
    }
  } while (st.input !== 'w');
});

/** "Print(prompt); ReadLn(input); LowerCase(input)" */
export function prompt(text: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    yield* print(text);
    st.input = lowerCase(yield* readLine);
    return st.input;
  });
}

/** `luck >= Random(n)` as the original's Longint compare: no Random call when luck < 0 */
export function luckAtLeast(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (st.luck < 0) return false;
    return st.luck >= (yield* rnd(n));
  });
}

/** "Ты получаешь # качков опыта" + level-up */
export function gainExp(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    yield* println(PLACES.tyPoluchaeshKachkovOpyta2, n);
    st.exp += n;
    yield* levelUp(false);
  });
}

/** a shop line: number, price coloured by affordability, description with optional # args */
function offer(n: number, price: number, text: string, ...args: number[]) {
  return offerShowing(n, price, price, text, ...args);
}

/** a shop line whose colour comes from one price while another one is printed */
function offerShowing(n: number, price: number, shown: number, text: string, ...args: number[]) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    st.color = price <= st.money ? 48 : 52;
    // the description has its own # placeholders, so the arguments are not typed here
    yield* printf(
      PLACES.offerLine,
      [String(n), String.fromCharCode(st.color), shown, text, ...args],
      true
    );
  });
}
