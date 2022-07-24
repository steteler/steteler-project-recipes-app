import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';

export default function Header({ setFilteredRecipe, page }) {
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();

  const titleSearchBar = () => {
    const { location: { pathname } } = history;
    switch (pathname) {
    case '/foods':
      return <h1 data-testid="page-title">Foods</h1>;
    case '/drinks':
      return <h1 data-testid="page-title">Drinks</h1>;
    case '/profile':
      return <h1 data-testid="page-title">Profile</h1>;
    case '/done-recipes':
      return <h1 data-testid="page-title">Done Recipes</h1>;
    case '/favorite-recipes':
      return <h1 data-testid="page-title">Favorite Recipes</h1>;
    default:
      return null;
    }
  };

  return (
    <header>
      { titleSearchBar() }
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ profileIcon }
        >
          {/* <img src={ profileIcon } alt="profile" /> */}
          Profile
        </button>
      </Link>
      {
        page !== 'profile' && page !== 'doneRecipes' && page !== 'favoriteRecipes' && (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ () => setIsVisible((prevState) => !prevState) }
            src={ searchIcon }
          >
            {/* <img src={ searchIcon } alt="search" /> */}
            Open Search
          </button>
        )
      }
      {
        isVisible && (
          <SearchBar
            setFilteredRecipe={ setFilteredRecipe }
          />
        )
      }
      <FilterButtons />
    </header>
  );
}

Header.propTypes = {
  setFilteredRecipe: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};
