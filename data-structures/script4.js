'use strict';

/* lesson 124 - challenge #4 */
const textarea = document.createElement('textarea');
document.body.append(textarea);
const button = document.createElement('button');
document.body.append(button);

button.addEventListener('click', showVariableNames);

function showVariableNames() {
	const inputStr = textarea.value;
	console.log(
		inputStr
			.split('\n')
			.map((line) => line.trim().toLowerCase())
			.map((name) =>
				name.replace(name.slice(name.indexOf('_'), name.indexOf('_') + 2), name.slice(name.indexOf('_'), name.indexOf('_') + 2).toUpperCase()).replace('_', '')
			)
			.map((name, index) => name.padEnd(20, ' ') + '⭐'.repeat(index + 1))
			.join('\n')
	);
	// console.log(replacedUnderline.join('\n'));
}

/* lesson 125 - strings methods practice */
const flights =
	'_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const rawFlightsArray = flights
	.toLowerCase()
	.split('+')
	.map((flight) => flight.replaceAll('_', ' '));
for (const rawFlight of rawFlightsArray) {
	let [status, from, to, time] = rawFlight.split(';');
	status.indexOf('delayed') >= 0 && (status = '🔴' + status);
	status = status
		.trim()
		.split(' ')
		.map((word) => word.replace(word[0], word[0].toUpperCase()))
		.join(' ');

	[from, to] = [from.slice(0, 3).toUpperCase(), to.slice(0, 3).toUpperCase()];
	time = time.replace(':', 'h');

	const announcement = `${status} from ${from} to ${to} (${time})`.padStart(50, ' ');

	console.log(announcement);
}
