import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import InitialRecipeMealMock from './mocks/mocksMeals/InitialRecipeMealMock.json';
import InitialRecipeDrinkMock from './mocks/mocksMeals/InitialRecipeDrinkMock.json';
import breakfastMock from './mocks/mocksMeals/breakfastMock.json';
import beefMock from './mocks/mocksMeals/beefMock.json';
import chickenMock from './mocks/mocksMeals/chickenMock.json';
import dessertMock from './mocks/mocksMeals/dessertMock.json';
import ordinaryMock from './mocks/mocksDrinks/ordinaryMock.json';
import renderWithRouterAndContext from './renderWithRouter/renderWithRouterAndContext';

const allCategory = 'All-category-filter';

describe('Testa o componente recipes na pagina "Meals"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(InitialRecipeMealMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  // const allCategory = allCategory;

  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth e verifica se os botoes de filtros são aplicados', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('Breakfast-category-filter')).toBeInTheDocument();
    });

    const breakfastButton = screen.getByTestId('Breakfast-category-filter');
    const allButton = screen.getByTestId(allCategory);
    const corba = screen.getByText('Corba');
    expect(breakfastButton).toBeInTheDocument();
    expect(allButton).toBeInTheDocument();
    expect(corba).toBeInTheDocument();

    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(breakfastMock),
    });

    await waitFor(() => {
      userEvent.click(breakfastButton);
    });
    await waitFor(() => {
      const potatoes = screen.getByText('Breakfast Potatoes');
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

  it('Verifica se o filtro "Beef" e aplicado na pagina e renderizado', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });

    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    });

    const beefButton = screen.getByTestId('Beef-category-filter');
    expect(beefButton).toBeInTheDocument();

    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMock),
    });

    userEvent.click(beefButton);
    await waitFor(() => {
      const beef = screen.getByText('Beef and Mustard Pie');
      expect(beef).toBeInTheDocument();
    });
  });

  it('Verifica se o filtro "Chicken" e aplicado na pagina e renderizado', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    const chicken1 = 'Chicken-category-filter';
    await waitFor(() => {
      expect(screen.getByTestId(chicken1)).toBeInTheDocument();
    });

    const chickenButton = screen.getByTestId(chicken1);
    expect(chickenButton).toBeInTheDocument();

    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenMock),
    });

    userEvent.click(chickenButton);
    await waitFor(() => {
      const chicken = screen.getByRole('heading', {
        name: 'Ayam Percik',
      });
      expect(chicken).toBeInTheDocument();
    });
  });

  it('Verifica se o filtro "Dessert" e aplicado na pagina e renderizado', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    const dessert1 = 'Dessert-category-filter';
    await waitFor(() => {
      expect(screen.getByTestId(dessert1)).toBeInTheDocument();
    });

    const dessertButton = screen.getByTestId(dessert1);
    expect(dessertButton).toBeInTheDocument();

    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(dessertMock),
    });

    userEvent.click(dessertButton);

    await waitFor(() => {
      const dessert = screen.getByRole('heading', { name: 'Apam balik' });
      expect(dessert).toBeInTheDocument();
    });
  });
});

describe('Testa o componente recipes na pagina "Drinks"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(InitialRecipeDrinkMock),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se ao clicar no botao buscar o funcao makeFech realiza o fecth e verifica se os botoes de filtros são aplicados', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });
    expect(global.fetch).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByTestId('Shake-category-filter')).toBeInTheDocument();
    });

    const shakeButton = screen.getByTestId('Shake-category-filter');
    const allButton = screen.getByTestId(allCategory);
    expect(allButton).toBeInTheDocument();
    const GG = screen.getByText('GG');
    expect(shakeButton).toBeInTheDocument();
    expect(GG).toBeInTheDocument();

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

  it('Verifica se o filtro "Ordinary Drinksw" e aplicado na pagina e renderizado', async () => {
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    });

    const ordinaryButton = screen.getByTestId('Ordinary Drink-category-filter');
    expect(ordinaryButton).toBeInTheDocument();

    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryMock),
    });

    userEvent.click(ordinaryButton);

    await waitFor(() => {
      const ordinaryDrink = screen.getByRole('heading', { name: '3-Mile Long Island Iced Tea' });
      expect(ordinaryDrink).toBeInTheDocument();
    });
  });
});

describe('recipe component', () => {
  const goat = 'Goat-category-filter';
  it('testa drink card', async () => {
    global.fetch = jest.fn((url) => Promise.resolve({
      json: async () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
          return InitialRecipeMealMock;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=beef') {
          return InitialRecipeMealMock;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=goat') {
          return InitialRecipeMealMock;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert') {
          return InitialRecipeMealMock;
        }
        if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken') {
          return InitialRecipeMealMock;
        }
      },
    }));
    act(() => {
      const { history } = renderWithRouterAndContext(<App />);
      history.push('/meals');
    });
    await waitFor(() => {
      expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    });
    // userEvent.click(screen.getByTestId('Breakfast-category-filter'));
    userEvent.click(screen.getByTestId('Chicken-category-filter'));
    userEvent.click(screen.getByTestId('Dessert-category-filter'));
    userEvent.click(screen.getByTestId(goat));
    userEvent.click(screen.getByTestId(goat));
    userEvent.click(screen.getByTestId(goat));
    userEvent.click(screen.getByTestId(allCategory));
    // await waitFor(() => {
    //   expect(screen.getByTestId('0-card-name')).toBeInTheDocument();
    // });
  });
});
