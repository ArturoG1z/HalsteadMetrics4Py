const stringRegex  = /(?<string>(?:'.*?'|".*?"))/g;
const fullLineCommentRegex = /^#.*/g;
const inLineCommentRegex = /\#.*/g;
const operators1SybomlsRegex = ['"', "'", '(', '|', '^', '%', '&', ')', ':', '+', '*', '-', '/', '~', '=', '<', '>', ', ', '.' , '[', ']'];
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

export = {
  fullLineCommentRegex,
  inLineCommentRegex,
  stringRegex,
  operators1SybomlsRegex,
  operators2SybomlsRegex,
  operators3SymbolsRegex,
  reservedWords,
}