import { PURGE } from "redux-persist";
import { taskData, taskDataVersion } from "./task-data";

export const SET_ACTIVE_TASK_TYPE = "tasks/SET_ACTIVE_TYPE";
export const START_TASK = "tasks/START";
export const UPDATE_TASKS = "tasks/UPDATE";
export const COMPLETE_TASK = "tasks/COMPLETE";
export const CANCEL_TASK = "tasks/CANCEL";

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
  activeTask: { focusType: "" },
  completedTasks: [],
  activeTaskType: "Anytime"
};

const getUpdatedTasks = function(lastTaskFocuses) {
  let newTasks = [];
  taskData.forEach(task => {
    if (!!lastTaskFocuses[task.id]) {
      task.focusType = lastTaskFocuses[task.id];
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
    case "Sight":
      return "What did you see?";
    case "Sound":
      return "What did you hear?";
    case "Taste":
      return "What did you taste?";
    case "Smell":
      return "What did you smell?";
    case "Mind":
      return task.mindPrompt;
    default:
      return "What did you touch?";
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
    case COMPLETE_TASK:
      const completedTask = action.payload;
      completedTask.id = state.completedTasks.length.toString();
      completedTask.completeDate = new Date();
      let newTaskFocuses = { ...state.lastTaskFocuses };
      newTaskFocuses[completedTask.id] = getNextFocus(completedTask.task);
      let newTasks = [...state.tasks];
      let updatedTask = newTasks.filter(task => {
        return task.id === completedTask.task.id;
      })[0];
      updatedTask.focusType = newTaskFocuses[completedTask.id];
      updatedTask.prompt = getPrompt(updatedTask);
      return {
        ...state,
        tasks: newTasks,
        lastTaskFocuses: newTaskFocuses,
        completedTasks: [completedTask, ...state.completedTasks]
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
      formValues: completion.formValues
    }
  };
}
