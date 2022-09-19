import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const sumOfExpenses = expenses
      .map((expense) => expense.value * Object.values(expense.exchangeRates)
        .find((currency) => currency.code === expense.currency).ask)
      .reduce((acc, curr) => acc + curr, 0);
    return (
      <section>
        <div>
          <div>
            <span>Olá, </span>
            <span data-testid="email-field">{ email }</span>
          </div>
          <div>
            <span> Despesa Total: </span>
            <span data-testid="total-field">{ sumOfExpenses.toFixed(2) }</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
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
