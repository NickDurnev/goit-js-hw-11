import imageServiceApi from "./js/imageServiceAPI";
import { Notify } from "notiflix";
import { throttle } from 'throttle-debounce';
import { renderImages, createLigthBoxGallery } from "./js/renderImages";
import scrollPageDownRegister from "./js/infiniteScroll";

const newImageService = new imageServiceApi();

export const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery')
}

refs.formEl.addEventListener('submit', onSearch);
refs.galleryEl.addEventListener('click', createLigthBoxGallery);
window.addEventListener("scroll", throttle(300,scrollPageDownRegister));

export async function fetchImages() {
    try {
        const images = await newImageService.fetchImage();
        const { hits, totalHits } = images;
        if (hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return
        }
        if (newImageService.page === 1) {
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }
        newImageService.incrementPage();
        renderImages(hits);
        const { height: cardHeight } = refs.galleryEl
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
});
    }
    catch {
        Notify.failure("We're sorry, but you've reached the end of search results.");
    }
}

function onSearch(e) {
    e.preventDefault();

    if (newImageService.query !== e.currentTarget.elements.searchQuery.value) {
        resetSearch();
    }

    newImageService.query = e.currentTarget.elements.searchQuery.value;

    if (newImageService.query === "") {
        return Notify.info('Type something')
    }
    fetchImages();
    const gallery = createLigthBoxGallery(e);
    gallery.refresh();
}

function resetSearch() {
    refs.galleryEl.innerHTML = '';
    newImageService.resetPage();
}

