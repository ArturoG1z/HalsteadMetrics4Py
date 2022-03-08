const operators1SybomlsArray = [
	"'",
	'|',
	'^',
	'%',
	'&',
	':',
	'+',
	'*',
	'-',
	'/',
	'~',
	'=',
	'<',
	'>',
	',',
	'.',
];
const operators1SymbolRegex = new RegExp(`[${operators1SybomlsArray.join('')}]`, 'g');
const operators2SybomlsRegex = /\+=|\/=|-=|^=|\/\/|<=|\&=|\%=|\*\*|!=|<<|\*=|\|=|>=|>>|==/g;
const operators3SymbolsRegex = />>=|<<=|\/\/=|\*\*=|/g;
const reservedWords = [
	'and',
	'elif',
	'is',
	'pass',
	'while',
	'as',
	'in',
	'if',
	'from',
	'raise',
	'not',
	'is not',
	'not in',
	'in',
	'for',
	'except',
	'finally',
	'print',
	'import',
	'return',
	'exec',
	'else',
	'break',
	'not',
	'with',
	'class',
	'assert',
	'yield',
	'try',
	'global',
	'continue',
	'del',
	'or',
	'def',
	'lambda',
	'while',
	'for',
	'def',
	'math',
	'sqrt',
];

export { operators1SybomlsArray, operators2SybomlsRegex, operators3SymbolsRegex, reservedWords };
