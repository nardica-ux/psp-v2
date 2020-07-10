import { firestore, updateMeetingFire } from "../../firebase/firebase.utils";

import { takeEvery, call, put, all } from "redux-saga/effects";
import {
  fetchMeetingsSuccess,
  fetchMeetingsFailure,
  meetingsActionTypes,
  update_meeting_success,
  update_meeting_failure,
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
    console.log(
      res.past_instances
        ? res.past_instances.map((el) => new Date(el.seconds))
        : null
    );
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

export function* fetchMeetingSagaStart() {
  yield takeEvery(meetingsActionTypes.FETCH_MEETINGS_START, fetchMeetingsAsync);
}

export function* onMeetingUpdateStart() {
  yield takeEvery(meetingsActionTypes.UPDATE_MEETING_START, meetingUpdateSaga);
}

export function* MeetingSagas() {
  yield all([call(fetchMeetingSagaStart), call(onMeetingUpdateStart)]);
}
