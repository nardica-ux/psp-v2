export const userActionTypes = {
  GOOGLE_IN_USER_START: "GOOGLE_IN_USER_START",
  EMAIL_PASS_USER_START: "EMAIL_PASS_USER_START",

  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAILURE: "LOGIN_USER_FAILURE",

  LOGOUT_USER_START: "LOGOUT_USER_START",
  LOGOUT_USER_SUCCESS: "LOGOUT_USER_SUCCESS",
  LOGOUT_USER_FAILURE: "LOGOUT_USER_FAILURE",
  CHECK_USER_SESSION: "CHECK_USER_SESSION",

  SIGNUP_USER_START: "SIGNUP_USER_START",
  SIGNUP_USER_SUCCESS: "SIGNUP_USER_SUCCESS",
  SIGNUP_USER_FAILURE: "SIGNUP_USER_FAILURE",

  EDIT_USER_START: "EDIT_USER_START",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE: "EDIT_USER_FAILURE",

  ADMIN_EDIT_USER_START: "ADMIN_EDIT_USER_START",
  ADMIN_EDIT_USER_SUCCESS: "ADMIN_EDIT_USER_SUCCESS",
  ADMIN_EDIT_USER_FAILURE: "ADMIN_EDIT_USER_FAILURE",
};

export const admin_update_user = (user) => ({
  type: userActionTypes.ADMIN_EDIT_USER_START,
  payload: user,
});

export const admin_update_success = () => ({
  type: userActionTypes.ADMIN_EDIT_USER_SUCCESS,
});

export const admin_update_failure = (err) => ({
  type: userActionTypes.ADMIN_EDIT_USER_FAILURE,
  payload: err,
});

export const edit_user_start = (obj) => ({
  type: userActionTypes.EDIT_USER_START,
  payload: obj,
});

export const edit_user_success = (user) => ({
  type: userActionTypes.EDIT_USER_SUCCESS,
  payload: user,
});

export const edit_user_failure = (err) => ({
  type: userActionTypes.EDIT_USER_START,
  payload: err,
});

export const signup_user_start = (credentials) => ({
  type: userActionTypes.SIGNUP_USER_START,
  payload: credentials,
});
export const signup_user_success = ({ user, additionalData }) => ({
  type: userActionTypes.SIGNUP_USER_SUCCESS,
  payload: { user, additionalData },
});
export const signup_user_failure = (err) => ({
  type: userActionTypes.SIGNUP_USER_FAILURE,
  payload: err,
});

export const logout_user_start = (userId) => ({
  type: userActionTypes.LOGOUT_USER_START,
  payload: userId,
});

export const logout_user_success = () => ({
  type: userActionTypes.LOGOUT_USER_SUCCESS,
});

export const logout_user_failure = (err) => ({
  type: userActionTypes.LOGOUT_USER_FAILURE,
  payload: err,
});

export const check_user_session = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const clear_redux_user = () => ({
  type: "CLEAR_REDUX_USER",
});

export const email_user_start = (obj) => ({
  type: userActionTypes.EMAIL_PASS_USER_START,
  payload: obj,
});

export const google_in_user_start = () => ({
  type: userActionTypes.GOOGLE_IN_USER_START,
});
export const login_user_success = (obj) => ({
  type: userActionTypes.LOGIN_USER_SUCCESS,
  payload: obj,
});

export const login_user_failure = (err) => ({
  type: userActionTypes.LOGIN_USER_FAILURE,
  payload: err,
});
