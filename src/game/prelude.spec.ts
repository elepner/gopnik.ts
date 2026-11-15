import { describe, expect, expectTypeOf, it } from '@effect/vitest';
import { Effect } from 'effect';

import { check } from '../../test/check';
import { testGame } from '../../test/layers';
import { Game, print, println } from './prelude';
import { blue, type Color, green, paint, plain, red, text, type Text, white } from './text';
import { FIGHT, HERO } from './texts';

const transcript = Effect.map(Game, (g) => g.transcript);

function run<A, E, R>(eff: Effect.Effect<A, E, R>) {
  return eff.pipe(Effect.provide(testGame().layer)) as Effect.Effect<A, E>;
}

describe('text DSL', () => {
  it('compiles colours to the original codes and numbers to Print arguments', () => {
    expect(green`Ты пнул на ${7}з, осталось ${-3}`).toEqual({
      format: '^2Ты пнул на #з, осталось #',
      args: [7, -3],
    });
    expect(text(plain`Сл:`, blue`${5}`, white` Лв:`, paint('yellow')`${2}`)).toEqual({
      format: 'Сл:^1#^7 Лв:^6#',
      args: [5, 2],
    });
  });

  it('splices strings verbatim, like the original concatenation (codes in names included)', () => {
    expect(red`Блин! это же ${'^7 Вася'}`.format).toBe('^4Блин! это же ^7 Вася');
  });

  it('texts are typed functions of their parameters', () => {
    expectTypeOf(FIGHT.tyPnulVragaNa).parameters.toEqualTypeOf<[number, number]>();
    expectTypeOf(HERO.zdorove).parameters.toEqualTypeOf<[Color, number, number, Text]>();
    // @ts-expect-error a string where a number is expected
    void FIGHT.tyPnulVragaNa('пять', 1);
    // @ts-expect-error a colour must be a colour name
    void HERO.zdorove('2', 1, 2, text());
  });

  it('literal parts must not contain the format characters', () => {
    expect(() => green`100#`).toThrow();
  });
});

describe('Print / PrintLn (segment 0EED)', () => {
  it.effect('colour codes split the text into segments, # takes integer arguments', () =>
    run(
      Effect.andThen(println(text(green`Ты пнул на ${7}з, `, red`осталось ${-3}`)), transcript)
    ).pipe(
      check((t) =>
        t.toEqual([
          {
            text: '^2Ты пнул на #з, ^4осталось #',
            args: [7, -3],
            newline: true,
            segments: [
              { color: 10, text: 'Ты пнул на 7з, ' },
              { color: 12, text: 'осталось -3' },
            ],
          },
        ])
      )
    )
  );

  it.effect('a # inside a spliced name consumes the next number, like the original', () =>
    run(Effect.andThen(print(plain`Имя: ${'Вася#'} (${1})`), transcript)).pipe(
      check((t) =>
        t.toMatchObject([{ text: 'Имя: Вася# (#)', segments: [{ text: 'Имя: Вася1 (0)' }] }])
      )
    )
  );

  it.effect('a ^ that is not a colour code stays in the text', () =>
    run(Effect.andThen(print(plain`a${'^9b^'}`), transcript)).pipe(
      check((t) => t.toMatchObject([{ segments: [{ color: 15, text: 'a^9b^' }] }]))
    )
  );
});
