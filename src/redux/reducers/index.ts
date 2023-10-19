import { combineReducers } from 'redux';
import { userEmail } from './user';
import { walletAPI } from './wallet';

const reducer = combineReducers({
  user: userEmail,
  wallet: walletAPI,
});

export default reducer;
