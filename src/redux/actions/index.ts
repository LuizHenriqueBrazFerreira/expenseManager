export function userEmailAction(email:string) {
  return {
    type: 'EMAIL_ACTION',
    payload: email,
  };
}

export function walletApiAction() {}

export function walletCurrencys(fetchApi:object) {
  return {
    type: 'CURRENCY_NAMES',
    payload: Object.keys(fetchApi),
  };
}

export function walletExpense(expense:object) {
  return {
    type: 'NEW_EXPENSE',
    payload: expense,
  };
}

export function walletUpdate(expense:object) {
  return {
    type: 'RENEWED_EXPENSE',
    payload: expense,
  };
}
