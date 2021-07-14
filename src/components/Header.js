import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      totalValue: 0,
    };
    this.exchangeExpense = this.exchangeExpense.bind(this);
    this.createExpensesList = this.createExpensesList.bind(this);
    this.amountExpenses = this.amoutExpenses.bind(this);
    this.updateTotalValue = this.updateTotalValue.bind(this);
  }

  componentDidMount() {
    this.updateTotalValue();
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.updateTotalValue();
    }
  }

  exchangeExpense(expense) {
    const rates = expense.exchangeRates;
    const coin = Object.entries(rates).filter((i) => i[1].code === expense.currency);
    const value = parseFloat(expense.value) * parseFloat(coin[0][1].ask);
    return value;
  }

  createExpensesList() {
    const { expenses } = this.props;
    const expensesArray = [];
    expenses.map((expense) => expensesArray.push(this.exchangeExpense(expense)));
    return expensesArray;
  }

  amountExpenses() {
    const expenses = this.createExpensesList();
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
    return totalExpenses;
  }

  updateTotalValue() {
    const value = this.amountExpenses();
    this.setState({
      totalValue: value,
    });
  }

  render() {
    const { userEmail } = this.props;
    const { totalValue } = this.state;
    return (
      <section className="section-header">
        <div className="logo">
          <h2>Trybe Wallet</h2>
        </div>
        <div className="data-user">
          <label htmlFor="email-field">
            Email:
            <span data-testid="email-field">{ userEmail }</span>
          </label>
          <div className="expenses-user">
            <label htmlFor="total-field">
              Total de gastos: $
              <span data-testid="total-field">
                { parseFloat((totalValue * 100) / 100).toFixed(2) }
              </span>
            </label>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => (
  { userEmail: state.user.email, expenses: state.wallet.expenses }
);

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userEmail: PropTypes.string,
  expenses: PropTypes.shape({
    value: PropTypes.string,
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    map: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  }),
};

Header.defaultProps = {
  userEmail: 'alguem@algo.com',
  expenses: {},
};