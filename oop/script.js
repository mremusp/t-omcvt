'use strict';
/*  208: constructor functions */
console.group('constructor functions');
/* constructor functions are identical to regular functions, with the added "new" operator */
const Person = function (firstName, birthYear) {
	/* convention: start constructor with uppercase letter */
	this.firstName = firstName;
	this.birthYear = birthYear;

	/* do not do this: */
	// this.calcAge = function () {
	// 	console.log(2037 - birthYear);
	// };
}; /* arrow functions don't work as constructors (need this keyword) */

const marius = new Person('Marius', 1993);
/* because of "new":
1. new {} is created
2. function is called, this = {}
3. {} linked to prototype
4. function automatically returns {}
*/
console.log(marius);
console.log(marius instanceof Person); /* checks if object is built with constructor */

const matilde = new Person('Matilde', 2001);
const jack = new Person('Jack', 1992);
console.groupEnd();

/* 209: prototypes */
console.group('Prototypes');
Person.prototype.calcAge = function () {
	console.log(2038 - this.birthYear);
};

marius.calcAge();
console.log(Person.prototype); /* prototype of linked objects */
console.log(marius.__proto__); /* prototype of object instance */

Person.prototype.species = 'Homo Sapiens';
console.log(marius.species, jack.species);
console.log(marius.hasOwnProperty('firstName')); /* property of object */
console.log(marius.hasOwnProperty('species')); /* property of prototype */

console.groupEnd();
