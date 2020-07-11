import { firestore } from "../../firebase/firebase.utils";
import { takeEvery, call, put, all } from "redux-saga/effects";
import { CommentAddToFirebase } from "../../firebase/firebase-comments";
import {
  fetchCommentsSuccess,
  fetchCommentsFailure,
  commentsActionTypes,
  addNewCommentSuccess,
  addNewCommentFailure,
} from "../comments/comments-actions";

async function getData(add) {
  let result = [];
  add.forEach((doc) => {
    let id = doc.id;
    let res = { ...doc.data(), comment_id: id };
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

export function* addNewCommentSaga({ payload }) {
  try {
    const newComment = yield call(CommentAddToFirebase, payload);
    yield put(addNewCommentSuccess(newComment));
  } catch (err) {
    yield put(addNewCommentFailure(err));
  }
}

export function* fetchCommentSagaStart() {
  yield takeEvery(commentsActionTypes.FETCH_COMMENTS_START, fetchCommentsAsync);
}

export function* onNewCommentSagaStart() {
  yield takeEvery(commentsActionTypes.ADD_COMMENT_REDUX, addNewCommentSaga);
}

export function* commentSagas() {
  yield all([call(fetchCommentSagaStart), call(onNewCommentSagaStart)]);
}
