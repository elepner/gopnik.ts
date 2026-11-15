/** The fight loop (0000:3D11). */
import { Effect } from 'effect';

import { readKey, readLine, writeLn } from '../crt/crt';
import { ENEMIES } from '../state/kinds';
import { typeName } from '../state/names';
import {
  type Combat,
  type Health,
  type Injuries,
  type Rings,
  type StartedGame,
  type StatKey,
  type Weapons,
} from '../state/state';
import { div, i16, mod, round, u8 } from '../tp/num';
import { CMD, parseCommand } from './commands';
import { showEnemy } from './enemy';
import { drinkBeer, gainRing, levelUp, showStats } from './hero';
import { halt, lowerCase, luckAtLeast, print, println, rnd, started } from './prelude';
import { gameOver, victoryAnimation } from './screens';
import type { Text } from './text';
import { FIGHT } from './texts';

/** why the fight started */
export type FightKind =
  /** met someone while walking */
  | 'street'
  /** caught stealing at the market */
  | 'caughtStealing'
  /** caught cheating at cards in the club */
  | 'caughtCheating'
  | 'fakeRector'
  | 'rector'
  /** cops during the den job */
  | 'cops'
  /** helping a lad of the den */
  | 'denHelp';

/** 0000:3D11 */
export function fight(kind: FightKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    yield* greeting(kind);
    const enemyBudget = hitBudget(st.enemy.stats.agility);
    const playerBudget = hitBudget(st.player.stats.agility);
    const enemyHits = extraHits(enemyBudget, playerBudget);
    if (losesKicks(enemyBudget, enemyHits))
      yield* println(FIGHT.izZaTvoeyHoroshey(kicks(enemyHits), kicks(enemyBudget)));
    const playerHits = extraHits(playerBudget, enemyBudget);
    if (losesKicks(playerBudget, playerHits))
      yield* println(FIGHT.izZaHorosheyLovkosti(kicks(playerHits), kicks(playerBudget)));

    let spectators = 0;
    let over = false;
    while (!over) {
      if (spectators < FULL_CROWD) {
        spectators++;
        if (spectators === FULL_CROWD) yield* println(FIGHT.nachinayutSobiratsyaZriteli());
      }
      if (!st.world.rector && spectators === FULL_CROWD && (yield* rnd(10)) === 0)
        for (const line of yield* crowdShout) yield* println(line);

      yield* print(FIGHT.bitva());
      st.session.lastAnswer = lowerCase(yield* readLine);
      const input = parseCommand('fight', st.session.lastAnswer);

      if (input === CMD.fight.kick) {
        yield* playerKicks(playerHits);
        if (alive(st.enemy)) yield* enemyKicks(enemyHits);
      }

      if (input === CMD.fight.run) {
        if (st.world.rector) yield* println(FIGHT.rektorKudaStoyatBeysya());
        else if (st.player.injuries.leg) yield* println(FIGHT.tyNeMozheshUbezhat());
        else {
          if (st.player.progression.level > 0) {
            yield* print(FIGHT.vragTruslivyyZasranets());
            const level = st.player.progression.level;
            const lost = st.player.progression.history[level] ?? [];
            st.player.progression.history[level] = [];
            for (const stat of lost) yield* loseStat(stat);
            yield* writeLn;
            if (st.player.type !== 'gopnik' && levelInDistrict(st) === DEN_LEVEL) {
              st.world.places.den = true; // sic: the original grants access while saying the opposite
              yield* println(FIGHT.takogoKonyavogoNepustyatV());
            }
            st.player.progression.level = i16(st.player.progression.level - 1);
            st.player.progression.expNext = i16(st.player.progression.expNext - 10);
            if (st.player.progression.exp >= st.player.progression.expNext)
              st.player.progression.exp = i16(st.player.progression.expNext - 1);
          } else yield* println(FIGHT.vragZasranets());
          over = true;
        }
      }

      if (input === CMD.fight.beer) yield* drinkBeer('one');
      if (input === CMD.fight.beerUntilHealthy) yield* drinkBeer('untilHealthy');
      if (input === CMD.fight.joint) yield* smokeJoint(3);
      if (input === CMD.fight.stats) yield* showStats;
      if (input === CMD.fight.inspectEnemy) yield* showEnemy;
      if (input === CMD.fight.exit) return yield* halt;
      // every kick brings the called lads closer
      if (backupCalled(st.combat) && input === CMD.fight.kick) {
        st.combat.backup = i16(st.combat.backup + 1);
        if (st.combat.backup === BACKUP_ARRIVED)
          yield* println(FIGHT.podoshliPatsanySchaNachnetsya());
      }
      if (input === CMD.fight.callBackup) yield* callBackup;
      if (alive(st.enemy) && backupHere(st.combat)) yield* backupKicks;
      if (input === CMD.fight.shoot && st.player.body.pockets.pistol) yield* shoot;

      if (!alive(st.player)) {
        if (st.world.rector) {
          yield* println(FIGHT.tySdohRektorTebya());
          yield* readKey;
          yield* gameOver(false);
        } else if (ladsBailOut(st)) {
          yield* println(FIGHT.tebePovezloZnakomyePatsany());
          st.player.respect = i16(st.player.respect - 10);
          st.player.resources.money = i16(
            st.player.resources.money - round((st.player.health.max / 5) * 3)
          );
          st.player.health.current = st.player.health.max;
          if (fractured(st.player.injuries)) {
            st.player.resources.money = i16(st.player.resources.money - 7);
            st.player.injuries.jaw = false;
            st.player.injuries.leg = false;
          }
          if (st.player.resources.money < 0) {
            st.player.respect = i16(st.player.respect + st.player.resources.money);
            st.player.resources.money = 0;
          }
          over = true;
        } else {
          yield* println(FIGHT.tySdoh());
          yield* readKey;
          yield* gameOver(false);
        }
      }

      if (!alive(st.enemy)) {
        yield* enemyDied(kind);
        over = true;
      }
    }
    st.combat.backup = 0;
  });
}

function greeting(kind: FightKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    const type = typeName(st.player.type);
    if (kind === 'street' || kind === 'denHelp') {
      const group = ENEMIES[st.enemy.type].group;
      if (group === 'weakling') {
        yield* println(FIGHT.slyshVas());
        yield* println(FIGHT.aCheVasche());
      } else if (group === 'lad') {
        yield* println(FIGHT.patsanTyIzKakogo());
        yield* println(FIGHT.aTyPoPinkam());
      } else if (group === 'thug') yield* println(FIGHT.eyMudak());
      else if (group === 'cop') yield* println(FIGHT.blinEtoZheIzvestnyy(st.player.name, type));
      else if (group === 'maniac') {
        yield* println(FIGHT.yaManyak());
        yield* println(FIGHT.radPoznakomitsya(type));
      }
    } else if (kind === 'caughtStealing') yield* println(FIGHT.otdayKoshelekUrod());
    else if (kind === 'fakeRector')
      yield* lines(
        FIGHT.nuVotMyI(),
        FIGHT.cheTeNadaKozel(),
        FIGHT.urytTebyaUblyudok(),
        FIGHT.nuTyMenyaDostal()
      );
    else if (kind === 'rector')
      yield* lines(
        FIGHT.tutZahoditNastoyaschiyRektor(),
        FIGHT.mudakTyTupoyDebil(),
        FIGHT.yaDumayuTySkonil(),
        FIGHT.nuTadaSdohni()
      );
  });
}

/** each line is followed by a key press */
function lines(...ls: Text[]) {
  return Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
}

/** what one kick costs of a hit budget */
const KICK = 18;

/** the hit budget of a fighter: agility + 4, a kick per 18 */
function hitBudget(agility: number): number {
  return agility + 4;
}

/** kicks per turn of a hit budget */
function kicks(budget: number): number {
  return div(budget - 1, KICK) + 1;
}

/** the attacker's budget against the defender's: a nimble defender takes kicks away */
function extraHits(attacker: number, defender: number): number {
  let a = attacker;
  let d = defender;
  if (a <= 10) return a;
  while (d > KICK) {
    if (a < KICK + 10) return 10;
    a -= KICK;
    d -= KICK;
  }
  return a;
}

/** the opponent's agility took kicks away from a budget worth more than one */
function losesKicks(budget: number, hits: number): boolean {
  return budget > KICK && div(hits, KICK) < div(budget, KICK);
}

const crowdShout = Effect.gen(function* () {
  const st = yield* started;
  const r = yield* rnd(18);
  if (r === 4) return [FIGHT.zriteliNePodkachayYa(typeName(st.player.type))];
  if (r === 17) return [FIGHT.zriteliNuIKogo(st.player.name)];
  if (r === 8) return [FIGHT.zriteliDermovoDeretesPridurki(), FIGHT.aTyZatknisMudak()];
  return [CROWD[r]];
});

const CROWD: Record<number, Text> = {
  0: FIGHT.zriteliMochiEgoMochi(),
  1: FIGHT.zriteliVrezhEmu(),
  2: FIGHT.zriteliBlinDolgoTy(),
  3: FIGHT.zriteliDaVyTolko(),
  5: FIGHT.zriteliCheTutZa(),
  6: FIGHT.zriteliYaZnayuVon(),
  7: FIGHT.zriteliCheTakSlabo(),
  9: FIGHT.zriteliDaAPomnish(),
  10: FIGHT.zriteliEtoCheResling(),
  11: FIGHT.zriteliDvinEmuV(),
  12: FIGHT.zriteliIKudaMenty(),
  13: FIGHT.zriteliPinay(),
  14: FIGHT.zriteliVrezhGadu(),
  15: FIGHT.zriteliGospodaDelayteVashi(),
  16: FIGHT.zriteliNuCheTam(),
};

/** `x > Random(n) + 1` (Longint compare; Random is always called first) */
function luckBeats(x: number, n: number) {
  return Effect.gen(function* () {
    const r = yield* rnd(n);
    return x > r + 1;
  });
}

/** a kick lands with 5% per budget point, never more than 90% (`roll` is 1..100) */
function lands(budget: number, roll: number): boolean {
  return budget * 5 >= roll && roll <= 90;
}

/** a critical kick adds the maximum damage: 3% per luck point */
function critical(luck: number) {
  return luckBeats(luck * 3, 100);
}

/** a kick breaks a jaw or a leg: the attacker's luck against the defender's */
function breaksBone(attacker: number, defender: number) {
  return luckBeats(attacker * 3, defender * 3 + 200);
}

function playerKicks(hits: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    let a = hits;
    for (;;) {
      const r = (yield* rnd(100)) + 1;
      if (lands(a, r)) {
        const prev = st.enemy.health.current;
        let dmg =
          st.player.damage.min + (yield* rnd(st.player.damage.max - st.player.damage.min)) + 1;
        if (yield* critical(st.player.stats.luck)) {
          dmg += st.player.damage.max;
          const shout = yield* rnd(3);
          if (shout === 0) yield* println(FIGHT.tochnyyUdar());
          else if (shout === 1) yield* println(FIGHT.neHiloPrilozhil());
          else if (shout === 2) yield* println(FIGHT.dvoynoyUron());
        }
        dmg -= st.enemy.armor;
        if (dmg < 0) dmg = 0;
        st.enemy.health.current = i16(st.enemy.health.current - dmg);
        if (yield* breaksBone(st.player.stats.luck, st.enemy.stats.luck)) {
          if ((yield* rnd(2)) === 0) {
            if (!st.enemy.injuries.jaw) {
              yield* println(FIGHT.tySlomalVraguChelyust());
              st.enemy.injuries.jaw = true;
            }
          } else if (!st.enemy.injuries.leg) {
            yield* println(FIGHT.tySlomalVraguNogu());
            st.enemy.injuries.leg = true;
          }
        }
        yield* println(
          FIGHT.tyPnulVragaNa(prev - st.enemy.health.current, st.enemy.health.current)
        );
      } else yield* println(FIGHT.tyPromazal());
      a -= KICK;
      if (!alive(st.enemy) || a <= 0) return;
      yield* println(FIGHT.izZaBolshoyLovkosti());
    }
  });
}

function enemyKicks(hits: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    let a = hits;
    for (;;) {
      const r = (yield* rnd(100)) + 1;
      if (lands(a, r)) {
        const prev = st.player.health.current;
        let dmg = st.enemy.damage.min + (yield* rnd(st.enemy.damage.max - st.enemy.damage.min)) + 1;
        if (yield* critical(st.enemy.stats.luck)) {
          dmg += st.enemy.damage.max;
          const shout = yield* rnd(3);
          if (shout === 0) yield* println(FIGHT.vragSdohniUrod());
          else if (shout === 1) yield* println(FIGHT.tebeNeHiloVrezali());
          else if (shout === 2) yield* println(FIGHT.vragPoluchiGnida());
        }
        dmg -= st.player.armor;
        if (dmg < 0) dmg = 0;
        st.player.health.current = i16(st.player.health.current - dmg);
        if (yield* breaksBone(st.enemy.stats.luck, st.player.stats.luck)) {
          if ((yield* rnd(2)) === 0) {
            if (!st.player.injuries.jaw) {
              if (!st.player.body.mouth.guard) {
                yield* println(FIGHT.vragSlomalTebeChelyust());
                st.player.injuries.jaw = true;
              } else if ((yield* rnd(4)) === 0) {
                yield* println(FIGHT.vragSlomalTebeChelyust2());
                st.player.injuries.jaw = true;
              } else yield* println(FIGHT.zaschitaSpaslaTvoiKrivye());
            }
          } else if (!st.player.injuries.leg) {
            yield* println(FIGHT.vragSlomalTebeNogu());
            st.player.injuries.leg = true;
          }
        }
        yield* println(
          FIGHT.onPnulTebyaNa(prev - st.player.health.current, st.player.health.current)
        );
      } else yield* println(FIGHT.vragPromazal());
      a -= KICK;
      if (a <= 0) return;
      yield* println(FIGHT.izZaBolshoyLovkosti2());
      // sic: a hero at exactly 0 takes the next kick too
      if (st.player.health.current < 0) return;
    }
  });
}

/** running away takes back the stats of the last level-up */
function loseStat(stat: StatKey) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (stat === 'strength') {
      st.player.stats.strength = i16(st.player.stats.strength - 1);
      yield* print(FIGHT.sila1());
      st.player.damage.max = i16(st.player.damage.max - 1);
      if (mod(st.player.stats.strength, 2) === 1)
        st.player.damage.min = i16(st.player.damage.min - 1);
      st.player.health.max = i16(st.player.health.max - 1);
      if (st.player.health.current > st.player.health.max)
        st.player.health.current = st.player.health.max;
    } else if (stat === 'agility') {
      st.player.stats.agility = i16(st.player.stats.agility - 1);
      yield* print(FIGHT.lovkost1());
    } else if (stat === 'vitality') {
      st.player.stats.vitality = i16(st.player.stats.vitality - 1);
      yield* print(FIGHT.zhivuchest1());
      st.player.health.max = i16(st.player.health.max - 5);
      if (st.player.health.current > st.player.health.max)
        st.player.health.current = st.player.health.max;
    } else if (stat === 'luck') {
      st.player.stats.luck = i16(st.player.stats.luck - 1);
      yield* print(FIGHT.udacha1());
    }
  });
}

/** `kos` — a joint: +2 strength for a while, heals up to 10 (fight: 3 turns, walking: 10) */
export function smokeJoint(turns: number) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (st.player.injuries.jaw) return yield* println(FIGHT.tyNeShavatKolesa());
    if (st.player.stoned !== 0) return yield* println(FIGHT.tyNemozheshShavatEsche());
    if (st.player.resources.joints <= 0) return yield* println(FIGHT.uTebyaNetKosyakov());
    st.player.resources.joints = i16(st.player.resources.joints - 1);
    st.player.stoned = u8(turns);
    st.player.stats.strength = i16(st.player.stats.strength + 2);
    st.player.damage.min = i16(st.player.damage.min + 1);
    st.player.damage.max = i16(st.player.damage.max + 2);
    if (st.player.health.max - st.player.health.current < 10) {
      yield* print(FIGHT.kolesaPribavlyayutZ(st.player.health.max - st.player.health.current));
      st.player.health.current = st.player.health.max;
      yield* println(
        FIGHT.zdorovyaOstalosKosyakov(
          st.player.health.current,
          st.player.health.max,
          st.player.resources.joints
        )
      );
    } else {
      st.player.health.current = i16(st.player.health.current + 10);
      const healed =
        turns === 3 ? FIGHT.kolesaPribavlyayutZZdorovya : FIGHT.kolesaPribavlyayutZZdorovya2;
      yield* println(
        healed(10, st.player.health.current, st.player.health.max, st.player.resources.joints)
      );
    }
    yield* println(FIGHT.sila2());
  });
}

const callBackup = Effect.gen(function* () {
  const st = yield* started;
  if (st.world.places.den && respected(st)) {
    if (!backupCalled(st.combat)) st.combat.backup = 1;
    if (st.player.body.pockets.phone) {
      st.combat.backup = BACKUP_ARRIVED;
      yield* println(FIGHT.podoshliPatsanySchaNachnetsya2());
    }
  } else if (st.world.places.den) yield* println(FIGHT.niKtoNeHochet());
  else yield* println(FIGHT.snachalaNadoSkoreshitsyaS());
  if (backupCalled(st.combat)) {
    if (!backupHere(st.combat))
      yield* println(FIGHT.tebeNadoProderzhatsyaDo(BACKUP_ARRIVED - st.combat.backup));
    else if (st.combat.backup !== BACKUP_ARRIVED || !st.player.body.pockets.phone)
      yield* println(FIGHT.oniUzheZdes());
  }
});

const backupKicks = Effect.gen(function* () {
  const st = yield* started;
  const prev = st.enemy.health.current;
  let dmg = st.world.district * 3 + (yield* rnd(st.world.district * 4));
  dmg -= div(st.enemy.armor, 3);
  if (dmg < 0) dmg = 0;
  st.enemy.health.current = i16(st.enemy.health.current - dmg);
  yield* println(FIGHT.vragaOtpinaliNaZ(prev - st.enemy.health.current, st.enemy.health.current));
  if ((yield* rnd(2)) === 0) {
    st.combat.backup = i16(st.combat.backup + 1);
    if (st.combat.backup === BACKUP_ARRIVED) yield* println(FIGHT.podoshliPatsany());
  }
  if (st.combat.backup === BACKUP_BEATEN) {
    st.combat.backup = 0;
    yield* println(FIGHT.tvoyuPodmoguOtpinali());
  }
  st.player.respect = i16(st.player.respect - st.world.district * 5);
  if (st.player.respect <= 0) {
    st.combat.backup = 0;
    yield* println(FIGHT.podmogeNadoeloStolkoParitsya());
  }
});

/** `f`: only reached with a pistol in the pocket */
const shoot = Effect.gen(function* () {
  const st = yield* started;
  const pistol = st.player.body.pockets.pistol!;
  if (!st.world.trail && !pistol.silencer) return yield* println(FIGHT.telzyaTutStrelyatMenty());
  if (pistol.bullets <= 0) return yield* println(FIGHT.cheZaBatvaBlin());
  pistol.bullets = i16(pistol.bullets - 1);
  const aim = yield* rnd(50);
  if (st.player.stats.agility > aim) {
    const prev = st.enemy.health.current;
    st.enemy.health.current = i16(st.enemy.health.current - ((yield* rnd(10)) + 20));
    yield* println(
      FIGHT.tyVystrelilIRanil(
        prev - st.enemy.health.current,
        st.enemy.health.current,
        pistol.bullets
      )
    );
  } else yield* println(FIGHT.etoBylHrenovyyVystrel());
});

function enemyDied(kind: FightKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    if (kind === 'rector') {
      st.player.progression.exp = st.player.progression.expNext;
      yield* levelUp(true);
      yield* lines(
        FIGHT.tyZamochilSamogoRektora(),
        FIGHT.vnovSilaTorzhestvuetNad(),
        FIGHT.posleEtogoSrazuNachalas(),
        FIGHT.iNeStydnoTebe()
      );
      yield* println(FIGHT.aRezultat());
      yield* showStats;
      yield* readKey;
      return yield* victoryAnimation;
    }
    if (kind === 'fakeRector') {
      st.player.progression.exp = st.player.progression.expNext;
      yield* levelUp(true);
      yield* lines(FIGHT.tyZamochilSamogoRektora2(), FIGHT.etoBylProrektorSuntsa());
    } else yield* println(FIGHT.vragSdoh());
    const rector = kind === 'fakeRector';
    if (!rector) {
      const exp =
        st.enemy.stats.strength +
        st.enemy.stats.agility +
        st.enemy.stats.vitality +
        st.enemy.stats.luck;
      yield* println(FIGHT.zaOtpinVragaTy(exp));
      st.player.progression.exp = i16(st.player.progression.exp + exp);
    }
    if (st.player.progression.exp < st.player.progression.expNext) {
      if (!rector) {
        yield* println(FIGHT.tyZapinalSlishkomSlabogo());
        yield* println(
          FIGHT.seychasUTebyaKachkov(st.player.progression.exp, st.player.progression.expNext)
        );
      }
    } else yield* levelUp(false);
    st.player.resources.beer = i16(st.player.resources.beer + st.enemy.loot.beer);
    st.player.resources.money = i16(st.player.resources.money + st.enemy.loot.money);
    st.player.resources.junk = i16(st.player.resources.junk + st.enemy.loot.junk);
    yield* println(FIGHT.pivoPobeditelyu());
    st.player.health.current = i16(st.player.health.current + 5);
    if (st.player.health.current > st.player.health.max)
      st.player.health.current = st.player.health.max;
    st.player.respect = i16(
      st.player.respect + (ENEMIES[st.enemy.type].tier + 1 + div(st.enemy.level, 3))
    );
    if (!st.world.places.den && levelInDistrict(st) >= DEN_LEVEL) {
      st.world.places.den = true;
      yield* println(FIGHT.ponovostUlutshilasNaStolko());
    }
    if ((yield* rnd(30)) === 0) {
      if (!ringChainComplete(st.player.body.hands.rings)) yield* println(FIGHT.obaNaKolechkoVot());
      yield* gainRing(FIGHT.megaKoltso());
    }
    yield* loot;
    if (kind === 'denHelp') {
      st.player.respect = i16(st.player.respect + st.world.district * 20);
      yield* println(FIGHT.tyOtpinalEtogoMudaka(st.world.district * 20));
      yield* println(FIGHT.tyPoluchaeshKachkovOpyta(st.world.district * 10));
      st.player.progression.exp = i16(st.player.progression.exp + st.world.district * 10);
      yield* levelUp(false);
    }
  });
}

const loot = Effect.gen(function* () {
  const st = yield* started;
  if ((yield* luckAtLeast(st.world.district * 25)) && st.enemy.type === 'nark') {
    st.player.resources.joints = i16(st.player.resources.joints + (yield* rnd(3)));
    yield* println(FIGHT.aUNarkaByl());
  }
  if (!(yield* luckAtLeast(st.world.district * 40))) return;
  const weapon = (n: number) => {
    st.player.damage.min = i16(st.player.damage.min + n);
    st.player.damage.max = i16(st.player.damage.max + n);
  };
  const w = st.player.body.hands.weapons;
  const group = ENEMIES[st.enemy.type].group;
  if (st.enemy.type === 'nefor') {
    const r = yield* rnd(3);
    if (r === 0 && !st.player.body.neck.cross) {
      st.player.stats.luck = i16(st.player.stats.luck + 2);
      yield* println(FIGHT.tyNashelKrestikUdacha());
      st.player.body.neck.cross = true;
    } else if (r === 1 && !st.player.body.hands.rings.spasi) {
      st.player.stats.luck = i16(st.player.stats.luck + 1);
      yield* println(FIGHT.tyNashelKoltsoGospodi());
      st.player.body.hands.rings.spasi = true;
    } else if (r === 2 && !st.player.body.pockets.phone) {
      yield* println(FIGHT.tyNashelMobilu());
      st.player.body.pockets.phone = true;
    }
  } else if (group === 'lad') {
    const r = yield* rnd(2);
    if (r === 0 && !w.knuckles) {
      w.knuckles = true;
      yield* println(FIGHT.tyNadybalKastetUron());
      if (noneOf(w, 'knife', 'club', 'cleaver')) weapon(2);
      else yield* println(FIGHT.noUTebyaEst());
    } else if (r === 1 && !w.club) {
      w.club = true;
      yield* println(FIGHT.tyOtobralUVraga());
      if (noneOf(w, 'knife', 'cleaver')) weapon(w.knuckles ? 2 : 4);
      else yield* println(FIGHT.noUTebyaEst());
    }
  } else if (group === 'thug') {
    const r = yield* rnd(2);
    if (r === 0 && !st.player.body.eyes.glasses) {
      st.player.body.eyes.glasses = true;
      yield* println(FIGHT.tyNashelTemnyeOchki());
    } else if (r === 1 && !st.player.body.pockets.phone) {
      yield* println(FIGHT.tyNashelMobilu());
      st.player.body.pockets.phone = true;
    }
  } else if (group === 'maniac') {
    const r = yield* rnd(2);
    if (r === 0 && !w.knife) {
      w.knife = true;
      yield* println(FIGHT.tyNashelNozhikUron());
      // sic: the original's boolean arithmetic, stacking bonuses
      if (!w.club === w.knuckles) weapon(4);
      if (w.club) weapon(2);
      if (noneOf(w, 'knuckles', 'club', 'cleaver')) weapon(6);
      if (w.cleaver) yield* println(FIGHT.noUtebyaEstTesak());
    } else if (r === 1 && !w.cleaver) {
      w.cleaver = true;
      yield* println(FIGHT.tyNashelTesakUron());
      if ((!w.club && !w.knife) === w.knuckles) weapon(7);
      if (w.club && !w.knife) weapon(5);
      if (w.knife) weapon(3);
      if (noneOf(w, 'knuckles', 'club', 'knife')) weapon(9);
    }
  }
});

// ------------------------------------------------------------------ conditions

/** spectators gather one per turn; a full crowd starts shouting */
const FULL_CROWD = 5;

/** the third level of a district opens the den */
const DEN_LEVEL = 3;

/** called lads join the fight at this count (the phone brings them at once) */
const BACKUP_ARRIVED = 3;

/** and get beaten up at this one */
const BACKUP_BEATEN = 7;

function alive(fighter: { readonly health: Health }): boolean {
  return fighter.health.current > 0;
}

function fractured(injuries: Injuries): boolean {
  return injuries.jaw || injuries.leg;
}

/** the hero's level counted from the start of the current district (10 levels each) */
function levelInDistrict(st: StartedGame): number {
  return st.player.progression.level - (st.world.district - 1) * 10;
}

/** respected enough for the den lads to come and help */
function respected(st: StartedGame): boolean {
  return st.world.district * 10 + 10 <= st.player.respect;
}

/** a beaten hero is picked up by the den lads, for 10 respect */
function ladsBailOut(st: StartedGame): boolean {
  return st.world.places.den && st.player.respect >= 10;
}

function backupCalled(combat: Combat): boolean {
  return combat.backup >= 1;
}

function backupHere(combat: Combat): boolean {
  return combat.backup >= BACKUP_ARRIVED;
}

/** the Пг → Мега → Гп chain is complete: another Мега ring only adds stats */
function ringChainComplete(rings: Rings): boolean {
  return rings.pomogi && rings.mega && rings.pomiluy;
}

/** none of these weapons in hand (a new weapon only adds the difference to the best one) */
function noneOf(weapons: Weapons, ...names: (keyof Weapons)[]): boolean {
  return names.every((name) => !weapons[name]);
}
