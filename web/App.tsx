/**
 * The game in the browser: an 80×25 xterm running the whole program, the stats beside it; a new
 * game when it ends.
 */
import '@xterm/xterm/css/xterm.css';
import { Terminal as Xterm } from '@xterm/xterm';
import { Effect, Fiber } from 'effect';
import { useEffect, useRef, useState } from 'react';

import { Engine } from '../src/game/prelude';
import { gameLayer, program } from '../src/runtime';
import type { GameState } from '../src/state/state';
import { snapshot, type Store } from '../src/state/store';
import { Seed } from '../src/tp/brands';
import { browserDisk } from './browser-disk';
import { StatsPanel } from './StatsPanel';
import { VGA_THEME, xtermTerminal } from './xterm-terminal';

export function App() {
  const [game, setGame] = useState(0);
  const [over, setOver] = useState(false);
  const [st, setSt] = useState<GameState>();
  return (
    <main className="shell">
      <div className="game">
        <Screen key={game} onOver={() => setOver(true)} onState={setSt} />
        <StatsPanel st={st} />
      </div>
      {over && (
        <button
          className="again"
          onClick={() => {
            setOver(false);
            setSt(undefined);
            setGame((n) => n + 1);
          }}
        >
          Новая игра
        </button>
      )}
    </main>
  );
}

function Screen(props: { readonly onOver: () => void; readonly onState: (st: GameState) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // the game runs once per mount: the callbacks may change, the game doesn't restart
  const callbacks = useRef(props);
  callbacks.current = props;
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
    fit(term);
    const onResize = () => fit(term);
    window.addEventListener('resize', onResize);
    // the state is shown as it is whenever the screen changes or waits for a key, once a frame
    let store: Store | undefined;
    let frame = 0;
    const changed = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (store) callbacks.current.onState(snapshot(store));
      });
    };
    const layer = gameLayer({
      seed: Seed(Date.now() >>> 0),
      disk: browserDisk(),
      terminal: xtermTerminal(term, changed),
    });
    const run = Effect.gen(function* () {
      store = (yield* Engine).state;
      return yield* program;
    });
    const fiber = Effect.runFork(run.pipe(Effect.provide(layer)));
    const stop = fiber.addObserver(() => callbacks.current.onOver());
    return () => {
      window.removeEventListener('resize', onResize);
      stop();
      cancelAnimationFrame(frame);
      Effect.runFork(Fiber.interrupt(fiber));
      term.dispose();
    };
  }, []);
  return <div className="screen" ref={ref} />;
}

/** the panel's width and the margins around the screen and the panel */
const PANEL = 520;
const MARGINS = 80;

/** the font as big as the window allows for 80×25 (a monospace cell is about 0.6 × 1.2 em) */
function fit(term: Xterm) {
  const byWidth = (window.innerWidth - PANEL - MARGINS) / (80 * 0.6);
  const byHeight = (window.innerHeight - MARGINS) / (25 * 1.2);
  term.options.fontSize = Math.max(12, Math.min(32, Math.floor(Math.min(byWidth, byHeight))));
}
