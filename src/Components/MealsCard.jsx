import React from 'react';

function MealsCard(receitas) {
  const { receitas: { strMeal, strMealThumb }, index } = receitas;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h1 data-testid={ `${index}-card-name` }>{ strMeal }</h1>
      <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
    </div>
  );
}

export default MealsCard;
