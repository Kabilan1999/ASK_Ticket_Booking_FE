import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { userLoginDetailsSlice, getAdminDetailsSlice, checkAdminSlice } from "./root.slice";
import { endpoints } from "config/constants/api.constants";

function* getAdminDetailsSaga(action) {
  try {
    const response = yield call(axios.get(`${endpoints.GET_ADMIN}`));
    if (response?.status === 200) {
      yield put(getAdminDetailsSlice.actions.response(response));
    } else {
      yield put(getAdminDetailsSlice.actions.error(response?.message));
    }
  } catch (e) {
    yield put(getAdminDetailsSlice.actions.error(e.message));
  }
}

function* userLoginDetailsSaga(action) {
  try {
    yield put(userLoginDetailsSlice.actions.response(action.payload));
  } catch (e) {
    yield put(userLoginDetailsSlice.actions.error(e.message));
  }
}

function* checkAdminSaga(action) {
  try {
    const response = yield call(axios.post, `${endpoints.CHECK_ADMIN}`, action.payload);
    console.log("response", response);

    if (response?.status === 200) {
      yield put(checkAdminSlice.actions.response(response));
    } else {
      yield put(checkAdminSlice.actions.error(response?.message));
    }
  } catch (e) {
    yield put(checkAdminSlice.actions.error(e.message));
  }
}

//Allows current fetches of Users
function* rootWatcher() {
  yield takeEvery(userLoginDetailsSlice.actions.request.type, userLoginDetailsSaga);
  yield takeEvery(checkAdminSlice.actions.request.type, checkAdminSaga);
}

export default function* rootSaga() {
  yield all([fork(rootWatcher)]);
}
