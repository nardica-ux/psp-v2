export const userActionTypes = {
  GOOGLE_IN_USER_START: "GOOGLE_IN_USER_START",
  GOOGLE_IN_USER_SUCCESS: "GOOGLE_IN_USER_SUCCESS",
  GOOGLE_IN_USER_FAILURE: "GOOGLE_IN_USER_FAILURE",
  EMAIL_PASS_USER_START: "EMAIL_PASS_USER_START",
  EMAIL_PASS_USER_SUCCESS: "EMAIL_PASS_USER_SUCCESS",
  EMAIL_PASS_USER_FAILURE: "EMAIL_PASS_USER_FAILURE",
  LOGIN_USER_START: "LOGIN_USER_START",
};

// export const login_user_start = () => ({
//   type: userActionTypes.LOGIN_USER_START,
// });

export const clear_redux_user = () => ({
  type: "CLEAR_REDUX_USER",
});

export const google_in_user_start = () => ({
  type: userActionTypes.GOOGLE_IN_USER_START,
});
export const google_in_user_success = (obj) => ({
  type: userActionTypes.GOOGLE_IN_USER_SUCCESS,
  payload: obj,
});
export const google_in_user_failure = (err) => ({
  type: userActionTypes.GOOGLE_IN_USER_FAILURE,
  payload: err,
});

export const email_user_start = () => ({
  type: userActionTypes.EMAIL_PASS_USER_START,
});
export const email_user_success = (obj) => ({
  type: userActionTypes.EMAIL_PASS_USER_SUCCESS,
  payload: obj,
});
export const email_user_failure = (err) => ({
  type: userActionTypes.EMAIL_PASS_USER_FAILURE,
  payload: err,
});
