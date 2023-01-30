import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Login from '../pages/Login';
// import renderWithRouter from './renderWithRouter/renderWithRouter';
import App from '../App';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

const emailTest = 'tryber@teste.com';
const passwordTest = '1234567';
const email = 'email-input';
const password = 'password-input';

it('Verifica se os input de email e senha estão sendo renderizado na tela', () => {
  renderWithRouterAndContext(<App />);

  const renderEmail = screen.getByTestId(email);
  const renderPassword = screen.getByTestId(password);
  expect(renderEmail).toBeInTheDocument();
  expect(renderPassword).toBeInTheDocument();
});

it('Verifica se o botão está sendo renderizado na tela quando desabilitado', () => {
  renderWithRouterAndContext(<App />);

  const renderButton = screen.getByRole('button', {
    name: /entrar/i,
  });
  expect(renderButton).toBeInTheDocument();
  expect(renderButton).toBeDisabled();
});

it('verifica se o botão é habilitado', () => {
  renderWithRouterAndContext(<App />);

  const renderEmail = screen.getByTestId(email);
  const renderPassword = screen.getByTestId(password);
  const renderButton = screen.getByRole('button', {
    name: /entrar/i,
  });
  expect(renderButton).toBeInTheDocument();
  expect(renderButton).toBeDisabled();
  userEvent.type(renderEmail, emailTest);
  userEvent.type(renderPassword, passwordTest);
  expect(renderButton).not.toBeDisabled();
});

it('verifica se é redirecionado para /meals quando clica em entrar', () => {
  const { history } = renderWithRouterAndContext(<App />);
  const renderEmail = screen.getByTestId(email);
  const renderPassword = screen.getByTestId(password);
  const renderButton = screen.getByRole('button', {
    name: /entrar/i,
  });

  expect(renderButton).toBeInTheDocument();
  expect(renderButton).toBeDisabled();
  userEvent.type(renderEmail, emailTest);
  userEvent.type(renderPassword, passwordTest);
  expect(renderButton).not.toBeDisabled();

  userEvent.click(renderButton);
  const { pathname } = history.location;
  expect(pathname).toBe('/meals');
});
