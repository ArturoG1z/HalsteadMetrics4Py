import IToken from '../models/token';
import { getTokensWithRegex, removeTokensFromFromLines } from './tools';
import { regex4NumericalOperands } from './operands';

const getNumberOperands = (lines: string[], operands: IToken[]): [string[], IToken[]] => {
  regex4NumericalOperands.forEach((regex: RegExp) => {
    operands = getTokensWithRegex({
      lines,
      regex,
      tokens: operands,
      type: 'number',
    });
    lines = removeTokensFromFromLines(lines, regex);
  });
  return [lines, operands];
};

export default getNumberOperands;
