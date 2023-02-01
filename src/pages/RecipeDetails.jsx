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
import useLocalStorage from '../hooks/useLocalStorage';

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
  const { setFavoriteStorage } = useLocalStorage();
  const history = useHistory();
  const { criaInProgress } = useLocalStorage();
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
      // console.log(data.meals[0]);
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
    if (pathname.split('/')[1] === 'meals') {
      criaInProgress(pathname.split('/')[1], mealInfo);
    }
    if (pathname.split('/')[1] === 'drinks') {
      criaInProgress(pathname.split('/')[1], drinkInfo);
    }
    history.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/in-progress`);
  };
  const handleShareClick = () => {
    clipboardCopy(`http://localhost:3000/${pathname.split('/')[1]}/${pathname.split('/')[2]}`);
    setShareMessageState(true);
  };
  const handleFavoriteClick = () => {
    if (pathname.split('/')[1] === 'meals') {
      setFavoriteStorage(
        mealInfo,
        pathname.split('/')[1],
        pathname.split('/')[2],
        verifica,
      );
    }
    if (pathname.split('/')[1] === 'drinks') {
      setFavoriteStorage(
        drinkInfo,
        pathname.split('/')[1],
        pathname.split('/')[2],
        verifica,
      );
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
