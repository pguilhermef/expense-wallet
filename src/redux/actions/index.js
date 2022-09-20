import getApiCurrencies from '../../services/Get_Currencies';

export const GET_USER_EMAIL = 'GET_USER_EMAIL';

export const getUserEmail = (email) => ({
  type: GET_USER_EMAIL,
  email,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_FAILURE = 'GET_CURRENCY_FAILURE';

export const getCurrencies = () => ({
  type: GET_CURRENCIES,
});

export const getCurrenciesSucess = (currencies) => ({
  type: GET_CURRENCY_SUCCESS,
  currencies: Object.keys(currencies)
    .filter((currencyCode) => currencyCode !== 'USDT'),
});

export const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCY_FAILURE,
  error,
});

export const requestCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());
  try {
    const allCurrencies = await getApiCurrencies();
    return dispatch(getCurrenciesSucess(allCurrencies));
  } catch (error) {
    dispatch(getCurrenciesFailure(error.message));
  }
};

export const GET_EXPENSE = 'GET_EXPENSE';

export const getExpense = (expense) => ({
  type: GET_EXPENSE,
  expense,
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const editExpense = (id) => ({
  type: EDIT_EXPENSES,
  id,
});

export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const updateExpense = (expense) => ({
  type: UPDATE_EXPENSES,
  expense,
});
