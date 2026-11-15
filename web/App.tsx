/** The game in the browser: an 80×25 xterm running the whole program; a new game when it ends. */
import '@xterm/xterm/css/xterm.css';
import { Terminal as Xterm } from '@xterm/xterm';
import { Effect, Fiber } from 'effect';
import { useEffect, useRef, useState } from 'react';

import { gameLayer, program } from '../src/runtime';
import { Seed } from '../src/tp/brands';
import { browserDisk } from './browser-disk';
import { VGA_THEME, xtermTerminal } from './xterm-terminal';

export function App() {
  const [game, setGame] = useState(0);
  const [over, setOver] = useState(false);
  return (
    <main className="shell">
      <Screen key={game} onOver={() => setOver(true)} />
      {over && (
        <button
          className="again"
          onClick={() => {
            setOver(false);
            setGame((n) => n + 1);
          }}
        >
          Новая игра
        </button>
      )}
    </main>
  );
}

function Screen({ onOver }: { readonly onOver: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const term = new Xterm({
      cols: 80,
      rows: 25,
      theme: VGA_THEME,
      fontFamily: 'ui-monospace, Menlo, Consolas, "Courier New", monospace',
      fontSize: 18,
      cursorBlink: true,
    });
    term.open(ref.current!);
    term.focus();
    const layer = gameLayer({
      seed: Seed(Date.now() >>> 0),
      disk: browserDisk(),
      terminal: xtermTerminal(term),
    });
    const fiber = Effect.runFork(program.pipe(Effect.provide(layer)));
    const stop = fiber.addObserver(() => onOver());
    return () => {
      stop();
      Effect.runFork(Fiber.interrupt(fiber));
      term.dispose();
    };
  }, [onOver]);
  return <div className="screen" ref={ref} />;
}
