import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
    FaRegStar,
    FaStar
} from 'react-icons/fa'

import imgNotFound from '../../assets/imgNotFound.jpg';

import favoriteApi from '../../services/favoriteApi';

import '../../styles/MoviePreview.css';

function MoviePreview(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [showEmptyStar, setShowEmptyStar] = useState(false);
    const [showFilledStar, setShowFilledStar] = useState(false);

    function handleImgPath(){
        if(props.movie.poster_path){
            return "https://image.tmdb.org/t/p/w500" + props.movie.poster_path;
        }else{
            return imgNotFound;
        }
    }

    function checkIsFavorite(movies, id) {
        for (let index = 0; index < movies.length; index++) {
            const movie = movies[index];

            if (movie.id === id) {
                return true;
            }
        }

    };

    async function getFavorites(id) {
        await favoriteApi()
            .get('/')
            .then((response) => {
                if (response.data[0]) {
                    setIsFavorite(checkIsFavorite(response.data, props.movie.id));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getFavorites(props.movie.id);
    }, [props.movie.id])

    useEffect(() => {
        if (isFavorite) {
            setShowFilledStar(true);
            setShowEmptyStar(false);
        } else {
            setShowEmptyStar(true);
            setShowFilledStar(false);
        }
    }, [isFavorite])

    return (
        <section className="item-container" key={props.movie.id}>
            <div>
                <Link to={"/details?id=" + props.movie.id} style={{ textDecoration: "none"}} >
                    <div className="img-container">
                        <img className="img-preview" src={handleImgPath()} alt='img' />
                    </div>
                    <div className="title-date-container">
                        {props.movie.title} ({props.movie.release_date.split('-')[0]})
                        {showEmptyStar ? <FaRegStar color="#d6a91a" size="1rem" className="star" /> : null}
                        {showFilledStar ? <FaStar color="#d6a91a" size="1rem" className="star" /> : null}
                    </div>
                </Link>
                <div className="rating-container">
                    Rating: {props.movie.vote_average}
                </div>
            </div>
        </section>
    );
};

export default MoviePreview;