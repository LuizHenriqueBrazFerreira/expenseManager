import { ActionWalletType } from '../../types';

const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
};

export const walletAPI = (state = INITIAL_WALLET, action:ActionWalletType) => {
  switch (action.type) {
    case 'CURRENCY_NAMES':
      return {
        ...state,
        currencies: action.payload,
      };
    case 'NEW_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'RENEWED_EXPENSE':
      return {
        ...state,
        expenses: action.payload,
      };
    default: return state;
  }
};
