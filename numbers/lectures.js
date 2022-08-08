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
console.groupCollapsed('dates');
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

/* 177, 178, 179: operations with dates, Intl date and number */
console.groupCollapsed('operations with dates');
console.log(+future); /* converts to timestamp (miliseconds since jan 1 1970) */

const calcDaysPassed = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24); /* get miliseconds to days */
console.log(calcDaysPassed(new Date(2039, 4, 14), new Date(2039, 4, 24)));

const num = 74288787.32;
const numOptions = {
	// style: 'unit',
	// style: 'percent',
	style: 'currency',
	unit: 'mile-per-hour',
	currency: 'EUR',
	// useGrouping: false,
};
console.log('US: ', new Intl.NumberFormat('en-US', numOptions).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', numOptions).format(num));
console.log('Syria: ', new Intl.NumberFormat('ar-SY').format(num));
console.log('Romania: ', new Intl.NumberFormat('ro-RO', numOptions).format(num));

console.groupEnd();

/* 180, 181: setTimeout and setInterval, countdown timer
 */
console.group('setTimeout setInterval');

const pizzaTimer = setTimeout(
	(ing1, ing2) => console.log(`Pizza with ${ing1} and ${ing2} time 🍕🍕🍕`),
	2000,
	'olives',
	'spinach'
); /* parameters after time get passed into callback function */

clearTimeout(pizzaTimer); /* cancels specified timeout */

// setInterval(() => {
// 	const now = new Date();
// 	console.log(`${now.getHours()}:${`${now.getMinutes()}`.padStart(2, 0)}:${`${now.getSeconds()}`.padStart(2, 0)}`);
// }, 1000);
console.groupEnd();
