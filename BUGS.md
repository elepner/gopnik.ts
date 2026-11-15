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

7. ~~Selling items keeps their bonuses~~ — not a bug. Dealers `wes` (`0000:CEE2`) only buy the
   worse of two things (the suit next to the Adidas, the shoes next to the cool boots, the
   jacket next to the cool one, the knuckles next to any better weapon, the club next to a knife
   or a cleaver, the knife next to a cleaver). Bonuses are added as differences, so the total
   already equals the better thing alone (jacket +2, cool jacket +2 more = 4, as the cool jacket
   alone): keeping it after the sale is right. The market won't sell the worse clothes again
   ("у тебя есть круче"); the trouble is the weapons that come back, see 15 and 16.

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

16. **Endless damage: sell a weapon, get it back** — dealers `wes` (`0000:D110`) buy the worse
    weapon and keep its bonus, which is right (bug 7), but the weapon can come back and add again:
    - knuckles (`0000:CB5B`): with a better weapon in hand they sell for 13..20 roubles and the
      dealers sell them again for 25 with +2 (bug 15): +2 min and max damage for 5..12 roubles a
      round, with no limit;
    - the club (`0000:CC56`): the dealers sell it again unless a knife and a cleaver are both in
      hand; with the knuckles kept it adds +2 again: a round with a knife costs 11..25 roubles;
    - the knife: sold next to a cleaver, it can be found on a maniac again; with the cleaver and
      the knuckles but no club the broken arithmetic of bug 6 adds +4 again.
    Found knuckles and a found club next to a better weapon rightly add nothing.

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

## Weapon bugs reproduced on the original

Bugs 5, 15 and 16 were played on the emulated G.EXE (`oracle/`, Random patched to the port's
generator) and on the port with the same keys: both went step by step the same way (screen,
state, Random). The hero is the `save5` golden session's one, moved to district 4, level 35,
the dealers known and 1000 roubles; the state was written with the port's codec as
`SAVE_R0.SAV` + `PLACES.SAV` and loaded with the menu key `0` (only save 0 loads the known
places; a district 5 save starts the rector's fight at once). Damage starts at 57–102.

| scenario | keys after `bmar` | damage in the original | money |
| --- | --- | --- | --- |
| 15/16: knuckles next to a club, three rounds of selling and buying them back | `wes` `y` `5` ×3 | 57–102 → 59–104 → 61–106 → 63–108 | 1000 → 971 |
| 15: knuckles bought with a club in hand | `5` | 57–102 → 59–104 | −25 |
| 16: a club bought next to a knife (knuckles kept), then sold and bought back three times | `6`, then `wes` `n` `y` `6` ×3 | 57–102 → 59–104 → … → 65–110 | 1000 → 895 |
| 5: a club bought without knuckles | `6` | 57–102, unchanged | −50 |

The original says "Ты продал кастет за #." and "Ты купил кастет смотри чтоб менты с ним не
запалили." on every round, and the damage grows by 2 each time.

The knife and cleaver come only from maniacs, so for bugs 6, 16 and 17 the save was rigged and
the seed searched: the trail on (stronger enemies, more maniacs), luck 500 (both loot checks
pass), damage 300–400 (one kick kills) and the weapons of the scenario in hand. The keys repeat
`w` `y` `k` `k` (walk, pick on him, kick); seeds were tried on the port until a maniac dropped
the wanted weapon with nothing else found before it, then the same seed and keys were played on
the original:

| scenario | seed, keys | damage in the original | should be |
| --- | --- | --- | --- |
| 6/17: a knife in hand, a maniac drops a cleaver | 35, `w y k k` ×3 | 300–400 → 310–410 (+10) | +3 (9 − 6) |
| 17: a found club in hand, a maniac drops a knife | 9, `w y k k` | 300–400 → 306–406 (+6) | +2 (6 − 4) |
| 16: a cleaver and knuckles, the knife sold, a maniac drops a knife again | 1, `w y k k` ×5 | 300–400 → 304–404 (+4) | 0 |

Each time the original says "Ты нашел тесак(урон+9)!!! - ужасное оружие." or "Ты нашел
ножик(урон+6).", and the port goes the same way step by step. (A club with knuckles, then a knife,
adds a correct +2: the search first hit that one when a lad dropped knuckles before the maniac.)
