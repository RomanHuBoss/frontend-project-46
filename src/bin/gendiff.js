import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'path';

const getFileData = (filepath) => {
  if (filepath[0] !== '/') {
    filepath = path.resolve(filepath);
  }

  try {
    return fs.readFileSync(filepath, "utf8");
  } catch (err) {
    console.error(err);
  }
};

const getFileExtension = (filepath) => {
  return filepath.split('.').pop();
};

const gendiff = (filepath1, filepath2) => {
  const rawFileData1 = getFileData(filepath1);
  const rawFileData2 = getFileData(filepath2);

  if (getFileExtension(filepath1) === 'json') {
    JSON.parse(rawFileData1);
  }

  console.log(rawFileData1);
  console.log(rawFileData2);
};


//разбор командной строки
((program) => {
  
  program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action(() => {
    gendiff(...program.processedArgs);
  });

  program.parse();  
  
  return program.processedArgs;

})(new Command());

export default gendiff;

