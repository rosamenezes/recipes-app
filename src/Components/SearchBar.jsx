import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DrinksContext } from '../context/DrinksContext';
import { MealsContext } from '../context/MealsContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [filterRadio, setFilterRadio] = useState();
  const { makeFetch, erro, handleError } = useContext(MealsContext);
  const { makeFetchDrinks, erroDrinks, handleErrorDrinks } = useContext(DrinksContext);

  const history = useHistory();
  const alertLetter = 'Your search must have only 1 (one) character';

  const handleClick = () => {
    if (history.location.pathname === '/meals') {
      makeFetch(searchInput, filterRadio);
      if (erro === 'erro') {
        global.alert(alertLetter);
      }
    }
    if (history.location.pathname === '/drinks') {
      makeFetchDrinks(searchInput, filterRadio);
      if (erroDrinks === 'erro') {
        global.alert(alertLetter);
      }
    }
  };

  useEffect(() => {
    if (erro === 'erro') {
      global.alert(alertLetter);
    }
    handleError();
  }, [erro]);

  useEffect(() => {
    if (erroDrinks === 'erro') {
      global.alert(alertLetter);
    }
    handleErrorDrinks();
  }, [erroDrinks]);

  return (
    <div>

      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (e) => setSearchInput(e.target.value) }
          value={ searchInput }
        />
      </label>

      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="busca"
          onChange={ (e) => setFilterRadio(e.target.value) }
          value="Ingredient"
        />
        Ingredient
      </label>

      <label htmlFor="name-search-radio">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="busca"
          onChange={ (e) => setFilterRadio(e.target.value) }
          value="Name"
        />
        Name
      </label>

      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="busca"
          onChange={ (e) => setFilterRadio(e.target.value) }
          value="First letter"
        />
        First letter
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar

      </button>
    </div>
  );
}

export default SearchBar;
