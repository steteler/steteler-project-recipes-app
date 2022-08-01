import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import FavoriteRecipeContainer from '../components/FavoriteRecipesContainer';
import recipesAppContext from '../context/RecipesAppContext';
import '../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const { favorites } = useContext(recipesAppContext);

  const [recipes, setRecipes] = useState(favorites);

  const handleRadio = ({ target: { id } }) => {
    if (id === 'all') {
      setRecipes(favorites);
      return;
    }

    setRecipes(favorites.filter((favorite) => favorite.type === id));
  };

  return (
    <div>
      <Header page="favoriteRecipes" setFilteredRecipe={ () => {} } />
      <div>
        <label htmlFor="all">
          <input
            name="radioFilter"
            defaultChecked
            type="radio"
            id="all"
            data-testid="filter-by-all-btn"
            onClick={ handleRadio }
          />
          All
        </label>
        <label htmlFor="foods">
          <input
            name="radioFilter"
            type="radio"
            id="food"
            data-testid="filter-by-food-btn"
            onClick={ handleRadio }
          />
          Foods
        </label>
        <label htmlFor="drinks">
          <input
            name="radioFilter"
            type="radio"
            id="drink"
            data-testid="filter-by-drink-btn"
            onClick={ handleRadio }
          />
          Drinks
        </label>
      </div>
      <div>
        {
          recipes.length && (
            recipes.map((recipe, index) => (
              <FavoriteRecipeContainer
                key={ recipe.id }
                recipe={ recipe }
                index={ index }
              />
            ))
          )
        }
      </div>
    </div>
  );
}

export default FavoriteRecipes;
