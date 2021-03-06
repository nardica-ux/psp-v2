import { evalActionTypes } from "./evaluation-actions";

const INITIAL_STATE = {
  evaluationData: null,
  evalTabs: {},
  isFetching: false,
  errMessage: undefined,
  isPosting: false,
};

const evaluationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case evalActionTypes.FETCH_EVALUATIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case evalActionTypes.FETCH_EVALUATIONS_SUCCESS: {
      let evaluationData = {};
      action.payload.map((el) => {
        if (!evaluationData[el.meeting_id]) {
          evaluationData[el.meeting_id] = {};
        }
        if (!evaluationData[el.meeting_id][el.event_id]) {
          evaluationData[el.meeting_id][el.event_id] = [];
        }
        evaluationData[el.meeting_id][el.event_id].push(el);
      });
      return {
        ...state,
        isFetching: false,
        evaluationData,
        errMessage: undefined,
      };
    }
    case evalActionTypes.FETCH_EVALUATIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errMessage: action.payload,
      };
    case "SET_EVAL_TAB": {
      const { meeting_id, num } = action.payload;
      let obj = { ...state.evalTabs };
      return {
        ...state,
        evalTabs: { ...obj, [meeting_id]: num },
      };
    }
    case evalActionTypes.POST_NEW_EVALUATION_FBASE_START:
      return {
        ...state,
        isPosting: true,
      };
    case evalActionTypes.POST_NEW_EVALUATION_FBASE_SUCCESS: {
      const { meeting_id, event_id } = action.payload;
      if (
        !state.evaluationData[meeting_id] ||
        !state.evaluationData[meeting_id][event_id]
      )
        state.evaluationData[meeting_id] = { [event_id]: [] };
      return {
        ...state,
        evaluationData: {
          ...state.evaluationData,
          [meeting_id]: {
            ...state.evaluationData[meeting_id],
            [event_id]: [
              ...state.evaluationData[meeting_id][event_id],
              action.payload,
            ],
          },
        },
      };
    }
    case evalActionTypes.POST_NEW_EVALUATION_FBASE_FAILURE:
      return {
        ...state,
        isPosting: false,
        errMessage: action.payload,
      };
    case evalActionTypes.CLEAR_EVALUATIONS_REDUX:
      return (state = INITIAL_STATE);

    case evalActionTypes.DELETE_EVALUATION_REDUX: {
      const { id, meeting_id, event_id } = action.payload;
      let updated = [...state.evaluationData[meeting_id][event_id]];
      updated.filter((el) => el.evaluation_id !== id);
      return {
        ...state,
        evaluationData: {
          ...state.evaluationData,
          [meeting_id]: updated,
        },
      };
    }

    case evalActionTypes.SET_POSTED_SUCCESS:
      return {
        ...state,
        isPosting: false,
      };

    default:
      return state;
  }
};
export default evaluationReducer;
