import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Header from './Components/Header';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/meals" exact component={ Meals } />
        <Route path="/drinks" exact component={ Drinks } />
        <Route path="/meals/:id-da-receita" exact component={ Meals } />
        <Route path="/drinks/:id-da-receita" exact component={ Drinks } />
        <Route path="/meals/:id-da-receita/in-progress" exact component={ Meals } />
        <Route path="/drinks/:id-da-receita/in-progress" exact component={ Drinks } />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/donerecipes" exact component={ DoneRecipes } />
        <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
