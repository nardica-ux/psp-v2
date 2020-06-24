export const commentsActionTypes = {
  FETCH_COMMENTS_START: "FETCH_COMMENTS_START",
  FETCH_COMMENTS_SUCCESS: "FETCH_COMMENTS_SUCCESS",
  FETCH_COMMENTS_FAILURE: "FETCH_COMMENTS_FAILURE",
};

export const fetchCommentsSuccess = (arr) => ({
  type: commentsActionTypes.FETCH_COMMENTS_SUCCESS,
  payload: arr,
});
export const fetchCommentsFailure = (message) => ({
  type: commentsActionTypes.FETCH_COMMENTS_FAILURE,
  payload: message,
});

export const fetchCommentsStart = (message) => ({
  type: commentsActionTypes.FETCH_COMMENTS_START,
  payload: message,
});

export const addNewCommentRedux = (el) => ({
  type: "ADD_COMMENT_REDUX",
  payload: el,
});
export const deleteCommentFromRedux = (obj) => ({
  type: "DELETE_COMMENT_REDUX",
  payload: obj,
});
export const voteCommentInRedux = (obj) => ({
  type: "VOTE_COMMENT_REDUX",
  payload: obj,
});
