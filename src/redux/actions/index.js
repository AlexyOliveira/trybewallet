// Coloque aqui suas actionsn
import getCurrencyApi from '../../services/CURRENCYapi';
import getFullCurrencyApi from '../../services/FullCurrencyAPI';
// Action types
export const SAVE_LOGED_EMAIL = 'SAVE_LOGED_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';
export const SAVE_FORM = 'SAVE_FORM';
export const REQUEST_FULL_CURRENCIES_SUCCESS = 'REQUEST_FULL_CURRENCIES_SUCCESS';
export const DELETE_FROM_LIST = 'DELETE_FROM_LIST';
export const EDIT_FORM_MODE = 'EDIT_FORM_MODE';
export const SAVE_EDITED = 'SAVE_EDITED';

// Action creators

export const saveEdited = (payload) => ({
  type: SAVE_EDITED,
  payload,
});

export const editFormMode = (payload) => ({
  type: EDIT_FORM_MODE,
  payload,
});

export const deleteFromList = (payload) => ({
  type: DELETE_FROM_LIST,
  payload,
});

export const saveForm = (payload) => ({
  type: SAVE_FORM,
  payload,
});

export const saveLogedEmail = (email) => ({
  type: SAVE_LOGED_EMAIL,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const responseCurrenciesSuccess = (response) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  response,
});

export const responseCurrenciesError = (error) => ({
  type: REQUEST_CURRENCIES_ERROR,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  // 1 Avisar que o fetch vai começar
  dispatch(requestCurrencies());

  try {
    // 2 Fazer a requisição
    const response = await getCurrencyApi();
    dispatch({type: 'LOADING_DONE'})
    // 3.1 Avisar que a requisição foi um sucesso e entregar a resposta

    dispatch(responseCurrenciesSuccess(response));
  } catch (error) {
    // 3.2 Avisar que a requisição foi uma falha
    dispatch(responseCurrenciesError(error));
  }
};

// full API

export const requestFullCurrencies = (response) => ({
  type: REQUEST_FULL_CURRENCIES_SUCCESS,
  response,
});

export const fetchFullCurrencies = () => async (dispatch) => {
  // 1 Avisar que o fetch vai começar
  
  dispatch(requestCurrencies());

  try {
    // 2 Fazer a requisição
    const response = await getFullCurrencyApi();
   
    // 3.1 Avisar que a requisição foi um sucesso e entregar a resposta

    dispatch(requestFullCurrencies(response));
  } catch (error) {
    // 3.2 Avisar que a requisição foi uma falha
    dispatch(responseCurrenciesError(error));
  }
};
