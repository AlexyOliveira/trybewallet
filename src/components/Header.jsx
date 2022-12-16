import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import './header.css';
import logo from '../images/logo.png';
import coins from '../images/Moedas.png';
import Vector from '../images/Vector.png';

const initialSum = 0;
class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    const sumReturn = expenses.reduce(
      (sum, item) => sum + +item.value * item.exchangeRates[item.currency].ask,
      0,
    );

    return sumReturn.toFixed(2);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="header">
        <img src={ logo } alt="logo" />
        <div id="total">
          <img src={ coins } alt="total" />
          <h4 data-testid="total-field">
            <span className="totalText">Total de despesas:</span>
            <span className="totalReturned">
              {expenses.length === 0
                ? initialSum.toFixed(2)
                : this.sumExpenses()}
            </span>
            <span className="brl" data-testid="header-currency-field">
              BRL
            </span>
          </h4>
        </div>
        <div className="user">
          <img src={ Vector } alt="" />
          <span id="topo" data-testid="email-field">{localStorage.getItem('email')}</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: Proptypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
  expensetosum: globalState.wallet.expensetosum,
});

export default connect(mapStateToProps)(Header);
