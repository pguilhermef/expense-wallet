import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserEmail } from '../redux/actions';
import store from '../redux/store';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      submitButtonDisabled: true,
    };
  }

  handleInputs = ({ target }) => {
    const { type, value } = target;

    if (type === 'email') {
      this.setState({
        email: value,
      }, () => this.inputsAuthenticator());
    }

    if (type === 'password') {
      this.setState({
        password: value,
      }, () => this.inputsAuthenticator());
    }
  };

  inputsAuthenticator = () => {
    const { email, password } = this.state;

    const PASSWORD_CHARACTERS_LENGTH = password.length;
    const MINIMUM_CHARACTERS_LENGTH = 6;

    const emailIsValid = email.toString().match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    const passwordIsValid = PASSWORD_CHARACTERS_LENGTH >= MINIMUM_CHARACTERS_LENGTH;

    const activatedButton = emailIsValid && passwordIsValid;

    this.setState({
      submitButtonDisabled: !activatedButton,
    });
  };

  loginButton = (e) => {
    const { email } = this.state;
    const {
      history,
    } = this.props;
    e.preventDefault();
    store.dispatch(getUserEmail(email));
    history.push('/carteira');
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
            onChange={ this.handleInputs }
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
            onChange={ this.handleInputs }
            required
          />
        </label>

        <button
          type="submit"
          disabled={ submitButtonDisabled }
          onClick={ this.loginButton }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
