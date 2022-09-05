import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import Walletform from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Walletform />
        <Table />
      </>
    );
  }
}

export default Wallet;
