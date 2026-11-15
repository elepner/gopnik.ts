/**
 * A small DSL for the game's texts with explicit colours.
 *
 *   green`Ты пнул врага на ${dmg}з. У него осталось ${left}`
 *   text(plain`Сл:`, blue`${str}`, white` Лв:`, …)
 *
 * A colour tag switches the colour like the original's `^0`..`^7` codes; the colour stays until
 * the next tag (`plain` adds no code and continues the current one). Interpolated numbers become
 * Print's integer arguments (`#`), strings are spliced in verbatim (names and titles may carry
 * their own colour codes, exactly like the original's string concatenation), nested texts bring
 * their arguments along. A `Text` compiles to the very Pascal string and arguments the original
 * passed to Print, so the output stays byte-identical.
 */
export function text(...parts: readonly Text[]): Text {
  return { format: parts.map((p) => p.format).join(''), args: parts.flatMap((p) => p.args) };
}

/** the Pascal format string (`^N` colour codes, `#` placeholders) and its integer arguments */
export interface Text {
  readonly format: string;
  readonly args: readonly number[];
}

/** CRT colours 8..15 = codes `^0`..`^7` */
export type Color = (typeof COLORS)[number];

export const COLORS = [
  'gray',
  'blue',
  'green',
  'cyan',
  'red',
  'magenta',
  'yellow',
  'white',
] as const;

/** a value inside a text: a number (Print argument), a verbatim string, or a nested text */
export type Slot = number | string | Text;

type Tag = (strings: TemplateStringsArray, ...slots: readonly Slot[]) => Text;

/** no colour code: continues the current colour (white at the start of a line) */
export const plain: Tag = tag(undefined);
export const gray: Tag = tag('gray');
export const blue: Tag = tag('blue');
export const green: Tag = tag('green');
export const cyan: Tag = tag('cyan');
export const red: Tag = tag('red');
export const magenta: Tag = tag('magenta');
export const yellow: Tag = tag('yellow');
export const white: Tag = tag('white');

/** a colour chosen at run time */
export function paint(color: Color): Tag {
  return tag(color);
}

/** the colour of a `^N` digit character code (48..55), as kept in the original's state */
export function digitColor(code: number): Color {
  const color = COLORS[code - 0x30];
  if (!color) throw new Error(`not a colour digit: ${code}`);
  return color;
}

/** the CRT colour (8..15) of a colour name */
export function crtColor(color: Color): number {
  return COLORS.indexOf(color) + 8;
}

function tag(color: Color | undefined): Tag {
  const code = color === undefined ? '' : `^${COLORS.indexOf(color)}`;
  return (strings, ...slots) =>
    text(
      { format: code, args: [] },
      literal(strings[0]!),
      ...slots.flatMap((slot, i) => [slotText(slot), literal(strings[i + 1]!)])
    );
}

function literal(chunk: string): Text {
  if (/[#^]/.test(chunk)) throw new Error(`literal text must not contain # or ^: ${chunk}`);
  return { format: chunk, args: [] };
}

function slotText(slot: Slot): Text {
  if (typeof slot === 'number') return { format: '#', args: [slot] };
  if (typeof slot === 'string') return { format: slot, args: [] };
  return slot;
}
