import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import Table from '../components/Table';

const REMOVE_BTN_TESTID = 'delete-btn';
const EDIT_BTN_TESTID = 'edit-btn';
const VALUE_INPUT_TESTID = 'value-input';
const CURRENCY_INPUT_TESTID = 'currency-input';
const METHOD_INPUT_TESTID = 'method-input';
const TAG_INPUT_TESTID = 'tag-input';
const DESCRIPTION_INPUT_TESTID = 'description-input';
const ALIMENTACAO = 'Alimentação';

// precisei de muita ajuda nesse requisito

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

describe('Testa o componente Table', () => {
  it('o componente é renderizado na rota correta', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('Testa se o componente é rendenizado', () => {
    renderWithRouterAndRedux(<Table />);
    const tableInfos = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    tableInfos.forEach((element) => expect(screen
      .getByText(element)).toBeInTheDocument());
  });

  it('Testa se as despesas salvas são mostradas na tela', () => {
    renderWithRouterAndRedux(<Table />, { initialState: { wallet: WALLET_DATA } });

    const descriptionOfExpense = screen.getByText(/info/);
    expect(descriptionOfExpense).toBeInTheDocument();
  });

  it('Testa se existe um botão para remover as despesas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<Table />, { initialState: { wallet: WALLET_DATA } });

    const removeBtn = screen.getByTestId(REMOVE_BTN_TESTID);
    expect(removeBtn).toBeInTheDocument();

    const descriptionOfExpense = screen.getByText(/info/);
    expect(descriptionOfExpense).toBeInTheDocument();

    userEvent.click(removeBtn);
    expect(descriptionOfExpense).not.toBeInTheDocument();
  });

  // Aplicando TDD e também para o nivel de Branch ser superior a 90%
  it('Testa se existe um botão para editar as despesas', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_DATA } });

    const editBtn = screen.getByTestId(EDIT_BTN_TESTID);
    expect(editBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    const valueInput = screen.getByTestId(VALUE_INPUT_TESTID);
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveValue(1);

    const currencyInput = screen.getByTestId(CURRENCY_INPUT_TESTID);
    expect(currencyInput).toBeInTheDocument();
    expect(currencyInput).toHaveValue('USD');

    const methodInput = screen.getByTestId(METHOD_INPUT_TESTID);
    expect(methodInput).toBeInTheDocument();
    expect(methodInput).toHaveValue('Dinheiro');

    const tagInput = screen.getByTestId(TAG_INPUT_TESTID);
    expect(tagInput).toBeInTheDocument();
    expect(tagInput).toHaveValue(ALIMENTACAO);

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_TESTID);
    expect(descriptionInput).toHaveValue('info');
    expect(descriptionInput).toBeInTheDocument();

    const editExpenseBtn = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'teste 2');
    userEvent.click(editExpenseBtn);

    const editedDescription = await screen.findByText(/teste 2/i);
    expect(editedDescription).toBeInTheDocument();
  });
});
