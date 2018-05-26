export const SUBSCRIBE_USER = "user/SUBSCRIBE";

const initialState = {
  premium: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE_USER:
      return {
        ...state,
        premium: true
      };
    default:
      return state;
  }
}

export function subscribeUser() {
  return {
    type: SUBSCRIBE_USER,
    payload: {}
  };
}
