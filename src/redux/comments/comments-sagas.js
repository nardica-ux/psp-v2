import { firestore } from "../../firebase/firebase.utils";
import { takeEvery, call, put } from "redux-saga/effects";

import {
  fetchCommentsSuccess,
  fetchCommentsFailure,
  commentsActionTypes,
} from "../comments/comments-actions";

async function getData(add) {
  let result = [];
  add.forEach((doc) => {
    let id = doc.id;
    let res = { ...doc.data(), meeting_id: id };
    result.push(res);
  });
  return result;
}

export function* fetchCommentsAsync() {
  try {
    let commentBase = yield firestore.collection("meeting_comments").get();
    let commentData = yield call(getData, commentBase);
    yield put(fetchCommentsSuccess(commentData));
  } catch (err) {
    yield put(fetchCommentsFailure(err));
  }
}

export function* fetchCommentSagaStart() {
  yield takeEvery(commentsActionTypes.FETCH_comments_START, fetchCommentsAsync);
}
