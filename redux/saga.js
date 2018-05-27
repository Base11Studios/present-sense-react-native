import { Platform } from "react-native";
import * as RNIap from "react-native-iap";
import Toast from "react-native-root-toast";
import { put, select, takeEvery } from "redux-saga/effects";
import { MONTHLY_SUB_ID, YEARLY_SUB_ID } from "../constants/IAP";
import { COLOR_ALERT, COLOR_HIGHLIGHT } from "../styles/common";
import {
  SUBSCRIBE_USER,
  UNSUBSCRIBE_USER,
  UPDATE_IAPS,
  UPDATE_IAPS_SUCCESS,
  UPDATE_SUBSCRIPTIONS
} from "./reducers/subscription";
import { COMPLETE_TASK } from "./reducers/tasks";
import {
  getPremium,
  getTaskStreak,
  getTotalTasksCompleted
} from "./selectors/index";
var currencyFormatter = require("currency-formatter");

const itemSkus = Platform.select({
  ios: [MONTHLY_SUB_ID, YEARLY_SUB_ID],
  android: [MONTHLY_SUB_ID, YEARLY_SUB_ID]
});

function* updateIaps(action) {
  try {
    const premium = yield select(getPremium);
    if (!premium) {
      yield RNIap.prepare();
      const subs = yield RNIap.getSubscriptions(itemSkus);
      let yearlyProduct = null;
      let monthlyProduct = null;
      let discount = null;
      subs.forEach(product => {
        if (product.productId === YEARLY_SUB_ID) {
          yearlyProduct = product;
          yearlyProduct.monthlyFormat = currencyFormatter.format(
            yearlyProduct.price / 12,
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
          Math.round(yearlyProduct.price / (monthlyProduct.price * 12) * 100);
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

    yield RNIap.prepare();
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
    const totalCompleted = yield select(getTotalTasksCompleted);
    const streak = yield select(getTaskStreak);

    let completeMessage =
      totalCompleted.toString() +
      (totalCompleted === 1
        ? " Mindful Experience Completed"
        : " Mindful Experiences Completed");

    let toastTotalComplete = Toast.show(completeMessage, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM - 90,
      backgroundColor: COLOR_HIGHLIGHT,
      opacity: 1,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 2100,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {}
    });
    let toastStreak = Toast.show(streak + " Day Streak!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM - 140,
      backgroundColor: COLOR_ALERT,
      opacity: 1,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 900,
      onShow: () => {},
      onShown: () => {},
      onHide: () => {},
      onHidden: () => {}
    });
  } catch (e) {}
}

function* subscribeUser(action) {
  try {
    let toastTotalComplete = Toast.show(
      "Premium Unlocked. Thanks for your purchase!",
      {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM - 90,
        backgroundColor: COLOR_ALERT,
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

function* mySaga() {
  yield takeEvery(COMPLETE_TASK, completeTask);
  yield takeEvery(UPDATE_SUBSCRIPTIONS, updateSubscriptions);
  yield takeEvery(UPDATE_IAPS, updateIaps);
  yield takeEvery(SUBSCRIBE_USER, subscribeUser);
}

export default mySaga;
