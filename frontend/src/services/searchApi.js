import axios from 'axios';

function searchApi(searchText, page) {
    if(!searchText){
        searchText = '&query=a';
    }else{
        searchText = '&query=' + searchText;

    }
    if(!page){
        page = '';
    }else{
        page = '&page=' + page;
    }

    const searchApi = axios.create({
        baseURL: "https://api.themoviedb.org/3/search/movie?api_key=e56f20f13cf1580bbd7a026da536bb27" + searchText + page
    });

    return searchApi;
};

export default searchApi;