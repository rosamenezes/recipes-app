import React, { useContext } from 'react';
import Header from '../Components/Header';
import MealsCard from '../Components/MealsCard';
import { MealsContext } from '../context/MealsContext';

function Meals() {
  const { dataResults } = useContext(MealsContext);
  const number12 = 12;
  return (
    <div>
      <Header />
      {dataResults.meals !== null
        && dataResults.meals.map((receitas, index) => (
          <MealsCard
            receitas={ receitas }
            index={ index }
            key={ index }
          />
        )).slice(0, number12)}
    </div>
  );
}

export default Meals;
