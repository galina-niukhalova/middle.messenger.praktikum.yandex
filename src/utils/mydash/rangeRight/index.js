import range from 'utils/mydash/range';

function rangeRight(start, end, step) {
  return range(start, end, step, true);
}


let start, end, step;
let result = [];

if (args.length === 1) {
  start = 0;
  end = args[0];
  step = end > 0 ? 1 : -1;
} else {
  [start, end, step = 1] = args;
}

for (let i = end - step; i !== start - step; i -= step) {
  result.push(i);
}

return result;
}

export default rangeRight;