import React, { useEffect, useState } from 'react';
/* import 'react-responsive-carousel/lib/styles/carousel.min.css'; */
import PropTypes from 'prop-types';
import RecommendationDrinkCard from './RecommendationDrinkCard';
import RecommendationMealCard from './RecommendationMealCard';
import './Carousel.css';

function CarouselCard({ info }) {
  const [infoMeal, setInfoMeal] = useState(null);
  const [infoDrink, setInfoDrink] = useState(null);
  const [state, setState] = useState('1');
  const number6 = 6;
  useEffect(() => {
    const makeFetchMealDetail = async () => {
    //   setIsLoading(true);
      const results = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await results.json();
      setInfoMeal(data.meals.slice(0, number6));
    //   setIsLoading(false);
    };

    const makeFetchDrinkDetail = async () => {
    //   setIsLoading(true);
      const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await results.json();
      setInfoDrink(data.drinks.slice(0, number6));
    //   setIsLoading(false);
    };

    if (info.split('/')[1] === 'drinks') {
      makeFetchMealDetail();
    }
    if (info.split('/')[1] === 'meals') {
      makeFetchDrinkDetail();
    }
  }, []);

  return (
    <div>
      {info.split('/')[1] === 'meals'
        ? (
          <div>
            {infoDrink !== null
            && (
              <div>
                <div className={ state !== '1' ? 'esconde' : undefined }>
                  <RecommendationDrinkCard receitas={ infoDrink[0] } index="0" />
                  <RecommendationDrinkCard receitas={ infoDrink[1] } index="1" />
                  <button
                    type="button"
                    onClick={ () => setState('2') }
                  >
                    {'>'}
                  </button>
                </div>
                <div className={ state !== '2' ? 'esconde' : undefined }>
                  <RecommendationDrinkCard receitas={ infoDrink[2] } index="2" />
                  <RecommendationDrinkCard receitas={ infoDrink[3] } index="3" />
                  <button
                    type="button"
                    onClick={ () => setState('3') }
                  >
                    {'>'}
                  </button>
                </div>
                <div className={ state !== '3' ? 'esconde' : undefined }>
                  <RecommendationDrinkCard receitas={ infoDrink[4] } index="4" />
                  <RecommendationDrinkCard receitas={ infoDrink[5] } index="5" />
                  <button
                    type="button"
                    onClick={ () => setState('1') }
                  >
                    {'>'}
                  </button>
                </div>
              </div>)}
          </div>
        )
        : (
          <div>
            {infoMeal !== null
            && (
              <div>
                <div className={ state !== '1' ? 'esconde' : undefined }>
                  <RecommendationMealCard receitas={ infoMeal[0] } index="0" />
                  <RecommendationMealCard receitas={ infoMeal[1] } index="1" />
                  <button
                    type="button"
                    onClick={ () => setState('2') }
                  >
                    {'>'}
                  </button>
                </div>
                <div className={ state !== '2' ? 'esconde' : undefined }>
                  <RecommendationMealCard receitas={ infoMeal[2] } index="2" />
                  <RecommendationMealCard receitas={ infoMeal[3] } index="3" />
                  <button
                    type="button"
                    onClick={ () => setState('3') }
                  >
                    {'>'}
                  </button>
                </div>
                <div className={ state !== '3' && 'esconde' }>
                  <RecommendationMealCard receitas={ infoMeal[4] } index="4" />
                  <RecommendationMealCard receitas={ infoMeal[5] } index="5" />
                  <button
                    type="button"
                    onClick={ () => setState('1') }
                  >
                    {'>'}
                  </button>
                </div>
              </div>)}
          </div>
        )}
    </div>
  );
}

CarouselCard.propTypes = {
  info: PropTypes.string,
}.isRequired;

export default CarouselCard;
