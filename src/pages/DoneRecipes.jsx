import React from 'react';
import '../index.css';
import DoneRecipesCard from '../Components/DoneRecipesCard';
import Header from '../Components/Header';

function DoneRecipes() {
  const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const divOfNoRecepe = <div>Não há receitas completas</div>;
  return (
    <div>
      <Header />
      { doneRecipesStorage.length === 0 ? divOfNoRecepe : (
        <DoneRecipesCard />
      ) }
    </div>
  );
}
export default DoneRecipes;
