import { getBase, firestore } from "../../firebase/firebase.utils";

export const evalActionTypes = {
  FETCH_EVALUATIONS_START: "FETCH_EVALUATIONS_START",
  FETCH_EVALUATIONS_SUCCESS: "FETCH_EVALUATIONS_SUCCESS",
  FETCH_EVALUATIONS_FAILURE: "FETCH_EVALUATIONS_FAILURE",
  POST_NEW_EVALUATION_FBASE_START: "POST_NEW_EVALUATION_FBASE_START",
  POST_NEW_EVALUATION_FBASE_SUCCESS: "POST_NEW_EVALUATION_FBASE_SUCCESS",
  POST_NEW_EVALUATION_FBASE_FAILURE: "POST_NEW_EVALUATION_FBASE_FAILURE",
  CLEAR_EVALUATIONS_REDUX: "CLEAR_EVALUATIONS_REDUX",
  SET_POSTED_SUCCESS: "SET_POSTED_SUCCESS",
  DELETE_EVALUATION_REDUX: "DELETE_EVALUATION_REDUX",
};

export const clearEvalsRedux = () => ({
  type: evalActionTypes.CLEAR_EVALUATIONS_REDUX,
});

export const fetch_evaluations_start = () => ({
  type: evalActionTypes.FETCH_EVALUATIONS_START,
});

export const fetch_evaluations_success = (arr) => ({
  type: evalActionTypes.FETCH_EVALUATIONS_SUCCESS,
  payload: arr,
});

export const fetch_evaluations_failure = (errMess) => ({
  type: evalActionTypes.FETCH_EVALUATIONS_FAILURE,
  payload: errMess,
});

export const post_new_eval_start = () => ({
  type: evalActionTypes.POST_NEW_EVALUATION_FBASE_START,
});
export const post_new_eval_success = (obj) => ({
  type: evalActionTypes.POST_NEW_EVALUATION_FBASE_SUCCESS,
  payload: obj,
});
export const post_new_eval_failure = (errMess) => ({
  type: evalActionTypes.POST_NEW_EVALUATION_FBASE_FAILURE,
  payload: errMess,
});

export const set_posted_success = () => ({
  type: evalActionTypes.SET_POSTED_SUCCESS,
});

export const post_new_eval_async = (obj) => {
  return (dispatch) => {
    dispatch(post_new_eval_start());
    const {
      meeting_id,
      user_id,
      user_email,
      intensity,
      difficulty,
      unity,
      valueTotal,
      review,
    } = obj;

    let evalRef = firestore.collection("evaluations").doc();
    let id = evalRef.id;
    evalRef
      .set({
        evaluation_id: id,
        meeting_id,
        createdAt: new Date(),
        intensity,
        difficulty,
        unity,
        valueTotal,
        type: "evaluation",
        user_id,
        review,
        user_email,
      })
      .catch((err) => dispatch(post_new_eval_failure(err)));
    evalRef.get().then((res) => dispatch(post_new_eval_success(res.data())));
  };
};

export const fetch_evaluations_start_async = () => {
  return async (dispatch) => {
    try {
      dispatch(fetch_evaluations_start());
      let evaluations = await getBase("evaluations");
      await dispatch(fetch_evaluations_success(evaluations));
    } catch (err) {
      dispatch(fetch_evaluations_failure(err));
    }
  };
};
export const delete_eval_redux = (obj) => ({
  type: evalActionTypes.DELETE_EVALUATION_REDUX,
  payload: obj,
});
export const delete_eval_async = ({ id, meeting_id }) => {
  return (dispatch) => {
    firestore
      .collection("evaluations")
      .doc(id)
      .delete()
      .catch((err) => console.log(err.message));
    dispatch(delete_eval_redux({ id, meeting_id }));
  };
};

export const setEvaluationTab = (obj) => ({
  type: "SET_EVAL_TAB",
  payload: obj,
});
