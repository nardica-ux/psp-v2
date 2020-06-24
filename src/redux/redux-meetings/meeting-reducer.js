import { meetingsActionTypes } from "./meeting-actions";

const INITIAL_STATE = {
  meetings: null,
  meetIds: null,
  meetingCards: {},
  isFetching: false,
  errMessage: undefined,
};

const meetingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case meetingsActionTypes.FETCH_MEETINGS_SUCCESS: {
      let arr = action.payload;
      let cards = {};
      arr.forEach((el) => Object.assign(cards, { [el.meeting_id]: 0 }));
      let Ids = arr.map((el) => el.meeting_id);
      return {
        ...state,
        meetingCards: cards,
        meetings: [...arr],
        meetIds: [...Ids],
        isFetching: false,
      };
    }
    case meetingsActionTypes.FETCH_MEETINGS_START:
      return {
        ...state,
        isFetching: true,
      };
    case meetingsActionTypes.FETCH_MEETINGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errMessage: action.payload,
      };
    case meetingsActionTypes.DELETE_MEETINGS_REDUX: {
      return { meetings: null, meetIds: null, meetingCards: {} };
    }
    case meetingsActionTypes.SET_MEETINGS_CARDS: {
      const { id, num } = action.payload;
      console.log("set CARDS REDUX", action.payload);
      return {
        ...state,
        meetingCards: {
          ...state.meetingCards,
          [id]: num,
        },
      };
    }
    default:
      return state;
  }
};
export default meetingReducer;
