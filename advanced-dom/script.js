'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
	e.preventDefault();

	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		closeModal();
	}
});

btnScrollTo.addEventListener('click', (e) => {
	const s1coords = section1.getBoundingClientRect(); /* gets coordinates and size of element relative to viewport*/
	// console.log(s1coords);
	// console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
	// console.log('height/width viewport ', document.documentElement.clientHeight, document.documentElement.clientWidth);

	/* Scrolling */
	// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
	// window.scrollTo({
	// 	left: s1coords.left + window.pageXOffset,
	// 	top: s1coords.top + window.pageYOffset,
	// 	behavior: 'smooth',
	// });

	/* simpler way (modern browsers) */
	section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach((el) =>
// 	el.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		const id = this.getAttribute('href'); /* this.href would get absolute URL */
// 		console.log(id);
// 		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// 	})
// );

document.querySelector('.nav__links').addEventListener('click', function (e) {
	/* above is not efficient, put event listener on parent element, get current clicked item with e.target */
	e.preventDefault();
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
	e.preventDefault();
	const clicked = e.target.closest('.operations__tab');
	if (!clicked) return; /* exits function if not clicked on operations__tab */

	if ([...tabs].some((tab) => tab === clicked)) {
		console.log('oui');
		tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
		clicked.classList.add('operations__tab--active');

		tabsContent.forEach((tab) => tab.classList.remove('operations__content--active'));
		document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
	}

	// document.querySelector(`.operations__content--${clicked.getAttribute(tab)}`);
});
