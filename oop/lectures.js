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
console.groupCollapsed('ES6 Classes');

/* class expression */
// const PersonCl = class{

// }

/* class declaration */
class PersonCl {
	constructor(fullName, birthYear) {
		this.fullName = fullName;
		this.birthYear = birthYear;
	}

	/* instance methods */
	calcAge() {
		console.log(2037 - this.birthYear);
	} /* methods declared in a class are on the prototype, not the object instance */

	get age() {
		return 2037 - this.birthYear;
	}

	set fullName(name) {
		if (name.includes(' ')) this._fullName = name;
		else alert(`${name} is not a full name!`);
	} /* the setter is called when the property is declared with the constructor */

	get fullName() {
		return this._fullName;
	}
	/* jessica.fullName will call the getter, not display the property */

	/* static method */
	static hey() {
		console.log('howdy 🤠');
	}
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

PersonCl.prototype.greet = function () {
	console.log(`Hey ${this.fullName}`);
};
jessica.greet();

/*
1. Classes are not hoisted
2. Classes are first-class citizens (can be passed into functions, or returned from functions)
3. Classes are executed in strict mode (even without "use strict")
*/
console.groupEnd();

/* 214: Getters and setters */
console.groupCollapsed('getters and setters');

const account = {
	owner: 'marius',
	movements: [100, 150, 200, 300],

	get latest() {
		/* "get" keyword for getter function */
		return this.movements.slice(-1).pop();
	},

	set latest(mov) {
		/* "set" keyword for setter, parameter needed */
		this.movements.push(mov);
	},
};

console.log(account.latest); /* called like a property, not a function */
account.latest = 50; /* this is like latest(50) */

Person.hey = function () {
	console.log(`Hey there 😁`);
};
Person.hey();

console.groupEnd();

/* 216: Object.create */
console.groupCollapsed('Object.create');

const PersonProto = {
	calcAge() {
		console.log(2037 - this.birthYear);
	},

	init(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	},
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1990);
sarah.calcAge();

console.groupEnd();

/* 218: Inheritance */
console.groupCollapsed('Inheritance');

console.groupCollapsed('Constructor function');
(() => {
	const Person = function (firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	};

	Person.prototype.calcAge = function () {
		console.log(2037 - this.birthYear);
	};

	const Student = function (firstName, birthYear, course) {
		// this.firstName = firstName;
		// this.birthYear = birthYear;
		/* same as: */
		Person.call(this, firstName, birthYear); /* .call take the first parameter as the new "this" */
		this.course = course;
	};

	/* Linking prototypes */
	Student.prototype = Object.create(Person.prototype);

	Student.prototype.introduce = function () {
		console.log(`My name is ${this.firstName} and I study ${this.course}`);
	};

	const mike = new Student('Mike', 2020, 'Computer Science');
	mike.introduce();
	mike.calcAge();

	console.log(mike.__proto__);
	console.log(mike.__proto__.__proto__);

	console.log(mike instanceof Student);
	console.log(mike instanceof Person);
	console.log(mike instanceof Object);

	console.dir(Student.prototype.constructor);
	Student.prototype.constructor = Student;
})();
console.groupEnd();

console.groupCollapsed('ES6 Classes');

class StudentCl extends PersonCl {
	constructor(fullName, birthYear, course) {
		/* needs to happen first (creates "this" keyword) */
		super(fullName, birthYear);
		this.course = course;
	}

	introduce() {
		console.log(`My name is ${this.fullName} and I study ${this.course}`);
	}

	calcAge() {
		console.log(`I am ${2037 - this.birthYear} years old, but I feel like ${2037 - this.birthYear + 10}`);
	}
}

const martha = new StudentCl('Martha Jones', 2012, 'Comp Sci');
martha.introduce();
martha.calcAge();

console.groupEnd();

console.groupCollapsed('Object.create');

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
	PersonProto.init.call(this, firstName, birthYear);
	this.course = course;
};

StudentProto.introduce = function () {
	console.log(`me llama ${this.firstName} and I study ${this.course}`);
};
const jay = Object.create(StudentProto);
jay.init('Jay', 2009, 'Computer Science');
jay.introduce();
jay.calcAge();

console.groupEnd();
console.groupEnd();

console.group('Encapsulation');
/* 222: another class example */
console.groupCollapsed('another class example');

class Account {
	constructor(owner, currency, pin) {
		this.owner = owner;
		this.currency = currency;
		this.pin = pin;
		// this.movements = []; /* properties created with no input */
		this._movements = []; /* protected property convention, _ means property should not be changed outside the class */
		this.locale = navigator.language;

		console.log(`thanks for opening an account, ${owner}`);
	}

	/* Public interface */
	getMovements() {
		return this._movements;
	}

	deposit(val) {
		this._movements.push(val);
		return this; /* allows chaining of methods */
	}

	withdraw(val) {
		this.deposit(-val);
		return this;
	}

	_approveLoan(val) {
		return true;
	}

	requestLoan(val) {
		if (this._approveLoan(val)) {
			this.deposit(val);
			console.log('Loan approved');
			return this;
		}
	}
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// acc1.movements.push(250);
// acc1.movements.push(-140);
/* this not good ^ */
acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);
/* 'Protected properties and methods' */
console.log(acc1.getMovements());

console.groupEnd();

console.groupCollapsed('Private class fields and methods');

class AccountPr {
	/* Public fields: (instances) */
	locale = navigator.language;

	/* Private fields: (instances) */
	#movements = [];
	#pin;

	constructor(owner, currency, pin) {
		this.owner = owner;
		this.currency = currency;
		this.#pin = pin;

		console.log(`thanks for opening an account, ${owner}`);
	}

	/* Public methods: */
	getMovements() {
		return this.#movements;
	}

	deposit(val) {
		this.#movements.push(val);
	}

	withdraw(val) {
		this.deposit(-val);
	}

	requestLoan(val) {
		if (this.#approveLoan(val)) {
			this.deposit(val);
			console.log('Loan approved');
		}
	}

	/* Private methods: */
	#approveLoan(val) {
		return true;
	}
}

console.groupEnd();

console.group('chaining methods');
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
console.log(acc1.getMovements());
console.groupEnd();

console.groupEnd();
