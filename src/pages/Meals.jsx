import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import MealsCard from '../Components/MealsCard';
import Recipes from '../Components/Recipes';
import { MealsContext } from '../context/MealsContext';
import Footer from '../Components/Footer';

function Meals() {
  const { dataResults } = useContext(MealsContext);
  const [recipes, setRecipes] = useState(null);
  const number12 = 12;
  useEffect(() => {
    if (dataResults.meals !== null && dataResults.meals.length !== 0) {
      setRecipes(dataResults);
    } else {
      setRecipes(null);
    }
  }, [dataResults]);
  return (
    <div>
      <Header />
      {recipes !== null
        ? recipes.meals.map((receitas, index) => (
          <MealsCard
            receitas={ receitas }
            index={ index }
            key={ index }
          />
        )).slice(0, number12) : <Recipes />}
      <Footer />
    </div>
  );
}

export default Meals;
