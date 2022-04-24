import queryStringify from './queryStringify';

describe('queryStringify', () => {
  // test('should work with primitives', () => {
  //   expect(queryStringify({
  //     key: 1,
  //     key2: 'test',
  //     key3: false,
  //     key4: true,
  //   })).toEqual('key=1&key2=test&key3=false&key4=true');
  // });

  // test('should work with arrays', () => {
  //   expect(queryStringify({
  //     key5: [1, 2, 3],
  //   })).toEqual('key5[0]=1&key5[1]=2&key5[2]=3');
  // });

  test('should work with objects', () => {
    // expect(queryStringify({
    //   key6: { a: 1 },
    // })).toEqual('key6[a]=1');

    expect(queryStringify({
      key7: { a: { b: 2 } },
    })).toEqual('key7[a][b]=2');
  });
});
