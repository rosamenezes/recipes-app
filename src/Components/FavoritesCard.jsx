import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import '../index.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesCard({ info1, index }) {
  const [verifica, setVerifica] = useState(false);
  const [info, setInfo] = useState(null);
  const [shareMessageState, setShareMessageState] = useState(false);

  useEffect(() => {
    setInfo(info1);
  }, [info1]);

  const handleShareClick = () => {
    clipboardCopy(`http://localhost:3000/${info.type}s/${info.id}`);
    setShareMessageState(true);
  };
  const handleFavoriteClick = () => {
    let favoritesRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoritesRecipesStorage);
    favoritesRecipesStorage = favoritesRecipesStorage.filter((p) => p.id !== info.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipesStorage));
    setVerifica(!verifica);
    window.location.reload();
  };
  return (
    <div>
      {info !== null
      && (
        <div>
          <h1
            data-testid={ `${index}-horizontal-top-text` }
          >
            { info.type === 'meal'
              ? `${info.nationality} - ${info.category}`
              : info.alcoholicOrNot }
          </h1>
          <Link to={ `/${info.type}s/${info.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{info.name}</h2>
            <img
              width={ 300 }
              height={ 400 }
              src={ info.image }
              alt={ info.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <button
            type="button"
            onClick={ handleFavoriteClick }
          >
            <img
              src={ blackHeartIcon }
              alt="favorita button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
          <button
            type="button"
            onClick={ handleShareClick }
          >
            <img
              src={ shareIcon }
              alt="share icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <h2
            className={ shareMessageState ? undefined : 'esconde' }
          >
            Link copied!
          </h2>
        </div>)}
    </div>
  );
}

FavoritesCard.propTypes = {
  info: PropTypes.string,
}.isRequired;

export default FavoritesCard;
