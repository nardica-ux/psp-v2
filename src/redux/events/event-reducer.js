import { eventActionTypes } from "./event-actions";

const INITIAL_STATE = {
  eventsData: null,
  isFetching: false,
  errMessage: undefined,
  isPosting: false,
};

const eventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case eventActionTypes.FETCH_EVENTS_ONMOUNT:
      return {
        ...state,
        isFetching: true,
      };
    case eventActionTypes.FETCH_EVENTS_SUCCESS: {
      const eventsData = {};
      action.payload.map((el) => {
        if (!eventsData || !eventsData[el.meeting_id]) {
          eventsData[el.meeting_id] = { [el.event_id]: el };
        } else
          eventsData[el.meeting_id] = {
            ...eventsData[el.meeting_id],
            [el.event_id]: el,
          };
      });
      return {
        ...state,
        isFetching: false,
        errMessage: null,
        eventsData,
      };
    }

    case eventActionTypes.ADD_EVENT_START:
      return {
        ...state,
        isPosting: true,
      };
    case eventActionTypes.ADD_EVENT_SUCCESS: {
      let { meeting_id, event_id } = action.payload;
      return {
        ...state,
        eventsData: {
          ...state.eventsData,
          [meeting_id]: { [event_id]: action.payload },
        },
        isPosting: false,
        errMessage: null,
      };
    }
    case eventActionTypes.ADD_EVENT_FAILURE:
      return {
        ...state,
        isPosting: false,
        errMessage: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
