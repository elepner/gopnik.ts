/**
 * The game in the browser: an 80×25 xterm running the whole program, the stats beside it (above
 * it on a phone, with buttons below instead of a keyboard). The game's saves live in
 * localStorage; the ones found at the start are offered in a dialog.
 */
import '@xterm/xterm/css/xterm.css';
import { Terminal as Xterm } from '@xterm/xterm';
import { Effect, Fiber } from 'effect';
import { useEffect, useRef, useState } from 'react';

import type { GameEvent } from '../src/game/events';
import { Engine } from '../src/game/prelude';
import { gameLayer, program } from '../src/runtime';
import type { GameState } from '../src/state/state';
import { snapshot, type Store } from '../src/state/store';
import { Seed } from '../src/tp/brands';
import { Actions, type Input } from './Actions';
import { browserSaves } from './browser-saves';
import { ChoiceDialog } from './ChoiceDialog';
import { districtName } from './labels';
import { StatsPanel } from './StatsPanel';
import { VGA_THEME, xtermTerminal } from './xterm-terminal';

/** narrow screens and touch screens get the phone layout: buttons instead of a keyboard */
const PHONE = '(max-width: 900px), (pointer: coarse)';

export function App() {
  const [phone] = useState(() => matchMedia(PHONE).matches);
  const [game, setGame] = useState(0);
  const [st, setSt] = useState<GameState>();
  const [input, setInput] = useState<Input>();
  const send = useRef<(keys: string) => void>(() => {});
  const newGame = () => {
    setSt(undefined);
    setInput(undefined);
    setGame((n) => n + 1);
  };
  // the saves the start found: which one to load is asked in a dialog
  const found =
    input?.waiting === 'key' && input.event?.type === 'startSavesFound' ? input.event : undefined;
  return (
    <main className="shell">
      <div className="game">
        <Screen
          key={game}
          phone={phone}
          onState={setSt}
          onInput={setInput}
          onSend={(s) => (send.current = s)}
        />
        <StatsPanel st={st} />
      </div>
      {phone && <Actions input={input} st={st} send={(keys) => send.current(keys)} />}
      {found && (
        <ChoiceDialog
          key={game}
          title="Найдены сохранения"
          choices={[
            ...found.districts.map((d) => ({
              label: d === '0' ? 'Где сохранился' : `Район ${d}`,
              hint: d === '0' ? 'у Рушеля Блаво' : districtName(Number(d)),
              pick: () => send.current(d),
            })),
            { label: 'Новая игра', pick: () => send.current('n') },
          ]}
        />
      )}
      <button className="again" onClick={newGame}>
        Новая игра
      </button>
    </main>
  );
}

function Screen(props: {
  readonly phone: boolean;
  readonly onState: (st: GameState) => void;
  readonly onInput: (input: Input | undefined) => void;
  readonly onSend: (send: (keys: string) => void) => void;
}) {
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
    // a phone types with the buttons: the terminal raises no keyboard
    if (callbacks.current.phone) term.textarea?.setAttribute('inputmode', 'none');
    else term.focus();
    fit(term);
    const onResize = () => fit(term);
    window.addEventListener('resize', onResize);

    // the state is shown as it is whenever the screen changes or waits for input, once a frame
    let store: Store | undefined;
    let frame = 0;
    const changed = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (store) callbacks.current.onState(snapshot(store));
      });
    };
    let last: GameEvent | undefined;
    const { terminal, send } = xtermTerminal(term, {
      changed,
      waiting: (waiting) => callbacks.current.onInput({ waiting, event: last }),
    });
    callbacks.current.onSend(send);

    const layer = gameLayer({
      seed: Seed(Date.now() >>> 0),
      saves: browserSaves(),
      terminal,
      watch: (event) => (last = event),
    });
    const run = Effect.gen(function* () {
      store = (yield* Engine).state;
      return yield* program;
    });
    const fiber = Effect.runFork(run.pipe(Effect.provide(layer)));
    // the game is over: nothing to wait for
    const stop = fiber.addObserver(() => callbacks.current.onInput(undefined));
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

/**
 * The font as big as the window allows for 80×25 (a monospace cell is about 0.6 × 1.2 em); on a
 * narrow screen the terminal takes the whole width, the panel goes above it.
 */
function fit(term: Xterm) {
  const narrow = window.innerWidth <= 900;
  const byWidth = (window.innerWidth - (narrow ? 32 : PANEL + MARGINS)) / (80 * 0.6);
  const byHeight = narrow ? Infinity : (window.innerHeight - MARGINS) / (25 * 1.2);
  term.options.fontSize = Math.max(6, Math.min(32, Math.floor(Math.min(byWidth, byHeight))));
}
