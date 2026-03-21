import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox;

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('active');
}

export function hideLoader() {
  loader.classList.remove('active');
}

export function createGallery(images) {
  showLoader();

  requestAnimationFrame(() => {
    const markup = images
      .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><span class="label">Likes:</span> <span class="value">${likes}</span></p>
            <p class="info-item"><span class="label">Views:</span> <span class="value">${views}</span></p>
            <p class="info-item"><span class="label">Comments:</span> <span class="value">${comments}</span></p>
            <p class="info-item"><span class="label">Downloads:</span> <span class="value">${downloads}</span></p>
          </div>
        </li>
      `)
      .join('');

    gallery.innerHTML = markup;

    const imgs = gallery.querySelectorAll('img');
    let loadedCount = 0;

    function checkLoaded() {
      loadedCount++;
      if (loadedCount === imgs.length) {
        hideLoader();
      }
    }

    if (imgs.length === 0) {
      hideLoader();
    } else {
      imgs.forEach(img => {
        if (img.complete) checkLoaded();
        else {
          img.addEventListener('load', checkLoaded);
          img.addEventListener('error', checkLoaded);
        }
      });
    }

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        showCounter: true,
        nav: true,
        close: true,
        overlay: true
      });
    } else {
      lightbox.refresh();
    }
  });
}