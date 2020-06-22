const INITIAL_STATE = {
  meetings: null,
  meetIds: null,
  meetingCards: {},
};

const meetingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_ALL_MEETINGS": {
      let Ids = action.payload.map((el) => Object.keys(el)[0]);
      let body = action.payload.map((el) => Object.values(el)[0]);
      let cards = {};
      Ids.map((el) => (cards[el] = 0));
      return {
        meetingCards: cards,
        meetings: [...body],
        meetIds: [...Ids],
      };
    }
    case "DELETE_MEETINGS_REDUX": {
      console.log("CLEARED");
      return { meetings: null, meetIds: null, meetingCards: {} };
    }
    case "SET_MEETINGS_CARDS": {
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
