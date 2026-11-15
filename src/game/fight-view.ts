/**
 * What the player sees of a fight. The fight logic (`fight.ts`) only reports what happened as
 * typed events; this module turns them into the original's lines, colours and key pauses. What
 * the state already knows (health left, bullets, names) is read from it, not carried by events:
 * an event is told right where the original printed, so the state is the one it printed.
 */
import { Effect } from 'effect';

import { readKey, writeLn } from '../crt/crt';
import { type CharacterType, ENEMIES } from '../state/kinds';
import { typeName } from '../state/names';
import { type Health, type StatKey } from '../state/state';
import type { FightKind } from './fight';
import { type ChainRing, ringLines, showStats } from './hero';
import { print, println, started } from './prelude';
import type { Text } from './text';
import { FIGHT } from './texts';

export type Side = 'hero' | 'enemy';

/** a kick that landed */
export interface Hit {
  readonly damage: number;
  /** a critical kick, with one of three shouts */
  readonly critical?: number;
  /** `guardHeld`: the mouth guard saved the hero's jaw; `jawThroughGuard`: it didn't */
  readonly broke?: 'jaw' | 'jawThroughGuard' | 'guardHeld' | 'leg';
}

export type LootItem =
  | 'cross'
  | 'spasiRing'
  | 'phone'
  | 'knuckles'
  | 'club'
  | 'glasses'
  | 'knife'
  | 'cleaver';

export type FightEvent =
  | { readonly type: 'greeting'; readonly kind: FightKind }
  /** the opponent's agility takes kicks away */
  | {
      readonly type: 'slowedDown';
      readonly side: Side;
      readonly kicks: number;
      readonly of: number;
    }
  | { readonly type: 'crowdGathered' }
  | { readonly type: 'crowdShout'; readonly line: number }
  | { readonly type: 'prompt' }
  /** a kick; no hit means a miss */
  | { readonly type: 'kick'; readonly by: Side; readonly hit?: Hit }
  /** agility gives another kick this turn */
  | { readonly type: 'anotherKick'; readonly by: Side }
  | { readonly type: 'cantRun'; readonly because: 'rector' | 'leg' }
  /** ran away and lost the stats of the last level; `denRumour`: the den hears of it */
  | { readonly type: 'fled'; readonly lost: readonly StatKey[]; readonly denRumour: boolean }
  /** ran away at level 0: nothing to lose */
  | { readonly type: 'fledUnranked' }
  | { readonly type: 'backupArrived'; readonly by: 'kicks' | 'phone' | 'time' }
  | { readonly type: 'backupRefused'; readonly because: 'respect' | 'den' }
  | { readonly type: 'backupComing'; readonly turns: number }
  | { readonly type: 'backupAlreadyHere' }
  | { readonly type: 'backupKicked'; readonly damage: number }
  | { readonly type: 'backupBeaten' }
  | { readonly type: 'backupFedUp' }
  | { readonly type: 'shotForbidden' }
  | { readonly type: 'outOfBullets' }
  | { readonly type: 'shotMissed' }
  | { readonly type: 'shotHit'; readonly damage: number }
  | { readonly type: 'heroDied'; readonly byRector: boolean }
  | { readonly type: 'bailedOut' }
  | { readonly type: 'rectorKilled' }
  | { readonly type: 'fakeRectorKilled' }
  | { readonly type: 'enemyDied' }
  | { readonly type: 'exp'; readonly exp: number }
  | { readonly type: 'tooWeak' }
  | { readonly type: 'victoryBeer' }
  | { readonly type: 'denOpened' }
  /** a ring of the chain drops from the enemy */
  | { readonly type: 'ringDropped'; readonly ring: ChainRing }
  | { readonly type: 'denHelped'; readonly respect: number; readonly exp: number }
  | { readonly type: 'narkJoints' }
  | { readonly type: 'found'; readonly item: LootItem }
  | { readonly type: 'betterWeaponInHand' }
  | { readonly type: 'cleaverInHand' }
  | { readonly type: 'jointRefused'; readonly because: 'jaw' | 'stoned' | 'none' }
  | {
      readonly type: 'smoked';
      /** healed to full by less than 10, or by 10 */
      readonly healed: number;
      readonly full: boolean;
      readonly inFight: boolean;
    };

/** shows the events in order */
export function tell(...events: readonly FightEvent[]) {
  return Effect.forEach(events, show, { discard: true });
}

function show(event: FightEvent) {
  return Effect.gen(function* () {
    const st = yield* started;
    switch (event.type) {
      case 'greeting':
        return yield* greeting(event.kind);
      case 'slowedDown':
        return yield* println(
          event.side === 'enemy'
            ? FIGHT.izZaTvoeyHoroshey(event.kicks, event.of)
            : FIGHT.izZaHorosheyLovkosti(event.kicks, event.of)
        );
      case 'crowdGathered':
        return yield* println(FIGHT.nachinayutSobiratsyaZriteli());
      case 'crowdShout':
        for (const line of crowdShout(event.line, st.player)) yield* println(line);
        return;
      case 'prompt':
        return yield* print(FIGHT.bitva());
      case 'kick':
        return yield* kick(event.by, event.hit, event.by === 'hero' ? st.enemy : st.player);
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
        return yield* println(FIGHT.vragaOtpinaliNaZ(event.damage, st.enemy.health.current));
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
            st.enemy.health.current,
            st.player.body.pockets.pistol?.bullets ?? 0
          )
        );
      case 'heroDied':
        yield* println(event.byRector ? FIGHT.tySdohRektorTebya() : FIGHT.tySdoh());
        return yield* readKey;
      case 'bailedOut':
        return yield* println(FIGHT.tebePovezloZnakomyePatsany());
      case 'rectorKilled':
        yield* pausedLines(
          FIGHT.tyZamochilSamogoRektora(),
          FIGHT.vnovSilaTorzhestvuetNad(),
          FIGHT.posleEtogoSrazuNachalas(),
          FIGHT.iNeStydnoTebe()
        );
        yield* println(FIGHT.aRezultat());
        yield* showStats;
        return yield* readKey;
      case 'fakeRectorKilled':
        return yield* pausedLines(FIGHT.tyZamochilSamogoRektora2(), FIGHT.etoBylProrektorSuntsa());
      case 'enemyDied':
        return yield* println(FIGHT.vragSdoh());
      case 'exp':
        return yield* println(FIGHT.zaOtpinVragaTy(event.exp));
      case 'tooWeak':
        yield* println(FIGHT.tyZapinalSlishkomSlabogo());
        return yield* println(
          FIGHT.seychasUTebyaKachkov(st.player.progression.exp, st.player.progression.expNext)
        );
      case 'victoryBeer':
        return yield* println(FIGHT.pivoPobeditelyu());
      case 'denOpened':
        return yield* println(FIGHT.ponovostUlutshilasNaStolko());
      case 'ringDropped':
        yield* println(FIGHT.obaNaKolechkoVot());
        for (const line of ringLines(event.ring, FIGHT.megaKoltso())) yield* println(line);
        return;
      case 'denHelped':
        yield* println(FIGHT.tyOtpinalEtogoMudaka(event.respect));
        return yield* println(FIGHT.tyPoluchaeshKachkovOpyta(event.exp));
      case 'narkJoints':
        return yield* println(FIGHT.aUNarkaByl());
      case 'found':
        return yield* println(FOUND[event.item]);
      case 'betterWeaponInHand':
        return yield* println(FIGHT.noUTebyaEst());
      case 'cleaverInHand':
        return yield* println(FIGHT.noUtebyaEstTesak());
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
              st.player.health.max,
              st.player.resources.joints
            )
          );
        } else {
          const healed = event.inFight
            ? FIGHT.kolesaPribavlyayutZZdorovya
            : FIGHT.kolesaPribavlyayutZZdorovya2;
          yield* println(
            healed(
              event.healed,
              st.player.health.current,
              st.player.health.max,
              st.player.resources.joints
            )
          );
        }
        return yield* println(FIGHT.sila2());
    }
  });
}

function greeting(kind: FightKind) {
  return Effect.gen(function* () {
    const st = yield* started;
    const hero = st.player;
    const enemy = ENEMIES[st.enemy.type].group;
    const type = typeName(hero.type);
    if (kind === 'street' || kind === 'denHelp') {
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
    } else if (kind === 'caughtStealing') yield* println(FIGHT.otdayKoshelekUrod());
    else if (kind === 'fakeRector')
      yield* pausedLines(
        FIGHT.nuVotMyI(),
        FIGHT.cheTeNadaKozel(),
        FIGHT.urytTebyaUblyudok(),
        FIGHT.nuTyMenyaDostal()
      );
    else if (kind === 'rector')
      yield* pausedLines(
        FIGHT.tutZahoditNastoyaschiyRektor(),
        FIGHT.mudakTyTupoyDebil(),
        FIGHT.yaDumayuTySkonil(),
        FIGHT.nuTadaSdohni()
      );
  });
}

/** each line is followed by a key press */
function pausedLines(...ls: Text[]) {
  return Effect.forEach(ls, (l) => Effect.andThen(println(l), readKey), { discard: true });
}

/** `victim`: the one kicked, after the kick */
function kick(by: Side, hit: Hit | undefined, victim: { readonly health: Health }) {
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

const FOUND: Record<LootItem, Text> = {
  cross: FIGHT.tyNashelKrestikUdacha(),
  spasiRing: FIGHT.tyNashelKoltsoGospodi(),
  phone: FIGHT.tyNashelMobilu(),
  knuckles: FIGHT.tyNadybalKastetUron(),
  club: FIGHT.tyOtobralUVraga(),
  glasses: FIGHT.tyNashelTemnyeOchki(),
  knife: FIGHT.tyNashelNozhikUron(),
  cleaver: FIGHT.tyNashelTesakUron(),
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
