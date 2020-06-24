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
      let normalizedArr = {};
      let data = action.payload.map((el) => Object.values(el)[0]);
      data.map((el) => {
        if (!normalizedArr[el.meeting_id]) normalizedArr[el.meeting_id] = [];
        normalizedArr[el.meeting_id].push(el);
      });
      return {
        ...state,
        isFetching: false,
        evaluationData: normalizedArr,
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
      const { meeting_id } = action.payload;
      if (!state.evaluationData[meeting_id])
        state.evaluationData[meeting_id] = [];
      let addNew = [...state.evaluationData[meeting_id], action.payload];
      return {
        ...state,
        evaluationData: {
          ...state.evaluationData,
          [meeting_id]: [...addNew],
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
      const { id, meeting_id } = action.payload;
      let updated = state.evaluationData[meeting_id].filter(
        (el) => el.evaluation_id !== id
      );
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
