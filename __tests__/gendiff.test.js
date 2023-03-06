import fs from 'fs';
import gendiff from '../src';

test.each([
  ['beforeSimple.json', 'afterSimple.json', 'expectedSimple'],
  ['beforeSimple.yml', 'afterSimple.yml', 'expectedSimple'],
  ['beforeSimple.ini', 'afterSimple.ini', 'expectedSimple'],
  ['beforeTree.json', 'afterTree.json', 'expectedTree'],
  ['beforeTree.yml', 'afterTree.yml', 'expectedTree'],
  ['beforeTree.ini', 'afterTree.ini', 'expectedTree'],
  ['beforeSimple.json', 'afterSimple.json', 'expectedSimplePlain', 'plain'],
  ['beforeSimple.yml', 'afterSimple.yml', 'expectedSimplePlain', 'plain'],
  ['beforeSimple.ini', 'afterSimple.ini', 'expectedSimplePlain', 'plain'],
  ['beforeTree.json', 'afterTree.json', 'expectedTreePlain', 'plain'],
  ['beforeTree.yml', 'afterTree.yml', 'expectedTreePlain', 'plain'],
  ['beforeTree.ini', 'afterTree.ini', 'expectedTreePlain', 'plain'],
])(
  'gendiff(%s, %s)',
  (first, second, expected, format = 'ordinary') => {
    const pathOfTests = '__tests__/__fixtures__/';
    expect(gendiff(`${pathOfTests}${first}`, `${pathOfTests}${second}`, format))
      .toBe(fs.readFileSync(`${pathOfTests}${expected}`, 'utf-8').trim());
  },
);
