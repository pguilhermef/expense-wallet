import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpense, requestCurrenciesThunk } from '../redux/actions';
import getApiCurrencies from '../services/Get_Currencies';

export class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCurrenciesThunk());
  }

  handleInputChange = ({ target }) => {
    const { value, id } = target;
    const inputCategory = id;

    this.setState({
      [inputCategory]: value,
    });
  };

  sendExpenseToGlobalState = async () => {
    const { dispatch, expenses } = this.props;
    const {
      value,
      currency,
      method,
      description,
      tag,
    } = this.state;

    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await getApiCurrencies(),
    };

    dispatch(getExpense(expense));

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <section>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            data-testid="value-input"
            onChange={ this.handleInputChange }
            value={ value }
          />
        </label>

        <select
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleInputChange }
          value={ currency }
        >
          { currencies.map((currencyCode) => (
            <option key={ currencyCode }>
              {' '}
              {currencyCode}
              {' '}
            </option>))}
        </select>

        <select
          data-testid="method-input"
          id="method"
          onChange={ this.handleInputChange }
          value={ method }
        >
          <option>
            Dinheiro
          </option>
          <option>
            Cartão de crédito
          </option>
          <option>
            Cartão de débito
          </option>
        </select>

        <label
          htmlFor="description"
        >
          Descrição
          <input
            id="description"
            type="text"
            data-testid="description-input"
            onChange={ this.handleInputChange }
            value={ description }
          />
        </label>

        <select
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleInputChange }
          value={ tag }
        >
          <option>
            Alimentação
          </option>
          <option>
            Lazer
          </option>
          <option>
            Trabalho
          </option>
          <option>
            Transporte
          </option>
          <option>
            Saúde
          </option>
        </select>

        <button type="submit" onClick={ this.sendExpenseToGlobalState }>
          Adicionar despesa
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
