import { commentsActionTypes } from "./comments-actions";
const INITIAL_STATE = {
  commentsData: {},
  isFetching: false,
  errMessage: null,
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
      if (!state.commentsData[el.meeting_id])
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
    case commentsActionTypes.DELETE_COMMENT_START:
      return {
        ...state,
        isFetching: true,
      };

    case commentsActionTypes.DELETE_COMMENT_SUCCESS: {
      const { id, meeting_id, event_id } = action.payload;
      let updated = [...state.commentsData[meeting_id][event_id]];
      let updatedArr = updated.filter((el) => el.comment_id !== id);
      console.log(updatedArr);
      return {
        ...state,
        isFetching: false,
        commentsData: {
          ...state.commentsData,
          [meeting_id]: {
            ...state.commentsData[meeting_id],
            [event_id]: updatedArr,
          },
        },
      };
    }
    case commentsActionTypes.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errMessage: action.payload,
      };
    case commentsActionTypes.VOTE_COMMENT_SUCCESS:
      return {
        ...state,
        isFetching: true,
      };

    case commentsActionTypes.VOTE_COMMENT_SUCCESS: {
      const { comment_id, event_id, meeting_id } = action.payload;
      let updated = [...state.commentsData[meeting_id][event_id]];
      let index = null;
      updated.find((el, i) => {
        if (el.comment_id === comment_id) return (index = i);
      });
      updated.splice(index, 1, action.payload);
      return {
        ...state,
        commentsData: {
          ...state.commentsData,
          [meeting_id]: updated,
        },
      };
    }
    default:
      return state;
  }
};
export default commentsReducer;
