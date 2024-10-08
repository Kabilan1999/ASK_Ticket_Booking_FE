import { combineReducers } from "redux";
import { userLoginDetailsSlice, getAdminDetailsSlice, checkAdminSlice } from "./root.slice";

const reducerSlice = {
  userLoginDetailsReducer: userLoginDetailsSlice.reducer,
  getAdminDetailsReducer: getAdminDetailsSlice.reducer,
  checkAdminReducer: checkAdminSlice.reducer,
};

const reducers = combineReducers(reducerSlice);

export default reducers;
