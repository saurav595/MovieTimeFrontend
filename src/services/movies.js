import axios from 'axios';

class MovieDataService {
    getAll(page = 0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?page=${page}`
        );
    }

    find(query, by='title', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies?${by}=${query}&page=${page}`
        );
    }

    getRatings() {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`
        );
    }

    getMovieById(id) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/id/${id}`
        );
    }
}

export default new MovieDataService();