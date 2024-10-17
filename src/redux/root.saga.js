import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  userLoginDetailsSlice,
  getAdminDetailsSlice,
  checkAdminSlice,
  addAdminSlice,
} from "./root.slice";
import config from "../config/config";

const { endpoints } = config.constants.api;
const { http } = config.utiliy;

function* getAdminDetailsSaga(action) {
  try {
    const response = yield call(http.get(`${endpoints.GET_ADMIN}`));
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
    const response = yield call(http.post(`${endpoints.CHECK_ADMIN}`, action.payload));
    if (response?.status === 200) {
      yield put(checkAdminSlice.actions.response(response));
    } else {
      yield put(checkAdminSlice.actions.error(response?.message));
    }
  } catch (e) {
    yield put(checkAdminSlice.actions.error(e.message));
  }
}

function* addAdminSaga(action) {
  try {
    const response = yield call(http.post(`${endpoints.GET_ADMIN}`, action.payload));
    if (response?.status === 200) {
      yield put(addAdminSlice.actions.response(response));
    } else {
      yield put(addAdminSlice.actions.error(response?.message));
    }
  } catch (e) {
    yield put(addAdminSlice.actions.error(e.message));
  }
}

//Allows current fetches of Users
function* rootWatcher() {
  yield takeEvery(userLoginDetailsSlice.actions.request.type, userLoginDetailsSaga);
  yield takeEvery(checkAdminSlice.actions.request.type, checkAdminSaga);
  yield takeEvery(addAdminSlice.actions.request.type, addAdminSaga);
}

export default function* rootSaga() {
  yield all([fork(rootWatcher)]);
}
