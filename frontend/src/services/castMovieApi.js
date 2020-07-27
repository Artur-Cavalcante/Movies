import axios from 'axios';

function castMovieApi(IdMovie) {
    const castMovieApi = axios.create({
        baseURL: 'https://api.themoviedb.org/3/movie/' + IdMovie + '/credits?api_key=e56f20f13cf1580bbd7a026da536bb27'
    });

    return castMovieApi;
};

export default castMovieApi;