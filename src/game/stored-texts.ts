/** Texts the game keeps in the state instead of printing them: the hero's name, the version. */
import { plain, red, text, white, yellow } from './text';

/** the typed name behind a white space; Раздолбай when nothing was typed */
export function heroName(typed: string): string {
  return white` `.format + (typed || text(plain`Раз`, yellow`дол`, red`бай`).format);
}

/** the version a new game is started with */
export const VERSION = text(red`Gopnik: `, white`version 1.02 june,sept 2003`).format;
