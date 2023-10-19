import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// export type CurrencyType =
// 'USD' | 'USDT' | 'CAD' | 'DOGE' | 'ARS' | 'AUD' | 'BTC' | 'CHF'
// | 'CNY' | 'ETH' | 'EUR' | 'GBP' | 'ILS' | 'JPY' | 'LTC' | 'XRP';

export type ExpenseList = {
  id: string,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: { [x:string]: { ask: string, name:string } }
};

export type ReduxStateType = {
  user: {
    email:string
  },
  wallet: {
    currencies: string[],
    expenses: ExpenseList[],
  }
};

export type ActionUserType = {
  type:string,
  payload:string
};

export type ActionWalletType = {
  type: string,
  payload: string
};

export type DispatchType = ThunkDispatch<ReduxStateType, null, AnyAction>;
