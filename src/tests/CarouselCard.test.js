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

const recipec = '0-recipe-card';

it('Verifica carrosel', async () => {
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
  const { history } = renderWithRouterAndContext(<App />);
  act(() => {
    history.push('/meals');
  });
  await waitFor(() => {
    expect(screen.getByTestId(recipec)).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId(recipec));
  await waitFor(() => {
    expect(screen.getByText('GG')).toBeInTheDocument();
  });
  expect(screen.getByText('ABC').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
  userEvent.click(screen.getByTestId('next-btn1'));
  expect(screen.getByText('GG').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
  userEvent.click(screen.getByTestId('next-btn2'));
  expect(screen.getByText('ABC').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
  userEvent.click(screen.getByTestId('next-btn3'));
  expect(screen.getByText('747').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
});

it('Verifica carrosel meal', async () => {
  global.fetch = jest.fn((url) => Promise.resolve({
    json: async () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
        return InitialRecipeMealMock;
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
        return InitialRecipeDrinkMock;
      }
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
        return ggMock;
      }
    },
  }));
  const { history } = renderWithRouterAndContext(<App />);
  act(() => {
    history.push('/drinks');
  });
  await waitFor(() => {
    expect(screen.getByTestId(recipec)).toBeInTheDocument();
  });
  userEvent.click(screen.getByTestId(recipec));
  await waitFor(() => {
    expect(screen.getByText('Optional alcohol')).toBeInTheDocument();
  });
  expect(screen.getByText('Sushi').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
  userEvent.click(screen.getByTestId('next-btn1'));
  expect(screen.getByText('Corba').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
  userEvent.click(screen.getByTestId('next-btn2'));
  expect(screen.getByText('Kumpir').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
  userEvent.click(screen.getByTestId('next-btn3'));
  expect(screen.getByText('Tamiya').parentNode.parentNode.parentNode).toHaveAttribute('class', 'esconde');
});
