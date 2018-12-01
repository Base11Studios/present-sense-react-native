import { combineReducers } from 'redux';
import notification from './notification';
import subscription from './subscription';
import tasks from './tasks';
import tutorial from './tutorial';

const rootReducer = combineReducers({
  tasks,
  subscription,
  tutorial,
  notification
});

export default rootReducer;
