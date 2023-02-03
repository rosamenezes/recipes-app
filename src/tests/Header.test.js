import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

const testIDbutton = 'profile-top-btn';
const testIDpage = 'page-title';
const pathDoneRecipes = '/done-recipes';

it('Verificando o Header na pagina DoneRecipes', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push(pathDoneRecipes));

  const perfilButton = screen.getByTestId(testIDbutton);
  expect(perfilButton).toBeInTheDocument();

  const h1Title = screen.getByTestId(testIDpage);
  expect(h1Title).toBeInTheDocument();
});

it('Verificando o Header na pagina DoneRecipes', () => {
  const { history } = renderWithRouter(<App />);

  act(() => history.push(pathDoneRecipes));

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
  const { history } = renderWithRouterAndContext(<App />);

  act(() => history.push('/profile'));

  const perfilButton = screen.getByTestId(testIDbutton);
  userEvent.click(perfilButton);

  const logoutButton = screen.getByTestId('profile-logout-btn');
  expect(logoutButton).toBeInTheDocument();

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

it('Verificando se ao clicar no botao vai para a pagina profile', () => {
  const { history } = renderWithRouterAndContext(<App />);

  act(() => history.push(pathDoneRecipes));

  const perfilButton = screen.getByTestId(testIDbutton);
  // userEvent.click(perfilButton);

  // const logoutButton = screen.getByTestId('profile-logout-btn');
  expect(perfilButton).toBeInTheDocument();

  expect(history.location.pathname).toBe(pathDoneRecipes);

  act(() => history.push('/favorite-recipes'));

  expect(perfilButton).toBeInTheDocument();
  expect(screen.getByText('Favorites')).toBeInTheDocument();
  userEvent.click(screen.getByText('Favorites'));
});

it('favorites button esta no header', () => {
  const { history } = renderWithRouterAndContext(<App />);

  act(() => history.push(pathDoneRecipes));

  expect(screen.getByText('Favorites')).toBeInTheDocument();
  userEvent.click(screen.getByText('Favorites'));
});
