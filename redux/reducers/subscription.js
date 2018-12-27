import { PURGE } from 'redux-persist';

export const SUBSCRIBE_USER = 'user/SUBSCRIBE';
export const UNSUBSCRIBE_USER = 'user/UNSUBSCRIBE';
export const UPDATE_SUBSCRIPTIONS = 'user/UPDATE_SUBSCRIPTIONS';
export const UPDATE_IAPS = 'user/UPDATE_IAPS';
export const UPDATE_IAPS_SUCCESS = 'user/UPDATE_IAPS_SUCCESS';

const initialState = {
  premium: true, // TODO REM
  monthlyProduct: null,
  yearlyProduct: null,
  discount: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_USER:
      return {
        ...state,
        premium: true
      };
    case UNSUBSCRIBE_USER:
      return {
        ...state,
        premium: false
      };
    case UPDATE_IAPS_SUCCESS:
      return {
        ...state,
        monthlyProduct: action.payload.monthlyProduct,
        yearlyProduct: action.payload.yearlyProduct,
        discount: action.payload.discount
      };
    case PURGE:
      return initialState;
    default:
      return state;
  }
  ``;
}

export function subscribeUser() {
  return {
    type: SUBSCRIBE_USER,
    payload: {}
  };
}

export function unsubscribeUser() {
  return {
    type: UNSUBSCRIBE_USER,
    payload: {}
  };
}

export function updateUserSubscriptions(data) {
  return {
    type: UPDATE_SUBSCRIPTIONS,
    payload: {
      userDriven: data.userDriven
    }
  };
}

export function updateIAPs() {
  return {
    type: UPDATE_IAPS,
    payload: {}
  };
}

export function updateIAPsSuccess() {
  return {
    type: UPDATE_IAPS_SUCCESS,
    payload: {
      monthlyProduct,
      yearlyProduct,
      discount
    }
  };
}
