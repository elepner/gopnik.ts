/**
 * What the player sees of a fight. The fight logic (`fight.ts`) only emits what happened as
 * typed events; this module turns them into the original's lines, colours and key pauses. What
 * the state already knows (health left, bullets, names) is read from it, not carried by events:
 * an event is told right where the original printed, so the state is the one it printed.
 */
import { Effect } from 'effect';

import { readKey, writeLn } from '../crt/crt';
import { attr } from '../state/attributes';
import { type CharacterType, ENEMIES } from '../state/kinds';
import { typeName } from '../state/names';
import { battle, type StatKey } from '../state/state';
import { div } from '../tp/num';
import { showEnemy } from './enemy';
import { extraHits, FIGHT_JOINT, hitBudget, KICK } from './fight';
import { showStats } from './hero';
import { print, println, started } from './prelude';
import type { Text } from './text';
import { FIGHT } from './texts';
import type { View } from './view';

export type Side = 'hero' | 'enemy';

/** `enemy`: a line by the enemy's group; the others are fixed speeches */
export type Greeting = 'enemy' | 'caughtStealing' | 'fakeRector' | 'rector';

/** a kick that landed */
export interface Hit {
  readonly damage: number;
  /** a critical kick, with one of three shouts */
  readonly critical?: number;
  /** `guardHeld`: the mouth guard saved the hero's jaw; `jawThroughGuard`: it didn't */
  readonly broke?: 'jaw' | 'jawThroughGuard' | 'guardHeld' | 'leg';
}

export type FightEvent =
  /** what the enemy says first; a fight may also start without a word */
  | { readonly type: 'greeting'; readonly by: Greeting }
  /** the hit budgets of a fight: what each side has against the other's agility, of its own */
  | { readonly type: 'fightStarted' }
  | { readonly type: 'crowdGathered' }
  | { readonly type: 'crowdShout'; readonly line: number }
  /** a kick; no hit means a miss */
  | { readonly type: 'kick'; readonly by: Side; readonly hit?: Hit }
  /** agility gives another kick this turn */
  | { readonly type: 'anotherKick'; readonly by: Side }
  | { readonly type: 'cantRun'; readonly because: 'rector' | 'leg' }
  /** ran away and lost the stats of the last level; `denRumour`: the den hears of it */
  | { readonly type: 'fled'; readonly lost: readonly StatKey[]; readonly denRumour: boolean }
  /** ran away at level 0: nothing to lose */
  | { readonly type: 'fledUnranked' }
  /** the den lads are called: they come at this count (`BackupRules`) */
  | { readonly type: 'backupCalled'; readonly count: number }
  /** a kick brings the called lads one step closer */
  | { readonly type: 'backupApproached' }
  | { readonly type: 'backupArrived'; readonly by: 'kicks' | 'phone' | 'time' }
  | { readonly type: 'backupRefused'; readonly because: 'respect' | 'den' }
  | { readonly type: 'backupComing'; readonly turns: number }
  | { readonly type: 'backupAlreadyHere' }
  /** the lads kicked the enemy, for respect; `hurt`: they took a hit too */
  | { readonly type: 'backupKicked'; readonly damage: number; readonly hurt: boolean }
  | { readonly type: 'backupBeaten' }
  | { readonly type: 'backupFedUp' }
  | { readonly type: 'shotForbidden' }
  | { readonly type: 'outOfBullets' }
  | { readonly type: 'shotMissed' }
  | { readonly type: 'shotHit'; readonly damage: number }
  | { readonly type: 'bailedOut' }
  | { readonly type: 'jointRefused'; readonly because: 'jaw' | 'stoned' | 'none' }
  /** `s`: the hero's stats */
  | { readonly type: 'stats' }
  /** `sv`: a look at the enemy */
  | { readonly type: 'enemyInfo' }
  | {
      readonly type: 'smoked';
      /** healed to full by less than 10, or by 10 */
      readonly healed: number;
      readonly full: boolean;
      /** how long the hero stays stoned: a fight's turns or a walk's steps */
      readonly turns: number;
    };

/** the fight as the player sees it */
export const fightView: View<FightEvent> = {
  events: {
    greeting: true,
    fightStarted: true,
    crowdGathered: true,
    crowdShout: true,
    kick: true,
    anotherKick: true,
    cantRun: true,
    fled: true,
    fledUnranked: true,
    backupCalled: true,
    backupApproached: true,
    backupArrived: true,
    backupRefused: true,
    backupComing: true,
    backupAlreadyHere: true,
    backupKicked: true,
    backupBeaten: true,
    backupFedUp: true,
    shotForbidden: true,
    outOfBullets: true,
    shotMissed: true,
    shotHit: true,
    bailedOut: true,
    stats: true,
    enemyInfo: true,
    jointRefused: true,
    smoked: true,
  },
  show: (event) => showFight(event),
};

/** shows a fight's event */
function showFight(event: FightEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'greeting':
        return yield* greeting(event.by);
      case 'fightStarted': {
        // says when the opponent's agility takes kicks away
        const enemy = hitBudget(battle(st).enemy.stats.agility);
        const hero = hitBudget(attr(st.player, 'agility'));
        const enemyHits = extraHits(enemy, hero);
        if (losesKicks(enemyHits, enemy))
          yield* println(FIGHT.izZaTvoeyHoroshey(kicks(enemyHits), kicks(enemy)));
        const heroHits = extraHits(hero, enemy);
        if (losesKicks(heroHits, hero))
          yield* println(FIGHT.izZaHorosheyLovkosti(kicks(heroHits), kicks(hero)));
        return;
      }
      case 'crowdGathered':
        return yield* println(FIGHT.nachinayutSobiratsyaZriteli());
      case 'crowdShout':
        for (const line of crowdShout(event.line, st.player)) yield* println(line);
        return;
      case 'kick':
        return yield* kick(event.by, event.hit, event.by === 'hero' ? battle(st).enemy : st.player);
      case 'anotherKick':
        return yield* println(
          event.by === 'hero' ? FIGHT.izZaBolshoyLovkosti() : FIGHT.izZaBolshoyLovkosti2()
        );
      case 'cantRun':
        return yield* println(
          event.because === 'rector' ? FIGHT.rektorKudaStoyatBeysya() : FIGHT.tyNeMozheshUbezhat()
        );
      case 'fled':
        yield* print(FIGHT.vragTruslivyyZasranets());
        for (const stat of event.lost) yield* print(LOST_STAT[stat]);
        yield* writeLn;
        if (event.denRumour) yield* println(FIGHT.takogoKonyavogoNepustyatV());
        return;
      case 'fledUnranked':
        return yield* println(FIGHT.vragZasranets());
      case 'backupCalled':
      case 'backupApproached':
        return;
      case 'backupArrived':
        return yield* println(
          event.by === 'kicks'
            ? FIGHT.podoshliPatsanySchaNachnetsya()
            : event.by === 'phone'
              ? FIGHT.podoshliPatsanySchaNachnetsya2()
              : FIGHT.podoshliPatsany()
        );
      case 'backupRefused':
        return yield* println(
          event.because === 'respect' ? FIGHT.niKtoNeHochet() : FIGHT.snachalaNadoSkoreshitsyaS()
        );
      case 'backupComing':
        return yield* println(FIGHT.tebeNadoProderzhatsyaDo(event.turns));
      case 'backupAlreadyHere':
        return yield* println(FIGHT.oniUzheZdes());
      case 'backupKicked':
        return yield* println(
          FIGHT.vragaOtpinaliNaZ(event.damage, battle(st).enemy.health.current)
        );
      case 'backupBeaten':
        return yield* println(FIGHT.tvoyuPodmoguOtpinali());
      case 'backupFedUp':
        return yield* println(FIGHT.podmogeNadoeloStolkoParitsya());
      case 'shotForbidden':
        return yield* println(FIGHT.telzyaTutStrelyatMenty());
      case 'outOfBullets':
        return yield* println(FIGHT.cheZaBatvaBlin());
      case 'shotMissed':
        return yield* println(FIGHT.etoBylHrenovyyVystrel());
      case 'shotHit':
        return yield* println(
          FIGHT.tyVystrelilIRanil(
            event.damage,
            battle(st).enemy.health.current,
            st.player.body.pockets.pistol?.bullets ?? 0
          )
        );
      case 'bailedOut':
        return yield* println(FIGHT.tebePovezloZnakomyePatsany());
      case 'stats':
        return yield* showStats;
      case 'enemyInfo':
        return yield* showEnemy;
      case 'jointRefused':
        return yield* println(
          event.because === 'jaw'
            ? FIGHT.tyNeShavatKolesa()
            : event.because === 'stoned'
              ? FIGHT.tyNemozheshShavatEsche()
              : FIGHT.uTebyaNetKosyakov()
        );
      case 'smoked':
        if (event.full) {
          yield* print(FIGHT.kolesaPribavlyayutZ(event.healed));
          yield* println(
            FIGHT.zdorovyaOstalosKosyakov(
              st.player.health.current,
              attr(st.player, 'healthMax'),
              st.player.resources.joints
            )
          );
        } else {
          const healed =
            event.turns === FIGHT_JOINT
              ? FIGHT.kolesaPribavlyayutZZdorovya
              : FIGHT.kolesaPribavlyayutZZdorovya2;
          yield* println(
            healed(
              event.healed,
              st.player.health.current,
              attr(st.player, 'healthMax'),
              st.player.resources.joints
            )
          );
        }
        return yield* println(FIGHT.sila2());
    }
  });
}

function greeting(by: Greeting) {
  return Effect.gen(function* () {
    const st = yield* started;
    const hero = st.player;
    const enemy = ENEMIES[battle(st).enemy.type].group;
    const type = typeName(hero.type);
    if (by === 'enemy') {
      if (enemy === 'weakling') {
        yield* println(FIGHT.slyshVas());
        yield* println(FIGHT.aCheVasche());
      } else if (enemy === 'lad') {
        yield* println(FIGHT.patsanTyIzKakogo());
        yield* println(FIGHT.aTyPoPinkam());
      } else if (enemy === 'thug') yield* println(FIGHT.eyMudak());
      else if (enemy === 'cop') yield* println(FIGHT.blinEtoZheIzvestnyy(hero.name, type));
      else if (enemy === 'maniac') {
        yield* println(FIGHT.yaManyak());
        yield* println(FIGHT.radPoznakomitsya(type));
      }
    } else if (by === 'caughtStealing') yield* println(FIGHT.otdayKoshelekUrod());
    else if (by === 'fakeRector')
      yield* pausedLines(
        FIGHT.nuVotMyI(),
        FIGHT.cheTeNadaKozel(),
        FIGHT.urytTebyaUblyudok(),
        FIGHT.nuTyMenyaDostal()
      );
    else if (by === 'rector')
      yield* pausedLines(
        FIGHT.tutZahoditNastoyaschiyRektor(),
        FIGHT.mudakTyTupoyDebil(),
        FIGHT.yaDumayuTySkonil(),
        FIGHT.nuTadaSdohni()
      );
  });
}

/** each line is followed by a key press */
export function pausedLines(...ls: Text[]) {
  return Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
}

/** `victim`: the one kicked, after the kick */
function kick(
  by: Side,
  hit: Hit | undefined,
  victim: { readonly health: { readonly current: number } }
) {
  return Effect.gen(function* () {
    const hero = by === 'hero';
    if (!hit) return yield* println(hero ? FIGHT.tyPromazal() : FIGHT.vragPromazal());
    if (hit.critical !== undefined)
      yield* println((hero ? HERO_CRITICAL : ENEMY_CRITICAL)[hit.critical]!);
    if (hit.broke) yield* println(BROKE[by][hit.broke]!);
    yield* println(
      hero
        ? FIGHT.tyPnulVragaNa(hit.damage, victim.health.current)
        : FIGHT.onPnulTebyaNa(hit.damage, victim.health.current)
    );
  });
}

const HERO_CRITICAL = [FIGHT.tochnyyUdar(), FIGHT.neHiloPrilozhil(), FIGHT.dvoynoyUron()];
const ENEMY_CRITICAL = [
  FIGHT.vragSdohniUrod(),
  FIGHT.tebeNeHiloVrezali(),
  FIGHT.vragPoluchiGnida(),
];

const BROKE: Record<Side, Partial<Record<NonNullable<Hit['broke']>, Text>>> = {
  hero: { jaw: FIGHT.tySlomalVraguChelyust(), leg: FIGHT.tySlomalVraguNogu() },
  enemy: {
    jaw: FIGHT.vragSlomalTebeChelyust(),
    jawThroughGuard: FIGHT.vragSlomalTebeChelyust2(),
    guardHeld: FIGHT.zaschitaSpaslaTvoiKrivye(),
    leg: FIGHT.vragSlomalTebeNogu(),
  },
};

const LOST_STAT: Record<StatKey, Text> = {
  strength: FIGHT.sila1(),
  agility: FIGHT.lovkost1(),
  vitality: FIGHT.zhivuchest1(),
  luck: FIGHT.udacha1(),
};

/** what the crowd shouts, by the Random(18) the fight rolled */
function crowdShout(
  line: number,
  hero: { readonly name: string; readonly type: CharacterType }
): Text[] {
  if (line === 4) return [FIGHT.zriteliNePodkachayYa(typeName(hero.type))];
  if (line === 17) return [FIGHT.zriteliNuIKogo(hero.name)];
  if (line === 8) return [FIGHT.zriteliDermovoDeretesPridurki(), FIGHT.aTyZatknisMudak()];
  return [CROWD[line]!];
}

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

/** kicks per turn of a hit budget */
function kicks(budget: number): number {
  return div(budget - 1, KICK) + 1;
}

/** the opponent's agility took kicks away from a budget worth more than one */
function losesKicks(hits: number, full: number): boolean {
  return full > KICK && div(hits, KICK) < div(full, KICK);
}
