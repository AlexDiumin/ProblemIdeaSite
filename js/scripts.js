/* Обработка клика по документу */
document.addEventListener('click', (e) => {
	// Открытие/закрытие меню
	if (document.getElementsByClassName('burger-btn')[0].contains(e.target)) {
		document.getElementsByClassName('menu-wrapper')[0].classList.toggle('menu-active');
		document.getElementsByClassName('dark-background')[0].classList.toggle('display-none');
	}
	else if (!document.getElementsByClassName('menu-wrapper')[0].contains(e.target)) {
		document.getElementsByClassName('menu-wrapper')[0].classList.remove('menu-active');
		document.getElementsByClassName('dark-background')[0].classList.add('display-none');
	}
});
