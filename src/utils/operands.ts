import IToken from '../models/token';

const stringRegex = /(?<string>("(?:\\.|[^\\])*?")|('(?:\\.|[^\\])*?'))/g;

// (?<![a-zA-Z\.])\b(\d+|\d+.\d+|\.\d+|\d+\.)(?![a-zA-Z\.])\b

// /(?<operadoresNumericos>(?<exponentials>(?<![a-zA-Z_])(?:(?:\d+\.?\d*)[eE][+-]?\d+)\b)|(?<baseDiferente>(?<binarios>\b(?:0b[01]+)\b)|(?<octales>\b(?:0o[0-7]+)\b)|(?<hexadecimales>\b(?:0x[a-fA-F0-9]+)\b))|(?<numerosBD>(?<normales>(?<!\.)\b(?:\d+)\b(?!\.))|(?<decimales>(?<![a-zA-Z_.])(?:\d+\.\d*|\d*\.\d+)(?<![a-zA-Z_\.]))))/g;
// Primero quitar exponenciales y de base distinta a 10 y replace con space ' ''
// 1.2e3 1e-2 1e+2
const exponentialRegex = /(?<exponential>(?<![a-zA-Z_.])(?:(?:\d+\.\d*|\d*\.\d+)[eE][+-]?\d+)\b)/g;
const diffBaseRegex =
/(?<difBaseTo>(?<binary>\b(?:0b[01]+)\b)|(?<octal>\b(?:0o[0-7]+)\b)|(?<hexadecimal>\b(?:0x[a-fA-F0-9]+)\b))/g;
//despues sacar los numeros decimales y luego los normales
const decimalRegex = /(?<decimales>(?<![a-zA-Z_.])(?:\d+\.\d*|\d*\.\d+)(?<![a-zA-Z_\.]))/g;
const integerRegex = /(?<normales>(?<!\.)\b(?:\d+)\b(?!\.))/g;

const regex4NumericalOperands = [
  exponentialRegex,	
  diffBaseRegex,
  decimalRegex,
  integerRegex,
]

const findStringOnOperands = (token: string, operands: IToken[], type = 'string') => {
  return operands.find(operand => {
    const value = operand.value.substring(1, operand.value.length - 1);
    return value === token && operand.type === type;
  });
};

export {
  stringRegex,
  regex4NumericalOperands,
  findStringOnOperands,
};
