# Bugs and quirks of the original G.EXE

Found while reverse-engineering `original/g.exe`. The port reproduces every one of them on purpose;
each entry names the original code address and the place in the port.

## Gameplay logic

1. **Running away "bans" you from the den but actually lets you in** — `0000:4A87`,
   `src/game/fight.ts` (`run`). If you are not a Гопник and your level inside the district is
   exactly 3 when you flee, the game prints "Такого конявого непустят в местный притон!" but sets
   `denAccess := 1` (granting access) instead of `0`.

2. **Fight commands overwrite the place's input** — `0000:3D11` reads fight commands into the same
   string (`DS:3A72`) the den/market/club loops test. After a fight started inside the den
   (`hp`, `d`), the remaining checks of that loop iteration (`s`, `a`, `d`, and the `w` exit test)
   see the last fight command, e.g. finishing a fight with `run` leaves the den loop running with
   `run` as input.

3. **Hidden shop items are buyable everywhere** — market `0000:C142`: item 7 (Adidas suit) has no
   district check, so it can be bought in district 1 although it is not listed. Dealers
   `0000:CB47..CD65`: items 5–8 (knuckles, club, pistol, bullets) have no district checks either.

4. **Silencer shows the wrong price** — `0000:C849`: the menu line for the silencer is coloured by
   the silencer price (60) but prints the bullets price (70).

5. **Buying a club without knuckles gives no damage** — `0000:CC56`: the +2 bonus is only applied
   when you already own knuckles (meant as "club replaces knuckles"), so a club bought on its own
   adds nothing. Taking a club from an enemy works correctly.

6. **Knife/cleaver bonuses use broken boolean arithmetic** — `0000:56B6`, `0000:575C`:
   `if (not club) = knuckles then +4` (knife) and `if (not club and not knife) = knuckles then +7`
   (cleaver) compare booleans with `=`, and several bonus branches can stack, so the resulting
   damage depends on the item combination in odd ways.

7. **Selling items keeps their bonuses** — dealers `wes`, `0000:CEE2`: selling the spare suit,
   shoes, jacket, knuckles, club or knife clears the ownership flag but leaves armour/damage as is.

8. **Gym press: menu and purchase conditions disagree** — `0000:E576` lists option 5 while
   `press < district*2`, but `0000:E87F` allows buying while `press < (district-2)*10`.

9. **Den "ask" hint and action disagree** — `0000:D91D` shows "Пацаны хотят тебе кое-чё сказать"
   when `(rel-5)*5 + respect >= 40`, but the `a` command works when `rel*2 + respect >= 40`
   (`rel` = level inside the district).

10. **Club disco/cheats options are checked against the modified input** — after a card game ends in
    a fight the input is forced to `w`, so the club is left immediately (intended), but the same
    applies to items `1`/`2` checks of that iteration (they see `w`).

## Output

11. **Print reads past the end of its string** — `0EED:00B2`: after a trailing `^N` colour code the
    loop examines one byte beyond the string in its stack buffer; if a previous longer string left
    a `#` there, an argument would be printed. The port keeps a persistent 256-byte print buffer to
    behave the same.

12. **Typos are part of the texts** — e.g. "Поновость улутшилась", "слеующей", "Тельзя тут
    стрелять", "косякова", "гушителем", "птронов". They are kept verbatim.

## Integer overflow

13. **Stats and money wrap around at 32767** — all counters are 16-bit `Integer`s. A thief who
    keeps buying luck in the club eventually overflows `luck` into negative numbers; from then
    on every luck check fails (`luck >= Random(n)`), stolen sums use `Random(luck*2)` with the
    wrapped value, and `money` itself can wrap negative after a big theft. The port stores state
    in the original byte layout, so it wraps identically. Note for porting: every luck check of
    the original calls `Random` _before_ comparing, also when the luck is negative.

14. **"Подошли пацаны." after the lads' kicks can never show** — `0000:4DA7`: the lads kick only
    when the backup counter is at least 3; then, with Random(2) = 0, it grows by one and is
    compared with 3 to say the lads arrived. After the increment it is at least 4, so the line is
    dead (the counter goes on towards 7, when the lads get beaten up). Probably the lads were
    meant to arrive on their own once, before the entry condition changed. The port keeps the
    check (`backupKicks`); it costs no Random.

15. **Bought knuckles always add +2** — dealers `0000:CB5B`: the dealers refuse knuckles only to
    a hero holding a club, a knife and a cleaver at once; otherwise the purchase adds +2 to the
    damage, also when a better weapon is already in hand (a club, a knife or a cleaver). Found
    knuckles get it right: they add nothing then.

16. **Endless damage: sell the knuckles, buy them again** — dealers `wes` (`0000:D110`) and
    `0000:CB5B`: with a club (or a knife, a cleaver) in hand, the knuckles are "spare" and sell
    for 13..20 roubles; selling keeps their +2 (bug 7), and buying them back for 25 adds +2 again
    (bug 15). Every round costs 5..12 roubles and gives +2 min and max damage, with no limit.

17. **Weapon damage depends on the order the weapons came in** — bugs 5, 6 and 15 together: the
    intended total is the best weapon in hand (knuckles 2, club 4 "replaces knuckles", knife 6,
    cleaver 9), added as differences; the differences are wrong in 128 of the orders a hero can
    get them in. For example:

    | order | total | best weapon |
    | --- | --- | --- |
    | knife → cleaver (both from maniacs, common) | +16 | +9 |
    | club (found) → cleaver | +16 | +9 |
    | club (found) → knife | +10 | +6 |
    | club (found) → cleaver → knife | +22 | +9 |
    | cleaver → knuckles (bought) | +11 | +9 |
    | club (bought) without knuckles | 0 | +4 |
    | club (bought) → knuckles (found) | 0 | +4 |

    The port keeps what each weapon actually added (`boosts.weapons`), so it plays the same; a
    "fixed" mode could compute the weapons' boost as the best weapon in hand instead.
