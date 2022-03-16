import IToken from '../models/token';
import { getTokensWithRegex, removeTokensFromFromLines } from './tools';
import { symbolsRegex } from './operators';

const getSymbolOperators = (lines: string[], operands: IToken[]): [string[], IToken[]] => {
  symbolsRegex.forEach((regex: RegExp, index) => {
    getTokensWithRegex({
      lines,
      regex,
      tokens: operands,
      type: 'symbol',
    });
    lines = removeTokensFromFromLines(lines, regex);
  });
  return [lines, operands];
};

export default getSymbolOperators;
