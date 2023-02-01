import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import '../index.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import useChecked from '../hooks/useChecked';

function RecipeInProgressCard({ info }) {
  const [info1, setInfo1] = useState(null);
  const [shareMessageState, setShareMessageState] = useState(false);
  const [ing, setIng] = useState(null);
  const [atualiza, setAtualiza] = useState(false);
  const [finishState, setFinishState] = useState(true);
  const [verifica, setVerifica] = useState(false);
  const { criaMeal,
    criaDrink, criaListaIng2, setFavoriteStorage, criaDoneRecipe } = useLocalStorage();
  const { checkedMeal, checkedDrink, validaFinishButton } = useChecked();
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    setInfo1(info);
  }, [info]);

  useEffect(() => {
    const inProgressRecipesStorage = JSON
      .parse(localStorage.getItem('inProgressRecipes'));
    const bol = inProgressRecipesStorage === null
    || inProgressRecipesStorage === undefined;
    if (bol === false) {
      if (pathname.split('/')[1] === 'meals') {
        setIng(inProgressRecipesStorage.meals[pathname.split('/')[2]]);
      }
      if (pathname.split('/')[1] === 'drinks') {
        setIng(inProgressRecipesStorage.drinks[pathname.split('/')[2]]);
      }
    }
    if (info !== null && bol) {
      setIng(criaListaIng2(info));
    }
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let verifica1 = false;

    if (favoriteRecipesStorage !== null) {
      verifica1 = favoriteRecipesStorage.some((p) => p.id === pathname.split('/')[2]);
      setVerifica(verifica1);
    }
    setFinishState(validaFinishButton(pathname.split('/')[1], pathname.split('/')[2]));
  }, [info, atualiza]);

  const handleCheckClick = (e) => {
    if (pathname.split('/')[1] === 'drinks') {
      criaDrink(ing, pathname.split('/')[2]);
      checkedDrink(e.target.parentNode.innerText, pathname.split('/')[2]);
    }
    if (pathname.split('/')[1] === 'meals') {
      criaMeal(ing, pathname.split('/')[2]);
      checkedMeal(e.target.parentNode.innerText, pathname.split('/')[2]);
    }
    setAtualiza(!atualiza);
  };

  const handleFavoriteClick = () => {
    setFavoriteStorage(
      info1,
      pathname.split('/')[1],
      pathname.split('/')[2],
      verifica,
    );
    setVerifica(!verifica);
  };

  const handleShareClick = () => {
    clipboardCopy(`http://localhost:3000/${pathname.split('/')[1]}/${pathname.split('/')[2]}`);
    setShareMessageState(true);
  };

  const handleFinishClick = () => {
    criaDoneRecipe(info1, pathname.split('/')[1]);
    history.push('/done-recipes');
  };
  return (
    <div>
      {info1 !== null
      && (
        <div>
          {pathname.split('/')[1] === 'meals'
            ? (
              <div>
                <h1 data-testid="recipe-title">{info.strMeal}</h1>
                <img
                  src={ info.strMealThumb }
                  alt={ info.strMeal }
                  data-testid="recipe-photo"
                  height="200"
                />
                <h1 data-testid="recipe-category">{ info.strCategory }</h1>
                <p data-testid="instructions">{info.strInstructions}</p>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleShareClick }
                >
                  <img src={ shareIcon } alt="share icon" />
                </button>
                <button
                  type="button"
                  //   data-testid="favorite-btn"
                  onClick={ handleFavoriteClick }
                >
                  <img
                    src={ verifica ? blackHeartIcon : whiteHeartIcon }
                    alt="favorita button"
                    data-testid="favorite-btn"
                  />
                </button>
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  className="finish-recipe-btn"
                  onClick={ handleFinishClick }
                  disabled={ !finishState }
                >
                  Finish
                </button>
                <h2
                  className={ shareMessageState ? undefined : 'esconde' }
                >
                  Link copied!
                </h2>
                {ing !== null
                && (
                  ing.map((p, index) => (
                    <label
                      htmlFor={ `checkbox1${index}` }
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      className={ p.split('$$$')[1] === 'checked' ? 'risca' : undefined }
                    >
                      <input
                        type="checkbox"
                        id={ `checkbox1${index}` }
                        onClick={ handleCheckClick }
                        defaultChecked={ p.split('$$$')[1] === 'checked' }
                      />
                      { p.split('$$$')[0] }
                    </label>))
                )}
              </div>)
            : (
              <div>
                <h1 data-testid="recipe-title">{info.strDrink}</h1>
                <img
                  src={ info.strDrinkThumb }
                  alt={ info.strDrink }
                  data-testid="recipe-photo"
                  height="200"
                />
                <h1 data-testid="recipe-category">{ info.strAlcoholic }</h1>
                <p data-testid="instructions">{info.strInstructions}</p>
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleShareClick }
                >
                  <img src={ shareIcon } alt="share icon" />
                </button>
                <button
                  type="button"
                  //   data-testid="favorite-btn"
                  onClick={ handleFavoriteClick }
                >
                  <img
                    src={ verifica ? blackHeartIcon : whiteHeartIcon }
                    alt="favorita button"
                    data-testid="favorite-btn"
                  />
                </button>
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  className="finish-recipe-btn"
                  disabled={ !finishState }
                  onClick={ handleFinishClick }
                >
                  Finish
                </button>
                <h2
                  className={ shareMessageState ? undefined : 'esconde' }
                >
                  Link copied!
                </h2>
                {ing !== null
                && (
                  ing.map((p, index) => (
                    <label
                      htmlFor={ `checkbox${index}` }
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      className={ p.split('$$$')[1] === 'checked' ? 'risca' : undefined }
                    >
                      <input
                        type="checkbox"
                        id={ `checkbox${index}` }
                        onClick={ handleCheckClick }
                        defaultChecked={ p.split('$$$')[1] === 'checked' }
                      />
                      { p.split('$$$')[0] }
                    </label>))
                )}
              </div>) }
        </div>)}
    </div>
  );
}

RecipeInProgressCard.propTypes = {
  info: PropTypes.string,
}.isRequired;

export default RecipeInProgressCard;
