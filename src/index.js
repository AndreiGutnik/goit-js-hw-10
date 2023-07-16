import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import refs from './js/refs';
import { hide, show } from './js/hide-element';
import { markupBreeds, markupCatInfo } from './js/markup';

const { selectEl, loader, loaderEl, errorRef, catInfo } = refs;

hide(errorRef, selectEl);

setTimeout(() => {
  fetchBreeds()
    .then(breeds => {
      // Create and add breeds - <option> in select
      markupBreeds(breeds);
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure('❌ The breeds of cats are not found!');
      
			hide(loaderEl, loader);
			show(errorRef);
    });
}, 2000);

selectEl.addEventListener('change', onSelected);

function onSelected() {
  catInfo.style.display = 'none';
  hide(errorRef);
	show(loaderEl, loader);

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
        
				hide(loaderEl, loader);
				show(errorRef);
      });
  }, 2000);
}
