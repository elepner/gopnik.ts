import { useEffect, useRef, useState, type ReactNode } from 'react';

/** The hero's stats beside the screen, and the enemy's while a battle is on. */
import { hitChance } from '../src/game/hero-view';
import { attr, bonus } from '../src/state/attributes';
import { gives, has, type Item } from '../src/state/items';
import { rankName, typeName } from '../src/state/names';
import type {
  Attribute,
  Attributes,
  Body,
  Enemy,
  Game,
  GameState,
  Injuries,
  Player,
} from '../src/state/state';
import { districtName, plain } from './labels';

export function StatsPanel({ st }: { readonly st: GameState | undefined }) {
  // the enemy's column is kept free, so a battle doesn't move anything
  return (
    <aside className="panel">
      <div className="column">{st?.phase === 'started' && <Hero st={st} />}</div>
      <div className="column">
        {st?.phase === 'started' && st.battle && <EnemyStats enemy={st.battle.enemy} />}
      </div>
    </aside>
  );
}

function Hero({ st }: { readonly st: Game }) {
  const p = st.player;
  const { level, exp, expNext } = p.progression;
  return (
    <section>
      <h2>{plain(p.name)}</h2>
      <div className="sub">
        {typeName(p.type)} {level} ур. — {rankName(level)}
      </div>
      <Bar label="Здоровье" value={p.health.current} max={attr(p, 'healthMax')} />
      {level <= 39 && <Bar label="Опыт" value={exp} max={expNext} color="var(--cyan)" />}
      <Stats
        rows={[
          ['Сила', boosted(p, 'strength')],
          ['Ловкость', boosted(p, 'agility')],
          ['Живучесть', boosted(p, 'vitality')],
          ['Удача', boosted(p, 'luck')],
          ['Урон', damage(p)],
          ['Точность', accuracy(attr(p, 'agility'))],
          ['Броня', boosted(p, 'armor')],
          ['Пиво', p.resources.beer / 2 + ' л'],
          ['Бабки', p.resources.money],
          ['Косяки', p.resources.joints],
          ['Хлам', p.resources.junk],
          ['Понтовость', p.respect],
        ]}
      />
      <Hurt injuries={p.injuries} />
      <Equipment body={p.body} />
      <div className="sub">Район: {districtName(st.world.district)}</div>
    </section>
  );
}

function EnemyStats({ enemy }: { readonly enemy: Enemy }) {
  return (
    <section className="enemy">
      <h2>{plain(typeName(enemy.type))}</h2>
      <div className="sub">{enemy.level} уровня</div>
      <Bar label="Здоровье" value={enemy.health.current} max={enemy.health.max} />
      <Stats
        rows={[
          ['Сила', enemy.stats.strength],
          ['Ловкость', enemy.stats.agility],
          ['Живучесть', enemy.stats.vitality],
          ['Удача', enemy.stats.luck],
          ['Урон', `${enemy.damage.min}–${enemy.damage.max}`],
          ['Точность', accuracy(enemy.stats.agility)],
          ['Броня', enemy.armor],
        ]}
      />
      <Hurt injuries={enemy.injuries} />
    </section>
  );
}

function Bar(props: {
  readonly label: string;
  readonly value: number;
  readonly max: number;
  readonly color?: string;
}) {
  const share = props.max > 0 ? Math.max(0, Math.min(1, props.value / props.max)) : 0;
  // the game's health colours: red up to 25%, yellow up to 50%, green above
  const color =
    props.color ?? (share <= 0.25 ? 'var(--red)' : share <= 0.5 ? 'var(--yellow)' : 'var(--green)');
  return (
    <div className="bar">
      <div className="bar-label">
        <span>{props.label}</span>
        <span style={{ color }}>
          {props.value}/{props.max}
        </span>
      </div>
      <div className="bar-track">
        <div className="bar-fill" style={{ width: `${share * 100}%`, background: color }} />
      </div>
    </div>
  );
}

function Stats({ rows }: { readonly rows: readonly (readonly [string, ReactNode])[] }) {
  return (
    <dl>
      {rows.map(([name, value]) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Hurt({ injuries }: { readonly injuries: Injuries }) {
  if (!injuries.jaw && !injuries.leg) return null;
  return (
    <div className="hurt">
      {injuries.jaw && <div>Сломана челюсть</div>}
      {injuries.leg && <div>Сломана нога</div>}
    </div>
  );
}

/** an attribute as the game uses it, and in blue what the things and a joint add */
function boosted(p: Player, a: Attribute): ReactNode {
  const extra = bonus(p, a);
  return (
    <>
      {attr(p, a)}
      {extra !== 0 && <span className="boost"> {signed(extra)}</span>}
    </>
  );
}

function damage(p: Player): ReactNode {
  const [min, max] = [bonus(p, 'damageMin'), bonus(p, 'damageMax')];
  return (
    <>
      {attr(p, 'damageMin')}–{attr(p, 'damageMax')}
      {(min !== 0 || max !== 0) && (
        <span className="boost"> {min === max ? signed(min) : `${signed(min)}–${max}`}</span>
      )}
    </>
  );
}

function signed(n: number): string {
  return n > 0 ? `+${n}` : String(n);
}

function Equipment({ body }: { readonly body: Body }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setHovered(false);
      }
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);
  const things: ReactNode[] = ITEMS.filter(([item]) => has(body, item)).map(([item, name]) => {
    const what = givesText(gives(body, item));
    return (
      <div key={item}>
        {name} {what ? <span className="boost">{what}</span> : <span className="spare">запас</span>}
      </div>
    );
  });
  const other: string[] = [];
  if (body.skin.tattoo) other.push('Зоновская наколка');
  if (body.mouth.guard) other.push('Капа');
  const pistol = body.pockets.pistol;
  if (pistol)
    other.push(`Пистолет${pistol.silencer ? ' с глушителем' : ''}, патронов: ${pistol.bullets}`);
  things.push(...other.map((t) => <div key={t}>{t}</div>));
  return (
    <div
      className="things"
      ref={container}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
    >
      <button
        type="button"
        aria-expanded={open || hovered}
        aria-controls="equipment-list"
        onClick={() => setOpen(!open)}
      >
        Шмотки ({things.length})
      </button>
      {(open || hovered) && (
        <div className="equipment-popup" id="equipment-list" role="dialog" aria-label="Шмотки">
          <h3>Шмотки</h3>
          {things.length === 0 ? <div className="sub">ничего</div> : things}
        </div>
      )}
    </div>
  );
}

/** what a thing adds, shortly: `сил +1 урон +2` */
function givesText(g: Partial<Attributes>): string {
  const parts = SHORT.filter(([a]) => g[a]).map(([a, name]) => `${name} +${g[a]}`);
  if (g.damageMin || g.damageMax)
    parts.push(
      g.damageMin === g.damageMax ? `урон +${g.damageMin}` : `урон +${g.damageMin}–${g.damageMax}`
    );
  return parts.join(' ');
}

const SHORT: readonly (readonly [Attribute, string])[] = [
  ['strength', 'сил'],
  ['agility', 'лвк'],
  ['vitality', 'жив'],
  ['luck', 'уд'],
  ['healthMax', 'здор'],
  ['armor', 'брон'],
];

/** the things in their slots, as the shops and the stats call them */
const ITEMS: readonly (readonly [Item, string])[] = [
  ['adidas', 'Костюм Adidas'],
  ['abibas', 'Костюм Abibas'],
  ['coolLeather', 'Крутая кожанка'],
  ['leather', 'Кожанка'],
  ['coolBoots', 'Крутые бутсы'],
  ['boots', 'Бутсы'],
  ['cleaver', 'Тесак'],
  ['knife', 'Нож'],
  ['club', 'Дубинка'],
  ['knuckles', 'Кастет'],
  ['glasses', 'Тёмные очки'],
  ['cross', 'Крестик'],
  ['phone', 'Мобильник'],
  ['spasiRing', 'Кольцо «Господи спаси»'],
  ['pomogiRing', 'Кольцо «Помоги Господи»'],
  ['megaRing', 'Мега-кольцо'],
  ['pomiluyRing', 'Кольцо «Господи помилуй»'],
];

function accuracy(agility: number): string {
  const { chance, hits, extra } = hitChance(agility);
  return hits === 0 ? `${chance}%` : `${chance}% +${hits} (${extra}%)`;
}
