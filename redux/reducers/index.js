import { combineReducers } from "redux";
import tasks from "./tasks";
import subscription from "./subscription";
import tutorial from "./tutorial";

const rootReducer = combineReducers({
  tasks,
  subscription,
  tutorial
});

export default rootReducer;
