import Toast from "react-native-root-toast";
import { select, takeEvery } from "redux-saga/effects";
import { COLOR_ALERT, COLOR_HIGHLIGHT } from "../styles/common";
import { COMPLETE_TASK } from "./reducers/tasks";
import { getTaskStreak, getTotalTasksCompleted } from "./selectors/index";

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

function* mySaga() {
  yield takeEvery(COMPLETE_TASK, completeTask);
}

export default mySaga;
