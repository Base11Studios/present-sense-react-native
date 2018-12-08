import { PURGE } from 'redux-persist';

export const UPDATE_NOTIFICATIONS = 'notification/UPDATE_NOTIFICATIONS';
export const SCHEDULE_AFFIRMATION_NOTIFICATIONS =
  'notification/SCHEDULE_AFFIRMATION_NOTIFICATIONS';
export const CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS =
  'notification/CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS';

const initialState = {
  remindersEnabled: false,
  remindersTime: new Date(2018, 10, 1, 7, 0, 0, 0),
  affirmationsEnabled: false,
  affirmationsTime: new Date(2018, 10, 1, 11, 0, 0, 0)
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      return {
        ...state,
        remindersEnabled: action.payload.remindersEnabled,
        remindersTime: action.payload.remindersTime,
        affirmationsEnabled: action.payload.affirmationsEnabled,
        affirmationsTime: action.payload.affirmationsTime
      };
    case PURGE:
      return initialState;
    default:
      return state;
  }
  ``;
}

export function updateNotifications(data) {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: data
  };
}

export function scheduleAffirmationNotifications() {
  return {
    type: SCHEDULE_AFFIRMATION_NOTIFICATIONS
  };
}

export function cancelScheduledAffirmationNotifications() {
  return {
    type: CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS
  };
}
