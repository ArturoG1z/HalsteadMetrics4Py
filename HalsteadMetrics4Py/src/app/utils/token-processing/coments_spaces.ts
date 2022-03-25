import {
  findThenUpdateOrPush,
  getAllMatches,
  lineNotEmpty,
  replaceMatchWithSpaces,
} from '../tools';
import { stringRegex } from '../list-and-regex/operands';
import { IToken } from 'src/app/models/interfaces/interfaces';

const fullLineCommentRegex = /^#.*/g;
const inLineCommentRegex = /\#.*/g;

const removeCommentsInLine = (line: string): string => {
  let lineCopy = line;
  const matches = getAllMatches(line, stringRegex);
  matches.forEach((match) => {
    lineCopy = replaceMatchWithSpaces(lineCopy, match.index, match[0].length);
  });
  lineCopy = lineCopy.replace(inLineCommentRegex, '');
  const lineArray = [...line];
  commentCount += lineCopy.length !== lineArray.length ? 1 : 0;
  lineArray.length = lineCopy.length;
  line = lineArray.join('').trim();
  return line;
};
let commentCount = 0;
const removeFullLineComments = (line: string) => {
  const newLine = line.trim().replace(fullLineCommentRegex, '');
  if (newLine.length === 0) {
    commentCount++;
  }
  return newLine;
};

export const removeCommentsAndSpaces = (
  data: string,
  operators: IToken[]
): [string[], IToken[]] => {
  let lines = data.replace(/\r/g, '').split('\n').filter(lineNotEmpty);
  commentCount = 0;
  lines = lines
    .map(removeFullLineComments)
    .filter(lineNotEmpty)
    .map(removeCommentsInLine);
  if (commentCount > 0) {
    findThenUpdateOrPush({
      value: '#',
      valueToPush: '#',
      tokens: operators,
      type: 'comment',
      ocurrencies: commentCount,
    });
  }
  return [lines, operators];
};
