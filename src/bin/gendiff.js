#!/usr/bin/env node
import commander from 'commander';
import gendiff from '..';

commander
  .version('1.6.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'ordinary')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second, option) => console.log(gendiff(first, second, option.format)))
  .parse(process.argv);
