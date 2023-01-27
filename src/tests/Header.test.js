import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';

const testIDbutton = 'profile-top-btn';
const testIDpage = 'page-title';

it('Verificando o Header na pagina DoneRecipes', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/done-recipes'));

  const perfilButton = screen.getByTestId(testIDbutton);
  expect(perfilButton).toBeInTheDocument();

  const h1Title = screen.getByTestId(testIDpage);
  expect(h1Title).toBeInTheDocument();
});

it('Verificando o Header na pagina DoneRecipes', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/done-recipes'));

  const perfilButton = screen.getByTestId(testIDbutton);
  expect(perfilButton).toBeInTheDocument();

  const h1Title = screen.getByTestId(testIDpage);
  expect(h1Title).toBeInTheDocument();
});

it('Verificando o Header na pagina Drinks', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/drinks'));

  const perfilButton = screen.getByTestId(testIDbutton);
  expect(perfilButton).toBeInTheDocument();

  const h1Title = screen.getByTestId(testIDpage);
  expect(h1Title).toBeInTheDocument();
});

it('Verificando o Header na pagina favorite-recipes', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/favorite-recipes'));

  const perfilButton = screen.getByTestId(testIDbutton);
  expect(perfilButton).toBeInTheDocument();

  const h1Title = screen.getByTestId(testIDpage);
  expect(h1Title).toBeInTheDocument();
});

it('Verificando o Header na pagina profile', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/profile'));

  const perfilButton = screen.getByTestId(testIDbutton);
  expect(perfilButton).toBeInTheDocument();

  const h1Title = screen.getByTestId(testIDpage);
  expect(h1Title).toBeInTheDocument();
});

it('Verificando se ao clicar no botao vai para a pagina profile', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/profile'));

  const perfilButton = screen.getByTestId(testIDbutton);
  userEvent.click(perfilButton);

  expect(history.location.pathname).toBe('/profile');
});

it('Verificando se ao clicar no botao de pesquisa o input e renderizado na tela', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/drinks'));

  const searchlButton = screen.getByTestId('search-top-btn');
  userEvent.click(searchlButton);

  const inputSearch = screen.getByTestId('search-input');

  expect(inputSearch).toBeInTheDocument();
});

it('Verificando se ao clicar no botao de pesquisa o input e renderizado na tela', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push('/meals'));

  const searchlButton = screen.getByTestId('search-top-btn');
  userEvent.click(searchlButton);

  const inputSearch = screen.getByTestId('search-input');

  expect(inputSearch).toBeInTheDocument();
});