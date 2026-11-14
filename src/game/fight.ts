/** The fight loop (0000:3D11). */
import { Effect } from 'effect';

import { readKey, readLine, writeLn } from '../crt/crt';
import { div, mod, round } from '../tp/num';
import { showEnemy } from './enemy';
import { drinkBeer, gainRing, levelUp, showStats } from './hero';
import { Game, halt, lowerCase, print, println, rnd, fmt } from './prelude';
import { gameOver, victoryAnimation } from './screens';
import { FIGHT } from './texts';

/**
 * Why the fight started: 0 met while walking, 1 caught stealing at the market,
 * 2 caught cheating in the club, 3 the fake rector, 4 the real rector,
 * 5 cops during the den job, 6 helping the den.
 */
export type FightKind = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** 0000:3D11 */
export function fight(kind: FightKind) {
  return Effect.gen(function* () {
    const { st, mem } = yield* Game;
    yield* greeting(kind);
    const enemyHits = extraHits(st.eAgi + 4, st.agi + 4);
    if (st.eAgi + 4 > 18 && div(enemyHits, 18) < div(st.eAgi + 4, 18))
      yield* println(
        FIGHT.izZaTvoeyHoroshey,
        div(enemyHits - 1, 18) + 1,
        div(st.eAgi + 4 - 1, 18) + 1
      );
    const playerHits = extraHits(st.agi + 4, st.eAgi + 4);
    if (st.agi + 4 > 18 && div(playerHits, 18) < div(st.agi + 4, 18))
      yield* println(
        FIGHT.izZaHorosheyLovkosti,
        div(playerHits - 1, 18) + 1,
        div(st.agi + 4 - 1, 18) + 1
      );

    let spectators = 0;
    let over = false;
    while (!over) {
      if (spectators < 5) {
        spectators++;
        if (spectators === 5) yield* println(FIGHT.nachinayutSobiratsyaZriteli);
      }
      if (st.rector === 0 && spectators === 5 && (yield* rnd(10)) === 0)
        for (const line of yield* crowdShout) yield* println(line);

      yield* print(FIGHT.bitva);
      st.input = lowerCase(yield* readLine);
      const input = st.input;

      if (input === 'k') {
        yield* playerKicks(playerHits);
        if (st.eHp > 0) yield* enemyKicks(enemyHits);
      }

      if (input === 'run') {
        if (st.rector === 1) yield* println(FIGHT.rektorKudaStoyatBeysya);
        else if (st.legBroken === 1) yield* println(FIGHT.tyNeMozheshUbezhat);
        else {
          if (st.level > 0) {
            yield* print(FIGHT.vragTruslivyyZasranets);
            const lost = mem.history(st.level);
            mem.setHistory(st.level, '');
            for (const c of lost) yield* loseStat(c);
            yield* writeLn;
            if (st.charType !== 5 && st.level - (st.district - 1) * 10 === 3) {
              st.denAccess = 1; // sic: the original grants access while saying the opposite
              yield* println(FIGHT.takogoKonyavogoNepustyatV);
            }
            st.level--;
            st.expNext -= 10;
            if (st.exp >= st.expNext) st.exp = st.expNext - 1;
          } else yield* println(FIGHT.vragZasranets);
          over = true;
        }
      }

      yield* drinkBeer(input);
      if (input === 'kos') yield* smokeJoint(3);
      if (input === 's') yield* showStats;
      if (input === 'sv') yield* showEnemy;
      if (input === 'e') return yield* halt;
      if (st.backup >= 1 && input === 'k') {
        st.backup++;
        if (st.backup === 3) yield* println(FIGHT.podoshliPatsanySchaNachnetsya);
      }
      if (input === 'v') yield* callBackup;
      if (st.eHp > 0 && st.backup >= 3) yield* backupKicks;
      if (input === 'f' && st.pistol) yield* shoot;

      if (st.hp <= 0) {
        if (st.rector === 1) {
          yield* println(FIGHT.tySdohRektorTebya);
          yield* readKey;
          yield* gameOver(false);
        } else if (st.denAccess === 1 && st.respect >= 10) {
          yield* println(FIGHT.tebePovezloZnakomyePatsany);
          st.respect -= 10;
          st.money -= round((st.hpMax / 5) * 3);
          st.hp = st.hpMax;
          if (st.jawBroken === 1 || st.legBroken === 1) {
            st.money -= 7;
            st.jawBroken = 0;
            st.legBroken = 0;
          }
          if (st.money < 0) {
            st.respect += st.money;
            st.money = 0;
          }
          over = true;
        } else {
          yield* println(FIGHT.tySdoh);
          yield* readKey;
          yield* gameOver(false);
        }
      }

      if (st.eHp <= 0) {
        yield* enemyDied(kind);
        over = true;
      }
    }
    st.backup = 0;
  });
}

function greeting(kind: FightKind) {
  return Effect.gen(function* () {
    const { st, mem } = yield* Game;
    const type = mem.typeName(st.charType);
    if (kind === 0 || kind === 6) {
      if (st.eType <= 2) {
        yield* println(FIGHT.slyshVas);
        yield* println(FIGHT.aCheVasche);
      } else if (st.eType <= 6) {
        yield* println(FIGHT.patsanTyIzKakogo);
        yield* println(FIGHT.aTyPoPinkam);
      } else if (st.eType === 7) yield* println(FIGHT.eyMudak);
      else if (st.eType === 8) yield* println(FIGHT.blinEtoZheIzvestnyy, st.name, type);
      else if (st.eType === 9) {
        yield* println(FIGHT.yaManyak);
        yield* println(FIGHT.radPoznakomitsya, type);
      }
    } else if (kind === 1) yield* println(FIGHT.otdayKoshelekUrod);
    else if (kind === 3)
      yield* lines(
        FIGHT.nuVotMyI,
        FIGHT.cheTeNadaKozel,
        FIGHT.urytTebyaUblyudok,
        FIGHT.nuTyMenyaDostal
      );
    else if (kind === 4)
      yield* lines(
        FIGHT.tutZahoditNastoyaschiyRektor,
        FIGHT.mudakTyTupoyDebil,
        FIGHT.yaDumayuTySkonil,
        FIGHT.nuTadaSdohni
      );
  });
}

/** each line is followed by a key press */
function lines(...ls: string[]) {
  return Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
}

/** hit budget of the attacker (agility+4) against the defender's agility+4; 18 per kick */
function extraHits(attacker: number, defender: number): number {
  let a = attacker;
  let d = defender;
  if (a <= 10) return a;
  while (d > 18) {
    if (a < 28) return 10;
    a -= 18;
    d -= 18;
  }
  return a;
}

const crowdShout = Effect.gen(function* () {
  const { st, mem } = yield* Game;
  const r = yield* rnd(18);
  if (r === 4) return [fmt(FIGHT.zriteliNePodkachayYa, mem.typeName(st.charType))];
  if (r === 17) return [fmt(FIGHT.zriteliNuIKogo, st.name)];
  if (r === 8) return [FIGHT.zriteliDermovoDeretesPridurki, FIGHT.aTyZatknisMudak];
  return [CROWD[r]];
});

const CROWD: Record<number, string> = {
  0: FIGHT.zriteliMochiEgoMochi,
  1: FIGHT.zriteliVrezhEmu,
  2: FIGHT.zriteliBlinDolgoTy,
  3: FIGHT.zriteliDaVyTolko,
  5: FIGHT.zriteliCheTutZa,
  6: FIGHT.zriteliYaZnayuVon,
  7: FIGHT.zriteliCheTakSlabo,
  9: FIGHT.zriteliDaAPomnish,
  10: FIGHT.zriteliEtoCheResling,
  11: FIGHT.zriteliDvinEmuV,
  12: FIGHT.zriteliIKudaMenty,
  13: FIGHT.zriteliPinay,
  14: FIGHT.zriteliVrezhGadu,
  15: FIGHT.zriteliGospodaDelayteVashi,
  16: FIGHT.zriteliNuCheTam,
};

/** `x > Random(n) + 1` as the original's Longint compare: no Random call when x < 0 */
function luckBeats(x: number, n: number) {
  return Effect.gen(function* () {
    if (x < 0) return false;
    return x > (yield* rnd(n)) + 1;
  });
}

function playerKicks(hits: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    let a = hits;
    for (;;) {
      const r = (yield* rnd(100)) + 1;
      if (a * 5 >= r && r <= 90) {
        const prev = st.eHp;
        let dmg = st.dmgMin + (yield* rnd(st.dmgMax - st.dmgMin)) + 1;
        if (yield* luckBeats(st.luck * 3, 100)) {
          dmg += st.dmgMax;
          const shout = yield* rnd(3);
          if (shout === 0) yield* println(FIGHT.tochnyyUdar);
          else if (shout === 1) yield* println(FIGHT.neHiloPrilozhil);
          else if (shout === 2) yield* println(FIGHT.dvoynoyUron);
        }
        dmg -= st.eArmor;
        if (dmg < 0) dmg = 0;
        st.eHp -= dmg;
        if (yield* luckBeats(st.luck * 3, st.eLuck * 3 + 200)) {
          if ((yield* rnd(2)) === 0) {
            if (!st.eJawBroken) {
              yield* println(FIGHT.tySlomalVraguChelyust);
              st.eJawBroken = 1;
            }
          } else if (!st.eLegBroken) {
            yield* println(FIGHT.tySlomalVraguNogu);
            st.eLegBroken = 1;
          }
        }
        yield* println(FIGHT.tyPnulVragaNa, prev - st.eHp, st.eHp);
      } else yield* println(FIGHT.tyPromazal);
      a -= 18;
      if (st.eHp <= 0) return;
      if (a > 0) yield* println(FIGHT.izZaBolshoyLovkosti);
      if (!(a > 0 && st.eHp >= 0)) return;
    }
  });
}

function enemyKicks(hits: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    let a = hits;
    for (;;) {
      const r = (yield* rnd(100)) + 1;
      if (a * 5 >= r && r <= 90) {
        const prev = st.hp;
        let dmg = st.eDmgMin + (yield* rnd(st.eDmgMax - st.eDmgMin)) + 1;
        if (yield* luckBeats(st.eLuck * 3, 100)) {
          dmg += st.eDmgMax;
          const shout = yield* rnd(3);
          if (shout === 0) yield* println(FIGHT.vragSdohniUrod);
          else if (shout === 1) yield* println(FIGHT.tebeNeHiloVrezali);
          else if (shout === 2) yield* println(FIGHT.vragPoluchiGnida);
        }
        dmg -= st.armor;
        if (dmg < 0) dmg = 0;
        st.hp -= dmg;
        if (yield* luckBeats(st.eLuck * 3, st.luck * 3 + 200)) {
          if ((yield* rnd(2)) === 0) {
            if (!st.jawBroken) {
              if (!st.mouthGuard) {
                yield* println(FIGHT.vragSlomalTebeChelyust);
                st.jawBroken = 1;
              } else if ((yield* rnd(4)) === 0) {
                yield* println(FIGHT.vragSlomalTebeChelyust2);
                st.jawBroken = 1;
              } else yield* println(FIGHT.zaschitaSpaslaTvoiKrivye);
            }
          } else if (!st.legBroken) {
            yield* println(FIGHT.vragSlomalTebeNogu);
            st.legBroken = 1;
          }
        }
        yield* println(FIGHT.onPnulTebyaNa, prev - st.hp, st.hp);
      } else yield* println(FIGHT.vragPromazal);
      a -= 18;
      if (a > 0) yield* println(FIGHT.izZaBolshoyLovkosti2);
      if (!(a > 0 && st.hp >= 0)) return;
    }
  });
}

/** running away takes back the stats of the last level-up ('1'..'4' = str/agi/vit/luck) */
function loseStat(c: string) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (c === '1') {
      st.str--;
      yield* print(FIGHT.sila1);
      st.dmgMax--;
      if (mod(st.str, 2) === 1) st.dmgMin--;
      st.hpMax--;
      if (st.hp > st.hpMax) st.hp = st.hpMax;
    } else if (c === '2') {
      st.agi--;
      yield* print(FIGHT.lovkost1);
    } else if (c === '3') {
      st.vit--;
      yield* print(FIGHT.zhivuchest1);
      st.hpMax -= 5;
      if (st.hp > st.hpMax) st.hp = st.hpMax;
    } else if (c === '4') {
      st.luck--;
      yield* print(FIGHT.udacha1);
    }
  });
}

/** `kos` — a joint: +2 strength for a while, heals up to 10 (fight: 3 turns, walking: 10) */
export function smokeJoint(turns: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (st.jawBroken === 1) return yield* println(FIGHT.tyNeShavatKolesa);
    if (st.stoned !== 0) return yield* println(FIGHT.tyNemozheshShavatEsche);
    if (st.joints <= 0) return yield* println(FIGHT.uTebyaNetKosyakov);
    st.joints--;
    st.stoned = turns;
    st.str += 2;
    st.dmgMin++;
    st.dmgMax += 2;
    if (st.hpMax - st.hp < 10) {
      yield* print(FIGHT.kolesaPribavlyayutZ, st.hpMax - st.hp);
      st.hp = st.hpMax;
      yield* println(FIGHT.zdorovyaOstalosKosyakov, st.hp, st.hpMax, st.joints);
    } else {
      st.hp += 10;
      yield* println(
        turns === 3 ? FIGHT.kolesaPribavlyayutZZdorovya : FIGHT.kolesaPribavlyayutZZdorovya2,
        10,
        st.hp,
        st.hpMax,
        st.joints
      );
    }
    yield* println(FIGHT.sila2);
  });
}

const callBackup = Effect.gen(function* () {
  const { st } = yield* Game;
  if (st.denAccess === 1 && st.district * 10 + 10 <= st.respect) {
    if (st.backup === 0) st.backup = 1;
    if (st.phone === 1) {
      st.backup = 3;
      yield* println(FIGHT.podoshliPatsanySchaNachnetsya2);
    }
  } else if (st.denAccess !== 0) yield* println(FIGHT.niKtoNeHochet);
  else yield* println(FIGHT.snachalaNadoSkoreshitsyaS);
  if (st.backup > 0) {
    if (st.backup < 3) yield* println(FIGHT.tebeNadoProderzhatsyaDo, 3 - st.backup);
    else if (st.backup !== 3 || st.phone === 0) yield* println(FIGHT.oniUzheZdes);
  }
});

const backupKicks = Effect.gen(function* () {
  const { st } = yield* Game;
  const prev = st.eHp;
  let dmg = st.district * 3 + (yield* rnd(st.district * 4));
  dmg -= div(st.eArmor, 3);
  if (dmg < 0) dmg = 0;
  st.eHp -= dmg;
  yield* println(FIGHT.vragaOtpinaliNaZ, prev - st.eHp, st.eHp);
  if ((yield* rnd(2)) === 0) {
    st.backup++;
    if (st.backup === 3) yield* println(FIGHT.podoshliPatsany);
  }
  if (st.backup === 7) {
    st.backup = 0;
    yield* println(FIGHT.tvoyuPodmoguOtpinali);
  }
  st.respect -= st.district * 5;
  if (st.respect <= 0) {
    st.backup = 0;
    yield* println(FIGHT.podmogeNadoeloStolkoParitsya);
  }
});

const shoot = Effect.gen(function* () {
  const { st } = yield* Game;
  if (!st.trail && !st.silencer) return yield* println(FIGHT.telzyaTutStrelyatMenty);
  if (st.bullets <= 0) return yield* println(FIGHT.cheZaBatvaBlin);
  st.bullets--;
  if (st.agi >= 0 && st.agi > (yield* rnd(50))) {
    const prev = st.eHp;
    st.eHp -= (yield* rnd(10)) + 20;
    yield* println(FIGHT.tyVystrelilIRanil, prev - st.eHp, st.eHp, st.bullets);
  } else yield* println(FIGHT.etoBylHrenovyyVystrel);
});

function enemyDied(kind: FightKind) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (kind === 4) {
      st.exp = st.expNext;
      yield* levelUp(true);
      yield* lines(
        FIGHT.tyZamochilSamogoRektora,
        FIGHT.vnovSilaTorzhestvuetNad,
        FIGHT.posleEtogoSrazuNachalas,
        FIGHT.iNeStydnoTebe
      );
      yield* println(FIGHT.aRezultat);
      yield* showStats;
      yield* readKey;
      return yield* victoryAnimation;
    }
    if (kind === 3) {
      st.exp = st.expNext;
      yield* levelUp(true);
      yield* lines(FIGHT.tyZamochilSamogoRektora2, FIGHT.etoBylProrektorSuntsa);
    } else yield* println(FIGHT.vragSdoh);
    const rector = kind === 3;
    if (!rector) {
      const exp = st.eStr + st.eAgi + st.eVit + st.eLuck;
      yield* println(FIGHT.zaOtpinVragaTy, exp);
      st.exp += exp;
    }
    if (st.exp < st.expNext) {
      if (!rector) {
        yield* println(FIGHT.tyZapinalSlishkomSlabogo);
        yield* println(FIGHT.seychasUTebyaKachkov, st.exp, st.expNext);
      }
    } else yield* levelUp(false);
    st.beer += st.eBeer;
    st.money += st.eMoney;
    st.junk += st.eJunk;
    yield* println(FIGHT.pivoPobeditelyu);
    st.hp += 5;
    if (st.hp > st.hpMax) st.hp = st.hpMax;
    st.respect += st.eType + 1 + div(st.eLevel, 3);
    if (st.denAccess === 0 && st.level - (st.district - 1) * 10 >= 3) {
      st.denAccess = 1;
      yield* println(FIGHT.ponovostUlutshilasNaStolko);
    }
    if ((yield* rnd(30)) === 0) {
      if (!(st.ringPg && st.megaRing && st.ringGp)) yield* println(FIGHT.obaNaKolechkoVot);
      yield* gainRing(FIGHT.megaKoltso);
    }
    yield* loot;
    if (kind === 6) {
      st.respect += st.district * 20;
      yield* println(FIGHT.tyOtpinalEtogoMudaka, st.district * 20);
      yield* println(FIGHT.tyPoluchaeshKachkovOpyta, st.district * 10);
      st.exp += st.district * 10;
      yield* levelUp(false);
    }
  });
}

/** `luck >= Random(n)` as the original's Longint compare: no Random call when luck < 0 */
function luckAtLeast(n: number) {
  return Effect.gen(function* () {
    const { st } = yield* Game;
    if (st.luck < 0) return false;
    return st.luck >= (yield* rnd(n));
  });
}

const loot = Effect.gen(function* () {
  const { st } = yield* Game;
  if ((yield* luckAtLeast(st.district * 25)) && st.eType === 2) {
    st.joints += yield* rnd(3);
    yield* println(FIGHT.aUNarkaByl);
  }
  if (!(yield* luckAtLeast(st.district * 40))) return;
  const weapon = (n: number) => {
    st.dmgMin += n;
    st.dmgMax += n;
  };
  if (st.eType === 1) {
    const r = yield* rnd(3);
    if (r === 0 && !st.cross) {
      st.luck += 2;
      yield* println(FIGHT.tyNashelKrestikUdacha);
      st.cross = 1;
    } else if (r === 1 && !st.ringGs) {
      st.luck++;
      yield* println(FIGHT.tyNashelKoltsoGospodi);
      st.ringGs = 1;
    } else if (r === 2 && !st.phone) {
      yield* println(FIGHT.tyNashelMobilu);
      st.phone = 1;
    }
  } else if (st.eType >= 3 && st.eType <= 6) {
    const r = yield* rnd(2);
    if (r === 0 && !st.knuckles) {
      st.knuckles = 1;
      yield* println(FIGHT.tyNadybalKastetUron);
      if (!st.knife && !st.club && !st.cleaver) weapon(2);
      else yield* println(FIGHT.noUTebyaEst);
    } else if (r === 1 && !st.club) {
      st.club = 1;
      yield* println(FIGHT.tyOtobralUVraga);
      if (!st.knife && !st.cleaver) weapon(st.knuckles ? 2 : 4);
      else yield* println(FIGHT.noUTebyaEst);
    }
  } else if (st.eType === 7) {
    const r = yield* rnd(2);
    if (r === 0 && !st.glasses) {
      st.glasses = 1;
      yield* println(FIGHT.tyNashelTemnyeOchki);
    } else if (r === 1 && !st.phone) {
      yield* println(FIGHT.tyNashelMobilu);
      st.phone = 1;
    }
  } else if (st.eType === 9) {
    const r = yield* rnd(2);
    if (r === 0 && !st.knife) {
      st.knife = 1;
      yield* println(FIGHT.tyNashelNozhikUron);
      // sic: the original's boolean arithmetic, stacking bonuses
      if ((st.club === 0 ? 1 : 0) === st.knuckles) weapon(4);
      if (st.club) weapon(2);
      if (!st.knuckles && !st.club && !st.cleaver) weapon(6);
      if (st.cleaver) yield* println(FIGHT.noUtebyaEstTesak);
    } else if (r === 1 && !st.cleaver) {
      st.cleaver = 1;
      yield* println(FIGHT.tyNashelTesakUron);
      if ((!st.club && !st.knife ? 1 : 0) === st.knuckles) weapon(7);
      if (st.club && !st.knife) weapon(5);
      if (st.knife) weapon(3);
      if (!st.knuckles && !st.club && !st.knife) weapon(9);
    }
  }
});
