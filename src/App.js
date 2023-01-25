import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/meals" exact component={ Meals } />
      </Switch>
    </div>
  );
}

export default App;
