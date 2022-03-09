import { removeCommentsAndSpaces } from './utils/coments_spaces';
import { promises as fs } from 'fs';
import path from 'path';
import IToken from './models/token';
import getAndRemoveStringsOperands from './utils/string_processing';
import getNumberOperands from './utils/number_processing';
import getParenthesisAndBracketsOperators from './utils/parentheses_and_brackets';

// const fileName = 'py_examples/Prog303.py';
const fileName = 'py_examples/Prog301.py';
//const fileName = 'py_examples/numeros.py';

const readFile = async (fileName: string) => {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log('================================================');
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

let errors: string[] = [];
let operators: IToken[];
let operands: IToken[];

const restartVariables = () => {
  operators = [];
  operands = [];
  errors = [];
};

const processData = (data: string) => {
  restartVariables();
  let lines = removeCommentsAndSpaces(data);
  [lines, operands] = getAndRemoveStringsOperands(lines);
  [lines, operands] = getNumberOperands(lines, operands);
  [lines, operators, errors] = getParenthesisAndBracketsOperators(lines);
  console.log('===================================================');
  console.log(lines);
  console.table(operands);
  console.table(operators);
  console.table(errors.length > 0 ? errors : 'No errors');
  console.timeEnd('halstead');
};

console.time('halstead');
readFile(fileName)
  .then(processData)
  .catch(err => console.log(err));

//? ver algoritmo de tokenización en algortimo.md
