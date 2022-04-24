import trim from '.';

describe('trim', () => {
  test('should trim a default value - white space', () => {
    expect(trim('  abc  ')).toEqual('abc');
  });

  test('should trim custom characters', () => {
    expect(trim('-_-abc-_-', '_-')).toEqual('abc');
  });

  test('should trim a white space and custom characters', () => {
    expect(trim('-_-ab c -_-', '_-')).toEqual('ab c');
  });
});
