import {
  GET_CURRENCIES,
  GET_CURRENCY_FAILURE,
  GET_CURRENCY_SUCCESS,
  GET_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSES,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
    };
  case GET_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      error: null,
    };
  case GET_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  case GET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((element) => (
        element.id === state.idToEdit ? action.expense : element
      )),
    };
  default:
    return state;
  }
};

export default wallet;
