const reduceSpaces = (line: string) => line.replace(/[ \t]{2,}/, ' ').trim();

const lineNotEmpty = (line: string) => line.length > 0;

const strWithoutQuotes = (string: string) => string.substring(1, string.length - 1);

const replaceMatchWithSpaces = (str: string, index: number = 0, count: number): string => {
	return str.substring(0, index) + ' '.repeat(count) + str.substring(index + count);
};

export { reduceSpaces, lineNotEmpty, strWithoutQuotes, replaceMatchWithSpaces };
