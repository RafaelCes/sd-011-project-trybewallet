import {
  FETCH_CURENCIES_SUCCEEDED,
  FETCH_CURENCIES_FAILED,
  ADD_EXPENSE_FAILED,
  ADD_EXPENSE_SUCCEDED,
  REMOVE_EXPENSE,
  EDIT_MODE,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  key: 0,
  editMode: -1,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_CURENCIES_SUCCEEDED:
    return { ...state, currencies: action.payload };
  case FETCH_CURENCIES_FAILED:
    return { ...state, error: action.payload };
  case ADD_EXPENSE_SUCCEDED: {
    return {
      ...state,
      expenses: [...state.expenses, { id: state.key, ...action.payload }],
      key: state.key + 1,
    };
  }
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === parseInt(state.editMode, 10)) {
          return ({ ...item, ...action.payload });
        } return item;
      }),
      editMode: -1,
    };
  case ADD_EXPENSE_FAILED:
    return { ...state, error: action.payload };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.filter((item) => item.id !== parseInt(action.payload, 10)),
      ],
    };
  case EDIT_MODE:
    return { ...state, editMode: action.payload };
  default:
    return state;
  }
}

export default wallet;
