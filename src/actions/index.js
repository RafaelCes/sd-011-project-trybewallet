export const EMAIL = 'EMAIL';
export const CURRENCIES = 'CURRENCIES';

export const emailAction = (email) => ({ type: EMAIL, email });
const currencieAction = (currencies) => ({ type: CURRENCIES, currencies });

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  return dispatch(currencieAction(result));
};
