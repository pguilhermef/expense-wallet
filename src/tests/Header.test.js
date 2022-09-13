import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testa elementos do Header', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';

  test('Testa se os elementos são mostrados no Header', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    const correctEmail = 'alguem@algumacoisa.com';
    const correctPassword = 'alguemai';

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(loginBtn);

    const welcomeTitle = screen.getByRole('heading', { name: /trybewallet/i });
    const totalExpenses = screen.getByTestId('total-field');
    const currencyOfWallet = screen.getByTestId('header-currency-field');

    await waitFor(() => {
      const emailFromLogin = screen.getByText(/alguem@algumacoisa.com/i);
      expect(emailFromLogin).toBeInTheDocument();
    });

    expect(welcomeTitle).toBeInTheDocument();
    expect(totalExpenses).toBeInTheDocument();
    expect(currencyOfWallet).toBeInTheDocument();

    expect(totalExpenses.innerHTML).toBe('0.00');
    expect(currencyOfWallet.innerHTML).toBe('BRL');
  });
});
