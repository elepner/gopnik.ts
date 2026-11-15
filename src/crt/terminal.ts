/** The game's `Terminal` on the emulated CRT: the 80×25 screen and BIOS keys, like the original. */
import { Effect } from 'effect';

import type { ITerminal } from '../game/terminal';
import { Crt, type ICrt, type IKeyboard, Keyboard, keyPressed, readKey, readLine } from './crt';

export function crtTerminal(crt: ICrt, keyboard: IKeyboard): ITerminal {
  const run = <A, E>(eff: Effect.Effect<A, E, ICrt | IKeyboard>) =>
    eff.pipe(Effect.provideService(Crt, crt), Effect.provideService(Keyboard, keyboard));
  return {
    write: (s) => Effect.sync(() => crt.screen.write(s)),
    textColor: (color) => Effect.sync(() => crt.screen.textColor(color)),
    clrScr: Effect.sync(() => crt.screen.clrScr()),
    readKey: run(readKey),
    readLine: run(readLine),
    keyPressed: run(keyPressed),
    delay: keyboard.delay,
  };
}
