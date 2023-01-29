import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';
import DrinksCard from './DrinksCard';
import MealsCard from './MealsCard';

function Recipes() {
  const history = useHistory();
  const { pathname } = history.location;
  const { recipesMeals,
    recipesDrinks,
    escolheFiltroMeals,
    escolheFiltroDrinks,
    isLoading } = useContext(RecipesContext);
  const [recipes1, setRecipes1] = useState({ meals: [] });
  const [recipes2, setRecipes2] = useState({ drinks: [] });
  const buttonsMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat', 'All'];
  const buttonsDrinks = ['Ordinary Drink',
    'Cocktail', 'Shake', 'Cocoa', 'All'];
  const number12 = 12;
  useEffect(() => {
    if (pathname === '/meals') {
      setRecipes1(recipesMeals);
    }
    if (pathname === '/drinks') {
      setRecipes2(recipesDrinks);
    }
  }, [recipesMeals, recipesDrinks, pathname, recipes1]);

  const handleClickFilterMeals = (e) => {
    escolheFiltroMeals(e.target.name);
  };
  const handleClickFilterDrinks = (e) => {
    escolheFiltroDrinks(e.target.name);
  };
  return (
    <div>
      {isLoading ? <h1>carregando</h1>
        : (
          <div>
            {pathname === '/meals'
              ? (
                <div>
                  {buttonsMeals.map((category) => (
                    <button
                      key={ category }
                      data-testid={ `${category}-category-filter` }
                      name={ category }
                      onClick={ handleClickFilterMeals }
                    >
                      { category }
                    </button>
                  ))}
                  {recipes1.meals.map((receitas, index) => (
                    <MealsCard
                      receitas={ receitas }
                      index={ index }
                      key={ index }
                    />
                  )).slice(0, number12)}
                </div>)
              : (
                <div>
                  <button
                    type="button"
                    data-testid="Other/Unknown-category-filter"
                    name="Other/Unknown"
                    onClick={ handleClickFilterDrinks }
                  >
                    Other / Unknown
                  </button>
                  {buttonsDrinks.map((category) => (
                    <button
                      key={ category }
                      data-testid={ `${category}-category-filter` }
                      name={ category }
                      onClick={ handleClickFilterDrinks }
                    >
                      { category }
                    </button>
                  ))}
                  {recipes2.drinks.map((receitas, index) => (
                    <DrinksCard
                      receitas={ receitas }
                      index={ index }
                      key={ index }
                    />
                  )).slice(0, number12)}
                </div>)}
          </div>)}
    </div>
  );
}

export default Recipes;
