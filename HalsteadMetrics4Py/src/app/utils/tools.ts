import { IHalsteadMetrics, IHalsteadMetricsBForFile, IToken } from '../models/interfaces/interfaces';

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
  lines: string[];
  regex: RegExp;
  tokens: IToken[];
  type: string;
  findFunction?: FindFunction;
  valuePreprossesing?: ValuePreprossesing;
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

const getTokensWithRegex = ({
  lines,
  regex,
  tokens,
  type,
  findFunction = findToken,
  valuePreprossesing = undefined,
}: TokenFinderArgs): IToken[] => {
  let matches: RegExpMatchArray[];
  lines.forEach((line) => {
    matches = getAllMatches(line, regex);
    matches.forEach((match) => {
      const value =
        valuePreprossesing === undefined
          ? match[0]
          : valuePreprossesing(match[0]);
      findThenUpdateOrPush({
        value,
        valueToPush: match[0],
        tokens,
        type,
        findFunction,
      });
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

const metricsObjectToArray = (metrics: IHalsteadMetrics) => {
  const metricsArray = [];
  let index = 0;
  for (const key in metrics) {
    if (metrics.hasOwnProperty(key)) {
      if (key === 'initial') {
        for (const secKey in metrics.initial) {
          if (metrics.initial.hasOwnProperty(secKey)) {
            metricsArray.push([
              `${secKey}: ${metricNames[index]}`,
              metrics.initial[secKey],
              ,
            ]);
            index++;
          }
        }
      } else {
        metricsArray.push([
          `${key}: ${metricNames[index]}`,
          metrics[key],
        ]);
        index++;
      }
    }
  }
  return metricsArray;
};

const halsteadDBRowsAreTheSame = (row1: IHalsteadMetricsBForFile, row2: IHalsteadMetricsBForFile): boolean => (
  row1.fileName === row2.fileName &&
  row1.fileSize === row2.fileSize &&
  row1.metrics.initial.n1 === row2.metrics.initial.n1 &&
  row1.metrics.initial.n2 === row2.metrics.initial.n2 &&
  row1.metrics.initial.N1 === row2.metrics.initial.N1 &&
  row1.metrics.initial.N2 === row2.metrics.initial.N2
);

const metricNames = [
  '# Unique operators',
  '# Unique operands',
  '# Occurrence operators',
  '# Occurrence operands',
  'Program Length',
  'Program Vocabulary',
  'Program Volume',
  'Difficulty',
  'Level',
  'Effort',
  'Time',
  'Bugs',
];

export {
  reduceSpaces,
  lineNotEmpty,
  strWithoutQuotes,
  replaceMatchWithSpaces,
  TokenFinderArgs,
  findThenUpdateOrPush,
  getTokensWithRegex,
  removeTokensFromFromLines,
  countAndRemoveFromLines,
  getAllMatches,
  myParseFloat,
  metricsObjectToArray,
  halsteadDBRowsAreTheSame,
  metricNames,
};
