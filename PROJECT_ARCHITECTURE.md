# Project Architecture (Canonical)

This file is the canonical architecture reference for AI assistants in this repo.
Entry point for assistants is `PROJECT_MEMORY.md`.

## System Overview

- Goal: a 1:1 TypeScript rewrite of the DOS text RPG "ГОПНИК v1.02" (2003, Akademgorodok,
  Novosibirsk). The original sources are lost; the port is reverse-engineered from `G.EXE`.
- Single package, Vite+ toolchain (`vp`), Bun runtime for scripts.
- Parts:
  - `original/`: the untouched original binary, saves and readme (reference data, never edited).
  - `oracle/`: tooling around the original — 8086 interpreter + minimal DOS/BIOS that runs
    `G.EXE` headless, disassembler, Turbo Pascal lifter, table extractor.
  - `src/`: the TypeScript port (Effect-based).
  - `test/`: differential tests that run the original and the port side by side.
  - `analysis/`: generated listings (`g.asm`, `g.lift.txt`, `data.txt`); regenerate, don't edit.
  - `vendor/`: upstream web version `xpl/gop` (DOSBox/Emscripten) for manual play.

## Original Program Facts (Critical)

- `G.EXE`: Turbo Pascal 7 (Borland 1992), MZ, not packed. Segments (image paragraphs):
  `0000` main program, `0EE5` Dos.FindFirst/FindNext, `0EED` custom print unit,
  `0F16` CRT, `0F78` System, `10AE` data segment (DS).
- Randomness: only `System.Random(n)` (`0F78:114B`), seeded once by `Randomize`
  (`0F78:11E0`, DOS time via INT 21h/2Ch) into `RandSeed` (`DS:367E`).
  LCG: `seed := seed * 134775813 + 1; Random(n) := (seed * n) shr 32`.
- Reals are Turbo Pascal 6-byte software reals (`RAdd/RSub/RMul/RDiv/RCmp/RFloat/Round`).
- Output goes through `Print`/`PrintLn` (`0EED:0000`/`01C2`): `^0..^7` set colour 8..15,
  `#` is replaced by the next integer argument (5 integer args).
- Input: commands via CRT `Read(s)+ReadLn` (TP line editor), single keys via `ReadKey`.
- Game state lives in DS `0x3692..0x3E36`; the save record is `DS:369C`, 694 bytes
  (`SAVE_R?.SAV`); `PLACES.SAV` is `DS:3694`, 7 bytes.

## Port Architecture (`src/`)

- `tp/`: Turbo Pascal runtime semantics (Random LCG, integer wrap, Round, Str/Val, cp866).
- `state/`: `Memory` = byte-exact copy of the DS layout with typed field accessors; the game
  reads/writes named fields (`st.hp`, `st.money`) and gets Integer/Byte wrap-around for free.
- `crt/`: `Screen` (80x25 cells, B800 layout) and CRT services: output, `ReadKey`,
  `CrtRead` line editor.
- `game/`: one module per original procedure group; each function documents the original
  address it was translated from (e.g. `fight` ← `0000:3D11`).
- Services (Effect `Context.Service`, functional style): `Crt`, `Keyboard`, `Rng`, `Game`,
  `Disk`. Runners provide them: terminal (chalk) for play, scripted for tests.

## Fidelity Rules

- Behaviour must match the original byte for byte: same screen cells (char + attribute), same
  `Random` call sequence (count, argument, order), same state after every key.
- Keep original quirks and bugs (wrong price shown, odd boolean expressions, typos in texts).
- Evaluation order inside one TP expression can differ from source order; the lifter numbers
  Random calls (`Random#k`) — follow that order.
- The lifter renders Longint compares (`if sx(x) > 0 … if x <= Random(n)`) as if Random were
  called inside the last condition; in the binary Random is always evaluated first. Check the
  raw listing (`analysis/g.asm`) whenever a Random sits inside a condition chain.

## Verification

- `oracle/cli.ts` runs the original with a seed and a key script and prints screens.
- Differential tests feed the same keys and seed to the original (emulated) and to the port,
  then compare every screen at each key read, the Random log and the state fields.
