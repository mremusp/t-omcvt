'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2020-05-08T14:11:59.604Z',
		'2020-05-27T17:01:17.194Z',
		'2020-07-11T23:36:17.929Z',
		'2022-08-07T10:51:36.790Z',
	],
	currency: 'EUR',
	locale: 'pt-PT', // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatCurrency = (amount) => new Intl.NumberFormat(navigator.locale, { style: 'currency', currency: currentAccount.currency }).format(amount);

const calcDisplayBalance = (acc) => {
	acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);
	labelBalance.textContent = formatCurrency(acc.balance);
};

const calcDisplaySummary = (account) => {
	const incomes = account.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = formatCurrency(incomes);

	const outcomes = account.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + Math.abs(mov), 0);
	labelSumOut.textContent = formatCurrency(outcomes);

	const interest = account.movements
		.filter((mov) => mov > 0)
		.map((deposit) => (deposit * account.interestRate) / 100) /* how calculate percentage (1.2% in this case) */
		.filter((int) => int >= 1)
		.reduce((sum, int) => sum + int, 0);
	labelSumInterest.textContent = formatCurrency(interest);
};

const formatMovementDate = function (date, locale) {
	const calcDaysPassed = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

	const daysPassed = calcDaysPassed(new Date(), date);

	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;
	else {
		// return `${`${date.getDate()}`.padStart(2, 0)}/${`${date.getMonth() + 1}`.padStart(2, 0)}/${date.getFullYear()}`;
		return new Intl.DateTimeFormat(locale).format(date);
	}
};

const displayMovements = function (acc, sort = false) {
	/* better to pass data into function, instead of using global variable */
	containerMovements.innerHTML = '';

	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements; /* makes a copy and sorts it */

	movs.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		const date = new Date(acc.movementsDates[i]);
		const displayDate = formatMovementDate(date, navigator.locale);

		const formattedMovement = new Intl.NumberFormat(navigator.locale, { style: 'currency', currency: acc.currency }).format(mov);

		const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMovement}</div>
    </div>`;

		containerMovements.insertAdjacentHTML('afterbegin', html); /* inserts child element right at the beggining of the parent */
	});
};

const createUsernames = (users) =>
	users.forEach(
		(user) =>
			(user.username = user.owner
				.toLowerCase()
				.split(' ')
				.map((word) => word.slice(0, 1))
				.join(''))
	);
createUsernames(accounts);

const updateUI = function (acc) {
	/* Display movements */
	displayMovements(acc);

	/* Display balance */
	calcDisplayBalance(acc);

	/* Display summary */
	calcDisplaySummary(acc);
};

const startLogoutTimer = () => {
	/* set time to 5 minutes */
	let timeRemaining = 90;
	const timeDown = () => {
		const min = Math.floor(timeRemaining / 60);
		const seconds = timeRemaining % 60;
		/* In each call, print remaining time */
		labelTimer.textContent = `${`${min}`.padStart(2, 0)}:${`${seconds}`.padStart(2, 0)}`;

		/*when 0 seconds, stop timer and log out user */
		if (timeRemaining === 0) {
			clearInterval(timer);
			labelWelcome.textContent = 'Log in to get started';
			containerApp.style.opacity = 0;
		}
		/* Decrease 1 second */
		timeRemaining--;
	};

	/* call tiemr every second */
	timeDown(); /* setInterval only starts running callback after one pass */
	const timer = setInterval(timeDown, 1000);
	return timer;
};

let currentAccount, timer; //= account1; /* account will be used in other functions too, hence globally defined */
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (e) {
	/* pressing eneter while input field in focus triggers a click event */
	e.preventDefault();
	currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);

	if (currentAccount?.pin === +inputLoginPin.value) {
		/* Display UI and message */
		labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
		containerApp.style.opacity = 1;

		/* create current date and time */
		const now = new Date();
		const options = {
			day: 'numeric',
			month: 'long' /* numeric, 2-digit*/,
			year: 'numeric',
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric',
		};
		const locale = navigator.language; /* set to browser language */
		labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now); /* formats date in language/country */

		/* Clear input fields */
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur(); /* remove focus fom field */

		timer && clearInterval(timer);
		timer = startLogoutTimer();

		updateUI(currentAccount);
	}
});

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = +inputTransferAmount.value;
	const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
	inputTransferAmount.value = inputTransferTo.value = '';

	if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc.username !== currentAccount.username) {
		currentAccount.movements.push(-amount);
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movements.push(amount);
		receiverAcc.movementsDates.push(new Date().toISOString());
		updateUI(currentAccount);
	}

	/* Reset timer */
	clearInterval(timer);
	timer = startLogoutTimer();
});

btnLoan.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Math.floor(inputLoanAmount.value);
	if (amount > 0 && currentAccount.movements.filter((mov) => mov > 0).some((deposit) => deposit >= amount / 10)) {
		setTimeout(() => {
			currentAccount.movements.push(amount);
			currentAccount.movementsDates.push(new Date().toISOString());
			updateUI(currentAccount);
		}, 5000);
	}
	inputLoanAmount.value = '';

	clearInterval(timer);
	timer = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
	e.preventDefault();
	if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
		const index = accounts.findIndex((acc) => (acc.username = currentAccount.username));
		accounts.splice(index, 1); /* removes 1 element, starting from position "index" */
		containerApp.style.opacity = 0;
	}

	inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
	e.preventDefault();
	displayMovements(currentAccount, !sorted);
	sorted = !sorted;
});
