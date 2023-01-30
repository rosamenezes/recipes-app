import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  const { pathname } = history.location;
  const [inputSearch, setInputSearch] = useState(false);

  const handleClickProfile = () => {
    history.push('/profile');
  };

  const handleClickSearch = () => {
    setInputSearch(!inputSearch);
  };

  return (
    <div>
      { pathname === '/drinks' && (
        <div>
          {inputSearch && (
            <SearchBar />
          )}
          <button
            type="button"
            onClick={ handleClickSearch }
          >
            <img
              src={ searchIcon }
              alt="imagem de pesquisa"
              data-testid="search-top-btn"
            />
          </button>
          <button
            type="button"
            onClick={ handleClickProfile }
          >
            <img
              src={ profileIcon }
              alt="imagem de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          <h1 data-testid="page-title">Drinks</h1>
        </div>
      ) }
      { pathname === '/meals' && (
        <div>
          {inputSearch && (
            <SearchBar />
          )}
          <button
            type="button"
            onClick={ handleClickSearch }
          >
            <img
              src={ searchIcon }
              alt="imagem de pesquisa"
              data-testid="search-top-btn"
            />
          </button>
          <button
            type="button"
            onClick={ handleClickProfile }
          >
            <img
              src={ profileIcon }
              alt="imagem de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          <h1 data-testid="page-title">Meals</h1>
        </div>
      ) }
      { pathname === '/profile' && (
        <div>
          <button
            type="button"
            onClick={ handleClickProfile }
          >
            <img
              src={ profileIcon }
              alt="imagem de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          <h1 data-testid="page-title">Profile</h1>
        </div>
      ) }
      { pathname === '/done-recipes' && (
        <div>
          <button
            type="button"
            onClick={ handleClickProfile }
          >
            <img
              src={ profileIcon }
              alt="imagem de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          <h1 data-testid="page-title">Done Recipes</h1>
        </div>
      ) }
      { pathname === '/favorite-recipes' && (
        <div>
          <button
            type="button"
            onClick={ handleClickProfile }
          >
            <img
              src={ profileIcon }
              alt="imagem de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          <h1 data-testid="page-title">Favorite Recipes</h1>
        </div>
      ) }
    </div>
  );
}

export default Header;
