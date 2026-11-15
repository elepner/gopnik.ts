# Project Memory: gopnik.exe

## What this repo is
- 1:1 TypeScript rewrite of the DOS text RPG "ГОПНИК v1.02" (2003) reverse-engineered from
  `original/g.exe`. Later goal: LLM-driven dialogues with NPCs on top of the faithful core.
- Architecture: `PROJECT_ARCHITECTURE.md` (source of truth).

## Core stack
- Vite+ (`vp`): fmt (Oxfmt), lint (Oxlint, type-aware), test (Vitest), build.
- Bun for running scripts (`bun <file>.ts`), TypeScript 7.
- Effect 4 for the port, chalk for terminal rendering.
- `capstone-wasm` for disassembly (oracle tooling only).

## High-value commands
- Play the port: `vp run play`
- Run the original headless: `bun oracle/cli.ts [--seed N] [-v] [-r] key1 key2 ...`
  (`-v` screen after every key, `-r` Random log; keys: chars or `enter`, `space`, `esc`, ...)
- Regenerate listings: `bun oracle/disasm.ts > analysis/g.asm`,
  `bun oracle/lift.ts > analysis/g.lift.txt`, `bun oracle/gen-tables.ts`
- Check: `bun run typecheck` (also covers specs and type-level tests), `vp lint`, `vp test`
- Tests: unit/logic specs next to the code (`src/**/*.spec.ts`, `@effect/vitest`, `check` from
  `test/check.ts`, `play()` from `test/game.ts` to run one game procedure with prepared state,
  seed and keys); `test/regression.spec.ts` replays `test/fixtures/*.keys` and random scenarios
  against the emulated original. No tests for screen rendering: the display layer will change.
- Bots: `bun run greedy -- --class 3 --tries 10` plays the original and writes `logs/*.keys`;
  `bun run replay -- <log>` replays a log on the original and the port. Copy a log into
  `test/fixtures/` to make it a regression test.

## Important coding constraints
- Formatting: single quotes, semicolons, trailing commas (es5), print width 100, 2 spaces.
- TypeScript object shapes use `interface`; `type` only for unions, mapped/conditional types.
- Declare Effect services in functional style — `const Crt = Context.Service<ICrt>('Crt')` —
  never `class X extends Context.Service<X, Shape>()('X') {}`.
- Tests use `@effect/vitest` (`it.effect`, `layer(...)`); assert on effect results with `check`
  from `test/check.ts`: `yield* eff.pipe(check((x) => x.toBe(1)))`.
- Prefer `function` declarations over top-level arrow-function assignments.
- In every module, place the primary exported function at the top of the file, right after the
  imports; private constants, types and helpers go below, next to the code that uses them.
- Keep code compact and colocated.
- Avoid defensive programming; fail fast.
- Port code keeps a comment with the original address of every translated procedure.
- Branded types (`src/tp/brands.ts`, Effect `Brand`): `Seed`, `Cp866Byte`, `ScanCode`, `CrtColor`,
  `DsOffset`, `District`, `TypeId`, `SaveName`. Values from outside (seed, keys, file names) go
  through checked constructors; plain game numbers (hp, money, stats) stay `number` because they
  take part in Integer arithmetic. State fields carry brands via `LAYOUT` (`u8<District>(…)`).
- Relative imports have no extension: `import { Game } from './prelude'`.
- Player-visible texts live only in `src/game/texts.ts` (`as const` groups per module, verbatim,
  typos included). Format: `^0`..`^7` colour, `#` integer argument, `# Project Memory: gopnik.exe

## What this repo is
- 1:1 TypeScript rewrite of the DOS text RPG "ГОПНИК v1.02" (2003) reverse-engineered from
  `original/g.exe`. Later goal: LLM-driven dialogues with NPCs on top of the faithful core.
- Architecture: `PROJECT_ARCHITECTURE.md` (source of truth).

## Core stack
- Vite+ (`vp`): fmt (Oxfmt), lint (Oxlint, type-aware), test (Vitest), build.
- Bun for running scripts (`bun <file>.ts`), TypeScript 7.
- Effect 4 for the port, chalk for terminal rendering.
- `capstone-wasm` for disassembly (oracle tooling only).

## High-value commands
- Play the port: `vp run play`
- Run the original headless: `bun oracle/cli.ts [--seed N] [-v] [-r] key1 key2 ...`
  (`-v` screen after every key, `-r` Random log; keys: chars or `enter`, `space`, `esc`, ...)
- Regenerate listings: `bun oracle/disasm.ts > analysis/g.asm`,
  `bun oracle/lift.ts > analysis/g.lift.txt`, `bun oracle/gen-tables.ts`
- Check: `vp check` (format + lint + types), `vp test`

## Important coding constraints
- Formatting: single quotes, semicolons, trailing commas (es5), print width 100, 2 spaces.
- TypeScript object shapes use `interface`; `type` only for unions, mapped/conditional types.
- Declare Effect services in functional style — `const Crt = Context.Service<ICrt>('Crt')` —
  never `class X extends Context.Service<X, Shape>()('X') {}`.
- Tests use `@effect/vitest` (`it.effect`, `layer(...)`); assert on effect results with `check`
  from `test/check.ts`: `yield* eff.pipe(check((x) => x.toBe(1)))`.
- Prefer `function` declarations over top-level arrow-function assignments.
- In every module, place the primary exported function at the top of the file, right after the
  imports; private constants, types and helpers go below, next to the code that uses them.
- Keep code compact and colocated.
- Avoid defensive programming; fail fast.
 string argument.
  `print`/`println`/`fmt` derive argument types from the literal — never pass a non-literal
  format; `printf` is the untyped core for the rare helper that builds formats itself.
- Every Print/PrintLn is also recorded in `Game.transcript` (`{ text, args, newline, segments }`);
  the differential tests compare it against the original's Print calls.
- Never edit `original/`; never hand-edit generated files (`analysis/`, `src/data/tables.ts`).

## Commit messages by Agents
- Keep commit messages short.
- Do not use conventional commits.
- No need to specify agents in co-authors.
