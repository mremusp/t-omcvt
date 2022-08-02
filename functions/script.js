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
console.group('passing arguments: value vs reference');

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
	iataCode: 'EN',
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
console.group('bind method');

console.groupEnd();
