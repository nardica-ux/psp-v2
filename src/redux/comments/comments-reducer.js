const INITIAL_STATE = {
  commentsData: {},
};

const commentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_COMMENTS_REDUX": {
      let data = action.payload;
      let commentsData = {};
      let arr = data.map((el) => Object.values(el)[0]);
      console.log("*** called SET_COMMENTS_REDUX");
      arr.map((el) => (commentsData[el.meeting_id] = []));
      arr.map((el) => commentsData[el.meeting_id].push(el));
      return {
        commentsData,
      };
    }
    case "ADD_COMMENT_REDUX": {
      let el = action.payload;
      return {
        commentsData: {
          ...state.commentsData,
          [el.meeting_id]: [...state.commentsData[el.meeting_id], el],
        },
      };
    }
    case "DELETE_COMMENT_REDUX": {
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

    case "VOTE_COMMENT_REDUX": {
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
