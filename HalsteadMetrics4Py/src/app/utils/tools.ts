import { IToken } from '../models/interfaces/interfaces';

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
};
