import { removeCommentsAndSpaces } from './utils/coments_spaces';
import { promises as fs } from 'fs';
import path from 'path';
import IToken from './models/token';
import countAndRemoveStrings from './utils/strings_process';

//const fileName = 'py_examples/Prog303.py';
const fileName = 'py_examples/numeros.py';


const readFile = async (fileName: string) => {
	try {
		const data = await fs.readFile(fileName, 'utf8');
		console.log('================================================');
		console.log(data);
		return data;
	} catch (err) {
		throw err;
	}
};

const processData = (data: string) => {
	let operators: IToken[] = [];
	let operands: IToken[] = [];
	data = removeCommentsAndSpaces(data);
	[data, operands] = countAndRemoveStrings(data);
	console.log('===================================================');
	console.log(data);
	console.timeEnd('halstead');
	return data;
};

console.time('halstead');
readFile(fileName)
	.then(processData)
	.catch(err => console.log(err));

//? ver algoritmo de tokenización en algortimo.md
