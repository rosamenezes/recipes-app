import React from 'react';

function DrinksCard(receitas) {
  const { receitas: { strDrink, strDrinkThumb }, index } = receitas;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
    </div>
  );
}

export default DrinksCard;
