import {
  firestore,
  updateMeetingFire,
  createMeetingFire,
} from "../../firebase/firebase.utils";

import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  fetchMeetingsSuccess,
  fetchMeetingsFailure,
  meetingsActionTypes,
  update_meeting_success,
  update_meeting_failure,
  createNewMeetingFailure,
  createNewMeetingSuccess,
} from "../redux-meetings/meeting-actions";

async function getData(snapShot) {
  let result = [];
  snapShot.forEach(async (doc) => {
    let id = doc.id;
    // let past_events = firestore.collection(
    //   `meetings/${snapShot.id}/${past_events}`
    // );
    // console.log(past_events);
    let res = { ...doc.data(), meeting_id: id };
    result.push(res);
  });
  return result;
}

export function* fetchMeetingsAsync() {
  try {
    const meetingRef = firestore.collection("meetings");
    const snapshot = yield meetingRef.get();
    const data = yield call(getData, snapshot);
    yield put(fetchMeetingsSuccess(data));
  } catch (err) {
    yield put(fetchMeetingsFailure(err));
  }
}
export function* meetingUpdateSaga({ payload }) {
  try {
    const updatedEl = yield call(updateMeetingFire, payload);
    yield put(update_meeting_success(updatedEl));
  } catch (err) {
    yield put(update_meeting_failure(err));
  }
}

export function* createMeetingSagaASync({ payload }) {
  try {
    const newMeeting = yield call(createMeetingFire, payload);
    yield console.log(newMeeting);
    yield put(createNewMeetingSuccess(newMeeting));
  } catch (err) {
    yield put(createNewMeetingFailure(err));
  }
}

export function* fetchMeetingSagaStart() {
  yield takeEvery(meetingsActionTypes.FETCH_MEETINGS_START, fetchMeetingsAsync);
}

export function* onMeetingUpdateStart() {
  yield takeEvery(meetingsActionTypes.UPDATE_MEETING_START, meetingUpdateSaga);
}
export function* onMeetingCreateStart() {
  yield takeEvery(
    meetingsActionTypes.CREATE_NEW_MEETING,
    createMeetingSagaASync
  );
}

export function* MeetingSagas() {
  yield all([
    call(fetchMeetingSagaStart),
    call(onMeetingUpdateStart),
    call(onMeetingCreateStart),
  ]);
}
