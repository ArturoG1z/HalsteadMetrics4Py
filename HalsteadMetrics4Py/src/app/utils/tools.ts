import {
  IHalsteadMetrics,
  IHalsteadMetricsBForFile,
  IToken,
} from '../models/interfaces/interfaces';

const reduceSpaces = (line: string) => line.replace(/[ \t]{2,}/g, ' ').trim();

const lineNotEmpty = (line: string) => line.length > 0;

const strWithoutQuotes = (str: string) => str.substring(1, str.length - 1);

const replaceMatchWithSpaces = (
  str: string,
  index: number = 0,
  count: number
): string =>
  str.substring(0, index) + ' '.repeat(count) + str.substring(index + count);

type FindFunction = (
  tokenValue: string,
  tokens: IToken[],
  type: string
) => IToken | undefined;
type ValuePreprossesing = ((value: string) => string) | undefined;
type TokenFinderArgs = {
  lines?: string[];
  regex: RegExp;
  tokens: IToken[];
  type: string;
  str?: string;
  findFunction?: FindFunction;
  valuePreprossesing?: ValuePreprossesing;
  secondaryTokens?: IToken[];
  secondaryType?: string;
  regexToFindInsideToken?: RegExp | undefined;
  objIfIsFuncToken?: {
    isFunction?: boolean;
    subsCountFromParentesisOcurrs?: number;
  } | undefined;
};
type ArgsToUpdateOrPush = {
  value: string;
  valueToPush: string;
  tokens: IToken[];
  type: string;
  findFunction?: FindFunction;
  ocurrencies?: number | null;
};

const findToken: FindFunction = (
  tokenValue: string,
  tokens: IToken[],
  type: string
) => tokens.find((token) => token.value === tokenValue && token.type === type);

const findThenUpdateOrPush = ({
  value,
  valueToPush,
  tokens,
  type,
  findFunction = findToken,
  ocurrencies: occurrences = null,
}: ArgsToUpdateOrPush) => {
  const token = findFunction(value, tokens, type);
  if (token) {
    if (occurrences === null) {
      token.occurrences++;
    } else {
      token.occurrences = occurrences;
    }
  } else {
    tokens.push({
      id: tokens.length + 1,
      value: valueToPush,
      occurrences: occurrences === null ? 1 : occurrences,
      type,
    });
  }
};

const findThenSubsOcurrIfEmptyDelete = (
  value: string,
  tokens: IToken[],
  type: string,
  amountToSubstract: number,
  findFunction: FindFunction = findToken,
) => {
  const token = findFunction(value, tokens, type);
  if (token) {
    token.occurrences -= amountToSubstract;
    if (token.occurrences <= 0) {
      tokens.splice(tokens.indexOf(token), 1);
    }
  }
};

const getAllMatches = (line: string, regex: RegExp): RegExpExecArray[] => {
  const matches = [];
  let match: RegExpExecArray | null;
  do {
    match = regex.exec(line);
    if (match) {
      matches.push(match);
    }
  } while (match);
  return matches;
};

const findMatchesInStrAndRegisterOnTokens = ({
  lines = [],
  regex,
  tokens,
  type,
  str = '',
  findFunction = findToken,
  valuePreprossesing = undefined,
  secondaryTokens = [],
  secondaryType = '',
  regexToFindInsideToken = undefined,
  objIfIsFuncToken = undefined
}: TokenFinderArgs) => {
  const matches = getAllMatches(str, regex);
  matches.forEach((match) => {
    let value =
      valuePreprossesing === undefined
        ? match[0]
        : valuePreprossesing(match[0]);
    if (regexToFindInsideToken !== undefined) {
      findMatchesInStrAndRegisterOnTokens({
        regex: regexToFindInsideToken,
        str: value,
        tokens: secondaryTokens,
        type: secondaryType,
      });
    }
    let valueToPush = match[0];
    if(objIfIsFuncToken?.isFunction) {
      objIfIsFuncToken.subsCountFromParentesisOcurrs++;
      value = value + '(...)';
      valueToPush = value;
    }
    findThenUpdateOrPush({
      value,
      valueToPush,
      tokens,
      type,
      findFunction,
    });
  });
};

const getTokensWithRegex = ({
  lines,
  regex,
  tokens,
  type,
  findFunction = findToken,
  valuePreprossesing = undefined,
  secondaryTokens = [],
  secondaryType = '',
  regexToFindInsideToken = undefined,
  objIfIsFuncToken = undefined
}: TokenFinderArgs): IToken[] => {
  lines.forEach((line) => {
    findMatchesInStrAndRegisterOnTokens({
      str: line,
      regex,
      tokens,
      type,
      findFunction,
      valuePreprossesing,
      secondaryTokens,
      secondaryType,
      regexToFindInsideToken,
      objIfIsFuncToken,
    });
  });
  return tokens;
};

const removeTokensFromFromLines = (lines: string[], regex: RegExp): string[] =>
  lines
    .map((line) => line.replace(regex, ' '))
    .map(reduceSpaces)
    .filter(lineNotEmpty);

const countAndRemoveFromLines = (
  lines: string[],
  regex: RegExp
): [string[], number] => {
  let count = 0;
  lines = lines
    .map((line) => {
      count += line.match(regex)?.length ?? 0;
      return line.replace(regex, ' ');
    })
    .map(reduceSpaces)
    .filter(lineNotEmpty);
  return [lines, count];
};

const myParseFloat = (value: number) => parseFloat('' + value.toFixed(4));

const metricsObjectToArray = (metrics: IHalsteadMetrics, withNames = true) => {
  const metricsArray = [];
  let index = 0;
  for (const key in metrics) {
    if (metrics.hasOwnProperty(key)) {
      if (key === 'initial') {
        for (const secKey in metrics.initial) {
          if (metrics.initial.hasOwnProperty(secKey)) {
            metricsArray.push([
              withNames ? `${secKey}: ${metricNames[index]}` : secKey,
              metrics.initial[secKey],
              ,
            ]);
            index++;
          }
        }
      } else {
        metricsArray.push([
          withNames ? `${key}: ${metricNames[index]}` : key,
          metrics[key]]);
        index++;
      }
    }
  }
  return metricsArray;
};

const halsteadDBRowsAreTheSame = (
  row1: IHalsteadMetricsBForFile,
  row2: IHalsteadMetricsBForFile
): boolean =>
  row1.fileName === row2.fileName &&
  row1.fileSize === row2.fileSize &&
  row1.metrics.initial.n1 === row2.metrics.initial.n1 &&
  row1.metrics.initial.n2 === row2.metrics.initial.n2 &&
  row1.metrics.initial.N1 === row2.metrics.initial.N1 &&
  row1.metrics.initial.N2 === row2.metrics.initial.N2;

const metricNames = [
  '# Operadores unicos',
  '# Operandos unicos',
  '# Ocurrencia de operadores',
  '# Ocurrencia de operandos',
  'Longitud del programa',
  'Vocabulario',
  'Volumen',
  'Difficultad',
  'Nivel',
  'Esfuerzo',
  'Tiempo',
  'Bugs',
];

export {
  reduceSpaces,
  lineNotEmpty,
  strWithoutQuotes,
  replaceMatchWithSpaces,
  TokenFinderArgs,
  findThenUpdateOrPush,
  findThenSubsOcurrIfEmptyDelete,
  getTokensWithRegex,
  removeTokensFromFromLines,
  countAndRemoveFromLines,
  getAllMatches,
  myParseFloat,
  metricsObjectToArray,
  halsteadDBRowsAreTheSame,
  metricNames,
};
