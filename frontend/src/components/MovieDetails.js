import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';

import movieDetailsApi from '../services/movieDetailsApi';
import MovieItem from './utils/MovieItem';

function MovieDetails(params) {
    const [showSpinner, setShowSpinner] = useState();
    const [showDetails, setShowDetails] = useState();

    const [details, setDetails] = useState();

    const spinner = <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

    async function getMovieDetails() {
        setShowSpinner(true);
        let IdMovie = params.location.search.split('=')[1];

        await movieDetailsApi(IdMovie)
            .get()
            .then((response) => {
                setShowSpinner(false);
                setDetails(response.data)
                setShowDetails(true);
            })
            .catch((err) => {
                setShowSpinner(false);
                console.log(err)
            })
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {showSpinner ? spinner : null}
            </div>
            {showDetails ? <MovieItem details={details} /> : null}
        </div>
    );
}

export default MovieDetails;