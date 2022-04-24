import isObject from '../isObject';

function merge(lhs: Indexed, rhs: Indexed) {
  const output = lhs;

  if (isObject(lhs) && isObject(rhs)) {
    Object.keys(rhs).forEach((key) => {
      if (isObject(rhs[key])) {
        if (!(key in lhs)) {
          Object.assign(output, { [key]: rhs[key] });
        } else {
          output[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
        }
      } else {
        Object.assign(output, { [key]: rhs[key] });
      }
    });
  }

  return output;
}

export default merge;
