import { getAllMatches, lineNotEmpty, replaceMatchWithSpaces } from '../tools';
import { stringRegex } from '../list-and-regex/operands';

const fullLineCommentRegex = /^#.*/g;
const inLineCommentRegex = /\#.*/g;

const removeCommentsInLine = (line: string): string => {
  let lineCopy = line;
  const matches = getAllMatches(line, stringRegex);
  matches.forEach(match => {
    lineCopy = replaceMatchWithSpaces(lineCopy, match.index, match[0].length);
  });
  lineCopy = lineCopy.replace(inLineCommentRegex, '');
  const lineArray = [...line];
  lineArray.length = lineCopy.length;
  line = lineArray.join('').trim();
  return line;
};

const removeFullLineComments = (line: string) => line.trim().replace(fullLineCommentRegex, '');

export const removeCommentsAndSpaces = (data: string) => {
  const lines = data.replace(/\r/g, '').split('\n');
  return lines.map(removeFullLineComments).filter(lineNotEmpty).map(removeCommentsInLine);
};
