import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
  initializeLightbox,
  showLoadMore,
  hideLoadMore,
  smoothScroll,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

hideLoader();
hideLoadMore();

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const query = form.querySelector('input[name="search-text"]').value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please, enter the text for search!',
    });
    return;
  }

  if (query !== currentQuery) {
    currentPage = 1;
    clearGallery();
    smoothScroll();
    currentQuery = query;
  }

  showLoader();

  try {
    const response = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    if (!response || !response.hits || response.hits.length === 0) {
      iziToast.warning({
        title: 'Caution',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMore();
      return;
    }

    const images = response.hits;
    totalHits = response.totalHits;

    createGallery(images);
    initializeLightbox();

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMore();
    } else {
      showLoadMore();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Illegal operation.',
    });
    console.error(error);
  }
});

if (loadMoreButton) {
  loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();

    try {
      const response = await getImagesByQuery(currentQuery, currentPage);
      hideLoader();

      if (!response || !response.hits || response.hits.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message: 'Sorry, no more images available.',
        });
        hideLoadMore();
        return;
      }

      createGallery(response.hits);
      initializeLightbox();
      smoothScroll();

      const totalPages = Math.ceil(totalHits / 15);
      if (currentPage >= totalPages) {
        hideLoadMore();
      } else {
        showLoadMore();
      }
    } catch (error) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Error loading more images.',
      });
      console.error(error);
    }
  });
}
