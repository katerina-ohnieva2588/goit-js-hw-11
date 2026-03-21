import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const searchText = event.target.elements['search-text'].value.trim();

  if (searchText === '') {
    iziToast.error({
      message: 'Please enter a search query!',
    });
    return;
  } 

  clearGallery();     
  showLoader();      

  getImagesByQuery(searchText)
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      createGallery(data.hits); 
     iziToast.success({ message: `Found ${data.totalHits} images!` });
    })
    .catch(() => {
      iziToast.error({ message: 'Something went wrong!' });
    })
    .finally(() => {
      hideLoader()
    });
});