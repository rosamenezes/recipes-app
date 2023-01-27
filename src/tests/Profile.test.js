import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter/renderWithRouter';
import Profile from '../pages/Profile';

it('Verifica se possui um email renderizado na tela', () => {
  renderWithRouter(<Profile />);

  const renderEmail = screen.getByTestId('profile-email');
  expect(renderEmail).toBeInTheDocument();
});

it('Verifica se possui o um botão Done Recipes', () => {
  const { history } = renderWithRouter(<Profile />);

  const renderButtonDone = screen.getByRole('button', {
    name: /Done Recipes/i,
  });
  expect(renderButtonDone).toBeInTheDocument();

  userEvent.click(renderButtonDone);

  expect(history.location.pathname).toBe('/done-recipes');
});

it('Verifica se possui o um botão Favorite Recipes', () => {
  const { history } = renderWithRouter(<Profile />);

  const renderButtonFavorite = screen.getByRole('button', {
    name: /Favorite Recipes/i,
  });
  expect(renderButtonFavorite).toBeInTheDocument();

  userEvent.click(renderButtonFavorite);

  expect(history.location.pathname).toBe('/favorite-recipes');
});

it('Verifica se possui o um botão Logout', () => {
  const { history } = renderWithRouter(<Profile />);

  const renderButtonLogout = screen.getByRole('button', {
    name: /Logout/i,
  });
  expect(renderButtonLogout).toBeInTheDocument();

  userEvent.click(renderButtonLogout);

  expect(history.location.pathname).toBe('/');
});

it('Verifica se possui um título Profile', () => {
  renderWithRouter(<Profile />);

  const renderTittle = screen.getByText(/Profile/i);
  expect(renderTittle).toBeInTheDocument();
});
