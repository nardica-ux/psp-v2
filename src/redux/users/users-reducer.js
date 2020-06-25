import { userActionTypes } from "./user-actions";

const INITIAL_STATE = {
  currentUser: null,
  isLogging: false,
  errMessage: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
    case userActionTypes.GOOGLE_IN_USER_SUCCESS:
    case userActionTypes.EMAIL_PASS_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLogging: false,
        errMessage: null,
      };
    case userActionTypes.GOOGLE_IN_USER_FAILURE:
    case userActionTypes.EMAIL_PASS_USER_FAILURE:
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
    case "CLEAR_REDUX_USER":
      return (state = INITIAL_STATE);
  }
};
export default userReducer;
