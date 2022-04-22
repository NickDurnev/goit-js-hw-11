import { refs } from "../index";
import imageTpl from '../teamplates/image.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images) {
    refs.galleryEl.insertAdjacentHTML('beforeend', imageTpl(images));
}

export function createLigthBoxGallery(e) {
    e.preventDefault();
    var gallery = new SimpleLightbox('.gallery div a');
    return gallery;
}

