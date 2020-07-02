import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  auth,
  googleProvider,
  createUserProfile,
  getCurrentUser,
  updateCurrentUser,
} from "../../firebase/firebase.utils";

import {
  login_user_success,
  login_user_failure,
  userActionTypes,
  logout_user_success,
  logout_user_failure,
  signup_user_success,
  signup_user_failure,
  edit_user_success,
  edit_user_failure,
  clear_redux_user,
  admin_update_success,
  admin_update_failure,
} from "../users/user-actions";
import { clearEvalsRedux } from "../evaluations/evaluation-actions";
import { clearMeetingsRedux } from "../redux-meetings/meeting-actions";

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfile, userAuth, additionalData);
    const userData = yield userRef.get();
    yield put(
      login_user_success({
        id: userData.id,
        ...userData.data(),
      })
    );
  } catch (err) {
    yield put(login_user_failure(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (err) {
    yield put(login_user_failure(err));
  }
}

export function* loginGoogleUserSaga() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    yield put(login_user_failure(err));
  }
}

export function* loginEmailUserSaga({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    yield put(login_user_failure(err));
  }
}

export function* googleLoginStart() {
  yield takeLatest(userActionTypes.GOOGLE_IN_USER_START, loginGoogleUserSaga);
}

export function* emailLoginStart() {
  yield takeLatest(userActionTypes.EMAIL_PASS_USER_START, loginEmailUserSaga);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* logOUtSagaStart({ payload: { id } }) {
  try {
    let lastLogged = new Date();
    let user = { id, lastLogged };

    yield call(updateCurrentUser, user);
    yield auth.signOut();
    yield call(clear_redux_user);
    yield call(clearEvalsRedux);
    yield call(clearMeetingsRedux);
    yield put(logout_user_success());
  } catch (err) {
    yield put(logout_user_failure(err));
  }
}
export function* onUserLogoutStart() {
  yield takeLatest(userActionTypes.LOGOUT_USER_START, logOUtSagaStart);
}
export function* signUPSagaStart({
  payload: { email, password, displayName },
}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(
      signup_user_success({
        user,
        additionalData: { displayName },
      })
    );
  } catch (err) {
    yield put(signup_user_failure(err));
  }
}
export function* signInAfterSignUP({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}
export function* onUserSignUPStart() {
  yield takeLatest(userActionTypes.SIGNUP_USER_START, signUPSagaStart);
}
export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGNUP_USER_SUCCESS, signInAfterSignUP);
}

export function* editUserSaga({ payload }) {
  try {
    const userRef = yield call(updateCurrentUser, payload);
    const userDoc = yield userRef.get();
    yield put(edit_user_success(userDoc.data()));
  } catch {
    yield put(edit_user_failure());
  }
}

export function* adminEditUserSaga({ payload }) {
  try {
    yield call(updateCurrentUser, payload);
    yield put(admin_update_success());
  } catch {
    yield put(admin_update_failure());
  }
}

export function* onEditUserStart() {
  yield takeLatest(userActionTypes.EDIT_USER_START, editUserSaga);
}

export function* onAdminEditUser() {
  yield takeLatest(userActionTypes.ADMIN_EDIT_USER_START, adminEditUserSaga);
}

export function* userSagas() {
  yield all([
    call(googleLoginStart),
    call(emailLoginStart),
    call(onCheckUserSession),
    call(onUserLogoutStart),
    call(onUserSignUPStart),
    call(onSignUpSuccess),
    call(onEditUserStart),
    call(onAdminEditUser),
  ]);
}
