'use strict';

// Data needed for a later exercise
const flights =
	'_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],
	order: function (starterIndex, mainIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
	},
	orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
		console.log(
			`Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
		);
	},

	openingHours: {
		thu: {
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
	},
	orderPasta: function (ing1, ing2, ing3) {
		console.log(`Pasta here with ${ing1},${ing2} and ${ing3}`);
	},
};

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

const [starter, main] = restaurant.order(2, 0);
// console.log(starter, main);

const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
// console.log(i, j, k);

const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

const {
	name: restaurantName,
	openingHours: hours,
	categories: tags,
} = restaurant;
// console.log(restaurantName, hours, tags);

// destructuring nested object
const {
	fri: { open, close },
} = hours;
console.log(open, close);

let a = 11;
let b = 22;
const obj = { a: 1, b: 2, c: 3 };
//paranteze necesare pt destructurarea pe variabile declarate anterior
({ a, b } = obj);

restaurant.orderDelivery({
	time: '22:30',
	address: 'padureni 10',
	mainIndex: 1,
	starterIndex: 0,
});

// shallow copy of array / {...obj} for objects too
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

const str = 'Remus';
const letters = [...str, ' ', 'P.'];
// logs ['R', 'e', 'm', 'u', 's', ' ', 'P.']

// const ingredients = [
// 	prompt("Let's make pasta!\nIngredient 1?"),
// 	prompt('Ingredient 2?'),
// 	prompt('Ingredient 3?'),
// ];
// restaurant.orderPasta(...ingredients);

const newRestaurant = { founder: 'Miahai', ...restaurant };
console.log(newRestaurant);

((nullishCoalescing) => {
	restaurant.numGuests = 0;
	const guests = restaurant.numGuests || 10; // = 10
	const guestCorrect = restaurant.numGuests ?? 10; //  = 0
})();

((logicalAssignmentOperators) => {
	const rest1 = {
		name: 'Capri',
		numGuests: 20,
	};
	const rest2 = {
		name: 'La piazza',
		owner: 'Giovanni',
	};

	rest1.numGuests = rest1.numGuests || 10;
	rest2.numGuests = rest2.numGuests || 10;
	//  ^ can be written as:
	rest1.numGuests ||= 10;
	rest2.numGuests ||= 10;
	// pentru a permite valoarea 0:
	rest1.numGuests ??= 10;

	rest1.owner = rest1.owner && '<ANONYMOUS>'; // returns undefined
	rest2.owner = rest2.owner && '<ANONYMOUS>'; // returns <ANONYMOUS>
	// ^ can be written as:
	rest1.owner &&= '<ANONYMOUS>'; // doesn't return anything
	rest2.owner &&= '<ANONYMOUS>'; // returns <ANONYMOUS>
})();
