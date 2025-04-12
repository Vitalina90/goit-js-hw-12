import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'inline-block';
  }
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.display = 'none';
  }
}

export const clearGallery = () => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
  smoothScroll();
};

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML(
    'beforeend',
    images
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
          <li class= "gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
            </a>
            <div class="info">
            <p><b>Likes</b><br>${likes}</p>
            <p><b>Views</b><br>${views}</p>
            <p><b>Comments</b><br>${comments}</p>
            <p><b>Downloads</b><br>${downloads}</p>
            </div>
            </li>`
      )
      .join('')
    );
    lightbox.refresh();
}

export function initializeLightbox() {
    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt';
            captionDelay: 250,
        });
    }
    lightbox.refresh();
}

export function smoothScroll() {
    const firstCard = document.querySelector('.gallery-item');

    if (firstCard) {
        const cardHeight = firstCard.getBoundingClientRect().height;

        window.scrollBy({
            top: cardHeight * 2,
            left: 0,
            behavior: "smooth",
        });
    }
}

export function showloadMore() {
    const loadMore = document.querySelector('.load-more');

    if (loadMore) {
        loadMore.style.display = 'flex';
    }
}

export function nideloadMore() {
    const loadMore = document.querySelector('.load-more');

    if (loadMore) {
        loadMore.style.display = 'none';
    }
}