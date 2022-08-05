'use strict';

/* lesson 128 - default parameters*/
console.groupCollapsed('default parameters');

const bookings = [];
const defPrice = 555;
const createBooking = function (
	flightNum,
	numPassengers = 1,
	price = 199 * numPassengers
	// price = defPrice /* can set a previously declared variable as default */
) /* set value of parameter if not passed into function paramaters; default value can be calcuated based on a previous parameter */ {
	// ES5:
	// numPassengers = numPassengers || 1;
	// price = price || 199;
	const booking = {
		flightNum,
		numPassengers,
		price,
	};
	console.log(booking);
	bookings.push(booking);
};
createBooking('asd', 2);
createBooking('fgh', undefined, 3); /* undefined to skip declaring a parameter */
createBooking('for default price test', undefined);
console.groupEnd();

/* lesson 129 - passing arguments: value vs reference */
console.groupCollapsed('passing arguments: value vs reference');

const flight = 'LH234';
const jonas = {
	name: 'Marius Pslr',
	passport: 24987698,
};

const checkIn = function (flightNum, passenger) {
	flightNum = 'LH999'; /* flightNum is a copy of the passed parameter, changing inside the function won't affect the outside variable */
	passenger.name = 'Mr. ' + passenger.name; /* reference is copied into parameter, manipulating the same memory address */

	if (passenger.passport === 24987698) {
		// alert('check in');
	} else {
		// alert('wrong passport!');
	}
};

checkIn(flight, jonas);
console.log(flight, jonas);

const newPassport = function (person) {
	person.passport = Math.trunc(Math.random() * 1000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(flight, jonas);

console.groupEnd();

/* lesson 130
First-class and higher-order functions.
First class means functions are simply values:
 - can be stored in variables or properties;
 - can be passed as arguments to other functions;
 - can be returned from other functions;
 - methods can be called on functions.

 Higher order functions: function that receives a func as an argument, OR return a new functions */

/* 131: callback functions */
console.groupCollapsed('callback functions');

const oneWord = function (str) {
	return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
	const [first, ...others] = str.split(' ');
	return [first.toUpperCase(), ...others].join(' ');
};

/* higher-order function */
const transformer = function (str, fn) {
	console.log(`Original string: ${str}`);
	console.log(`Transformed string: ${fn(str)}`);

	console.log(`Transformed by: ${fn.name}`); /* .name is the property with the function name */
};

transformer('JavaScript is the best', upperFirstWord); /* passing func value without calling it */
transformer('JavaScript is the best', oneWord);

console.groupEnd();

/* 132: functions returning functions */
console.groupCollapsed('func returning functions');

// const greet = function (greeting) {
// 	return function (name) {
// 		console.log(`${greeting} ${name}`);
// 	};
// };

const greet = (greeting) => (name) => console.log(`${greeting} ${name}`); /* this is equivalent to above ... */

const greeterHey = greet('hey'); /* greeterHey will be the function inside the greet function */
greeterHey('Remus');
greet('Hello')('Marius'); /* equivalent to above */

console.groupEnd();

/* 133: call and apply methods */
console.groupCollapsed('call and apply methods');

const lufthansa = {
	name: 'Lufthansa',
	iataCode: 'LH',
	bookings: [],
	// book: function() {}, /* shorter form below: */
	book(flightNum, name) {
		console.log(`${name} booked a seat on ${this.name} flight ${this.iataCode}${flightNum}`);
		this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); /* name compiles into key/value name: name */
	},
};

lufthansa.book(239, 'Remus Pslr');
lufthansa.book(564, 'John Smith');

const eurowings = {
	name: 'Eurowings',
	iataCode: 'EW',
	bookings: [],
};

const book = lufthansa.book;
// book(234, 'Sarah Williams'); /* not working, "this" points to undefined (in strict mode) */
book.call(eurowings, 23, 'Sarah Williams'); /* first parameter of .call() points to the object "this" should refer to, function parameters written as usual */

const swiss = {
	name: 'Swiss Air Lines',
	iataCode: 'LX',
	bookings: [],
};
book.call(swiss, 857, 'Mary Shelley');

const flightData = [489, 'Kurt Loyd'];
book.apply(swiss, flightData); /* same as .call(), but receives the function parameters as an array ( deprecated by book.call(swiss, ...flightData) )*/

console.groupEnd();

/* 134: bind method */
console.groupCollapsed('bind method');

const bookEW = book.bind(eurowings); /* returns new function, with "this" set to the parameter !!does not call the function!! */
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(79, 'Steven Wilson');

const bookEW45 = book.bind(
	eurowings,
	45
); /* returns the function with the first parameter already set !!no longer needed at all!! (called partial application)*/
bookEW45('Johnny Spaceman');

/* With event listeners */
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
	console.log(this);
	this.planes++;
	console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); /* "this" refers to the clicked button */
document
	.querySelector('.buy')
	.addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); /* use .bind() when need function definition, .call() to call it too */

/* Partial application */
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23); /* don't need a "this", defining a function with a permanently set parameter */
console.log(addVat(100));

/* challenge: do the tax function as func returning another function */
const calcTax = function (value) {
	return function (rate) {
		return value + value * rate;
	};
};
const calcTaxArr = (value) => (rate) => value + value * rate;
console.log(calcTax(200)(0.2));
console.log(calcTaxArr(300)(0.15));

const calcTaxVAT = function (value) {
	return calcTax(value)(0.19);
};
console.log(calcTaxVAT(100));
const calcTaxVATArr = (value) => calcTaxArr(value)(0.19);
console.log(calcTaxVATArr(1000));

(function () {
	console.log('this will not run again');
})(); /* function declared and immediatly called */

console.groupEnd();

/* 137: Closures */
console.group('Closures');

/* closures are not created manually, stuff just happens in some situations */
const secureBooking = function () {
	let passengerCount = 0;
	console.log(`passengers beggining: ${passengerCount}`);
	return function () {
		passengerCount++;
		console.log(`${passengerCount} passengers`);
	};
};

const booker = secureBooking();
booker();
booker();

console.dir(booker); /* properties of a function */

/* un closure e un bagaj al unei functii cu toate variabilele disponibile in scope la momentul crearii functiei */

let f;
const g = function () {
	const a = 23;
	f = function () {
		console.log(a * 2);
	};
};

const h = function () {
	const a = 7;
	f = function () {
		console.log(a * 2);
	};
};

g(); /* reassigns f with a function */
f(); /* calls the newly assigned function */
h(); /* re-reassigns the f function, with the variable context of h() */
f(); /* calls the function with the new variable context */

const boardPassengers = function (n, wait) {
	const perGroup = n / 3;

	setTimeout(function () {
		console.log(`we are now boarding all ${n} passengers`);
		console.log(`there are 2 groups, each with ${perGroup} passengers`);
	}, wait * 1000);

	console.log(`will start boarding in ${wait} seconds`);
};

const perGroup = 10000;
boardPassengers(30, 2);

console.groupEnd();
