import React, { useState, useEffect } from 'react';

import MoviePreview from './MoviePreview';
import '../../styles/MovieList.css';

function MovieList(props) {
    const [showMovies ,setShowMovies] = useState(null);
    const [movies ,setMovies] = useState(null);

    function handleShowMovies(){
        if(movies){
            return movies.map((movie) => <MoviePreview movie={movie} /> )   
        }
    }

    useEffect(()=>{
        if(props.movies.length){
            setShowMovies(true);
            setMovies(props.movies);
        }else{
            setShowMovies(false);
        }
    },[props.movies])

    return (
        <div className="list-container">
            {showMovies ? handleShowMovies() : null}
        </div>
    );
};

export default MovieList;