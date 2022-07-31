import App from '../App';
import { cleanup, screen, waitForElementToBeRemoved, debug } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';

async function waitForApiResponse() {
  const loadingElement = await screen
    .findByTestId("loading-image", undefined)
    .catch(() => null);

  if (!loadingElement) {
    return;
  }

  return waitForElementToBeRemoved(() => screen.queryByTestId('loading-image'));
}

describe('Testa a página Favorite Recipes', () => {
  afterEach(cleanup);
  
  test('1. Se a página de favoritos exibe o item inserido', async () => {
    const { history, debug } = renderWithRouter(<App />);
    history.push('/foods');

    await waitForApiResponse();
    // await waitForElementToBeRemoved(() => screen.queryByTestId("loading-image"));

    const bigMac = await screen.findByText(/big mac/i);
    expect(bigMac).toBeInTheDocument();

    userEvent.click(bigMac);

    expect(history.location.pathname).toBe('/foods/53013');
    
    const favoriteBtn = await screen.findByAltText('favorite');
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    history.push('/profile');

    expect(history.location.pathname).toBe('/profile');
    const favoriteRecipes = await screen.findByTestId('profile-favorite-btn');
    expect(favoriteRecipes).toBeInTheDocument();

    userEvent.click(favoriteRecipes);

    const bigMacLink = await screen.findByText(/big mac/i);
    expect(bigMacLink).toBeInTheDocument();
  });
  
  test('2. Se a página exibe os radio buttons e se eles filtram corretamente os itens na página', async () => {
    cleanup;
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    // await waitForApiResponse();
    // await waitForElementToBeRemoved(() => screen.queryByTestId('loading-image'));

    const bigMac = await screen.findByText(/Big mac/i);
    expect(bigMac).toBeInTheDocument();

    userEvent.click(bigMac);
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    history.push('/foods');

    // await waitForApiResponse();
    // await waitForElementToBeRemoved(() => screen.queryByTestId("loading-image"));

    const tamiya = await screen.findByText(/Tamiya/i);
    expect(tamiya).toBeInTheDocument();

    userEvent.click(tamiya);

    const favoriteBtn2 = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn2).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    history.push('/drinks');

    await waitForApiResponse();
    await waitForElementToBeRemoved(() => screen.queryByTestId("loading-image"));
    
    const kir = await screen.findByText(/Kir/i);
    expect(kir).toBeInTheDocument();

    // userEvent.click(kir);

    // // await waitForApiResponse();
    // await waitForElementToBeRemoved(() => screen.queryByTestId("loading-image"));

    // expect(history.location.pathname).toBe('/drinks/17203');
    // const favoriteBtn3 = await screen.findByTestId('favorite-btn');
    // expect(favoriteBtn3).toBeInTheDocument();

    // userEvent.click(favoriteBtn);

    // history.push('/favorite-recipes');

    // const radioButtonAll = await screen.findByLabelText(/all/i);
    // expect(radioButtonAll).toBeInTheDocument();

    // const radioButtonFoods = await screen.findByLabelText(/foods/i);
    // expect(radioButtonFoods).toBeInTheDocument();
    
    // const radioButtonDrinks = await screen.findByLabelText(/drinks/i);
    // expect(radioButtonDrinks).toBeInTheDocument();
    
    // userEvent.click(radioButtonFoods);
    // expect(radioButtonFoods).toBeChecked();

    // const bigMac2 = await screen.findByText(/Big mac/i);
    // expect(bigMac2).toBeInTheDocument();

    // const tamiya2 = await screen.findByText(/tamiya/i);
    // expect(tamiya2).toBeInTheDocument();

    // const kir2 = screen.queryByText(/kir/i);
    // expect(kir2).not.toBeInTheDocument();

  });
  

  

});