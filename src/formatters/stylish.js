import _ from 'lodash';

const spacesCount = 4;
const replacer = ' ';

const getTwoOrSixSpaces = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize - 2);
};

const getFourOrEightSpaces = (depth) => {
  const indentSize = depth * spacesCount;
  return replacer.repeat(indentSize);
};

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const lines = Object.entries(data).map(
    ([key, value]) => `${getFourOrEightSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getFourOrEightSpaces(depth)}}`;
};

const iter = (diff, depth = 1) => diff.map((node) => {
  switch (node.type) {
    case 'deleted':
      return `${getTwoOrSixSpaces(depth)}- ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'added':
      return `${getTwoOrSixSpaces(depth)}+ ${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'changed': {
      return `${getTwoOrSixSpaces(depth)}- ${node.key}: ${stringify(
        node.value1,
        depth,
      )}\n${getTwoOrSixSpaces(depth)}+ ${node.key}: ${stringify(
        node.value2,
        depth,
      )}`;
    }
    case 'unchanged':
      return `${getFourOrEightSpaces(depth)}${node.key}: ${stringify(
        node.value,
        depth,
      )}`;
    case 'nested': {
      const lines = iter(node.children, depth + 1);
      return `${getFourOrEightSpaces(depth)}${node.key}: {\n${lines.join(
        '\n',
      )}\n${getFourOrEightSpaces(depth)}}`;
    }
    default:
      throw new Error(`Unknown type of node '${node.type}'.`);
  }
});

const formatStylish = (tree) => {
  const result = iter(tree, 1);
  return `{\n${result.join('\n')}\n}`;
};
export default formatStylish;
