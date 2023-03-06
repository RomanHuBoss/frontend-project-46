const stringify = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildPath = (path, level) => ([...path.split(), level].filter(e => e).join('.'));

const actions = {
  parent: (data, path, func) => func(data.children, buildPath(path, data.key)),
  added: (data, path) => `Property '${buildPath(path, data.key)}' was added with value ${stringify(data.value)}`,
  deleted: (data, path) => `Property '${buildPath(path, data.key)}' was removed`,
  unchanged: () => '',
  changed: (data, path) => `Property '${buildPath(path, data.key)}' was updated. From ${stringify(data.valueBefore)} to ${stringify(data.valueAfter)}`,
};

const render = (data) => {
  const renderAst = (ast, path = '') => (
    ast.map(item => actions[item.type](item, path, renderAst))
      .filter(el => el)
      .join('\n')
  );
  return renderAst(data).trim();
};

export default render;
