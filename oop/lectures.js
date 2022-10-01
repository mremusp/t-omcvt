'use strict';

/* 206: what is OOP */
/*
Abstraction: ignoring or hiding details that don't matter
Encapsulation: keep properties and methods private inside the class (some can be exposed as API)
Inheritance: Makes all props and methods of a parent class available to a child class
Polymorphism: Child class can overwrite inherited method
*/

/* 207: OOP in JS */
/* 
objects are linked to prototypes, these contain methods which are accesible to the linked objects (prototypal inheritance)
Objects delegate behaviour to the prototype

Constructor functions:
 - create objects from a function
 - how built-in objects like array, maps, sets are implemented
ES6 classes:
 - modern alternative to constructor
 - syntactic sugar: works exactly like constructor
 - do NOT behave like classes in "classical OOP"
Object.create():
 - easiest and most straightforward way of linking an object to a prototype
*/
/*  */
// console.group('');
// console.groupEnd();

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
console.groupCollapsed('Prototypes');
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

/* Prototypal inheritance on built-in objects */
console.groupCollapsed('prototypal inheritance on built-in objects');
console.log(marius.__proto__);
console.log(marius.__proto__.__proto__); /* prototype of the object constructor */
console.log(Person.prototype.constructor); /* Person constructor as declared above */
console.dir(Person.prototype.constructor); /* Person constructor */

const arr = [1, 2, 1, 4, 3, 4, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); /* true */
console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
	return [...new Set(this)];
}; /* added new method for all array objects */

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir((x) => x + 1);
console.groupEnd();

/*  213: ES6 Classes */
console.group('ES6 Classes');

/* class expression */
// const PersonCl = class{

// }

/* class declaration */
class PersonCl {
	constructor(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	}
	calcAge() {
		console.log(2037 - this.birthYear);
	} /* methods declared in a class are on the prototype, not the object instance */
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

PersonCl.prototype.greet = function () {
	console.log(`Hey ${this.firstName}`);
};
jessica.greet();

/*
1. Classes are not hoisted
2. Classes are first-class citizens (can be passed into functions, or returned from functions)
3. Classes are executed in strict mode (even without "use strict")
*/
console.groupEnd();
