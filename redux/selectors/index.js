import moment from 'moment';
import { createSelector } from 'reselect';

const getTasksCompleted = state => state.tasks.completedTasks;
const getTutorialTasksCompleted = state => state.tasks.completedTutorialTasks;
const getTasks = state => state.tasks.tasks;

export const getAffirmationsTime = state => state.notification.affirmationsTime;
export const getAffirmationsEnabled = state =>
  state.notification.affirmationsEnabled;
export const getRemindersTime = state => state.notification.remindersTime;
export const getRemindersEnabled = state => state.notification.remindersEnabled;
export const getTimerTime = state => state.notification.timerTime;
export const getTimerEnabled = state => state.notification.timerEnabled;

export const getPremium = state => state.subscription.premium;

export const getLeastUsedTasks = createSelector(
  [getTasks, getPremium],
  (tasks, premium) => {
    // Shuffle array for randomness
    for (let i = tasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
    }

    return tasks
      .filter(task => {
        if ((task.premium && !premium) || task.type === 'Tutorial') {
          return false;
        } else {
          return true;
        }
      })
      .sort(function(a, b) {
        return a.count - b.count;
      })
      .slice(0, 3);
  }
);

export const getEverydayTasks = createSelector(
  [getTasksCompleted, getTasks],
  (tasksCompleted, tasks) => {
    everydayTasks = tasks.filter(
      task => task.id === '16' || task.id === '11' || task.id === '8'
    );

    todaysDate = new Date().toDateString();
    everydayTasksCompleted = tasksCompleted
      .filter(task => {
        const completeDate = new Date(task.completeDate);
        return (
          (task.task.id === '16' &&
            completeDate.toDateString() === todaysDate) ||
          (task.task.id === '11' &&
            completeDate.toDateString() === todaysDate) ||
          (task.task.id === '8' && completeDate.toDateString() === todaysDate)
        );
      })
      .map(task => task.task.id);

    return everydayTasks.filter(
      task => !everydayTasksCompleted.includes(task.id)
    );
  }
);

export const getTotalTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.length;
  }
);

// TODO
export const getNextTutorialTask = createSelector(
  [getTasks, getTutorialTasksCompleted],
  (tasks, completedTutorialTasks) => {
    let completedTutorialTaskIds = completedTutorialTasks.map(
      task => task.task.id
    );
    let tutorialTasks = tasks.filter(
      task =>
        task.type === 'Tutorial' &&
        completedTutorialTaskIds.indexOf(task.id) < 0
    );
    if (tutorialTasks.length > 0) {
      tutorialTasks.sort(function(taskA, taskB) {
        return +taskA.id - +taskB.id;
      });
      return tutorialTasks[0];
    } else {
      return null;
    }
  }
);

export const getMindTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === 'Mind').length;
  }
);

export const getTasteTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === 'Taste')
      .length;
  }
);

export const getSmellTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === 'Smell')
      .length;
  }
);

export const getSightTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === 'Sight')
      .length;
  }
);

export const getSoundTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === 'Sound')
      .length;
  }
);

export const getTouchTasksCompleted = createSelector(
  [getTasksCompleted],
  tasksCompleted => {
    return tasksCompleted.filter(task => task.task.focusType === 'Touch')
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
          .startOf('day')
          .diff(
            moment(
              tasksCompleted[tasksCompleted.length - 1].completeDate
            ).startOf('day'),
            'days'
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
        .subtract(1, 'days')
        .startOf('day');
      tasksCompleted.forEach(task => {
        if (
          moment(task.completeDate)
            .startOf('day')
            .isSame(dateToFulfillStartingYesterday)
        ) {
          streak = streak + 1;
          dateToFulfillStartingYesterday = dateToFulfillStartingYesterday.subtract(
            1,
            'days'
          );
        } else if (
          moment(task.completeDate)
            .startOf('day')
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
      .startOf('day')
      .isSame(moment(tasksCompleted[0].completeDate).startOf('day'))
  ) {
    return streak + 1;
  } else {
    return streak;
  }
};
