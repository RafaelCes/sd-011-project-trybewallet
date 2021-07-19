// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const CURRENCIES = 'CURRENCIES';
const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const walletLogin = (userEmail) => ({
  type: LOGIN,
  user: userEmail,
});

export const walletCurrencies = (currencies) => ({
  type: CURRENCIES,
  payload: {
    currencies,
  },
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: {
    expenses: expense,
  },
});

export function fetchCurrencies() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data);
      dispatch(walletCurrencies(currencies));
    });
}

export function fetchAtualCotation(expenseInfo) {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const AllCurrencies = { ...data };
      const rejectedsCurrencies = ['DOGE'];
      rejectedsCurrencies.forEach((currency) => delete AllCurrencies[currency]);
      const exchangeRates = { ...AllCurrencies };
      const expense = {
        ...expenseInfo,
        exchangeRates,
      };
      dispatch(saveExpense(expense));
    });
}
