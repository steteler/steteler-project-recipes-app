import React from 'react';
import Header from '../components/Header';
import DoneRecipeContainer from '../components/DoneRecipeContainer';
import recipesAppContext from '../context/RecipesAppContext';
import '../css/DoneRecipes.css';

function DoneRecipes() {
  const { done } = React.useContext(recipesAppContext);
  console.log('done', done);
  
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    console.log('done', done);
    setRecipes(done);
  }, [done]);

  const handleRadio = ({ target: { id } }) => {
    if (id === 'foods') {
      const filteredDone = done.filter((doneRecipe) => doneRecipe.type === 'food');
      return setRecipes(filteredDone);
    }
    if (id === 'drinks') {
      const filteredDone = done.filter((doneRecipe) => doneRecipe.type === 'drink');
      return setRecipes(filteredDone);
    }
    return setRecipes(done);
  };
  return (
    <div>
      <Header page="doneRecipes" />
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
            id="foods"
            data-testid="filter-by-food-btn"
            onClick={ handleRadio }
          />
          Foods
        </label>
        <label htmlFor="drinks">
          <input
            name="radioFilter"
            type="radio"
            id="drinks"
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
              <DoneRecipeContainer
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

export default DoneRecipes;
