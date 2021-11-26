import { dots, filldot, author, carousel, testimonial } from './variables.js';
export const changeBtn = (dotitem, btn) => {
	for (const dot of dotitem) {
		if (dot.classList.contains(filldot)) {
			dot.classList.remove(filldot);
			if (btn === 'right') {
				const element = dot.nextElementSibling;
				!element
					? dots.firstElementChild.classList.add(filldot)
					: element.classList.add(filldot);
			} else {
				const element = dot.previousElementSibling;
				!element
					? dots.lastElementChild.classList.add(filldot)
					: element.classList.add(filldot);
			}
			break;
		}
	}
};

export const changePage = async (backendURL, side) => {
	const response = await fetch(backendURL);
	const data = await response.json();
	const getData = datainfo =>
		datainfo
			.map((element, i) => author.textContent === element.person.name && i + 1)
			.filter(e => e);
	const setData = (sideBtn, info) =>
		(carousel.firstElementChild.src =
			data[side === sideBtn ? info : info - 2]?.person.src ||
			data[side === sideBtn ? 0 : 3].person.src) &&
		(author.textContent =
			data[side === sideBtn ? info : info - 2]?.person.name ||
			data[side === sideBtn ? 0 : 3].person.name) &&
		(testimonial.textContent =
			data[side === sideBtn ? info : info - 2]?.person.testimonial ||
			data[side === sideBtn ? 0 : 3].person.testimonial);
	setData('right', getData(data));
};

export const setState = (cbPage, cbBtn) => cbPage && cbBtn;
