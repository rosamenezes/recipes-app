import React from 'react';
import { Link } from 'react-router-dom';

function DrinksCard(receitas) {
  const { receitas: { strDrink, strDrinkThumb, idDrink }, index } = receitas;

  return (
    <Link
      to={ `/drinks/${idDrink}` }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{ strDrink }</h1>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
      </div>
    </Link>
  );
}

export default DrinksCard;
