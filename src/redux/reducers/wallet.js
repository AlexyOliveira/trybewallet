// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_FROM_LIST,
  EDIT_FORM_MODE,
  REQUEST_CURRENCIES_SUCCESS,
  SAVE_EDITED,
  SAVE_FORM,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expensetosum: [],
  edit: false,
  editId: 0,
  loading: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  // state.expenses.find((a) => (a.id === 1).indexOf());
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: [...action.response],
    };

  case SAVE_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      expensetosum: [action.payload],
    };
  case DELETE_FROM_LIST:
    return {
      ...state,
      expenses: state.expenses.filter((each) => each.id !== action.payload),
    };

  case EDIT_FORM_MODE:
    return {
      ...state,
      edit: !state.edit,
      editId: Object.values(action.payload).pop(),
    };
  case SAVE_EDITED:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === state.editId ? action.payload : expense)),
      edit: !state.edit,
    };
    
    case 'LOADING_DONE':
      return {
        ...state,
        loading: false,
      }

  default:
    return state;
  }
};

export default wallet;
