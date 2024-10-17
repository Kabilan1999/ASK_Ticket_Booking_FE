import { combineReducers } from "redux";
import {
  userLoginDetailsSlice,
  getAdminDetailsSlice,
  checkAdminSlice,
  addAdminSlice,
} from "./root.slice";

const reducerSlice = {
  userLoginDetailsReducer: userLoginDetailsSlice.reducer,
  getAdminDetailsReducer: getAdminDetailsSlice.reducer,
  checkAdminReducer: checkAdminSlice.reducer,
  addAdminReducer: addAdminSlice.reducer,
};

const reducers = combineReducers(reducerSlice);

export default reducers;
