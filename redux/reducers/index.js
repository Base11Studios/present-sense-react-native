import { combineReducers } from "redux";
import tasks from "./tasks";
import subscription from "./subscription";

const rootReducer = combineReducers({
  tasks,
  subscription
});

export default rootReducer;
