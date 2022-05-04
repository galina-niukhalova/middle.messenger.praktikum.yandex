function trim(input: string, replaceValue = ' '): string {
  const regexpBegin = new RegExp(`^[${replaceValue}\\s]+`);
  const regexpEnd = new RegExp(`[${replaceValue}\\s]+$`);
  const output = input.replace(regexpBegin, '').replace(regexpEnd, '');

  return output;
}

export default trim;
