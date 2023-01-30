import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MealDetailCard({ receita }) {
  const [infoReceita, setInfoReceita] = useState(null);
  const [ingrediens, setIngridients] = useState(null);
  useEffect(() => {
    if (receita !== undefined) {
      setInfoReceita(receita);
      let ing = [
        `${receita.strIngredient1} / ${receita.strMeasure1}`,
        `${receita.strIngredient2} / ${receita.strMeasure2}`,
        `${receita.strIngredient3} / ${receita.strMeasure3}`,
        `${receita.strIngredient4} / ${receita.strMeasure4}`,
        `${receita.strIngredient5} / ${receita.strMeasure5}`,
        `${receita.strIngredient6} / ${receita.strMeasure6}`,
        `${receita.strIngredient7} / ${receita.strMeasure7}`,
        `${receita.strIngredient8} / ${receita.strMeasure8}`,
        `${receita.strIngredient9} / ${receita.strMeasure9}`,
        `${receita.strIngredient10} / ${receita.strMeasure10}`,
        `${receita.strIngredient11} / ${receita.strMeasure11}`,
        `${receita.strIngredient12} / ${receita.strMeasure12}`,
        `${receita.strIngredient13} / ${receita.strMeasure13}`,
        `${receita.strIngredient14} / ${receita.strMeasure14}`,
        `${receita.strIngredient15} / ${receita.strMeasure15}`,
        `${receita.strIngredient16} / ${receita.strMeasure16}`,
        `${receita.strIngredient17} / ${receita.strMeasure17}`,
        `${receita.strIngredient18} / ${receita.strMeasure18}`,
        `${receita.strIngredient19} / ${receita.strMeasure19}`,
        `${receita.strIngredient20} / ${receita.strMeasure20}`,
      ];
      ing = ing.filter((p) => p !== ' /  ');
      setIngridients(ing);
    }
  }, []);
  return (
    <div>
      {infoReceita !== null && (
        <div>
          <h1 data-testid="recipe-title">{ infoReceita.strMeal }</h1>
          <img
            src={ infoReceita.strMealThumb }
            alt={ infoReceita.strMeal }
            width="300"
            height="400"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-category">{ infoReceita.strCategory }</h1>
          <ul>
            { ingrediens.map((p, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { p }
              </li>)) }
          </ul>
          <p data-testid="instructions">{ infoReceita.strInstructions }</p>
          <iframe
            width="560"
            height="315"
            src={ infoReceita.strYoutube.replace('watch?v=', 'embed/') }
            title="YouTube video player"
            data-testid="video"
            frameBorder="0"
            allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share"
          />
        </div>
      )}

    </div>
  );
}

MealDetailCard.propTypes = {
  receita: PropTypes.string,
}.isRequired;

export default MealDetailCard;
