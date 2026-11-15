# Project Memory: gopnik.ts

## What this repo is
- A 1:1 TypeScript rewrite of the DOS text RPG "ГОПНИК v1.02" (V.P., 2003, Akademgorodok /
  Novosibirsk). The sources are lost; the port is reverse-engineered from `original/g.exe`.
- "1:1" is verified, not assumed: the original runs in our own emulator and every test compares
  screen, game state, `Random` calls and `Print` calls with the port at every key read.
- Next goal: LLM-driven NPCs/narration as a separate mode on top of the faithful core
  (see "LLM ideas" below). Display layer (terminal/CRT) will be replaced.
- Architecture details: `PROJECT_ARCHITECTURE.md`. Quirks of the original: `BUGS.md`.
- Repo: https://github.com/elepner/gopnik.ts (private, contains the original binary).

## Status
- All procedures of G.EXE are ported (`src/game/*`), playable in a terminal (`bun run play`).
- Verified identical: 4000+ random play-throughs (fuzzer, 800 keys each, new game and original
  saves), bot games up to 73 000 keys / 30 000 `Random` calls, full wins from a new game.
- Greedy bot (new game, 10 seeds per class): Вор 9/10 wins, Пацан 2/10, Гопник 2/10,
  Отморозок 0/10 — 0 divergences from the original.
- 47 tests (`vp test`, ~20 s): game-logic specs + regression against the emulated original.

## Core stack
- Vite+ (`vp`): fmt (Oxfmt), lint (Oxlint, type-aware), test (Vitest 5). Config: `vite.config.ts`.
- Bun runs scripts (`bun <file>.ts`); TypeScript 7 (`tsc --noEmit` covers src, test, oracle).
- Effect 4 (services, `Brand`, `@effect/vitest`), chalk for the terminal renderer.
- `capstone-wasm` (disassembly) and `oxc-parser` (codemods) — tooling only.

## Layout
- `original/` — untouched G.EXE, SAVE_R*.SAV, PLACES.SAV, README. Never edit.
- `oracle/` — the reference machine: `cpu.ts` (8086/186 interpreter), `dos.ts` (minimal DOS +
  BIOS: B800 screen, scripted keyboard, files, Random/Print hooks), `cli.ts`, `disasm.ts`
  (recursive-descent disassembler + TP runtime names), `lift.ts` (TP code → pseudo-Pascal),
  `gen-tables.ts` (tables + DS image), `datadump.ts`.
- `analysis/` — generated `g.asm`, `g.lift.txt`, `data.txt`. Regenerate, don't edit.
- `src/tp/` — Turbo Pascal runtime semantics: `rng.ts` (LCG), `num.ts` (Integer wrap, div/mod,
  Round, Str/Val), `cp866.ts`, `brands.ts`.
- `src/state/layout.ts` — game state as the original data segment (`Memory` + typed fields).
- `src/crt/` — CRT unit: `screen.ts` (80×25 B800 cells), `crt.ts` (ReadKey, CrtRead line editor,
  services `Crt`, `Keyboard`).
- `src/game/` — the game: `prelude` (services `Game`, `Disk`, Print/PrintLn, luck checks),
  `texts` (all texts), `start`, `main` (command loop, walking), `fight`, `enemy`, `hero`,
  `places`, `encounters`, `screens`. Each function names its original address (`0000:3D11`).
- `src/runtime.ts` (layers, `program`), `src/main.ts` (terminal runner).
- `test/` — harness (original vs port), fuzzer, bots, replay, fixtures, helpers.

## High-value commands
- Play: `bun run play [--seed N] [--dir saves]`
- Run the original: `bun run original -- [--seed N] [-v] [-r] key1 key2 ...`
  (`-v` screen after every key, `-r` Random log; keys: chars, `enter`, `space`, `esc`, `bs`, `up`…)
- Compare one script: `bun run compare -- --seed 1 space 1 2 3 4 5 6 7 0/ vasya/ w/`
  (`text/` = type text + Enter; prints the first divergence)
- Fuzz: `bun run fuzz -- --count 50 --len 1000 [--saves original]`
- Bots: `bun run greedy -- --class 3 --tries 10 [--save 1|2..5]` (writes `logs/*.keys` with the
  reason for every decision); `bun run bot` is the older scripted bot.
- Replay a log on the original and the port: `bun run replay -- logs/x.keys [--screens --every N]`
- Regenerate: `bun run disasm`, `bun run lift`, `bun run tables`
- Check: `bun run typecheck`, `vp lint`, `vp test` (or `bun run test`)

## How the oracle works
- `oracle/dos.ts` loads the MZ image at segment 0200, emulates INT 10h/16h/1Ah/21h, keeps the
  cursor in the BIOS data area (CRT reads it there), fakes the BIOS tick for CRT's Delay.
- Seed: `Randomize` takes the DOS time (INT 21h/2Ch); the oracle returns the seed there, so
  original and port start from the same `RandSeed`.
- Hooks: `Random` entry/exit (`randLog`), `Print`/`PrintLn` entry (`printLog`).
- `Dos.run()` stops when the program blocks on a key; `send(key)` feeds one key. With
  `onPoll`, KeyPressed takes the next scripted key (the victory animation).

## Important coding constraints
- Formatting: single quotes, semicolons, trailing commas (es5), print width 100, 2 spaces.
- TypeScript object shapes use `interface`; `type` only for unions, mapped/conditional types.
- Effect services in functional style — `const Crt = Context.Service<ICrt>('Crt')` — never
  `class X extends Context.Service<X, Shape>()('X') {}`.
- Prefer `function` declarations over top-level arrow-function assignments.
- Primary exported function at the top of a module; helpers below, next to their use.
- Keep code compact and colocated; avoid defensive programming; fail fast.
- Relative imports have no extension: `import { Game } from './prelude'`.
- Port code keeps a comment with the original address of every translated procedure.
- Branded types (`src/tp/brands.ts`): `Seed`, `Cp866Byte`, `ScanCode`, `CrtColor`, `DsOffset`,
  `District`, `TypeId`, `SaveName`. Outside values (seed, keys, file names) use checked
  constructors; game numbers (hp, money, stats) stay `number` (Integer arithmetic). State fields
  get brands via `LAYOUT` (`u8<District>(0x3692)`).
- Texts live only in `src/game/texts.ts` (`as const` groups per module, verbatim, typos kept).
  Format: `^0`..`^7` colour 8..15, `#` integer argument, `$` string argument.
  `print`/`println`/`fmt` derive argument types from the literal (`NoInfer` keeps it literal);
  `printf` is the untyped core, only for helpers that build formats (shop lines).
- Every Print/PrintLn lands in `Game.transcript` (`{ text, args, newline, segments }`).
- Never edit `original/`; never hand-edit generated files (`analysis/`, `src/data/*`).
- When editing files from scripts, don't use `String.replace` with replacement text containing
  `$` (`` $` `` and `$&` are special) — use a replacer function or `split/join`.

## Fidelity rules (lessons learned)
- Same screen cells, same `Random` sequence (count, argument, order), same state after every
  key, same Print calls. Keep the original's bugs (`BUGS.md`).
- Turbo Pascal may evaluate the right operand first: follow the lifter's `Random#k` numbering.
- The lifter shows Longint compares as `if sx(x) > 0 … if x <= Random(n)`, but `Random` is always
  called first — also when luck overflowed into negatives. Check `analysis/g.asm` whenever a
  Random sits inside a condition chain.
- ReadKey calls without a used result are real pauses — every one costs a key.
- Several procedures share the input string (`DS:3A72`): a fight inside a place overwrites the
  place's input, later checks see the last fight command.
- Out-of-range table reads (rank names above 41) read the original data image; `Memory` is
  initialised with it (`src/data/ds-init.ts`).
- Numbers are 16-bit: store through `st.*` fields (they wrap); use `i16`/`div`/`mod`/`round`.
- Real arithmetic: doubles + `round` (half away from zero) match TP's 6-byte reals for every case
  in the game (verified against the original's `RRound`).

## Tests
- Logic specs next to the code (`src/**/*.spec.ts`, `@effect/vitest`). `play()` from
  `test/game.ts` runs one game procedure with prepared state (`setup`), seed and keys and
  returns state, printed texts and the Random log; `hero()` sets up a level-0 Отморозок.
- Assert on effect results with `check` from `test/check.ts`:
  `yield* eff.pipe(check((x) => x.toBe(1)))`.
- `test/regression.spec.ts` replays `test/fixtures/*.keys` (bot logs) and random scenarios on
  the emulated original and the port. To pin a new behaviour, copy a log from `logs/` into
  `test/fixtures/`.
- No tests for screen rendering / CRT output: the display layer will be replaced.
- Type-level tests (`expectTypeOf`, `@ts-expect-error`) are checked by `tsc`, not by vitest.

## LLM ideas (not started)
- Keep the 1:1 core; add an `Npc`/`Narrator` service as a separate mode, with state fields and
  `Game.transcript` as context.
- Start with pure narration (no mechanics risk): a chronicle/rumours of the district from the
  transcript, generated phone calls and temple scenes.
- Then: street encounters as free dialogue mapped back to engage/leave/noticed; the den as a
  crowd that remembers you (respect, loans, running away), mapping intents to `p/r/a/d/hp`;
  vet/girlfriend/dealers with character; living `s`/`sv` descriptions.
- Mods beyond 1:1: enemies that remember you, dynamic den quests, talking to the rector.

## Commit messages by Agents
- Keep commit messages short.
- Do not use conventional commits.
- No need to specify agents in co-authors.
