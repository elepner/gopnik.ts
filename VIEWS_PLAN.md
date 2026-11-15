# Plan: logic emits events, views react — the rest of the game

The fight, beer and the fight's aftermath already work this way (`fight.ts` / `fight-view.ts`,
`beer.ts` / `beer-view.ts`, `aftermath.ts` / `aftermath-view.ts`). This plan does the same for
everything else, split between six agents that work in parallel, each in its own files.

## 0. Before the agents (coordinator)

The scaffold is in the working tree, **not committed yet** (57 tests green, goldens identical):

- `src/game/places.ts` split into `src/game/places/{market,dealers,vet,girlfriend,den,club,gym}.ts`
  plus `places/shop.ts` (shop lines, `affordable`); `gainExp` moved to `hero.ts`;
  the walk moved out of `main.ts` into `src/game/walk.ts`.
- `src/game/view.ts`: `View<E>` = `{ events: Record<E['type'], true>, show(event) }`.
- `fightView`, `aftermathView`, `beerView` are `View`s; beer is no longer part of `FightEvent`.
- An empty view per part, to be filled by the agents: `places/<place>-view.ts`, `walk-view.ts`,
  `main-view.ts`, `encounters-view.ts`, `hero-view.ts`, `enemy-view.ts`, `start-view.ts`, each
  with `export type <Part>Event = never` and `export const <part>View: View<<Part>Event>`.
- `events.ts`: `GameEvent` is the union of every part's event type (already lists all of them).
- `view-layer.ts`: routes an event to the view that lists its type; two views listing the same
  type throw at start-up ("event type X is shown by two views").

Steps:

1. Commit the scaffold on a work branch (`git checkout -b views && git commit`), **not master**.
2. Start the six agents below from `views`, each in its own git worktree (isolation: worktree);
   each runs `vp install` first (a worktree has no `node_modules`).
3. Merge their branches into `views` (see 3), check, show the user, merge to master on approval.

## 1. Rules for every agent

Read `PROJECT_MEMORY.md` (entry point), `PROJECT_ARCHITECTURE.md`, then the worked examples:
`fight.ts` + `fight-view.ts`, `beer.ts` + `beer-view.ts`, `aftermath.ts` + `aftermath-view.ts`,
`events.ts`, `view.ts`, `view-layer.ts`, `commands.ts` (`promptCommand`, `readAnswer`).

- **Logic files print nothing.** No `print`, `println`, `writeLn`, `clrScr`, `textColor`,
  `readKey` for pauses, no `texts.ts` in a logic file. Logic changes the state and says what
  happened with `yield* emit(event)` (`events.ts`). It stays an ordinary Effect with DI
  (`rnd`, `luckAtLeast`, `started`, `Disk`, `halt`, `promptCommand`, `readAnswer`, `readLine`).
- **Events are what happens in the game** (business events), not what to show: `bought`,
  `refused { because }`, `enteredMarket`, not `printLine`. Don't put state into an event that
  the view can read itself (health left, money, names, the district…); the view reads the
  state (`started`) the moment the event is emitted. Put into an event only what the state no
  longer knows (an amount just added, a roll that picked a line, which branch was taken).
- **The view** (`<part>-view.ts`) defines the part's event union (replacing `never`) and its
  `View`: `events` lists every type, `show` turns an event into the original's lines, colours
  and key pauses (`readKey` after a line is presentation and belongs here). Menus and hints
  that only depend on the state (e.g. the shop list at the entrance, which offers are shown in
  which district) are computed by the view from the state; the logic emits one event
  (`enteredMarket`). Pure predicates the view needs (e.g. `curious` in the den) may be
  exported from the logic file and imported by the view; formulas must not be duplicated.
- **Prompts:** a place prompt is `promptCommand('<context>')` (its text is in `PROMPTS` of
  `view-layer.ts`, already there). Yes/no: emit the question event, then `readAnswer`.
  Free text (names): emit, then `readLine`.
- **Behaviour must not change.** `test/gold/*.jsonl` must pass **unchanged**: same lines,
  colours, order, key reads and number of `Random` calls, same final state. Emit exactly where
  the original printed (the view reads the state at that moment), keep every `rnd` /
  `luckAtLeast` in the same order. Do not re-record goldens. If something cannot be done
  without changing a golden, stop and report it instead.
- **Event type names must be unique in the whole game** (the view layer throws otherwise).
  Already taken:
  - fight: `greeting fightStarted crowdGathered crowdShout kick anotherKick cantRun fled
    fledUnranked backupArrived backupRefused backupComing backupAlreadyHere backupKicked
    backupBeaten backupFedUp shotForbidden outOfBullets shotMissed shotHit bailedOut stats
    enemyInfo jointRefused smoked`
  - aftermath: `heroDied killedByRector rectorKilled fakeRectorKilled enemyDied levelEarned exp
    tooWeak spoils denOpened ringDropped joints found denHelped`
  - beer: `cantDrink notThirsty drank noBeer drankUntilHealthy beerRanOut`
  - `prompt`

  Name new types specifically, with the part in the name where it could clash
  (`marketBought`, `gymTrained`, `vetPatchedUp`, `walkTrailToggled`, `startSaveLoaded`…).
- **Stay in your files.** Don't edit `events.ts`, `view-layer.ts`, `view.ts`, `texts.ts`,
  `commands.ts`, `places/shop.ts`, the fight/aftermath/beer files or another agent's files.
  Exported names other parts call must keep their names and signatures (listed per agent).
  If you need a change elsewhere, write it in your report instead.
- **Style:** read like the surrounding code (short English doc comments, `sic:` for original
  quirks, `i16`/`u8` wrapping, `attr`/`inc` for attributes, `battle(st)` for the enemy).
- **Checks before you finish:** `vp fmt`, `vp lint` (no new warnings in your files),
  `npx tsc --noEmit -p .` (only the known capstone error), `vp test` (all green, goldens
  identical). Commit on your worktree's branch with a short message (no conventional commits,
  no co-authors). Don't push, don't touch master.
- **Report:** the events you added (type → when), anything you couldn't move and why, any change
  you need in a file you don't own.

## 2. The agents

### A — market and dealers

Files: `places/market.ts`, `places/market-view.ts`, `places/dealers.ts`,
`places/dealers-view.ts`; `src/game/places.spec.ts` (keep its assertions on lines/state).
Keep exported: `market`, `dealers`.

- Entrance: the offer list (`offer`/`offerShowing` from `shop.ts`, district conditions, the
  silencer line with the bullets price — `sic`) becomes the view of `enteredMarket` /
  `enteredDealers`; `shop.ts` stays as it is and the views call it.
- Every purchase branch: emit what happened (bought / which refusal), the view prints.
- `pickpocket`: the luck checks and `rnd` stay in order; money found → event; caught → the
  encounter (`encounter`, `spawnEnemy`, `emit({ type: 'greeting', by: 'caughtStealing' })`,
  `fight`, `settle`) stays as is; the "менты" line and the heat → events.
- `sellStuff`: a question per spare thing → event, then `readAnswer`; the price roll
  (`rnd(spread)`) stays **after** the answer like now; sold → event with the price.

### B — vet, girlfriend, den

Files: `places/vet.ts`, `places/vet-view.ts`, `places/girlfriend.ts`,
`places/girlfriend-view.ts`, `places/den.ts`, `places/den-view.ts`.
Keep exported: `vet`, `girlfriend`, `den`.

- Vet: the entrance (price lines coloured by `affordable` — import it from `shop.ts` in the
  view), patch-up (the `rnd(3)` doctor's line: emit the roll), fixed bones, refusals.
- Den: the entrance hints depend on `rel`/`curious`/respect/quests — export the predicates
  from `den.ts`, the view decides; treat/borrow/respect/ask/help (the help fight is an
  `encounter` that stays)/`job` (luck checks in order, cops = `encounter` with `spawnEnemy(2)`).

### C — club and gym

Files: `places/club.ts`, `places/club-view.ts`, `places/gym.ts`, `places/gym-view.ts`.
Keep exported: `club`, `gym`.

- Club: entrance, disco, cheat tricks, `playCards` (bet changes, winning/losing, caught
  cheating: the encounter stays; exp + `levelUp(false)` stay calls, they print through the hero
  part); keep `playCards` returning `{ bet, thrownOut }`.
- Gym: the trained armour (`press`) is computed from the state; the menu depends on it and the
  district — the view can compute it with an exported helper from `gym.ts`; each training emits
  what was raised.

### D — walk, main, encounters

Files: `walk.ts`, `walk-view.ts`, `main.ts`, `main-view.ts`, `encounters.ts`,
`encounters-view.ts`.
Keep exported: `mainLoop`, `walk`, `saveMage`, `temple`.

- Walk: the rolled event (`roll`/`event`), the trail toggle (TRAIL_IN/OUT lines are view),
  stoned wear-off line, dealer phone calls, heat calls, `prettyGirl` (`readAnswer`),
  `meetSomeone` (the encounter stays; the "идёт …" questions → events + `readAnswer`; the cop
  branch), `nothingHappens` (the stoned glitch: its question → event, then `readLine` whose
  answer goes nowhere; then "Чё за ботва" → event).
- Main: `nextDistrict` (the save question → event, `readAnswer`, the save → `Disk.write` stays,
  "сохранено" → event), `MAIN_COMMANDS` entries that only print (`oldFight`, `kick`, `shoot`,
  `version`, `commands` list) → events, `rename` (prompt → event, `readLine`), `exit` (results →
  events; `showStats`, `readKey`, `halt` — the results screen is view). `help` (screens.ts) is
  agent F's; keep calling it.
- Encounters: the temple (blessing roll, its key pauses are view, the ring via `nextRing`/`take`
  stays logic, `ringLines` is hero's helper — the view may import it), Рушель Блаво (question,
  `readAnswer`, the save).

### E — hero and enemy

Files: `hero.ts`, `hero-view.ts`, `enemy.ts`, `enemy-view.ts`; `hero.spec.ts`, `enemy.spec.ts`.
Keep exported (others call them): `showStats`, `showEnemy`, `levelUp(rector)`, `gainExp(n)`,
`strengthUp`, `take`, `ringLines`, `healthColor`, `accuracy`, `beerTenths`, `levelDown`,
`levelInDistrict`, `DEN_LEVEL`, `encounter`, `spawnEnemy`, `setupRector`.

- `levelUp`: the stat picks, the history and the level are logic; every "Понтовость
  увеличивается: …" / "Сила +1" line and the level-up pause → events. Same for `strengthUp`,
  `gainExp` ("Ты получаешь # качков опыта").
- `showStats` and `showEnemy` are pure presentation, called by the fight view, the aftermath
  view and main's `s`: move their bodies into `hero-view.ts` / `enemy-view.ts` but keep
  `showStats` / `showEnemy` exported from `hero.ts` / `enemy.ts` (re-export) so nobody else has
  to change; the coordinator moves the imports after the merge.
- `spawnEnemy` / `setupRector` print nothing today; leave their Random order alone.

### F — start and screens

Files: `start.ts`, `start-view.ts`, `screens.ts`; `start.spec.ts`.
Keep exported: `newGame`, `resetPlaces`, `titleScreen`, `gameOver(won)`, `victoryAnimation`,
`help`.

- `newGame`: the title, the saves list (`Disk.list`), the key choice (`readKey` here is
  **input**, not a pause — keep it in the logic), loading (`decodeSave`, `loadPlaces`) → events,
  the story pages (pauses are view), `createCharacter` (name: event + `readLine`; type menu:
  event + `readType`; the class bonuses), `arrive` (the district intro and starting bonuses).
- `screens.ts` is already presentation; `gameOver(won)` and `victoryAnimation` are called from
  the aftermath and must keep their signatures (an Effect that ends the game). They may become
  "emit, then `halt`" with the art in `start-view.ts`; `victoryAnimation` polls the keyboard
  (`keyPressed`, `delay`) — that stays in the view.

## 3. Merging (coordinator)

1. Merge A, B, C, D, E, F into `views` one by one; the files don't overlap, so no conflicts are
   expected; after each merge: `npx tsc --noEmit -p .`, `vp test`.
2. Event type clashes show up at start-up ("shown by two views"): rename in one of the parts.
3. Move the `showStats` / `showEnemy` imports (fight view, aftermath view, main) to the hero and
   enemy views; drop the re-exports.
4. `vp fmt`, `vp lint` (the `never` stub warnings in `events.ts` must be gone), full tests,
   goldens identical (no re-record).
5. `grep -n "println\|print(\|writeLn\|readKey\|clrScr\|texts'" src/game/*.ts src/game/places/*.ts`
   — only `*-view.ts`, `view-layer.ts`, `screens.ts`, `prelude.ts` may match (and `readKey` as
   input in `start.ts`).
6. Update `PROJECT_MEMORY.md` (every part is logic + view now), show the user, merge to master
   on approval.

## 4. Prompt template for an agent

> You work on gopnik.ts (`/Users/eduardlepner/Documents/projects/study/gopnik.exe`, a TypeScript
> port of a DOS game) in your own git worktree based on branch `views`. Run `vp install` first.
> Read `VIEWS_PLAN.md` sections 1 and 2 — you are agent **<A–F>**; do exactly your part,
> following the rules of section 1 (logic emits business events, the view reacts; goldens must
> stay identical; stay in your files). Finish with the checks of section 1, commit on your
> branch, and report as section 1 says.
