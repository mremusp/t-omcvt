'use strict';

/* 135 - coding challenge */
const poll = {
	question: 'What is your favourite programming language?',
	options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
	// This generates [0, 0, 0, 0]. More in the next section!
	answers: new Array(4).fill(0),
};

poll.registerNewAnswer = function () {
	const inputNr = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(write option number)`));

	0 <= inputNr && inputNr <= 3 ? this.answers[inputNr]++ : alert('please write a number between 0 and 3');
	displayResults.call(this);
}; /* step 1 */

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll)); /* step 2 */

const displayResults = function (type = 'array', arr = this.answers ?? []) {
	console.log(type === 'string' ? `Poll results are ${arr.join(', ')}` : type == 'array' ? arr : 'Incorrect type, try "string" or "array"');
};

/* 139 : coding challenge */

(function () {
	const header = document.querySelector('h1');
	header.style.color = 'red';

	document.querySelector('body').addEventListener('click', () => (header.style.color = 'blue'));
})();
