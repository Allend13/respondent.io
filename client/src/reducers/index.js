import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';
import usersListReducer from './usersList';

export default combineReducers({
  app: appReducer,
  user: userReducer,
  usersList: usersListReducer,
});