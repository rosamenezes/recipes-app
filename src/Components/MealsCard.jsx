import React from 'react';
import { Link } from 'react-router-dom';

function MealsCard(receitas) {
  const { receitas: { strMeal, strMealThumb, idMeal }, index } = receitas;

  return (
    <Link
      to={ `/meals/${idMeal}` }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{ strMeal }</h1>
        <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
      </div>
    </Link>
  );
}

export default MealsCard;
