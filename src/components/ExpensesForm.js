import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, editExpense } from '../actions/index';

class ExpensesForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  saveExpense() {
    const { saveExpense } = this.props;
    saveExpense(this.state);
    return false;
  }

  editExpense() {
    const { saveEditExpense } = this.props;
    saveEditExpense(this.state);
    return false;
  }

  renderValueIput() {
    const { value } = this.state;
    return (
      <label htmlFor="value">
        Valor:
        <input
          type="number"
          data-testid="value-input"
          name="value"
          id="value"
          value={ value }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
          name="description"
          id="description"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurencyInput() {
    const { currency } = this.state;
    const { currencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          type="text"
          data-testid="currency-input"
          name="currency"
          id="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((item) => <option key={ item }>{item}</option>)}
        </select>
      </label>
    );
  }

  rendermethodInput() {
    const { method } = this.state;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          type="text"
          data-testid="method-input"
          name="method"
          id="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagInput() {
    const { tag } = this.state;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          type="text"
          data-testid="tag-input"
          name="tag"
          id="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }

  renderButton() {
    const { editMode } = this.props;
    if (editMode < 0) {
      return (
        <button
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>);
    }
    return (
      <button
        type="button"
        onClick={ this.editExpense }
      >
        Editar despesa
      </button>);
  }

  render() {
    return (
      <form type="submit">
        <h1>Adicone nova despesa</h1>
        {this.renderValueIput()}
        {this.renderDescriptionInput()}
        {this.renderCurencyInput()}
        {this.rendermethodInput()}
        {this.renderTagInput()}
        { this.renderButton()}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editMode: state.wallet.editMode,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (data) => dispatch(addExpense(data)),
  saveEditExpense: (id) => dispatch(editExpense(id)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.array,
  saveExpense: PropTypes.func,
  saveEditMode: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
