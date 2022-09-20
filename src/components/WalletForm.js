import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getExpense, requestCurrenciesThunk, updateExpense } from '../redux/actions';
import getApiCurrencies from '../services/Get_Currencies';

const ALIMENTACAO = 'Alimentação';

export class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      description: '',
      tag: ALIMENTACAO,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCurrenciesThunk());
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (prevProps.editor !== editor) this.enableEditor();
  }

  enableEditor = () => {
    const { editor, idToEdit, expenses } = this.props;

    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      tag: ALIMENTACAO,
      method: 'Dinheiro',
    });

    if (editor) {
      const editExpense = expenses.find((item) => item.id === Number(idToEdit));
      this.setState({ ...editExpense });
    }
  };

  handleInputChange = ({ target }) => {
    const { value, id } = target;
    const inputCategory = id;

    this.setState({
      [inputCategory]: value,
    });
  };

  sendExpenseToGlobalState = async () => {
    const { dispatch, expenses, editor, idToEdit } = this.props;
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

    if (editor) {
      expense.id = Number(idToEdit);
      dispatch(updateExpense(expense));
    } else {
      dispatch(getExpense(expense));
    }

    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      tag: ALIMENTACAO,
      method: 'Dinheiro',
    });
  };

  render() {
    const { currencies, editor } = this.props;
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

        <label htmlFor="currency">
          Moeda:
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
        </label>

        <label htmlFor="method">
          Método de pagamento
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
        </label>

        <label
          htmlFor="description"
        >
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="description-input"
            onChange={ this.handleInputChange }
            value={ description }
          />
        </label>

        <label htmlFor="tag">
          Tag:
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
        </label>

        <button
          data-testid="add-input-button"
          type="submit"
          onClick={ this.sendExpenseToGlobalState }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesas'}
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
