import IToken from '../models/token';
import { lineNotEmpty, reduceSpaces, strWithoutQuotes } from './tools';
import { findStringOnOperands, stringRegex } from './operands';

const getStringOperands = (lines: string[]): IToken[] => {
  let operands: IToken[] = [];
  let matches: RegExpMatchArray[];
  lines.forEach(line => {
    matches = [...line.matchAll(stringRegex)];
    matches.forEach(match => {
      // getting substring without first and last characters that are the quotes
      const value = strWithoutQuotes(match[0]);
      const operand = findStringOnOperands(value, operands);
      if (operand) {
        operand.ocurrencies++;
      } else {
        operands.push({
          id: operands.length + 1,
          value: match[0],
          ocurrencies: 1,
          type: 'string',
        });
      }
    });
  });
  return operands;
}

const removeStrings = (lines: string[]): string[] => {
	return lines
		.map(line => line.replace(stringRegex, ' '))
    .map(reduceSpaces)
    .filter(lineNotEmpty);
};

const getAndRemoveStringsOperands = (lines: string[]): [string[], IToken[]] => {
  const operands = getStringOperands(lines);
  lines = removeStrings(lines);
	return [lines, operands];
};

export default getAndRemoveStringsOperands;
