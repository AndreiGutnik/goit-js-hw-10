import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import catInfoCardTpl from '../templates/cat-info-card.hbs';

// import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loader: document.querySelector('.load'),
  loaderEl: document.querySelector('.loader'),
  errorRef: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const { selectEl, loader, loaderEl, errorRef, catInfo } = refs;

// loaderEl.style.display = 'block';
// loader.style.display = 'block';
errorRef.classList.add('no-show');
selectEl.classList.add('no-show');

setTimeout(() => {
	fetchBreeds()
		.then(breeds => {
			// Create and add breeds - <option> in select
			markupBreeds(breeds);
		})
		.catch(error => {
			console.error(error);
			Notiflix.Notify.failure('❌ The breeds of cats are not found!');
			loaderclassList.add('no-show');
			errorRef.classList.remove('no-show');
		});
}, 2000);

selectEl.addEventListener('change', onSelected);

function onSelected() {
	catInfo.classList.add('no-show');
	loaderEl.classList.remove('no-show');
  loader.classList.remove('no-show');

  const breedId = selectEl.value;
	setTimeout(() => {
		fetchCatByBreed(breedId)
			.then(data => {
				markupCatInfo(data);
			})
			.catch(error => {
				console.error(error);
				Notiflix.Notify.failure(
					'❌ Information about cat for this breed is not found!'
				);
				loaderEl.classList.add('no-show');
				loader.classList.add('no-show');
				errorRef.classList.remove('no-show');
			});
	}, 2000);
}

function markupBreeds(breeds) {
	selectEl.innerHTML = breeds.reduce((acc, { id, name }) => {
    return acc + `<option value = ${id}>${name}</option>`;
  }, '');

  new SlimSelect({
    select: '.breed-select',
  });

  selectEl.classList.remove('no-show');
  loaderEl.classList.add('no-show');
  loader.classList.add('no-show');
}

function markupCatInfo(data) { 
	console.log(catInfoCardTpl(data));
	catInfo.innerHTML = catInfoCardTpl(data);

	loaderEl.classList.add('no-show');
  loader.classList.add('no-show');
  catInfo.classList.remove('no-show');
}
