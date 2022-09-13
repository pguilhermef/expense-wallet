import { waitFor } from '@testing-library/react';
import App from '../App';
import { getCurrencies } from '../redux/actions';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Test de actions', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  test('Testa se ao entrar na página de carteira, a Api de moedas é chamada', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(history.location.pathname).toBe('/carteira');

    store.dispatch(getCurrencies());

    await waitFor(() => {
      const state = store.getState();

      expect(fetch).toHaveBeenCalled();
      expect(state.wallet.currencies.length).toBeGreaterThan(0);
    });
  });
});
