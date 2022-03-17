import { IToken } from '../../models/interfaces/interfaces';

const stringRegex = /(?<string>("(?:\\.|[^\\])*?")|('(?:\\.|[^\\])*?'))/g;

const exponentialRegex =
  /(?<exponential>(?<![a-zA-Z_.])(?:(?:\d+\.\d*|\d*\.\d+)[eE][+-]?\d+)\b)/g;
const diffBaseRegex =
  /(?<difBaseTo>(?<binary>\b(?:0b[01]+)\b)|(?<octal>\b(?:0o[0-7]+)\b)|(?<hexadecimal>\b(?:0x[a-fA-F0-9]+)\b))/g;

const decimalRegex =
  /(?<decimales>(?<![a-zA-Z_.])(?:\d+\.\d*|\d*\.\d+)(?<![a-zA-Z_\.]))/g;
const integerRegex = /(?<normales>(?<!\.)\b(?:\d+)\b(?!\.))/g;

const regex4NumericalOperands = [
  exponentialRegex,
  diffBaseRegex,
  decimalRegex,
  integerRegex,
];

const findStringOnOperands = (
  token: string,
  operands: IToken[],
  type = 'string'
) =>
  operands.find((operand) => {
    const value = operand.value.substring(1, operand.value.length - 1);
    return value === token && operand.type === type;
  });

const validVarAndFuncOperandsRegex = /\b(?:[a-zA-Z_][a-zA-Z0-9_]*)\b/g;

export {
  stringRegex,
  regex4NumericalOperands,
  findStringOnOperands,
  validVarAndFuncOperandsRegex,
};
