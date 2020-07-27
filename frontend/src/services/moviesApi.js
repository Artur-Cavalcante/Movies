import axios from 'axios';

function moviesApi(params) {
    if(params){
        params = '&page=' + params;
    }else{
        params = '';
    };

    const moviesApi = axios.create({
        baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=e56f20f13cf1580bbd7a026da536bb27' + params
    });

    return moviesApi;
};

export default moviesApi;