/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import recipesAppContext from '../context/RecipesAppContext';

export default function DoneRecipeContainer({ recipe, index }) {
  const {
    id,
    image,
    name,
    type,
    nationality,
    alcoholicOrNot,
    category,
  } = recipe;

  useEffect(() => {
    console.log('aaaaaaaaaaaaaa');
  }, []);

  const { done, setDone, dateDone } = useContext(recipesAppContext);

  const [isCopied, setIsCopied] = useState(false);

  const handleShare = (location) => {
    navigator.clipboard.writeText(`http://localhost:3000${location}`);
    setIsCopied(true);
  };

  const handleDone = ({ target }) => {
    const newLocalStorageValueDone = (
      done.filter((recipes) => recipes.id !== target.id)
    );
    setDone(newLocalStorageValueDone);
  };

  return (
    <div>
      <h1>Teste</h1>
      <Link to={ type === 'food' ? `/foods/${id}` : `/drinks/${id}` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          className="cardImage"
        />
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'food' ? nationality : alcoholicOrNot}
        {' '}
        -
        {' '}
        {category}
      </p>
      <p data-testid={ `data-testid="${index}-horizontal-done-date` }>
        { dateDone }
      </p>
      <button
        type="button"
        onClick={ () => handleShare(type === 'food' ? `/foods/${id}` : `/drinks/${id}`) }
      >
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share"
        />
      </button>
      <button type="button" onClick={ handleDone }>
        <img
          src={ favoriteIcon }
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="favorite"
          id={ id }
        />
      </button>
      {
        isCopied && <p>Link copied!</p>
      }
    </div>
  );
}

DoneRecipeContainer.propTypes = {
  recipe: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
