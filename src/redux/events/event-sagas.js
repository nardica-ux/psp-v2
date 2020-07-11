import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  firestore,
  //   updateMeetingFire,
  createEventFire,
} from "../../firebase/firebase.utils";

import {
  addEventSuccess,
  addEventFailure,
  eventActionTypes,
} from "./event-actions";

export function* createEventAsync({ payload }) {
  console.log("hello from createEventAsync", payload);
  try {
    const newEvent = yield call(createEventFire, payload);
    yield put(addEventSuccess(newEvent));
  } catch (err) {
    yield put(addEventFailure(err));
  }
}

export function* onCreateEventSaga() {
  yield takeEvery(eventActionTypes.ADD_EVENT_START, createEventAsync);
}

export function* eventSagas() {
  yield all([call(onCreateEventSaga)]);
}
