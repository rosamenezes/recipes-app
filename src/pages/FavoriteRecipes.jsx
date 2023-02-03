import React, { useEffect, useState } from 'react';
import FavoritesCard from '../Components/FavoritesCard';
import Header from '../Components/Header';

function FavoriteRecipes() {
  const [favoriteStorage, setFavoriteStorage] = useState(null);
  useEffect(() => {
    let favoritesRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoritesRecipesStorage === undefined
      && favoritesRecipesStorage === null
      && favoritesRecipesStorage.length === 0) {
      favoritesRecipesStorage = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipesStorage));
    }
    setFavoriteStorage(favoritesRecipesStorage);
  }, []);

  const filterMealsButton = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteStorage(storage.filter((recipe) => recipe.type === 'meal'));
  };
  const filterDrinkButton = () => {
    const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteStorage(storage.filter((recipe) => recipe.type === 'drink'));
  };
  const filterAllButton = () => {
    setFavoriteStorage(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };
  return (
    <div>
      <Header />
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
      {favoriteStorage !== null
      && (
        <div>
          {favoriteStorage
            .map((p, index) => (
              <FavoritesCard info1={ p } key={ index } index={ index } />))}
        </div>)}
    </div>
  );
}

export default FavoriteRecipes;
