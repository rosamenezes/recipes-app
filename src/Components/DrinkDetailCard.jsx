import React, { useEffect, useState } from 'react';

function DrinkDetailCard(info) {
  const [infoReceita, setInfoReceita] = useState(null);
  const [ingrediens, setIngridients] = useState(null);
  const { receita } = info;
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
      ];
      ing = ing.filter((p) => p !== 'null / null');
      setIngridients(ing);
    }
  }, []);
  return (
    <div>
      {infoReceita !== null && (
        <div>
          <h1 data-testid="recipe-title">{ infoReceita.strDrink }</h1>
          <img
            src={ infoReceita.strDrinkThumb }
            alt={ infoReceita.strDrink }
            width="300"
            height="400"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-category">{ infoReceita.strAlcoholic }</h1>
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
        </div>
      )}
    </div>
  );
}

export default DrinkDetailCard;
