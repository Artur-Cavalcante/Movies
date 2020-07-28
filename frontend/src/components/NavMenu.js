import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  Input,
} from 'reactstrap';

import {
  FaFilm,
  FaSearch,
  FaStar,
} from 'react-icons/fa';

import {
  FcFilmReel
} from 'react-icons/fc';

import '../styles/NavMenu.css';

function NavMenu(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [inputText, setInputText] = useState("");
  const [route, setRoute] = useState("");

  let FilmLogo = <FcFilmReel size="3.4rem"  />;
  let FavoriteIcon = <FaStar size={19} color="#d6a91a" style={{marginRight:2, marginBottom:2}}/>;
  let FilmsLogo = <FaFilm size={19} color="#48A072" style={{marginRight:2}} /> 
  let SearchIcon = <FaSearch size={19} />;

  function toggleNavbar() {
    setCollapsed(!collapsed);
  };

  function handleEnterKey(event){
    if(event.key === 'Enter'){
      props.toggleSearch(true);
      props.getSearchText(inputText);
      setRoute(<Redirect push to="/search" />)
    };
  }

  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#c8e2d4" }}
        className="navbar-expand-lg  mb-3 shadow"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
              {FilmLogo}
              <lable className="logo-name">Simplificauto Movies</lable>
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav ">
              <div className="mr-3 mt-2">
                <div style={{ display: "inline-block", width:"90%" }}>
                  <Input 
                    placeholder="Search Movie" 
                    onChange={(e) => {
                      setInputText(e.target.value);
                    } }
                    onKeyPress={handleEnterKey}
                  />
                </div>
                <NavLink  
                  to="/search"
                  className="text-dark" 
                  onClick={() => {
                    props.toggleSearch(true);
                    props.getSearchText(inputText);
                  }} 
                  style={{ display: "inline-block", width:"5%", paddingLeft:7 }} tag={Link} 
                >
                  {SearchIcon}
                </NavLink>
              </div>
              <NavLink tag={Link} className="text-dark mr-3 mt-2" to="/">
                {FilmsLogo}
                <span>
                  Movies
                </span>
              </NavLink>
              <NavLink tag={Link} className="text-dark mt-2" to="/favorite">
                {FavoriteIcon}
                <span>
                  Favorites
                </span>
              </NavLink>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
      {route}
    </header>
  );
};

export default NavMenu;