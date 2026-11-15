import { describe, expect, expectTypeOf, it } from '@effect/vitest';

import { CMD, type Command, parseCommand } from './commands';

describe('parseCommand', () => {
  it('parses the input with the literals of its context only', () => {
    expect(parseCommand('vet', 'h')).toBe(CMD.vet.patchUp);
    expect(parseCommand('main', 'h')).toBe(CMD.main.beer);
    expect(parseCommand('market', 'h')).toBeUndefined();
    expect(parseCommand('answer', 'Y')).toBeUndefined();
  });

  it('is typed by the context', () => {
    expectTypeOf(parseCommand('club', 'p')).toEqualTypeOf<Command<'club'> | undefined>();
  });
});
