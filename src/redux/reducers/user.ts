import { ActionUserType } from '../../types';

const INITAL_USER_STATE = { email: '' };

export const userEmail = (state = INITAL_USER_STATE, action:ActionUserType) => {
  switch (action.type) {
    case 'EMAIL_ACTION':
      return {
        ...state,
        email: action.payload,
      };
    default: return state;
  }
};
