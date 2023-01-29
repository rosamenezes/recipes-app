import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import MealsProvider from '../../context/MealsContext';
import DrinksProvider from '../../context/DrinksContext';
import RecipesProvider from '../../context/RecipesContext';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router
        history={ history }
      >
        <MealsProvider>
          <DrinksProvider>
            <RecipesProvider>
              {component}
            </RecipesProvider>
          </DrinksProvider>
        </MealsProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
