import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>{email}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default (mapStateToProps)(Header);
