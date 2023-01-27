import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const MealsContext = createContext();

function MealsProvider({ children }) {
  const [isLoading, setIsloading] = useState(false);
  const [dataResults, setDataResults] = useState({ meals: [] });
  const [erro, setErro] = useState('');
  const [apiError, setApiError] = useState('');

  const makeFetch = async (inputSearch, inputRadio) => {
    try {
      setIsloading(true);
      switch (inputRadio) {
      case 'Ingredient': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        const data = await response.json();
        return setDataResults(data);
      }
      case 'Name': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
        const data = await response.json();
        return setDataResults(data);
      }
      case 'First letter': {
        if (inputSearch.length > 1) {
          setErro('erro');
        }
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        const data = await response.json();
        return setDataResults(data);
      }
      default:
        // break;
      }
    } catch (e) {
      setApiError(e);
    } finally {
      setIsloading(false);
    }
  };

  const handleError = () => {
    setErro('');
  };

  const context = useMemo(() => ({
    makeFetch,
    isLoading,
    dataResults,
    erro,
    setErro,
    handleError,
    apiError,
  }), [erro, dataResults]);

  return (
    <MealsContext.Provider value={ context }>
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default MealsProvider;
