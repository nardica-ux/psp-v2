import { all, call } from "redux-saga/effects";

import { fetchMeetingSagaStart } from "../redux/redux-meetings/meeting-saga";
import { fetchCommentSagaStart } from "./comments/comments-sagas";
import { userSagas } from "./users/user-saga";

export default function* rootSaga() {
  yield all([
    call(fetchCommentSagaStart),
    call(fetchMeetingSagaStart),
    call(userSagas),
  ]);
}
