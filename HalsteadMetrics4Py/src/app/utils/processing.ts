import { IHalsteadMetrics, IToken } from '../models/interfaces/interfaces';
import { removeCommentsAndSpaces } from './token-processing/coments_spaces';
import getAndRemoveStringsOperands from './token-processing/string';
import getNumberOperands from './token-processing/number';
import getParenthesisAndBracketsOperators from './token-processing/parentheses_and_brackets';
import getSymbolOperators from './token-processing/symbols';
import getWordsAndPointOperators from './token-processing/reserved_words_and_methods';
import getDefReturnOperators from './token-processing/def_return';
import getVarAndFuncOperands from './token-processing/variables_functions';
import getHalsteadMetrics from './token-processing/metric_calculation';

let errors: string[] = [];
let operators: IToken[];
let operands: IToken[];

const restartVariables = () => {
  operators = [];
  operands = [];
  errors = [];
};

const halsteadProcessData = (
  data: string
): {
  operators: IToken[];
  operands: IToken[];
  errors: string[];
  halsteadMetrics: IHalsteadMetrics;
} => {
  restartVariables();
  let lines = [];
  [lines, operators] = removeCommentsAndSpaces(data, operators);
  [lines, operands, operators] = getAndRemoveStringsOperands(
    lines,
    operands,
    operators
  );
  [lines, operands] = getNumberOperands(lines, operands);
  [lines, operators, errors] = getParenthesisAndBracketsOperators(
    lines,
    operators,
    errors
  );
  [lines, operators] = getSymbolOperators(lines, operators);
  [lines, operators] = getWordsAndPointOperators(lines, operators);
  [lines, operators] = getDefReturnOperators(lines, operators, errors);
  [lines, operands, errors] = getVarAndFuncOperands(lines, operands, errors);
  const halsteadMetrics: IHalsteadMetrics = getHalsteadMetrics(
    operators,
    operands
  );
  return { operators, operands, errors, halsteadMetrics };
};

export default halsteadProcessData;
