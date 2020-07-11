import { all, call } from "redux-saga/effects";

import { MeetingSagas } from "./redux-meetings/meeting-saga";
import { commentSagas } from "./comments/comments-sagas";
import { userSagas } from "./users/user-saga";
import { eventSagas } from "./events/event-sagas";

export default function* rootSaga() {
  yield all([
    call(commentSagas),
    call(MeetingSagas),
    call(userSagas),
    call(eventSagas),
  ]);
}
