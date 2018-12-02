import { PURGE } from 'redux-persist';

export const UPDATE_APP_COUNT = 'general/UPDATE_APP_COUNT';

const initialState = {
  appOpenedCount: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP_COUNT:
      return {
        ...state,
        appOpenedCount: state.appOpenedCount + 1
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
