/**
 * Buttons instead of a keyboard (a phone): what the game waits for right now — the commands of
 * the prompt, yes/no, a character type, a save, "press a key" — or a field for the name.
 */
import { useEffect, useRef, useState } from 'react';

import { CMD, type Context } from '../src/game/commands';
import type { GameEvent } from '../src/game/events';
import type { GameState, KnownPlaces } from '../src/state/state';
import type { Waiting } from './xterm-terminal';

/** what the game waits for, and the event that asked for it */
export interface Input {
  readonly waiting: Waiting;
  readonly event: GameEvent | undefined;
}

interface Choice {
  /** what is typed */
  readonly keys: string;
  readonly label: string;
  readonly hint: string;
}

export function Actions(props: {
  readonly input: Input | undefined;
  readonly st: GameState | undefined;
  readonly send: (keys: string) => void;
}) {
  const { input, st, send } = props;
  if (!input) return <nav className="actions" />;
  if (input.waiting === 'line' && asksName(input.event))
    return (
      <>
        <nav className="actions" />
        <NameField send={send} />
      </>
    );
  return (
    <nav className="actions">
      {choices(input, st).map((c) => (
        <button key={c.keys} onClick={() => send(c.keys)}>
          <b>{c.label}</b>
          <small>{c.hint}</small>
        </button>
      ))}
    </nav>
  );
}

/** the one thing typed on a phone: the name, in the browser's own modal dialog */
function NameField({ send }: { readonly send: (keys: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  // Esc closes the dialog too: the game takes an empty name as Раздолбай
  const answer = () => send(name.trim() + '\r');
  return (
    <dialog ref={dialog} className="name" onClose={answer}>
      <form method="dialog">
        <label>
          А зовут тебя:
          <input
            autoFocus
            value={name}
            maxLength={30}
            placeholder="Раздолбай"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Погнали</button>
      </form>
    </dialog>
  );
}

function asksName(event: GameEvent | undefined) {
  return event?.type === 'startNameAsked' || event?.type === 'mainRenaming';
}

function choices({ waiting, event }: Input, st: GameState | undefined): readonly Choice[] {
  if (waiting === 'key')
    // the saves found at the start are asked in a dialog (`App`)
    return event?.type === 'startSavesFound' ? [] : [{ keys: '\r', label: '⏎', hint: 'дальше' }];
  if (event?.type === 'prompt') return commands(event.context, st);
  if (event?.type === 'startStory' || event?.type === 'startTypesExplained') return TYPES;
  return [
    { keys: 'y\r', label: 'y', hint: 'да' },
    { keys: 'n\r', label: 'n', hint: 'нет' },
  ];
}

/** the commands of a prompt the hero can use here: places he knows, a pistol he has */
function commands(context: Context, st: GameState | undefined): readonly Choice[] {
  const hints: Record<string, string> = HINTS[context] ?? {};
  return Object.entries(CMD[context])
    .filter(([name]) => name in hints)
    .filter(([name]) => {
      if (st?.phase !== 'started') return true;
      const place = context === 'main' ? PLACES[name] : undefined;
      if (place && !st.world.places[place]) return false;
      return name !== 'shoot' || st.player.body.pockets.pistol !== null;
    })
    .map(([name, keys]) => ({ keys: keys + '\r', label: keys, hint: hints[name]! }));
}

/** the places the main commands go to */
const PLACES: Record<string, keyof KnownPlaces> = {
  market: 'market',
  dealers: 'dealers',
  vet: 'hospital',
  girlfriend: 'girlfriend',
  den: 'den',
  club: 'club',
  gym: 'gym',
};

const TYPES: readonly Choice[] = [
  { keys: '0\r', label: '0', hint: 'Пацан' },
  { keys: '1\r', label: '1', hint: 'Отморозок' },
  { keys: '2\r', label: '2', hint: 'Гопник' },
  { keys: '3\r', label: '3', hint: 'Вор' },
  { keys: '4\r', label: '4', hint: 'Чё за батва?' },
];

/** a button per command, in the order of `CMD`; a command without a hint gets no button */
const HINTS: Partial<Record<Context, Record<string, string>>> = {
  main: {
    walk: 'гулять',
    run: 'бежать',
    market: 'рынок',
    dealers: 'барыги',
    vet: 'ветеринар',
    girlfriend: 'подруга',
    den: 'притон',
    club: 'клуб',
    gym: 'качалка',
    beer: 'пиво',
    beerUntilHealthy: 'пить до упора',
    joint: 'косяк',
    commands: 'команды',
    stats: 'статы',
    shoot: 'стрелять',
    rename: 'имя',
    help: 'чё за батва',
    exit: 'выход',
  },
  fight: {
    kick: 'пнуть',
    run: 'бежать',
    beer: 'пиво',
    beerUntilHealthy: 'пить до упора',
    joint: 'косяк',
    stats: 'статы',
    inspectEnemy: 'враг',
    callBackup: 'позвать пацанов',
    shoot: 'стрелять',
    exit: 'выход',
  },
  market: {
    hotdog: 'хот-дог',
    beer: 'пиво',
    glasses: 'очки',
    abibas: 'Abibas',
    boots: 'бутсы',
    leather: 'кожанка',
    adidas: 'Adidas',
    coolBoots: 'крутые бутсы',
    coolLeather: 'крутая кожанка',
    steal: 'стырить',
    leave: 'уйти',
  },
  dealers: {
    joint: 'косяк',
    phone: 'мобильник',
    superJoint: 'офигенный косяк',
    tattoo: 'наколка',
    knuckles: 'кастет',
    club: 'дубинка',
    pistol: 'пистолет',
    bullets: 'патроны',
    silencer: 'глушитель',
    sellJunk: 'сдать хлам',
    sellSpareThings: 'продать шмотки',
    leave: 'уйти',
  },
  vet: { patchUp: 'подлечиться', fixBones: 'вправить кости', leave: 'уйти' },
  den: {
    treatToBeer: 'угостить пивом',
    borrow: 'занять',
    helpTheLad: 'помочь',
    respect: 'уважуха',
    ask: 'спросить',
    job: 'дело',
    leave: 'уйти',
  },
  club: { playCards: 'карты', disco: 'дискотека', cheatTricks: 'фокусы', leave: 'уйти' },
  gym: {
    weights: 'штанга',
    machines: 'тренажёры',
    exp: 'опыт',
    mouthGuard: 'капа',
    press: 'пресс',
    leave: 'уйти',
  },
};
