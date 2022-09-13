import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

const emailInput = screen.getByTestId('email-input');
const passwordInput = screen.getByTestId('password-input');
const loginButton = screen.getByRole('button', { name: /Entrar/i });

const correctEmail = 'batmanRaivoso@trybe.com';
const correctPassword = 'avingancanuncaeplena';

describe('Testa a página de Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  test('Verifica se a página de Login está na url "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const correctURL = '/';
    expect(history.location.pathname).toBe(correctURL);
  });

  test('Testa se existem um input de email e um de senha', () => {
    renderWithRouterAndRedux(<App />);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Testa se ao digitar email e senha corretos, o botão é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    expect(emailInput.type).toBe('email');
    expect(passwordInput.type).toBe('password');

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    expect(loginButton).not.toBeDisabled();
  });

  test('Testa se o botão `Entrar` redireciona para rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    userEvent.type(emailInput, correctEmail);
    userEvent.type(passwordInput, correctPassword);
    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
