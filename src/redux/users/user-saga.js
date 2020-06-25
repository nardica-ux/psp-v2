import { firestore } from "../../firebase/firebase.utils";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  auth,
  googleProvider,
  createUserProfile,
} from "../../firebase/firebase.utils";

import {
  google_in_user_success,
  email_user_failure,
  email_user_success,
  google_in_user_failure,
  userActionTypes,
} from "../users/user-actions";

export function* loginGoogleUserSaga() {
  yield console.log("** SAGA async login fired");
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfile, user);
    const userData = yield userRef.get();
    console.log(user);
    yield put(
      google_in_user_success({
        id: userData.id,
        ...userData.data(),
      })
    );
  } catch (err) {
    yield put(google_in_user_failure(err));
  }
}

export function* googleLoginStart() {
  console.log("googlr LOGIN in SAGA STARTED");
  yield takeLatest(userActionTypes.GOOGLE_IN_USER_START, loginGoogleUserSaga);
}

export function* userSagas() {
  yield all([call(googleLoginStart)]);
}
