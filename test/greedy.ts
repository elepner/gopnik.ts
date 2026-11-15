/**
 * A universal greedy bot: looks one step ahead, estimates its own and the enemy's power with
 * a simple model of the fight rules, fights only when the odds are good, and spends money on
 * whatever buys the most power per rouble. Plays the emulated original; the key log is then
 * replayed on the port and compared.
 *   bun test/greedy.ts [--seed N] [--tries 10] [--save 1] [--class 0..3] [--limit 40000]
 */
import { join } from 'node:path';

import { Dos, IMG, LOAD_SEG, VIDEO } from '../oracle/dos';
import { snapshot } from '../src/state/legacy';
import { CP866 } from '../src/tp/cp866';
import { compare } from './harness';

export interface GreedyRun {
  readonly keys: string[];
  readonly log: string[];
  readonly won: boolean;
  readonly reason: string;
}

export function playGreedy(seed: number, save: string, cls: string, limit: number): GreedyRun {
  const dir = join(ROOT, 'oracle/.work', `greedy-${process.pid}-${seed}`);
  Bun.spawnSync(['rm', '-rf', dir]);
  Bun.spawnSync(['mkdir', '-p', dir]);
  for (const f of SAVES) Bun.spawnSync(['cp', join(ROOT, 'original', f), dir]);
  const dos = new Dos({ exe: join(ROOT, 'original/g.exe'), workdir: dir, seed });
  const keys: string[] = [];
  const log: string[] = [];
  const state = () => snapshot(dos.cpu.mem, (LOAD_SEG + IMG.dataSeg) * 16) as unknown as State;
  const press = (why: string, ...ks: string[]) => {
    log.push(`# ${lastLine(dos)}  => ${why}`);
    for (const k of ks) {
      if (dos.exited) return;
      keys.push(k);
      log.push(k);
      dos.send(k);
    }
  };
  const line = (why: string, s: string) => press(why, ...s, 'enter');
  const done = (won: boolean, reason: string): GreedyRun => {
    const st = state();
    const where = `district ${st.district} level ${st.level} hp ${st.hp}/${st.hpMax} money ${st.money}`;
    return { keys, log, won, reason: `${reason}: ${where}` };
  };

  dos.run();
  press('title', 'space', save);
  for (let inputs = 0; inputs < limit && !dos.exited; inputs++) {
    const screen = screenText(dos);
    const last = lastLine(dos);
    if (screen.includes('Ты победил.')) {
      press('victory', 'space');
      return done(true, 'won');
    }
    if (screen.includes('Ты сдох.') && screen.includes('Нажми какую-нибудь кнопку')) {
      press('death', 'space');
      return done(false, 'died');
    }
    const st = state();
    // --- questions answered with a whole line
    if (last.endsWith('4-Чё за батва?') || last.endsWith('3-Вор')) {
      line('class', cls);
      continue;
    }
    if (last.includes('А зовут тебя:') || last.includes('А теперь будут:')) {
      line('name', 'greedy');
      continue;
    }
    if (last.endsWith('Хочешь её зацепить?')) {
      line('girlfriend heals for free later', 'y');
      continue;
    }
    if (last.endsWith('Хочешь наехать?')) {
      const odds = fightOdds(st);
      line(
        `odds ${odds.toFixed(2)} (need ${engageThreshold(st).toFixed(2)})`,
        odds >= engageThreshold(st) ? 'y' : 'n'
      );
      continue;
    }
    if (
      last.endsWith('Ты хочешь сохраниться?') ||
      last.endsWith('Хочешь сохранить свои достижения?')
    ) {
      line('no saves', 'n');
      continue;
    }
    if (!last.endsWith('\\')) {
      press('pause', 'space');
      continue;
    }
    if (last.endsWith('Битва\\')) {
      const [why, cmd] = fightMove(st);
      line(why, cmd);
      continue;
    }
    if (last !== '\\') {
      const [why, cmd] = placeMove(st, last);
      line(why, cmd);
      continue;
    }
    const plan = streetMove(st);
    for (const [i, cmd] of plan.cmds.entries()) {
      if (dos.exited) break;
      line(i ? `${plan.why} (cont.)` : plan.why, cmd);
    }
  }
  return done(false, dos.exited ? 'exited' : 'input limit');
}

// ------------------------------------------------------------------ the model

/** the subset of state fields the bot reads (numbers as in the original memory) */
interface State {
  [k: string]: number;
}

interface Fighter {
  readonly hp: number;
  readonly agi: number;
  readonly luck: number;
  readonly dmgMin: number;
  readonly dmgMax: number;
  readonly armor: number;
}

function hero(st: State): Fighter {
  return {
    hp: st.hp,
    agi: st.agi,
    luck: st.luck,
    dmgMin: st.dmgMin,
    dmgMax: st.dmgMax,
    armor: st.armor,
  };
}

function enemy(st: State): Fighter {
  return {
    hp: st.eHp,
    agi: st.eAgi,
    luck: st.eLuck,
    dmgMin: st.eDmgMin,
    dmgMax: st.eDmgMax,
    armor: st.eArmor,
  };
}

/** expected damage of one `k` round, following fight.ts: kicks every 18 points of reach */
function roundDamage(a: Fighter, d: Fighter): number {
  let reach = extraHits(a.agi + 4, d.agi + 4);
  const avg = a.dmgMin + Math.max(0, a.dmgMax - a.dmgMin - 1) / 2 + 1;
  const crit = Math.min(1, Math.max(0, (a.luck * 3 - 1) / 100));
  const perHit = Math.max(0, avg + crit * a.dmgMax - d.armor);
  let total = 0;
  do {
    total += (Math.min(reach * 5, 90) / 100) * perHit;
    reach -= 18;
  } while (reach > 0);
  return total;
}

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

/** how many times faster we kill than get killed (beer counts as extra health) */
function fightOdds(st: State): number {
  const me = hero(st);
  const foe = enemy(st);
  const heal = st.jawBroken ? 0 : Math.max(0, st.beer) * 5;
  const toKill = foe.hp / Math.max(0.01, roundDamage(me, foe));
  const toDie = (me.hp + heal) / Math.max(0.01, roundDamage(foe, me));
  return toDie / toKill / (TYPE_RISK[st.eType] ?? 1);
}

/** danger of an enemy type (index of the type table) */
const TYPE_RISK: Record<number, number> = {
  0: 0.8, // Дохляк
  1: 0.9, // Нефор
  2: 0.9, // Нарк
  3: 1.0, // Подтсан
  4: 1.1, // Отморозок
  5: 1.0, // Гопник
  6: 1.0, // Вор
  7: 1.2, // Беспредельщик
  8: 1.3, // Мент
  9: 1.4, // Маньячок
  10: 1.5, // Ректор
};

/** required odds by the hero's type: Отморозок is bold, Вор is careful */
function engageThreshold(st: State): number {
  return { 3: 2.0, 4: 1.5, 5: 1.8, 6: 2.5 }[st.charType] ?? 2;
}

// ------------------------------------------------------------------ decisions

function fightMove(st: State): [string, string] {
  const foe = enemy(st);
  const hit = roundDamage(foe, hero(st));
  const canShoot = st.pistol && st.bullets > 0 && (st.trail || st.silencer);
  if (canShoot) return ['free damage: shoot', 'f'];
  if (st.denAccess && st.respect >= st.district * 10 + 10 && st.backup === 0)
    return ['free damage: call backup', 'v'];
  const danger = st.hp < hit * 2.5 || st.hp < st.hpMax * 0.4;
  if (danger && st.beer > 0 && !st.jawBroken && st.hp < st.hpMax)
    return ['drink: enemy does not kick back', 'mh'];
  if (danger && st.joints > 0 && !st.stoned && !st.jawBroken)
    return ['joint: +10 hp, +2 str', 'kos'];
  if (fightOdds(st) < 1 && !st.rector && !st.legBroken)
    return [`losing (odds ${fightOdds(st).toFixed(2)}): run`, 'run'];
  return [`kick (odds ${fightOdds(st).toFixed(2)})`, 'k'];
}

interface Plan {
  readonly why: string;
  readonly cmds: string[];
}

function streetMove(st: State): Plan {
  const hurt = st.hp < st.hpMax * 0.7;
  if (hurt && st.beer > 0 && !st.jawBroken) return { why: 'heal with beer', cmds: ['mh'] };
  if (st.hasGirl && st.money >= 12 && st.hp < st.hpMax * 0.5)
    return { why: 'girlfriend heals fully', cmds: ['girl'] };
  if (st.knowsDealers && st.junk > 0 && st.money < 30)
    return { why: `sell junk (${st.junk})`, cmds: ['bmar', 'x', 'w'] };
  if (st.knowsHospital && (st.jawBroken || st.legBroken) && st.money >= 7)
    return { why: 'fix bones', cmds: ['rep', 'r', 'w'] };
  if (st.legBroken && st.denAccess && st.loans > 0 && st.respect > 0 && st.money < 7) {
    const n = Math.min(st.loans, Math.ceil((7 - st.money) / 2));
    return {
      why: 'borrow for the vet: cannot run with a broken leg',
      cmds: ['pr', ...Array<string>(n).fill('r'), 'w'],
    };
  }
  if (st.knowsHospital && hurt && st.money >= 3)
    return { why: 'vet', cmds: ['rep', 'h', 'h', 'w'] };
  if (st.knowsMarket && !st.marketHeat && st.beer < 5 && st.money >= 5) {
    const n = Math.min(5 - st.beer, Math.floor(st.money / 5));
    return { why: 'beer stock', cmds: ['mar', ...Array<string>(n).fill('2'), 'w'] };
  }
  if (
    st.denAccess &&
    (!st.knowsDealers || !st.knowsGym) &&
    (st.level - (st.district - 1) * 10) * 2 + st.respect >= 40
  )
    return { why: 'ask the den about places', cmds: ['pr', 'a', 'w'] };
  const buy = bestPurchase(st);
  if (buy) return { why: `buy ${buy.name}: +${buy.gain.toFixed(3)}/rub`, cmds: buy.cmds };
  return { why: 'walk', cmds: ['w'] };
}

/** leave any place we did not plan to stay in */
function placeMove(_st: State, last: string): [string, string] {
  return [`leave ${last}`, 'w'];
}

interface Purchase {
  readonly name: string;
  readonly price: number;
  readonly cmds: string[];
  readonly gain: number;
}

/** our power against a typical enemy of the district */
function power(f: Fighter, st: State): number {
  const typical: Fighter = {
    hp: 10 + st.district * 25,
    agi: 2 + st.district * 3,
    luck: 2 + st.district * 2,
    dmgMin: st.district * 2,
    dmgMax: st.district * 4,
    armor: (st.district - 1) * (st.district - 1) * 2,
  };
  return (roundDamage(f, typical) * f.hp) / Math.max(0.01, roundDamage(typical, f));
}

function bestPurchase(st: State): Purchase | undefined {
  const me = { ...hero(st), hp: st.hpMax };
  const base = power(me, st);
  const reserve = 10; // keep money for beer and the vet
  const options: { name: string; price: number; cmds: string[]; after: Fighter; ok: boolean }[] = [
    {
      name: 'agility (club)',
      price: 15,
      cmds: ['kl', '1', 'w'],
      after: { ...me, agi: me.agi + 1 },
      ok: !!st.knowsClub && !st.clubHeat,
    },
    {
      name: 'luck (club)',
      price: 22,
      cmds: ['kl', '2', 'w'],
      after: { ...me, luck: me.luck + 1 },
      ok: !!st.knowsClub && !st.clubHeat && st.district > 1,
    },
    {
      name: 'strength (gym)',
      price: 20,
      cmds: ['trn', '1', 'w'],
      after: {
        ...me,
        hp: me.hp + 1,
        dmgMax: me.dmgMax + 1,
        dmgMin: me.dmgMin + ((st.str + 1) % 2 === 0 ? 1 : 0),
      },
      ok: !!st.knowsGym,
    },
    {
      name: 'stamina (gym)',
      price: 20,
      cmds: ['trn', '2', 'w'],
      after: { ...me, hp: me.hp + 5 },
      ok: !!st.knowsGym,
    },
    {
      name: 'press (gym)',
      price: 20,
      cmds: ['trn', '5', 'w'],
      after: { ...me, armor: me.armor + 1 },
      ok: !!st.knowsGym && st.district > 2 && st.press < (st.district - 2) * 10,
    },
    {
      name: 'abibas',
      price: 15,
      cmds: ['mar', '4', 'w'],
      after: { ...me, armor: me.armor + 1 },
      ok: !!st.knowsMarket && !st.marketHeat && !st.abibas && !st.adidas,
    },
    {
      name: 'boots',
      price: 15,
      cmds: ['mar', '5', 'w'],
      after: { ...me, dmgMin: me.dmgMin + 1, dmgMax: me.dmgMax + 1 },
      ok: !!st.knowsMarket && !st.marketHeat && !st.boots && !st.boots2,
    },
    {
      name: 'leather',
      price: 25,
      cmds: ['mar', '6', 'w'],
      after: { ...me, armor: me.armor + 2 },
      ok: !!st.knowsMarket && !st.marketHeat && st.district > 1 && !st.leather && !st.leather2,
    },
    {
      name: 'adidas',
      price: 30,
      cmds: ['mar', '7', 'w'],
      after: { ...me, armor: me.armor + (st.abibas ? 1 : 2) },
      ok: !!st.knowsMarket && !st.marketHeat && !st.adidas,
    },
    {
      name: 'boots2',
      price: 30,
      cmds: ['mar', '8', 'w'],
      after: {
        ...me,
        dmgMin: me.dmgMin + (st.boots ? 1 : 2),
        dmgMax: me.dmgMax + (st.boots ? 1 : 2),
      },
      ok: !!st.knowsMarket && !st.marketHeat && st.district > 2 && !st.boots2,
    },
    {
      name: 'leather2',
      price: 50,
      cmds: ['mar', '9', 'w'],
      after: { ...me, armor: me.armor + (st.leather ? 2 : 4) },
      ok: !!st.knowsMarket && !st.marketHeat && st.district > 3 && !st.leather2,
    },
    {
      name: 'knuckles',
      price: 25,
      cmds: ['bmar', '5', 'w'],
      after: { ...me, dmgMin: me.dmgMin + 2, dmgMax: me.dmgMax + 2 },
      ok: !!st.knowsDealers && !st.knuckles && !st.club && !st.knife && !st.cleaver,
    },
  ];
  let best: Purchase | undefined;
  for (const o of options) {
    if (!o.ok || st.money - reserve < o.price) continue;
    const gain = (power(o.after, st) - base) / o.price;
    if (gain > 0 && (!best || gain > best.gain))
      best = { name: o.name, price: o.price, cmds: o.cmds, gain };
  }
  return best;
}

// ------------------------------------------------------------------ plumbing

const ROOT = join(import.meta.dirname, '..');
const SAVES = [
  'SAVE_R0.SAV',
  'SAVE_R2.SAV',
  'SAVE_R3.SAV',
  'SAVE_R4.SAV',
  'SAVE_R5.SAV',
  'PLACES.SAV',
];

function screenText(dos: Dos): string {
  const m = dos.cpu.mem;
  let s = '';
  for (let r = 0; r < 25; r++) {
    let row = '';
    for (let c = 0; c < 80; c++) row += CP866[m[VIDEO + (r * 80 + c) * 2]];
    s += row.trimEnd() + '\n';
  }
  return s;
}

function lastLine(dos: Dos): string {
  return (
    screenText(dos)
      .split('\n')
      .filter((l) => l.trim())
      .pop() ?? ''
  );
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const opt = (name: string, def: string) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : def;
  };
  const from = Number(opt('--seed', '1'));
  const tries = Number(opt('--tries', '10'));
  const save = opt('--save', '1');
  const cls = opt('--class', '1');
  const limit = Number(opt('--limit', '40000'));
  let wins = 0;
  let divergences = 0;
  for (let seed = from; seed < from + tries; seed++) {
    const run = playGreedy(seed, save, cls, limit);
    const file = join(ROOT, 'logs', `greedy-s${save}-c${cls}-${seed}.keys`);
    await Bun.write(
      file,
      [`# seed ${seed} save ${save}: ${run.reason}`, ...run.log].join('\n') + '\n'
    );
    const { divergence, original } = await compare(seed, run.keys, join(ROOT, 'original'));
    if (run.won) wins++;
    if (divergence) divergences++;
    console.log(
      `seed ${seed}: ${run.reason}; ${run.keys.length} keys, ${original.rand.length} randoms, port ${
        divergence ? `DIVERGED (${divergence.what} at step ${divergence.step})` : 'identical'
      } -> ${file}`
    );
  }
  console.log(`${wins} wins of ${tries}; ${divergences} divergences`);
}
