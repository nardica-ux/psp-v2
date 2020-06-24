import { firestore } from "../../firebase/firebase.utils";

import { takeEvery, call, put } from "redux-saga/effects";
import {
  fetchMeetingsSuccess,
  fetchMeetingsFailure,
  meetingsActionTypes,
} from "../redux-meetings/meeting-actions";

async function getData(add) {
  let result = [];
  add.forEach((doc) => {
    let id = doc.id;
    let res = { ...doc.data(), meeting_id: id };
    result.push(res);
  });
  return result;
}

export function* fetchMeetingsAsync() {
  try {
    yield console.log("** SAGA async fetch fired");
    const meetingRef = firestore.collection("meetings");
    const snapshot = yield meetingRef.get();
    const data = yield call(getData, snapshot);
    console.log(data);
    yield put(fetchMeetingsSuccess(data));
  } catch (err) {
    yield put(fetchMeetingsFailure(err));
  }
}

export function* fetchMeetingSagaStart() {
  console.log("fetch in SAGA called");
  yield takeEvery(meetingsActionTypes.FETCH_MEETINGS_START, fetchMeetingsAsync);
}
