import IToken from '../models/token';

interface IInitialMetrics {
	n1: number;
	n2: number;
	N1: number;
	N2: number;
}
interface IHalsteadMetrics {
  initial: IInitialMetrics,
	N: number;
	n: number;
	V: number;
	D: number;
	L: number;
	E: number;
	T: number;
	B: number;
}

const getInitialVariables = (operators: IToken[], operands: IToken[]): IInitialMetrics => {
	return {
		n1: operators.length,
		n2: operands.length,
		N1: operators.reduce((acc, curr) => acc + curr.ocurrencies, 0),
		N2: operands.reduce((acc, curr) => acc + curr.ocurrencies, 0),
	};
};

const getHalsteadMetrics = (operators: IToken[], operands: IToken[]): IHalsteadMetrics => {
  const initial = getInitialVariables(operators, operands);
	const N = initial.N1 + initial.N2;
	const n = initial.n1 + initial.n2;
	const V = N * Math.log2(n);
	const D = (initial.n1 / 2) * (initial.N2 / initial.n2);
	const L = 1 / D;
	const E = D * V;
	const T = E / 18;
	const B = Math.pow(E, 2 / 3) / 3000;
	return { initial, N, n, V, D, L, E, T, B };
};

export default getHalsteadMetrics;
export { IHalsteadMetrics };
