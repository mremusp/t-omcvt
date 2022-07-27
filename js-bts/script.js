'use strict';

(() => {
	function calcAge(birthYear) {
		const age = 2037 - birthYear;

		function printAge() {
			var firstName = 'Remus';
			const output = `${firstName}, you are ${age}, born in ${birthYear}`;
			// console.log(output);

			if (birthYear >= 1981 && birthYear <= 1996) {
				var milennial = true;
				const str = `Oh, and you're a milennial, ${firstName}`;
				// console.log(str);
			}
		}
		printAge();
	}

	const firstName = 'Marius';
	calcAge(1993);
})();

const jonas = {
	firstName: 'Jeans',
	year: 1993,
	calcAge: function () {
		console.log(2037 - this.year);

		const self = this;
		// const isMilennial = function () {
		// 	console.log(self.year >= 1981 && self.year <= 1996);
		// };
		const isMilennial = () => {
			console.log(this.year >= 1981 && this.year <= 1996);
		};
		isMilennial();
	},
	greet: () => console.log(`Hey ${this.firstName}`),
};

jonas.greet();
jonas.calcAge();

const jessica = {
	firstName: 'Jessica',
	lastName: 'Williams',
	age: 25,
};

const jessicaCopy = Object.assign({}, jessica);

jessicaCopy.lastName = 'Pslr';

console.log('Jessica: ', jessica);
console.log('Jessica copy:', jessicaCopy);
