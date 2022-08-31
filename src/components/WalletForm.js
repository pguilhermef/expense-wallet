// import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      paymentMethod: 'Dinheiro',
      categoryTag: 'Alimentação',
    };
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
          <option>
            OLHA O README REQ 3
          </option>
          <option>
            BRL
          </option>
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

export default WalletForm;

// WalletForm.propTypes = {

// };
