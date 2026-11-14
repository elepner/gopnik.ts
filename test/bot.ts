/**
 * A bot that plays the emulated original to the end (beating the rector), then replays the
 * same keys on the port and compares everything.
 *   bun test/bot.ts [--seed N] [--tries 50] [--save 5]
 */
import { join } from 'node:path';

import { Dos, IMG, LOAD_SEG, VIDEO } from '../oracle/dos';
import { snapshot } from '../src/state/layout';
import { CP866 } from '../src/tp/cp866';
import { compare, screenText } from './harness';

export interface BotRun {
  readonly keys: string[];
  /** keys with the screen line each decision reacted to, one key per line */
  readonly log: string[];
  readonly won: boolean;
  readonly reason: string;
}

/** plays one game on the original; returns the keys it pressed */
export function playToWin(seed: number, save: string, maxInputs = 20000): BotRun {
  const dir = join(import.meta.dirname, '..', 'oracle/.work', `bot-${process.pid}-${seed}`);
  Bun.spawnSync(['rm', '-rf', dir]);
  Bun.spawnSync(['mkdir', '-p', dir]);
  for (const f of [
    'SAVE_R0.SAV',
    'SAVE_R2.SAV',
    'SAVE_R3.SAV',
    'SAVE_R4.SAV',
    'SAVE_R5.SAV',
    'PLACES.SAV',
  ])
    Bun.spawnSync(['cp', join(ORIGINAL, f), dir]);
  const dos = new Dos({ exe: join(ORIGINAL, 'g.exe'), workdir: dir, seed });
  const keys: string[] = [];
  const log: string[] = [];
  const press = (...ks: string[]) => {
    const line =
      text(dos)
        .split('\n')
        .filter((l) => l.trim())
        .pop() ?? '';
    log.push(`# ${line}`);
    for (const k of ks) {
      if (dos.exited) return;
      keys.push(k);
      log.push(k);
      dos.send(k);
    }
  };
  dos.run();
  press('space', save);
  let inputs = 0;
  while (!dos.exited && inputs++ < maxInputs) {
    const screen = text(dos);
    if (screen.includes('Ты победил.')) {
      press('space');
      return { keys, log, won: true, reason: 'won' };
    }
    if (screen.includes('Ты сдох.') && screen.includes('Нажми какую-нибудь кнопку')) {
      press('space');
      const st = snapshot(dos.cpu.mem, (LOAD_SEG + IMG.dataSeg) * 16);
      return {
        keys,
        log,
        won: false,
        reason: `died: district ${st.district} level ${st.level} rector ${st.rector}`,
      };
    }
    const last =
      screen
        .split('\n')
        .filter((l) => l.trim())
        .pop() ?? '';
    // questions answered with a whole line (Read + ReadLn) rather than a key
    if (last.endsWith('4-Чё за батва?') || last.endsWith('3-Вор')) {
      press('1', 'enter'); // Отморозок: the strongest start
      continue;
    }
    if (last.includes('А зовут тебя:') || last.includes('А теперь будут:')) {
      press(...'bot', 'enter');
      continue;
    }
    if (last.endsWith('Хочешь её зацепить?')) {
      press('y', 'enter');
      continue;
    }
    if (last.endsWith('Хочешь наехать?')) {
      const me = snapshot(dos.cpu.mem, (LOAD_SEG + IMG.dataSeg) * 16);
      const level = Number(last.match(/ (\d+) уровня/)?.[1] ?? 0);
      const fit = Number(me.hp) > Number(me.hpMax) * 0.7;
      press(level <= Number(me.level) - 2 && fit ? 'y' : 'n', 'enter');
      continue;
    }
    if (
      last.endsWith('Ты хочешь сохраниться?') ||
      last.endsWith('Хочешь сохранить свои достижения?')
    ) {
      press('n', 'enter');
      continue;
    }
    if (!last.endsWith('\\')) {
      press('space'); // a ReadKey pause
      continue;
    }
    const st = snapshot(dos.cpu.mem, (LOAD_SEG + IMG.dataSeg) * 16);
    const hp = Number(st.hp);
    const max = Number(st.hpMax);
    const lowHp = hp < max * 0.6;
    if (last.endsWith('Битва\\')) {
      if (lowHp && Number(st.beer) > 0 && !st.jawBroken) press(...'mh', 'enter');
      else if (lowHp && Number(st.joints) > 0 && !st.stoned && !st.jawBroken)
        press(...'kos', 'enter');
      else if (
        st.denAccess &&
        Number(st.respect) >= Number(st.district) * 10 + 10 &&
        Number(st.backup) === 0
      )
        press('v', 'enter');
      else if (hp < max * 0.45 && !st.rector && !st.legBroken) press(...'run', 'enter');
      else press('k', 'enter');
      continue;
    }
    // walking around: heal (beer, vet, market), then look for fights
    const money = Number(st.money);
    if (last.endsWith('Базар\\')) {
      if (Number(st.beer) < 10 && money >= 5) press('2', 'enter');
      else press('w', 'enter');
    } else if (last.endsWith('Ветеренар\\')) {
      if (hp < max && money >= 3) press('h', 'enter');
      else if ((st.jawBroken || st.legBroken) && money >= 7) press('r', 'enter');
      else press('w', 'enter');
    } else if (last !== '\\') press('w', 'enter'); // leave any other place
    else if (lowHp && Number(st.beer) > 0 && !st.jawBroken) press(...'mh', 'enter');
    else if ((lowHp || st.jawBroken || st.legBroken) && st.knowsHospital && money >= 3)
      press(...'rep', 'enter');
    else if (Number(st.beer) < 4 && st.knowsMarket && money >= 10 && !st.marketHeat)
      press(...'mar', 'enter');
    else press('w', 'enter');
  }
  const st = snapshot(dos.cpu.mem, (LOAD_SEG + IMG.dataSeg) * 16);
  const where = `district ${st.district} level ${st.level} exp ${st.exp}/${st.expNext} hp ${st.hp}/${st.hpMax} money ${st.money}`;
  return {
    keys,
    log,
    won: false,
    reason: (dos.exited ? 'exited: ' : 'input limit: ') + where + '\n' + text(dos),
  };
}

const ORIGINAL = join(import.meta.dirname, '..', 'original');
const LOGS = join(import.meta.dirname, '..', 'logs');

function text(dos: Dos): string {
  const m = dos.cpu.mem;
  let s = '';
  for (let r = 0; r < 25; r++) {
    for (let c = 0; c < 80; c++) s += CP866[m[VIDEO + (r * 80 + c) * 2]];
    s += '\n';
  }
  return s.replace(/ +\n/g, '\n');
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const opt = (name: string, def: string) => {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : def;
  };
  const from = Number(opt('--seed', '1'));
  const tries = Number(opt('--tries', '50'));
  const save = opt('--save', '5');
  let wins = 0;
  let failures = 0;
  for (let seed = from; seed < from + tries; seed++) {
    const run = playToWin(seed, save);
    const file = join(LOGS, `bot-s${save}-${seed}.keys`);
    await Bun.write(
      file,
      [`# seed ${seed} save ${save}: ${run.reason.split('\n')[0]}`, ...run.log].join('\n') + '\n'
    );
    const { divergence, original } = await compare(seed, run.keys, ORIGINAL);
    if (run.won) wins++;
    const verdict = divergence
      ? `DIVERGED (${divergence.what} at step ${divergence.step})`
      : 'identical';
    if (divergence) failures++;
    console.log(
      `seed ${seed}: ${run.reason.split('\n')[0]} -> ${file}, ${run.keys.length} keys, ${original.rand.length} randoms, port ${verdict}`
    );
    if (divergence?.what === 'screen') console.log(divergence.original, '\n---\n', divergence.port);
  }
  console.log(`${wins} wins of ${tries}; ${failures} divergences`);
  void screenText;
}
