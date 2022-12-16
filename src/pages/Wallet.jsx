import React, { Component } from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './walletAndHeader.css';

class Wallet extends Component {
  render() {
    return (
      <div>
        <div id="walletAndHeader">
          <Header />
          <WalletForm />
        </div>
        <Table />
      </div>
    );
  }
}

export default Wallet;
