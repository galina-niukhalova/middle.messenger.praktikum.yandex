import isArray from '../isArray';
import isObject from '../isObject';

function isArrayOrObject(value: unknown): value is PlainObject {
  return isObject(value) || isArray(value);
}

function cloneDeep<T extends object = object>(obj: T) {
  const result = (isArray(obj) ? [] : {}) as T;

  for (const key in obj) {
    const value = obj[key];

    result[key] = isArrayOrObject(value) ? cloneDeep(value) : value;
  }

  return result;
}

export default cloneDeep;
