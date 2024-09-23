/**
 * @package : MNJS MATH NODE JS
 * @version : 4.4.0
 * @author  : Montasir Mirghani
 * @npm     : https://www.npmjs.com/~dr-montasir
 * @gitHub  : https://github.com/dr-montasir
 */
/**
 * @license MIT License
 * @copyright Copyright (c) 2020 - 2023 Montasir Mirghani
 * @text Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const mnjs = {
	/**
	 * @name MNJS ERRORS
	 */
	ERRORS: {
		MNJS_0_1: 'NATIVE MATH ERROR No. 00 : 01: This function only accepts numbers',
		MNJS_0_2: 'NATIVE MATH ERROR No. 00 : 02: fact() argument must be natural number (ℕ0) between 0 and 170',
		MNJS_1_1: 'NATIVE MATH ERROR No. 01 : 01: This function accepting either a number or an array. In the case of an array, all elements must be a number',
		MNJS_1_2: 'NATIVE MATH ERROR No. 01 : 02: This function accepting either a string or an array. In the case of an array, all elements must be a string',
		MNJS_1_3:
			'NATIVE MATH ERROR No. 01 : 03: This function accepting two arguments of numbers, arrays, or one of them must be a number, and the other must be an array; In the case of arrays, all elements must be a number, the length of arrays must be equal',
		MNJS_1_4: 'NATIVE MATH ERROR No. 01 : 04: The first parameter accepting either a number or an array. In the case of an array, all elements must be a number. The second parameter must be between 0 and 100',
		MNJS_1_5: 'NATIVE MATH ERROR No. 01 : 05: This function accepts numeric arguments or one numeric array argument. (num1, num2, ..., num) => {} or ([num1, num2, ..., num]) => {}',
		MNJS_1_6:
			'NATIVE MATH ERROR No. 01 : 06: This function accepting two arguments. The first argument should be one (numeric or empty) array and the second should be a number. All next examples are valid: sum([num1, num2, ..., num_x]); sum([]); sum([num1, num2, ..., num_x], num); sum([], num)',
		MNJS_1_7: 'NATIVE MATH ERROR No. 01 : 07: This function accepting either a non-negative integer or an array. In the case of an array, all elements must be a non-negative integer',
		MNJS_2_1: 'NATIVE MATH ERROR No. 02 : 01: The step parameter should not be: 1/ null 2/ equal or less than zero. 3/ greater than the absolute difference between the first and second parameter',
		MNJS_2_2: 'NATIVE MATH ERROR No. 02 : 02: All parameters must be a number. The first and the second parameter should not be equal',
		MNJS_3_1: 'NATIVE MATH ERROR No. 03 : 01: The monolist function should take two numeric parameters (value: number, size: natural number & greater than zero)',
		MNJS_4_1:
			'NATIVE MATH ERROR No. 04 : 01: This function accepts three arguments. The first argument should be  a number or one (numeric or empty) array. The second and third arguments must be a number. What does the function do? f(x, y, z): Replace x (number or numeric array element) with z if x is ',
		MNJS_4_1_SUB_1: 'equal to y',
		MNJS_4_1_SUB_2: 'not equal to y',
		MNJS_4_1_SUB_3: 'greater than y',
		MNJS_4_1_SUB_4: 'less than y',
		MNJS_4_1_SUB_5: 'greater than or equal to y',
		MNJS_4_1_SUB_6: 'less than or equal to y',
		MNJS_5_1:
			'NATIVE MATH ERROR No. 05 : 01: This function accepts two arguments. The first argument should be  a number or one (numeric or empty) array. The second argument must be a number. What does the function do? f(x, y): Replace x (number or numeric array element) with y if x is ',
		MNJS_5_1_SUB_1: 'finity num',
		MNJS_5_1_SUB_2: 'infinity',
		MNJS_5_1_SUB_3: 'plus infinity',
		MNJS_5_1_SUB_4: 'minus infinity',
		MNJS_5_1_SUB_5: 'NAN'
	},
  
  /**
	 * @name pow
	 */
	pow: (r: number, e: number) => {
		if ('number' == typeof r && 'number' == typeof e) return Number(Math.pow(r, e).toFixed(15));
		throw new Error(mnjs.ERRORS.MNJS_1_3);
	},
  
  /**
	 * @name round
	 */
	round: (r: number) => {
		if ('number' == typeof r) return Math.round(r);
		throw new Error(mnjs.ERRORS.MNJS_1_1);
	},

  	/**
 * @name Division Function. (r = numerator, e = denominator)
 * divi(0.4e-15, 1)
        0
        0.4e-15 / 1
        4e-16
 */
	divi: (r: number, e: number) => {
		if ('number' == typeof r && 'number' == typeof e) return Number((r / e).toFixed(15));
		throw new Error(mnjs.ERRORS.MNJS_1_3);
	},
} as const;

export default mnjs;
