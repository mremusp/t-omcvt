'use strict';
/*  212: Coding challenge */
console.groupCollapsed('car coding challenge');

const Car = function (make, speed) {
	this.make = make;
	this.speed = speed;

	// this.accelerate = function () {
	// 	this.speed += 10;
	// 	console.log(`New speed of ${this.make}: ${this.speed}`);
	// };
	// this.brake = function () {
	// 	this.speed -= 5;
	// 	console.log(`New speed of ${this.make}: ${this.speed}`);
	// };
	/* methods not added to the Car constructor, but to Car.prototype (performance reasons) */
};

Car.prototype.accelerate = function () {
	this.speed += 10;
	console.log(`New speed of ${this.make}: ${this.speed}`);
};

Car.prototype.brake = function () {
	this.speed -= 5;
	console.log(`New speed of ${this.make}: ${this.speed}`);
};

const bmw = new Car('BMW', 120);
const merc = new Car('Mercedes', 110);

bmw.accelerate();
bmw.brake();
bmw.brake();
bmw.brake();
merc.accelerate();
merc.accelerate();
merc.accelerate();
merc.accelerate();

console.groupEnd();
