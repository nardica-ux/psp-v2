import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  firestore,
  //   updateMeetingFire,
  createEventFire,
  getBase,
} from "../../firebase/firebase.utils";

import {
  addEventSuccess,
  addEventFailure,
  eventActionTypes,
  fetchEventsSuccess,
  fetchEventsFailure,
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

export function* fetchEventsSaga() {
  try {
    const events = yield call(getBase, "events");
    yield console.log("fetch events !!!", events);
    yield put(fetchEventsSuccess(events));
  } catch (err) {
    yield put(fetchEventsFailure(err));
  }
}

export function* onFetchEvents() {
  yield takeEvery(eventActionTypes.FETCH_EVENTS_ONMOUNT, fetchEventsSaga);
}

export function* eventSagas() {
  yield all([call(onCreateEventSaga), call(onFetchEvents)]);
}
