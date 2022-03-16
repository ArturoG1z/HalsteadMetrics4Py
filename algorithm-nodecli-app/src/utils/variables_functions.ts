import IToken from '../models/token';
import { getTokensWithRegex, removeTokensFromFromLines, strWithoutQuotes } from './tools';
import { validVarAndFuncOperandsRegex } from './operands';

const areAnyRemainingInvalidWords = (lines: string[], errors: string[]): string[] => {
  let remainingWords = lines.join(' ').split(' ');
  if (remainingWords.length > 0) {
    errors = [
      ...errors,
      `Invalid remaining words: ${remainingWords.join(', ')}`,
    ];
  }
  return errors;
};

const getVarAndFuncOperands = (lines: string[], operands: IToken[], errors: string[]): [string[], IToken[], string[]] => {
	getTokensWithRegex({
		lines,
		regex: validVarAndFuncOperandsRegex,
		tokens: operands,
		type: 'string',
	});
	lines = removeTokensFromFromLines(lines, validVarAndFuncOperandsRegex);
  errors = areAnyRemainingInvalidWords(lines, errors);
	return [[], operands, errors];
};

export default getVarAndFuncOperands;
