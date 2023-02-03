import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../index.css';

function DoneRecipesCard() {
  const [shareMessageState, setShareMessageState] = useState(false);
  const [copyLink, setCopyLink] = useState([]);
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filterDoneRecepes, setFilterDoneRecepes] = useState(doneRecipesStorage);

  const filterMealsButton = () => {
    setFilterDoneRecepes(doneRecipesStorage.filter((recipe) => recipe.type === 'meal'));
  };

  const filterDrinkButton = () => {
    setFilterDoneRecepes(doneRecipesStorage.filter((recipe) => recipe.type === 'drink'));
  };

  const filterAllButton = () => {
    setFilterDoneRecepes(doneRecipesStorage);
  };

  const shareButton = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setShareMessageState(true);
    setCopyLink([id]);
  };

  return (
    <div>
      <button
        onClick={ filterAllButton }
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        onClick={ filterMealsButton }
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        onClick={ filterDrinkButton }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {filterDoneRecepes.map((recipe, index) => {
        if (recipe.type === 'meal') {
          return (
            <div key={ recipe.id }>
              <h1
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </h1>
              <Link to={ `/meals/${recipe.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
                <img
                  width={ 300 }
                  height={ 400 }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <h3
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </h3>
              {recipe.tags.map((tag, i) => (
                <h4 key={ i } data-testid={ `0-${tag}-horizontal-tag` }>
                  { tag }
                </h4>
              ))}
              <button
                onClick={ () => shareButton(recipe.id, recipe.type) }
                // data-testid={ `${index}-horizontal-share-btn` }
                id={ recipe.id }
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              {copyLink.map((id, i) => (
                recipe.id === id && (
                  <h2
                    key={ i }
                    className={ shareMessageState ? undefined : 'esconde' }
                  >
                    Link copied!
                  </h2>
                )
              ))}
              <br />
            </div>
          );
        }
        if (recipe.type === 'drink') {
          return (
            <div key={ recipe.id }>
              <h1
                data-testid={ `${index}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot }
              </h1>
              <Link to={ `/drinks/${recipe.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
                <img
                  width={ 300 }
                  height={ 400 }
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <h3
                data-testid={ `${index}-horizontal-done-date` }
              >
                { recipe.doneDate }
              </h3>
              <button
                onClick={ () => shareButton(recipe.id, recipe.type) }
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                id={ recipe.id }
              >
                Compartilhar
              </button>
              {copyLink.map((id, i) => (
                recipe.id === id && (
                  <h2
                    key={ i }
                    className={ shareMessageState ? undefined : 'esconde' }
                  >
                    Link copied!
                  </h2>
                )
              ))}
              <br />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default DoneRecipesCard;
