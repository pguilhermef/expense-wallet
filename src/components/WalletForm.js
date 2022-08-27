import React, { Component } from 'react';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      submitButtonDisabled: true,
    };
  }

  handleEmailInput = (value) => {
    const EMAIL_INPUT_VALUE = value;
    const CORRECT_EMAIL_FORMACT = /\S+@\S+\.\S+/;

    const regexFormatReached = EMAIL_INPUT_VALUE
      .match(CORRECT_EMAIL_FORMACT);

    const correctEmailInputReached = regexFormatReached !== null;

    return correctEmailInputReached;
  };

  handlePasswordLength = (value) => {
    const CHARACTERS_LENGTH = value.length;
    const MINIMUM_CHARACTERS_LENGTH = 5;

    const minimumCharactersReached = CHARACTERS_LENGTH < MINIMUM_CHARACTERS_LENGTH;

    return !minimumCharactersReached;
  };

  updateStateWithInputs = (target) => {
    const { type, value } = target;
    switch (type) {
    case 'email':
      this.setState({
        email: value,
      });
      break;
    case 'password':
      this.setState({
        password: value,
      });
      break;
    default: console.log('Erro no parâmetro da função');
      break;
    }
  };

  verifyEmailAndPassWord = ({ target }) => {
    this.updateStateWithInputs(target);
    const { email, password } = this.state;
    const correctEmail = this.handleEmailInput(email);
    const correctPassword = this.handlePasswordLength(password);

    const allInputsInCorrectFormat = correctEmail && correctPassword;

    this.setState({
      submitButtonDisabled: !allInputsInCorrectFormat,
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
            onChange={ this.verifyEmailAndPassWord }
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
            onChange={ this.verifyEmailAndPassWord }
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
