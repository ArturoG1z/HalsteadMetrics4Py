import IToken from '../models/token';
import { stringRegex } from './operands';
const countAndRemoveStrings = (data: string): [string, IToken[]] => {
  let operands: IToken[] = [];
	return [data, operands];
};

export default countAndRemoveStrings;
