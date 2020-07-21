import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  createEventFire,
  getBase,
  updateEventFire,
} from "../../firebase/firebase.utils";

import {
  addEventSuccess,
  addEventFailure,
  eventActionTypes,
  fetchEventsSuccess,
  fetchEventsFailure,
  eventUpdateSuccess,
  eventUpdateFailure,
} from "./event-actions";

export function* createEventAsync({ payload }) {
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
    yield put(fetchEventsSuccess(events));
  } catch (err) {
    yield put(fetchEventsFailure(err));
  }
}
export function* updateEventSaga(somth) {
  const { payload } = somth;
  yield console.log(payload);

  try {
    const updatedEvent = yield call(updateEventFire, payload);
    yield console.log(updatedEvent);
    yield put(eventUpdateSuccess(updatedEvent));
  } catch (err) {
    yield put(eventUpdateFailure(err));
  }
}

export function* onFetchEvents() {
  yield takeEvery(eventActionTypes.FETCH_EVENTS_ONMOUNT, fetchEventsSaga);
}
export function* onEventUpdate() {
  yield takeEvery(eventActionTypes.UPDATE_EVENTS_START, updateEventSaga);
}

export function* eventSagas() {
  yield all([
    call(onEventUpdate),
    call(onCreateEventSaga),
    call(onFetchEvents),
  ]);
}
