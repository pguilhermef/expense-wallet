import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
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
            0
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
