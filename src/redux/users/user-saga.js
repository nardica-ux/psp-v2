import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  auth,
  googleProvider,
  createUserProfile,
  getCurrentUser,
} from "../../firebase/firebase.utils";

import {
  login_user_success,
  login_user_failure,
  userActionTypes,
  logout_user_success,
  logout_user_failure,
  signup_user_success,
  signup_user_failure,
} from "../users/user-actions";

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

export function* logOUtSagaStart() {
  try {
    yield auth.signOut();
    yield put(logout_user_success());
  } catch (err) {
    yield put(logout_user_failure());
  }
}
export function* onUserLogoutStart() {
  yield takeLatest(userActionTypes.LOGOUT_USER_START, logOUtSagaStart);
}

export function* signUPSagaStart({payload:{email,password, displayName}}){
  try{
    const { user } = yield auth.createUserWithEmailAndPassword(email,password)
    yield put(signup_user_success({user, additionalData: {displayName}}))
  } catch(err){
    yield put(signup_user_failure(err))
  }
};
 
export function* signInAfterSignUP({ payload: { user, additionalData } }) {
         yield getSnapShotFromUserAuth(user, additionalData);
       }
export function* onUserSignUPStart() {
  yield takeLatest(userActionTypes.SIGNUP_USER_START, signUPSagaStart);
}
export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGNUP_USER_SUCCESS, signInAfterSignUP);
}

export function* userSagas() {
  yield all([
    call(googleLoginStart),
    call(emailLoginStart),
    call(onCheckUserSession),
    call(onUserLogoutStart),
    call(onUserSignUPStart),
    call(onSignUpSuccess)
  ]);
}
