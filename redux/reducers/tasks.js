import { PURGE } from 'redux-persist';
import { taskData, taskDataVersion } from './task-data';

export const SET_ACTIVE_TASK_TYPE = 'tasks/SET_ACTIVE_TYPE';
export const START_TASK = 'tasks/START';
export const UPDATE_TASKS = 'tasks/UPDATE';
export const COMPLETE_TASK = 'tasks/COMPLETE';
export const CANCEL_TASK = 'tasks/CANCEL';
export const SET_DAILY_INTENTION = 'tasks/SET_DAILY_INTENTION';
export const COMPLETE_DAILY_INTENTION = 'tasks/COMPLETE_DAILY_INTENTION';

export const migrations = {
  0: state => {
    if (state.tasksVersion !== taskDataVersion) {
      return {
        ...state,
        tasks: getUpdatedTasks(state.lastTaskFocuses),
        tasksVersion: taskDataVersion
      };
    } else {
      return state;
    }
  }
};

const initialState = {
  lastTaskFocuses: {},
  tasksVersion: -1,
  tasks: [],
  activeTask: { focusType: '' },
  completedTasks: [],
  activeTaskType: 'Anytime',
  completedTutorialTasks: [],
  dailyIntention: '',
  dailyIntentionSetDate: new Date(),
  dailyIntentionStatus: 'INACTIVE'
};

const getUpdatedTasks = function(lastTaskFocuses) {
  let newTasks = [];
  taskData.forEach(task => {
    if (!!lastTaskFocuses[task.id]) {
      task.focusType = lastTaskFocuses[task.id].focus;
      task.count = lastTaskFocuses[task.id].count;
      task.prompt = getPrompt(task);
    }
    newTasks.push(task);
  });
  return newTasks;
};

const getNextFocus = function(task) {
  let indexOfFocus = task.applicableFocusTypes.indexOf(task.focusType);

  if (task.applicableFocusTypes.length === indexOfFocus + 1) {
    return task.applicableFocusTypes[0];
  }

  return task.applicableFocusTypes[indexOfFocus + 1];
};

const getPrompt = function(task) {
  const type = task.focusType;
  switch (type) {
    case 'Sight':
      return 'What did you see?';
    case 'Sound':
      return 'What did you hear?';
    case 'Taste':
      return 'What did you taste?';
    case 'Smell':
      return 'What did you smell?';
    case 'Mind':
      return task.mindPrompt;
    case 'Tutorial':
      return task.prompt;
    default:
      return 'What did you touch?';
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TASKS:
      if (state.tasksVersion !== taskDataVersion) {
        return {
          ...state,
          tasks: getUpdatedTasks(state.lastTaskFocuses),
          tasksVersion: taskDataVersion
        };
      } else {
        return state;
      }
    case SET_ACTIVE_TASK_TYPE:
      return {
        ...state,
        activeTaskType: action.payload
      };
    case START_TASK:
      const startedTask = action.payload;
      startedTask.startDate = new Date();
      return {
        ...state,
        activeTask: startedTask
      };
    case CANCEL_TASK:
      return {
        ...state,
        activeTask: {}
      };
    case SET_DAILY_INTENTION:
      return {
        ...state,
        dailyIntention: action.payload,
        dailyIntentionSetDate: new Date(),
        dailyIntentionStatus: 'ACTIVE'
      };
    case COMPLETE_DAILY_INTENTION: // TODO complete the task
      return {
        ...state,
        dailyIntentionStatus: 'INACTIVE'
      };
    case COMPLETE_TASK:
      const completedTask = action.payload;
      completedTask.id = state.completedTasks.length.toString();
      completedTask.completeDate = new Date();
      let newTaskFocuses = { ...state.lastTaskFocuses };
      newTaskFocuses[completedTask.task.id] = {
        focus: getNextFocus(completedTask.task)
      };
      newTaskFocuses[completedTask.task.id].count = !!completedTask.task.count
        ? completedTask.task.count + 1
        : 1;
      let newTasks = [...state.tasks];
      let updatedTask = newTasks.filter(task => {
        return task.id === completedTask.task.id;
      })[0];
      updatedTask.focusType = newTaskFocuses[completedTask.task.id].focus;
      updatedTask.prompt = getPrompt(updatedTask);
      updatedTask.count = newTaskFocuses[completedTask.task.id].count;
      return {
        ...state,
        tasks: newTasks,
        lastTaskFocuses: newTaskFocuses,
        completedTasks: [completedTask, ...state.completedTasks],
        completedTutorialTasks: [...state.completedTutorialTasks, completedTask]
      };
    case PURGE:
      return initialState;
    default:
      return state;
  }
}

export function updateTasks() {
  return {
    type: UPDATE_TASKS,
    payload: {}
  };
}

export function setActiveTaskType(type) {
  return {
    type: SET_ACTIVE_TASK_TYPE,
    payload: type
  };
}

export function startTask(task) {
  return {
    type: START_TASK,
    payload: task
  };
}

export function setDailyIntention(intention) {
  return {
    type: SET_DAILY_INTENTION,
    payload: intention
  };
}

export function completeDailyIntention() {
  return {
    type: COMPLETE_DAILY_INTENTION,
    payload: {}
  };
}

export function cancelActiveTask() {
  return {
    type: CANCEL_TASK,
    payload: {}
  };
}

export function completeTask(completion) {
  return {
    type: COMPLETE_TASK,
    payload: {
      task: completion.task,
      formValues: completion.formValues,
      hideToast: completion.hideToast
    }
  };
}
