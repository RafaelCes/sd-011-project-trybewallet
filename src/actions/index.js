export const userLogin = (email) => ({ type: 'USER_LOGIN', email });

export const loadingFetch = () => ({ type: 'LOADING_FETCH' });

export const acceptFetch = (payload) => ({ type: 'ACCEPT_FETCH', payload });

export const rejectFetch = (payload) => ({ type: 'REJECT_FETCH', payload });

export const sendExpenses = (payload, responseJson) => ({
  type: 'SEND_EXPENSES',
  payload,
  responseJson,
});

export function fetchPosts(payload = false) {
  return (dispatch) => {
    dispatch(loadingFetch());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((responseJson) => (
        payload
          ? dispatch(sendExpenses(payload, responseJson))
          : dispatch(acceptFetch(responseJson))))
      .catch((error) => dispatch(rejectFetch(error)));
  };
}

export const deleteExpense = (id) => ({ type: 'DELETE_EXPENSE', id });

export const changeExpense = (expense) => ({ type: 'CHANGE_EXPENSE', expense });
