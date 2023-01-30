import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

function RecipesProvider({ children }) {
  const [recipesMeals, setRecipesMeals] = useState({ meals: [] });
  const [recipesDrinks, setRecipesDrinks] = useState({ drinks: [] });
  const [categoryMeals, setCategoryMeals] = useState('');
  const [categoryDrinks, setCategoryDrinks] = useState('');
  const [mealId, setMealId] = useState(null);
  const [drinkId, setDrinkId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mealsURLInicial = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksURLInicial = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  useEffect(() => {
    const makeFetchMeals = async () => {
      setIsLoading(true);
      const results = await fetch(mealsURLInicial);
      const data = await results.json(mealsURLInicial);
      setRecipesMeals(data);
      setIsLoading(false);
    };
    const makeFetchDrinks = async () => {
      setIsLoading(true);
      const results = await fetch(drinksURLInicial);
      const data = await results.json();
      setRecipesDrinks(data);
      setIsLoading(false);
    };
    makeFetchDrinks();
    makeFetchMeals();
  }, []);

  const escolheFiltroMeals = async (category1) => {
    if (categoryMeals !== category1 && category1 !== 'All') {
      setCategoryMeals(category1);
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category1}`);
      const data = await results.json();
      setRecipesMeals(data);
    }
    if (categoryMeals === category1) {
      setCategoryMeals('');
      const results = await fetch(mealsURLInicial);
      const data = await results.json();
      setRecipesMeals(data);
    }
    if (category1 === 'All') {
      setCategoryMeals('');
      const results = await fetch(mealsURLInicial);
      const data = await results.json();
      setRecipesMeals(data);
    }
  };

  const escolheFiltroDrinks = async (category1) => {
    if (categoryDrinks !== category1 && category1 !== 'All') {
      setCategoryDrinks(category1);
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category1}`);
      const data = await results.json();
      setRecipesDrinks(data);
    }
    if (categoryDrinks === category1) {
      setCategoryDrinks('');
      const results = await fetch(drinksURLInicial);
      const data = await results.json();
      setRecipesDrinks(data);
    }
    if (category1 === 'All') {
      setCategoryDrinks('');
      const results = await fetch(drinksURLInicial);
      const data = await results.json();
      setRecipesDrinks(data);
    }
  };

  const pegaMealId = (id) => {
    setMealId(id);
  };

  const pegaDrinkId = (id) => {
    setDrinkId(id);
  };

  const context = useMemo(() => ({
    escolheFiltroDrinks,
    escolheFiltroMeals,
    pegaMealId,
    pegaDrinkId,
    mealId,
    drinkId,
    recipesMeals,
    recipesDrinks,
    isLoading,
  }), [recipesMeals,
    recipesDrinks,
    categoryMeals,
    categoryDrinks,
    isLoading,
    mealId,
    drinkId]);

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default RecipesProvider;
