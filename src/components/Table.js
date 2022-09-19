import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  currencyName = (exchangeRates, expenseCurrency) => {
    const currencies = Object.values(exchangeRates);
    const currencyName = currencies
      .find((currency) => currency.code === expenseCurrency).name;

    return currencyName;
  };

  deleteButton = ({ target }) => {
    const { id } = target;
    const { expenses, dispatch } = this.props;
    console.log(expenses);
    const filterExpenses = expenses.filter((item) => item.id !== Number(id));
    dispatch(deleteExpense(filterExpenses));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense, index) => (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>
                {this.currencyName(expense.exchangeRates, expense.currency)}
              </td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {parseFloat((expense
                  .exchangeRates[expense.currency].ask) * expense
                  .value).toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ expense.id }
                  onClick={ this.deleteButton }
                >
                  Excluir
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.wallet,
});

// const mapDispatchToProps = (dispatch) => ({
//   deleteTableExpense: (expense) => dispatch(deleteExpense(expense)),
// });

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Table);
