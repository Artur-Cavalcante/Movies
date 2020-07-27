import axios from 'axios';

function movieDetailsApi(IdMovie) {
    const movieDetailsApi = axios.create({
        baseURL: 'https://api.themoviedb.org/3/movie/' + IdMovie + '?api_key=e56f20f13cf1580bbd7a026da536bb27'
    });

    return movieDetailsApi;
};

export default movieDetailsApi;