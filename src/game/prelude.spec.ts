import { describe, expect, expectTypeOf, it } from '@effect/vitest';
import { Effect } from 'effect';

import { check } from '../../test/check';
import { testGame } from '../../test/layers';
import { fmt, Game, print, println, type PrintArgs } from './prelude';

const transcript = Effect.map(Game, (g) => g.transcript);

function run<A, E, R>(eff: Effect.Effect<A, E, R>) {
  return eff.pipe(Effect.provide(testGame().layer)) as Effect.Effect<A, E>;
}

describe('Print / PrintLn (segment 0EED)', () => {
  it('derives argument types from the format literal', () => {
    expectTypeOf<PrintArgs<'Здоровье #/#'>>().toEqualTypeOf<[number, number]>();
    expectTypeOf<PrintArgs<'^$Это $ # уровня$'>>().toEqualTypeOf<
      [string, string, number, string]
    >();
    expectTypeOf<PrintArgs<'просто текст'>>().toEqualTypeOf<[]>();
    expectTypeOf<PrintArgs<string>>().toEqualTypeOf<readonly (number | string)[]>();
    // @ts-expect-error a string where # wants a number
    void println('# руб.', 'пять');
    // @ts-expect-error a missing argument
    void println('#/#', 1);
  });

  it.effect('colour codes split the text into segments, # takes integer arguments', () =>
    run(Effect.andThen(println('^2Ты пнул на #з, ^4осталось #', 7, -3), transcript)).pipe(
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

  it.effect('$ is spliced before parsing, so a # inside the splice consumes a number', () =>
    run(Effect.andThen(print('Имя: $ (#)', 'Вася#', 1), transcript)).pipe(
      check((t) =>
        t.toMatchObject([{ text: 'Имя: Вася# (#)', segments: [{ text: 'Имя: Вася1 (0)' }] }])
      )
    )
  );

  it.effect('a ^ that is not a colour code stays in the text', () =>
    run(Effect.andThen(print('a^9b^'), transcript)).pipe(
      check((t) => t.toMatchObject([{ segments: [{ color: 15, text: 'a^9b^' }] }]))
    )
  );

  it('fmt splices strings only', () => {
    expect(fmt('^$Здоровье #/# $', '2', '  ')).toBe('^2Здоровье #/#   ');
  });
});
