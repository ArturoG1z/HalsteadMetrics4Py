# Steps to follow 
## Algorithm for sorting operands operators

1.  [x] Read file contents and decode to utf-8. 
2.  [x] Remove full line comments and on a line with treatment to see that it is not inside a string the comment by replacing it with a space. 
3.  [x] Remove empty lines and multiple spaces. 
4.  [x] Second count and remove operands from text strings do not consider multi-line strings and multi-line comments. 
5.  [x] Search for number operands with regex defined in index.js for now. 
6.  [x] Search for opening and closing parentheses and brackets. 
7.  [x] Search operators with non-alphanumeric symbols 
	- Search for 3-symbol operators with the following regex replacing them with a space for now in operators.js
	- Search for 2-symbol operators with the following regex replacing them with a space for now in operators.js
	- Search for 1-symbol operators with the following regex replacing them with a space for now in operators.js
8.  [x] Search for function definition operators with their return (if any) replaced by a space. 
9.  [x] Search for operators of language-specific functions (python and math).
10. [x] Search for reserved words with the following regex replacing them with a space. 
11. [x] All the rest will be operands. 
12. [x] Get the number of operands and operators and ocurrencies.
13. [x] Calculate the halstead meatrics
