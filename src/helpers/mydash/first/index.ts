function first(array: unknown[]) {
  if (!Array.isArray(array)) return undefined;
  if (!array.length) return undefined;

  return array[0];
}

export default first;
