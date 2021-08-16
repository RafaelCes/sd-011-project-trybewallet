import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, editModeId } from '../actions';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.getIdToRemove = this.getIdToRemove.bind(this);
    this.getIdToEdit = this.getIdToEdit.bind(this);
  }

  getIdToEdit({ target }) {
    const { enterEditMode } = this.props;
    enterEditMode(target.dataset.id);
  }

  getIdToRemove({ target }) {
    const { deleteExpense } = this.props;
    deleteExpense(target.dataset.id);
  }

  renderTableRows() {
    const { expenses } = this.props;
    return expenses.map((item) => (
      <tr key={ item.id }>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{item.value}</td>
        <td>{item.exchangeRates[item.currency].name}</td>
        <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {parseFloat(item.value * item.exchangeRates[item.currency].ask).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="edit-btn"
            data-id={ item.id }
            onClick={ this.getIdToEdit }
          >
            Editar
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            data-id={ item.id }
            onClick={ this.getIdToRemove }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
  enterEditMode: (id) => dispatch(editModeId(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.array,
  deleteExpense: PropTypes.func,
  enterEditMode: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
