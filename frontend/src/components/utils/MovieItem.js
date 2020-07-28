import React, { useState, useEffect } from 'react';

import '../../styles/MovieItem.css';

import imgNotFound from '../../assets/imgNotFound.jpg'
import favoriteApi from '../../services/favoriteApi';
import castMovieApi from '../../services/castMovieApi';

import {
    FaRegStar,
    FaStar
} from 'react-icons/fa'


function MovieItem(props) {
    const [isFavorite, setIsFavorite] = useState(false);

    const [showEmptyStar, setShowEmptyStar] = useState(false);
    const [showFilledStar, setShowFilledStar] = useState(false);

    const [crew, setCrew] = useState({});

    function handleImgPath() {
        if (props.details.poster_path) {
            return "https://image.tmdb.org/t/p/w500" + props.details.poster_path;
        } else {
            return imgNotFound;
        }
    }

    async function getCast(id) {
        await castMovieApi(id)
            .get()
            .then((response) => {
                let Writing = "";
                let Directing = "";
                let Production = "";

                for (let index = 0; index < response.data.crew.length; index++) {
                    const cast = response.data.crew[index];
                    if ((!Writing) && cast.department === 'Writing') {
                        Writing = cast.name
                    }
                    if ((!Directing) && cast.department === 'Directing') {
                        Directing = cast.name
                    }
                    if ((!Production) && cast.department === 'Production') {
                        Production = cast.name
                    }

                }
                setCrew({ 'Writing': Writing, 'Directing': Directing, 'Production': Production });
            })
            .catch((err) => {
                console.log(err)
            })
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
                    setIsFavorite(checkIsFavorite(response.data, props.details.id));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleFavorite(star) {
        if (star === "empty") {
            saveFavorite(props.details);
        } else {
            removeFavorite(props.details.id);
        }
    }

    async function saveFavorite(movie) {
        await favoriteApi()
            .post('/', movie)
            .then((response) => {
                setIsFavorite(true);
            })
            .catch((error) => {
                console.log(error);

                setIsFavorite(false);
            });
    }

    async function removeFavorite(id) {
        await favoriteApi()
            .delete('?id=' + id)
            .then((response) => {
                setIsFavorite(false);
            })
            .catch((error) => {
                console.log(error);
                setIsFavorite(false);
            });
    }


    useEffect(() => {
        getCast(props.details.id);
        getFavorites(props.details.id);
    }, [props.details.id])

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
        <section className="details-container" >
            <div className="background-details">
                <div className="img-details-container">
                    <img className="img-details" src={handleImgPath()} alt='img' />
                </div>
                <div className="info-container">
                    <div className="title-container">
                        <div>
                            <label className="title-label">
                                {props.details.title ? props.details.title : null}
                            </label>
                            <span className="date-label">
                                {props.details.release_date ?
                                    '(' + props.details.release_date.split("-")[0] + ')'
                                    : null}
                            </span>

                            <p className="description-container">
                                {props.details.genres[0] ? props.details.genres[0].name + ' - ' : null}
                                {props.details.runtime ? props.details.runtime + 'min -' : null}
                                <span className="language">
                                    {props.details.original_language ? props.details.original_language : null}
                                </span>
                                <p className="rating">
                                    {props.details.vote_average ? 'Rating:' + ' ' + props.details.vote_average : null}
                                </p>
                            </p>
                        </div>

                        <div className="star-container">
                            {showEmptyStar ? <FaRegStar color="#d6a91a" size="3.5rem" onClick={() => handleFavorite("empty")} style={{ cursor: "pointer" }} className="item-star" /> : null}
                            {showFilledStar ? <FaStar color="#d6a91a" size="3.5rem" onClick={() => handleFavorite("filled")} style={{ cursor: "pointer" }} className="item-star" /> : null}
                        </div>
                    </div>
                    <div className="overview-container">
                        <p className="overview-label">Overview</p>
                        <p className="overview">
                            {props.details.overview ? props.details.overview : 'Without Overview'}
                        </p>
                    </div>
                    <div className="cast-container">
                        <label className="directing">
                            <label className="directing-label">{crew.Directing ? 'Directing:' : null}</label>
                            {crew.Directing ? crew.Directing : null}
                        </label>
                        <label className="writing">
                            <label className="writing-label">{crew.Writing ? 'Writing:' : null}</label>
                            {crew.Writing ? crew.Writing : null}

                        </label>
                        <label className="production">
                            <label className="production-label">{crew.Production ? 'Production:' : null}</label>
                            {crew.Production ? crew.Production : null}
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieItem;