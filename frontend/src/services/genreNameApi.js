import axios from 'axios';

function genreNameApi() {
    const genreNameApi = axios.create({
        baseURL: 'https://api.themoviedb.org/3/genre/movie/list?api_key=e56f20f13cf1580bbd7a026da536bb27' 
    });

    return genreNameApi;
};

export default genreNameApi;