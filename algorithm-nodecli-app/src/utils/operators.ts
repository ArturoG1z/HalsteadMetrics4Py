const parenthesis = [/\(/g, /\)/g];
const brackets = [/\[/g, /\]/g];
const braces = [/\{/g, /\}/g];

const operators1SymbolRegex = /[\-|^%&=:~+*\/<,>]/g;
const operators2SybomlsRegex = /\+=|\/=|-=|^=|\/\/|<=|\&=|\%=|\*\*|!=|<<|\*=|\|=|>=|>>|==/g;
const operators3SymbolsRegex = />>=|<<=|\/\/=|\*\*=/g;

const symbolsRegex = [operators3SymbolsRegex, operators2SybomlsRegex, operators1SymbolRegex];

const reservedWords = [
	'and',
	'or',
	'not',
	'True',
	'False',
	'None',
	'in',
	'is',
	'if',
	'else',
	'elif',
	'while',
	'break',
	'for',
	'pass',
	'continue',
	'yield',
	'import',
	'from',
	'as',
	'try',
	'except',
	'finally',
	'raise',
	'assert',
	'print',
	'type',
	'exec',
	'with',
	'class',
	'lambda',
	'global',
	'nonlocal',
	'del',
];

const reservedWordsRegex = new RegExp(`\\b(${reservedWords.join('|')})\\b`, 'g');

const defaultFunctionsOperators = [
	'abs',
	'all',
	'any',
	'ascii',
	'bin',
	'bool',
	'bytearray',
	'bytes',
	'callable',
	'chr',
	'compile',
	'complex',
	'delattr',
	'dict',
	'dir',
	'divmod',
	'enumerate',
	'eval',
	'exec',
	'filter',
	'float',
	'format',
	'frozenset',
	'getattr',
	'globals',
	'hasattr',
	'help',
	'hex',
	'id',
	'input',
	'int',
	'isinstance',
	'issubclass',
	'iter',
	'len',
	'list',
	'locals',
	'map',
	'max',
	'memoryview',
	'min',
	'next',
	'object',
	'oct',
	'open',
	'ord',
	'print',
	'range',
	'reversed',
	'round',
	'set',
	'setattr',
	'slice',
	'sorted',
	'str',
	'sum',
	'super',
	'tuple',
	'type',
	'vars',
	'zip',
];
const defaultFunctionsOperatorsRegex = new RegExp(`\\b(${defaultFunctionsOperators.join('|')})\\b`, 'g');

const definitionAndReturnRegex = [/\bdef\b/g, /\breturn\b/g];

const mathMethods = [
	'acos',
	'acosh',
	'asin',
	'asinh',
	'atan',
	'atan2',
	'atanh',
	'ceil',
	'comb',
	'copysign',
	'cos',
	'cosh',
	'degrees',
	'dist',
	'erf',
	'erfc',
	'exp',
	'expm1',
	'fabs',
	'factorial',
	'floor',
	'fmod',
	'frexp',
	'fsum',
	'gamma',
	'gcd',
	'hypot',
	'isclose',
	'isfinite',
	'isinf',
	'isnan',
	'isqrt',
	'ldexp',
	'frexp',
	'lgamma',
	'log',
	'log10',
	'log1p',
	'log2',
	'perm',
	'pow',
	'prod',
	'radians',
	'remainder',
	'sin',
	'sinh',
	'sqrt',
	'tan',
	'tanh',
	'trunc',
];

const point = /\./g;

const mathWord = /\bmath\b/g;

const pow = /\bpow\b/g;

const mathOperands = ['e', 'inf', 'nan', 'pi', 'tau'];

// python math functions
const mathFunctionOperatorsRegex = new RegExp(`\\b(?<=math\\.)(?:${mathMethods.join('|')})\\b`, 'g');

const wordOperatorsAndThenPoints = [
	{ regex: reservedWordsRegex, type: 'reserved_word' },
	{ regex: defaultFunctionsOperatorsRegex, type: 'default_function' },
	{ regex: mathFunctionOperatorsRegex, type: 'library_function' },
	{ regex: mathWord, type: 'library' },
	{ regex: pow, type: 'default_function' },
	{ regex: point, type: 'symbol' },
];

export { symbolsRegex, wordOperatorsAndThenPoints, parenthesis, brackets, braces, definitionAndReturnRegex };
