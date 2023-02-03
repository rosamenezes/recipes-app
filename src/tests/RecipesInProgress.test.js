import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import corbaMock from './mocks/mocksMeals/corbaMock.json';
import InitialRecipeMealMock from './mocks/mocksMeals/InitialRecipeMealMock.json';
import InitialRecipeDrinkMock from './mocks/mocksMeals/InitialRecipeDrinkMock.json';

it('Verifica se possui um email renderizado na tela', async () => {
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
    },
  }));
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
  userEvent.click(screen.getByText('Start Recipe'));
  await waitFor(() => {
    expect(screen.getByText('Carregando')).toBeInTheDocument();
  });
});

// it('testa', async () => {
//   global.fetch = jest.fn((url) => Promise.resolve({
//     json: async () => {
//       if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
//         return InitialRecipeMealMock;
//       }
//       if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
//         return InitialRecipeDrinkMock;
//       }
//       if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
//         return corbaMock;
//       }
//     },
//   }));
//   act(() => {
//     const { history } = renderWithRouterAndContext(<App />);
//     history.push('/meals');
//   });
//   await waitFor(() => {
//     expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
//   });
//   userEvent.click(screen.getByTestId('0-recipe-card'));
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
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return InitialRecipeMealMock;
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return InitialRecipeDrinkMock;
      }
      if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
        return corbaMock;
      }
    },
  }));
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
