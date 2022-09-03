import { GET_CURRENCIES, GET_CURRENCY_FAILURE, GET_CURRENCY_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  // expenses: [],
  // editor: false,
  // idToEdit: 0,
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
      // expenses: action.expenses,
      error: null,
    };
  case GET_CURRENCY_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
