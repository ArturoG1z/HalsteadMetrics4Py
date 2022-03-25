import { IToken } from '../../models/interfaces/interfaces';
import { findThenSubsOcurrIfEmptyDelete, getTokensWithRegex, removeTokensFromFromLines } from '../tools';
import { WordOperator, wordOperatorsAndThenPoints } from '../list-and-regex/operators';

const getWordsAndPointOperators = (
  lines: string[],
  operators: IToken[]
): [string[], IToken[], number] => {
  const objIfIsFuncToken = {
    isFunction: false,
    subsCountFromParentesisOcurrs: 0
  };
  wordOperatorsAndThenPoints.forEach(
    (
      operatorObj: WordOperator,
      index
    ) => {
      objIfIsFuncToken.isFunction = operatorObj.isFunction;
      getTokensWithRegex({
        lines,
        regex: operatorObj.regex,
        tokens: operators,
        type: operatorObj.type,
        objIfIsFuncToken
      });
      lines = removeTokensFromFromLines(lines, operatorObj.regex);
    }
  );
  findThenSubsOcurrIfEmptyDelete(
    '(...)',
    operators,
    'parenthesis',
    objIfIsFuncToken.subsCountFromParentesisOcurrs,
  );
  return [lines, operators, objIfIsFuncToken.subsCountFromParentesisOcurrs];
};

export default getWordsAndPointOperators;
