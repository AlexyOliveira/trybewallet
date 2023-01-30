import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, saveEdited, saveForm } from '../redux/actions';
import getFullCurrencyApi from '../services/FullCurrencyAPI';
import './walletForm.css';

const aliment = 'Alimentação';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: aliment,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    const { id, value, description, currency, method, tag } = this.state;
    if (value.length === 0 || description.length === 0) {
      window.alert('Por favor digite um valor e uma descrição!')
    } 
    else {
      event.preventDefault();
    const currencyAPI = await getFullCurrencyApi();
    const { dispatch } = this.props;
    dispatch(
      saveForm({
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currencyAPI,
      }),
    );
    this.setState({
      id: id + 1,
    });
    this.handleReset();
    }
  };

  handleReset = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: aliment,
    });
  };

  editInfos = async () => {

    const { dispatch, editId } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (value.length === 0 || description.length === 0) {
      window.alert('Por favor digite um valor e uma descrição!')
    } else {
      const currencyAPI = await getFullCurrencyApi();
    dispatch(
      saveEdited({
        id: editId,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currencyAPI,
      }),
    );
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: aliment,
    });
    const formBG = document.querySelector('.formBG');
      formBG.style.background = 'rgba(225, 229, 235, 0.49)';
    }
    
  };

  render() {
    const { currencies, edit, loading } = this.props;
    const { description, currency, value, method, tag } = this.state;
    return (
      <div className="walletFormMain">
        <form>
          <div className="formBG">
            <label htmlFor="number">
              Valor
              <input
                onChange={ this.handleChange }
                name="value"
                data-testid="value-input"
                id="number"
                type="number"
                value={ value }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                onChange={ this.handleChange }
                name="description"
                data-testid="description-input"
                id="description"
                type="text"
                value={ description }
              />
            </label>

            <label htmlFor="currency">
              Moeda
              <select
                className={ loading ? "spinner-grow" : null}
                onChange={ this.handleChange }
                data-testid="currency-input"
                name="currency"
                id="currency"
                value={ currency }
              >
                {currencies.map((currenc) => (
                  <option key={ currenc }>{currenc}</option>
                ))}
              </select>
            </label>

            <label htmlFor="paymentMethod">
              Método de pagamento
              <select
                onChange={ this.handleChange }
                data-testid="method-input"
                name="method"
                id="paymentMethod"
                value={ method }
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>

            <label htmlFor="category">
              Categoria
              <select
                onChange={ this.handleChange }
                data-testid="tag-input"
                name="tag"
                id="category"
                value={ tag }
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
          </div>
          {edit ? (
            <button
              className="btn btn-warning"
              type="button"
              onClick={ () => this.editInfos() }
            >
              Salvar edição
            </button>
          ) : (
            <button onClick={ this.handleSubmit } className="btn btn-warning addexpense" type="button">
              Adicionar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  email: Proptypes.array,
}.isRequired;

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  edit: globalState.wallet.edit,
  editId: globalState.wallet.editId,
  loading: globalState.wallet.loading,
});

export default connect(mapStateToProps)(WalletForm);
