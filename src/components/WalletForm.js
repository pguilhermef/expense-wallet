import React, { Component } from 'react';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      email: {
        isValid: false,
        input: '',
      },
      password: {
        isValid: false,
        input: '',
      },
      submitButtonDisabled: true,
    };
  }

  inputsToState = ({ target }) => {
    const { type, value } = target;

    if (type === 'email') {
      this.setState({
        email: {
          input: { value },
          isValid: this.emailVerificator(value),
        },
      });
    }

    if (type === 'password') {
      this.setState({
        password: {
          input: { value },
          isValid: this.passwordVerificator(value),
        },
      });
    }

    this.buttonVerificator();
  };

  emailVerificator = (email) => {
    const emailInput = email;

    const regexFormatReached = emailInput.toString().match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

    const correctEmailReached = regexFormatReached !== null;
    console.log(correctEmailReached);

    return correctEmailReached; // retorna true ou false
  };

  passwordVerificator = (password) => {
    const CHARACTERS_LENGTH = password.length;
    const MINIMUM_CHARACTERS_LENGTH = 6;

    const correctPasswordReached = CHARACTERS_LENGTH >= MINIMUM_CHARACTERS_LENGTH;

    return correctPasswordReached; // retorna true ou false
  };

  buttonVerificator = () => {
    const { email, password } = this.state;

    const activatedButton = email.isValid && password.isValid;

    this.setState({
      submitButtonDisabled: !activatedButton,
    });
  };

  render() {
    const {
      submitButtonDisabled,
    } = this.state;

    return (
      <form>
        <label htmlFor="email-input">
          {' '}
          E-mail:
          <input
            type="email"
            id="email-input"
            data-testid="email-input"
            onChange={ this.inputsToState }
            required
          />
        </label>

        <label htmlFor="password-input">
          {' '}
          Senha:
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            onChange={ this.inputsToState }
            required
          />
        </label>

        <button
          type="submit"
          disabled={ submitButtonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

export default WalletForm;
