import { useEffect, useRef, useState } from 'react';

import { gives, has, type Item } from '../src/state/items';
import type { CharacterType } from '../src/state/kinds';
import type { Attribute, Body } from '../src/state/state';
import stencil from './gopnik-stencil.png';
import accessories from './items/accessories.png';
import adidasRed from './items/adidas-red.png';
import clothes from './items/clothes.png';
import other from './items/other.png';
import rings from './items/rings.png';
import weapons from './items/weapons.png';
import otmorozok from './otmorozok-stencil.png';
import patsan from './patsan-stencil.png';
import vor from './vor-stencil.png';

const PORTRAITS: Record<CharacterType, string> = { gopnik: stencil, otmorozok, patsan, vor };
interface ItemPicture {
  readonly sheet: string;
  readonly position: number;
  readonly single?: boolean;
}
const ITEM_PICTURES: Record<Item, ItemPicture> = {
  glasses: { sheet: accessories, position: 1 },
  cross: { sheet: accessories, position: 0 },
  phone: { sheet: other, position: 0 },
  leather: { sheet: clothes, position: 0 },
  coolLeather: { sheet: clothes, position: 1 },
  adidas: { sheet: adidasRed, position: 0, single: true },
  abibas: { sheet: clothes, position: 3 },
  boots: { sheet: accessories, position: 2 },
  coolBoots: { sheet: accessories, position: 3 },
  cleaver: { sheet: weapons, position: 0 },
  knife: { sheet: weapons, position: 1 },
  club: { sheet: weapons, position: 2 },
  knuckles: { sheet: weapons, position: 3 },
  spasiRing: { sheet: rings, position: 0 },
  pomogiRing: { sheet: rings, position: 1 },
  megaRing: { sheet: rings, position: 2 },
  pomiluyRing: { sheet: rings, position: 3 },
};
const SPECIAL_PICTURES: Partial<Record<number, ItemPicture>> = {
  7: { sheet: other, position: 1 },
  12: { sheet: other, position: 2 },
  13: { sheet: other, position: 3 },
};

interface Slot {
  readonly label: string;
  readonly items?: readonly (readonly [Item, string])[];
  readonly special?: (body: Body) => string | undefined;
}

// Priority matches the game's equipment calculation; other items in a group are spares.
const SLOTS: readonly Slot[] = [
  { label: 'Очки', items: [['glasses', 'Тёмные очки']] },
  { label: 'Крест', items: [['cross', 'Крестик']] },
  {
    label: 'Куртка',

    items: [
      ['coolLeather', 'Крутая кожанка'],
      ['leather', 'Кожанка'],
    ],
  },
  {
    label: 'Костюм',

    items: [
      ['adidas', 'Костюм Adidas'],
      ['abibas', 'Костюм Abibas'],
    ],
  },
  {
    label: 'Оружие',

    items: [
      ['cleaver', 'Тесак'],
      ['knife', 'Нож'],
      ['club', 'Дубинка'],
      ['knuckles', 'Кастет'],
    ],
  },
  {
    label: 'Обувь',

    items: [
      ['coolBoots', 'Крутые бутсы'],
      ['boots', 'Бутсы'],
    ],
  },
  { label: 'Телефон', items: [['phone', 'Мобильник']] },
  {
    label: 'Пистолет',

    special: (b) =>
      b.pockets.pistol
        ? `Пистолет${b.pockets.pistol.silencer ? ' с глушителем' : ''}, патронов: ${b.pockets.pistol.bullets}`
        : undefined,
  },
  { label: 'Кольцо', items: [['spasiRing', 'Кольцо «Господи спаси»']] },
  { label: 'Кольцо', items: [['pomogiRing', 'Кольцо «Помоги Господи»']] },
  { label: 'Кольцо', items: [['megaRing', 'Мега-кольцо']] },
  { label: 'Кольцо', items: [['pomiluyRing', 'Кольцо «Господи помилуй»']] },
  { label: 'Капа', special: (b) => (b.mouth.guard ? 'Капа' : undefined) },
  {
    label: 'Наколка',

    special: (b) => (b.skin.tattoo ? 'Зоновская наколка' : undefined),
  },
];

export function Equipment({ body, type }: { readonly body: Body; readonly type: CharacterType }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<number>();
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function outside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        setHovered(false);
      }
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, []);
  const equipped = SLOTS.map((slot) => slot.items?.find(([item]) => has(body, item)));
  const spares = SLOTS.flatMap((slot) =>
    (slot.items ?? []).filter(([item]) => has(body, item)).slice(1)
  );
  const count =
    equipped.filter(Boolean).length +
    spares.length +
    SLOTS.filter((slot) => slot.special?.(body)).length;
  const item = selected === undefined ? undefined : equipped[selected];
  const special = selected === undefined ? undefined : SLOTS[selected]?.special?.(body);
  const selectedPicture = item
    ? ITEM_PICTURES[item[0]]
    : special && selected !== undefined
      ? SPECIAL_PICTURES[selected]
      : undefined;
  return (
    <div
      className="things"
      ref={container}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
    >
      <button
        className="equipment-trigger"
        type="button"
        aria-expanded={open || hovered}
        aria-controls="equipment-list"
        onClick={() => setOpen(!open)}
      >
        Шмотки ({count})
      </button>
      {(open || hovered) && (
        <div className="equipment-popup" id="equipment-list" role="dialog" aria-label="Шмотки">
          <header className="equipment-header">
            <div>
              <small>ИНВЕНТАРЬ / СНАРЯЖЕНИЕ</small>
              <h3>ШМОТКИ</h3>
            </div>
            <button
              type="button"
              className="equipment-close"
              aria-label="Закрыть"
              onClick={() => {
                setOpen(false);
                setHovered(false);
              }}
            >
              ×
            </button>
          </header>
          <div className="equipment-board">
            <img className="gopnik" src={PORTRAITS[type]} alt="" />
            <div className="slot-grid">
              {SLOTS.map((slot, index) => {
                const name = equipped[index]?.[1] ?? slot.special?.(body);
                const picture = equipped[index]
                  ? ITEM_PICTURES[equipped[index]![0]]
                  : name
                    ? SPECIAL_PICTURES[index]
                    : undefined;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`gear-slot slot-${index} ${name ? 'filled' : ''}`}
                    aria-label={`${slot.label}: ${name ?? 'пусто'}`}
                    onPointerEnter={() => setSelected(index)}
                    onFocus={() => setSelected(index)}
                    onClick={() => setSelected(index)}
                  >
                    {picture && <ItemImage picture={picture} />}
                    <span className="slot-label">{slot.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="equipment-detail" aria-live="polite">
            {selected === undefined ? (
              'Наведи или нажми на слот'
            ) : (
              <>
                {selectedPicture && <ItemImage picture={selectedPicture} large />}
                <div>
                  <strong>{item?.[1] ?? special ?? `${SLOTS[selected]!.label}: пусто`}</strong>
                  {item && <span>{bonuses(body, item[0])}</span>}
                </div>
              </>
            )}
          </div>
          <div className="equipment-spares">
            <b>ЗАПАС</b>
            <span>{spares.length ? spares.map(([, name]) => name).join(' · ') : 'пусто'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ItemImage({
  picture,
  large = false,
}: {
  readonly picture: ItemPicture;
  readonly large?: boolean;
}) {
  return (
    <span
      className={large ? 'item-picture item-picture-large' : 'item-picture'}
      aria-hidden="true"
      style={{
        backgroundImage: `url("${picture.sheet}")`,
        backgroundPosition: picture.single ? 'center' : `${(picture.position * 100) / 3}% center`,
        backgroundSize: picture.single ? 'contain' : undefined,
      }}
    />
  );
}

function bonuses(body: Body, item: Item): string {
  const g = gives(body, item);
  const labels: readonly (readonly [Attribute, string])[] = [
    ['strength', 'сил'],
    ['agility', 'лвк'],
    ['vitality', 'жив'],
    ['luck', 'удача'],
    ['healthMax', 'здоровье'],
    ['armor', 'броня'],
    ['damageMin', 'мин. урон'],
    ['damageMax', 'макс. урон'],
  ];
  return labels
    .filter(([key]) => g[key])
    .map(([key, name]) => `${name} +${g[key]}`)
    .join(' · ');
}
