/* Клик по документу */
document.addEventListener('click', (e) => {
	// Открытие/закрытие меню
	let burgerBtn = document.getElementsByClassName('burger-btn')[0];
	let menuWrapper = document.getElementsByClassName('menu-wrapper')[0];
	if (burgerBtn.contains(e.target)) {
		burgerBtn.classList.toggle('burger-btn-active');
		menuWrapper.classList.toggle('menu-active');
		document.getElementsByClassName('dark-background')[0].classList.toggle('display-none');
	}
	else if (!menuWrapper.contains(e.target) && menuWrapper.classList.contains('menu-active')) {
		burgerBtn.classList.remove('burger-btn-active');
		menuWrapper.classList.remove('menu-active');
		document.getElementsByClassName('dark-background')[0].classList.add('display-none');
	}

	// Открытие/закрытие оповещений
	let notificationsBtn = document.getElementsByClassName('notifications-btn')[0];
	let notificationsWrapper = document.getElementsByClassName('notifications-wrapper')[0];
	if (notificationsBtn.contains(e.target)) {
		notificationsBtn.classList.toggle('notifications-btn-active');
		notificationsWrapper.classList.toggle('notifications-active');
		document.getElementsByClassName('dark-background')[0].classList.toggle('display-none');
	}
	else if (!notificationsWrapper.contains(e.target) && notificationsWrapper.classList.contains('notifications-active')) {
		notificationsBtn.classList.remove('notifications-btn-active');
		notificationsWrapper.classList.remove('notifications-active');
		document.getElementsByClassName('dark-background')[0].classList.add('display-none');
	}	
});



/* Создание блока автозаполнения для поля поиска */
function createAutocomplete() {
	let autocompleteVals = ['морской узел', 'морской флот', 'морской бой'];
	let inputVal = document.getElementsByClassName('search-input')[0].value.toLowerCase();
	let autocompleteWrapper = document.getElementsByClassName('search-autocomplete-wrapper')[0];
	
	autocompleteWrapper.replaceChildren();

	for (let i = 0; (i < autocompleteVals.length) && (autocompleteWrapper.childElementCount <= 15); i++) {
		if (autocompleteVals[i].startsWith(inputVal) && autocompleteVals[i] !== inputVal) {
			autocompleteWrapper.insertAdjacentHTML('beforeend', 
				`<li class="search-autocomplete-item"><span>` + inputVal + `</span>` + autocompleteVals[i].substring(inputVal.length) + `</li>`);
		}
	}

	if (autocompleteWrapper.childElementCount === 0)
		autocompleteWrapper.classList.add('display-none');
	else
		autocompleteWrapper.classList.remove('display-none');
}

/* Фокус на поле поиска */
document.getElementsByClassName('search-input')[0].addEventListener('focus', (e) => {
	document.getElementsByClassName('dark-background')[0].classList.remove('display-none');
	createAutocomplete();
});
/* Снятие фокуса с поля поиска */
document.getElementsByClassName('search-input')[0].addEventListener('blur', (e) => {
	document.getElementsByClassName('dark-background')[0].classList.add('display-none');
});


/* Зажатие клавиши в поле поиска */
document.getElementsByClassName('search-input')[0].addEventListener('keydown', (e) => {
	switch(e.key) {
		case 'ArrowUp':
		case 'ArrowDown':
			e.preventDefault();
			break;
		case 'Enter':
			let autocompleteHover = document.getElementsByClassName('search-autocomplete-item hover')[0];
			if (autocompleteHover)
				document.getElementsByClassName('search-input')[0].value = autocompleteHover.textContent;
			break;
	}
});
/* Отжатие клавиши в поле поиска */
document.getElementsByClassName('search-input')[0].addEventListener('keyup', (e) => {
	switch(e.key) {
		case 'ArrowUp':
		case 'ArrowDown':
			let autocompleteItems = document.getElementsByClassName('search-autocomplete-item');
			if (autocompleteItems.length > 0) {
				let autocompleteHover = (e.key === 'ArrowUp' ? autocompleteItems[autocompleteItems.length-1] : autocompleteItems[0]);
				for (let i = 0; i < autocompleteItems.length; i++) {
					if (autocompleteItems[i].classList.contains('hover')) {
						autocompleteItems[i].classList.remove('hover');
						if (e.key === 'ArrowUp')
							autocompleteHover = (i > 0 ? autocompleteItems[i-1] : autocompleteItems[autocompleteItems.length-1]);
						else 
							autocompleteHover = (i < autocompleteItems.length-1 ? autocompleteItems[i+1] : autocompleteItems[0]);
						break;
					}
				}
				autocompleteHover.classList.add('hover');
			}
			break;
		default:
			createAutocomplete();
	}
});

/* Нажатие на блок автозаполнения */
document.getElementsByClassName('search-autocomplete-wrapper')[0].addEventListener('mousedown', (e) => {
	if (e.target.classList.contains('search-autocomplete-item')) {
		document.getElementsByClassName('search-input')[0].value = e.target.textContent;
		document.getElementsByClassName('search-form')[0].submit();
	}
});

/* hover. Наведение на блок автозаполнения */
document.getElementsByClassName('search-autocomplete-wrapper')[0].addEventListener('mouseover', (e) => {
	if (e.target.classList.contains('search-autocomplete-item')) {
		for (let item of document.getElementsByClassName('search-autocomplete-item'))
			item.classList.remove('hover');
		e.target.classList.add('hover');
	}
});
/* hover. Отведение курсора мыши с/внутри блока автозаполнения */
document.getElementsByClassName('search-autocomplete-wrapper')[0].addEventListener('mouseout', (e) => {
	if (e.target.classList.contains('search-autocomplete-item')) {
		e.target.classList.remove('hover');
	}
});
