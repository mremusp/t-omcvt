'use strict';

/* 170: converting and checking numbers;
171: math and rounding */
console.groupCollapsed('converting and checking numbers, math and rounding');
/* numbers are always represented internally as decimals */
console.log(23 === 23.0);

/* conversion */
console.log(Number('23'));
console.log(+'23'); /* JS does type coercion */

/* parsing */
console.log(Number.parseInt('30px', 10)); /* only gets the valid integer number from string !! in base 10 !! (needs to start with a number) */
console.log(Number.parseFloat('2.5rem')); /* gets valid decimal number */

console.log(Number.isNaN(20)); /* false */

console.log(Number.isFinite(20)); /* true */
console.log(Number.isFinite('20')); /* false */

console.log(Number.isInteger(23.0)); /* true */

/* Math operators */
console.log(Math.sqrt(25)); /* square root */
console.log(25 ** (1 / 2)); /* square root */
console.log(8 ** (1 / 3)); /* cubic root */

console.log(Math.max(3, 15, 7, '34', 96), Math.min(6, 73, 4, '2', 0)); /* returns max/min value, does type coercion */

console.log(Math.PI * Number.parseFloat('10px') ** 2); /* calculate area of circle */

console.log(Math.random()); /* get number between 0 and 1 */
const randomInt = (min, max) => Math.trunc(Math.random() * (max - min)) + 1 + min;

/* Rounding */
console.log(Math.trunc(24.65)); /* removes any decimal part */
console.log(Math.round(27.6)); /* rounds to nearest integer */
console.log(Math.round(27.4));
console.log(Math.ceil(27.6)); /* rounds to upper integer */
console.log(Math.ceil(27.4));
console.log(Math.floor(27.6)); /* rounds to lower integer */
console.log(Math.floor(27.4));
console.log(Math.trunc(-15.4), Math.floor(-15.4)); /* => -15, -16 */

/* Rounding decimals */
console.log((2.7).toFixed(0)); /* returns a string with X decimals, not a number */
console.groupEnd();

/* 172: remainder operator */
console.groupCollapsed('remainder');

console.log(5 % 2); /* restul impartirii */
const isEven = (n) => n % 2 === 0;
console.log(isEven(6));

labelBalance.addEventListener('click', () =>
	[...document.querySelectorAll('.movements__row')] /* NodeList => array */
		.forEach((row, index) => {
			if (index % 2 === 0) row.style.backgroundColor = 'orange';
		})
);

/* 173: numeric separators */
var solarSystemDiameter = 287_460_000_000; /* _ are ignored in numbers !! must be between number characters !!*/
console.log(Number('3232'));
console.log(Number('323_999')); /* no bueno */

/* 174: BigInt */
console.log(Number.MAX_SAFE_INTEGER);
console.log(78321713276764761687124768217679987132798); /* no precision */
console.log(78321713276764761687124768217679987132798n); /* precision, n at the end defines a BigInt */
console.log(BigInt(78321713276764761687124768217679987132798)); /* BigInt() used on regular numbers only */
/* BigInt can't do operations with regular numbers, but can compare */
/* BigInt doesn't have decimals */
console.groupEnd();

/* 175: dates */
console.group('dates');
/* Create a date */
const now1 = new Date(); /* current date */
console.log(now1);

console.log(new Date('Aug 07 2022 15:19:03')); /* specified date */
console.log(new Date('December 22, 2022'));
console.log(new Date('2019-11-18T21:31:17.178Z'));

console.log(new Date(2030, 10, 19, 4, 23, 5)); /* month count starts from 0 */
console.log(new Date(0)); /* start of UNIX time, january 1 1970 */
console.log(new Date(3 * 24 * 60 * 60 * 1000)); /* Days to milliseconds */

/* Working with dates */
const future = new Date(2032, 10, 19, 4, 23);

console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); /* day */
console.log(future.getDay()); /* day of the week */
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); /* internation datetime format */
console.log(future.getTime()); /* miliseconds since january 1 1970 */

console.log(Date.now()); /* timestamp of NOW */

future.setFullYear(2040);
/* -||- rest of methods */
console.groupEnd();
