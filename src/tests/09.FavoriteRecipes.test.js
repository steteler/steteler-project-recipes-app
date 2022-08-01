import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
// import { wait } from '@testing-library/user-event/dist/utils';

const mockFavoriteRecipes = [
  {
    id: "52771",
    type: "food",
    nationality: "Italian",
    category: "Vegetarian",
    alcoholicOrNot: "",
    name: "Spicy Arrabiata Penne",
    image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
  },
  {
    id: "178319",
    type: "drink",
    nationality: "",
    category: "Cocktail",
    alcoholicOrNot: "Alcoholic",
    name: "Aquamarine",
    image:
      "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
  },
];

describe("Testa a página Favorite Recipes", () => {
  beforeEach(() => {
    localStorage.setItem(
      "favoriteRecipes",
      JSON.stringify(mockFavoriteRecipes)
    );
  });

  afterEach(() => {
    localStorage.removeItem("favoriteRecipes");
  });

  test("1. Se a página de favoritos exibe o item inserido", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/favorite-recipes");

    const foodLink = await screen.findByText(/Spicy Arrabiata Penne/i);
    expect(foodLink).toBeInTheDocument();

    const drinkLink = await screen.findByText(/Aquamarine/i);
    expect(drinkLink).toBeInTheDocument();
  });
  
  test("2. Se a página exibe os radio buttons e se eles filtram corretamente os itens na página", async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/favorite-recipes");

    await waitFor(() => {
      const radioButtonFoods = screen.queryByTestId("filter-by-food-btn");
      expect(radioButtonFoods).toBeInTheDocument();

      userEvent.click(radioButtonFoods);

      expect(radioButtonFoods).toBeChecked();
      expect(screen.queryByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
      expect(screen.queryByText(/Aquamarine/i)).not.toBeInTheDocument();

      const radioButtonDrinks = screen.queryByTestId("filter-by-drink-btn");
      expect(radioButtonDrinks).toBeInTheDocument();

      userEvent.click(radioButtonDrinks);

      expect(radioButtonDrinks).toBeChecked();
      expect(screen.queryByText(/Spicy Arrabiata Penne/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Aquamarine/i)).toBeInTheDocument();

      const radioButtonAll = screen.queryByTestId("filter-by-all-btn");
      expect(radioButtonAll).toBeInTheDocument();

      userEvent.click(radioButtonAll);

      expect(radioButtonAll).toBeChecked();
      expect(screen.queryByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
      expect(screen.queryByText(/Aquamarine/i)).toBeInTheDocument();
    });
  });

});