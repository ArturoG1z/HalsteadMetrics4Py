type FindFunction = (tokenValue: string, tokens: IToken[], type: string) => IToken | undefined;
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
  value: string,
  valueToPush: string,
  tokens: IToken[],
  type: string,
  findFunction?: FindFunction,
  ocurrencies?: number | null,
}
