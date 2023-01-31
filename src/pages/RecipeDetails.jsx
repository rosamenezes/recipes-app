import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CarouselCard from '../Components/Carousel/CarouselCard';
import DrinkDetailCard from '../Components/DrinkDetailCard';
import MealDetailCard from '../Components/MealDetailCard';
import '../index.css';

function RecipeDetails() {
  const [mealInfo, setMealInfo] = useState();
  const [drinkInfo, setDrinkInfo] = useState();
  const [buttonIsTrue, setButtonIsTrue] = useState(true);
  const [buttonName, setButtonName] = useState('Start Recipe');
  const [doneRecipes, setDoneRecipes] = useState([{}]);
  const [inProgressRecipes, setinProgressRecipes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  // console.log(pathname.split('/')[2]);
  // console.log(pathname.split('/')[1]);
  useEffect(() => {
    let doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log(doneRecipesStorage);
    if (doneRecipesStorage === null || doneRecipesStorage === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([{}]));
      doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    }
    setDoneRecipes(doneRecipesStorage);

    // localStorage.setItem('inProgressRecipes', JSON.stringify({
    //   drinks: {
    //     17222: ['lista-de-ingredientes-utilizados'],
    //   },
    //   meals: {
    //     52977: ['Lentils', 'Onion', 'Carrots'],
    //     854: ['Lentils', 'Onion', 'Carrots'],
    //   },
    // }));
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(inProgressRecipesStorage);
    if (inProgressRecipesStorage === null || inProgressRecipesStorage === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
      inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      // console.log(inProgressRecipesStorage);
    }
    console.log(inProgressRecipesStorage);
    console.log(Object.keys(inProgressRecipesStorage).length);
    setinProgressRecipes(inProgressRecipesStorage);
  }, []);

  useEffect(() => {
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
      console.log(data.drinks[0]);
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

  useEffect(() => {
    if (pathname.split('/')[1] === 'meals' && doneRecipes !== 0) {
      setButtonIsTrue(doneRecipes
        .some((p) => p.id === pathname.split('/')[2]));
    }
    if (pathname.split('/')[1] === 'drinks' && doneRecipes !== 0) {
      setButtonIsTrue(doneRecipes
        .some((p) => p.id === pathname.split('/')[2]));
    }
  }, [doneRecipes]);

  useEffect(() => {
    if (pathname.split('/')[1] === 'meals' && Object
      .keys(inProgressRecipes).length > 0) {
      const bol = Object.keys(inProgressRecipes.meals)
        .some((id) => id === pathname.split('/')[2]);
      setButtonName(bol ? 'Continue Recipe' : 'Start Recipe');
    }
    if (pathname.split('/')[1] === 'drinks' && Object
      .keys(inProgressRecipes).length > 0) {
      const bol = Object.keys(inProgressRecipes.drinks)
        .some((id) => id === pathname.split('/')[2]);
      setButtonName(bol ? 'Continue Recipe' : 'Start Recipe');
    }
  }, [inProgressRecipes]);
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
      {doneRecipes.length > 0
        && (
          <div>
            {buttonIsTrue === false && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
              >
                {buttonName}
              </button>)}
          </div>) }
    </div>
  );
}

export default RecipeDetails;
