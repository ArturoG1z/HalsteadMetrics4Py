export interface IFile {
  name: string;
  content: string;
  contentHTML: string;
  type: string;
  size: number;
}
export interface IToken {
  id: number;
  value: string;
  ocurrencies: number;
  type: string;
}
