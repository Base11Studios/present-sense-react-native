import { PURGE } from 'redux-persist';

export const UPDATE_APP_COUNT = 'general/UPDATE_APP_COUNT';
export const UPDATE_VERSION_NUMBER = 'general/UPDATE_VERSION_NUMBER';

const initialState = {
  appOpenedCount: 0,
  versionNumber: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP_COUNT:
      return {
        ...state,
        appOpenedCount: state.appOpenedCount + 1
      };
    case UPDATE_VERSION_NUMBER:
      return {
        ...state,
        versionNumber: action.payload
      };
    case PURGE:
      return initialState;
    default:
      return state;
  }
  ``;
}

export function updateAppCount() {
  return {
    type: UPDATE_APP_COUNT,
    payload: {}
  };
}

export function updateVersionNumber(versionNumber) {
  return {
    type: UPDATE_VERSION_NUMBER,
    payload: versionNumber
  };
}
