import isEqual from '.';

describe('isEqual', () => {
  test('should work', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toEqual(true);
    expect(isEqual({ a: { b: { c: 3 } } }, { a: { b: { c: 3 } } })).toEqual(true);
    expect(isEqual({ a: { b: { c: 3 } } }, { a: { c: 3 } })).toEqual(false);
    expect(isEqual({ a: '1', b: '2' }, { b: '2', a: '1' })).toEqual(true);
    expect(isEqual({ a: '1', b: [1, 2, 3] }, { b: [1, 2, 3], a: '1' })).toEqual(true);
  });
});
