const API_KEY = '26909086-a7a0f8caac98286b7fc7ad857';
const BASE_URL = 'https://pixabay.com/api/';
const axios = require('axios');

export default class imageApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perpage = 40;
    }

    async fetchImage() {
        const url = `${BASE_URL}?key=${API_KEY}&page=${this.page}&per_page=
        ${this.perpage}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;

        const images = await axios.get(url);
        return images.data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}