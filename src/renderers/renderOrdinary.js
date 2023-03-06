import _ from 'lodash';

const getIndent = (depthLevel) => {
  const indent = 2;
  return ' '.repeat(depthLevel * indent);
};

const stringify = (value, depthLevel) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const keys = Object.keys(value);
  const arrValues = keys.map(key => `  ${key}: ${stringify(value[key], depthLevel)}`);
  return `{\n  ${getIndent(depthLevel + 1)}${arrValues.join('\n')}\n${getIndent(depthLevel + 1)}}`;
};

const actions = {
  parent: (data, depth, func) => `${getIndent(depth)}  ${data.key}: {\n${func(data.children, depth + 2)}\n${getIndent(depth + 1)}}`,
  added: (data, depth) => `${getIndent(depth)}+ ${data.key}: ${stringify(data.value, depth)}`,
  deleted: (data, depth) => `${getIndent(depth)}- ${data.key}: ${stringify(data.value, depth)}`,
  unchanged: (data, depth) => `${getIndent(depth)}  ${data.key}: ${stringify(data.value, depth)}`,
  changed: (data, depth) => [`${getIndent(depth)}- ${data.key}: ${stringify(data.valueBefore, depth)}`, `${getIndent(depth)}+ ${data.key}: ${stringify(data.valueAfter, depth)}`],
};

const render = (data) => {
  const renderAst = (ast, depthLevel = 1) => (
    _.flatten(ast.map(item => actions[item.type](item, depthLevel, renderAst)))
      .join('\n')
  );
  return `{\n${renderAst(data)}\n}`;
};

export default render;
