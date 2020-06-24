export const userActionTypes = {
  LOGIN_USER_REDUX: "LOGIN_USER_REDUX",
};

export const login_users_redux = (obj) => ({
  type: userActionTypes.LOGIN_USER_REDUX,
  payload: obj,
});
