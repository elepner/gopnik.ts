/** Names the shell shows that the game keeps in other shapes. */

/** where each district is, as the arrival lines tell it (the game itself never names them) */
const DISTRICTS: Record<number, string> = {
  1: 'Универ',
  2: 'Шлюз',
  3: 'ОбьГЭС',
  4: 'Ельцовка',
  5: 'Универ, ректор',
};

export function districtName(district: number): string {
  return DISTRICTS[district] ?? `район ${district}`;
}

/** names keep the game's colour codes (`^0`..`^7`) */
export function plain(s: string): string {
  return s.replace(/\^[0-7]/g, '').trim();
}
