import { refs } from "../index";
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import imagesloaded from "imagesloaded";
import { fetchImages } from "../index";

export default function scrollPageDownRegister() {
    const scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    Loading.init({
        svgSize: '80px',
        svgColor: '#e2ea41',
    });
    
    if (window.scrollY >= scrollHeight - innerHeight - 100) {
        Loading.dots();
        fetchImages();
        imagesloaded(refs.galleryEl, () => {
            Loading.remove();
        })
    }
}