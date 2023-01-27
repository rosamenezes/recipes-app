import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import MealsProvider from '../../context/MealsContext';
import DrinksProvider from '../../context/DrinksContext';

const renderWithRouterAndContext = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router
        history={ history }
      >
        <MealsProvider>
          <DrinksProvider>
            {component}
          </DrinksProvider>
        </MealsProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
