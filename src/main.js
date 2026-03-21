import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions.js";

const form = document.querySelector('.form');
const API_KEY = '55082106-4cb46bb19233a000c0dff9eca'; 

function getImagesByQuery(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const searchText = event.target.elements['search-text'].value.trim();

  if (searchText === '') {
    iziToast.error({ message: 'Please enter a search query!' });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(searchText)
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({ message: 'Sorry, there are no images matching your search query. Please try again!' });
        return;
      }

      createGallery(data.hits);
      iziToast.success({ message: `Found ${data.totalHits} images!` });
    })
    .catch(() => {
      iziToast.error({ message: 'Something went wrong!' });
    })
    .finally(() => {
      hideLoader();
    });
});
