import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import { fetchCurencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestCurencies } = this.props;
    requestCurencies();
  }

  totalExpended() {
    const { expenses } = this.props;
    return expenses.reduce((acc, current) => {
      acc += (current.value * current.exchangeRates[current.currency].ask);
      return acc;
    }, 0).toFixed(2);
  }

  render() {
    const { email } = this.props;

    return (
      <>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <p data-testid="total-field">{this.totalExpended()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <ExpensesForm />
        <ExpensesTable />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurencies: () => dispatch(fetchCurencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
