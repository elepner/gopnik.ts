/** Turbo Pascal integer/real helpers */

/** wrap to Integer (signed 16-bit) */
export function i16(x: number): number {
  return (x << 16) >> 16;
}

/** wrap to Byte */
export function u8(x: number): number {
  return x & 0xff;
}

/** wrap to Longint */
export function i32(x: number): number {
  return x | 0;
}

/** Integer `div`: truncates toward zero (IDIV) */
export function div(a: number, b: number): number {
  return Math.trunc(a / b);
}

/** Integer `mod`: the sign follows the dividend (IDIV remainder) */
export function mod(a: number, b: number): number {
  return a - Math.trunc(a / b) * b;
}

/** System.Round on a Real: halves round away from zero, the result is a Longint */
export function round(x: number): number {
  return i32(x < 0 ? -Math.floor(-x + 0.5) : Math.floor(x + 0.5));
}

/** System.Str(v: Longint, s) without width */
export function str(v: number): string {
  return String(i32(v));
}

/**
 * System.Val(s, v, code) — returns [value, code].
 * Leading blanks are skipped; sign and '$' hex prefix are accepted like TP7.
 */
export function val(s: string): readonly [number, number] {
  let i = 0;
  while (i < s.length && s[i] === ' ') i++;
  let neg = false;
  if (s[i] === '+' || s[i] === '-') {
    neg = s[i] === '-';
    i++;
  }
  if (i >= s.length) return [0, i + 1];
  const hex = s[i] === '$';
  if (hex && ++i >= s.length) return [0, i + 1];
  let v = 0;
  for (; i < s.length; i++) {
    const d = parseInt(s[i], hex ? 16 : 10);
    if (Number.isNaN(d)) return [0, i + 1];
    v = v * (hex ? 16 : 10) + d;
  }
  return [i32(neg ? -v : v), 0];
}
