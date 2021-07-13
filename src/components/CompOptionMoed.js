import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencie } from '../actions';

class CompOptionMoed extends Component {
  constructor() {
    super();
    this.state = { moedas: ['BRL'] };
    this.getFetchApi = this.getFetchApi.bind(this);
  }

  componentDidMount() {
    this.getFetchApi();
  }

  async getFetchApi() {
    const { requestFetch } = this.props;
    const { payload } = await requestFetch();
    this.setState({ moedas: payload });
  }

  render() {
    const { moedas } = this.state;
    const newArray = Object.values(moedas);
    const moedValid = newArray.filter(({ codein }) => codein !== 'BRLT');
    return (
      moedValid.map(({ code }, index) => (
        <option value={ code } key={ index }>{ code }</option>))
    );
  }
}
const arrayCurrencies = (state) => ({
  arraysWallet: state,
});

const mapDispachProps = (dispatch) => ({
  requestFetch: () => dispatch(fetchCurrencie()),
});

CompOptionMoed.propTypes = {
  requestFetch: PropTypes.func.isRequired,
};

export default connect(arrayCurrencies, mapDispachProps)(CompOptionMoed);