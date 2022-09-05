import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  handleSumOfExpenses = (expenses) => {
    const valuesConverted = expenses
      .map((expense) => {
        const currencyVariation = Object.values(expense.exchangeRates)
          .find((currency) => currency.code === expense.currency).ask;

        return expense.value * currencyVariation;
      });

    return valuesConverted
      .reduce((acc, curr) => acc + curr, 0);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <section>
        <div>
          <span>Olá, </span>
          <span data-testid="email-field">{ email }</span>
          <span> Despesa Total: </span>
          <span data-testid="total-field">{ this.handleSumOfExpenses(expenses) }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Header);
