const { stringRegex, fullLineCommentRegex, inLineCommentRegex } = require("../operadores");

const replaceFromIndexWithSpaces = (str: string, index: number, count: number): string => {
  return str.substring(0, index) + ' '.repeat(count) + str.substring(index + count);
};

const removeCommentsInLine = (line: string): string => {
  let lineCopy = [...line].join('');
  let ocurrencia;
  while ((ocurrencia = stringRegex.exec(line)) !== null) {
    lineCopy = replaceFromIndexWithSpaces(lineCopy, ocurrencia.index, ocurrencia[0].length);
  }
  lineCopy = lineCopy.replace(inLineCommentRegex, '');
  const lineArray = [...line]
  lineArray.length = lineCopy.length;
  line = lineArray.join('');
  return line;
};

const removeFullLineComments = (line: string) => line.trim().replace(fullLineCommentRegex, '');

const lineNotEmpty = (line: string) => line.length > 0;

const removeCommentsAndSpaces = (data: string) => {
  data = data
    .replace(/\r/g, '')
    .split('\n')
    .map(removeFullLineComments)
    .filter(lineNotEmpty)
    .map(removeCommentsInLine)
    .join('\n');
  return data;
};

export = {
  removeCommentsAndSpaces,
}
