function baseRange(start, end, step, isRight) {
  let result = [];

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

function range(start, end, step, isRight) {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  step = step === undefined ? (end > start ? 1 : -1) : step;
  return baseRange(start, end, step, isRight);
}

export default range;
