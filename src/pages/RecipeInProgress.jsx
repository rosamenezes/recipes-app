import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeInProgressCard from '../Components/RecipeInProgressCard';

function RecipeInProgress() {
  const [mealInfo, setMealInfo] = useState(null);
  const [drinkInfo, setDrinkInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    // console.log(pathname.split('/')[1]);
    // console.log(pathname.split('/')[2]);
    const makeFetchMealDetail = async () => {
      setIsLoading(true);
      const results = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`);
      const data = await results.json();
      //   console.log(data.meals[0]);
      setMealInfo(data.meals[0]);
      setIsLoading(false);
    };

    const makeFetchDrinkDetail = async () => {
      setIsLoading(true);
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathname.split('/')[2]}`);
      const data = await results.json();
      setDrinkInfo(data.drinks[0]);
      setIsLoading(false);
    };

    if (pathname.split('/')[1] === 'meals') {
      makeFetchMealDetail();
    }
    if (pathname.split('/')[1] === 'drinks') {
      makeFetchDrinkDetail();
    }
  }, [pathname]);
  useEffect(() => {
    // console.log(drinkInfo);
    // console.log(mealInfo);
    if (mealInfo === null || drinkInfo === null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [mealInfo, drinkInfo]);
  return (
    <div>
      {!isLoading
        ? (
          <div>
            { pathname.split('/')[1] === 'meals'
            && <RecipeInProgressCard info={ mealInfo } /> }
            { pathname.split('/')[1] === 'drinks'
            && <RecipeInProgressCard info={ drinkInfo } /> }
          </div>)
        : <h1>Carregando</h1>}
    </div>
  );
}

export default RecipeInProgress;
