import merge from '.';

describe('merge', () => {
  test('should merge 2 objects correctly', () => {
    expect(merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } }))
      .toEqual({ a: { b: { a: 2, c: 1 } }, d: 5 });
  });
});
