export default function useLocalStorage() {
  const criaListaIng = (info) => {
    let ing = [
      `${info.strIngredient1} / ${info.strMeasure1}`,
      `${info.strIngredient2} / ${info.strMeasure2}`,
      `${info.strIngredient3} / ${info.strMeasure3}`,
      `${info.strIngredient4} / ${info.strMeasure4}`,
      `${info.strIngredient5} / ${info.strMeasure5}`,
      `${info.strIngredient6} / ${info.strMeasure6}`,
      `${info.strIngredient7} / ${info.strMeasure7}`,
      `${info.strIngredient8} / ${info.strMeasure8}`,
      `${info.strIngredient9} / ${info.strMeasure9}`,
      `${info.strIngredient10} / ${info.strMeasure10}`,
      `${info.strIngredient11} / ${info.strMeasure11}`,
      `${info.strIngredient12} / ${info.strMeasure12}`,
      `${info.strIngredient13} / ${info.strMeasure13}`,
      `${info.strIngredient14} / ${info.strMeasure14}`,
      `${info.strIngredient15} / ${info.strMeasure15}`,
    ];
    ing = ing.filter((p) => p !== 'null / null'
    && p !== ' /  ' && p !== ', ' && p !== ' / ');
    return ing;
  };
  const criaInProgress = (pathname, info) => {
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(inProgressRecipesStorage).length === 0) {
      inProgressRecipesStorage = {
        drinks: {},
        meals: {},
      };
    }
    if (pathname === 'meals'
    && inProgressRecipesStorage.meals[parseInt(info.idMeal, 10)] === undefined) {
      inProgressRecipesStorage = {
        drinks: {
          ...inProgressRecipesStorage.drinks,
        },
        meals: {
          ...inProgressRecipesStorage.meals,
          [info.idMeal]: criaListaIng(info),
        },
      };
    }
    if (pathname === 'drinks'
    && inProgressRecipesStorage.drinks[parseInt(info.idDrink, 10)] === undefined) {
      inProgressRecipesStorage = {
        drinks: {
          ...inProgressRecipesStorage.drinks,
          [info.idDrink]: criaListaIng(info),
        },
        meals: {
          ...inProgressRecipesStorage.meals,
        },
      };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesStorage));
  };

  // funçoes abaixo criam local storage do in progress caso o local storage nao exista quando tentar riscar um ingrediente
  const criaMeal = (ing, pathname) => {
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgressRecipesStorage = {
      drinks: {},
      meals: {},
    };
    inProgressRecipesStorage = {
      drinks: {
        ...inProgressRecipesStorage.drinks,
      },
      meals: {
        ...inProgressRecipesStorage.meals,
        [pathname]: ing,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesStorage));
  };
  const criaDrink = (ing, pathname) => {
    let inProgressRecipesStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgressRecipesStorage = {
      drinks: {},
      meals: {},
    };
    inProgressRecipesStorage = {
      drinks: {
        ...inProgressRecipesStorage.drinks,
        [pathname]: ing,
      },
      meals: {
        ...inProgressRecipesStorage.meals,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipesStorage));
  };

  const criaVazia = (inProgressRecipesStorage) => {
    if (inProgressRecipesStorage === null
        || inProgressRecipesStorage === undefined
        || Object.keys(inProgressRecipesStorage).length === 0) {
      inProgressRecipesStorage = {
        drinks: {},
        meals: {},
      };
    }
  };

  const criaListaIng2 = (info) => {
    let ing = [
      `${info.strIngredient1} / ${info.strMeasure1}`,
      `${info.strIngredient2} / ${info.strMeasure2}`,
      `${info.strIngredient3} / ${info.strMeasure3}`,
      `${info.strIngredient4} / ${info.strMeasure4}`,
      `${info.strIngredient5} / ${info.strMeasure5}`,
      `${info.strIngredient6} / ${info.strMeasure6}`,
      `${info.strIngredient7} / ${info.strMeasure7}`,
      `${info.strIngredient8} / ${info.strMeasure8}`,
      `${info.strIngredient9} / ${info.strMeasure9}`,
      `${info.strIngredient10} / ${info.strMeasure10}`,
      `${info.strIngredient11} / ${info.strMeasure11}`,
      `${info.strIngredient12} / ${info.strMeasure12}`,
      `${info.strIngredient13} / ${info.strMeasure13}`,
      `${info.strIngredient14} / ${info.strMeasure14}`,
      `${info.strIngredient15} / ${info.strMeasure15}`,
    ];
    ing = ing.filter((p) => p !== 'null / null'
    && p !== ' /  '
    && p !== ', '
    && p !== null
    && p !== ' / ');
    return ing;
  };

  const setFavoriteStorage = (info, pathname1, pathname2, verifica) => {
    let favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesStorage === null) {
      favoriteRecipesStorage = [];
    }
    if (pathname1 === 'meals' && verifica === false) {
      const array = [...favoriteRecipesStorage, { id: info.idMeal,
        type: pathname1 === 'drinks' ? 'drink' : 'meal',
        nationality: info.strArea,
        category: info.strCategory,
        alcoholicOrNot: '',
        name: info.strMeal,
        image: info.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    }
    if (pathname1 === 'drinks' && verifica === false) {
      const array = [...favoriteRecipesStorage, { id: info.idDrink,
        type: pathname1 === 'drinks' ? 'drink' : 'meal',
        nationality: '',
        category: info.strCategory,
        alcoholicOrNot: info.strAlcoholic,
        name: info.strDrink,
        image: info.strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(array));
    }
    if (favoriteRecipesStorage !== null
      && favoriteRecipesStorage.length > 0 && verifica === true) {
      const teste = favoriteRecipesStorage.filter((p) => p.id !== pathname2);
      localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
    }
  };

  const criaDoneRecipe = (info1, pathname1) => {
    let doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesStorage === null || doneRecipesStorage === undefined) {
      doneRecipesStorage = [];
    }
    let receba;
    let final;
    if (pathname1 === 'drinks') {
      receba = {
        id: info1.idDrink,
        type: 'drink',
        nationality: '',
        category: info1.strCategory,
        alcoholicOrNot: info1.strAlcoholic,
        name: info1.strDrink,
        image: info1.strDrinkThumb,
        doneDate: new Date(),
        tags: [],
      };
    }
    if (pathname1 === 'meals') {
      receba = {
        id: info1.idMeal,
        nationality: info1.strArea,
        name: info1.strMeal,
        category: info1.strCategory,
        image: info1.strMealThumb,
        tags: info1.strTags !== null ? info1.strTags.split(',') : [],
        alcoholicOrNot: '',
        type: 'meal',
        doneDate: new Date(),
      };
    }
    if (doneRecipesStorage.length === 1
        && Object.keys(doneRecipesStorage[0]).length === 0) {
      final = [receba];
    } else {
      final = [...doneRecipesStorage, receba];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(final));
  };

  return {
    criaInProgress,
    criaMeal,
    criaDrink,
    criaVazia,
    criaListaIng2,
    setFavoriteStorage,
    criaDoneRecipe,
  };
}
