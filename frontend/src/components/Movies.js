import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import moviesApi from '../services/moviesApi';
import MovieList from './utils/MovieList';
import Paginator from './utils/Paginator';

function Movies() {
    const spinner = <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;
    const [showSpinner, setShowSpinner] = useState(false);

    const [showMovies, setShowMovies] = useState(false);
    const [movies, setMovies] = useState(null);

    const [pages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    const [showPaginator, setShowPaginator] = useState(false);

    function toggleNextPage(page) {
        if (page) {
            getMovies(page);
            window.scrollTo("0", "0");
        }
    }

    async function getMovies(page) {
        setShowSpinner(true);

        await moviesApi(page)
            .get()
            .then((response) => {
                setPages(response.data.total_pages);
                setCurrentPage(response.data.page);

                setMovies(response.data.results);
                setShowSpinner(false);
                setShowPaginator(true);
                setShowMovies(true);
            })
            .catch((err) => {
                console.log(err)
                setShowSpinner(true);
            })
    }

    useEffect(() => {
        getMovies();
    }, [])

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
    )
}

export default Movies;