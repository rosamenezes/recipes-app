import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import pepperMock from './mocks/mocksMeals/pepperMock.json';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(pepperMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth', () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'pepper');

    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);

    expect(global.fetch).toHaveBeenCalled();
  });

  it('Verifica se ao clicar no botao buscar com a opcao "first-letter" e o input > 1 e chamado um alert', async () => {
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => {});

    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'test');

    const ingredientRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(ingredientRadio);

    const filterButton = screen.getByTestId('exec-search-btn');
    userEvent.click(filterButton);

    expect(global.alert).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
