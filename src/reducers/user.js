// Esse reducer será responsável por tratar as informações da pessoa usuária
import EMAIL from '../actions/actionTypes';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;
