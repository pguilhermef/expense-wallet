import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  handleSumOfExpenses = (expenses) => {
    const sumOfExpense = expenses
      .reduce((acc, curr) => {
        const result = Number(acc) + Number(curr.value);

        return parseFloat(result).toFixed(2);
      }, 0);

    return sumOfExpense;
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <section>
        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>
        <div>
          <p data-testid="header-currency-field">
            BRL
          </p>
          <p data-testid="total-field">
            {
              this.handleSumOfExpenses(expenses)
            }
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
