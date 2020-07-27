import axios from 'axios';

function favoriteApi() {
    const favoriteApi = axios.create({
        baseURL: 'http://localhost:3333/api/FavoriteMovies'
    });

    return favoriteApi;
};

export default favoriteApi;