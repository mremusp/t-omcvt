'use strict';

const game = {
	team1: 'Bayern Munich',
	team2: 'Borrussia Dortmund',
	players: [
		[
			'Neuer',
			'Pavard',
			'Martinez',
			'Alaba',
			'Davies',
			'Kimmich',
			'Goretzka',
			'Coman',
			'Muller',
			'Gnarby',
			'Lewandowski',
		],
		[
			'Burki',
			'Schulz',
			'Hummels',
			'Akanji',
			'Hakimi',
			'Weigl',
			'Witsel',
			'Hazard',
			'Brandt',
			'Sancho',
			'Gotze',
		],
	],
	score: '4:0',
	scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
	date: 'Nov 9th, 2037',
	odds: {
		team1: 1.33,
		x: 3.25,
		team2: 6.5,
	},
};

/* Challenge 1 */
console.groupCollapsed('Challenge 1');
const {
	players: [players1, players2],
} = game; // step 1

const [gk, ...fieldPlayers] = players1; // step 2
const allPlayers = [...players1, ...players2]; // step 3
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // step 4
const {
	odds: { team1: team1Odd, x: drawOdd, team2: team2Odd },
} = game; // step 5
const printGoals = (...playerNames) => {
	playerNames.forEach((name) => console.log(name));
	console.log('Total goals: ', playerNames.length);
}; // step 6
team1Odd < team2Odd && console.log('team1 wins');
team1Odd > team2Odd && console.log('team2 wins'); // step 7
console.groupEnd();

/* Below challenge 2: */
console.groupCollapsed('Challenge 2');
for (const [index, goalGetter] of game.scored.entries()) {
	console.log(`Goal ${index + 1}: ${goalGetter}`); // step 1
}
let sumOdds = 0;
for (const odd of Object.values(game.odds)) sumOdds += odd;
sumOdds /= Object.values(game.odds).length;
console.log(`Average odd: ${sumOdds.toFixed(2)}`); // step 2

console.log(`Odd of victory ${game.team1}: ${game.odds.team1}
Odd of draw: ${game.odds.x}
Odd of victory ${game.team2}: ${game.odds.team2}`); // step 3
for (const [team, odd] of Object.entries(game.odds)) {
	const teamStr = game[team] ? `victory ${game[team]}` : 'draw';
	console.log(`Odd of ${teamStr} : ${odd}`);
}
const scorers = {};
for (const scorer of game.scored) {
	scorers[scorer] &&= ++scorers[scorer];
	scorers[scorer] ??= 1; // step 4
}
console.log(scorers);

console.groupEnd();

/* Challenge 3 */
console.group('Challenge 3');

const gameEvents = new Map([
	[17, '⚽ Goal'],
	[36, '🔀 Substitution'],
	[47, '⚽ Goal'],
	[61, '🔀 Substitution'],
	[64, '🟨 Yellow card'],
	[69, '🟥 Red card'],
	[70, '🔀 Substitution'],
	[72, '🔀 Substitution'],
	[76, '⚽ Goal'],
	[80, '⚽ Goal'],
	[92, '⚽ Goal'],
]);

/* 1. Create an array 'events' of the different game events that happened (no
duplicates) */
const diffEvents = new Set(gameEvents.values()); /* equivalent to row below */
// for (const [, event] of gameEvents) diffEvents.add(event);
console.log('Different events', [...diffEvents]);

/* 2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log. */
gameEvents.delete(64);

/* 3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes) */
(() => {
	const eventTimes = [0];
	for (const [timeOfEvent] of gameEvents)
		timeOfEvent <= 90 && eventTimes.push(timeOfEvent);
	eventTimes.push(90);

	let sum = 0;
	for (let i = 1; i < eventTimes.length; i++)
		sum += eventTimes[i] - eventTimes[i - 1];

	sum /= eventTimes.length;
	console.log(`Event on average every ${Math.trunc(sum)} minutes`);
})();
/* from trainer: divide number of events by duration */
console.log(`Event every ${90 / gameEvents.size} minutes`);

/* 4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL */

console.group('which half');
for (const [key, value] of gameEvents)
	console.log(
		`${key <= 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
	);
console.groupEnd();
console.groupEnd();
