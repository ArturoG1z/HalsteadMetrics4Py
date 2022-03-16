import IToken from '../models/token';
import { getTokensWithRegex, removeTokensFromFromLines, strWithoutQuotes } from './tools';
import { findStringOnOperands, stringRegex } from './operands';

const getAndRemoveStringsOperands = (lines: string[], operands: IToken[]): [string[], IToken[]] => {
  getTokensWithRegex({
    lines,
    regex: stringRegex,
    tokens: operands,
    type: 'string',
    findFunction: findStringOnOperands,
    valuePreprossesing: strWithoutQuotes,
  });
  lines = removeTokensFromFromLines(lines, stringRegex);
  return [lines, operands];
};

export default getAndRemoveStringsOperands;
