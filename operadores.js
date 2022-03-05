const operators1Sybomls = ['"', "'", '(', '|', '^', '%', '&', ')', ':', '+', '*', '-', '/', '~', '=', '<', '>', ', ', '.' , '[', ']'];
const operators2Sybomls = /\+=|\/=|-=|^=|\/\/|<=|\&=|\%=|\*\*|!=|<<|\*=|\|=|>=|>>|==/g;
const operators3Symbols = />>=|<<=|\/\/=|\*\*=|/g;


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

module.exports = {
  operators1Sybomls,
  operators2Sybomls,
  operators3Symbols,
  reservedWords,
}