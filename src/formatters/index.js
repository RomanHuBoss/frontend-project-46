import formatStylish from './stylish.js';
import plainStylish from './plain.js';

const formatter = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return plainStylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(
        `The ${formatName} format is supported.\n supported fornmats: stylish, plain, json`,
      );
  }
};
export default formatter;
