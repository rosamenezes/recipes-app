import React, { useContext } from 'react';
import DrinksCard from '../Components/DrinksCard';
import Header from '../Components/Header';
import { DrinksContext } from '../context/DrinksContext';

function Drinks() {
  const { dataResultsDrinks } = useContext(DrinksContext);
  const number12 = 12;
  return (
    <div>
      <Header />
      {dataResultsDrinks.drinks !== null
      && dataResultsDrinks.drinks.map((receitas, index) => (
        <DrinksCard
          receitas={ receitas }
          index={ index }
          key={ index }
        />
      )).slice(0, number12)}
    </div>
  );
}

export default Drinks;
