import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MealsProvider from './context/MealsContext';
import DrinksProvider from './context/DrinksContext';
import RecipesProvider from './context/RecipesContext';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <MealsProvider>
        <DrinksProvider>
          <RecipesProvider>
            <App />
          </RecipesProvider>
        </DrinksProvider>
      </MealsProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
