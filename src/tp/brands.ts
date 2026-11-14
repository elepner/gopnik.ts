/**
 * Branded primitives of the port. Values coming from outside (CLI seed, keyboard, file
 * names) go through checked constructors; internal identities use nominal brands.
 * Plain game numbers (hp, money, ...) stay `number`: they take part in Integer arithmetic.
 */
import { Brand } from 'effect';

/** System.RandSeed: the 32-bit LCG state */
export type Seed = Brand.Branded<number, 'Seed'>;
export const Seed = Brand.make<Seed>((n) => Number.isInteger(n) && n >= 0 && n <= 0xffff_ffff);

/** one character of code page 866, as a byte */
export type Cp866Byte = Brand.Branded<number, 'Cp866Byte'>;
export const Cp866Byte = Brand.make<Cp866Byte>(isByte);

/** BIOS keyboard scan code */
export type ScanCode = Brand.Branded<number, 'ScanCode'>;
export const ScanCode = Brand.make<ScanCode>(isByte);

/** CRT text colour (TextColor argument / low nibble of TextAttr) */
export type CrtColor = Brand.Branded<number, 'CrtColor'>;
export const CrtColor = Brand.nominal<CrtColor>();

/** offset inside G.EXE's data segment */
export type DsOffset = Brand.Branded<number, 'DsOffset'>;
export const DsOffset = Brand.nominal<DsOffset>();

/** district 1..5 (0 transiently while loading SAVE_R0) */
export type District = Brand.Branded<number, 'District'>;
export const District = Brand.nominal<District>();

/** index into the type table at DS:002E — character types 3..6, enemies 0..10 */
export type TypeId = Brand.Branded<number, 'TypeId'>;
export const TypeId = Brand.nominal<TypeId>();

/** a file the game reads or writes: SAVE_R?.SAV or PLACES.SAV */
export type SaveName = Brand.Branded<string, 'SaveName'>;
export const SaveName = Brand.make<SaveName>((s) => /^(save_r\d\.sav|places\.sav)$/i.test(s));

function isByte(n: number) {
  return Number.isInteger(n) && n >= 0 && n <= 0xff;
}
