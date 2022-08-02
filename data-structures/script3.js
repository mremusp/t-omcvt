'use strict';

const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],

	orderPasta: function (ing1, ing2, ing3) {
		console.log(`Pasta here with ${ing1},${ing2} and ${ing3}`);
	},
};

/* lesson 111 - for-of loop */
(() => {
	const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

	for (const item of menu) {
		// console.log(item);
	}

	for (const item of menu.entries()) {
		/* .entries() to get indexes */
		// console.log(item);
	}

	for (const [i, el] of menu.entries()) {
		// console.log(`${i + 1}: ${el}`);
	}
})();

/* lesson 112 - enhanced object literals */
(() => {
	const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
	const openingHours = {
		/* thu: { // echivalent cu: */
		[weekdays[3]]: {
			/* ce e intre [] poate fi computed */
			open: 12,
			close: 22,
		},
		fri: {
			open: 11,
			close: 23,
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24,
		},
	};

	const restaurant2 = {
		name: 'al doilea',
		openingHours, // creeaza key:value cu opening hours declarate mai sus
		displayName() {
			console.log(this.name); // declararare mai scurta a metodelor
		},
	};
})();

/* lesson 113 - optional chaining */
(() => {
	if (restaurant.openingHours && restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

	/* WITH optional chaining */
	// console.log(restaurant.openingHours?.mon?.open); /* "open" property is read if before "?" exists ( not nullish ), else result is undefined */

	const users = [{ name: 'Remus', email: 'm.r.pislaru@gmail.com' }];

	// console.log(users[0]?.name ?? "user doesn't exist");
})();

/* lesson 114 - looping objects */

const openingHours = {
	thu: {
		open: 12,
		close: 22,
	},
	fri: {
		open: 11,
		close: 23,
	},
	sat: {
		open: 0,
		close: 24,
	},
};
const properties = Object.keys(openingHours);
// console.log(properties.length); /* check how many properties in an object */
let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) openStr += `${day}, `;

const values = Object.values(openingHours);
const entries = Object.entries(openingHours);

for (const [key, { open, close }] of entries) {
	// console.log(`on ${key} we open at ${open} and close at ${close}`);
}

// console.log(openStr);

/* lesson 116 - sets */
console.groupCollapsed('lesson 116 - sets');
const ordersSet = new Set([/* introduced in ES6 */ 'Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pasta', 'Pizza']);
console.log(ordersSet); /* => returns all values, no duplicates */
console.log(new Set('Remus')); /* => returns each letter, no duplicates */
console.log(ordersSet.size); /* => returns number of unique values */
console.log(ordersSet.has('Pizza')); /* => returns bool if value exists in set */
ordersSet.add('Garlic Bread'); /* => adds value if it doesn't already exist in set */
ordersSet.delete('Risotto'); /* => deletes a value from set */
// ordersSet.clear(); /* => deletes every element */

for (const order of ordersSet) console.log(order); /* =>  iterates over set */
/* Use case: */
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; /* => creates a set of unique staff positions, then spreads it into a new array */
console.groupEnd();

/* lesson 117 - maps: fundamentals */
console.groupCollapsed('lesson 117 - maps: fundamentals');

const rest = new Map(); /* introduced in ES6 */
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); /* .set(x, y) adds key/value pair AND returns the new map object */
rest
	.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
	.set('open', 11)
	.set('close', 23)
	.set(true, 'We are open')
	.set(false, 'We are closed'); /* multiple .set() can be chained */

console.log(
	rest.get('name'),
	rest.get(true),
	rest.get(1),
	rest.size /* number of key/value pairs */
); /* returns the value corresponding to the key specified in .get(x) !! must match data type !! */

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); /* checks if time in between open and close */

console.log(rest.has('categories')); /* returns bool if key specified in .has(x) exists in map */

rest.delete(2); /* deletes key/value specified in .delete(x) !! does NOT return the new map !!*/
// rest.clear(); /* removes all elements */

rest.set([1, 2], 'test');
console.log(rest.get([1, 2])); /* not the same array as the key defined above (array should be saved into a variable) */
rest.set(document.querySelector('h1'), 'Heading'); /* can use DOM elements as keys */
console.groupEnd();

/* lesson 188 - Maps: Iteration */
console.groupCollapsed('lesson 188 - Maps: Iteration');

const question = new Map([
	['question', 'What is the best programming language?'],
	[1, 'C'],
	[2, 'Java'],
	[3, 'JavaScript'],
	['correct', 3],
	[true, 'Correct'],
	[false, 'Try again'],
]); /* initializes map as an array of key/value pairs !! each pair is a different array !!*/

const hoursMap = new Map(Object.entries(openingHours)); /* convert object to map */

console.log(question.get('question'));
for (const [key, value] of question) {
	/*  ^^^ destructures each key/value pair as separate variables */
	if (typeof key === 'number') console.log(`Answer ${key}: ${value}`); /* only logs for keys of type number */
}
// const answer = Number(
// 	prompt('Your answer:')
// ); /* gets answer from user and converts to number */

// console.log(
// 	question.get(answer === question.get('correct'))
// ); /* compares answer to value from 'correct', gets the value from bool key/value */

/*Convert map to array: */
console.log([...question]);

console.groupEnd();

/* which Data structure to use?

sources of data:
1. written in code
2. from UI (user inputs)
3. external sources (API)+

for simple list, use Array or Set
for key/value pairs, use Objects or Maps

Array vs Set:
- arrays when need in order, and might contain duplicates
- sets when only uniques needed, and high performance

Object vs Map:
- maps can have any data type, easier to iterate, better performance
- objects are easier to write and access data with . and []
- objects when functions (methods) are needed, and when working with JSON
- maps when only key/value pairs are needed, and need keys that are not strings */

/* lesson 121 - working with strings */
console.group('Working with strings');

const airline = 'TAP Air Portugal';
const plane = 'A320neo';

console.log(plane[0]); /* gets []-th character of string */
console.log(airline.indexOf('ug'), airline.lastIndexOf('r')); /* first / last occurence of passed parameter (character or substring) */
console.log(airline.slice(4), airline.slice(4, 7)); /* returns substring starting with position passed in (), up to second paramater */
console.log(airline.slice(0, airline.indexOf(' ')), airline.slice(airline.lastIndexOf(' ') + 1)); /* returns first word of string, last word */
console.log(airline.slice(-2), airline.slice(1, -1)); /* negative values start from end of string */

const checkMiddleSeat = function (...seats) {
	/* B and E are middle seats */
	const isMiddle = seats.map((seat) => {
		if (seat.slice(-1) === 'B' || seat.slice(-1) === 'E') return `${seat} is middle seat;`;
		return `${seat} isn't middle seat;`;
	});
	console.log(...isMiddle);
};
checkMiddleSeat('11B', '23C', '3E'); /* check if passed seats are middle seats */

console.log(airline.toLowerCase(), airline.toUpperCase()); /* returns string in upper/lower case */
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase + passengerLower.slice(1); /* corrects capitalization */

const email = 'hello@jonas.io';
const loginEmail = '  Hello@jonas.io \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); /* removes whitespace from both ends of string */
console.log(trimmedEmail == email);

const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); /* replaces first occurence of first paramater with second parameter */
const msg1 = 'Marius 1, Marius 2';
console.log(msg1.replaceAll('Marius', 'Remus')); /* replaces all occurencies */
console.log(msg1.replace(/Marius/g, 'Remus')); /* replace all with RegEx */
console.log(priceUS);

console.log(plane.includes('A320')); /* bool if includes substring passed */
console.log(plane.startsWith('Air')); /* bool if starts with substring passed */
console.log(plane.endsWith('neo')); /* bool if ends with substring passed */

const checkBaggage = function (items) {
	const baggage = items.toLowerCase(); /* turn everything to lower case for comparing */
	if (baggage.includes('knife') || baggage.includes('gun')) {
		console.log('not allowed on board');
	} else console.log('welcome aboard');
};
checkBaggage('Food, clothes, Knife');
checkBaggage('Snacks, camera');
checkBaggage('gun, socks');

console.log('a+very+nice+string'.split('+')); /* divides into multiple strings by the passed parameter, returns into array */

const [firstName, lastName] = 'Marius Pislaru'.split(' ');
console.log(['Mr.', firstName, lastName.toUpperCase()].join(' ')); /* joins array elements into string, separated by passed parameter */

const capitalizeName = function (name) {
	console.log(
		name
			.split(' ')
			// .map((substr) => substr[0].toUpperCase() + substr.slice(1))
			.map((substr) => substr.replace(substr[0], substr[0].toUpperCase())) /* alternative way */
			.join(' ')
	);
}; /* capitalize every word in string */

const message = 'go to gate 23';
console.log(message.padStart(25, '+')); /* adds 2nd parameter to begging of string until length = first parameter */
console.log(message.padEnd(25, '+')); /* adds parameter to end of string */

const maskCreditCard = function (number) {
	/* hide credit card number */
	const str = String(number); /* conver number to string */
	// const str = number + ''; /* same as above */
	console.log(str.slice(-4).padStart(str.length, '*'));
};
maskCreditCard(1234567890123456);

const message2 = 'Bad weather... All departures delayed...';
console.log(message2.repeat(5)); /* returns string repeat X times */
const planesInLine = function (n) {
	console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(10);

console.groupEnd();
