import isObject from './mydash/isObject';
import isArray from './mydash/isArray';

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

function isArrayOrObject(value: unknown): value is PlainObject {
  return isObject(value) || isArray(value);
}

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)));
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
    }
  }

  return result;
}

function queryStringify(data: PlainObject) {
  if (!isObject(data)) {
    throw new Error('input must be an object');
  }

  return getParams(data).map((arr) => arr.join('=')).join('&');
}

export default queryStringify;
