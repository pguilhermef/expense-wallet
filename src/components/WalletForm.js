import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpense, requestCurrenciesThunk } from '../redux/actions';

export class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valueOfDespense: 0,
      currencyOfDespense: 'USD',
      paymentMethod: 'Dinheiro',
      descriptionOfDespense: '',
      categoryTag: 'Alimentação',
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

  sendExpenseToGlobalState = () => {
    const {
      dispatch,
      expenses,
    } = this.props;
    const {
      valueOfDespense,
      currencyOfDespense,
      paymentMethod,
      descriptionOfDespense,
      categoryTag,
    } = this.state;

    const expense = {
      id: expenses.length,
      valueOfDespense,
      currencyOfDespense,
      paymentMethod,
      descriptionOfDespense,
      categoryTag,
    };

    dispatch(getExpense(expense));
  };

  render() {
    const { currencies } = this.props;
    return (
      <section>
        <label htmlFor="valueOfDespense">
          Valor:
          <input
            id="valueOfDespense"
            type="number"
            data-testid="value-input"
            onChange={ this.handleInputChange }
          />
        </label>

        <select
          id="currencyOfDespense"
          data-testid="currency-input"
          onChange={ this.handleInputChange }
        >
          { currencies.map((currency) => (
            <option key={ currency }>
              {' '}
              {currency}
              {' '}
            </option>))}
        </select>

        <select
          data-testid="method-input"
          id="paymentMethod"
          onChange={ this.handleInputChange }
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
          htmlFor="descriptionOfDespense"
          onChange={ this.handleInputChange }
        >
          Descrição
          <input
            id="descriptionOfDespense"
            type="text"
            data-testid="description-input"
          />
        </label>

        <select
          id="categoryTag"
          data-testid="tag-input"
          onChange={ this.handleInputChange }
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
  currencies: PropTypes.arrayOf(String).isRequired,
  map: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    valueOfDespense: PropTypes.number.isRequired,
    currencyOfDespense: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    descriptionOfDespense: PropTypes.string.isRequired,
    categoryTag: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
  }).isRequired,
};
