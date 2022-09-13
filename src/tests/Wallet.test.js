import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testa a página de Wallet', () => {
  test('Testa se ao renderizar a url está correta', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  const VALUE_TEST_ID = 'value-input';
  const DESCRIPTION_TEST_ID = 'description-input';
  const TOTALFIELD_TEST_ID = 'total-field';
  const CURRENCYFILD_TEST_ID = 'header-currency-field';

  test('Verifica se os inputs (Valor, Descrição) e os campos Total Field e Currency existem', () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValor = screen.getByTestId(VALUE_TEST_ID);
    const inputDescription = screen.getByTestId(DESCRIPTION_TEST_ID);
    const totalField = screen.getByTestId(TOTALFIELD_TEST_ID);
    const currencyField = screen.getByTestId(CURRENCYFILD_TEST_ID);

    expect(inputValor).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
    expect(currencyField).toBeInTheDocument();
  });
});
