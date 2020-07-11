import { eventActionTypes } from "./event-actions";

const INITIAL_STATE = {
  eventsData: null,
  isFetching: false,
  errMessage: undefined,
  isPosting: false,
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case eventActionTypes.ADD_EVENT_START:
      return {
        ...state,
        isPosting: true,
      };
    case eventActionTypes.ADD_EVENT_SUCCSESS: {
      console.log(action.payload);

      return {
        ...state,
        eventsData: action.payload,
        isPosting: false,
      };
    }

    default:
      return state;
  }
};

export default eventReducer;
