import { userActionTypes } from "./user-actions";

const INITIAL_STATE = {
  currentUser: null,
  isLogging: false,
  errMessage: null,
  adminUpdating: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
    case userActionTypes.ADMIN_EDIT_USER_START:
      return {
        ...state,
        adminUpdating: true,
      };
    case userActionTypes.ADMIN_EDIT_USER_SUCCESS:
      return { ...state, adminUpdating: false };

    case userActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLogging: false,
        errMessage: null,
      };

    case userActionTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isLogging: false,
        errMessage: null,
      };
    case userActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLogging: false,
        errMessage: null,
      };
    case userActionTypes.LOGIN_USER_FAILURE:
    case userActionTypes.LOGOUT_USER_FAILURE:
    case userActionTypes.LOGOUT_USER_FAILURE:
      return {
        ...state,
        isLogging: false,
        errMessage: action.payload,
      };
    case userActionTypes.GOOGLE_IN_USER_START:
    case userActionTypes.EMAIL_PASS_USER_START:
      return {
        ...state,
        isLogging: true,
      };
    case userActionTypes.EDIT_USER_START:
      return {
        ...state,
        isLogging: true,
      };
    case userActionTypes.EDIT_USER_SUCCESS: {
      const { ...props } = action.payload;
      return {
        ...state,
        isLogging: false,
        currentUser: {
          ...state.currentUser,
          ...props,
        },
      };
    }
    case "CLEAR_REDUX_USER":
      return (state = INITIAL_STATE);
  }
};
export default userReducer;
