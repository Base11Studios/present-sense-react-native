import { PURGE } from "redux-persist";

export const UPDATE_NOTIFICATIONS = "notification/UPDATE_NOTIFICATIONS";
export const SCHEDULE_AFFIRMATION_NOTIFICATIONS = "notification/SCHEDULE_AFFIRMATION_NOTIFICATIONS";
export const CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS = "notification/CANCEL_SCHEDULED_AFFIRMATION_NOTIFICATIONS";

const initialState = {
  weekdayRemindersEnabled: false,
  weekendRemindersEnabled: false,
  weekdayRemindersTime: new Date(2018, 10, 1, 7, 0, 0, 0),
  weekendRemindersTime: new Date(2018, 10, 1, 9, 0, 0, 0),
  weekdayAffirmationsEnabled: false,
  weekendAffirmationsEnabled: false,
  weekdayAffirmationsTime: new Date(2018, 10, 1, 11, 0, 0, 0),
  weekendAffirmationsTime: new Date(2018, 10, 1, 13, 0, 0, 0),
  timerEnabled: false,
  timerTime: new Date(2018, 1, 1, 1, 1, 1, 1)
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATIONS:
      if (!action.payload) {
        newState = { ...state };
        if (!!newState["remindersEnabled"]) {
          if (!newState["weekdayRemindersEnabled"]) {
            newState["weekdayRemindersEnabled"] = newState["remindersEnabled"];
          }
          if (!newState["weekendRemindersEnabled"]) {
            newState["weekendRemindersEnabled"] = newState["remindersEnabled"];
          }
        }
        if (!!newState["remindersTime"]) {
          if (!newState["weekdayRemindersTime"]) {
            newState["weekdayRemindersTime"] = newState["remindersTime"];
          }
          if (!newState["weekendRemindersTime"]) {
            newState["weekendRemindersTime"] = newState["remindersTime"];
          }
        }
        if (!!newState["affirmationsEnabled"]) {
          if (!newState["weekdayAffirmationsEnabled"]) {
            newState["weekdayAffirmationsEnabled"] = newState["affirmationsEnabled"];
          }
          if (!newState["weekendAffirmationsEnabled"]) {
            newState["weekendAffirmationsEnabled"] = newState["affirmationsEnabled"];
          }
        }
        if (!!newState["affirmationsTime"]) {
          if (!newState["weekdayAffirmationsTime"]) {
            newState["weekdayAffirmationsTime"] = newState["affirmationsTime"];
          }
          if (!newState["weekendAffirmationsTime"]) {
            newState["weekendAffirmationsTime"] = newState["affirmationsTime"];
          }
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
