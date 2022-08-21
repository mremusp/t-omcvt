/* 186, 187: select create delete sty;e attribute class */
console.groupCollapsed('select create delete');
/* Selecting elements */
console.log(document.documentElement, document.head, document.body); /* selects entire HTML element */

const header1 = document.querySelector('.header'); /*returns first match */
const allSections1 = document.querySelectorAll('.section'); /* returns NodeList with all elements that match */
document.getElementById('section--1'); /* first element that has passed Id */
const allButtons =
	document.getElementsByTagName('button'); /* returns HTMLCollection of specified elements (is live collection, updated if elements are deleted) */
document.getElementsByClassName('btn'); /* also returns live HTMLCollection */

/* Creating and inserting */
// .insertAdjacentHTML
const message = document.createElement('div'); /* creates DOM element and stores into variable */
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved analytics';
message.innerHTML += '<button class="btn btn--close-cookie">Got it!</button>';
header1.prepend(message); /* adds parameter as first child of element */
// header.append(message); /* adds parameter as last child of element, !! element can only be inserted once !! */
/* prepend and append can be used to move elements, DOM elements are unique */
// header.append(message.cloneNode(true)); /* .cloneNode copies element, true parameter copies child elements too */
// header.before(message); /* adds parameter as sibling before element */
// header.after(message); /* adds parameter as sibling after element */

/* Deleting */
document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());

/* Styles */
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(getComputedStyle(message).color); /* gets the style of an element, not only inline styles */

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); /* for custom properties, like css variables (or any css property) */

/* Attributes */
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.getAttribute('src')); /* src as written, not computed */
console.log(logo.alt);
console.log(logo.className);
console.log(logo.cstmAttr); /* only standard attributes are created as js properties */
console.log(logo.getAttribute('cstmAttr')); /* get custom attribute */

/* Data attributes */
console.log(logo.dataset.versionNumber); /*dataset has attributes declared with data-, camel case instead of kebab case */

/* classes */
// .add() .remove() .toggle() .contains()
// logo.className = 'asdf'; /* overwrites all classes */
console.groupEnd();

/* 189 : Events and handlers */
console.groupCollapsed('Events');
const h1 = document.querySelector('h1');

const alertH1 = function () {
	console.log('addEventListener: reading heading');
	h1.removeEventListener('mouseenter', alertH1); /* so it will only trigger once */
};
h1.addEventListener('mouseenter', alertH1);
h1.onmouseenter = () => console.log('onMouseEnterL reading heading'); /* old way of addEventListener */
h1.addEventListener('mouseenter', () =>
	console.log('addEventListener second: reading heading')
); /* addEventListener can bind multiple functions to same event */

/* 191: event propagation */
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
	// this.style.backgroundColor = randomColor();
	// console.log('Link', e.target, e.currentTarget); /* .target is event target, .currentTarget is event which listens ("this") */
	/* Stop propagation */
	// e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
	// this.style.backgroundColor = randomColor();
	// console.log('Nav links', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
	'click',
	function (e) {
		// this.style.backgroundColor = randomColor();
		// console.log('Header', e.target, e.currentTarget);
	},
	true /* calls function during capture, not bubbling */
);
console.groupEnd();

/* 193: DOM Traversing */
console.groupCollapsed('DOM Traversing');
/* Going downwards */
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); /* returns NodeList with all elements (even plaintext and comments) */
console.log(h1.children); /* returns HTML collection of actual HTML elements (only direct children) */
console.log(h1.firstElementChild); /* first HTML element */
console.log(h1.firstChild); /* first node (anything) */
console.log(h1.lastElementChild);
console.log(h1.lastChild);

/* Going upwards */
console.log(h1.parentNode); /* direct parent */
console.log(h1.parentElement); /* direct parent which is HTML */
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; /* closest element, going up the DOM Tree */

/* Going sideways (siblings) */
console.log(h1.previousElementSibling); /* HTML elements */
console.log(h1.nextElementSibling);
console.log(h1.previousSibling); /* any elements */
console.log(h1.nextSibling);

console.log(h1.parentElement.children); /* all siblings */
[...h1.parentElement.children].forEach((el) => {
	// if (el !== h1) el.style.transform = 'scale(0.5)';
});

console.groupEnd();

/*  202: Lifecycle events */
console.group('Lifecycle events');
document.addEventListener('DOMContentLoaded', (e) =>
	console.log('HTML JS CSS', e)
); /* triggers after all HTML, CSS, JS is loaded !!not images and external resources!! */
window.addEventListener('load', (e) => console.log('all loaded', e)); /* triggered after everything is loaded (including resources) */
window.addEventListener('beforeunload', (e) => {
	e.preventDefault();
	console.log(e);
	e.returnValue = ''; /* interrupts closing the page !!cannot be customised!! */
});
console.groupEnd();
