import axios from 'axios';

class FavoritesDataService {
    getFavorites(id) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${id}`
        )
    }

    updateFavorites(data) {
        return axios.put(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }

    getMoviesByFavorites(id) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${id}/getMoviesByFavorites`
        )
    }

}

export default new FavoritesDataService();