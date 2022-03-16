import { promises as fs } from 'fs';

import { removeCommentsAndSpaces } from './utils/token-processing/coments_spaces';
import getAndRemoveStringsOperands from './utils/token-processing/string';
import getNumberOperands from './utils/token-processing/number';
import getParenthesisAndBracketsOperators from './utils/token-processing/parentheses_and_brackets';
import getSymbolOperators from './utils/token-processing/symbols';
import getWordsAndPointOperators from './utils/token-processing/reserved_words_and_methods';
import getDefReturnOperators from './utils/token-processing/def_return';
import getVarAndFuncOperands from './utils/token-processing/variables_functions';
import getHalsteadMetrics, { IHalsteadMetrics } from './utils/token-processing/metric_calculation';
import { IToken }from './models/interfaces/interfaces';

// const fileName = 'py_examples/Prog303.py';
const fileName = 'py_examples/test.py';
// const fileName = 'py_examples/numeros.py';

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
  [lines, operands] = getAndRemoveStringsOperands(lines, operands);
  [lines, operands] = getNumberOperands(lines, operands);
  [lines, operators, errors] = getParenthesisAndBracketsOperators(lines, operators, errors);
  [lines, operators] = getSymbolOperators(lines, operators);
  [lines, operators] = getWordsAndPointOperators(lines, operators);
  [lines, operators] = getDefReturnOperators(lines, operators, errors);
  [lines, operands, errors] = getVarAndFuncOperands(lines, operands, errors);
  console.log('===================================================');
  console.log('OPERANDS TABLE');
  console.table(operands);
  console.log('OPERATORS TABLE');
  console.table(operators);
  if (errors.length > 0) {
    console.log('ERRORS TABLE');
    console.table(errors);
  } else {
    console.log('No errors found');
  }
  console.log('HALSTEAD METRICS');
  const halsteadMetrics: IHalsteadMetrics = getHalsteadMetrics(operators, operands);
  console.table(halsteadMetrics);
  console.timeEnd('halstead');
};

console.time('halstead');
readFile(fileName)
  .then(processData)
  .catch(err => console.log(err));

//? ver algoritmo de tokenización en algortimo.md
