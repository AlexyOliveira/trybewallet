import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import './table.css';
import { deleteFromList, editFormMode } from '../redux/actions';

class Table extends Component {
  state = {
    ItenEdit: 0,
  };

  idFromItenEdit = (id) => {
    const { dispatch } = this.props;
    this.setState(
      {
        ItenEdit: id,
      },
      () => {
        const { ItenEdit } = this.state;
        dispatch(editFormMode({ payload: ItenEdit }));
      },
    );
    const formBG = document.querySelector('.formBG');
    formBG.style.background = '#00ffa2';
  };

  findCoinName = (expense) => {
    const name = Object.values(expense.exchangeRates).filter(
      (each) => each.code === expense.currency,
    );
    return name[0].name;
  };

  exchangeUsed = (expense) => {
    const exchange = Object.values(expense.exchangeRates).filter(
      (a) => a.code === expense.currency,
    )[0].ask;

    return Number(exchange).toFixed(2);
  };

  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div className="tableContainer">
        <table className="table  table-striped rTable ">
          <div className="tableBox">
            <thead>
              <tr className="tr1">
                <th className="ll" scope="col">Descrição</th>
                <th scope="col">Tag</th>
                <th scope="col">Método de pagamento</th>
                <th scope="col">Valor</th>
                <th scope="col">Moeda</th>
                <th scope="col">Câmbio utilizado</th>
                <th scope="col">Valor convertido</th>
                <th scope="col">Moeda de conversão</th>
                <th scope="col">Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length < 1
                ? null
                : expenses.map((expense) => (
                  <tr className="tr2" key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{Number(expense.value).toFixed(2)}</td>
                    <td>{this.findCoinName(expense)}</td>
                    <td>{this.exchangeUsed(expense)}</td>
                    <td>
                      {(
                        Object.values(expense.exchangeRates).filter(
                          (a) => a.code === expense.currency,
                        )[0].ask * expense.value
                      ).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={ () => this.idFromItenEdit(expense.id) }
                          type="button"
                          data-testid="edit-btn"
                        >
<a id="editLink" href="#topo">
                          Editar
</a>
                        </button>
                      
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={ () => dispatch(deleteFromList(expense.id)) }
                        type="button"
                        data-testid="delete-btn"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </div>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  email: Proptypes.array,
}.isRequired;

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
