const INITIAL_STATE = {
  meetings: null,
  meetIds: null,
};

const meetingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_ALL_MEETINGS": {
      let Ids = action.payload.map((el) => Object.keys(el)[0]);
      let body = action.payload.map((el) => Object.values(el)[0]);
      return {
        meetings: [...body],
        meetIds: [...Ids],
      };
    }
    case "DELETE_MEETINGS_REDUX": {
      console.log("CLEARED");
      return { meetings: null, meetIds: null };
    }
    default:
      return state;
  }
};
export default meetingReducer;
