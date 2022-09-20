import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';

const VALUE_INPUT_ID = 'value-input';
const CURRENCY_INPUT_ID = 'currency-input';
const METHOD_INPUT_ID = 'method-input';
const TAG_INPUT_ID = 'tag-input';
const DESCRIPTION_INPUT_ID = 'description-input';
const ALIMENTACAO = 'Alimentação';

const availableCurrencies = Object.keys(mockData).filter((e) => e !== 'USDT');

const WALLET_DATA = {
  currencies: availableCurrencies,
  expenses: [
    {
      id: 0,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      description: 'Um Dólar',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0 };

const ZERO_STATE = {
  currencies: availableCurrencies,
  expenses: [
    {
      id: 0,
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      description: '',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0 };

describe('Testes do component WalletForm.js', () => {
  it('o componente WalletForm.js é renderizado no endereço correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_ID);
    expect(descriptionInput).toBeInTheDocument();
  });

  it('O formulário possui todos os campos requeridos, e se é possível alterar eles e salvar as informações como uma despesa.', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: WALLET_DATA } });

    const valueInput = screen.getByTestId(VALUE_INPUT_ID);
    const currencyInput = screen.getByTestId(CURRENCY_INPUT_ID);
    const methodInput = screen.getByTestId(METHOD_INPUT_ID);
    const tagInput = screen.getByTestId(TAG_INPUT_ID);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_ID);
    const saveBtn = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '1');

    expect(currencyInput).toBeInTheDocument();
    userEvent.selectOptions(currencyInput, 'BTC');

    expect(methodInput).toBeInTheDocument();
    userEvent.selectOptions(methodInput, 'Dinheiro');

    expect(tagInput).toBeInTheDocument();
    userEvent.selectOptions(tagInput, ALIMENTACAO);

    expect(descriptionInput).toBeInTheDocument();
    userEvent.type(descriptionInput, 'teste');

    expect(saveBtn).toBeInTheDocument();

    userEvent.click(saveBtn);

    expect(valueInput).toHaveTextContent('');
    expect(currencyInput).toHaveTextContent('USD');
    expect(methodInput).toHaveTextContent('Dinheiro');
    expect(tagInput).toHaveTextContent(ALIMENTACAO);
    expect(descriptionInput).toHaveTextContent('');

    const newDescription = await screen.findByText('teste');
    expect(newDescription).toBeInTheDocument();
  });

  it('Se editor é igual a true, o estado global é atualizado com as informações corretas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: { wallet: ZERO_STATE } });

    const valueInput = screen.getByTestId(VALUE_INPUT_ID);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_ID);
    const saveBtn = screen.getByRole('button', { name: /Adicionar despesas/i });
    const editBtn = screen.getByRole('button', { name: /Editar/i });
    const confirmEditBtn = screen.getByRole('button', { name: /Editar despesa/i });

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'teste');
    userEvent.click(saveBtn);

    userEvent.click(editBtn);

    userEvent.type(valueInput, '5');
    userEvent.click(confirmEditBtn);

    const state = {
      currencies: availableCurrencies,
      expenses: [
        {
          id: 0,
          value: '15',
          currency: 'USD',
          method: 'Dinheiro',
          tag: ALIMENTACAO,
          description: 'teste',
          exchangeRates: mockData,
        }],
      editor: false,
      idToEdit: 0 };

    const ZERO_STATE = get

    expect(initialState).toBe(state);
  });
});
