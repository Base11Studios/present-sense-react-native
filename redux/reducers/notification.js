import { PURGE } from "redux-persist";

export const UPDATE_NOTIFICATIONS = "notification/UPDATE_NOTIFICATIONS";
export const UPDATE_NOTIFICATION_SOUNDS = "notification/UPDATE_NOTIFICATION_SOUNDS";
export const SCHEDULE_AFFIRMATION_NOTIFICATIONS = "notification/SCHEDULE_AFFIRMATION_NOTIFICATIONS";
export const CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS = "notification/CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS";

const initialState = {
  weekdayRemindersEnabled: null,
  weekendRemindersEnabled: null,
  weekdayRemindersTime: null,
  weekendRemindersTime: null,
  weekdayAffirmationsEnabled: null,
  weekendAffirmationsEnabled: null,
  weekdayAffirmationsTime: null,
  weekendAffirmationsTime: null,
  notificationSoundsEnabled: true,
  timerEnabled: false,
  timerTime: new Date(2018, 1, 1, 1, 1, 1, 1)
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      if (!action.payload) {
        newState = { ...state };
        if (newState["weekdayRemindersEnabled"] === null) {
          newState["weekdayRemindersEnabled"] = !!newState["remindersEnabled"] ? newState["remindersEnabled"] : false;
        }
        if (newState["weekendRemindersEnabled"] === null) {
          newState["weekendRemindersEnabled"] = !!newState["remindersEnabled"] ? newState["remindersEnabled"] : false;
        }
        if (newState["weekdayRemindersTime"] === null) {
          newState["weekdayRemindersTime"] = !!newState["remindersTime"] ? newState["remindersTime"] : new Date(2018, 10, 1, 7, 0, 0, 0);
        }
        if (newState["weekendRemindersTime"] === null) {
          newState["weekendRemindersTime"] = !!newState["remindersTime"] ? newState["remindersTime"] : new Date(2018, 10, 1, 9, 0, 0, 0);
        }
        if (newState["weekdayAffirmationsEnabled"] === null) {
          newState["weekdayAffirmationsEnabled"] = !!newState["affirmationsEnabled"] ? newState["affirmationsEnabled"] : false;
        }
        if (newState["weekendAffirmationsEnabled"] === null) {
          newState["weekendAffirmationsEnabled"] = !!newState["affirmationsEnabled"] ? newState["affirmationsEnabled"] : false;
        }
        if (newState["weekdayAffirmationsTime"] === null) {
          newState["weekdayAffirmationsTime"] = !!newState["affirmationsTime"]
            ? newState["affirmationsTime"]
            : new Date(2018, 10, 1, 11, 0, 0, 0);
        }
        if (newState["weekendAffirmationsTime"] === null) {
          newState["weekendAffirmationsTime"] = !!newState["affirmationsTime"]
            ? newState["affirmationsTime"]
            : new Date(2018, 10, 1, 13, 0, 0, 0);
        }

        return newState;
      } else {
        return {
          ...state,
          weekdayRemindersEnabled: isNotEmpty(action.payload.weekdayRemindersEnabled)
            ? action.payload.weekdayRemindersEnabled
            : state.weekdayRemindersEnabled,
          weekendRemindersEnabled: isNotEmpty(action.payload.weekendRemindersEnabled)
            ? action.payload.weekendRemindersEnabled
            : state.weekendRemindersEnabled,
          weekdayRemindersTime: isNotEmpty(action.payload.weekdayRemindersTime)
            ? action.payload.weekdayRemindersTime
            : state.weekdayRemindersTime,
          weekendRemindersTime: isNotEmpty(action.payload.weekendRemindersTime)
            ? action.payload.weekendRemindersTime
            : state.weekendRemindersTime,
          weekdayAffirmationsEnabled: isNotEmpty(action.payload.weekdayAffirmationsEnabled)
            ? action.payload.weekdayAffirmationsEnabled
            : state.weekdayAffirmationsEnabled,
          weekendAffirmationsEnabled: isNotEmpty(action.payload.weekendAffirmationsEnabled)
            ? action.payload.weekendAffirmationsEnabled
            : state.weekendAffirmationsEnabled,
          weekdayAffirmationsTime: isNotEmpty(action.payload.weekdayAffirmationsTime)
            ? action.payload.weekdayAffirmationsTime
            : state.weekdayAffirmationsTime,
          weekendAffirmationsTime: isNotEmpty(action.payload.weekendAffirmationsTime)
            ? action.payload.weekendAffirmationsTime
            : state.weekendAffirmationsTime,
          timerEnabled: isNotEmpty(action.payload.timerEnabled) ? action.payload.timerEnabled : state.timerEnabled,
          timerTime: isNotEmpty(action.payload.timerTime) ? action.payload.timerTime : state.timerTime
        };
      }
    case UPDATE_NOTIFICATION_SOUNDS:
      return { ...state, notificationSoundsEnabled: action.payload };
    case PURGE:
      return initialState;
    default:
      return state;
  }
  ``;
}

function isNotEmpty(property) {
  return property !== null && typeof property !== "undefined";
}

export function updateNotifications(data) {
  return {
    type: UPDATE_NOTIFICATIONS,
    payload: data
  };
}

export function updateNotificationSounds(data) {
  return {
    type: UPDATE_NOTIFICATION_SOUNDS,
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
