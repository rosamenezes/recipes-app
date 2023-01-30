import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';

function RecommendationDrinkCard(receitas) {
  const { receitas: { strDrink, strDrinkThumb, idDrink }, index } = receitas;
  const { pegaDrinkId } = useContext(RecipesContext);

  const handleClick = () => {
    pegaDrinkId(idDrink);
  };

  return (
    <Link
      to={ `/drinks/${idDrink}` }
      onClick={ handleClick }
    >
      <div data-testid={ `${index}-recommendation-card` }>
        <h1
          data-testid={ `${index}-recommendation-title` }
        >
          { strDrink }
        </h1>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
          height="200"
          // width="10"
        />
      </div>
    </Link>
  );
}

export default RecommendationDrinkCard;
