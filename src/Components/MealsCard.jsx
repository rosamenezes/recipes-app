import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesContext';

function MealsCard(receitas) {
  const { receitas: { strMeal, strMealThumb, idMeal }, index } = receitas;
  const { pegaMealId } = useContext(RecipesContext);

  const handleClick = () => {
    pegaMealId(idMeal);
  };

  return (
    <Link
      to={ `/meals/${idMeal}` }
      onClick={ handleClick }
    >
      <div data-testid={ `${index}-recipe-card` }>
        <h1 data-testid={ `${index}-card-name` }>{ strMeal }</h1>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
          height="100"
          width="100"
        />
      </div>
    </Link>
  );
}

export default MealsCard;
