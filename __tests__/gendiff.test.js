import gendiff, { getFileData, removeSpaces } from '../bin/gendiff.js';

const data = getFileData('__fixtures__/verify_check1.txt');

test('First test', () => {
  const filepath1 = '__fixtures__/file1_check1.json';
  const filepath2 = '__fixtures__/file2_check1.json';

  const checked = removeSpaces(gendiff(filepath1, filepath2));
  const pattern = removeSpaces(data);

  expect(checked).toBe(pattern);
});
