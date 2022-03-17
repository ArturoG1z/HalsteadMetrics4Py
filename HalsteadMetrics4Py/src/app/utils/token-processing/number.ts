import { IToken }from '../../models/interfaces/interfaces';
import { regex4NumericalOperands } from '../list-and-regex/operands';
import { getTokensWithRegex, removeTokensFromFromLines } from '../tools';

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
