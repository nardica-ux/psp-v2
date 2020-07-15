import { meetingsActionTypes } from "./meeting-actions";

const INITIAL_STATE = {
  meetings: null,
  meetIds: null,
  meetingCards: {},
  isFetching: false,
  errMessage: undefined,
  activeEvents: null,
};

const meetingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case meetingsActionTypes.FETCH_MEETINGS_SUCCESS: {
      let arr = action.payload;
      let cards = {};
      arr.forEach((el) => Object.assign(cards, { [el.meeting_id]: 0 }));
      let Ids = arr.map((el) => el.meeting_id);
      let activeEvents = {};

      Ids.map((el, i) => {
        if (arr[i].events) {
          let lastEl = arr[i].events.length - 1;
          activeEvents = {
            ...activeEvents,
            [el]: arr[i].events[lastEl],
          };
        }
      });
      return {
        ...state,
        meetingCards: cards,
        meetings: [...arr],
        meetIds: [...Ids],
        isFetching: false,
        activeEvents,
      };
    }
    case meetingsActionTypes.UPDATE_MEETING_START:
      return { ...state, isFetching: true };

    case meetingsActionTypes.POINT_EVENT_TOREDUX: {
      const { meeting_id, el } = action.payload;
      return {
        ...state,
        activeEvents: {
          ...state.activeEvents,
          [meeting_id]: el,
        },
      };
    }
    case meetingsActionTypes.UPDATE_MEETING_SUCCESS: {
      const {
        meeting_id,
        body,
        author,
        goal,
        platform,
        past_events,
      } = action.payload;
      const updatedMeetings = state.meetings.map((el) => {
        if (el.meeting_id === meeting_id) {
          return (el = {
            ...el,
            goal,
            author,
            body,
            platform,
            past_events,
          });
        } else return el;
      });
      return {
        ...state,
        meetings: updatedMeetings,
        isFetching: false,
        errMessage: null,
      };
    }

    case meetingsActionTypes.FETCH_MEETINGS_START:
      return {
        ...state,
        isFetching: true,
      };
    case meetingsActionTypes.FETCH_MEETINGS_FAILURE:
    case meetingsActionTypes.UPDATE_MEETING_FAILURE:
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
