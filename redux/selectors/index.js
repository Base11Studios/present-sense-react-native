import moment from "moment";
import { createSelector } from "reselect";

const getTasksCompleted = state => state.tasks.completedTasks;

export const getPremium = state => state.subscription.premium;

export const getTotalTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.length;
  }
);

export const getMindTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === "Mind").length;
  }
);

export const getTasteTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === "Taste")
      .length;
  }
);

export const getSmellTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === "Smell")
      .length;
  }
);

export const getSightTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === "Sight")
      .length;
  }
);

export const getSoundTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === "Sound")
      .length;
  }
);

export const getTouchTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === "Touch")
      .length;
  }
);

// TODO make this only go back X days, like 30?
export const getTasksPerDay = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    if (tasksCompleted.length > 0) {
      let daysSinceFirstTask =
        moment(new Date())
          .startOf("day")
          .diff(
            moment(
              tasksCompleted[tasksCompleted.length - 1].completeDate
            ).startOf("day"),
            "days"
          ) + 1;

      return tasksCompleted.length / daysSinceFirstTask;
    }

    return 0;
  }
);

export const getTaskStreak = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    // return 6;
    let streak = 0;

    if (tasksCompleted.length > 0) {
      let dateToFulfillStartingYesterday = moment(new Date())
        .subtract(1, "days")
        .startOf("day");
      tasksCompleted.forEach(task => {
        if (
          moment(task.completeDate)
            .startOf("day")
            .isSame(dateToFulfillStartingYesterday)
        ) {
          streak = streak + 1;
          dateToFulfillStartingYesterday = dateToFulfillStartingYesterday.subtract(
            1,
            "days"
          );
        } else if (
          moment(task.completeDate)
            .startOf("day")
            .isAfter(dateToFulfillStartingYesterday)
        ) {
          // Bonus points
        } else {
          return streak;
        }
      });

      streak = addTodayToStreak(streak, tasksCompleted);
    }

    return streak;
  }
);

const addTodayToStreak = function(streak, tasksCompleted) {
  if (
    moment(new Date())
      .startOf("day")
      .isSame(moment(tasksCompleted[0].completeDate).startOf("day"))
  ) {
    return streak + 1;
  } else {
    return streak;
  }
};
