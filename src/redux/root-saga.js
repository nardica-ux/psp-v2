import { all, call } from "redux-saga/effects";

import { MeetingSagas } from "../redux/redux-meetings/meeting-saga";
import { commentSagas } from "./comments/comments-sagas";
import { userSagas } from "./users/user-saga";

export default function* rootSaga() {
  yield all([call(commentSagas), call(MeetingSagas), call(userSagas)]);
}
