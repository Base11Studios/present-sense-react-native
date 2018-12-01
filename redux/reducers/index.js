import { combineReducers } from 'redux';
import general from './general';
import notification from './notification';
import subscription from './subscription';
import tasks from './tasks';
import tutorial from './tutorial';

const rootReducer = combineReducers({
  tasks,
  subscription,
  tutorial,
  general,
  notification
});

export default rootReducer;
