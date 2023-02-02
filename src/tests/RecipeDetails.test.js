import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import InitialRecipeMealMock from './mocks/mocksMeals/InitialRecipeMealMock.json';
import InitialRecipeDrinkMock from './mocks/mocksMeals/InitialRecipeDrinkMock.json';
import corbaMock from './mocks/mocksMeals/corbaMock.json';
import ggMock from './mocks/mocksMeals/ggMock.json';

describe('Testa a pagina de Recipes Details', () => {
  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth e verifica se os botoes de filtros são aplicados', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(InitialRecipeMealMock)
        .mockResolvedValueOnce(corbaMock)
        .mockResolvedValueOnce(InitialRecipeDrinkMock)
        .mockResolvedValueOnce(corbaMock),
    });
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    await waitFor(() => {
      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('0-recipe-card'));
    await waitFor(() => {
      expect(screen.getByText('Sea Salt / Pinch')).toBeInTheDocument();
    });

    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toHaveTextContent('Corba');

    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toHaveTextContent('Side');

    const recipeImg = await screen.findByTestId('recipe-photo');
    expect(recipeImg.src).toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');

    const instructionsText = await screen.findByTestId('instructions');
    expect(instructionsText).toHaveTextContent('Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside. Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later In a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes. Add the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells. Immediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil. After it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked. After the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary. Serve with crushed-up crackers, torn up bread, or something else to add some extra thickness. You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness. Makes great leftovers, stays good in the fridge for about a week.');

    const ig1 = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ig1).toHaveTextContent('Lentils / 1 cup');

    const ig2 = await screen.findByTestId('1-ingredient-name-and-measure');
    expect(ig2).toHaveTextContent('Onion / 1 large');

    const ig3 = await screen.findByTestId('2-ingredient-name-and-measure');
    expect(ig3).toHaveTextContent('Carrots / 1 large');

    const ig4 = await screen.findByTestId('3-ingredient-name-and-measure');
    expect(ig4).toHaveTextContent('Tomato Puree / 1 tbs');

    const ig5 = await screen.findByTestId('4-ingredient-name-and-measure');
    expect(ig5).toHaveTextContent('Cumin / 2 tsp');

    const ig6 = await screen.findByTestId('5-ingredient-name-and-measure');
    expect(ig6).toHaveTextContent('Paprika / 1 tsp');

    const ig7 = await screen.findByTestId('6-ingredient-name-and-measure');
    expect(ig7).toHaveTextContent('Mint / 1/2 tsp');

    const ig8 = await screen.findByTestId('7-ingredient-name-and-measure');
    expect(ig8).toHaveTextContent('Thyme / 1/2 tsp');

    const ig9 = await screen.findByTestId('8-ingredient-name-and-measure');
    expect(ig9).toHaveTextContent('Black Pepper / 1/4 tsp');

    const ig10 = await screen.findByTestId('9-ingredient-name-and-measure');
    expect(ig10).toHaveTextContent('Red Pepper Flakes / 1/4 tsp');

    const ig11 = await screen.findByTestId('10-ingredient-name-and-measure');
    expect(ig11).toHaveTextContent('Vegetable Stock / 4 cups');

    const ig12 = await screen.findByTestId('11-ingredient-name-and-measure');
    expect(ig12).toHaveTextContent('Water / 1 cup');

    const ig13 = await screen.findByTestId('12-ingredient-name-and-measure');
    expect(ig13).toHaveTextContent('Sea Salt / Pinch');

    const recipeVideo = await screen.findByTestId('video');
    expect(recipeVideo.src).toBe('https://www.youtube.com/embed/VVnZd8A84z4');

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn.src).toBe('http://localhost/whiteHeartIcon.svg');

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const drinkImg1 = await screen.findByTestId('0-card-img');
    expect(drinkImg1.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');

    const drinkTitle1 = await screen.findByTestId('0-recommendation-title');
    expect(drinkTitle1).toHaveTextContent('GG');

    const drinkTitle2 = await screen.findByTestId('1-recommendation-title');
    expect(drinkTitle2).toHaveTextContent('A1');

    const drinkImg2 = await screen.findByTestId('1-card-img');
    expect(drinkImg2.src).toBe('https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg');

    const favoriteBtn1 = await screen.findByTestId('favorite-btn');
    act(() => {
      userEvent.click(favoriteBtn1);
    });
    expect(favoriteBtn1.src).toBe('http://localhost/blackHeartIcon.svg');

    act(() => {
      userEvent.click(favoriteBtn1);
    });

    expect(favoriteBtn1.src).toBe('http://localhost/whiteHeartIcon.svg');
  });

  it('Verifica se redireciona para o GG', async () => {
    global.fetch = jest.fn((url) => Promise.resolve({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return InitialRecipeMealMock;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return InitialRecipeDrinkMock;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
          return corbaMock;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
          return ggMock;
        }
      },
    }));
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals/52977');
    });
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toHaveTextContent('Start Recipe');
    const drinkTitle1 = await screen.findByTestId('0-recommendation-title');
    userEvent.click(drinkTitle1);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997');

    act(() => {
      history.push('/meals/52977');
    });
    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });

  it('Verifica se muda o texto do botão recipe', async () => {
    global.fetch = jest.fn((url) => Promise.resolve({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return InitialRecipeMealMock;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
          return InitialRecipeDrinkMock;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
          return corbaMock;
        }
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
          return ggMock;
        }
      },
    }));
    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals/52977');
    });
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    expect(startRecipeBtn).toHaveTextContent('Start Recipe');
    await waitFor(() => {
      userEvent.click(startRecipeBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52977');
    });

    act(() => {
      history.push('/meals/52977');
    });
    expect(startRecipeBtn).toHaveTextContent('Continue Recipe');
  });
});
