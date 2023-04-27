import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { quickFilterReducer } from './quickFilterReducer';
import { userReducer } from './userReducer';
import { filtersReducer } from './filtersReducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer,
  quickFilter: quickFilterReducer,
  filters : filtersReducer,

});

export default rootReducer;
