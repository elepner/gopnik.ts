/** The hero's stats beside the screen, and the enemy's while a battle is on. */
import { hitChance } from '../src/game/hero-view';
import { attr } from '../src/state/attributes';
import { has, type Item } from '../src/state/items';
import { rankName, typeName } from '../src/state/names';
import type { Body, Enemy, Game, GameState, Injuries } from '../src/state/state';

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
          ['Сила', attr(p, 'strength')],
          ['Ловкость', attr(p, 'agility')],
          ['Живучесть', attr(p, 'vitality')],
          ['Удача', attr(p, 'luck')],
          ['Урон', `${attr(p, 'damageMin')}–${attr(p, 'damageMax')}`],
          ['Точность', accuracy(attr(p, 'agility'))],
          ['Броня', attr(p, 'armor')],
          ['Пиво', p.resources.beer / 2 + ' л'],
          ['Бабки', p.resources.money],
          ['Косяки', p.resources.joints],
          ['Хлам', p.resources.junk],
          ['Понтовость', p.respect],
        ]}
      />
      <Hurt injuries={p.injuries} />
      <Equipment body={p.body} />
      <div className="sub">Район: {DISTRICTS[st.world.district] ?? st.world.district}</div>
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

function Stats({ rows }: { readonly rows: readonly (readonly [string, string | number])[] }) {
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

function Equipment({ body }: { readonly body: Body }) {
  const things = ITEMS.filter(([item]) => has(body, item)).map(([, name]) => name);
  if (body.skin.tattoo) things.push('Зоновская наколка');
  if (body.mouth.guard) things.push('Капа');
  const pistol = body.pockets.pistol;
  if (pistol)
    things.push(`Пистолет${pistol.silencer ? ' с глушителем' : ''}, патронов: ${pistol.bullets}`);
  return (
    <div className="things">
      <h3>Шмотки</h3>
      {things.length === 0 ? (
        <div className="sub">ничего</div>
      ) : (
        things.map((t) => <div key={t}>{t}</div>)
      )}
    </div>
  );
}

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

/** where each district is, as the arrival lines tell it */
const DISTRICTS: Record<number, string> = {
  1: 'Универ',
  2: 'Шлюз',
  3: 'ОбьГЭС',
  4: 'Ельцовка',
  5: 'Универ, ректор',
};

function accuracy(agility: number): string {
  const { chance, hits, extra } = hitChance(agility);
  return hits === 0 ? `${chance}%` : `${chance}% +${hits} (${extra}%)`;
}

/** names keep the game's colour codes (`^0`..`^7`) */
function plain(s: string): string {
  return s.replace(/\^[0-7]/g, '').trim();
}
