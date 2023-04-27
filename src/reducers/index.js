import { combineReducers } from 'redux';
import { drawerReducer } from './drawerReducer';
import { quickFilterReducer } from './quickFilterReducer';
import { userReducer } from './userReducer';
import { filtersReducer } from './filtersReducer';
import { paginationReducer } from './paginationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  drawer: drawerReducer,
  quickFilter: quickFilterReducer,
  filters : filtersReducer,
  pagination: paginationReducer,

});

export default rootReducer;
