/**
 * Text-mode screen with Turbo Pascal CRT unit semantics (direct video, full window).
 * Cells are stored like B800:0000 — cp866 char byte + attribute byte — so they can
 * be compared 1:1 with the emulated original.
 */
import { CP866, encodeCp866 } from '../tp/cp866.ts';

export const COLS = 80;
export const ROWS = 25;

export class Screen {
  readonly cells = new Uint8Array(COLS * ROWS * 2);
  row = 0;
  col = 0;
  /** CRT.TextAttr; initialised from the cell under the cursor (07 on a fresh screen) */
  attr = 0x07;

  constructor() {
    this.fill(0, ROWS, 0x07);
  }

  private fill(fromRow: number, toRow: number, attr: number) {
    for (let i = fromRow * COLS; i < toRow * COLS; i++) {
      this.cells[i * 2] = 0x20;
      this.cells[i * 2 + 1] = attr;
    }
  }

  /** CRT.TextColor: keeps background bits, bit 4 of color maps to blink */
  textColor(c: number) {
    let a = c & 0xff;
    if (a & 0xf0) a = (a & 0x0f) | 0x80;
    this.attr = (this.attr & 0x70) | a;
  }

  clrScr() {
    this.fill(0, ROWS, this.attr);
    this.row = 0;
    this.col = 0;
  }

  private scrollUp() {
    this.cells.copyWithin(0, COLS * 2, COLS * ROWS * 2);
    this.fill(ROWS - 1, ROWS, this.attr);
  }

  private newLine() {
    this.row++;
    if (this.row >= ROWS) {
      this.scrollUp();
      this.row = ROWS - 1;
    }
  }

  /** write one cp866 byte the way CRT's WriteBuf does */
  putByte(b: number) {
    switch (b) {
      case 7:
        return;
      case 8:
        if (this.col > 0) this.col--;
        return;
      case 10:
        this.newLine();
        return;
      case 13:
        this.col = 0;
        return;
    }
    const i = (this.row * COLS + this.col) * 2;
    this.cells[i] = b;
    this.cells[i + 1] = this.attr;
    if (++this.col >= COLS) {
      this.col = 0;
      this.newLine();
    }
  }

  write(s: string) {
    for (const b of encodeCp866(s)) this.putByte(b);
  }

  text(): string {
    const lines: string[] = [];
    for (let r = 0; r < ROWS; r++) {
      let line = '';
      for (let c = 0; c < COLS; c++) line += CP866[this.cells[(r * COLS + c) * 2]];
      lines.push(line.trimEnd());
    }
    return lines.join('\n');
  }
}
