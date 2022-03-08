import IToken from '../models/token';

const reduceSpaces = (line: string) => line.replace(/[ \t]{2,}/, ' ').trim();

const lineNotEmpty = (line: string) => line.length > 0;

const strWithoutQuotes = (string: string) => string.substring(1, string.length - 1);

const replaceMatchWithSpaces = (str: string, index: number = 0, count: number): string => {
	return str.substring(0, index) + ' '.repeat(count) + str.substring(index + count);
};

type FindFunction = (tokenValue: string, tokens: IToken[], type: string) => IToken | undefined;
type ValuePreprossesing = ((value: string) => string) | undefined;
type TokenFinderArgs = {
	lines: string[];
	regex: RegExp;
	tokens: IToken[];
	type: string;
	findFunction?: FindFunction;
	valuePreprossesing?: ValuePreprossesing;
};

const findToken: FindFunction = (tokenValue: string, tokens: IToken[], type: string) => {
	return tokens.find(token => token.value === tokenValue && token.type === type);
};

const getTokensWithRegex = ({
	lines,
	regex,
	tokens,
	type,
	findFunction = findToken,	
	valuePreprossesing = undefined,
}: TokenFinderArgs): IToken[] => {
	let matches: RegExpMatchArray[];
	lines.forEach(line => {
		matches = [...line.matchAll(regex)];
		matches.forEach(match => {
			const value = valuePreprossesing === undefined ? match[0] : valuePreprossesing(match[0]);
			const token = findFunction(value, tokens, type);
			if (token) {
				token.ocurrencies++;
			} else {
				tokens.push({
					id: tokens.length + 1,
					value: match[0],
					ocurrencies: 1,
					type,
				});
			}
		});
	});
	return tokens;
};

const removeTokensFromFromLines = (lines: string[], regex: RegExp): string[] => {
	return lines
		.map(line => line.replace(regex, ' '))
		.map(reduceSpaces)
		.filter(lineNotEmpty);
};

export {
	reduceSpaces,
	lineNotEmpty,
	strWithoutQuotes,
	replaceMatchWithSpaces,
	TokenFinderArgs,
	getTokensWithRegex,
	removeTokensFromFromLines,
};
