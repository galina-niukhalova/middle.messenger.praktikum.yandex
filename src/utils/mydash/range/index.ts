function baseRange(start: number, end: number, step: number, isRight?: boolean) {
  const result = [];

  if (step === 0) {
    return Array(end - 1).fill(start);
  }

  if (!isRight) {
    for (let i = start; i !== end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = end - step; i !== start - step; i -= step) {
      result.push(i);
    }
  }

  return result;
}

function range(start: number, end?: number, step?: number, isRight?: boolean) {
  let newEnd = end;
  let newStart = start;
  let newStep = step;

  if (newEnd === undefined) {
    newEnd = start;
    newStart = 0;
  }

  if (newStep === undefined) {
    newStep = newEnd > newStart ? 1 : -1;
  }
  return baseRange(newStart, newEnd, newStep, isRight);
}

export default range;
