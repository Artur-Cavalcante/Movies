import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import searchApi from '../services/searchApi';
import MovieList from './utils/MovieList';
import Paginator from './utils/Paginator';

function SearchMovie(searchText, bindSearch, toggleSearch) {
    const [showSpinner, setShowSpinner] = useState(null);

    const [movies, setMovies] = useState(false);
    const [showMovies, setShowMovies] = useState(false);

    const [pages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [showPaginator, setShowPaginator] = useState(false);

    const spinner = <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

    function toggleNextPage(page) {
        if (page) {
            searchMovie(page);
            window.scrollTo("0", "0");
        }
    }

    async function searchMovie(page) {
        setShowSpinner(true);
        await searchApi(searchText, page)
            .get()
            .then((response) => {
                setPages(response.data.total_pages);
                setCurrentPage(response.data.page);
                setMovies(response.data.results);
                setShowMovies(true);
                setShowSpinner(false);
                setShowPaginator(true);
                toggleSearch(false)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        searchMovie();
    }, [bindSearch]);

    return (
        <div>
            {showMovies ? <MovieList movies={movies} /> : null}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showSpinner ? spinner : null}
                {showPaginator ?
                    <Paginator
                        pages={pages}
                        previousPage={currentPage - 1}
                        currentPage={currentPage}
                        nextPage={currentPage + 1}
                        toggleNextPage={toggleNextPage}
                    /> : null}
            </div>
        </div>
    );
};

export default SearchMovie;