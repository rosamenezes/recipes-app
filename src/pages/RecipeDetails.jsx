import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import CarouselCard from '../Components/Carousel/CarouselCard';
import DrinkDetailCard from '../Components/DrinkDetailCard';
import MealDetailCard from '../Components/MealDetailCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../index.css';

function RecipeDetails() {
  const StartName = 'Start Recipe';
  const [mealInfo, setMealInfo] = useState();
  const [drinkInfo, setDrinkInfo] = useState();
  const [buttonIsTrue, setButtonIsTrue] = useState(true);
  const [verifica, setVerifica] = useState(false);
  const [buttonName, setButtonName] = useState(StartName);
  const [doneRecipes, setDoneRecipes] = useState([{}]);
  const [inProgressRecipes, setinProgressRecipes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [shareMessageState, setShareMessageState] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  useEffect(() => {
    let doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesStorage === null || doneRecipesStorage === undefined) {
      localStorage.setItem('doneRecipes', JSON.stringify([{}]));
      doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    }
    setDoneRecipes(doneRecipesStorage);
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipesStorage === null || inProgressRecipesStorage === undefined) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({}));
      inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    setinProgressRecipes(inProgressRecipesStorage);

    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let verifica1 = false;

    if (favoriteRecipesStorage !== null) {
      verifica1 = favoriteRecipesStorage.some((p) => p.id === pathname.split('/')[2]);
      setVerifica(verifica1);
    }
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
      setButtonName(bol ? 'Continue Recipe' : StartName);
    }
    if (pathname.split('/')[1] === 'drinks' && Object
      .keys(inProgressRecipes).length > 0) {
      const bol = Object.keys(inProgressRecipes.drinks)
        .some((id) => id === pathname.split('/')[2]);
      setButtonName(bol ? 'Continue Recipe' : StartName);
    }
  }, [inProgressRecipes]);

  const handleClick = () => {
    history.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/in-progress`);
  };
  const handleShareClick = () => {
    clipboardCopy(`http://localhost:3000/${pathname.split('/')[1]}/${pathname.split('/')[2]}`);
    setShareMessageState(true);
  };
  const handleFavoriteClick = () => {
    let favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesStorage === null) {
      favoriteRecipesStorage = [];
    }
    // if (favoriteRecipesStorage !== null && favoriteRecipesStorage.length > 0) {
    //   const teste = favoriteRecipesStorage.filter((p) => p.id !== pathname.split('/')[2]);
    //   console.log(teste);
    // }
    // console.log(drinkInfo);
    if (pathname.split('/')[1] === 'meals' && verifica === false) {
      const array = [...favoriteRecipesStorage, { id: mealInfo.idMeal,
        type: pathname.split('/')[1] === 'drinks' ? 'drink' : 'meal',
        nationality: mealInfo.strArea,
        category: mealInfo.strCategory,
        alcoholicOrNot: '',
        name: mealInfo.strMeal,
        image: mealInfo.strMealThumb,
      }];
      console.log(array);
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    }
    if (pathname.split('/')[1] === 'drinks' && verifica === false) {
      const array = [...favoriteRecipesStorage, { id: drinkInfo.idDrink,
        type: pathname.split('/')[1] === 'drinks' ? 'drink' : 'meal',
        nationality: '',
        category: drinkInfo.strCategory,
        alcoholicOrNot: drinkInfo.strAlcoholic,
        name: drinkInfo.strDrink,
        image: drinkInfo.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    }
    if (favoriteRecipesStorage !== null
      && favoriteRecipesStorage.length > 0 && verifica === true) {
      const teste = favoriteRecipesStorage.filter((p) => p.id !== pathname.split('/')[2]);
      console.log(teste);
      localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
    }
    setVerifica(!verifica);
  };
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
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <h2 className={ shareMessageState ? undefined : 'esconde' }>Link copied!</h2>
      <button
        type="button"
        // data-testid="favoriaate-btn"
        onClick={ handleFavoriteClick }
      >
        <img
          src={ verifica ? blackHeartIcon : whiteHeartIcon }
          alt="favorita button"
          data-testid="favorite-btn"
        />
      </button>
      <CarouselCard info={ pathname } />
      {doneRecipes.length > 0
        && (
          <div>
            {buttonIsTrue === false && (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-btn"
                onClick={ handleClick }
              >
                {buttonName}
              </button>)}
          </div>) }
    </div>
  );
}

export default RecipeDetails;
