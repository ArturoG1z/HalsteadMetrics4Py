/* eslint-disable @typescript-eslint/naming-convention */
interface IFile {
  name: string;
  content: string;
  contentHTML: string;
  type: string;
  size: number;
}
interface IToken {
  id: number;
  value: string;
  occurrences: number;
  type: string;
}


interface IInitialMetrics {
	n1: number;
	n2: number;
	N1: number;
	N2: number;
}
interface IHalsteadMetrics {
  initial: IInitialMetrics;
	N: number;
	n: number;
	V: number;
	D: number;
	L: number;
	E: number;
	T: number;
	B: number;
}

export {
  IFile,
  IToken,
  IInitialMetrics,
  IHalsteadMetrics
};
