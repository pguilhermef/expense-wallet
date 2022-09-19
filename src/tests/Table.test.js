import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import Table from '../components/Table';

const REMOVE_BTN_TESTID = 'delete-btn';

const availableCurrencies = Object.keys(mockData).filter((e) => e !== 'USDT');

const WALLET_DATA = {
  currencies: availableCurrencies,
  expenses: [
    {
      id: 0,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: 'info',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0 };

describe('Testes do componente Table ', () => {
  it('o componente é renderizado na rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('É renderizado', () => {
    renderWithRouterAndRedux(<Table />);
    const tableInfos = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    tableInfos.forEach((element) => expect(screen
      .getByText(element)).toBeInTheDocument());
  });

  it('As despesas salvas são renderizadas na tela', () => {
    renderWithRouterAndRedux(<Table />, { initialState: { wallet: WALLET_DATA } });

    const descriptionOfExpense = screen.getByText(/info/);
    expect(descriptionOfExpense).toBeInTheDocument();
  });

  it('Testa se existe um botão para remover despesas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<Table />, { initialState: { wallet: WALLET_DATA } });

    const removeBtn = screen.getByTestId(REMOVE_BTN_TESTID);
    expect(removeBtn).toBeInTheDocument();

    const descriptionInfo = screen.getByText(/info/);
    expect(descriptionInfo).toBeInTheDocument();

    userEvent.click(removeBtn);
    expect(descriptionInfo).not.toBeInTheDocument();
  });
});
