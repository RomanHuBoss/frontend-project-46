import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'path';

const getFileData = (filepath) => {
  const realPath = (filepath[0] !== '/') ? path.resolve(filepath) : filepath;

  try {
    return fs.readFileSync(realPath, 'utf8');
  } catch (err) {
    console.error(err);
  }

  return null;
};

const getFileExtension = (filepath) => filepath.split('.').pop();

const gendiff = (filepath1, filepath2) => {
  const rawFileData1 = getFileData(filepath1);
  const rawFileData2 = getFileData(filepath2);

  if (getFileExtension(filepath1) === 'json') {
    const json1 = JSON.parse(rawFileData1);
    const json2 = JSON.parse(rawFileData2);

    const allKeysSorted = [...new Set(Object.keys(json1).concat(Object.keys(json2)))].sort();

    const result = ['{'];
    const value1 = json1[key];
    const value2 = json2[key];

    allKeysSorted.forEach((key) => {
      if (value1 !== undefined && value2 !== undefined) {
        if (value1 === value2) {
          result.push(`${key}: ${value1}`);
        } else {
          result.push(`- ${key}: ${value1}`);
          result.push(`+ ${key}: ${value2}`);
        }
      } else if (value1 !== undefined && value2 === undefined) {
        result.push(`- ${key}: ${value1}`);
      } else if (value1 === undefined && value2 !== undefined) {
        result.push(`+ ${key}: ${value2}`);
      }
    });

    result.push('}');
    return result.join('\n');
  }

  return null;
};

// разбор командной строки
((program) => {
  program
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output format')
    .action(() => gendiff(...program.processedArgs));

  program.parse();

  return program.processedArgs;
})(new Command());

export default gendiff;
