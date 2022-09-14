import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const STATE = {
  user: {
    email: 'trybe@wallet.com',
    senha: '123456',
  },
  wallet: {
    editor: false,
    idToEdit: 0,
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        description: 'Descrição da despesa',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '12',
        currency: 'CAD',
        method: 'Cartão de Crédito',
        tag: 'Alimentação',
        description: 'Lanche',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '43',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Lazer',
        description: 'God of War',
        exchangeRates: mockData,
      },
    ],
  },
};

const VALUE_TEST_ID = 'value-input';
const DESCRIPTION_TEST_ID = 'description-input';
const BUTTON_ADD_TEST_ID = 'Adicionar despesa';

afterEach(() => jest.clearAllMocks());

describe('Testa a página Wallet', () => {
  test('Testa se ao adicionar uma despesa os inputs são limpos', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: STATE });

    const inputValue = screen.getByTestId(VALUE_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_TEST_ID);
    const buttonAddExpense = screen.getByRole('button', { name: BUTTON_ADD_TEST_ID });

    userEvent.type(inputValue, '264');
    userEvent.type(inputDescription, 'testandoUm2Tres');
    userEvent.click(buttonAddExpense);

    expect(inputValue.innerHTML).toBe('');
    expect(inputDescription.innerHTML).toBe('');
  });

  test('Verifica se ao adicionar a despesa ela existe no state', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState: STATE });

    const inputValue = screen.getByTestId(VALUE_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_TEST_ID);
    const buttonAddExpense = screen.getByRole('button', { name: BUTTON_ADD_TEST_ID });

    userEvent.type(inputValue, '20');
    userEvent.type(inputDescription, 'Descrição da despesa');
    userEvent.click(buttonAddExpense);

    const expense = [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        description: 'Descrição da despesa',
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => expect(store.getState().wallet.expenses[0]).toEqual(expense[0]));
  });
});
