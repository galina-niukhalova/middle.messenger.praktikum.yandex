import set from '.';

describe('set', () => {
  test('should throw an error if path is not a string', () => {
    expect(set({ a: '1' }, 1, 'value')).toEqual('path must be string');
  });

  test('should return object value if initial value is not an object', () => {
    expect(set('I\'m not an object', 'path', 'value')).toEqual('I\'m not an object');
  });

  test('should set correct value to the given path', () => {
    expect(set({ foo: 5 }, 'bar.baz', 10)).toEqual({ foo: 5, bar: { baz: 10 } });
    expect(set(3, 'foo.bar', 'baz')).toEqual(3);
  });
});
