import { setState, changePage, changeBtn } from './functions.js';
import {
	dotitem,
	backendURL,
	testimonial,
	filldot,
	carousel,
	author,
} from './variables.js';
export const setView = btns => {
	btns.forEach(btn => {
		const btnSide = btn.classList.contains('btn--right') && 'right';
		btn.addEventListener('click', () =>
			setState(changeBtn(dotitem, btnSide), changePage(backendURL, btnSide))
		);
	});
};

export const setViewFromDot = pagination => {
	pagination.forEach((travel, i) => {
		travel.addEventListener('click', () => {
			pagination.forEach(async btnActive => {
				const response = await fetch(backendURL);
				const data = await response.json();
				btnActive.classList.remove(filldot);
				carousel.firstElementChild.src = data[i].person.src;
				author.textContent = data[i].person.name;
				testimonial.textContent = data[i].person.testimonial;
				travel.classList.add(filldot);
			});
		});
	});
};
//prettier-ignore
setInterval(() => setState(changeBtn(dotitem, 'right'), changePage(backendURL, 'right')),3000);
