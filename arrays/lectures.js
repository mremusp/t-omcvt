'use strict';

/* 142 & 143: simple array methods */
console.groupCollapsed('simple array methods');

let arr1 = ['a', 'b', 'c', 'd', 'e'];
console.log(arr1.slice(2, 4)); /* return new array, starting from position X, up to position Y ( < Y, not <= Y) */
console.log(arr1.slice(-2)); /* returns last X elements of array */
console.log(arr1.slice()); /* make a shallow copy, equivalent to [...arr] */

console.log(arr1.splice(2)); /* returns part of array starting with position X, REMOVING it from original array */
arr1.splice(1, 2); /* starting at position X, removes Y elements */

arr1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const arr2 = ['n', 'm', 'l', 'k', 'j'];
console.log(arr2.reverse()); /* reverses the original array */

const letters1 = arr1.concat(arr2); /* returns new array out of arr1 with arr2 added at the end, similar to [...arr1, ...arr2] */

console.log(letters1.join(' - ')); /* returns string out of all array elements, separated by passed parameter */

const arr3 = [23, 11, 64];
console.log(arr3.at(0)); /* same as arr3[0] (also works on strings) */
console.log(arr3.at(-1)); /* return last element of array */
console.groupEnd();

/* 144 & 145: forEach() */
console.groupCollapsed('forEach()');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
	if (movement > 0) {
		console.log(`You deposited ${movement}`);
	} else {
		console.log(`You withdrew ${Math.abs(movement)}`); /* get the absolute value of number */
	}
}

movements.forEach(function (movement, index, array) {
	/* runs the callback function for each element of the array */
	/* second parameter is the index of the current element, third is the entire array */
	if (movement > 0) {
		console.log(`You deposited ${movement}`);
	} else {
		console.log(`You withdrew ${Math.abs(movement)}`);
	}
});

/* !! forEach does not have break and continue !! */

const currencies = new Map([
	['USD', 'United States dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
	/* key acts as index */
	console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR']);
currenciesUnique.forEach(function (value, key, map) {
	/* sets have no key or index, "key" is same as "value" */
	console.log(`${key}: ${value}`);
});

console.groupEnd();

/* 148: challenge */
console.groupCollapsed('dog age challenge');

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 9, 3];
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (arrJulia, arrKate) {
	const arrJuliaDogs = arrJulia.slice(1, -2); /* step 1 */
	const allDogs = arrJuliaDogs.concat(arrKate); /* step 2 */
	allDogs.forEach(function (dog, i) {
		/* step 3 */ if (dog >= 3) {
			console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
		} else {
			console.log(`Dog number ${i + 1} is still a puppy 🐶`);
		}
	});
};

// checkDogs(dogsJulia, dogsKate);
checkDogs(dogsJulia2, dogsKate2);

/* 154: coding challenge */

const calcAverageHumanAge = function (ages) {
	const agesInHumanYears = ages.map((age) => (age <= 2 ? age * 2 : 16 + age * 4)); /* step 1 */
	const adultDogs = agesInHumanYears.filter((age) => age >= 18); /* step 2 */
	const averageAdultAge = adultDogs.reduce((sum, age) => sum + age, 0) / adultDogs.length; /* step 3 */
	return averageAdultAge;
};
const calcAverageHumanAgeArrow = (ages) =>
	ages
		.map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
		.filter((age) => age >= 18)
		.reduce((sum, age, i, arr) => sum + age / arr.length, 0); /* also for average (sum + element/totalElements) */

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]));

console.groupEnd();

/* 149: map, filter, reduce */
console.groupCollapsed('map, filter, reduce');
/* .map() returns a new array, with a callback function called on each element of the original array */
/* .filter() returns a new array, with the elements from the original which pass a specified condition */
/* .reduce() return a single value, built from all the elements of the original array */

const eurToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
	return mov * eurToUsd;
});
const movementsUSDarrow = movements.map((mov) => mov * eurToUsd);
console.log(`movements: ${movements}, movementsUSD: ${movementsUSD}`);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movementsUSDfor);

const movementsStrings = movements
	.map(function (mov, i, array) {
		/* .map() also has access to index and full array */
		// if (mov > 0) {
		// 	return `Movement ${i + 1}: You deposited ${mov}`;
		// } else {
		// 	return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
		// }

		/* shorter form: */
		return `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`;
	})
	.join('\n');
console.log(`Movements string:
${movementsStrings}`);

const deposits = movements.filter(function (mov) {
	/* .filter() returns a boolean on each iteration, returned array is only true values */
	return mov > 0;
});
const withdrawals = movements.filter((mov) => mov < 0).map((mov) => Math.abs(mov));
console.log(`deposits: ${deposits}`);

const globalBalance = movements.reduce(function (accumulator, currentElement, index, array) {
	/* accumulator stores the final value of the method */
	return accumulator + currentElement; /* each iteration returns the current value of accumulator */
}, 0); /* second parameter of .reduce() is the initial value of the accumulator */

let balance2 = 0;
for (const mov of movements) {
	balance2 += mov;
}

/* get maximum */
console.log(
	`Maximum value is ${movements.reduce((max, mov) => (mov > max ? mov : max), movements[0])}`
); /* use first value of array as initial maximum/minimum */

/* 155: chaining methods */
const totalDepositsInUSD = movements
	.filter((mov) => mov > 0)
	// .map((mov) => mov * eurToUsd)
	.map((mov, _, arr) => {
		console.log(arr); /* how to see the array during the pipeline */
		return mov * eurToUsd;
	})
	.reduce((sum, mov) => sum + mov, 0);
console.log(`Total deposits in USD: ${totalDepositsInUSD}`);

console.groupEnd();

/* 158: .find() method */
console.groupCollapsed('find, some, flat, sort');
const firstWithdrawal = movements.find((mov) => mov < 0); /* returns first element that satisfies condition */

const account = accounts.find((acc) => acc.owner === 'Jessica Davis'); /* get object from array by a property */

/* 161 : some and every */
const anyDeposits = movements.some((mov) => mov > 0); /* returns bool if ANY element passes the callback function */
const everyDeposits = movements.every((mov) => mov > 0); /*return bool if EVERY element passes the callback function */

/* Separate callback */
const deposit = (mov) => mov > 0; /* reuse callback function */
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

/* 162: flat, flatMap */
const arrF = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrF.flat()); /* removes 1 level of nesting arrays (flattens it) */
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); /* removes X levels of nesting arrays */

// const accountMovements = accounts.map((acc) => acc.movements); /* get 1 property from array of objects */
// const allMovements = accountMovements.flat();
const overallBalance = accounts
	.map((acc) => acc.movements)
	.flat()
	.reduce((sum, mov) => sum + mov, 0);

const overallBalance2 = accounts.flatMap((acc) => acc.movements).reduce((sum, mov) => sum + mov, 0); /* first does .map(), then flat() */

/* 163: sorting arrays */
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); /* sorts the original array (as strings)*/

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// movements.sort((a, b) => {
// 	if (a > b) return 1;
// 	if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

console.groupEnd();

/* 164: more ways of creating arrays */
console.groupCollapsed('more ways of creating arrays');

const x = new Array(7); /* new array with 7 empty values (???) */
// x.fill(1); /* fills (replaces) entire array with 1 values*/
x.fill(1, 3, 5); /* - || -, starting with position 3, up to position 5 */

const y = Array.from({ length: 7 }, () => 1); /* creates array with 7 elements, all with the value of 1 */
const z = Array.from({ length: 7 }, (_, i) => i + 1); /* creates [1, 2, 3, 4, 5, 6, 7] !! _ = throwaway variable, not used anywhere !!*/

const diceRolls = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6 + 1)); /* generates array of 100 dice rolls */
console.log('Dice rolls: ', ...diceRolls);

labelBalance.addEventListener('click', () => {
	const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (el) =>
		el.textContent.replace('€', '')
	); /* get array of DOM elements, then run callback on each element (like .map) */
	console.log(movementsUI);

	const movementsUI2 = [...document.querySelectorAll('.movements__value')]; /* also creates array from NodeList (querySelectorAll) */
});

/* Which method to use?
To mutate original:
- .push (add end)
- .unshift (add start)
- .pop (remove end)
- .shift (remove start)
- .splice (remove any)
- .reverse
- .sort
- .fill

A new array:
- .map
- .filter
- .slice
- .concat
- .flat
- .flatMap

An array index:
- .indexOf (looks for value)
- .findIndex (looks for test condition)

An array element:
- .find

Know if array includes:
- .includes (looks for value)
- .some (looks for test condition)
- .every -||-

A new string: 
- .join

To transform to value:
- .reduce

To just loop array:
- .forEach
*/
/* 166: practice array methods */

const bankDepositSum = accounts
	// .map((acc) => acc.movements) /* get only the movements arrays */
	// .flat() /* flatten the array of arrays */
	.flatMap((acc) => acc.movements) /* do both from above */
	.filter((mov) => mov > 0) /* only keep positive values */
	.reduce((sum, mov) => sum + mov, 0); /* add all values together */

const depositsAbove1000 = accounts.flatMap((acc) => acc.movements).filter((mov) => mov >= 1000).length;
const numDepositsAbove1000 = accounts.flatMap((acc) => acc.movements).reduce((nr, mov) => (mov >= 1000 ? nr + 1 : nr), 0);

const sumDepositsWithdrawals = accounts
	.flatMap((acc) => acc.movements)
	.reduce(
		(sum, mov) => {
			mov > 0 ? (sum.deposits += mov) : (sum.withdrawals += Math.abs(mov));
			// sum[mov > 0 ? 'deposits' : 'withdrawals'] += mov; /* cleaner method of above line */
			return sum; /* reduce array into object properties */
		},
		{ deposits: 0, withdrawals: 0 }
	);

/* convert string into title case */
const convertTitleCase = function (title) {
	const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
	const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

	const titleCase = title
		.toLowerCase()
		.split(' ')
		.map((word) => (exceptions.includes(word) ? word : capitalize(word)))
		.join(' ');

	return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
console.groupEnd();

/* 167: challenge */
console.group('challenge 4');

const dogs = [
	{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
	{ weight: 8, curFood: 200, owners: ['Matilda'] },
	{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
	{ weight: 32, curFood: 340, owners: ['Michael'] },
];

const checkFoodIntake = (dog) => {
	if (dog.curFood < dog.recommendedFood * 0.9) {
		return -1;
	} else if (dog.curFood > dog.recommendedFood * 1.1) {
		return 1;
	} else {
		return 0;
	}
};

const displayHowDogEating = (dog) => {
	if (checkFoodIntake(dog) === -1) {
		console.log('Dog eating too little');
	} else if (checkFoodIntake(dog) === 1) {
		console.log('Dog eating too much');
	} else {
		console.log('Dog eating right');
	}
};

dogs.forEach((dog) => {
	dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
}); /* step 1 */

displayHowDogEating(dogs.find((dog) => dog.owners.includes('Sarah'))); /* Step 2 */

const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce(
	(arrs, dog) => {
		if (checkFoodIntake(dog) === 1) arrs.ownersEatTooMuch.push(dog.owners);
		else if (checkFoodIntake(dog) === -1) arrs.ownersEatTooLittle.push(dog.owners);
		else null;
		return arrs;
	},
	{ ownersEatTooMuch: [], ownersEatTooLittle: [] }
); /* step 3 */

const nameAndShame = function (arr, intake = 'much') {
	arr.forEach((owners) => console.log(`${owners.join(' and ')}'s dog eats too ${intake}`));
}; /* step 4 */
nameAndShame(ownersEatTooMuch, 'much');
nameAndShame(ownersEatTooLittle, 'little');

console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood)); /* step 5 */
console.log(dogs.some((dog) => checkFoodIntake(dog) === 0)); /* step 6 */
const dogsEatingOkay = dogs.filter((dog) => checkFoodIntake(dog) === 0); /* step 7 */
const dogsCopy = [...dogs];
dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood); /* step 8 */

console.groupEnd();
