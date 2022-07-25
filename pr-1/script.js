'use strict';
// Modern JS course for everyone - Section 7: Project #1 - Guess my number

let secretNumber = Math.trunc(Math.random() * 20 + 1);

let score = 20;
let highScore = 0;

const displayMessage = function (message) {
	document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
	const guess = Number(document.querySelector('.guess').value);

	if (!guess) {
		displayMessage('🚫 No number!');
	} else if (guess === secretNumber) {
		displayMessage('🎉 Correct Number!');
		document.querySelector('.number').textContent = secretNumber;
		document.querySelector('body').style.backgroundColor = '#60b347';
		document.querySelector('.number').style.width = '30rem';

		if (score > highScore) {
			highScore = score;
			document.querySelector('.highscore').textContent = highScore;
		}
	} else if (guess !== secretNumber) {
		if (score > 1) {
			displayMessage(guess > secretNumber ? '👆 Too high!' : '👇 Too low!');
			document.querySelector('.score').textContent = --score;
		} else {
			displayMessage('💥 You lost the game!');
		}
	}
});

document.querySelector('.again').addEventListener('click', function () {
	secretNumber = Math.trunc(Math.random() * 20 + 1);
	displayMessage('Start guessing...');
	document.querySelector('.number').textContent = '?';
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').style.width = '15rem';

	score = 20;
	document.querySelector('.score').textContent = score;
	document.querySelector('.guess').value = '';
});
