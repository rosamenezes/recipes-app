import React, { useContext, useEffect, useState } from 'react';
import DrinksCard from '../Components/DrinksCard';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';
import { DrinksContext } from '../context/DrinksContext';

function Drinks() {
  const { dataResultsDrinks } = useContext(DrinksContext);
  const [recipes, setRecipes] = useState(null);
  const number12 = 12;
  useEffect(() => {
    if (dataResultsDrinks.drinks !== null && dataResultsDrinks.drinks.length !== 0) {
      setRecipes(dataResultsDrinks);
    } else {
      setRecipes(null);
    }
  }, [dataResultsDrinks]);
  return (
    <div>
      <Header />
      {recipes !== null
        ? recipes.drinks.map((receitas, index) => (
          <DrinksCard
            receitas={ receitas }
            index={ index }
            key={ index }
          />
        )).slice(0, number12) : <Recipes />}
    </div>
  );
}

export default Drinks;
