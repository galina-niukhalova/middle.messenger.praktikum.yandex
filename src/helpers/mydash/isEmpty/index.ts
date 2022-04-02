function isEmpty(value: unknown) {
  if (value && typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) return value.size === 0;

    return Object.keys(value).length === 0;
  }

  if (typeof value === 'string') {
    return value === '';
  }

  return true;
}

export default isEmpty;
