import axios from 'axios';

const API_KEY = '21824394-3f4c7e3f700c9b67b092e1424';
const BASE_URL = 'https://pixabay.com/api';
const PER_PAGE = 12;

function fetchImages({ searchQuery, currentPage }) {
  return axios
    .get(
      `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`,
    )
    .then(response => {
      return response.data;
    });
}

const api = {
  fetchImages,
};

export default api;
