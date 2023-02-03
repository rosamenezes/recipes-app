import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';

const setLocalStorage = (mockName, mockStorage) => {
  window.localStorage.setItem(mockName, JSON.stringify(mockStorage));
};
const url1 = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';
const optional11 = 'Optional alcohol';
const ordinary11 = 'Ordinary Drink';
const url22 = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';
const path1 = '/favorite-recipes';
it('Verifica se é renderizado na tela Corba em favoriteRecipes', async () => {
  setLocalStorage('favoriteRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: url1,
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    },
    {
      alcoholicOrNot: optional11,
      category: ordinary11,
      id: '15997',
      image: url22,
      name: 'GG',
      nationality: '',
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(path1);
    expect(history.location.pathname).toBe(path1);
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

it('Verifica clipboard em favoriteRecipes', async () => {
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
  setLocalStorage('favoriteRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: url1,
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    },
    {
      alcoholicOrNot: optional11,
      category: ordinary11,
      id: '15997',
      image: url22,
      name: 'GG',
      nationality: '',
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(path1);
    expect(history.location.pathname).toBe(path1);
  });
  expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  expect(navigator.clipboard.readText()).toBe('http://localhost:3000/meals/52977');
});

it('Verifica botao de desfavoritar', async () => {
  setLocalStorage('favoriteRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      id: '52977',
      image: url1,
      name: 'Corba',
      nationality: 'Turkish',
      type: 'meal',
    },
    {
      alcoholicOrNot: optional11,
      category: ordinary11,
      id: '15997',
      image: url22,
      name: 'GG',
      nationality: '',
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push(path1);
    expect(history.location.pathname).toBe(path1);
  });
  expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
});
