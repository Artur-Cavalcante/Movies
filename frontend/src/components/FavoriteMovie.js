import React, { useEffect, useState } from 'react';

import MovieList from './utils/MovieList';

import favoriteApi from '../services/favoriteApi';
import MessageBox from './utils/MessageBox';

import { Spinner } from 'reactstrap';

function FavoriteMovie() {
  const [showSpinner, setShowSpinner] = useState(false);
  
  const [showMovie, setShowMovie] = useState(false);
  const [movies, setMovies] = useState(null);

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [messageBox, setMessageBox] = useState(false);
  
  
  const spinner = <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />;

  async function getFavorite() {
    setShowSpinner(true);

    await favoriteApi()
      .get('/')
      .then((response) => {
        setShowSpinner(false);
        if(response.data[0]){
            setMovies(response.data);
        }else{
            setShowSpinner(false)
        }
    })
      .catch((error) => {
        console.log(error);
        setShowSpinner(false);
        setMessageBox("Database no Reached");
      });
  }

  useEffect(() => {
    getFavorite();
  }, [])

  useEffect(() => {
    if(movies){
        setShowMovie(true);
        setShowMessageBox(false);
    }else{
        setShowMovie(false);
        setShowMessageBox(true);
        setMessageBox("No favorites");
    }
  }, [movies])

  return (
    <div>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        {showSpinner ? spinner : null}
      </div>
      {showMovie ? <MovieList movies={movies}/> : null}
      {showMessageBox ? <MessageBox name={messageBox} /> : null}
    </div>
  );
};

export default FavoriteMovie;