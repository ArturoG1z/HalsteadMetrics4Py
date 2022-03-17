import { IToken }from '../../models/interfaces/interfaces';
import { countAndRemoveFromLines, findThenUpdateOrPush, lineNotEmpty, reduceSpaces } from '../tools';
import { brackets, parenthesis, braces } from '../list-and-regex/operators';

const titleCaseWord = (word: string): string => {
	if (!word){ return word; }
	return word[0].toUpperCase() + word.substr(1).toLowerCase();
};

const getParenthesisAndBracketsOperators = (lines: string[], operators: IToken[], errors: string[]): [string[], IToken[], string[]] => {
	const openAndCloseOperators = [parenthesis, brackets, braces];
	const types = ['parenthesis', 'brackets', 'braces'];
	const strOpenAndCloseOperators = ['(...)', '[...]', '{...}'];
	openAndCloseOperators.forEach((operator, index) => {
		const countPair = operator.map(regex => {
			let count = 0;
			[lines, count] = countAndRemoveFromLines(lines, regex);
			return count;
		});
		if (countPair[0] !== countPair[1]) {
      errors = [...errors, `${titleCaseWord(types[index])} are not balanced `+
      `Number of ${types[index]} that open  = ${countPair[0]} `+
      `Number of ${types[index]} that close = ${countPair[1]}`];
		}
		if (countPair[0] === 0 && countPair[1] === 0) { return; }
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
