import { dots, filldot, author, carousel, testimonial } from './variables.js';
export const changeBtn = (dotitem, btn) => {
	const getSibling = (btn, dot) =>
		btn === 'right' ? dot.nextElementSibling : dot.previousElementSibling;
	const getChild = btn =>
		btn === 'right' ? dots.firstElementChild : dots.lastElementChild;
	const change = (childElement, element, dot) => {
		dot.classList.remove(filldot);
		!element
			? childElement.classList.add(filldot)
			: element.classList.add(filldot);
	};
	for (const dot of dotitem) {
		if (dot.classList.contains(filldot)) {
			change(getChild(btn), getSibling(btn, dot), dot);
			break;
		}
	}
};

export const changePage = async (backendURL, side) => {
	const response = await fetch(backendURL);
	const data = await response.json();
	const indexPage = element => author.textContent === element.person.name;
	const setData = (sideBtn, info) => {
		const getIndexOfPage = (side, sideBtn) => ({
			pagination: side === sideBtn ? info : info - 2,
			reset: side === sideBtn ? 0 : 3,
		});
		const setIndexOfPage = ({ pagination, reset }, data) => ({
			page: data[pagination]?.person,
			resetPage: data[reset]?.person,
		});
		const { page, resetPage } = setIndexOfPage(
			getIndexOfPage(side, sideBtn),
			data
		);
		const setPage = (page, resetPage) => {
			carousel.firstElementChild.src = page?.src || resetPage?.src;
			author.textContent = page?.name || resetPage?.name;
			testimonial.textContent = page?.testimonial || resetPage?.testimonial;
		};
		setPage(page, resetPage);
	};
	const getData = data.findIndex(indexPage);
	setData('right', getData + 1);
};

export const setState = (cbPage, cbBtn) => cbPage && cbBtn;
