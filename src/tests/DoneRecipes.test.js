import React from 'react';
import { act, screen } from 'react-dom/test-utils';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';
import App from '../App';

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
