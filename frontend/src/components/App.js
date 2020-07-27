import React, { useState } from 'react';
import { Route } from 'react-router';
import { Container } from 'reactstrap';  

import NavMenu from './NavMenu';

import Movies from './Movies';
import SearchMovie from './SearchMovie';
import FavoriteMovie from './FavoriteMovie';
import MovieDetails from './MovieDetails';

function App() {
  const [searchText, setSearchText] = useState("");
  const [bindSearch, setBindSearch] = useState(false);

  function getSearchText(text){
    setSearchText(text);
  };

  function toggleSearch(option){
    setBindSearch(option);
  }

  return (
    <div className="App">
      <NavMenu getSearchText={getSearchText} toggleSearch={toggleSearch}/>
      <Container fluid={true}>
        <Route exact path="/" component={Movies}/>
        <Route path="/search" component={() => SearchMovie(searchText, bindSearch, toggleSearch)}/>
        <Route path="/favorite" component={FavoriteMovie}/>
        <Route path="/details" component={MovieDetails}/>
      </Container>
    </div>
  );
}

export default App;
