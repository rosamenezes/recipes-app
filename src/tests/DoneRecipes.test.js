import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';
import userEvent from '@testing-library/user-event';

const setLocalStorage = (mockName, mockStorage) => {
  window.localStorage.setItem(mockName, JSON.stringify(mockStorage));
};

it('Verifica se é renderizado na tela Corba e DoneRecipes', async () => {
  setLocalStorage('doneRecipes', [{
    alcoholicOrNot: '',
    category: 'Side',
    doneDate: '2023-02-02T22:06:41.268Z',
    id: '52977',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    name: 'Corba',
    nationality: 'Turkish',
    tags: ['Soup'],
    type: 'meal',
  }]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/done-recipes');
  });
  expect(screen.getByText('Corba')).toBeInTheDocument();
});

it('Verifica filtros de DoneRecipes', async () => {
  setLocalStorage('doneRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '2023-02-02T22:06:41.268Z',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      tags: ['Soup'],
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      doneDate: '2023-02-03T05:41:14.769Z',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      tags: [],
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/done-recipes');
  });
  expect(screen.getByText('Corba')).toBeInTheDocument();
  expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('filter-by-meal-btn'));
  expect(screen.getByText('Corba')).toBeInTheDocument();

  expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-drink-btn'));
  expect(screen.getByText('GG')).toBeInTheDocument();

  expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
  userEvent.click(screen.getByTestId('filter-by-all-btn'));
  expect(screen.getByText('GG')).toBeInTheDocument();
  expect(screen.getByText('Corba')).toBeInTheDocument();
});

it('Verifica share button meals de DoneRecipes', async () => {
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
  setLocalStorage('doneRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '2023-02-02T22:06:41.268Z',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      tags: ['Soup'],
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      doneDate: '2023-02-03T05:41:14.769Z',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      tags: [],
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/done-recipes');
  });
  expect(screen.getByText('Corba')).toBeInTheDocument();
  expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
  expect(navigator.clipboard.readText()).toBe('http://localhost:3000/meals/52977');
});

it('Verifica share button drinks de DoneRecipes', async () => {
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
  setLocalStorage('doneRecipes', [
    {
      alcoholicOrNot: '',
      category: 'Side',
      doneDate: '2023-02-02T22:06:41.268Z',
      id: '52977',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      name: 'Corba',
      nationality: 'Turkish',
      tags: ['Soup'],
      type: 'meal',
    },
    {
      alcoholicOrNot: 'Optional alcohol',
      category: 'Ordinary Drink',
      doneDate: '2023-02-03T05:41:14.769Z',
      id: '15997',
      image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
      name: 'GG',
      nationality: '',
      tags: [],
      type: 'drink',
    },
  ]);
  act(() => {
    const { history } = renderWithRouterAndContext(<App />);
    history.push('/done-recipes');
  });
  expect(screen.getByText('Corba')).toBeInTheDocument();
  expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();

  userEvent.click(screen.getByTestId('1-horizontal-share-btn'));
  expect(navigator.clipboard.readText()).toBe('http://localhost:3000/drinks/15997');
});
