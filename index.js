const fs = require('fs').promises;
const path = require('path');
const { operators1Sybomls, operators2Sybomls, operators3Sybomls, reservedWords } = require('./operadores');

const fileName = 'py-examples/test.py';

const readFile = async fileName => {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    console.log('================================================');
    console.log(typeof data);
    return data;
  } catch (err) {
    throw err;
  }
};

const removeComments = data => {
  data = data
    .split('\n')
    .map(line => line.replace(/\#.*/g, ''))
    .join('\n');
  console.log('==================without comments==================');
  console.log(data);
  return data;
};

const countAndRemoveStrings = data => {
  let count = 0;
  //triple quotes
  data = data.replace(/'''(.*?)'''/g, () => {
    count++;
    return '';
  });
  // with single quotes
  data = data.replace(/'(.*?)'/g, () => {
    count++;
    return '';
  });
  // doble quotes
  data = data.replace(/"(.*?)"/g, () => {
    count++;
    return '';
  });
  console.log('==================without strings==================');
  console.log(data);
  return [data, count];
};

const cleanData = data => {
  let countStrings = 0;
  [data, countStrings] = countAndRemoveStrings(data);
  data = removeComments(data);
  console.log('Count strings: ', countStrings);
  data = data.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return data;
};

const processData = data => {
  data = cleanData(data);
  console.log('===================================================');
  console.log(data);
  return data;
};

readFile(fileName)
  .then(processData)
  .catch(err => console.log(err));

//? ver algoritmo de tokenización en algortimo.md

// (?<![a-zA-Z\.])\b(\d+|\d+.\d+|\.\d+|\d+\.)(?![a-zA-Z\.])\b

/(?<operadoresNumericos>(?<exponenciales>(?<![a-zA-Z_])(?:(?:\d+\.?\d*)[eE][+-]?\d+)\b)|(?<baseDiferente>(?<binarios>\b(?:0b[01]+)\b)|(?<octales>\b(?:0o[0-7]+)\b)|(?<hexadecimales>\b(?:0x[a-fA-F0-9]+)\b))|(?<numerosBD>(?<normales>(?<!\.)\b(?:\d+)\b(?!\.))|(?<decimales>(?<![a-zA-Z_.])(?:\d+\.\d*|\d*\.\d+)(?<![a-zA-Z_\.]))))/g
;
//Primero quitar exponenciales y de base distinta a 10 y replace con space ' '
/(?<exponenciales>(?<![a-zA-Z_.])(?:(?:\d+\.\d*|\d*\.\d+)[eE][+-]?\d+)\b)/g
;
/(?<baseDiferente>(?<binarios>\b(?:0b[01]+)\b)|(?<octales>\b(?:0o[0-7]+)\b)|(?<hexadecimales>\b(?:0x[a-fA-F0-9]+)\b))/g
;
//despues sacar los numeros decimales y luego los normales
/(?<decimales>(?<![a-zA-Z_.])(?:\d+\.\d*|\d*\.\d+)(?<![a-zA-Z_\.]))/g
;
/(?<normales>(?<!\.)\b(?:\d+)\b(?!\.))/g
;
