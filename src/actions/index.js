export const LOGIN = 'LOGIN';
export const CURRENCY_NAMES = 'CURRENCY_NAMES';
export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';

export const getLogin = (email) => ({
  type: LOGIN,
  email,
});

const currencyNames = (currency) => ({
  type: CURRENCY_NAMES,
  payload: currency,
});

const currencyRequest = () => ({
  type: CURRENCY_REQUEST,
});

const currencyApi = () => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((data) => (
      data.json()
        .then((json) => json)
    ))
);

export function fetchCurrency() {
  return async (dispatch) => {
    dispatch(currencyRequest());
    return currencyApi()
      .then((data) => {
        const coins = Object.keys(data).filter((moeda) => moeda !== 'USDT');
        dispatch(currencyNames(coins));
      });
  };
}
