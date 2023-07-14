import SlimSelect from 'slim-select';
import { hide, show } from './hide-element';
import refs from './refs';

const { selectEl, loader, loaderEl, catInfo } = refs;

function markupBreeds(breeds) {
  selectEl.innerHTML = breeds.reduce((acc, { id, name }) => {
    return acc + `<option value = ${id}>${name}</option>`;
  }, '');

  new SlimSelect({
    select: '.breed-select',
  });

  hide(loaderEl, loader);
  show(selectEl);
}

function markupCatInfo(data) {
  const { imageUrl, breedName, description, temperament } = data;
  const markup = `
		<img src="${imageUrl}" alt="Breed of cat is ${breedName}" width='300'>
		<div class="desc">
			<h1 class="desc-title">${breedName}</h1>
			<p class="desc-text">${description}</p>
			<p class="desc-text">${temperament}</p>
		</div>
	`;
  catInfo.innerHTML = markup;

  hide(loaderEl, loader);
  catInfo.style.display = 'flex';
}

export { markupBreeds, markupCatInfo };
