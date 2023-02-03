import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import corbaMock from './mocks/mocksMeals/corbaMock.json';
import ggMock from './mocks/mocksMeals/ggMock.json';
import InitialRecipeMealMock from './mocks/mocksMeals/InitialRecipeMealMock.json';
import InitialRecipeDrinkMock from './mocks/mocksMeals/InitialRecipeDrinkMock.json';

const recipeCard0 = '0-recipe-card';
const urlInitialMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlInitialDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const corbMock1 = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';

it('Verifica se possui um email renderizado na tela', async () => {
  global.fetch = jest.fn((url) => Promise.resolve({
    json: async () => {
      if (url === urlInitialMeal) {
        return InitialRecipeMealMock;
      }
      if (url === urlInitialDrink) {
        return InitialRecipeDrinkMock;
      }
      if (url === corbMock1) {
        return corbaMock;
      }
    },
  }));
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/meals');
  });
  await waitFor(() => {
    expect(screen.getByTestId(recipeCard0)).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId(recipeCard0));
  await waitFor(() => {
    expect(screen.getByText('Sea Salt / Pinch')).toBeInTheDocument();
  });
  userEvent.click(screen.getByText('Start Recipe'));
  await waitFor(() => {
    expect(screen.getByText('Carregando')).toBeInTheDocument();
  });
});

// it('testa', async () => {
//   global.fetch = jest.fn((url) => Promise.resolve({
//     json: async () => {
//       if (url === urlInitialMeal) {
//         return InitialRecipeMealMock;
//       }
//       if (url === urlInitialDrink) {
//         return InitialRecipeDrinkMock;
//       }
//       if (url === corbMock1) {
//         return corbaMock;
//       }
//     },
//   }));
//   act(() => {
//     const { history } = renderWithRouterAndContext(<App />);
//     history.push('/meals');
//   });
//   await waitFor(() => {
//     expect(screen.getByTestId(recipeCard0)).toBeInTheDocument();
//   });
//   userEvent.click(screen.getByTestId(recipeCard0));
//   await waitFor(() => {
//     expect(screen.getByText('Sea Salt / Pinch')).toBeInTheDocument();
//   });
//   userEvent.click(screen.getByText('Start Recipe'));
//   await waitFor(() => {
//     expect(screen.getByText('Carregando')).toBeInTheDocument();
//   });
// });

it('testa risca', async () => {
  global.fetch = jest.fn((url) => Promise.resolve({
    json: async () => {
      if (url === urlInitialMeal) {
        return InitialRecipeMealMock;
      }
      if (url === urlInitialDrink) {
        return InitialRecipeDrinkMock;
      }
      if (url === corbMock1) {
        return corbaMock;
      }
    },
  }));
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/meals');
  });
  await waitFor(() => {
    expect(screen.getByTestId(recipeCard0)).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId(recipeCard0));
  await waitFor(() => {
    expect(screen.getByText('Sea Salt / Pinch')).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('start-recipe-btn'));
  await waitFor(() => {
    expect(screen.getByText('Side')).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('0-ingredient-step'));
  userEvent.click(screen.getByTestId('1-ingredient-step'));
  userEvent.click(screen.getByTestId('2-ingredient-step'));
  userEvent.click(screen.getByTestId('3-ingredient-step'));
  userEvent.click(screen.getByTestId('4-ingredient-step'));
  userEvent.click(screen.getByTestId('5-ingredient-step'));
  userEvent.click(screen.getByTestId('6-ingredient-step'));
  userEvent.click(screen.getByTestId('7-ingredient-step'));
  userEvent.click(screen.getByTestId('8-ingredient-step'));
  userEvent.click(screen.getByTestId('9-ingredient-step'));
  userEvent.click(screen.getByTestId('10-ingredient-step'));
  userEvent.click(screen.getByTestId('11-ingredient-step'));
  userEvent.click(screen.getByTestId('12-ingredient-step'));
});

it('testa risca', async () => {
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
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/meals');
  });
  await waitFor(() => {
    expect(screen.getByTestId(recipeCard0)).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId('0-card-img'));
  // await waitFor(() => {
  //   expect(screen.getByText('Sea Salt / Pinch')).toBeInTheDocument();
  // });
  // userEvent.click(screen.getByTestId('start-recipe-btn'));
  // await waitFor(() => {
  //   expect(screen.getByText('Side')).toBeInTheDocument();
  // });
  // userEvent.click(screen.getByTestId('0-ingredient-step'));
  // userEvent.click(screen.getByTestId('1-ingredient-step'));
  // userEvent.click(screen.getByTestId('2-ingredient-step'));
  // userEvent.click(screen.getByTestId('3-ingredient-step'));
  // userEvent.click(screen.getByTestId('4-ingredient-step'));
  // userEvent.click(screen.getByTestId('5-ingredient-step'));
  // userEvent.click(screen.getByTestId('6-ingredient-step'));
  // userEvent.click(screen.getByTestId('7-ingredient-step'));
  // userEvent.click(screen.getByTestId('8-ingredient-step'));
  // userEvent.click(screen.getByTestId('9-ingredient-step'));
  // userEvent.click(screen.getByTestId('10-ingredient-step'));
  // userEvent.click(screen.getByTestId('11-ingredient-step'));
  // userEvent.click(screen.getByTestId('12-ingredient-step'));
});
