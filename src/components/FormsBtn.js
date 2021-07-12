import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchApi from '../services/CurrencyApi';
import { sendInfoToExpensesAction } from '../actions';

class FormsBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getApiResponse = this.getApiResponse.bind(this);
  }

  async getApiResponse() {
    const { toma, sendInfos, getExpenses } = this.props;
    const value = document.querySelector('#value');
    const forms = document.querySelector('#forms');
    const data = await fetchApi();
    if (value.value === '') {
      // eslint-disable-next-line no-alert
      return window.alert('você precisa adicionar um valor');
    }
    sendInfos({
      tag: 'Alimentação',
      method: 'Dinheiro',
      currency: 'USD',
      ...toma,
      id: getExpenses.length,
      exchangeRates: data,
    });
    forms.reset();
  }

  render() {
    return (

      <button
        className="send-btn"
        type="button"
        onClick={ this.getApiResponse }
      >
        Adicionar despesa
      </button>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendInfos: (info) => dispatch(sendInfoToExpensesAction(info)),
});

const mapStateToPros = (state) => ({
  getExpenses: state.wallet.expenses,
});

export default connect(mapStateToPros, mapDispatchToProps)(FormsBtn);

FormsBtn.propTypes = {
  toma: PropTypes.objectOf(PropTypes.string),
  sendInfos: PropTypes.func.isRequired,
  getExpenses: PropTypes.arrayOf(PropTypes.object),
};

FormsBtn.defaultProps = {
  toma: {},
  getExpenses: {},
};