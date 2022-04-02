import range from 'helpers/mydash/range';

function rangeRight(start: number, end: number, step: number) {
  return range(start, end, step, true);
}

export default rangeRight;
