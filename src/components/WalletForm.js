import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCurrenciesThunk } from '../redux/actions';

export class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      paymentMethod: 'Dinheiro',
      categoryTag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestCurrenciesThunk());
  }

  handlePaymentMethod = ({ target }) => {
    const { value } = target;
    const paymentMethod = value;

    this.setState({
      paymentMethod,
    });
  };

  handleCategoryTag = ({ target }) => {
    const { value } = target;
    const categoryTag = value;

    this.setState({
      categoryTag,
    });
  };

  render() {
    const { currencies } = this.props;
    return (
      <section>
        <label htmlFor="value-input">
          Valor:
          <input
            id="value-input"
            type="number"
            data-testid="value-input"
          />
        </label>

        <select data-testid="currency-input">
          { currencies.map((currency) => (
            <option key={ currency }>
              {' '}
              {currency}
              {' '}
            </option>))}
        </select>

        <select
          data-testid="method-input"
          onChange={ this.handlePaymentMethod }
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

        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            type="text"
            data-testid="description-input"
          />
        </label>

        <select
          data-testid="tag-input"
          onChange={ this.handleCategoryTag }
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
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  map: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
