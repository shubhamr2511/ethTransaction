import { combineReducers } from 'redux';

const initialState = {
  status: 'idle',
  error: '',
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSACTION_PENDING':
      return { ...state, status: 'pending', error: '' };
    case 'TRANSACTION_COMPLETED':
      return { ...state, status: 'completed', error: '' };
    case 'TRANSACTION_FAILED':
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  transaction: transactionReducer,
});

export default rootReducer;