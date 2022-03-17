import { IToken }from '../../models/interfaces/interfaces';
import { getTokensWithRegex, removeTokensFromFromLines } from '../tools';
import { wordOperatorsAndThenPoints } from '../list-and-regex/operators';

const getWordsAndPointOperators = (lines: string[], operands: IToken[]): [string[], IToken[]] => {
  wordOperatorsAndThenPoints.forEach((operatorObj: { regex: RegExp; type: string }, index) => {
    getTokensWithRegex({
      lines,
      regex: operatorObj.regex,
      tokens: operands,
      type: operatorObj.type,
    });
    lines = removeTokensFromFromLines(lines, operatorObj.regex);
  });
  return [lines, operands];
};

export default getWordsAndPointOperators;
