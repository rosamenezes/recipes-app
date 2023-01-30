import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
// import pepperMock from './mocks/mocksMeals/pepperMock.json';
import InitialRecipeMealMock from './mocks/mocksMeals/InitialRecipeMealMock.json';
import InitialRecipeDrinkMock from './mocks/mocksMeals/InitialRecipeDrinkMock.json';
import breakfastMock from './mocks/mocksMeals/breakfastMock.json';
// import fruitMock from './mocks/mocksMeals/fruitMock.json';
// import EggCreamMock from './mocks/mocksMeals/mocksDrinks/EggCreamMock.json';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

// const searchIDicon = 'search-top-btn';
// const searchIDInput = 'search-input';
// const searchIDbutton = 'exec-search-btn';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(InitialRecipeMealMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    });

    const breakfastButton = screen.getByTestId('Breakfast-category-filter');
    const allButton = screen.getByTestId('All-category-filter');
    const corba = screen.getByText('Corba');
    expect(breakfastButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(corba).toBeInTheDocument();
    // userEvent.click(breakfastButton);
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(breakfastMock),
    });

    await waitFor(() => {
      userEvent.click(breakfastButton);
    });
    await waitFor(() => {
      const potatoes = screen.getByText('Breakfast Potatoes');
      // userEvent.click(breakfastButton);
      expect(potatoes).toBeInTheDocument();
    });
    await waitFor(() => {
      userEvent.click(breakfastButton);
    });
    await waitFor(() => {
      userEvent.click(breakfastButton);
    });
    await waitFor(() => {
      userEvent.click(allButton);
    });
  });
});

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(InitialRecipeDrinkMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
    });

    const shakeButton = screen.getByTestId('Shake-category-filter');
    const allButton = screen.getByTestId('All-category-filter');
    expect(allButton).toBeInTheDocument();
    const GG = screen.getByText('GG');
    expect(shakeButton).toBeInTheDocument();
    expect(GG).toBeInTheDocument();
    // userEvent.click(GG);
    // teste
    // jest.clearAllMocks();
    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(breakfastMock),
    // });

    await waitFor(() => {
      userEvent.click(shakeButton);
    });
    await waitFor(() => {
      userEvent.click(shakeButton);
    });
    await waitFor(() => {
      userEvent.click(shakeButton);
    });
    await waitFor(() => {
      userEvent.click(allButton);
    });
  });

  // it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth', async () => {
  //   act(() => {
  //     const { history } = renderWithRouterAndContext(<App />);
  //     history.push('/drinks');
  //   });
  //   expect(global.fetch).toHaveBeenCalled();

  //   await waitFor(() => {
  //     expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
  //   });

  //   const GG = screen.getByText('GG');
  //   expect(GG).toBeInTheDocument();
  //   // userEvent.click(GG);
  // });
});
