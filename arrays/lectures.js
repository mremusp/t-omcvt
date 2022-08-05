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
console.group('dog age challenge');

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

console.groupEnd();
