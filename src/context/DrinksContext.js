import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const DrinksContext = createContext();

function DrinksProvider({ children }) {
  const [isLoadingDrinks, setIsloadingDrinks] = useState(false);
  const [dataResultsDrinks, setDataResultsDrinks] = useState({ drinks: [] });
  const [erroDrinks, setErroDrinks] = useState('');
  const [apiErrorDrinks, setApiErrorDrinks] = useState('');

  const makeFetchDrinks = async (inputSearch, inputRadio) => {
    try {
      setIsloadingDrinks(true);
      switch (inputRadio) {
      case 'Ingredient': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        const data = await response.json();
        setDataResultsDrinks(data);
      }
        break;
      case 'Name': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
        const data = await response.json();
        setDataResultsDrinks(data);
      }
        break;
      case 'First letter': {
        if (inputSearch.length > 1) {
          setErroDrinks('erro');
        }
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        const data = await response.json();
        setDataResultsDrinks(data);
      }
        break;
      default:
        break;
      }
    } catch (e) {
      setApiErrorDrinks(e);
    } finally {
      setIsloadingDrinks(false);
    }
  };

  const handleErrorDrinks = () => {
    setErroDrinks('');
  };

  const context = useMemo(() => ({
    makeFetchDrinks,
    isLoadingDrinks,
    dataResultsDrinks,
    erroDrinks,
    handleErrorDrinks,
    apiErrorDrinks,
  }), [erroDrinks, dataResultsDrinks]);

  return (
    <DrinksContext.Provider value={ context }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default DrinksProvider;
