import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselCard from '../Components/Carousel/CarouselCard';
import DrinkDetailCard from '../Components/DrinkDetailCard';
import MealDetailCard from '../Components/MealDetailCard';
import '../index.css';

function RecipeDetails() {
  const [mealInfo, setMealInfo] = useState();
  const [drinkInfo, setDrinkInfo] = useState();
  // const [buttonIsTrue, setButtonIsTrue] = useState(true);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  // console.log(pathname.split('/')[2]);
  // console.log(pathname.split('/')[1]);

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log(doneRecipesStorage.some((p) => p.))
    // console.log(doneRecipesStorage);
    setDoneRecipes(doneRecipesStorage);
    console.log(doneRecipes);

    const makeFetchMealDetail = async () => {
      setIsLoading(true);
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`);
      const data = await results.json();
      console.log(data.meals[0]);
      setMealInfo(data.meals[0]);
      setIsLoading(false);
    };

    const makeFetchDrinkDetail = async () => {
      setIsLoading(true);
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`);
      const data = await results.json();
      // console.log(data.drinks[0]);
      setDrinkInfo(data.drinks[0]);
      setIsLoading(false);
    };

    if (pathname.split('/')[1] === 'meals') {
      makeFetchMealDetail();
    }
    if (pathname.split('/')[1] === 'drinks') {
      makeFetchDrinkDetail();
    }
  }, []);
  // useEffect(() => {
  //   if (pathname.split('/')[1] === 'meals') {
  //     setButtonIsTrue(doneRecipes
  //       .some((p) => p.idMeal === pathname.split('/')[2]));
  //   }
  //   if (pathname.split('/')[1] === 'drinks') {
  //     setButtonIsTrue(doneRecipes
  //       .some((p) => p.idDrink === pathname.split('/')[2]));
  //   }
  // }, [doneRecipes]);
  return (
    <div>
      {isLoading ? <h1>carregando</h1>
        : (
          <div>
            {pathname.split('/')[1] === 'drinks'
              ? (
                <DrinkDetailCard receita={ drinkInfo } />)
              : <MealDetailCard receita={ mealInfo } />}
          </div>)}
      <CarouselCard info={ pathname } />
      {/* {doneRecipes.length > 0
        && (
          <div>
            {buttonIsTrue === false && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
              >
                Start Recipe
              </button>)}
          </div>) } */}
    </div>
  );
}

export default RecipeDetails;
