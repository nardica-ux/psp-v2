import { commentsActionTypes } from "./comments-actions";
const INITIAL_STATE = {
  commentsData: {},
  isFetching: false,
};

const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commentsActionTypes.FETCH_COMMENTS_SUCCESS: {
      let arr = action.payload;
      let commentsData = {};
      arr.map((el) => {
        if (!commentsData[el.meeting_id]) commentsData[el.meeting_id] = {};
        if (!commentsData[el.meeting_id][el.event_id])
          commentsData[el.meeting_id][el.event_id] = [];
        commentsData[el.meeting_id][el.event_id].push(el);
      });
      return {
        ...state,
        isFetching: false,
        commentsData,
      };
    }
    case commentsActionTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        isFetching: true,
      };

    case commentsActionTypes.ADD_COMMENT_REDUX_SUCCESS: {
      let el = action.payload;
      if (state.commentsData[el.meeting_id])
        state.commentsData[el.meeting_id] = {};
      if (!state.commentsData[el.meeting_id][el.event_id])
        state.commentsData[el.meeting_id][el.event_id] = [];
      return {
        ...state,
        commentsData: {
          ...state.commentsData,
          [el.meeting_id]: {
            ...state.commentsData[el.meeting_id],
            [el.event_id]: [
              ...state.commentsData[el.meeting_id][el.event_id],
              el,
            ],
          },
        },
      };
    }
    case commentsActionTypes.DELETE_COMMENT_REDUX: {
      const { id, meeting_id } = action.payload;
      let arr = state.commentsData[meeting_id];
      let el = arr.find((el) => el.comment_id === id);
      let ind = arr.indexOf(el);
      arr.splice(ind, 1);
      return {
        ...state,
        commentsData: { ...state.commentsData, [meeting_id]: [...arr] },
      };
    }

    case commentsActionTypes.VOTE_COMMENT_REDUX: {
      const { vote, id, meeting_id } = action.payload;
      let arr = state.commentsData[meeting_id];
      let el = arr.find((el) => el.comment_id === id);
      let ind = arr.indexOf(el);
      arr[ind].vote_count = +vote;
      return {
        ...state,
        commentsData: { ...state.commentsData, [meeting_id]: [...arr] },
      };
    }
    default:
      return state;
  }
};
export default commentsReducer;
