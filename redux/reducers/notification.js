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
  affirmationsTime: new Date(2018, 10, 1, 11, 0, 0, 0),
  timerEnabled: false,
  timerTime: new Date(2018, 1, 1, 1, 1, 1, 1)
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      if (!action.payload) {
        return state;
      } else {
        return {
          ...state,
          remindersEnabled: isNotEmpty(action.payload.remindersEnabled)
            ? action.payload.remindersEnabled
            : state.remindersEnabled,
          remindersTime: isNotEmpty(action.payload.remindersTime)
            ? action.payload.remindersTime
            : state.remindersTime,
          affirmationsEnabled: isNotEmpty(action.payload.affirmationsEnabled)
            ? action.payload.affirmationsEnabled
            : state.affirmationsEnabled,
          affirmationsTime: isNotEmpty(action.payload.affirmationsTime)
            ? action.payload.affirmationsTime
            : state.affirmationsTime,
          timerEnabled: isNotEmpty(action.payload.timerEnabled)
            ? action.payload.timerEnabled
            : state.timerEnabled,
          timerTime: isNotEmpty(action.payload.timerTime)
            ? action.payload.timerTime
            : state.timerTime
        };
      }
    case PURGE:
      return initialState;
    default:
      return state;
  }
  ``;
}

function isNotEmpty(property) {
  return property !== null || property !== undefined;
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
