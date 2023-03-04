import { Command } from 'commander';

const program = new Command();

program
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format');

program.parse();

const options = program.opts();

const gendiff = (filepath1, filepath2) => {

};

export default gendiff;

