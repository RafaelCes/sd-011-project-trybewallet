import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import WalletCurrencies from './WalletCurrencies';

class WalletForm extends Component {
  componentDidMount() {
    const { fetchCurr } = this.props;
    fetchCurr();
  }

  render() {
    return (
      <form className="walletForm">
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="valor"
            id="value"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select id="currency">
            <WalletCurrencies />
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select id="payment">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select id="tag">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="trabalho">Transporte</option>
            <option value="trabalho">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  fetchCurr: PropTypes.func.isRequired,
};
