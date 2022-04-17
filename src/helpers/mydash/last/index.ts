function last(list: unknown[]) {
  if (!Array.isArray(list)) return undefined;
  if (!list.length) return undefined;

  return list[list.length - 1];
}

export default last;
