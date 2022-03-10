import IToken from '../models/token';
import 'colors';
import { countAndRemoveFromLines, findThenUpdateOrPush, lineNotEmpty, reduceSpaces } from './tools';
import { regex4NumericalOperands } from './operands';
import { brackets, parenthesis, braces } from './operators';

const titleCaseWord = (word: string): string => {
	if (!word) return word;
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

const getParenthesisAndBracketsOperators = (lines: string[]): [string[], IToken[], string[]] => {
	let operators: IToken[] = [];
	const openAndCloseOperators = [parenthesis, brackets, braces];
	const types = ['parenthesis', 'brackets', 'braces'];
	const strOpenAndCloseOperators = ['(...)', '[...]', '{...}'];
  let errors:string[] = [];
	openAndCloseOperators.forEach((operator, index) => {
		let countPair = operator.map(regex => {
			let count = 0;
			[lines, count] = countAndRemoveFromLines(lines, regex);
			return count;
		});
		if (countPair[0] != countPair[1]) {
      errors = [...errors, `${titleCaseWord(types[index])} are not balanced\n`+
      `Number of ${types[index]} that open  = ${countPair[0]}\n`+
      `Number of ${types[index]} that close = ${countPair[1]}\n`];
		}
		if (countPair[0] === 0 && countPair[1] === 0) return;
		findThenUpdateOrPush({
			value: strOpenAndCloseOperators[index],
			valueToPush: strOpenAndCloseOperators[index], 
			tokens: operators,
			type: types[index],
			ocurrencies: Math.min(...countPair),
		});
	});

	return [lines.map(reduceSpaces).filter(lineNotEmpty), operators, errors];
};

export default getParenthesisAndBracketsOperators;
