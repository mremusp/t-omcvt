/* 186, 187: select create delete sty;e attribute class */
console.group('select create delete');
/* Selecting elements */
console.log(document.documentElement, document.head, document.body); /* selects entire HTML element */

const header = document.querySelector('.header'); /*returns first match */
const allSections = document.querySelectorAll('.section'); /* returns NodeList with all elements that match */
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
header.prepend(message); /* adds parameter as first child of element */
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

document.documentElement.style.setProperty('--color-primary', 'orangered'); /* for custom properties, like css variables (or any css property) */

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
