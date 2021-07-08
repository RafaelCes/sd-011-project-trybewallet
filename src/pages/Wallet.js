import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Expenses from '../components/Expenses';
import { fetchAwesomeApi } from '../actions/walletActions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchcoins } = this.props;

    fetchcoins();
  }

  render() {
    return (
      <Header />
      <Expenses />
    );
  }
}

Wallet.propTypes = {
  fetchcoins: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchcoins: () => dispatch(fetchAwesomeApi()),
});

export default connect(null, mapDispatchToProps)(Wallet);
