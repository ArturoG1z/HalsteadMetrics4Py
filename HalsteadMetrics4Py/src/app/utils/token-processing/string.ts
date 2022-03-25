import { IToken }from '../../models/interfaces/interfaces';
import { getTokensWithRegex, removeTokensFromFromLines, strWithoutQuotes } from '../tools';
import { findStringOnOperands, insideStringOperators, stringRegex } from '../list-and-regex/operands';

const getAndRemoveStringsOperands = (lines: string[], operands: IToken[], operators: IToken[]): [string[], IToken[], IToken[]] => {
  getTokensWithRegex({
    lines,
    regex: stringRegex,
    tokens: operands,
    type: 'string',
    findFunction: findStringOnOperands,
    valuePreprossesing: strWithoutQuotes,
    secondaryTokens: operators,
    secondaryType: 'string_formater_operators',
    regexToFindInsideToken: insideStringOperators,
  });
  lines = removeTokensFromFromLines(lines, stringRegex);
  return [lines, operands, operators];
};

export default getAndRemoveStringsOperands;
