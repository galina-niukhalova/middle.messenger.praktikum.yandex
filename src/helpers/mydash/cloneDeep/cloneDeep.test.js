import cloneDeep from '.';

describe('clone deep', () => {
  test('should work', () => {
    expect(cloneDeep([{ 'a': 1 }, { 'b': 2 }])).toEqual([{ "a": 1 }, { "b": 2 }]);
  });
});
