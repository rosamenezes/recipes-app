import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import { RecipesContext } from './context/RecipesContext';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  const { mealId } = useContext(RecipesContext);
  const { drinkId } = useContext(RecipesContext);
  const [id, setId] = useState();

  const history = useHistory();
  const { pathname } = history.location;
  const id1 = pathname.split('/')[2];

  useEffect(() => {
    if (mealId === null && drinkId === null) {
      setId(id1);
    }
    if (mealId !== null) {
      setId(mealId);
    }
    if (drinkId !== null) {
      setId(drinkId);
    }
  }, [pathname, id1, mealId, drinkId]);
  return (
    <div>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/meals" exact component={ Meals } />
        <Route path="/drinks" exact component={ Drinks } />
        <Route path={ `/meals/${id}` } exact component={ RecipeDetails } />
        <Route path={ `/drinks/${id}` } exact component={ RecipeDetails } />
        <Route path={ `/meals/${id}/in-progress` } exact component={ RecipeInProgress } />
        <Route
          path={ `/drinks/${id}/in-progress` }
          exact
          component={ RecipeInProgress }
        />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/done-recipes" exact component={ DoneRecipes } />
        <Route path="/favorite-recipes" exact component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
