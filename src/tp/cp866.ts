/** IBM code page 866 (DOS Cyrillic) */

export function decodeCp866(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += CP866[b];
  return s;
}

export function encodeCp866(s: string): Uint8Array {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = REVERSE.get(s[i]) ?? s.charCodeAt(i) & 0xff;
  return out;
}

const HIGH =
  'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп' +
  '░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀' +
  'рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ ';
const LOW = ' ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼';

export const CP866: readonly string[] = Array.from({ length: 256 }, (_, i) =>
  i < 32 ? LOW[i] : i < 127 ? String.fromCharCode(i) : i === 127 ? '⌂' : HIGH[i - 128]
);

const REVERSE = new Map(CP866.map((c, i) => [c, i]));
