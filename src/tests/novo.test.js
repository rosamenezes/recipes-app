import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import ggMock from './mocks/mocksMeals/ggMock.json';
import InitialRecipeMealMock from './mocks/mocksMeals/InitialRecipeMealMock.json';
import InitialRecipeDrinkMock from './mocks/mocksMeals/InitialRecipeDrinkMock.json';

const recipeCard0 = '0-recipe-card';
const urlInitialMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlInitialDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const setLocalStorage = (mockName, mockStorage) => {
  window.localStorage.setItem(mockName, JSON.stringify(mockStorage));
};

it('testa risca', async () => {
  setLocalStorage('inProgressRecipes', { drinks: { 15997: ['Galliano / 2 1/2 shots $$$checked', 'Ginger ale / null$$$checked', 'Ice / null$$$checked'] }, meals: {} });
  let clipboardData = '';
  const mockClipboard = {
    writeText: jest.fn(
      (data) => { clipboardData = data; },
    ),
    readText: jest.fn(
      () => clipboardData,
    ),
  };
  global.navigator.clipboard = mockClipboard;
  global.fetch = jest.fn((url) => Promise.resolve({
    json: async () => {
      if (url === urlInitialMeal) {
        return InitialRecipeMealMock;
      }
      if (url === urlInitialDrink) {
        return InitialRecipeDrinkMock;
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
        return ggMock;
      }
    },
  }));
  const { history } = renderWithRouterAndContext(<App />);
  act(() => {
    // const { history } = renderWithRouterAndContext(<App />);
    history.push('/drinks');
  });
  await waitFor(() => {
    expect(screen.getByTestId(recipeCard0)).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('0-card-img'));
  await waitFor(() => {
    expect(screen.getByText('Optional alcohol')).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('start-recipe-btn'));
  await waitFor(() => {
    expect(screen.getByText('Pour the Galliano liqueur over ice. Fill the remainder of the glass with ginger ale and thats all there is to it. You now have a your very own GG.')).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('0-ingredient-step'));
  userEvent.click(screen.getByTestId('1-ingredient-step'));
  userEvent.click(screen.getByTestId('2-ingredient-step'));
  userEvent.click(screen.getByTestId('favorite-btn'));
  userEvent.click(screen.getByTestId('share-btn'));
  //   userEvent.click(screen.getByTestId('6-ingredient-step'));
  //   userEvent.click(screen.getByTestId('7-ingredient-step'));
  //   userEvent.click(screen.getByTestId('8-ingredient-step'));
  //   userEvent.click(screen.getByTestId('9-ingredient-step'));
  //   userEvent.click(screen.getByTestId('10-ingredient-step'));
  //   userEvent.click(screen.getByTestId('11-ingredient-step'));
  //   userEvent.click(screen.getByTestId('12-ingredient-step'));
  expect(navigator.clipboard.readText()).toBe('http://localhost:3000/drinks/15997');
  expect(screen.getByTestId('finish-recipe-btn')).toBeEnabled();
  userEvent.click(screen.getByTestId('finish-recipe-btn'));
//   await waitFor(() => {
//     expect(screen.getByText('Galliano / 2 1/2 shots')).toHaveAttribute('class', 'risca');
//   });
});
