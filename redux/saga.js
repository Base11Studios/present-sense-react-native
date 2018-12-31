import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-root-toast';
import { put, select, takeEvery } from 'redux-saga/effects';
import CommonDataManager from '../constants/CommonDataManager';
import { MONTHLY_SUB_ID, YEARLY_SUB_ID } from '../constants/IAP';
import { affirmationData } from '../redux/reducers/affirmation-data';
import { COLOR_QUATERNARY } from '../styles/common';
import { UPDATE_NOTIFICATIONS } from './reducers/notification';
import {
  SUBSCRIBE_USER,
  UNSUBSCRIBE_USER,
  UPDATE_IAPS,
  UPDATE_IAPS_SUCCESS,
  UPDATE_SUBSCRIPTIONS
} from './reducers/subscription';
import { COMPLETE_TASK, SET_DAILY_INTENTION } from './reducers/tasks';
import {
  getAffirmationsEnabled,
  getAffirmationsTime,
  getDailyIntention,
  getPremium,
  getRemindersEnabled,
  getRemindersTime,
  getTaskStreak,
  getTimerEnabled,
  getTimerTime,
  getTotalTasksCompleted
} from './selectors/index';
var currencyFormatter = require('currency-formatter');

const AFFIRMATIONS_START_ID = 100;
const AFFIRMATION_NUMBER_TO_SCHEDULE = 14;
const REMINDERS_ID = '1';
const TIMER_ID = '2';

const itemSkus = Platform.select({
  ios: [MONTHLY_SUB_ID, YEARLY_SUB_ID],
  android: [
    MONTHLY_SUB_ID,
    YEARLY_SUB_ID,
    'com.test.inapp',
    'com.test.subscription'
  ]
});

function* prepareIapIfNeeded() {
  let commonData = CommonDataManager.getInstance();
  let prepared = commonData.getIapModulePrepared();
  if (!prepared) {
    commonData.setIapModulePrepared(true);
    yield RNIap.prepare();
  }
}

function* updateIaps(action) {
  try {
    const premium = yield select(getPremium);
    if (!premium) {
      yield prepareIapIfNeeded();
      const subs = yield RNIap.getSubscriptions(itemSkus);
      let yearlyProduct = null;
      let monthlyProduct = null;
      let discount = null;
      subs.forEach(product => {
        if (product.productId === YEARLY_SUB_ID) {
          yearlyProduct = product;
          yearlyProduct.monthlyFormat = currencyFormatter.format(
            yearlyProduct.price,
            { code: yearlyProduct.currency }
          );
          yearlyProduct.yearlyFormat = currencyFormatter.format(
            yearlyProduct.price,
            { code: yearlyProduct.currency }
          );
        } else if (product.productId === MONTHLY_SUB_ID) {
          monthlyProduct = product;
          monthlyProduct.monthlyFormat = currencyFormatter.format(
            monthlyProduct.price,
            { code: monthlyProduct.currency }
          );
        }
      });
      if (
        !!yearlyProduct &&
        !!yearlyProduct.price &&
        !!monthlyProduct &&
        !!monthlyProduct.price
      ) {
        discount =
          100 -
          Math.round((yearlyProduct.price / (monthlyProduct.price * 12)) * 100);
      }
      yield put({
        type: UPDATE_IAPS_SUCCESS,
        payload: {
          monthlyProduct: monthlyProduct,
          yearlyProduct: yearlyProduct,
          discount: discount
        }
      });
    }
  } catch (e) {}
}

function* updateSubscriptions(action) {
  try {
    const alreadyPremium = yield select(getPremium);

    yield prepareIapIfNeeded();
    const purchases = yield RNIap.getAvailablePurchases();
    let premium = false;
    purchases.forEach(purchase => {
      if (
        purchase.productId == MONTHLY_SUB_ID ||
        purchase.productId == YEARLY_SUB_ID
      ) {
        premium = true;
      }
    });

    if (!!premium && !alreadyPremium) {
      yield put({ type: SUBSCRIBE_USER });
    } else if (!premium && alreadyPremium) {
      yield put({ type: UNSUBSCRIBE_USER });
    }
  } catch (e) {}
}

function* completeTask(action) {
  try {
    if (!action.payload.hideToast) {
      const totalCompleted = yield select(getTotalTasksCompleted);
      const streak = yield select(getTaskStreak);

      let toastComplete = Toast.show('Mindful Experience Complete!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM - 190,
        backgroundColor: COLOR_QUATERNARY,
        opacity: 1,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 400,
        onShow: () => {},
        onShown: () => {},
        onHide: () => {},
        onHidden: () => {}
      });

      let completeMessage =
        totalCompleted.toString() +
        (totalCompleted === 1
          ? ' Mindful Experience Completed'
          : ' Mindful Experiences Completed');

      let toastTotalComplete = Toast.show(completeMessage, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM - 90,
        backgroundColor: COLOR_QUATERNARY,
        opacity: 1,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 1800,
        onShow: () => {},
        onShown: () => {},
        onHide: () => {},
        onHidden: () => {}
      });
      let toastStreak = Toast.show(streak + ' Day Streak!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM - 140,
        backgroundColor: COLOR_QUATERNARY,
        opacity: 1,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 1100,
        onShow: () => {},
        onShown: () => {},
        onHide: () => {},
        onHidden: () => {}
      });
    }
  } catch (e) {}
}

function* dailyIntention(action) {
  try {
    let storeDailyIntention = yield select(getDailyIntention);

    let toastIntentionSet = Toast.show(
      "Intention set to '" + storeDailyIntention + "'",
      {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM - 90,
        backgroundColor: COLOR_QUATERNARY,
        opacity: 1,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 500,
        onShow: () => {},
        onShown: () => {},
        onHide: () => {},
        onHidden: () => {}
      }
    );
  } catch (e) {}
}

function* subscribeUser(action) {
  try {
    let toastTotalComplete = Toast.show(
      'Premium Unlocked. Thanks for your purchase!',
      {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM - 90,
        backgroundColor: COLOR_QUATERNARY,
        opacity: 1,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 1500,
        onShow: () => {},
        onShown: () => {},
        onHide: () => {},
        onHidden: () => {}
      }
    );
  } catch (e) {}
}

function cancelNotifications(action) {
  try {
    PushNotification.cancelAllLocalNotifications();
  } catch (e) {}
}

function scheduleTimerNotification(date, id) {
  notificationObject = {
    title: "Time's up!",
    message: 'The timer for your mindful experience has ended.', // (required)
    playSound: true, // (optional) default: true
    soundName: 'bell.wav', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // actions: '[""]', // (Android only) See the doc for notification actions to know more
    date: date
  };

  if (Platform.OS === 'ios') {
    PushNotification.localNotificationSchedule(
      Object.assign(notificationObject, {
        alertAction: 'view',
        // category: null,
        userInfo: { id: id }
      })
    );
  } else {
    PushNotification.localNotificationSchedule(
      Object.assign(notificationObject, {
        id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher_round', // (optional) default: "ic_launcher"
        // smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: 'default', // (optional) set notification priority, default: high
        visibility: 'public', // (optional) set notification visibility, default: private
        importance: 'default' // (optional) set notification importance, default: high
      })
    );
  }
}

function scheduleAffirmationNotification(date, affirmation, id) {
  notificationObject = {
    title: 'Daily affirmation',
    message: affirmation, // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // actions: '[""]', // (Android only) See the doc for notification actions to know more
    date: date
  };

  if (Platform.OS === 'ios') {
    PushNotification.localNotificationSchedule(
      Object.assign(notificationObject, {
        alertAction: 'view',
        // category: null,
        userInfo: { id: id }
      })
    );
  } else {
    PushNotification.localNotificationSchedule(
      Object.assign(notificationObject, {
        id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher_round', // (optional) default: "ic_launcher"
        // smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: 'default', // (optional) set notification priority, default: high
        visibility: 'public', // (optional) set notification visibility, default: private
        importance: 'default' // (optional) set notification importance, default: high
      })
    );
  }
}

function scheduleReminderNotification(date, id) {
  notificationObject = {
    title: 'Daily reminder',
    message: 'Take a pause, find your mindful moment!', // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // actions: '[""]', // (Android only) See the doc for notification actions to know more
    date: date
  };

  if (Platform.OS === 'ios') {
    PushNotification.localNotificationSchedule(
      Object.assign(notificationObject, {
        alertAction: 'view',
        // category: null,
        userInfo: { id: id }
      })
    );
  } else {
    PushNotification.localNotificationSchedule(
      Object.assign(notificationObject, {
        id: id, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher_round', // (optional) default: "ic_launcher"
        // smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: 'default', // (optional) set notification priority, default: high
        visibility: 'public', // (optional) set notification visibility, default: private
        importance: 'default' // (optional) set notification importance, default: high
      })
    );
  }
}

function getDayOfYear(date) {
  try {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff =
      date -
      start +
      (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  } catch (e) {}
}

function getAffirmationForDay(day, premium) {
  let affirmationLength = affirmationData.length;
  if (!premium) {
    affirmationLength = 10;
  }
  const affirmation = affirmationData[day % affirmationLength].affirmation;
  return affirmation;
}

function updateDateToBeInFuture(time) {
  todaysDate = new Date();
  now = new Date();

  date = new Date(time);
  todaysDate.setHours(date.getHours());
  todaysDate.setMinutes(date.getMinutes());
  todaysDate.setMilliseconds(date.getMilliseconds());
  todaysDate.setSeconds(date.getSeconds());

  if (now.getTime() > todaysDate.getTime()) {
    todaysDate.setDate(todaysDate.getDate() + 1);
  }

  console.warn(todaysDate);
  return todaysDate;
}

function* updateNotifications(action) {
  try {
    cancelNotifications();

    const affirmationsTime = yield select(getAffirmationsTime);
    const affirmationsEnabled = yield select(getAffirmationsEnabled);
    const remindersTime = yield select(getRemindersTime);
    const remindersEnabled = yield select(getRemindersEnabled);
    const timerTime = yield select(getTimerTime);
    const timerEnabled = yield select(getTimerEnabled);
    const premium = yield select(getPremium);

    if (!!timerEnabled && timerTime.getTime() > new Date().getTime()) {
      scheduleTimerNotification(timerTime, TIMER_ID);
    }

    if (!!remindersEnabled) {
      firstReminderDate = updateDateToBeInFuture(remindersTime);

      scheduleReminderNotification(firstReminderDate, REMINDERS_ID);
    }

    if (!!affirmationsEnabled) {
      firstAffirmationDate = updateDateToBeInFuture(affirmationsTime);

      // CREATE ALL NOTIFICATIONS FOR AFFIRMATIONS
      for (
        let index = AFFIRMATIONS_START_ID;
        index < AFFIRMATIONS_START_ID + AFFIRMATION_NUMBER_TO_SCHEDULE;
        index++
      ) {
        notificationDate = new Date(firstAffirmationDate);
        notificationDate.setDate(
          notificationDate.getDate() + (index - AFFIRMATIONS_START_ID)
        );
        scheduleAffirmationNotification(
          notificationDate,
          getAffirmationForDay(getDayOfYear(notificationDate), premium),
          index.toString()
        );
      }
    }
  } catch (e) {}
}

function* mySaga() {
  yield takeEvery(COMPLETE_TASK, completeTask);
  yield takeEvery(UPDATE_SUBSCRIPTIONS, updateSubscriptions);
  yield takeEvery(UPDATE_IAPS, updateIaps);
  yield takeEvery(SUBSCRIBE_USER, subscribeUser);
  yield takeEvery(UPDATE_NOTIFICATIONS, updateNotifications);
  yield takeEvery(SET_DAILY_INTENTION, dailyIntention);
}

export default mySaga;
