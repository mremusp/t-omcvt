'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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

/* Menu fade animation */
const handleHover = function (e) {
	if (e.target.classList.contains('nav__link')) {
		console.log(e);
		const link = e.target;
		const siblings = link.closest('.nav').querySelectorAll('.nav__link');
		const logo = link.closest('.nav').querySelector('img');

		siblings.forEach((el) => {
			if (el !== e.target) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};
// nav.addEventListener('mouseover', (e) => handleHover(e, 0.5));
/* Passing "argument" into handler */
nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', (e) => handleHover(e, 1));
nav.addEventListener('mouseout', handleHover.bind(1));

/* 196: Sticky navigation */
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
// 	/* Bad for performance */
// 	if (window.scrollY > initialCoords.top) {
// 		nav.classList.add('sticky');
// 	} else {
// 		nav.classList.remove('sticky');
// 	}
// });

/* 197: Intersection observer API */
// const obsCallback = function (entries, observer) {
// 	entries.forEach((entry) => console.log(entry));
// };
// /* callback runs every time observed element intersects root element at the defined threshold */
// const obsOptions = {
// 	root: null,
// 	threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
	const [entry] = entries;
	entry.isIntersecting ? nav.classList.remove('sticky') : nav.classList.add('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`,
}); /* rootMargin extends the size of the root */
headerObserver.observe(header);

/* 198: revealing elements on scroll */
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return; /* guard clause */
	entry.target.classList.remove('section--hidden');
	observer.unobserve(entry.target); /* so it stops observing after the first trigger */
};
const sectionObserver = new IntersectionObserver(revealSection, { root: null, threshold: 0.1 });
allSections.forEach((section) => {
	section.classList.add('section--hidden');
	sectionObserver.observe(section);
});

/* 199: lazy loading images */
const allImages = document.querySelectorAll('img[data-src]');
const replaceImg = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;

	console.log(entry);
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener('load', function () {
		this.classList.remove('lazy-img'); /* only remove blur after image is loaded */
	});
	// entry.target.classList.remove('lazy-img');
	observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(replaceImg, {
	root: null,
	threshold: 0,
	rootMargin: '200px',
}); /* start loading image when viewport is 200px above image */
allImages.forEach((img) => imgObserver.observe(img));

/* 200: slider */
const sliderFunc = function () {
	const slides = document.querySelectorAll('.slide');
	const btnLeft = document.querySelector('.slider__btn--left');
	const btnRight = document.querySelector('.slider__btn--right');
	const dotContainer = document.querySelector('.dots');

	let currentSlide = 0;
	const maxSlide = slides.length;
	const createDots = function () {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
		});
	};

	const goToSlide = function (slide) {
		slides.forEach((s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`));
		[...dotContainer.children].forEach((dot, i) => {
			if (i == slide) {
				console.log(i);
				dot.classList.add('dots__dot--active');
			} else {
				dot.classList.remove('dots__dot--active');
			}
		});
	};

	const nextSlide = () => {
		if (currentSlide < maxSlide - 1) {
			currentSlide++;
		} else {
			currentSlide = 0;
		}
		goToSlide(currentSlide);
	};
	const prevSlide = () => {
		if (currentSlide > 0) {
			currentSlide--;
		} else {
			currentSlide = maxSlide - 1;
		}
		goToSlide(currentSlide);
	};

	// const slider = document.querySelector('.slider');
	// slider.style.transform = 'scale(0.5) translateX(-200px)';
	// slider.style.overflow = 'visible';

	createDots();
	goToSlide(currentSlide);

	btnRight.addEventListener('click', nextSlide);
	btnLeft.addEventListener('click', prevSlide);
	document.addEventListener('keydown', (e) => {
		switch (e.key) {
			case 'ArrowRight':
				nextSlide();
				break;
			case 'ArrowLeft':
				prevSlide();
				break;
			default:
				break;
		}
	});

	dotContainer.addEventListener('click', function (e) {
		if (e.target.classList.contains('dots__dot')) {
			// const slide = e.target.dataset.slide; /* with destructuring below */
			const { slide } = e.target.dataset;
			console.log(e);
			goToSlide(slide);
		}
	});
};
sliderFunc();
