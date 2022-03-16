import { IToken }from '../../models/interfaces/interfaces';
import 'colors';
import { countAndRemoveFromLines, findThenUpdateOrPush, lineNotEmpty, reduceSpaces } from '../tools';
import { definitionAndReturnRegex } from '../list-and-regex/operators';


const getDefReturnOperators = (
	lines: string[],
	operators: IToken[],
	errors: string[]
): [string[], IToken[], string[]] => {
	const countPair = definitionAndReturnRegex.map(regex => {
		let count = 0;
		[lines, count] = countAndRemoveFromLines(lines, regex);
		return count;
	});
	if (countPair[0] < countPair[1]) {
		errors = [
			...errors,
			`def and return's are not balanced\n` +
				`Number of def = ${countPair[0]}\n` +
				`Number of return = ${countPair[1]}\n`,
		];
	}
	if (countPair[0] !== 0) {
		findThenUpdateOrPush({
			value: 'def...return',
			valueToPush: 'def...return',
			tokens: operators,
			type: 'reserved_words',
			ocurrencies: countPair[0],
		});
	}

	return [lines.map(reduceSpaces).filter(lineNotEmpty), operators, errors];
};

export default getDefReturnOperators;
