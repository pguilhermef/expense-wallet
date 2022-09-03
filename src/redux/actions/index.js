import getAllCurrencies from '../../services/Get_Currencies';

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
  currencies,
});

export const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCY_FAILURE,
  error,
});

export const requestCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());
  try {
    const allCurrencies = await getAllCurrencies();
    const currenciesCode = Object.keys(allCurrencies)
      .filter((currencyCode) => currencyCode !== 'USDT');
    return dispatch(getCurrenciesSucess(currenciesCode));
  } catch (error) {
    dispatch(getCurrenciesFailure(error.message));
  }
};

export const GET_EXPENSE = 'GET_EXPENSE';

export const getExpense = (expense) => ({
  type: GET_EXPENSE,
  expense,
});
