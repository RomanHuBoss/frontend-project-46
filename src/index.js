import { cwd } from 'node:process';
import fs from 'fs';
import { resolve, extname } from 'node:path';
import parsesFile from './parsers.js';
import getTree from './getTree.js';
import formatter from './formatters/index.js';

const getFullFilePath = (filepath) => resolve(cwd(), filepath);

const getFormat = (filepath) => extname(filepath).substring(1);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathFile1 = getFullFilePath(filepath1);
  const pathFile2 = getFullFilePath(filepath2);

  const dataFile1 = readFile(pathFile1);
  const dataFile2 = readFile(pathFile2);

  const formatFile1 = getFormat(filepath1);
  const formatFile2 = getFormat(filepath2);

  const informationDiff = getTree(
    parsesFile(dataFile1, formatFile1),
    parsesFile(dataFile2, formatFile2),
  );

  return formatter(informationDiff, formatName);
};

export default gendiff;
