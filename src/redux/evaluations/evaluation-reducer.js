const INITIAL_STATE = {
  evaluationData: null,
  evalTabs: {},
};

const evaluationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_EVAL_TAB": {
      console.log(action.payload);
      const { meeting_id, tab } = action.payload;
      return {
        ...state,
        evalTabs: {
          ...state.evalTabs,
          [meeting_id]: tab,
        },
      };
    }
    default:
      return state;
  }
};
export default evaluationReducer;
