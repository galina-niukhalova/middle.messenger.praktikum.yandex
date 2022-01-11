function classnames(...names) {
  const className = [];
  for (let name of names) {
    if (typeof name === 'string') {
      className.push(name);
    } else {
      Object.keys(name).forEach(key => {
        if (name[key]) {
          className.push(key);
        }
      });
    }
  }

  return className.join(' ');
}

export default classnames;