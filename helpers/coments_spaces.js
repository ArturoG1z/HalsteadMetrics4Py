const { stringRegex, fullLineCommentRegex, inLineCommentRegex } = require("../operadores");

const replaceFromIndexWithSpaces = (str, index, count) => {
  return str.substring(0, index) + ' '.repeat(count) + str.substring(index + count);
};

const removeCommentsInLine = line => {
  let isNotInComment = true;
  let lineCopy = [...line].join('');
  let ocurrencia;
  while ((ocurrencia = stringRegex.exec(line)) !== null) {
    lineCopy = replaceFromIndexWithSpaces(lineCopy, ocurrencia.index, ocurrencia[0].length);
  }
  lineCopy = lineCopy.replace(inLineCommentRegex, '');
  line = [...line]
  line.length = lineCopy.length;
  line = line.join('');
  return line;
};

const removeFullLineComments = line => line.trim().replace(fullLineCommentRegex, '');

const lineNotEmpty = line => line.length > 0;

const removeCommentsAndSpaces = data => {
  data = data
    .replace(/\r/g, '')
    .split('\n')
    .map(removeFullLineComments)
    .filter(lineNotEmpty)
    .map(removeCommentsInLine)
    .join('\n');
  return data;
};

module.exports = {
  removeCommentsAndSpaces,
}
