import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import userEvent from '@testing-library/user-event';

const setLocalStorage = (mockName, mockStorage) => {
  window.localStorage.setItem(mockName, JSON.stringify(mockStorage));
};

it('Verifica se é renderizado na tela Corba em favoriteRecipes', async () => {
  setLocalStorage('favoriteRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/favorite-recipes');
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  const corba = screen.getByText('Corba');
  expect(corba).toBeInTheDocument();
  expect(screen.getByText('GG')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('filter-by-drink-btn'));
  expect(screen.getByText('GG')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-meal-btn'));
  expect(corba).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-all-btn'));
  expect(corba).toBeInTheDocument();
});

// it('Verifica se é renderizado na tela Corba e DoneRecipes', async () => {
//   // setLocalStorage('favoriteRecipes', undefined);
//   window.localStorage.clear();
//   act(() => {
//     const { history } = renderWithRouterAndContext(<App />);
//     history.push('/favorite-recipes');
//     expect(history.location.pathname).toBe('/favorite-recipes');
//   });
// });
