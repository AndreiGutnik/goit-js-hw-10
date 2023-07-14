import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import catInfoCardTpl from '../templates/cat-info-card.hbs';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loader: document.querySelector('.load'),
  loaderEl: document.querySelector('.loader'),
  errorRef: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

const { selectEl, loader, loaderEl, errorRef, catInfo } = refs;

loaderEl.style.display = 'block';
loader.style.display = 'block';
errorRef.style.display = 'none';
selectEl.style.display = 'none';

// new SlimSelect({
//   select: '.breed-select',
//   showContent: 'down',
//   placeholder: 'Select a breed',
//   allowDeselect: true,
//   deselectLabel: '<span class="placeholder-text">Select a breed</span>',
//   searchable: false,
// });

setTimeout(() => {
	fetchBreeds()
		.then(breeds => {
			// Create and add breeds - <option> in select
			markupBreeds(breeds);
		})
		.catch(error => {
			console.error(error);
			Notiflix.Notify.failure('❌ The breeds of cats are not found!');
			loader.style.display = 'none';
			errorRef.style.display = 'block';
		});
}, 2000);

selectEl.addEventListener('change', onSelected);

function onSelected() {
	catInfo.style.display = 'none';
	loaderEl.style.display = 'block';
  loader.style.display = 'block';

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
				loaderEl.style.display = 'none';
				loader.style.display = 'none';
				errorRef.style.display = 'block';
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

  selectEl.style.display = 'block';
  loaderEl.style.display = 'none';
  loader.style.display = 'none';
}

function markupCatInfo(data) { 
	console.log(catInfoCardTpl(data));
	catInfo.innerHTML = catInfoCardTpl(data);

	loaderEl.style.display = 'none';
  loader.style.display = 'none';
  catInfo.style.display = 'flex';
}
