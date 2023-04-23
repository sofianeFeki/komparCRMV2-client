import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { quickFilterReducer } from './quickFilterReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer,
  quickFilter: quickFilterReducer,
});

export default rootReducer;
